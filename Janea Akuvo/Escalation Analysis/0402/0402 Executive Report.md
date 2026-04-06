# Escalation Analysis — Executive Report

**Client:** CAPEDCU (prod-31) | **April 2026**

---

## Why this analysis?

Akuvo helps lenders manage delinquent accounts. A person at a credit union might hold an auto loan, a credit card, and a mortgage. If their auto loan goes delinquent, **does their credit card follow?** And if it does — **does it make things worse?**

If the answer is yes, an early warning alert could let collectors intervene before the damage spreads.

### Analytical goals

- **Q1 — Coverage:** How many delinquency episodes could an escalation alert have flagged?
- **Q2 — Impact:** Do escalation events lead to worse outcomes?

### Context and limitations

- Single client analysis (CAPEDCU, ~42K accounts, 3 years of data). Cross-client validation pending.
- No payment data in this extract — outcomes assessed via collection activities only.
- Correlation, not causation — escalation and negative outcomes may share an upstream cause.
- Business entities (dealerships, companies with many commercial loans) filtered out via `isbusiness` flag.

### Key metric definition

> **Incidence rate**: for a given group of DQ episodes, the percentage where at least one event of a category (terminal, negative, or positive) occurred on the account within the observation window. Example: "6.0% negative incidence" means 6% of the episodes had at least one broken promise, skip trace, or DNC event.

---

## What's in the data?

![[01-dataset-funnel.svg]]

- **41,621 accounts** after removing 1,057 business-primary accounts (2.5%)
- **22% of people hold 2+ accounts** — the escalation universe (9,396 people)
- **143,761 DQ episodes** across 3 years, 54.9% of accounts with at least one
- **464K collection activities** (outbound calls, emails, promises, skip traces, charge-offs)

---

## Are multi-account holders riskier?

![[09-cardinality-comparison.svg]]

**No — the opposite.**

- Multi-account holders have **lower DQ rates** (47% vs 62% for single-account)
- They spend **less of their lifespan in DQ** (1.7% vs 3.0%)
- Shared accounts resolve DQ episodes faster (7.2d avg vs 12.3d)

This matters: **escalation occurs in a population that is otherwise *more* creditworthy.** The signal is not just "risky people have risky accounts."

---

## How does the escalation network look?

- **17,839 accounts** linked by **16,990 edges** across **7,010 components**
- Largest component: 17 accounts. No giant component — healthy structure.
- 67% of components are simple pairs, 30% are 3–5 accounts
- 70% of edges linked by 1 person, 30% by couples co-signing multiple loans

---

## Q1: How many DQs could an alert have caught?

### What counts as escalation?

> Two DQ episodes (A→B) on **different but person-linked accounts** where **B starts on or after A, and no later than W days after A ends.**

![[escalation-framework.svg]]

### Coverage results

![[02-coverage-by-window.svg]]

- At **W=15 days**: 10,676 DQ episodes qualify — **23% of network DQs, 7.4% of all DQs**
- At **W=35 days**: coverage grows to **30.5% of network DQs, 9.9% of all DQs**

### Is this more than chance?

![[03-co-dq-lift.svg]]

- **1.16x lift at W=5d** — tightest window, strongest signal
- Lift declines with wider windows as seasonal/macro effects dominate

### How do the DQ pairs overlap?

![[08-overlap-types.svg]]

- **FILO dominates** (4,700 vs 2,118 FIFO at W=5d)
- The escalated DQ tends to be shorter, resolving before the trigger

---

## Q2: Do escalation cases lead to worse outcomes?

### Are escalation DQs longer?

![[04-duration-comparison.svg]]

**Yes.**

- **A triggers: 1.63x longer** than the same accounts' non-escalation DQs (14.0d vs 8.6d)
- **B escalated: 1.27x longer** (11.8d vs 9.3d)
- **Combined person exposure: 36.4 days** — 3.5x the global baseline

### Do they lead to more negative activities?

Three outcome categories defined from collection activities:

- **Terminal:** charge-off, repossession, bankruptcy (731 events total)
- **Negative:** broken promises, do-not-collect/contact, skip trace (9,365 events)
- **Positive:** kept promises, payments (13,941 events)

![[05-negative-incidence.svg]]

At **Z=90 days** from the escalation day:

- **Esc A+B: 11.8%** negative incidence vs **1.5% random** and **3.4% intra-account**
- A-side and B-side are nearly symmetric (~8% each)
- **3.5x lift vs intra-account baseline** — same accounts behave worse during escalation

**Full negative incidence across all observation windows:**

| Z (days) | Esc A-side | Esc B-side | Esc A+B | Random baseline | Intra-acct baseline | Lift vs random | Lift vs intra |
|---|---|---|---|---|---|---|---|
| 30 | 3.9% | 3.7% | 6.0% | 0.6% | 1.5% | 10.0x | 4.0x |
| 60 | 6.3% | 6.0% | 9.2% | 1.1% | 2.4% | 8.4x | 3.8x |
| 90 | 8.3% | 8.0% | 11.8% | 1.5% | 3.4% | 7.9x | 3.5x |
| 120 | 9.7% | 9.5% | 13.8% | 1.8% | 4.3% | 7.7x | 3.2x |

### How does lift vary across outcome categories?

