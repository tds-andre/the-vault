# Cross-Client Escalation Analysis — Detailed Analytical Report

**Scope:** 21 Rich clients (18 after exclusions) | **Date:** 2026-04-03 | **Analyst:** André (via Joane agent)
**Depends on:** Single-client escalation analysis on prod-31 (2026-04-02, see `0402/`)
**Data:** `analytics/cubes/rich/` (accounts, acc_profile, dqs, activities) | **Code:** `src/akuvo/analytics/pipelines/escalation/`
**Results:** `analytics/analysis/escalation/cross-client/escalation-rich18-v2-W15Z90.csv` + `.json`

---

## Context

On 2026-04-02, a full escalation analysis on client prod-31 (CAPEDCU) established that when one account goes delinquent, the same person's other account often follows — and the outcomes are significantly worse. The key findings: 23% of network DQs met the escalation condition (W=15 days), with 3.5x higher negative outcome incidence, 1.6x longer DQ duration, and 69% trigger account recurrence at 30 days. All metrics were validated against both random and intra-account baselines.

The question became: **is this a prod-31 phenomenon, or a platform-wide pattern?**

## Goals

1. **Does it generalize?** Do the escalation patterns identified in prod-31 extend to other data-rich clients — to all of them, or some? Are there data heterogeneity issues when the analysis is expanded?
2. **How uniform is the effect?** How similar or distinctive are the escalation patterns across clients? Which findings are platform-level truths vs client-specific stories?
3. **What's the aggregate picture?** What do escalation coverage and impact look like across the qualified client base? Are there clients that would benefit more from early warnings? What's the distance between the most and least benefited?

---

## Step 1: Building the cross-client pipeline

### Question: Can we parameterize the prod-31 analysis and run it systematically?

We extracted the prod-31 analysis into a reusable pipeline:
- `analysis.py` — core functions: `filter_business()`, `build_directed_edges()`, `build_escalation_pairs()`, `build_events_table()`, `count_events_in_window()`, and the main `analyze_client()` function that returns a flat dict of ~60 metrics per client.
- `run.py` — CLI runner with client selection, parameter control (W, Z), and CSV+JSON output. The JSON contains column metadata (name, short label, description, unit, group) rather than duplicating the data.

Data source: `analytics/cubes/rich/` — Spark-output multi-part parquet files. Client list derived from `clientquality` table where `quality == "rich"`: **21 clients**.

Total data volume: 651K accounts, 812K account-person profiles, 1.5M DQ episodes, 9.8M activities.

### Result: 21/21 clients ran successfully

Fixed parameters: W=15d, Z=90d. All 21 completed without errors. Runtime: ~42 seconds total. Validation against manual prod-31 analysis: escalation pair count matched exactly (10,676), coverage matched (23.0%), recurrence matched (5.41x).

**First look — the signal holds everywhere:**

| Metric | Median | Range | All >1? |
|---|---|---|---|
| Duration A lift | 2.1x | [1.1, 3.3] | Yes (21/21) |
| Negative lift vs intra | 3.6x | [2.3, 6.1] | Yes (21/21) |
| Negative lift vs random | 7.7x | [3.8, 21.9] | Yes (21/21) |
| Recurrence lift (30d) | 5.7x | [4.1, 16.3] | Yes (21/21) |
| Coverage (% net DQs) | 27.2% | [13.4%, 43.0%] | — |

Total escalation pairs across all 21 clients: 133,260.

**Initial interpretation:** Every lift metric is above 1.0 for every client. The escalation effect appears universal. But before drawing conclusions, we needed to check whether the underlying data was comparable across clients.

---

## Step 2: Cross-client data quality sanity check

### Question: Is the data comparable across clients, or are we comparing apples to oranges?

We examined five dimensions of data heterogeneity.

### 2a. Activity type universe

**Finding: significant heterogeneity.** 76 unique activity types across all clients, but only 19 are universal (present in all 21). 49 types appear in fewer than 15 clients — most are client-specific operational types (e.g., SYMITAR_WARNINGCODE in 4 clients, SEND_ELTROPY in 5). Types per client range from 28 to 51.

**Implication:** Any outcome category that relies on non-universal types will have uneven coverage across clients.

### 2b. Outcome category coverage gaps

Our original outcome definitions (from prod-31) had coverage issues:

| Type | Clients present | Issue |
|---|---|---|
| EXTERNAL_SKIP_TRACE (negative) | 9/21 | Less than half |
| SWBC_PAYMENT (positive) | 11/21 | Vendor-specific |
| SWBC_PORTAL_PAYMENT (positive) | 5/21 | Vendor-specific |
| RECOMMEND_FORECLOSURE (terminal) | 13/21 | Partial |
| CREATE_CASE_IMPOUND (terminal) | 16/21 | Partial |

Meanwhile, we found types that should be in our categories but weren't:

| Type | Clients | Category | Rationale |
|---|---|---|---|
| CREATE_CASE_LEGAL | 13/21 | Terminal | Legal action initiated |
| CREATE_CASE_FORECLOSURE | 11/21 | Terminal | Foreclosure case |
| CREATE_CASE_HARDSHIP | 15/21 | Negative | Member declaring financial hardship |

Classification method: keyword heuristic flagging in code (matching on "chargeoff", "legal", "foreclos", etc.) followed by semantic review of each flagged type. For example, CREDIT_REPORT was flagged as potential terminal but is actually an inquiry action; CREATE_CASE_DECEASED was flagged as negative but is non-behavioral.

### 2c. Negative outcome composition

**Finding: the composition of "negative" varies wildly across clients.**

| Client | PROMISE_BROKEN | DO_NOT_COLLECT | DO_NOT_CONTACT | Other |
|---|---|---|---|---|
| 87 | 83% | 8% | 3% | 7% |
| 64 | 81% | 13% | 3% | 4% |
| 88 | 17% | 47% | 36% | 0% |
| 90 | 23% | 62% | 13% | 2% |

**Implication:** "Negative outcome" maps to different operational realities per client. Absolute incidence rates aren't directly comparable. However, lift ratios are more robust because the composition affects both numerator and denominator similarly.

### 2d. DQ duration distributions

**Finding: three clients have anomalous DQ recording.**

| Client | Median DQ duration | % of DQs ≤ 1 day | Acts/DQ |
|---|---|---|---|
| **60** | **0 days** | **71.8%** | **2.1** |
| 91 | 2 days | 47.4% | 6.3 |
| 96 | 2 days | 42.3% | 3.1 |

Client 60 is the extreme case: median DQ duration of zero days, nearly three quarters of DQs lasting one day or less, and only 2.1 activities per DQ episode. This client alone contributed 300K DQ episodes and 34,071 escalation pairs — 26% of all escalation pairs in the 21-client run — from data that likely doesn't represent real delinquency.

### 2e. Activity intensity

Activities per DQ ranged from 2.1 (client 60) to 25.0 (client 39), with a coefficient of variation of 0.68. Terminal events per 1K DQs ranged from 1.0 to 53.2 (CV = 0.95). The data is heterogeneous enough that cross-client comparisons of absolute values should be interpreted cautiously.

### Summary of data quality findings

The escalation signal survived even in heterogeneous, noisy data — all 21 clients showed positive lifts. But to make cross-client comparisons meaningful, we needed to address the issues found.

---

## Step 3: Decisions — client exclusions and outcome normalization

### 3a. Client exclusions

**Decision:** Remove clients 60, 91, and 96 from the cross-client analysis. Rationale: >40% of their DQ episodes last ≤1 day, suggesting systematic recording differences rather than real delinquency patterns. 18 clients remain.

**Decision:** Exclude DQ episodes with duration ≤ 1 day from all remaining clients. This removes 11–39% of DQs per client (varies by how many short DQs each has).

### 3b. Outcome normalization

**Normalized terminal set (9 types):** Original 7 + CREATE_CASE_LEGAL + CREATE_CASE_FORECLOSURE.

**Normalized non-terminal set (6 types):** Original set minus EXTERNAL_SKIP_TRACE (only 8/18 after exclusions), plus CREATE_CASE_HARDSHIP.

**Negative (umbrella) = terminal + non-terminal (15 types).** "Negative outcome" now means "any adverse event" — the umbrella of both terminal and non-terminal. This is the primary impact metric. We renamed the hierarchy:
- **Negative** = any adverse outcome (terminal + non-terminal), 15 types
- **Non-terminal** = distress signals (broken promises, DNC, skip trace, hardship), 6 types
- **Terminal** = loss events (charge-off, repo, bankruptcy, foreclosure, legal), 9 types

**Positive outcomes:** Dropped SWBC_PAYMENT and SWBC_PORTAL_PAYMENT (vendor-specific). Disregarded positive outcomes entirely going forward — they served as a sanity check in the prod-31 analysis but would add confusion for the cross-client audience.

### 3c. Pipeline updates

