# Escalation Analysis — Detailed Analytical Report

**Client:** prod-31 (CAPEDCU) | **Date:** 2026-04-02 | **Analyst:** André (via Joane agent)

---

## Context

Akuvo is a SaaS platform that helps lenders manage delinquent accounts. André, an ML/analytics engineer at Janea Systems assigned to Akuvo, is investigating whether delinquency "escalates" across a person's accounts. Prior work on client prod-33 (COMFIRSTCU) established preliminary findings: 37% escalation potential, 1.3x likelihood multiplier. This analysis extends and deepens that work on a new client (prod-31, CAPEDCU) with a full outcome analysis.

## Goals

1. **Coverage:** Of all delinquency episodes, how many could an escalation alert have flagged?
2. **Impact:** Do escalation events lead to worse outcomes (longer duration, more negative activities)?

---

## Step 1: Data profiling

### Question: What does the prod-31 dataset look like?

A CSV extract was prepared at `analytics/analysis/escalation/0402-prod-31-extract/` with four tables: accounts (42,678 rows), acc_profile (58,221), dqs (144,561), and activities (464,473).

**Key metrics:**
- 42,678 unique accounts held by 43,065 unique people
- 23,426 accounts (54.9%) have at least one DQ episode
- 9,589 people (22.3%) hold 2+ accounts — the escalation universe
- DQ range: March 2023 to March 2026 (~3 years)
- Activities range: December 2018 to March 2026
- Top activity types: SEND_THIRD_PARTY (20.6%), SEND_ELTROPY (15.9%), COMMENT (15.4%), CALL_OUTBOUND (15.3%)

**Note on data quality:** The balance, dqamount, and dqdays columns in the activities table were flagged as unreliable by André. These were excluded from all subsequent analysis.

### Observation: Outlier account holders

The accounts-per-person distribution showed extreme outliers: people holding 15, 25, 53, and up to 103 accounts. These are almost certainly business entities (dealerships, companies), not individuals.

---

## Step 2: Identifying and filtering business entities

### Question: How can we identify intermediaries/business entities?

We explored several signals on people with 15+ accounts:

| Signal | Finding |
|---|---|
| `isbusiness` flag | 85% of 15+ account holders are flagged business |
| Account type diversity | Business entities tend to have 1 type, 1 portfolio — commercial loan specialists |
| Co-titularity pattern | Business entities are mostly solo PRIMARY; non-business outliers (e.g., profileid 59061/59069) are couples co-signing 15 loans each |
| `memberrolecode` | 97.7% PRIMARY across the 15+ group — not a useful discriminator |

**Broken premise: memberrolecode as discriminator.** André initially asked about using memberrolecode to identify intermediaries. The data showed it's overwhelmingly PRIMARY across all high-count holders, so it's not useful for this purpose. We set it aside.

### Decision: Filter on `isbusiness` of the PRIMARY person

- 214 people (0.5%) flagged as business
- 1,057 accounts removed (2.5%)
- Max accounts per person dropped from 103 to 16
- Low-cost filter: preserves 98.9% of the multi-account holder universe (9,396 of 9,589)

---

## Step 3: Relationship cardinality

### Question: How do different relationship types compare on DQ behavior?

Accounts classified into four types:

| Type | # accounts | % with DQ | DQs/acct | Avg DQ duration | % lifespan in DQ |
|---|---|---|---|---|---|
| One person, multiple accounts | 10,811 (26.0%) | 47.2% | 2.34 | 11.2d | 1.67% |
| One person, single account | 15,706 (37.7%) | 62.4% | 3.88 | 12.3d | 3.01% |
| Shared account (multi-acct person) | 7,028 (16.9%) | 48.0% | 3.01 | 7.2d | 1.43% |
| Single shared account | 8,058 (19.4%) | 61.6% | 4.51 | 9.4d | 2.77% |

**Key insight:** Multi-account holders are *less* delinquent across all metrics. This is important context — the escalation signal occurs against a baseline of generally better creditworthiness.

---

## Step 4: Network construction

### Question: What does the person-account network look like?

Built the network by connecting accounts that share at least one person (among multi-account holders only):

