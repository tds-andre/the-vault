# Cross-Client Data Quality & Heterogeneity Report
*Escalation Analysis — 21 Rich Clients*
*Generated: 2026-04-03*

---

## Summary

Before running cross-client escalation analysis, we conducted a data quality and heterogeneity sanity check across all 21 Rich clients. The findings below informed decisions about client exclusions, outcome category normalization, and caveats for interpreting cross-client results.

**Key finding:** The escalation signal is robust despite significant data heterogeneity — all lifts remain positive across all clients. However, the underlying data varies enough that cross-client comparisons of absolute values (incidence rates, event counts) should be interpreted with caution.

---

## 1. Activity Type Universe

- **76 unique activity types** across all 21 clients
- Only **19 types are universal** (present in all 21)
- **49 types appear in fewer than 15 clients** — most are client-specific operational types
- Types per client range from 28 to 51

This means any outcome category definition that relies on non-universal types will have uneven coverage across clients.

## 2. Outcome Category Coverage Gaps

### Terminal types
| Type | Clients (of 21) | Status |
|------|-----------------|--------|
| CREATE_CASE_BANKRUPTCY | 21/21 | Universal |
| CREATE_CASE_REPOSSESSION | 21/21 | Universal |
| RECOMMEND_REPOSSESSION | 21/21 | Universal |
| RECOMMEND_CHARGE_OFF | 20/21 | Near-universal |
| CREATE_CASE_CHARGE_OFF | 19/21 | Near-universal |
| CREATE_CASE_IMPOUND | 16/21 | Partial |
| RECOMMEND_FORECLOSURE | 13/21 | Partial |
| CREATE_CASE_LEGAL | 13/21 | Added to normalized set |
| CREATE_CASE_FORECLOSURE | 11/21 | Added to normalized set |

### Negative types
| Type | Clients (of 21) | Status |
|------|-----------------|--------|
| PROMISE_BROKEN | 21/21 | Universal |
| PROMISE_CANCELLED | 21/21 | Universal |
| DO_NOT_COLLECT | 21/21 | Universal |
| DO_NOT_CONTACT | 21/21 | Universal |
| RECOMMEND_SKIP_TRACE | 17/21 | Kept |
| CREATE_CASE_HARDSHIP | 15/21 | Added to normalized set |
| EXTERNAL_SKIP_TRACE | 9/21 | **Dropped** — too sparse |

### Positive types (disregarded going forward)
| Type | Clients (of 21) | Status |
|------|-----------------|--------|
| PROMISE_KEPT | 21/21 | Universal |
| PROMISE_PAYMENT | 21/21 | Universal |
| PAYMENT_EXTERNAL | 20/21 | Near-universal |
| SWBC_PAYMENT | 11/21 | **Dropped** — vendor-specific |
| SWBC_PORTAL_PAYMENT | 5/21 | **Dropped** — vendor-specific |

## 3. Negative Outcome Composition

The composition of what constitutes a "negative event" varies wildly across clients:

| Client | PROMISE_BROKEN | DO_NOT_COLLECT | DO_NOT_CONTACT | Other |
|--------|---------------|----------------|----------------|-------|
| 87 | **83%** | 8% | 3% | 7% |
| 56 | **81%** | 17% | 0% | 2% |
| 64 | **81%** | 13% | 3% | 4% |
| 88 | 17% | **47%** | **36%** | 0% |
| 90 | 23% | **62%** | 13% | 2% |
| 39 | 32% | **66%** | 1% | 2% |

**Implication:** "Negative outcome" is a heterogeneous bag. Some clients are dominated by broken promises; others by DNC/DNC flags. The same label maps to different operational realities. Cross-client comparisons of absolute negative incidence rates should be interpreted cautiously — the lifts (ratios) are more robust because the composition affects both numerator and denominator similarly.

## 4. Activity Intensity

| Metric | Median | Min | Max | CV |
|--------|--------|-----|-----|-----|
| Activities per DQ | 6.1 | 2.1 | 25.0 | 0.68 |
| % terminal | 0.12% | 0.05% | 0.56% | 0.74 |
| % negative | 0.62% | 0.27% | 2.02% | 0.65 |
| Terminal per 1K DQs | 8.6 | 1.0 | 53.2 | 0.95 |
| Negative per 1K DQs | 48.3 | 7.5 | 178.3 | 0.64 |

Terminal events per 1K DQs has the highest coefficient of variation (0.95) — terminal outcomes are sparse and highly variable across clients.