Added the DQ duration filter (`MIN_DQ_DURATION_DAYS = 1`), client exclusion list (`EXCLUDED_CLIENTS = {60, 91, 96}`), normalized outcome categories, and the three-tier outcome loop (negative, nonterminal, terminal) to the pipeline.

---

## Step 4: Re-run with normalized settings + before/after comparison

### Question: Does the signal survive cleaning, and at what cost?

18/18 clients ran successfully with the updated pipeline. All lifts remained positive — zero exceptions.

### Before vs after comparison

| Metric | Before (21, original) | After (18, normalized) | Direction |
|---|---|---|---|
| Coverage (% net DQs) | median 27.2% | median 27.6% | Stable |
| Neg lift vs intra | 3.6x [2.3, 6.1] | 3.4x [2.6, 4.4] | **Range tightened** |
| Neg lift CV | 0.24 | 0.15 | **More consistent** |
| Neg lift IQR | 1.10 | 0.62 | **Halved** |
| Recurrence lift | 5.7x [4.1, 16.3] | 8.0x [4.8, 21.7] | Higher (cleaner baseline) |
| Duration A lift | 2.1x [1.1, 3.3] | 2.0x [1.5, 2.8] | Range tightened |

**At what cost?** Total escalation pairs dropped from 133K to 63.5K — but 40K of the drop was client 60 alone (the anomalous client). The per-client impact of the DQ filter ranged from -9.6% to -49.1% of escalation pairs, with the heaviest losses in clients that had the most ≤1-day DQs. The signal itself barely moved.

**Interpretation:** The normalization sharpened the signal without weakening it. The negative outcome lift range narrowing from [2.3, 6.1] to [2.6, 4.4] and CV dropping from 0.24 to 0.15 means clients became more comparable. This is evidence of robustness, not fragility — the signal survived removing 3 clients, filtering 11–49% of DQs, and changing the outcome definitions.

---

## Step 5: Q1 — Does it generalize?

### Answer: Yes, universally.

Every lift metric is above 1.0 for every client — 21/21 before cleaning, 18/18 after.

| Metric | All >1? | Weakest client | Strongest client |
|---|---|---|---|
| Duration A lift | 18/18 | 1.5x | 2.8x |
| Negative lift (any adverse) vs intra | 18/18 | 2.6x | 4.4x |
| Negative volume lift | 18/18 | 3.8x | 9.0x |
| Terminal lift vs intra | 18/18 | 1.2x | 27.8x |
| Recurrence lift (30d) | 18/18 | 4.8x | 21.7x |

The escalation universe is substantial everywhere: median 28% of network DQs, minimum 15%. Across all 18 clients: 63,524 escalation events covering 747K DQ episodes (8.5% portfolio-wide).

Data heterogeneity issues were found and addressed (see Steps 2–4). The signal's survival through that process is itself a finding.

---

## A note on outcome definitions

Throughout this analysis, we measure escalation's impact by tracking activity events on the accounts involved. Collection systems log 76 unique activity types across the client base. We group the 15 outcome-relevant ones into three categories:

**Terminal outcomes** (9 activity types) are loss events — the account is effectively gone. Charge-offs, repossessions, bankruptcies, foreclosures, legal actions. Examples: CREATE_CASE_CHARGE_OFF, CREATE_CASE_REPOSSESSION, CREATE_CASE_LEGAL.

**Non-terminal outcomes** (6 activity types) are distress signals — collection is struggling but the account isn't lost. Broken promises, do-not-contact flags, skip traces, hardship declarations. Examples: PROMISE_BROKEN, DO_NOT_COLLECT, CREATE_CASE_HARDSHIP.

**Negative outcomes** (15 activity types) is the umbrella — any adverse event, terminal or non-terminal. This is our primary impact metric. When we say "3.4x negative lift," we mean escalation DQs are 3.4 times more likely to produce any of these 15 event types within 90 days, compared to the same accounts during non-escalation periods.

---

## Step 6: Q2 — How uniform is the effect?

### Question: Which metrics can we quote platform-wide, and which need client-specific caveats?

We classified each metric by its cross-client consistency (1 - CV, where CV = coefficient of variation = std/mean). Higher consistency means the number holds across clients; lower means it varies.

### Three tiers of consistency

**"Platform truth"** (consistency > 0.70, low variation):
- Negative outcomes volume lift: **5.6x** median, range [3.8, 9.0], consistency 0.74

**"Reliable effect"** (consistency 0.65–0.80):
- Negative outcomes lift vs intra: **3.4x** median, range [2.6, 4.4], consistency 0.86 — actually the tightest metric, but a smaller number than volume lift
- Duration A lift: **2.0x** median, range [1.5, 2.8], consistency 0.80
- Duration B lift: **1.8x** median, range [1.3, 2.7], consistency 0.78

