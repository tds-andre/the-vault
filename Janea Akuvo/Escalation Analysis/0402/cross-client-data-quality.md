# Cross-Client Data Quality & Heterogeneity Report
## Escalation Analysis — Rich Clients (pre-analysis sanity check)

*Generated: 2026-04-03 | Source: cubes/rich (21 clients)*

---

## 1. Activity Type Universe

- **76 unique activity types** across all 21 clients
- Only **19 are universal** (present in all 21)
- **49 types appear in fewer than 15 clients** — significant client-specific variation
- Types per client: min=28, median=37, max=51

## 2. Outcome Category Coverage (original sets from prod-31)

### Terminal types
| Type | Clients (of 21) | Note |
|---|---|---|
| CREATE_CASE_BANKRUPTCY | 21/21 | Universal |
| CREATE_CASE_REPOSSESSION | 21/21 | Universal |
| RECOMMEND_REPOSSESSION | 21/21 | Universal |
| RECOMMEND_CHARGE_OFF | 20/21 | Near-universal |
| CREATE_CASE_CHARGE_OFF | 19/21 | Near-universal |
| CREATE_CASE_IMPOUND | 16/21 | Partial |
| RECOMMEND_FORECLOSURE | 13/21 | Partial |

### Negative types
| Type | Clients (of 21) | Note |
|---|---|---|
| PROMISE_BROKEN | 21/21 | Universal |
| PROMISE_CANCELLED | 21/21 | Universal |
| DO_NOT_COLLECT | 21/21 | Universal (removed in v2) |
| DO_NOT_CONTACT | 21/21 | Universal (removed in v2) |
| RECOMMEND_SKIP_TRACE | 17/21 | Partial |
| EXTERNAL_SKIP_TRACE | 9/21 | Sparse — dropped in v2 |

### Positive types
| Type | Clients (of 21) | Note |
|---|---|---|
| PROMISE_KEPT | 21/21 | Universal |
| PROMISE_PAYMENT | 21/21 | Universal |
| PAYMENT_EXTERNAL | 20/21 | Near-universal |
| SWBC_PAYMENT | 11/21 | Vendor-specific — dropped |
| SWBC_PORTAL_PAYMENT | 5/21 | Vendor-specific — dropped |

## 3. Negative Composition Varies Wildly

The mix of negative event types is highly client-specific:
- Client 87: 83% PROMISE_BROKEN
- Client 88: 17% PROMISE_BROKEN, 47% DO_NOT_COLLECT, 36% DO_NOT_CONTACT
- Client 39: 66% DO_NOT_COLLECT, 32% PROMISE_BROKEN
- Coefficient of variation for % negative (across clients): 0.65

This means "negative outcome" is a heterogeneous bag — same label, very different mix.

## 4. Activity Intensity

| Metric | Median | Min | Max | CV |
|---|---|---|---|---|
| Activities per DQ | 6.1 | 2.1 | 25.0 | 0.68 |
| Terminal per 1K DQs | 8.6 | 1.0 | 53.2 | 0.95 |
| Negative per 1K DQs | 48.3 | 7.5 | 178.3 | 0.64 |

Terminal events per 1K DQs has the highest variability (CV=0.95) — this metric is not stable across clients.

## 5. DQ Duration Distribution

Most clients have median DQ duration of 3-7 days. Three outliers:

| Client | Median DQ dur | % DQs ≤ 1 day | Acts/DQ | Issue |
|---|---|---|---|---|
| **60** | **0.0d** | **71.8%** | **2.1** | Anomalous — most DQs appear to be system artifacts |
| **91** | 2.0d | 47.4% | 6.3 | High rate of very short DQs |
| **96** | 2.0d | 42.3% | 3.1 | High rate of very short DQs |

## 6. Temporal Coverage

- DQ data spans vary: 1.1 years (client 12) to 3.3 years (client 88)
- Activity data often spans much longer (historical data from before Akuvo onboarding)
- Client 90 has 7 activities dated 1900 (data artifact, negligible)

## 7. Decisions Made

- **Exclude clients 60, 91, 96** from cross-client analysis (DQ quality concerns)
- **Exclude DQ episodes ≤ 1 day** going forward (not retroactively in existing prod-31 code)
- **Drop SWBC_PAYMENT, SWBC_PORTAL_PAYMENT** from positive outcomes (vendor-specific)
- **Drop EXTERNAL_SKIP_TRACE** from negative (only 8/18 after exclusions)
- **Disregard positive outcomes** going forward
- **Activity heterogeneity** flagged as significant issue requiring future thorough analysis

## 8. Future Work

Cross-client activity heterogeneity is the biggest unresolved data quality challenge. The same activity type code may mean different things operationally across clients, and the mix of types varies dramatically. A thorough analysis should:
- Map activity types to standardized semantic categories across all clients
- Assess whether operational intensity differences affect outcome measurement
- Consider per-client normalization or stratification in cross-client comparisons

---

*This report provides evidence for caveats in cross-client escalation presentations and reports.*