## 5. DQ Duration Distributions

| Client | Median DQ | % ≤ 1 day | Flag |
|--------|-----------|-----------|------|
| 60 | **0 days** | **71.8%** | **EXCLUDED** — not real delinquency |
| 91 | 2 days | **47.4%** | **EXCLUDED** |
| 96 | 2 days | **42.3%** | **EXCLUDED** |
| 62 | 3 days | 38.9% | Monitor |
| 64 | 3 days | 36.0% | Monitor |
| 42 | 4 days | 31.2% | Monitor |
| 41 | 4 days | 30.7% | Monitor |

**Decision:** Exclude DQ episodes with duration ≤ 1 day from analysis. Remove clients 60, 91, 96 entirely due to systemic DQ quality issues.

## 6. Temporal Coverage

- Activity data ranges from 1900 (client 90, 7 records — dirty dates) to 2026
- DQ data spans vary: shortest 1.1 years (client 12), longest 3.3 years (client 88)
- Most clients have 1.3–2.9 years of DQ data

## 7. Data Quality Flags

| Flag | Clients | Severity | Action |
|------|---------|----------|--------|
| Majority DQs ≤ 1 day | 60, 91, 96 | High | Excluded from cross-client |
| Very low activity intensity (2.1 acts/DQ) | 60 | High | Excluded |
| Very high activity intensity (25 acts/DQ) | 39 | Low | Monitor only |
| Activities from 1900 | 90 | Low | 7 records, negligible |

---

## Decisions Made

1. **Exclude clients 60, 91, 96** from cross-client analysis — DQ quality issues
2. **Exclude DQ episodes ≤ 1 day** — not real delinquency
3. **Normalize outcome categories** — add CREATE_CASE_LEGAL, CREATE_CASE_FORECLOSURE (terminal), CREATE_CASE_HARDSHIP (negative); drop EXTERNAL_SKIP_TRACE, SWBC types
4. **Disregard positive outcomes** — not part of the escalation story
5. **Report lifts (ratios) rather than absolute incidence** in cross-client comparisons -- more robust to composition differences

---

## 8. Before vs After: Impact of Normalization

Comparison of key metrics before (21 Rich clients, original outcome sets, no DQ filter) and after (18 clients, normalized outcome sets, DQ <=1 day excluded).

### Configuration

| | Before | After |
|---|---|---|
| Clients | 21 | 18 (excl 60, 91, 96) |
| DQ filter | None | Exclude <= 1 day |
| Terminal types | 7 (original) | 9 (+CREATE_CASE_LEGAL, +CREATE_CASE_FORECLOSURE) |
| Negative types | 6 (original) | 6 (+CREATE_CASE_HARDSHIP, -EXTERNAL_SKIP_TRACE) |
| Positive types | 5 (original) | Disregarded |
| W / Z | 15d / 90d | 15d / 90d |

### Key Metrics Comparison

| Metric | Unit | Before median | After median | Before range | After range | Before IQR | After IQR | Before CV | After CV | All >1? |
|---|---|---|---|---|---|---|---|---|---|---|
| Coverage (% network DQs) | % | 27.20 | 27.55 | [13.4, 43.0] | [14.9, 42.8] | 5.80 | 6.22 | 0.26 | 0.25 |  |
| Coverage (% all DQs) | % | 7.40 | 7.45 | [2.9, 21.3] | [4.2, 21.6] | 3.60 | 3.50 | 0.49 | 0.47 |  |
| Duration A lift | ratio | 2.12 | 2.04 | [1.1, 3.3] | [1.5, 2.8] | 0.95 | 0.67 | 0.25 | 0.20 | YES |
| Duration B lift | ratio | 1.89 | 1.81 | [1.2, 3.0] | [1.3, 2.7] | 0.47 | 0.58 | 0.22 | 0.22 | YES |
| Negative incidence (esc) | % | 8.74 | 11.49 | [3.6, 27.2] | [4.5, 29.6] | 4.73 | 6.29 | 0.59 | 0.54 |  |
| Negative incidence (intra) | % | 2.30 | 3.24 | [0.8, 6.5] | [1.2, 7.0] | 1.43 | 1.50 | 0.52 | 0.45 |  |
| Negative lift vs intra | ratio | 3.65 | 3.40 | [2.3, 6.1] | [2.4, 4.4] | 1.10 | 0.62 | 0.24 | 0.15 | YES |
| Negative lift vs random | ratio | 7.66 | 9.10 | [3.8, 21.9] | [3.2, 20.3] | 3.71 | 3.57 | 0.52 | 0.42 | YES |
| Negative volume lift | ratio | 5.00 | 4.89 | [2.1, 8.0] | [3.3, 8.0] | 2.18 | 1.44 | 0.29 | 0.25 | YES |
| Terminal lift vs intra | ratio | 7.81 | 6.20 | [1.6, 36.0] | [1.2, 27.8] | 6.30 | 6.42 | 0.85 | 0.80 | YES |
| Terminal lift vs random | ratio | 3.83 | 6.15 | [1.0, 20.0] | [2.3, 39.5] | 4.13 | 4.54 | 0.82 | 1.04 | YES |
| Recurrence % (esc) | % | 70.00 | 69.00 | [54.6, 82.0] | [59.9, 77.9] | 6.40 | 6.00 | 0.08 | 0.06 |  |
| Recurrence % (random) | % | 11.40 | 8.75 | [4.1, 18.0] | [3.3, 14.1] | 5.10 | 4.03 | 0.33 | 0.32 |  |
| Recurrence lift (30d) | ratio | 5.70 | 7.96 | [4.1, 16.3] | [4.8, 21.7] | 3.10 | 3.16 | 0.47 | 0.50 | YES |