![[07-lift-by-category.svg]]

At **Z=90 days**:

- **Terminal: 6.0x** lift vs both baselines — rare but dramatic (only 64 cases)
- **Negative: 3.5x** lift vs intra-account — strongest by volume
- **Positive: 2.2x** lift — escalation accounts get more engagement overall, both good and bad

**Full terminal and positive incidence across all observation windows:**

| Z (days) | Terminal (Esc A+B) | Terminal (random) | Terminal (intra) | Positive (Esc A+B) | Positive (random) | Positive (intra) |
|---|---|---|---|---|---|---|
| 30 | 0.3% | 0.0% | 0.0% | 5.7% | 0.5% | 2.4% |
| 60 | 0.4% | 0.1% | 0.1% | 9.2% | 0.8% | 4.0% |
| 90 | 0.6% | 0.1% | 0.1% | 11.8% | 1.2% | 5.3% |
| 120 | 0.8% | 0.1% | 0.1% | 14.1% | 1.5% | 6.5% |

### Do trigger accounts keep relapsing?

![[06-dq-recurrence.svg]]

**The standout finding.** At Z=90 days, **82% of trigger accounts** experience a new DQ start, compared to **21% for random** accounts — a **3.9x lift**.

| Z (days) | Trigger accounts (A-side) | Random baseline | Lift |
| -------- | ------------------------- | --------------- | ---- |
| 30       | 68.6%                     | 12.7%           | 5.4x |
| 60       | 77.5%                     | 17.6%           | 4.4x |
| 90       | 82.0%                     | 21.1%           | 3.9x |
| 120      | 84.2%                     | 23.1%           | 3.6x |

These are highly recidivist accounts. Escalation is a marker of **sustained financial distress**, not an isolated event.

---

## Key takeaways, learnings and challenged premises

### What we learned

- **Escalation is real and measurable.** 15–30% of network DQs meet the escalation condition.
- **It leads to worse outcomes.** 3–4x higher negative outcome incidence vs same-account baseline. 4–8x for terminal events.
- **Trigger accounts keep relapsing.** 69% DQ recurrence at 30 days — the strongest signal.
- **Both sides are equally affected.** Escalation is a person-level phenomenon, not account-level.
- **Multi-account holders are otherwise *better* credit risks.** The escalation effect stands out precisely because these are not the riskiest accounts to begin with.

### Challenged premises

- **"Co-delinquency = escalation."** Symmetric pair-level co-delinquency showed lift *below* 1.0. The directional, event-level framing was needed to reveal the signal. The initial approach was misleading.
- **"memberrolecode identifies intermediaries."** 97.7% PRIMARY across all high-count holders — useless for this purpose. The `isbusiness` flag was the effective signal.
- **"Multi-account holders are riskier."** The opposite is true. This is important context for interpreting the escalation effect.

---

## Next steps and open questions

1. **Cross-client validation.** Repeat on the 50 "Rich" clients from the segmentation analysis.
2. **Product feature spec.** Define the escalation alert: trigger conditions, audience, recommended actions.
3. **Causal analysis.** Can we disentangle "escalation causes worse outcomes" from "financial stress causes both"?
4. **Payment data.** Incorporate missed/partial payments to strengthen the outcome analysis.
5. **Feature engineering.** Can escalation metrics improve existing DQ prediction models?
6. **Temporal dynamics.** Does the escalation signal vary by season, account age, or DQ recurrence index?

---

## Appendix

### A. Escalation condition — formal definition

```
Escalation(A, B) iff:
    A.account != B.account
    AND linked via shared person
    AND B.start >= A.start
    AND B.start <= A.end + W
```

### B. Outcome category definitions

| Category | Activity types |
|---|---|
| Terminal | CREATE_CASE_CHARGE_OFF, RECOMMEND_CHARGE_OFF, CREATE_CASE_REPOSSESSION, RECOMMEND_REPOSSESSION, CREATE_CASE_BANKRUPTCY, CREATE_CASE_IMPOUND, RECOMMEND_FORECLOSURE |
| Negative | PROMISE_BROKEN, PROMISE_CANCELLED, DO_NOT_COLLECT, DO_NOT_CONTACT, RECOMMEND_SKIP_TRACE, EXTERNAL_SKIP_TRACE |
| Positive | PROMISE_KEPT, PAYMENT_EXTERNAL, PROMISE_PAYMENT, SWBC_PAYMENT, SWBC_PORTAL_PAYMENT |
| Excluded | CREATE_CASE_DECEASED (not behavioral) |

### C. Baseline definitions

| Baseline | Definition | Purpose |
|---|---|---|
| Random | Same B DQ episodes, acc_a replaced with random account from full population | Measures chance co-delinquency |
| Intra-account | Non-escalation DQ episodes on the same accounts involved in escalation, anchored on DQ start | Controls for account-level risk |
| Global | All non-escalation DQ episodes | Population-level reference |

### D. Chart generation

All charts generated by `generate_charts.py` in this folder. Run with: `python generate_charts.py` (requires matplotlib, numpy).

---

*Source data: `D:\akuvo-data\stakuvoproddatalake\analytics\analysis\escalation\0402-prod-31-extract`*
*Detailed report: `[[0402 Detailed Report]]`*
