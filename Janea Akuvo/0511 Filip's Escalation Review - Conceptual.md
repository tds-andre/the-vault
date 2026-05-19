# Filip's Escalation Notebook — Comparative Review

*Review of `docs/AKUVO_ESCALATION.ipynb` against the canon escalation methodology (Client 31 deliverable, 2026-04-24) and our pipeline implementation (`pipelines/escalation/`). Authored by Joane (narrow), 2026-05-11.*

---

## 1. Business / Requirements Difference

The two artifacts serve fundamentally different purposes:

| Dimension | Canon methodology / our pipeline | Filip's notebook |
|---|---|---|
| **Goal** | Prove the escalation signal exists and quantify its severity | Deploy a rule-based score to production |
| **Question answered** | "When delinquency spreads across a person's accounts, how much worse are outcomes?" | "How many of this account's related accounts are currently delinquent?" |
| **Output** | Analytical reports, pair-level data, lift metrics with CIs | An integer score (0–5) per account, persisted to a shared Delta table |
| **Temporal scope** | Retrospective — looks at historical DQ episodes with defined windows (W, Z) | Point-in-time — snapshot of current/recent DQ state |
| **Audience** | Internal analytics, stakeholder presentation | Platform consumption (likely surfaced in the UI or used for routing) |
| **Data consumed** | Accounts, DQs, activities (for outcome measurement) | Accounts, DQs, person relationships (no activities at all) |

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

---

## 5. Comparison with Our Pipeline Implementation (`pipelines/escalation/`)

Our codebase has two complementary modules:
- **`analysis.py`** — retrospective per-client analysis (Pandas). Detects pairs, builds controls, computes fallout, bootstraps CIs.
- **`run.py`** — production-oriented Spark pipeline. Detects active pairs, emits scores, writes to the feature store.

Filip's notebook occupies the same space as `run.py` (production scoring), not `analysis.py` (analytical validation). The comparison below focuses on `run.py` vs Filip's notebook since they share the same goal: produce a score per account.

### 5.1 Architecture comparison

| Aspect | Our `run.py` | Filip's notebook |
|---|---|---|
| **Engine** | PySpark (works in both local Spark and Synapse) | PySpark (Synapse-only; uses `mssparkutils`, `spark` globals) |
| **Environment** | Environment-agnostic via `akuvo.analytics.environment` | Hardcoded to Synapse (Cosmos DB, managed identity, `mssparkutils`) |
| **Data loading** | FeatureStore abstraction → reads from `store/` (pre-integrated Delta) | Direct Cosmos DB schema resolution → reads raw per-client Delta tables from ADLS |
| **Client selection** | From `clientquality` table (rich tier), with explicit exclusions | From Cosmos DB `Scores` collection — clients that have `AKUVO_ESCALATION` enabled |
| **Code organization** | Module functions in a package, thin `run()` entry point | Monolithic notebook with all logic inline |
| **Output** | Writes pairs + scores to feature store (`store/apps/escalation/`) | Writes scores to a shared `scores` Delta table in the `scores` container |

### 5.2 Detection logic

Both pipelines detect escalation pairs, but with critical differences:

| Aspect | Our `run.py` | Filip's notebook |
|---|---|---|
| **Unit of output** | Escalation *pairs* (A-DQ, B-DQ) with directionality | Per-account *count* of recently-DQ related accounts |
| **Pair detection** | Yes — joins DQ episodes via network edges, identifies trigger (A) and ripple (B) | No pair detection at all — counts concurrent DQ flags |
| **Window parameter** | `W=15` (escalation window: max gap between A.end and B.start) | `DQ_RECENT_LOOKBACK_DAYS` (rolling window from today, not relative to another DQ) |
| **Concurrent vs serial** | Explicitly classified (`gap_days < 0` → concurrent, else serial) | No distinction |
| **Active filter** | Pairs where at least one side has active DQ (enddate IS NULL or ≥ as_of_date) | DQs that are active OR ended within lookback window |
| **Dedup** | Best A per B (closest gap, prefer serial) | No dedup needed — it's a count, not pairs |
| **Business filter** | Excludes accounts where PRIMARY person is a business | Same approach (filters via `PersonProfile.isbusiness`) |
| **DQ duration filter** | `dq_duration > 1 day` | `dq_duration_days >= 2 days` (equivalent) |

### 5.3 Score semantics