| Metric | Value |
|---|---|
| Accounts in network | 17,839 (42.9% of all) |
| Edges (account pairs) | 16,990 |
| Connected components | 7,010 |
| Largest component | 17 accounts |
| Components of size 2 | 4,722 (67%) |
| Components of size 3–5 | 2,134 (30%) |
| Components of size 6+ | 154 (2%) |

Edge weights: 70.4% linked by 1 person, 29.6% by 2 people (couples), 8 edges by 3–4 people (families).

**Assessment:** Healthy network — small isolated clusters, no giant component, no data quality anomalies.

---

## Step 5: Co-delinquency — first attempt

### Question: Do network-connected pairs co-delinquate more than random?

First approach: pair-level, symmetric. For each edge (A, B), check if both have any DQ within ±W days of each other.

| Window | Network | Random | Lift |
|---|---|---|---|
| ±30d | 52.4% | 58.0% | 0.90x |
| ±90d | 68.2% | 71.8% | 0.95x |
| ±365d | 90.7% | 91.1% | 1.00x |

**Result: Lift below 1.0.** Network pairs don't co-delinquate more than random.

### Course correction: flawed baseline

The random baseline was initially drawn only from accounts that have DQ (both-DQ conditioned). This oversamples heavy-DQ accounts that overlap temporally by chance. We reran with random pairs from the full account population — still below 1.0.

**Root cause of the low lift:** Multi-account holders are more creditworthy (established in Step 3). Their lower DQ rate means less temporal overlap than the general population. The pair-level symmetric metric conflates account-level risk with the escalation signal.

### Refinement: directional, event-level framing

André proposed the correct framing:

> B starts up to W days after A finishes, OR B starts while A is ongoing. The whole escalation condition is: **B.start >= A.start AND B.start <= A.end + W**.

This is directional (A triggers B), event-level (each DQ pair is an observation), and captures both overlap and post-DQ windows.

---

## Step 6: Escalation coverage (corrected framing)

### Question: Of all DQ episodes, how many meet the escalation condition?

| W (days) | Escalated DQs | % of network DQs | % of all DQs | Lift vs random |
|---|---|---|---|---|
| 5 | 8,174 | 17.6% | 5.7% | 1.16x |
| 15 | 10,676 | 23.0% | 7.4% | 1.09x |
| 25 | 13,001 | 28.0% | 9.0% | 1.08x |
| 35 | 14,170 | 30.5% | 9.9% | 1.08x |

**Lift is now positive** — and strongest at the tightest window (1.16x at W=5d). Near-simultaneous delinquency is more specific to person-level links.

### Overlap sub-classification (W=5d)

| Type | Count | Description |
|---|---|---|
| FILO | 4,700 | B starts during A, B resolves before A ends |
| FIFO | 2,118 | B starts during A, B outlasts A |
| After | 1,684 | B starts after A ends, within W days |

FILO dominates by 2.2:1 — the escalated DQ tends to be shorter. This is consistent with a "spillover" model where the secondary delinquency is addressed faster.

---

## Step 7: Duration analysis

### Question: Are escalation DQs longer than the same accounts' non-escalation DQs?

Intra-account baseline: non-escalation DQ episodes on the exact same accounts. This controls for account-level risk.

**W=15d results:**

| Group | Mean | Median | P75 | P90 | N |
|---|---|---|---|---|---|
| A (trigger) | 14.0d | 7.0d | 14.0d | 25.0d | 9,715 |
| A intra-acct baseline | 8.6d | 5.0d | 11.0d | 19.0d | 9,409 |
| B (escalated) | 11.8d | 5.0d | 13.0d | 23.0d | 10,676 |
| B intra-acct baseline | 9.3d | 5.0d | 11.0d | 19.0d | 8,787 |
| Combined A+B | 36.4d | 16.0d | 28.0d | 52.0d | 10,676 |
| Global baseline | 10.5d | 5.0d | 11.0d | 21.0d | 129,245 |

**Key metrics:**
- **A triggers are 1.63x longer** than same-account baseline
- **B escalated are 1.27x longer** than same-account baseline
- **Combined person-level exposure is 3.5x** the global baseline
- Intra-account baselines (8.3–9.3d) are *lower* than global (10.5d), confirming network accounts are more creditworthy on average

---

## Step 8: Outcome analysis — defining the categories

### Question: What constitutes a "negative outcome" in the data?