### Interpretation

- **Coverage** is stable -- the DQ filter removes short DQs from both escalation pairs and the denominator proportionally.
- **Negative lift vs intra tightened** -- range narrowed from [2.3, 6.1] to [2.4, 4.4], IQR halved (1.10 to 0.62), CV dropped from 0.24 to 0.15. The normalized categories and DQ filter made clients more comparable.
- **Recurrence lift increased** -- removing trivial <=1 day DQs from the baseline means the surviving baseline is harder to beat, so the escalation signal is cleaner.
- **Terminal lift remains wide** -- terminal events are inherently sparse, so high variance is expected.
- **100% consistency maintained** -- all ratio metrics >1 for all 18 clients after normalization.

### Per-Client DQ Filter Impact

| Client | DQs (raw) | DQs filtered (<=1d) | % filtered | Esc pairs (before) | Esc pairs (after) | Change |
|---|---|---|---|---|---|---|
| 12 | 17,277 | 2,188 | 12.7% | 1,483 | 1,341 | -9.6% |
| 31 | 143,761 | 25,301 | 17.6% | 10,676 | 8,588 | -19.6% |
| 39 | 13,662 | 2,138 | 15.6% | 1,671 | 1,383 | -17.2% |
| 41 | 84,929 | 26,092 | 30.7% | 10,102 | 6,895 | -31.7% |
| 42 | 36,168 | 11,320 | 31.3% | 2,247 | 1,500 | -33.2% |
| 51 | 42,649 | 6,285 | 14.7% | 2,738 | 2,301 | -16.0% |
| 53 | 37,143 | 4,943 | 13.3% | 3,475 | 3,084 | -11.3% |
| 56 | 24,376 | 2,696 | 11.1% | 1,688 | 1,454 | -13.9% |
| 62 | 33,791 | 13,150 | 38.9% | 2,221 | 1,518 | -31.7% |
| 64 | 135,478 | 48,748 | 36.0% | 20,739 | 10,547 | -49.1% |
| 65 | 147,146 | 39,472 | 26.8% | 8,034 | 5,514 | -31.4% |
| 84 | 35,009 | 6,551 | 18.7% | 1,543 | 1,290 | -16.4% |
| 87 | 23,557 | 3,042 | 12.9% | 1,053 | 871 | -17.3% |
| 88 | 88,502 | 16,606 | 18.8% | 8,642 | 6,827 | -21.0% |
| 90 | 19,021 | 2,448 | 12.9% | 1,646 | 1,439 | -12.6% |
| 94 | 37,171 | 8,458 | 22.8% | 2,975 | 2,159 | -27.4% |
| 98 | 32,503 | 6,854 | 21.1% | 6,923 | 5,552 | -19.8% |
| 102 | 27,033 | 5,483 | 20.3% | 1,462 | 1,261 | -13.7% |

## Future Work

- Thorough activity type standardization across all clients (not just Rich)
- Investigation of DQ recording practices for excluded clients
- Static activity classification table/map with unmapped type flagging
- Analysis of whether negative composition differences affect escalation lift magnitude
