# Escalation Analysis — Technical Reference

*Internal technical document. Defines terminology, metrics, control groups, and statistical methodology for delinquency escalation analysis across Akuvo's client portfolio.*

*Last updated: 2026-04-23. Status: draft.*

---

## 1. Overview

Escalation analysis studies what happens when financial distress spreads across a borrower's accounts — when delinquency on one account is followed by delinquency on a related account held by the same person. This pattern, which we call an **escalation scenario**, affects approximately 8% of all delinquency episodes across Akuvo's client base and is associated with substantially worse outcomes: longer delinquencies, more adverse events, and higher recurrence rates.

The analysis serves two purposes: (1) quantify the prevalence and severity of escalation across clients, and (2) inform whether escalation detection could be a useful signal for collection strategy — flagging accounts earlier, routing them differently, or adjusting prioritization.

All metrics are computed per client from the Akuvo data lake. Current analysis covers 18 clients with parameters W=15, Z=90.

---

## 2. Terminology

### 2.1 Related Account

An account that shares at least one common person with another account. The shared person may be the primary account holder or a co-signer/guarantor on either account.

### 2.2 Network Account

An account that has at least one related account. Accounts with no related accounts are excluded from escalation analysis since escalation is structurally impossible for them.

### 2.3 Escalation Scenario

A pattern where a delinquency on one account (the **trigger**, or **A**) is followed by a delinquency on a related account (the **ripple**, or **B**). Two sub-types:

- **Serial escalation**: B starts after A ends, within the escalation window W. That is, `A.end ≤ B.start ≤ A.end + W`.
- **Concurrent escalation**: B starts while A is still active. That is, `B.start < A.end`.

Both sub-types share the same escalation day (B.start) and are subject to the same observation window Z.

### 2.4 Trigger (A)

The first delinquency in an escalation scenario. It occurs on account A and either precedes or overlaps with the ripple delinquency.

### 2.5 Ripple (B)

The second delinquency in an escalation scenario, occurring on a related account B. Its start date defines the escalation day.

### 2.6 Escalated Delinquency

Any delinquency episode (A or B) that is part of an escalation scenario. Both the trigger and the ripple are escalated delinquencies.

### 2.7 Escalation Day

The date when the escalation scenario becomes identifiable: the start date of delinquency B.

### 2.8 Escalation Window (W)

For serial escalation only: the maximum number of days after A ends that B can start and still be considered part of an escalation scenario. Values tested: 0, 5, 15, 25, 35. Current default: **W = 15 days**.

W does not apply to concurrent escalation, where B starts before A ends.

### 2.9 Observation Window (Z)

The number of days after escalation day (B.start) during which outcomes are measured for both delinquencies A and B. Current default: **Z = 90 days**.

Events occurring after escalation day + Z are excluded from fallout metrics. This bounds the measurement period and ensures comparability across escalation scenarios with different start dates.

---

## 3. Metrics Framework

The analysis is organized around two conceptual questions:

### 3.1 Coverage

**How prevalent is escalation?**

Coverage measures what fraction of a client's delinquency portfolio involves escalation scenarios. It answers: "If we built an escalation flag, how many delinquencies would it cover?"

Coverage is a proportion — it does not require a control group.

### 3.2 Fallout

**How much worse are outcomes when escalation occurs?**

Fallout is the umbrella term for all adverse consequences associated with escalation. It is measured relative to a baseline control group and is subdivided into three categories:

**Impact** — How much more likely are negative events (broken promises, charge-offs, repossessions, etc.) to occur during an escalation scenario, compared to baseline?

**Duration** — How much longer do delinquencies last when they are part of an escalation scenario, compared to baseline?

**Relapse** — How much more likely are accounts involved in escalation to enter new delinquencies shortly after, compared to baseline?

Each fallout category can be measured against different control groups (§4) and at different levels of granularity (§5).

---

## 4. Control Groups

Fallout metrics are expressed as **lifts** — ratios of the escalation group's value to a baseline control group's value. A lift of 5.0x means the escalation group shows 5 times the rate (or volume, or duration) of the control group.

### 4.1 Random Baseline

**Definition:** Delinquency episodes sampled from the general population of network accounts that have at least one prior delinquency (≥1 DQ history).

**Sampling conditions:**
- Account must be a network account (has ≥1 related account)
- Account must have ≥1 historical delinquency episode
- The sampled episode must not itself be part of an escalation scenario