Full activity type inventory (36 types). Categorized into three tiers:

**Terminal** (731 events): CREATE_CASE_CHARGE_OFF, RECOMMEND_CHARGE_OFF, CREATE_CASE_REPOSSESSION, RECOMMEND_REPOSSESSION, CREATE_CASE_BANKRUPTCY, CREATE_CASE_IMPOUND, RECOMMEND_FORECLOSURE

**Negative** (9,365 events): PROMISE_BROKEN, PROMISE_CANCELLED, DO_NOT_COLLECT, DO_NOT_CONTACT, RECOMMEND_SKIP_TRACE, EXTERNAL_SKIP_TRACE

**Positive** (13,941 events): PROMISE_KEPT, PAYMENT_EXTERNAL, PROMISE_PAYMENT, SWBC_PAYMENT, SWBC_PORTAL_PAYMENT

CREATE_CASE_DECEASED (655 events) excluded — not a behavioral outcome.

### Metric definition: incidence rate

Throughout the outcome analysis, the core metric is the **incidence rate**: for a given group of DQ episodes, the percentage that had at least one event of a given category (terminal, negative, or positive) within the observation window.

Example: "6.0% negative incidence at Z=30d" means that out of all escalation DQ episodes, 6.0% had at least one negative activity event (broken promise, skip trace, DNC, etc.) occur on the relevant account within 30 days of the escalation day.

### Design decision: observation window anchored on escalation day

André proposed anchoring the observation window on B.start (the escalation day) rather than on the DQ duration. This avoids the confound of longer DQs mechanically accumulating more activities.

Window: [B.start, B.start + Z days], with Z in {30, 60, 90, 120}. Events counted on A's account, B's account, and combined. Also tracked: dq_start and dq_end events.

**Challenged premise: per-category time windows.** We initially considered different Z values for different outcome types (terminal events are slow, negative events are fast). Decided against it — baselining becomes too complex, and a single generous window keeps comparisons clean.

---

## Step 9: Outcome results — first pass

### Question: Do escalation DQs have more negative outcomes?

Initial approach: count activities within [DQ.start, DQ.end + 30d buffer] for each DQ episode, compare escalation vs baseline groups.

**W=15d results (incidence rate — % of DQ episodes with at least one event):**

| Group | Terminal | Negative | Positive |
|---|---|---|---|
| A trigger | 0.5% | 5.8% | 5.7% |
| A intra-baseline | 0.1% | 2.4% | 3.7% |
| B escalated | 0.4% | 5.9% | 5.8% |
| B intra-baseline | 0.2% | 2.5% | 3.5% |
| Global baseline | 0.3% | 3.7% | 4.8% |

**Lifts (A trigger vs intra):** Terminal 6.3x, Negative 2.4x, Positive 1.6x.

**Observation:** Positive outcomes also elevated — escalation accounts get more collection engagement overall. They are "hotter" accounts.

---

## Step 10: Outcome results — refined methodology

### Refinement: André's improved observation framework

André requested three changes:
1. Anchor observation on the escalation day (B.start), not on DQ duration
2. Count events on A's account and B's account separately within the same window
3. Add both a random baseline and the intra-account baseline, with sample sizes
4. Add dq_start and dq_end as event types

**Implementation:** For each escalation pair (W=15d), the observation window is [B.start, B.start + Z]. Events are counted on acc_a and acc_b independently. Combined = events on either account.

**Bug encountered and fixed:** Initial implementation had an index alignment bug — the escalation pairs DataFrame carried the original `pairs` DataFrame's arbitrary index, causing the summarize function to miss most rows on reindex. Sanity check (B-side dq_start should be ~100%) caught it immediately. Fixed by resetting index.

### Final results: Negative outcome incidence (W=15d)

Incidence rate = % of escalation DQ episodes where at least one negative event was observed on the relevant account within Z days of the escalation day.

| Z | Esc A-side | Esc B-side | Esc A+B | Random | Intra | Lift vs random | Lift vs intra |
|---|---|---|---|---|---|---|---|
| 30d | 3.9% | 3.7% | 6.0% | 0.6% | 1.5% | **10.0x** | **4.0x** |
| 60d | 6.3% | 6.0% | 9.2% | 1.1% | 2.4% | 8.4x | 3.8x |
| 90d | 8.3% | 8.0% | 11.8% | 1.5% | 3.4% | 7.9x | 3.5x |
| 120d | 9.7% | 9.5% | 13.8% | 1.8% | 4.3% | 7.7x | 3.2x |