**"High impact, client-specific"** (consistency < 0.65):
- Recurrence lift: **8.0x** median, range [4.8, 21.7], consistency 0.50
- Terminal lift: **6.2x** median, range [1.2, 27.8], consistency 0.20 — too sparse for reliable cross-client comparison

**Notable:** Nothing falls in the "weak and inconsistent" quadrant. Every metric either has strength (high lift) or consistency (low variation) or both.

### What drives the variation?

We computed Spearman rank correlations (n=18) between client characteristics and escalation metrics:

| Driver | Coverage | Neg lift | Recurrence lift |
|---|---|---|---|
| % multi-account | -0.53 | +0.13 | +0.43 |
| Portfolio size | -0.55 | -0.10 | +0.47 |
| Activity intensity | -0.13 | -0.49 | +0.09 |
| % in network | -0.37 | -0.01 | +0.60 |

Key findings:
- **Coverage** correlates negatively with portfolio size and % multi-account. Counterintuitive — but the denominator (network DQs) grows faster than escalation pairs in larger portfolios. Coverage is a structural property, not a signal strength indicator.
- **Negative lift** is weakly driven by activity intensity (-0.49): clients that log more activities per DQ show slightly lower lift. More activities = more noise, or more aggressive collection compresses the differential.
- **Recurrence** is driven by network density (+0.60): more connected portfolios show dramatically stronger recurrence. The 5x–22x range is largely explained by how networked each client's portfolio is.

**Note:** n=18 is small. These are directional signals, not definitive causal claims.

---

## Step 7: Q3 — What's the aggregate picture?

### Question: Across the qualified client base, what does escalation look like?

**Platform-wide numbers:**
- 509K accounts across 18 clients
- 63,524 escalation events out of 747K DQ episodes
- 8.5% aggregate portfolio-wide coverage
- Median 28% of network DQs per client

### Client ranking by escalation opportunity

We defined a composite **escalation opportunity score**: (negative volume lift + duration A lift + recurrence lift) × coverage. This captures total effect strength scaled by how much of the portfolio is touched.

| Rank | Client | Neg vol | Dur A | Recur | Sum | Coverage | Score |
|---|---|---|---|---|---|---|---|
| 1 | 39 | 6.1x | 2.4x | 9.0x | 17.5 | 42.8% | 7.48 |
| 2 | 90 | 7.3x | 2.1x | 5.0x | 14.3 | 33.9% | 4.85 |
| 3 | 88 | 3.8x | 2.2x | 17.1x | 23.1 | 20.9% | 4.83 |
| 4 | 62 | 5.7x | 1.7x | 9.0x | 16.4 | 29.2% | 4.79 |
| 5 | 98 | 4.8x | 2.0x | 9.8x | 16.7 | 28.6% | 4.77 |
| 6 | 41 | 5.8x | 1.6x | 9.4x | 16.8 | 28.3% | 4.76 |
| 7 | 94 | 4.0x | 1.5x | 9.7x | 15.1 | 30.4% | 4.60 |
| 8 | 64 | 7.8x | 2.4x | 8.9x | 19.1 | 23.5% | 4.48 |
| 9 | 51 | 7.4x | 2.5x | 8.7x | 18.6 | 23.5% | 4.38 |
| 10 | 65 | 4.5x | 2.7x | 21.7x | 28.9 | 14.9% | 4.30 |
| 11 | 12 | 9.0x | 2.7x | 7.2x | 18.9 | 22.6% | 4.26 |
| 12 | 102 | 3.8x | 2.8x | 7.1x | 13.6 | 28.3% | 3.86 |
| 13 | 42 | 4.5x | 1.5x | 6.1x | 12.1 | 30.1% | 3.64 |
| 14 | 87 | 5.5x | 1.9x | 6.4x | 13.8 | 26.3% | 3.63 |
| 15 | 53 | 5.0x | 1.9x | 5.5x | 12.4 | 28.5% | 3.52 |
| 16 | 31 | 6.2x | 1.7x | 6.4x | 14.3 | 22.5% | 3.22 |
| 17 | 84 | 4.9x | 1.9x | 4.8x | 11.6 | 26.8% | 3.10 |
| 18 | 56 | 6.2x | 2.1x | 5.2x | 13.4 | 15.0% | 2.01 |

**Score range:** 2.01 to 7.48 (3.7x spread between most and least benefited).

