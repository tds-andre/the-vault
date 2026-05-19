# Filip's Notebook vs `escalation/run.py` — Production Pipeline Comparison

*Focused comparison of two production-oriented escalation pipelines: our `run.py` and Filip's `AKUVO_ESCALATION.ipynb`. Both aim to produce a per-account escalation score in Spark for Synapse. The analytical layer (`analysis.py`) is out of scope — that's measurement, not scoring. 2026-05-11.*

---

## 1. What each pipeline does

**Our `run.py`:** Detects active escalation *pairs* (trigger DQ A + ripple DQ B on related accounts), then expands each pair into per-DQ score rows. Output: binary flag (score=1) per DQ involved in an active escalation scenario, with A/B side tracked.

**Filip's notebook:** For each account, counts how many *other* accounts tied to the same liable person are recently delinquent. Output: integer score (0–5) per account representing network DQ exposure.

Both run in PySpark, both target Synapse, both produce rows in a scores-like schema. But they answer different questions:

| | Our `run.py` | Filip's notebook |
|---|---|---|
| **Question** | "Is this DQ part of an active escalation scenario?" | "How many of this account's related accounts are currently DQ?" |
| **Output unit** | One row per escalated *DQ* | One row per *account* |
| **Score value** | Binary (1 = yes, in escalation) | Ordinal (0–5 = count of related DQ accounts) |

---

## 2. Detection logic

### Our approach: pair detection

```
For each DQ_B:
  Find DQ_A on a network-related account where:
    - A.start ≤ B.start               (A is the trigger)
    - B.start - A.end ≤ W=15 days     (within escalation window)
  Classify: gap < 0 → concurrent, gap ≥ 0 → serial
  Dedup: keep best-matching A per B (closest gap, prefer serial)
  Filter: at least one side still active (enddate IS NULL)
```

This produces *pairs* with full provenance: which two DQs, on which two accounts, which is A and which is B, serial or concurrent, gap in days.

### Filip's approach: count recent DQ neighbours

```
For each account:
  Find all liable non-business persons linked to it
  For each person, count how many of their other accounts are recently DQ
  Score = max count across all persons, capped at 5
```

No pairs, no directionality, no temporal relationship between DQs. Just: "right now, how many related accounts are in trouble?"

### Key detection differences

| Aspect | Our `run.py` | Filip's notebook |
|---|---|---|
| **Pair structure** | Yes — explicit (A, B) pairs | No — per-account count |
| **Directionality** | A = trigger, B = ripple (ordered by start date) | None — symmetric count |
| **Temporal constraint** | W=15d window between A.end and B.start | `DQ_RECENT_LOOKBACK_DAYS` from today (**value missing — hard bug**) |
| **Serial vs concurrent** | Classified and preserved | Not distinguished |
| **Dedup strategy** | Best A per B (closest gap) | N/A (count, not pairs) |
| **Active filter** | At least one DQ side has `enddate IS NULL` | DQ is active OR ended within lookback window |
| **DQ duration filter** | `> 1 day` | `≥ 2 days` (equivalent) |
| **Business filter** | Excludes accounts where PRIMARY is a business | Same |

---

## 3. Person linkage and eligibility

| Aspect | Our `run.py` | Filip's notebook |
|---|---|---|
| **Network source** | `acc_profile` table (pre-integrated) | Raw `PersonProfileAccount` + `PersonProfile` + `AccountRole` |
| **Person key** | `profileid` from acc_profile | `COALESCE(personid, personprofileid)` |
| **Liability filter** | Not applied — all relationships count | Only liable roles (`AccountRole.isliable`) |
| **Account eligibility** | All non-business accounts | Non-business + non-CLOSED + excludes INVESTMENT/DEPOSIT portfolios |
| **Account roles** | Implicit in acc_profile (primary + co-signer) | Explicit join on `AccountRole` to filter to liable roles |

Filip's eligibility filtering is tighter and more production-appropriate: he excludes closed accounts and savings portfolios. Our pipeline doesn't apply these filters — we rely on the integrated data being pre-filtered. Whether that's actually the case depends on the integration pipeline's logic.

The liability filter is a meaningful difference. Our pipeline counts *all* person-account relationships (including non-liable ones like authorized signers). Filip only counts liable relationships. This could produce different network graphs and therefore different escalation detection results.

---

## 4. Score output

### Our score row

```
clientcode | scorecode | accountid | delinquencyid | score_raw | score | maxdqstartdate | score_date | timestamp | modelversion | side
```