### Terminal outcome incidence

| Z | Esc A+B | Random | Intra | Lift vs random | Lift vs intra |
|---|---|---|---|---|---|
| 60d | 0.4% | 0.1% | 0.1% | 4.0x | 4.0x |
| 90d | 0.6% | 0.1% | 0.1% | 6.0x | 6.0x |
| 120d | 0.8% | 0.1% | 0.1% | 8.0x | 8.0x |

### DQ recurrence (new DQ starts on A's account)

| Z | A-side | Random | Lift |
|---|---|---|---|
| 30d | 68.6% | 12.7% | **5.4x** |
| 60d | 77.5% | 17.6% | 4.4x |
| 90d | 82.0% | 21.1% | 3.9x |
| 120d | 84.2% | 23.1% | 3.6x |

### Symmetry finding

A-side and B-side negative outcome rates are nearly identical (3.9% vs 3.7% at Z=30d). Both sides of the escalation are equally affected — it's not that one side is "worse."

---

## Things That Didn't Work

1. **Pair-level symmetric co-delinquency.** The initial approach (do both accounts have DQ within ±W days?) showed lift below 1.0. The multi-account holder creditworthiness effect overwhelmed the escalation signal. The directional event-level framing was needed.

2. **Both-DQ conditioned random baseline.** Sampling random pairs only from accounts with DQ inflated the baseline because heavy-DQ accounts naturally overlap temporally. Fixed by sampling from the full population.

3. **memberrolecode as business identifier.** 97.7% PRIMARY across all high-account-count holders — not discriminating. The `isbusiness` flag was the effective signal.

4. **Index alignment in outcome counting.** The escalation pairs DataFrame carried a non-sequential index from the original join, causing the summarize function to miss most rows on reindex. Caught by sanity check (B-side dq_start should be 100%), fixed by resetting index.

---

## Key Takeaways

1. **Coverage is meaningful.** 15–30% of network DQs (6–10% of all DQs) could be preceded by an escalation alert, depending on the window W.

2. **The signal is strongest at tight windows.** Co-delinquency lift is 1.16x at W=5d, declining with wider windows. Near-simultaneous delinquency is most specific to person-level links.

3. **Escalation DQs are longer.** Trigger DQs are 1.63x longer than the same accounts' non-escalation DQs. Combined person exposure is 3.5x the global baseline.

4. **Negative outcomes show 8–10x lift vs random and 3–4x vs intra-account.** This is the strongest evidence: the same accounts behave worse during escalation episodes. The intra-account comparison controls for account-level risk.

5. **DQ recurrence is the standout finding.** 69% of trigger accounts relapse within 30 days (5.4x random). Escalation is a marker of sustained financial distress, not an isolated event.

6. **Multi-account holders are actually *less* delinquent.** The escalation effect is noteworthy precisely because it occurs in a population that is otherwise more creditworthy.

7. **Both sides are equally affected.** A-side and B-side negative outcome rates are symmetric — escalation is a person-level phenomenon, not an account-level one.

---

## Next Steps and Open Questions

1. **Cross-client validation.** These results are from one client. The 50 "Rich" clients from the segmentation analysis are the natural validation set.

2. **Product feature specification.** What should the escalation alert look like? Who sees it (collector? manager?), when does it fire (on DQ start? on escalation detection?), what action does it recommend?

3. **Causal vs correlational.** Escalation and negative outcomes may both be downstream of an unobserved financial stress event. Can we disentangle cause from correlation?

4. **Payment data.** This extract did not include payments. Incorporating missed/partial payments could strengthen the outcome story.

5. **Feature engineering.** Can escalation metrics improve existing DQ prediction models?

6. **Temporal dynamics.** Does the escalation signal vary by season, account age, or DQ recurrence index?

---

*Source data: `D:\akuvo-data\stakuvoproddatalake\analytics\analysis\escalation\0402-prod-31-extract`*
*Executive report: `Janea Akuvo/Escalation Analysis/0402 Executive Report.md`*