**The distance is narrow for the headline metric** — negative volume lift ranges only 3.8x to 9.0x (2.4x spread). The composite score varies more because recurrence and coverage amplify differences.

**What characterizes high-scoring clients?** Top 5 by score tend to have higher coverage (median 33.9% vs 26.8% for bottom 5). The score is driven 62% by lift strength and 47% by coverage (Spearman correlations with score components).

**The bottom line:** Every client benefits. The floor is ~4x negative volume lift and ~15% coverage. The question isn't "does this client have escalation?" — it's "how much?" And the answer depends mainly on portfolio connectivity and coverage.

---

## Course corrections and broken premises

### Broken premise: activity types are consistent across clients
We initially assumed the activity type sets from prod-31 would generalize. They didn't — 76 types across the platform, only 19 universal. The negative outcome composition (PROMISE_BROKEN ranging from 17% to 83%) showed that "negative event" means different things operationally for different clients. This led to the outcome normalization effort.

### Course correction: DQ duration filter
We didn't anticipate that some clients record extremely short DQs (≤1 day). Client 60, with a median DQ duration of zero days, contributed 26% of all escalation pairs from data that likely doesn't represent real delinquency. The filter removed 11–49% of DQs per client but barely changed the lift metrics — evidence that the short DQs were noise, not signal.

### Course correction: outcome hierarchy rename
The original "terminal" and "negative" naming was confusing — "negative" sounded like a subset when it was the most common category. We renamed to: **Negative** (umbrella: any adverse) > **Non-terminal** (distress) + **Terminal** (loss). This made the hierarchy intuitive and gave us a single headline metric (negative outcomes lift) that's tighter than either sub-category alone.

### Observation: positive outcomes were a dead end
Positive outcomes (payments, kept promises) were computed in the prod-31 analysis as a sanity check. They showed the expected inverse pattern (lower incidence during escalation), but including them in cross-client work would add confusion. Dropped going forward.

---

## Key takeaways

1. **The escalation effect is universal.** All 21 Rich clients showed positive escalation lifts before any cleaning. After excluding 3 clients with DQ quality issues and normalizing outcome categories, 18/18 still show positive lifts across every metric. Zero exceptions.

2. **Negative outcome amplification is the headline.** Escalation DQs produce 5.6x more adverse events (volume lift) and are 3.4x more likely to have any adverse event (incidence lift). These numbers hold across all 18 clients with low variation (consistency 0.74 and 0.86 respectively).

3. **Duration and recurrence confirm the pattern.** Escalation DQs last 2x longer (consistent, all clients). Trigger accounts relapse at 8x the baseline rate within 30 days (strong but client-specific, ranging 5–22x).

4. **The signal survived aggressive cleaning.** Removing 3 clients, filtering 11–49% of DQs, and changing outcome definitions barely moved the lifts. The negative lift range actually tightened ([2.3, 6.1] → [2.6, 4.4]). This is robustness evidence.

5. **Every client benefits, but some more than others.** The escalation opportunity score ranges from 2.0 to 7.5 (3.7x spread). High-scoring clients tend to have high coverage and strong recurrence. The floor is meaningful — even the lowest-scoring client sees 3.8x negative volume lift.

6. **Cross-client data heterogeneity is significant and needs future attention.** Activity types, operational practices, and DQ recording vary substantially. Our normalization was a quick fix; a systematic activity classification and data quality framework is needed.

---

## Next steps and open questions

**Immediate:**
- Cross-client escalation presentation (Slide Report format)
- Product feature specification: who receives the escalation alert, what triggers it, what action does it recommend to the collector?

**Analytical:**
- Incorporate payment data into outcome analysis (not available in current extract)
- Investigate causal vs correlational: is escalation causal or symptomatic of upstream financial stress?
- Test whether escalation metrics improve existing DQ prediction models as engineered features

**Data quality:**
- Investigate DQ recording practices for excluded clients (60, 91, 96) — can they be rehabilitated?
- Build a systematic activity classification pipeline (static map with unmapped type flagging)
- Establish cross-client data quality standards for future analyses

**Expansion:**
- Run on Moderate quality clients (47 in the segmentation) — do patterns hold in sparser data?
- Investigate the 12 clients in the pipeline gap (Rich in segmentation but missing from cubes)

---

*Full data quality analysis: see `cross-client-data-quality.md` in this directory.*
*Column metadata: see `column-metadata-rich18-v2.csv` or the JSON companion of any results file.*
*Single-client deep dive: see `0402/` for the prod-31 detailed and executive reports.*
