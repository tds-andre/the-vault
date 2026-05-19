# Filip's Escalation Notebook — Comparative Review

*Review of `docs/AKUVO_ESCALATION.ipynb` against the canon escalation methodology (Client 31 deliverable, 2026-04-24). Authored by Joane (narrow), 2026-05-11.*

---

## 1. Business / Requirements Difference

The two artifacts serve fundamentally different purposes:

| Dimension             | Canon methodology                                                                   | Filip's notebook                                                        |
| --------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Goal**              | Prove the escalation signal exists and quantify its severity                        | Deploy a rule-based score to production                                 |
| **Question answered** | "When delinquency spreads across a person's accounts, how much worse are outcomes?" | "How many of this account's related accounts are currently delinquent?" |
| **Output**            | Analytical reports, pair-level data, lift metrics with CIs                          | An integer score (0–5) per account, persisted to a shared Delta table   |
| **Temporal scope**    | Retrospective — looks at historical DQ episodes with defined windows (W, Z)         | Point-in-time — snapshot of current/recent DQ state                     |
| **Audience**          | Internal analytics, stakeholder presentation                                        | Platform consumption (likely surfaced in the UI or used for routing)    |
| **Data consumed**     | Accounts, DQs, activities (for outcome measurement)                                 | Accounts, DQs, person relationships (no activities at all)              |

**In short:** our work asks "is this signal real and how strong is it?" Filip's work skips that question and ships a simple heuristic. They are complementary — ours validates the signal, his operationalizes *a version of* it — but his version doesn't encode the signal we measured.

---

## 2. Key Conceptual Differences

### 2.1 No escalation pairs (A/B), no directionality

The canon methodology identifies ordered pairs: a trigger delinquency (A) on one account followed by a ripple delinquency (B) on a related account. This directionality is central — it lets us measure whether the *second* DQ is worse, whether the *trigger* account relapses, etc.

Filip's score is **symmetric**: for each account, count how many *other* accounts sharing a liable person are recently delinquent. There is no trigger, no ripple, no ordering. An account with 3 related DQs scores 3 whether it went DQ first, last, or not at all.

### 2.2 No temporal windows (W, Z)

The canon uses two windows:
- **W (escalation window, default 15d):** defines how far apart DQs can be to still constitute an escalation scenario (serial case).
- **Z (observation window, default 90d):** bounds the period for measuring outcomes.

Filip's notebook has neither. It uses `DQ_RECENT_LOOKBACK_DAYS` (see §3.1 below) to decide whether a DQ is "recent enough" to count — this is conceptually a W-like parameter, but applied differently (rolling window from today, not relative to another DQ).

### 2.3 No outcome measurement (no fallout)

The canon measures three fallout dimensions: Impact (negative events), Duration (DQ length), Relapse (recurrence). These are what make the escalation signal valuable — they quantify *how much worse* things get.

Filip's score uses **zero outcome data**. No activities are loaded. The score is purely structural: "how exposed is this account to concurrent delinquency in its network?" This means the score has no empirical calibration to actual risk — it assumes more concurrent DQs = worse, but doesn't validate or weight that assumption.

### 2.4 No control groups, no baselines

The canon uses two baselines (random, intra-account) to distinguish "escalation makes things worse" from "these accounts were always riskier." Filip's score has no baseline concept — it's a raw count, not a lift.

### 2.5 No serial vs concurrent distinction

The canon distinguishes serial escalation (B starts after A ends) from concurrent (B starts while A is active), with different prevalence (44% serial, 56% concurrent for Client 31). Filip's score doesn't distinguish — any recent DQ counts equally whether it overlaps or follows.

### 2.6 Score semantics

Filip's score = `min(count_of_other_recently_DQ_accounts_via_same_person, 5)`.

This is a **network exposure count**, not an escalation risk score. An account scoring 3 might be:
- The first account to go DQ in a network of 4 (it *caused* the escalation, or is at least the trigger).
- The last to go DQ (it *is* the escalation).
- Not delinquent at all, but has 3 related accounts that are.

All three scenarios score identically, despite representing very different risk profiles.

### 2.7 Person linkage

Both approaches link accounts through persons. Filip uses `personid` with a fallback to `personprofileid` (via `COALESCE(personid::string, personprofileid::string)`). Our pipeline uses the `acc_profile` table which links accounts through common persons (primary or co-signer). The linkage semantics are similar but the implementation paths differ — Filip goes through `PersonProfileAccount` + `PersonProfile` + `AccountRole`, filtering to liable non-business persons.

---

## 3. Business Logic and Data Model Issues

### 3.1 `DQ_RECENT_LOOKBACK_DAYS` is undefined

Line 42: `DQ_RECENT_LOOKBACK_DAYS = ` — the value is **missing**. This is a hard bug. The notebook will fail at runtime (or worse, silently use `None` in a comparison). This parameter controls which DQs count as "recent" and is therefore the single most important tunable in the scoring logic.

### 3.2 Stray variable on line 810

Line 810: `client` — an incomplete expression with no assignment or function call. Likely a leftover from editing. Will raise a `NameError` or silently evaluate to nothing depending on context.