- One row per *delinquency* involved in escalation.
- `delinquencyid` tells you exactly which DQ.
- `side = 'A'` or `'B'` tells you the role.
- Score is always 1 (binary: escalated or not).

### Filip's score row

```
clientcode | scorecode | accountid | delinquencyid (NULL) | maxdqstartdate (NULL) | score_raw | score | score_date | timestamp | modelversion
```

- One row per *account*.
- No `delinquencyid` — score is account-level, not DQ-level.
- No `side` — role is unknown.
- Score is 0–5 (ordinal: number of related DQ accounts, capped).

### What this means for consumers

Our output lets a downstream system say: "Account X has DQ #1234 which is the ripple side of an escalation scenario — flag it for early intervention." Filip's output says: "Account X has a score of 3 — three of its related accounts are currently DQ." The first is actionable and specific; the second is a risk indicator.

---

## 5. Infrastructure and environment

| Aspect | Our `run.py` | Filip's notebook |
|---|---|---|
| **Portability** | Local Spark + Synapse (via `is_synapse()`) | Synapse-only (`mssparkutils`, Cosmos DB, managed identity) |
| **Data source** | FeatureStore (pre-integrated Delta in `store/`) | Raw per-client Delta tables in ADLS, resolved via Cosmos DB |
| **Client discovery** | `clientquality` table in feature store | Cosmos DB `Scores` collection (clients with `AKUVO_ESCALATION` enabled) |
| **Output target** | Feature store at `store/apps/escalation/` | Shared `scores` Delta table in `scores` container |
| **Write mode** | Overwrite (full refresh) | Append with change detection (only new/changed scores) |
| **Logging** | `print()` | Structured JSON logging via Log4j |
| **Previous-score handling** | None — rewrites everything | Loads latest persisted score, skips unchanged |

Filip's infrastructure is more production-mature:
- **Change detection** avoids redundant writes — important for a pipeline that runs on a schedule.
- **Shared scores table** puts escalation alongside other score types (credit risk, etc.) — standard platform pattern.
- **Cosmos DB client resolution** discovers which clients have escalation enabled — self-service configuration vs our hardcoded client list.
- **Structured logging** is essential for production observability.

Our infrastructure has one advantage: **local executability**. We can run and debug locally with `init_local_spark()`. Filip's code is Synapse-only.

---

## 6. Bugs and issues in Filip's notebook

1. **`DQ_RECENT_LOOKBACK_DAYS = ` (no value)** — the most critical parameter is undefined. Hard crash at runtime.
2. **`client` on line 810** — stray expression, likely leftover.
3. **Latest-DQ-only flag** — `build_recent_delinquent_accounts` keeps only the most recent DQ per account by start date. An account with an older *active* DQ and a newer *cured* DQ will not be flagged as recently delinquent. Edge case, but wrong.

---

## 7. Summary: what each brings to the table

### Our `run.py` has

- Pair-level detection with A/B roles
- Serial vs concurrent classification
- DQ-level scoring (specific delinquency referenced)
- Temporal window (W=15) between related DQs
- Local + Synapse portability
- As-of-date backtesting mode

### Filip's notebook has

- Richer account eligibility (closed/portfolio exclusions)
- Liability-aware person linkage
- Ordinal score (exposure count, not binary)
- Change detection (only persist new/changed scores)
- Shared scores table (multi-score-type output)
- Cosmos DB client discovery (self-service configuration)
- Structured production logging
- Account-level output (simpler for platform consumption)

### Neither has

- Outcome-aware scoring (no activity data used)
- Calibrated risk tiers (score ↔ actual risk unknown)
- Duration/severity weighting

---

## 8. Bottom line

They're closer than they look. Both detect network DQ exposure in Spark and write a score. The core algorithmic difference is **pair detection with temporal windows** (ours) vs **point-in-time neighbour counting** (Filip's). Everything else — eligibility, linkage, persistence, infrastructure — is engineering that can be combined.S

The question is which detection approach to ship:

- **Pair-based (ours):** more information, preserves causality direction, empirically validated by `analysis.py`. Harder to explain, more complex to compute.
- **Count-based (Filip's):** simpler, faster, account-level (what the platform wants). Throws away directionality and temporal structure. Unvalidated.

A pragmatic merge: use Filip's production scaffolding + our pair detection as the internal engine, then collapse pairs into an account-level score for the shared scores table. Best of both.