**What it controls for:** Ensures comparison is against accounts that *could* have experienced escalation (they have the network structure and delinquency history) but did not.

**What it does not control for:** Account-level risk. A high-risk account that escalates is compared against the average-risk network account. Observed differences may partly reflect that escalation-prone accounts are inherently riskier, not just that escalation makes things worse.

**Primary baseline for:** Impact, Relapse.

**Caution for:** Duration — random DQs come from accounts with potentially different risk profiles, products, and tenures. Duration differences may reflect account characteristics rather than escalation effects.

**Unit of analysis note:** For Impact and Duration metrics, sampling is at the delinquency-episode level. For Relapse, sampling is at the account level (recurrence is an account-level event).

### 4.2 Intra-Account Baseline

**Definition:** Non-escalation delinquency episodes on the *same pair of related accounts* that were involved in an escalation scenario.

**Sampling conditions:**
- Must be a DQ episode on an account that participated in at least one escalation scenario (as A or B)
- The sampled episode must not itself be part of an escalation scenario
- Must have occurred within a reasonable time window of the escalation (to control for temporal effects)

**What it controls for:** Account-level risk. By comparing escalation episodes to other episodes on the same accounts, we isolate the escalation effect from "this account is just riskier."

**What it does not control for:** Temporal effects (the account's risk profile may change over time). Selection bias (accounts that have both escalation and non-escalation episodes may differ from those that only escalate).

**Primary baseline for:** Duration.

**Caution for:** Relapse — requires the same accounts to have enough non-escalation episodes to establish a baseline recurrence rate. Sample-constrained; not all escalation accounts will have sufficient non-escalation history.

**Sample size limitation:** Intra-account samples are structurally smaller than random samples because they are restricted to the subset of accounts involved in escalation. For clients with few escalation pairs, intra-account metrics may be unreliable.

---

## 5. Metric Specifications

### 5.1 Coverage

| Metric | Shortcut | Definition | Control Group | Median | Range |
|---|---|---|---|---|---|
| **Coverage (total)** | **Coverage** | % of all DQ episodes that are escalated (A or B side) | *none* | 7.5% | 4.2–21.6% |
| Coverage (network) | | % of DQ episodes on network accounts that are escalated | *none* | 27.6% | — |
| Escalation pair count | | Absolute number of escalation pairs detected | *none* | 1,839 | — |

**Notes:**
- "Coverage" without qualifier always means % of total DQs, not % of network DQs.
- The network-DQ coverage (~28%) is a secondary reference; it overstates the prevalence by restricting the denominator to multi-account holders.

---

### 5.2 Impact

Impact measures the association between escalation and negative outcome events within the observation window Z.

**Negative outcome events** are classified into 15 activity types across two tiers:

*Terminal (9 types)* — loss events: CREATE_CASE_CHARGE_OFF, RECOMMEND_CHARGE_OFF, CREATE_CASE_REPOSSESSION, RECOMMEND_REPOSSESSION, CREATE_CASE_BANKRUPTCY, CREATE_CASE_IMPOUND, RECOMMEND_FORECLOSURE, CREATE_CASE_LEGAL, CREATE_CASE_FORECLOSURE.

*Non-terminal (6 types)* — distress signals: PROMISE_BROKEN, PROMISE_CANCELLED, DO_NOT_COLLECT, DO_NOT_CONTACT, RECOMMEND_SKIP_TRACE, CREATE_CASE_HARDSHIP.

Impact is measured in two flavors:

- **Incidence lift** = proportion of escalation episodes with ≥1 negative event ÷ proportion of baseline episodes with ≥1 negative event. Answers: "how much more *likely* are negative events?"
- **Volume lift** = mean negative event count per escalation episode ÷ mean negative event count per baseline episode. Answers: "how many *more* negative events occur?"

Volume is richer (captures severity, not just presence) but noisier. Incidence is more stable but binary.

| Metric | Shortcut | Definition | Control Group | Median |
|---|---|---|---|---|
| **Negative incidence lift** | **Impact** | Incidence lift of all 15 negative event types | Random | 8.8x |
| Negative incidence lift | | Incidence lift of all 15 negative event types | Intra | 3.4x |
| Negative volume lift | | Volume lift of all 15 negative event types | Random | *not yet computed* |
| Negative volume lift | | Volume lift of all 15 negative event types | Intra | 5.6x |
| Non-terminal incidence lift | | Incidence lift of 6 distress signal types | Intra | 3.4x |
| Non-terminal volume lift | | Volume lift of 6 distress signal types | Intra | 4.9x |
| Terminal incidence lift | | Incidence lift of 9 loss event types | Intra | 6.2x |
| Terminal volume lift | | Volume lift of 9 loss event types (noisy — sparse events) | Intra | 7.6x |
| Raw incidence (escalation) | | % of escalation episodes with ≥1 negative event | — | 11.5% |
| Raw incidence (intra) | | % of intra baseline episodes with ≥1 negative event | — | 3.3% |

**Shortcut metric:** "Impact" = negative incidence lift vs random (8.8x). This is the headline number for stakeholder communication.

**Key gap:** Negative volume lift vs random is not yet computed. Adding it would complete the 2×2 (incidence/volume × random/intra).

---

### 5.3 Duration

Duration measures how much longer delinquencies last when they are part of an escalation scenario.

Duration is measured separately for A-side (trigger) and B-side (ripple) delinquencies. The core "Duration" metric is the mean of both sides: `(dur_A_lift + dur_B_lift) / 2`.

| Metric | Shortcut | Definition | Control Group | Median |
|---|---|---|---|---|
| **Duration AB** | **Duration** | Mean of A-side and B-side duration lift: `(dur_A + dur_B) / 2` | Intra | ~1.9x |
| Duration A | | Mean DQ duration of trigger episodes ÷ mean duration of intra baseline episodes | Intra | 2.0x |
| Duration B | | Mean DQ duration of ripple episodes ÷ mean duration of intra baseline episodes | Intra | 1.8x |
| Duration A (raw) | | Raw mean trigger DQ duration in days | — | 23.6d |
| Duration B (raw) | | Raw mean ripple DQ duration in days | — | 21.2d |
| Baseline duration (global) | | Mean DQ duration for all non-escalation DQs | — | 15.1d |

**Primary control group:** Intra-account. Duration vs random is confounded by account-level characteristics (product type, risk tier, tenure) that influence base DQ duration independent of escalation.

**Duration vs random:** Not currently computed. Could be added with appropriate normalization (e.g., controlling for product type), but intra-account is the cleaner comparison for this metric.

---

### 5.4 Relapse

Relapse measures how much more likely accounts involved in escalation are to enter new delinquencies shortly after the escalation scenario.

**Unit of analysis shift:** Unlike Impact and Duration (measured at the episode level), Relapse is measured at the **account level** — specifically, the trigger (A) account. The question is whether the account itself relapses, not whether a specific episode relapses.

| Metric | Shortcut | Definition | Control Group | Median | Range |
|---|---|---|---|---|---|
| **Relapse lift (A, 30d)** | **Relapse** | % of A accounts with ≥1 new DQ start within 30d of escalation day ÷ % of random baseline accounts with ≥1 new DQ start in equivalent window | Random | 8.0x | 4.8–21.7x |
| Relapse rate (A, escalation) | | Raw % of trigger accounts that relapse within 30d | — | 69.0% | — |
| Relapse rate (random) | | Raw % of random baseline accounts that relapse within 30d | — | 8.8% | — |

**Primary control group:** Random. The random baseline provides larger samples and a meaningful reference point: "How does escalation recurrence compare to general recurrence among similar accounts?"

**Relapse vs intra:** Not currently computed. Conceptually cleaner (same accounts), but sample-constrained: not all escalation accounts will have sufficient non-escalation history to establish a baseline recurrence rate.

**B-side relapse:** Not currently computed. Could be added as a separate metric measuring recurrence on ripple accounts. May show different patterns than A-side relapse since B is the "follower" in the scenario.

---

### 5.5 Composite

| Metric | Definition |
|---|---|
| **Escalation Opportunity Score** | `coverage × mean(Impact, Duration, Relapse)` |

Where coverage is expressed as a proportion (0–1) and Impact, Duration, and Relapse are the shortcut lift metrics defined above (using their respective primary control groups).

**Interpretation:** An index combining prevalence and severity. Higher scores indicate clients where escalation detection would have more potential value. Can exceed 100% — it is an index, not a probability.

**Status:** Needs recomputation with updated formula and renamed metrics.

---

## 6. Statistical Considerations

### 6.1 Point Estimates and Uncertainty

All metrics reported above are **point estimates** — single values computed from available data without quantification of uncertainty. The same 5.6x lift from a client with 50,000 escalation pairs and a client with 83 pairs are reported with equal implied confidence, which is misleading.

### 6.2 Confidence Intervals

Confidence intervals should be computed for each metric × control group × client combination via **bootstrap resampling**:

1. For each client, take the escalation group and the relevant control group (random or intra).
2. Resample both groups with replacement (same size as original).
3. Recompute the lift metric from the resampled data.
4. Repeat N=1,000 times.
5. Report the 2.5th and 97.5th percentiles as the 95% confidence interval.

**Example output:** Instead of "Impact = 8.8x", report "Impact = 8.8x (95% CI: 7.2–10.5x)".

**Interpretation:** If the CI includes 1.0x, the effect is **inconclusive** for that client — we cannot confidently say escalation is associated with worse outcomes on that metric.

The bootstrap approach is identical for both control groups — only the input populations differ:
- **Random:** resample from the escalation group and the random DQ pool independently; recompute lift.
- **Intra:** resample from escalation episodes and non-escalation episodes on the same accounts; recompute lift.

### 6.3 Minimum Sample Size Threshold

Below a certain number of escalation pairs, metrics become unreliable regardless of CIs. A pragmatic threshold should be established (e.g., N ≥ 100 escalation pairs) below which per-client metrics are flagged as **insufficient sample** rather than reported with wide CIs.

### 6.4 Cross-Client Consistency as Meta-Evidence

Even where individual client CIs are wide, the fact that all 18 clients show lifts consistently above 1.0x for all fallout metrics is itself strong evidence. This is analogous to a meta-analytic argument: 18 independent replications of the same directional effect, despite heterogeneous populations and data quality.

| Core Metric | Median | Range | Consistency (1-CV) |
|---|---|---|---|
| Coverage | 7.5% | 4.2–21.6% | 0.53 |
| Duration | ~1.9x | ~1.4–2.8x | ~0.79 |
| Impact | 8.8x | — | — |
| Relapse | 8.0x | 4.8–21.7x | 0.50 |

Higher consistency (closer to 1.0) means more stable across clients; lower means more client-dependent.

---

## 7. Known Limitations and Open Items

### 7.1 Measurement Gaps

- [ ] **Negative volume lift vs random** — only incidence (not volume) is computed vs random. This is the highest-priority gap; it would complete the 2×2 for Impact.
- [ ] **Duration AB combined metric** — A-side and B-side lifts are computed separately but the combined mean is not yet reported.
- [ ] **Escalation opportunity score** — needs recomputation with updated formula and renamed metrics.
- [ ] **B-side relapse** — recurrence is only measured on trigger (A) accounts; ripple (B) recurrence may show different patterns.

### 7.2 Statistical Gaps

- [ ] **Confidence intervals** — not yet implemented. All metrics are point estimates.
- [ ] **Sample sizes per metric per client** — not documented in the output.
- [ ] **Minimum sample threshold** — no formal threshold established for flagging unreliable per-client metrics.

### 7.3 Methodological Limitations

- **Correlation, not causation.** Escalation may be a *symptom* of underlying financial distress rather than a *cause* of worse outcomes. Accounts that escalate may be structurally riskier. The intra-account baseline partially addresses this, but temporal confounding remains.
- **Serial vs concurrent not yet distinguished in implementation.** The current analysis implements serial escalation only (B.start ≥ A.end). Concurrent escalation (B.start < A.end) is defined but not yet computed. This may affect coverage numbers and impact signals.
- **Observation window sensitivity.** Z=90 is a single configuration. Outcomes measured at Z=30 or Z=180 may tell different stories, particularly for Duration and Relapse.
- **Heterogeneity across clients.** Coverage ranges from 4.2% to 21.6%, relapse from 4.8x to 21.7x. Per-client differences may reflect true behavioral variation, differences in data recording practices, or both. Clients 60, 91, and 96 have been flagged for DQ recording anomalies.
- **Activity type classification.** The 15 negative outcome types are derived from Akuvo activity codes. Classification into terminal vs non-terminal is based on domain judgment and has not been validated against actual loss outcomes.