### 3.3 Score conflates exposure levels without calibration

A score of 1 (one related account DQ) and a score of 4 (four related accounts DQ) are treated as ordinal levels, but our analysis shows that even a single escalation pair is associated with 3.96x impact lift and 3.83x relapse lift (Client 31). The relationship between count-of-related-DQs and actual risk is not linear, and the score doesn't attempt to calibrate this. The cap at 5 is arbitrary.

### 3.4 No duration or severity weighting

A related account that went DQ for 2 days and cured counts the same as one that's been DQ for 90 days and heading toward charge-off. The binary `recently_delinquent` flag discards severity information that's available in the data.

### 3.5 Recently-delinquent flag uses only the latest DQ per account

`build_recent_delinquent_accounts` takes `row_number().over(orderBy(startdate.desc()))` and keeps only `rn == 1`. If an account has an older active DQ and a newer cured DQ, only the newer (cured) one is considered. This could cause false negatives — an account with a still-active older DQ won't be flagged as recently delinquent if its most recent DQ (by start date) has ended and is outside the lookback window.

### 3.6 MAX aggregation across liable persons

When an account is linked to multiple liable persons, the score is `MAX(score_raw)` across all persons. This means one high-risk person dominates the score, regardless of how many low-risk persons are also linked. This is a defensible choice (worst-case exposure), but it should be documented as a design decision.

### 3.7 No network-account concept / no structural filtering

The canon explicitly defines "network accounts" (accounts with ≥1 related account) and excludes non-network accounts from analysis since escalation is structurally impossible. Filip's score doesn't filter — non-network accounts will simply score 0. This is fine for scoring but means the pipeline processes many accounts that can never receive a non-zero score.

### 3.8 Change detection is integer-granularity

`prepare_escalation_scores_for_persistence` compares new `score` (integer, capped at 5) to `previous_score`. If `score_raw` changes (e.g., from 2.0 to 3.0) but `score` (capped) stays at 5, no update is persisted. This is probably intentional, but means the raw score drift is invisible to downstream consumers.

### 3.9 No activity-type data → no outcome-aware scoring

The notebook loads zero activity tables. This means it cannot distinguish between accounts whose related DQs led to charge-offs vs. those that cured quickly. Our analysis shows that the *type* of outcome is a key differentiator (terminal vs non-terminal events). A future iteration should consider outcome-aware weighting.

---

## 4. Conclusions and Observations

### 4.1 This is not a replacement for our escalation analysis

Filip's notebook is a **production scoring pipeline** — it answers "what score should this account get right now?" Our work is an **analytical validation** — it answers "is escalation a real signal, and how strong is it?" These are different deliverables serving different purposes. Filip's work would benefit from our findings (calibration, outcome weighting, severity tiers), and our work eventually needs something like Filip's to reach production.

### 4.2 The score is a reasonable MVP, but uncalibrated

Counting related DQ accounts is a valid zero-order approximation. It captures the core idea — network exposure to delinquency — in a production-friendly way. But it throws away most of what makes the escalation signal valuable: directionality, temporal dynamics, outcome severity, and empirical calibration.

### 4.3 Integration path

Rather than treating these as competing approaches, the natural path is:

1. **Keep our analytical methodology** as the ground truth for signal validation and client-level assessment.
2. **Use Filip's pipeline as the production scaffolding** — the Cosmos DB integration, schema resolution, Delta persistence, and change detection are production-ready plumbing we'd need anyway.
3. **Replace the scoring kernel** (`score_escalation`) with logic informed by our findings — potentially incorporating temporal windows, outcome calibration, or at minimum a validated mapping from count → risk tier.

### 4.4 What Filip got right

- **Production-grade infrastructure:** Cosmos DB client resolution, multi-client Delta loading, schema discovery, change detection, logging — this is solid Synapse pipeline work.
- **Liable-person filtering:** Filtering to liable, non-business persons is a sensible default. Our methodology doesn't explicitly filter on liability.
- **Portfolio exclusion:** INVESTMENT/DEPOSIT exclusion is business-appropriate.
- **Account status filtering:** Excluding CLOSED accounts avoids scoring dead accounts.

### 4.5 What's missing for a production escalation score

- **Temporal awareness** — at minimum, distinguish "this related DQ started recently" from "this related DQ has been lingering for months."
- **Outcome calibration** — use our lift data to weight the score or define score tiers that map to empirically validated risk levels.
- **Directionality** — flag whether this account is the trigger or the ripple (the ripple is the actionable one for early intervention).
- **The `DQ_RECENT_LOOKBACK_DAYS` bug** — must be fixed before any production run.
- **Activity data** — even if not used in the score formula, loading activities would enable validation of the score's predictive power in production.

### 4.6 Risk: shipping an uncalibrated score

If this score goes live without calibration, there's a risk that consumers (internal or client-facing) treat it as a validated risk signal when it's actually a raw count. A score of 3 *sounds* worse than 1, but we don't know the actual risk curve. Our analysis could provide the empirical backing to either validate or reshape the score tiers.