| Aspect | Our `run.py` | Filip's notebook |
|---|---|---|
| **Score meaning** | Binary flag (1 = this DQ is part of an active escalation pair) | Count of related DQ accounts (0–5) |
| **Score_raw** | Always 1.0 (presence flag) | Raw count (unbounded) |
| **Score** | Always 1 | `min(score_raw, 5)` |
| **DQ-level vs account-level** | DQ-level — each scored row references a specific `delinquencyid` | Account-level — no delinquency reference, one score per account |
| **Side tracking** | Yes — each score carries `side = 'A'` or `side = 'B'` | No — the account's role (trigger vs ripple) is unknown |
| **Granularity** | One row per active DQ involved in escalation | One row per account (MAX across all liable persons) |

This is the most important structural difference. Our `run.py` preserves the A/B pair structure and tells you *which specific DQ* is escalating and *which side* it's on. Filip's score tells you the account has DQ exposure in its network, but not which DQ is involved or what role the account plays.

### 5.4 Data model and linkage

| Aspect | Our `run.py` | Filip's notebook |
|---|---|---|
| **Network construction** | `acc_profile.profileid` → group accounts by shared person → explode to edges | `PersonProfileAccount` → `PersonProfile` → filter liable, non-business → `COALESCE(personid, personprofileid)` as person key |
| **Liability filter** | Not applied — all account-person relationships in `acc_profile` count | Explicit: only liable roles via `AccountRole.isliable` join |
| **Account eligibility** | All accounts in the integrated dataset (business filter only) | Excludes CLOSED accounts and INVESTMENT/DEPOSIT portfolios |
| **Source tables** | `acc_profile`, `dq_episodes` (pre-integrated, pre-enriched) | `PersonProfileAccount`, `PersonProfile`, `Account`, `AccountType`, `AccountRole`, `Delinquency` (raw source tables) |

Our pipeline consumes pre-integrated data; Filip works with raw source tables. This means Filip's code handles schema resolution and multi-client loading that our integration pipeline already does for us.

### 5.5 Persistence and output

| Aspect | Our `run.py` | Filip's notebook |
|---|---|---|
| **Output location** | Feature store at `store/apps/escalation/{pairs, scores}` | Shared `scores` Delta table in `scores` container |
| **Persistence mode** | Overwrite (full refresh per run) | Append with change detection (only writes rows where score changed) |
| **Schema** | Custom (includes `side`, `delinquencyid`, `maxdqstartdate`) | Standard `scores` table schema (shared across score types) |
| **Previous-score comparison** | Not implemented | Yes — loads latest persisted score per account, skips unchanged |
| **Multi-score table** | No — dedicated escalation output | Yes — writes to same table as other scores, discriminated by `scorecode` |

Filip's persistence model is more production-appropriate: it writes to a shared scores table (alongside other score types like presumably credit risk), does change detection to avoid unnecessary writes, and follows an append pattern. Our pipeline overwrites the entire output on each run, which is fine for analytics but not for production.

### 5.6 What our `run.py` has that Filip's doesn't

- **Pair-level data**: we emit the actual escalation pairs with A/B roles, gap days, escalation type — this is the analytical substrate.
- **DQ-level scoring**: each flagged row ties to a specific delinquency, not just an account.
- **Side tracking**: `side = 'A'` or `'B'` tells the consumer whether this is the trigger or the ripple.
- **Escalation type**: serial vs concurrent classification is preserved.
- **As-of-date flexibility**: can simulate "what would have been active on date X" for backtesting.

### 5.7 What Filip's notebook has that our `run.py` doesn't

- **Cosmos DB integration**: client discovery via score configuration, schema resolution per client.
- **Change detection**: only persists rows where the score actually changed.
- **Shared scores table**: writes to a multi-score Delta table that other pipelines also use.
- **Account eligibility filtering**: portfolio and status exclusions (CLOSED, INVESTMENT, DEPOSIT).
- **Liability filtering**: only considers liable account roles.
- **Logging infrastructure**: structured JSON logging with context propagation.
- **Ordinal score**: score > 1 carries meaning (more exposed accounts score higher).

### 5.8 Summary: what would a merged production pipeline look like?

The ideal production escalation score would combine:

1. **Filip's production plumbing** — Cosmos DB client discovery, schema resolution, shared scores table, change detection, logging.
2. **Our detection logic** — pair-based detection with W, serial/concurrent, A/B roles, dedup by best-matching trigger.
3. **A richer score formula** — instead of a raw count, use pair detection to assign role-aware scores (e.g., ripple accounts score higher than trigger accounts; concurrent pairs score differently from serial).
4. **Our eligibility additions** — combined with Filip's portfolio/status exclusions (which are sensible and we should adopt).
5. **DQ-level output** — preserve `delinquencyid` and `side` in the output so downstream consumers know which DQ is the concern.