# Escalation Analysis — Briefing

**Client:** prod-31 (CAPEDCU) | **Date:** 2026-04-02 | **Analyst:** André (via Joane)

---

## Context

Akuvo is a SaaS platform for debt collection optimization. A core question is whether delinquency "escalates" across a person's accounts — when one account goes delinquent, does the person's other account(s) follow? If so, this is an early warning signal that could improve collection strategy.

This analysis uses a CSV extract of client 31 (CAPEDCU): accounts, account-person profiles, delinquency episodes, and collection activities. The data spans March 2023 to March 2026.

---

## Dataset

After filtering out business entities (accounts where the primary person is flagged `isbusiness=True`, removing 1,057 accounts or 2.5%):

- 41,621 accounts held by 42,630 people
- 143,761 delinquency (DQ) episodes across 23,426 accounts (54.9% coverage)
- 464,174 collection activities across 11,308 accounts
- 9,396 people (22.0%) hold 2+ accounts — the "escalation universe"

The person-account network has 17,839 accounts connected by 16,990 edges, forming 7,010 small components (largest has 17 accounts). 67% of components are simple pairs, 30% have 3–5 accounts. No giant component — the network is healthy.

---

## Relationship Cardinality

Accounts were classified by their relationship type. Multi-account holders are less delinquent than single-account holders (47.2% vs 62.4% with any DQ, 1.67% vs 3.01% of lifespan in DQ). Shared accounts show similar patterns. This suggests multi-product customers are more creditworthy on average, making the escalation effect (when it occurs) more noteworthy.

---

## Escalation Definition

An escalation event is defined as a pair of DQ episodes (A, B) on different but person-linked accounts where:

- B starts on or after A starts: `B.start >= A.start`
- B starts no later than W days after A ends: `B.start <= A.end + W`

A is the "trigger" DQ, B is the "escalated" DQ, and B's start date is the "escalation day."

---

## Finding 1: Coverage

Of all DQ episodes on network accounts, 17.6% to 30.5% qualify as escalation events (depending on the window W). As a share of all DQs across the full portfolio, coverage is 5.7% to 9.9%.

| W (days) | Escalated DQs | % of network DQs | % of all DQs |
|---|---|---|---|
| 5 | 8,174 | 17.6% | 5.7% |
| 15 | 10,676 | 23.0% | 7.4% |
| 25 | 13,001 | 28.0% | 9.0% |
| 35 | 14,170 | 30.5% | 9.9% |

Co-delinquency lift vs random baseline is 1.16x at W=5d, decreasing with wider windows — consistent with the signal being strongest for near-simultaneous events.

Among overlapping DQ pairs (B starts while A is ongoing), FILO cases (B resolves before A) outnumber FIFO (B outlasts A) by 2.2:1. Escalated DQs tend to be shorter than trigger DQs.

---

## Finding 2: Duration

Escalation DQs are longer than same-account baselines, controlling for account-level risk (W=15d):

| Group | Mean duration | Same-account baseline | Lift |
|---|---|---|---|
| A (trigger) | 14.0 days | 8.6 days | 1.63x |
| B (escalated) | 11.8 days | 9.3 days | 1.27x |
| Combined A+B | 36.4 days | — | 3.5x vs global baseline (10.5d) |

Trigger DQs are substantially longer — these are not short blips but persistent delinquency. The combined person-level exposure is 3–4x any baseline.

---

## Finding 3: Negative Outcomes

Three outcome categories were defined from collection activities:

- **Terminal:** charge-off, repossession, bankruptcy, impound, foreclosure (731 events total)
- **Negative:** broken/cancelled promises, do-not-collect, do-not-contact, skip trace (9,365 events)
- **Positive:** kept promises, payments (13,941 events)

Outcomes were counted within a window of Z days from the escalation day, on both A's and B's accounts independently.

Negative outcome incidence on escalation pairs (W=15d):

| Z (days) | Esc A+B | Random baseline | Intra-account baseline | Lift vs random | Lift vs intra |
|---|---|---|---|---|---|
| 30 | 6.0% | 0.6% | 1.5% | 10.0x | 4.0x |
| 60 | 9.2% | 1.1% | 2.4% | 8.4x | 3.8x |
| 90 | 11.8% | 1.5% | 3.4% | 7.9x | 3.5x |
| 120 | 13.8% | 1.8% | 4.3% | 7.7x | 3.2x |

Terminal outcomes show 4–8x lift but with limited sample size (64–84 cases at Z=90–120d).

The intra-account comparison is the strongest evidence: the same accounts behave worse during escalation episodes than during their non-escalation DQs.

---

## Finding 4: DQ Recurrence

The most striking finding is DQ recurrence on the trigger account (A-side) after the escalation day:

| Z (days) | A-side recurrence | Random baseline | Lift |
|---|---|---|---|
| 30 | 68.6% | 12.7% | 5.4x |
| 60 | 77.5% | 17.6% | 4.4x |
| 90 | 82.0% | 21.1% | 3.9x |
| 120 | 84.2% | 23.1% | 3.6x |

69% of trigger accounts have a new DQ start within 30 days of the escalation event. These are highly recidivist accounts.

---

## Methodology Notes

- **Business filter:** Removed accounts where the PRIMARY person has `isbusiness=True`. These are commercial entities (dealerships, businesses) with many loans — not behavioral escalation.
- **Random baseline:** Same B DQ episodes paired with random accounts (instead of real connected accounts), preserving degree distribution. Measures what co-delinquency looks like by chance.
- **Intra-account baseline:** Non-escalation DQ episodes on the same accounts involved in escalation. Controls for account-level risk.
- **Observation window:** From escalation day (B.start) forward Z days. Events counted on A's account, B's account, and combined.

---

## Open Questions

1. **Cross-client validation:** These results are from one client (prod-31). Do the patterns hold across the 50 "Rich" clients identified in the segmentation analysis?
2. **Feature specification:** What should the escalation alert look like as a product feature? Who sees it, when does it fire, what action does it recommend?
3. **Causal direction:** We observe correlation between escalation and worse outcomes. Is the escalation itself causal, or are both symptoms of an underlying financial stress event?
4. **Payment data:** This extract did not include payment data. Incorporating payments could strengthen the outcome analysis.

---

*Source data: `D:\akuvo-data\stakuvoproddatalake\analytics\analysis\escalation\0402-prod-31-extract`*
*Detailed report: `docs/0402-escalation-analysis-report.md`*
