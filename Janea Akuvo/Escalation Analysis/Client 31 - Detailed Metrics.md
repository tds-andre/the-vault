# Escalation Analysis — Client 31 Detailed Metrics

*Generated: 2026-04-24. Parameters: W=15d, Z=90d. Pipeline: v2.*

---

## Population

| Measure | Value |
|---|---|
| Accounts (after business filter) | 41,621 |
| DQ episodes (after duration filter) | 118,460 |
| Network accounts | 17,839 (43% of accounts) |
| Network DQs | 38,210 |
| Network edges (account pairs) | 16,990 |
| Activities | 464,174 |

DQ duration filter removed 25,301 episodes (duration <= 1 day).
Business filter removed 1,057 accounts.

---

## Coverage

| Measure | Value |
|---|---|
| Escalation pairs detected | 8,588 |
| Serial (B starts after A ends) | 3,798 (44%) |
| Concurrent (B starts while A active) | 4,790 (56%) |
| Coverage (% all DQs) | **7.2%** |
| Coverage (% network DQs) | 22.5% |

Approximately 1 in 14 delinquency episodes in this portfolio is part of an escalation scenario. Among network accounts specifically, roughly 1 in 4.

---

## Fallout: Impact

Impact measures the association between escalation and negative outcome events within 90 days of escalation day. 15 activity types: 6 non-terminal (distress signals) + 9 terminal (loss events).

### All negative events (15 types)

| Measure | vs Random | vs Intra-account |
|---|---|---|
| **Incidence lift** | **3.96x** (CI: 3.48–4.50) | 3.23x (CI: 2.92–3.60) |
| **Volume lift** | **5.92x** (CI: 5.17–6.91) | 4.95x (CI: 4.36–5.58) |
| Escalation rate | 13.57% incidence, 0.274 events/pair | |
| Random baseline rate | 3.42% incidence, 0.046 events/pair | |
| Intra baseline rate | 4.19% incidence, 0.055 events/pair | |

Interpretation: escalation pairs are ~4x more likely to have at least one adverse event, and experience ~6x the volume of adverse events, compared to similar non-escalation DQs.

### Non-terminal events (6 types: broken promises, do-not-collect, hardship, etc.)

| Measure | vs Random | vs Intra-account |
|---|---|---|
| Incidence lift | 3.97x (CI: 3.50–4.52) | 3.23x (CI: 2.92–3.59) |
| Volume lift | 5.96x (CI: 5.21–6.93) | 4.86x (CI: 4.31–5.47) |

Non-terminal events drive the bulk of the impact signal. Almost identical to the all-negative numbers, indicating that terminal events are rare but follow the same direction.

### Terminal events (9 types: charge-offs, repossessions, bankruptcy, etc.)

| Measure | vs Random | vs Intra-account |
|---|---|---|
| Incidence lift | 4.14x (CI: 2.53–8.43) | 8.07x (CI: 4.45–21.52) |
| Volume lift | 4.94x (CI: 2.96–11.00) | 9.35x (CI: 4.86–26.35) |
| Escalation incidence | 0.68% | |
| Random baseline | 0.16% | |
| Intra baseline | 0.08% | |

Wide confidence intervals due to sparse events (0.68% incidence), but all CIs remain well above 1.0x. The intra-account lifts are higher than random because the intra baseline has even fewer terminal events. Interpret with caution given sample sizes.

---

## Fallout: Duration

Duration measures how much longer DQs last when part of an escalation scenario. Primary control group: intra-account (controls for account-level risk).

| Measure | vs Intra-account | vs Random |
|---|---|---|
| **Duration A (trigger)** | **1.64x** (CI: 1.54–1.76) | 1.62x (CI: 1.51–1.75) |
| **Duration B (ripple)** | **1.42x** (CI: 1.33–1.51) | 1.41x (CI: 1.31–1.51) |
| **Duration AB (combined)** | **1.53x** | |
| A mean duration | 16.1 days | |
| B mean duration | 14.0 days | |
| Intra baseline mean | 9.8 days | |
| Random baseline mean | 9.9 days | |

Trigger DQs last ~16 days vs ~10 days for non-escalation DQs on the same accounts (+64%). Ripple DQs last ~14 days (+42%). Intra and random baselines give nearly identical results for this client, suggesting account-level risk is not a major confounder for duration.

---

## Fallout: Relapse

Relapse measures how much more likely trigger (A) accounts are to enter a new delinquency within 30 days of escalation day. Primary control group: random.

| Measure | vs Random | vs Intra-account |
|---|---|---|
| **Relapse lift** | **3.83x** (CI: 3.61–4.08) | 3.14x (CI: 2.97–3.31) |
| Escalation relapse rate | 47.65% | |
| Random baseline rate | 12.44% | |
| Intra baseline rate | 15.18% | |

Nearly half (48%) of trigger accounts experience a new delinquency within 30 days, compared to ~12% for similar non-escalation accounts. Tight CI — this is a strong, reliable signal.

---

## Composite

| Measure | Value |
|---|---|
| **Escalation Opportunity Score** | **0.22** |

Formula: coverage (7.2%) x mean(impact 3.96x, duration 1.53x, relapse 3.83x) = 0.072 x 3.11 = 0.22.

---

## Confidence Intervals Summary

All 95% bootstrap CIs (N=1,000 iterations) are above 1.0x for every metric, confirming that the escalation effects are statistically meaningful for this client.

| Core Metric | Lift | 95% CI |
|---|---|---|
| Impact (incidence, random) | 3.96x | 3.48 – 4.50 |
| Impact (volume, random) | 5.92x | 5.17 – 6.91 |
| Duration AB (intra) | 1.53x | ~1.43 – 1.64 (derived) |
| Relapse (random) | 3.83x | 3.61 – 4.08 |

---

*For methodology, definitions, and control group descriptions, see: Escalation Analysis — Technical Reference.*
