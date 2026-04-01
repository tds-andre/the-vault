# Client Segmentation Analysis
*2026-03-31 — Joane + André*

## Context

We have 153 clients in the integration datamart. Each client has up to four tables: `accounts` (loan_acc), `activities`, `dqs` (dq_episodes), and `payments`. The goal was to understand what types of clients exist based on these volumes, and how to segment the base for analytical work — particularly the escalation feature.

Source data: `client-stats.csv` with columns `clientcode, activities, dqs, accounts, payments` (raw row counts per client).

---

## Data Completeness

Before segmenting by behavior, we need to deal with data completeness. Not all clients have all four tables populated.

| Profile | Clients | Median accounts |
|---|---|---|
| All four tables (accounts + activities + dqs + payments) | 138 | 30,392 |
| Accounts only (no transactional data) | 9 | 302,719 |
| Missing one or two tables | 6 | varies |
| Completely empty (TCMBANK) | 1 | 0 |

The 9 accounts-only clients are not small — they include REDFCU (1.07M accounts), CANVAS (310k), ASCEND (303k). These are large institutions where the transactional pipelines haven't run. They should be flagged as `incomplete` and excluded from any analysis until their data is loaded.

**The remaining 138 "complete" clients form the analyzable base.**

---

## Minimum Volume Thresholds

Before computing ratios, we apply minimum volume thresholds to remove clients without enough data for reliable analysis:

| Table | Threshold | Clients below |
|---|---|---|
| Accounts | ≥ 3,000 | 20 |
| DQ episodes | ≥ 500 | 31 |
| Payments | ≥ 3,000 | 33 |
| Activities | ≥ 2,000 | 13 |

**41 clients removed**, 112 pass. The DQ threshold is the binding constraint — 31 of 41 fail it.

After removing 4 ratio outliers (dq_rate > 5, pay_rate > 20, act_rate > 60): **108 clean clients** for segmentation.

---

## Per-Account Ratios

Raw counts are meaningless for comparison — a client with 900k accounts and 5k DQ episodes is not comparable to one with 6k accounts and 7k DQ episodes. The right lens is ratios per account.

Three ratios (medians across 108 clean clients):

| Ratio | What it measures | Median |
|---|---|---|
| `dq_rate` = dqs / accounts | Delinquency history density | 0.55 |
| `pay_rate` = payments / accounts | Payment transaction density | 2.03 |
| `act_rate` = activities / accounts | Collection activity intensity | 11.4 |

---

## Key Finding: dq_rate and pay_rate Are the Same Axis

The correlation between `dq_rate` and `pay_rate` is **0.80**. The ratio between them is remarkably stable:

- Median: 4.4× (for every DQ episode, there are ~4.4 payment records)
- IQR: 3.3× – 5.7×

They are not two independent dimensions. They measure the same underlying thing: **how much transactional history does this client have per account?** We collapse them into a single metric:

```
DQ+PAY density = sqrt(dq_rate × pay_rate)
```

A geometric mean that captures transactional depth regardless of which table is richer.

---

## Key Finding: act_rate Is Independent — Scarce DQ+PAY Is Not an Onboarding Issue

Correlation between `act_rate` and DQ+PAY density: **0.05** (essentially zero).

This matters because the naive explanation for low DQ+PAY density would be *"the client was onboarded recently, so there's less historical data."* If that were true, `act_rate` should also be low — activities accumulate over time just like DQ episodes and payments.

But it's not:

| DQ+PAY density tier | n | act_rate median | act/(dq+pay) median |
|---|---|---|---|
| Scarce (<0.1) | 11 | 8.4 | 148× |
| Moderate (0.1–1.5) | 47 | 12.8 | 8.1× |
| Rich (≥1.5) | 50 | 12.8 | 1.5× |

Scarce DQ+PAY clients have perfectly normal activity levels but generate 148× more activity records per transactional record than Rich clients (1.5×).

**Conclusion: scarce DQ+PAY data is not about onboarding timing. It's about pipeline coverage.** The activity pipeline ran. The DQ and payment pipelines didn't. This is a data quality flag, not a client behavior category.

### Pipeline gap clients (12 clients)

Of the 41 removed by volume thresholds, 12 have healthy accounts and activities but near-zero DQ or payments:

| Client | Accounts | Activities | DQs | Payments |
|---|---|---|---|---|
| ADDITIONFI | 920,628 | 3,143,636 | 6 | 4 |
| TYNDALL | 243,580 | 1,154,622 | 2,003 | 2,779 |
| VALLEYSTRONG | 189,487 | 3,403,174 | 361 | 2,399 |
| AFCU | 180,155 | 1,172,526 | 76 | 2 |
| TCBK | 68,310 | 197,245 | 0 | 10 |
| METROCU | 53,427 | 118,197 | 2 | 0 |
| ... | | | | |

---

## Proposed Segmentation

### Four Tiers

| Tier | Clients | Description |
|---|---|---|
| **Rich** | 50 | Full transactional depth — best for escalation. DQ+PAY density ≥ 1.5 |
| **Moderate** | 47 | Decent depth, sufficient for basic analysis. DQ+PAY density 0.1 – 1.5 |
| **Scarce DQ+PAY** | 11 | Pipeline ran but near-zero DQ/payment per account. DQ+PAY density < 0.1 |
| **Not ready** | 45 | Below volume thresholds or extreme outliers. Includes 12 pipeline gaps |

### Size (account count)

| Tier | Range | Clients |
|---|---|---|
| tiny | < 5,000 | 6 |
| small | 5,000 – 50,000 | 45 |
| medium | 50,000 – 200,000 | 26 |
| large | 200,000+ | 28 |

### Cross-tab — Size × DQ+PAY density (108 clean clients)

|  | tiny | small | medium | large |
|---|---|---|---|---|
| Rich | 6 | 35 | 6 | 3 |
| Moderate | 0 | 10 | 17 | 20 |
| Scarce | 0 | 0 | 5 | 6 |

Notable pattern: **Rich skews small** (35 of 45 small clients are Rich) while **large skews Moderate** (20 of 28 large clients are Moderate).

Only **3 large clients** qualify as Rich: MACU, UNIFY, CUTX.

---

## Top Rich Clients (best for deep analysis)

| Client | Accounts | dq_rate | pay_rate | act_rate | DQ+PAY density |
|---|---|---|---|---|---|
| MACU | 911,038 | 1.31 | 2.77 | 13.05 | 1.91 |
| UNIFY | 349,840 | 1.14 | 4.56 | 7.35 | 2.28 |
| CUTX | 295,034 | 1.73 | 3.39 | 57.60 | 2.42 |
| FAIRWINDS | 137,957 | 1.31 | 4.69 | 20.07 | 2.47 |
| CUOFCO | 121,648 | 1.21 | 5.02 | 17.72 | 2.47 |
| LAUNCHCU | 116,544 | 0.80 | 3.04 | 14.96 | 1.56 |
| CUOFAMERICA | 58,678 | 2.31 | 8.91 | 10.84 | 4.54 |
| MYFPCU | 56,852 | 1.56 | 10.70 | 25.81 | 4.09 |
| STMARYSBANK | 54,439 | 2.93 | 8.50 | 9.13 | 4.99 |

---

## Presentation

Built as a React component (`client-segmentation-report.jsx`) following the Akuvo branding pattern from the SoD report. 10 slides:

1. Cover
2. 153 clients, 4 data tables each (icons for each table type)
3. 41 don't meet minimum volume (thresholds + funnel)
4. 12 aren't small — their pipelines didn't run (pipeline gap table)
5. Per-account ratios are the right lens
6. DQ and payment depth move together (scatter + correlation 0.80)
7. Scarce DQ+PAY data is not an onboarding issue (proof via activity independence)
8. Four tiers of escalation readiness (tier list + proportional bar)
9. Rich data lives in smaller institutions (cross-tab)
10. Top 15 escalation candidates
11. Next steps (dark slide)

Design: icons+text (not cards), assertion-driven titles, color carries meaning (amber=DQ, green=payments, violet=activities), minimal explanatory text.

---

## Next Steps

- [ ] Implement segmentation as a function in `akuvo.analytics` package
- [ ] Update `docs/DATA.md` with segmentation reference
- [ ] Investigate 12 pipeline-gap clients — are their DQ/payment pipelines configured?
- [ ] Validate: is the Rich/Moderate split real behavior or a data artifact?
- [ ] Build MCP datamart server for live exploration
- [x] Client segmentation presentation (done 2026-03-31)
