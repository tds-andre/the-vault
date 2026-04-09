---
created_by: Joane claude-opus-4-6 v2.0
created_on: 2026-04-08
type: reference
---

# Escalation Analysis — Concepts & Definitions

*Informal reference. Living document.*

---

## Core Concepts

**Escalation event:** When a person has account A in delinquency and account B enters delinquency within W days of A's end date. A is the trigger, B is the escalated episode.

**W (escalation window):** Max days after A.end for B.start to qualify. Current default: 15 days.

**Z (outcome observation window):** Days from escalation day (B.start) to count outcome events. Current default: 90 days.

---

## Control Groups

**Random baseline:** Pairs sampled from network accounts (multi-account holders) that have ≥1 DQ. Conditions on DQ history — compares escalation against other DQs on similar accounts, not against the entire portfolio.

**Intra-account baseline:** Non-escalation DQ episodes on the same accounts involved in escalation. Controls for account-level risk — isolates the escalation effect from "this account is just riskier."

Default baseline for core metrics: **random**. Intra-account is a supporting/secondary metric.

> **TODO:** Formally define control group sampling, sample sizes, and statistical significance / confidence intervals.

---

## Core Metrics (the "nicknames")

### Coverage

**Definition:** % of all DQ episodes that are escalation events (B-side).
**Pipeline column:** `pct_all_dqs_escalated`
**Cross-client median:** 7.5% (range 4.2–21.6%)
**Note:** When context is ambiguous, "coverage" always means % of all DQs, not % of network DQs. The network-DQ metric (median 28%) is a secondary reference.

### Impact

Umbrella term for how we measure adverse consequences of escalation. Three core sub-metrics:

#### Duration

**Definition:** Mean of A-side and B-side duration lift vs intra-account baseline. i.e., (dur_a_lift + dur_b_lift) / 2.
**Pipeline columns:** `dur_a_lift`, `dur_b_lift`
**Cross-client median:** ~1.9x (A=2.0x, B=1.8x)
**Interpretation:** Escalation DQs last roughly twice as long as non-escalation DQs on the same accounts.

#### Fallout

**Definition:** Negative outcome volume lift vs intra-account baseline. Mean adverse event count per escalation pair divided by mean per intra-account baseline DQ.
**Pipeline column:** `out_negative_vol_lift`
**Cross-client median:** 5.6x (range 3.8–9.0x)
**Interpretation:** Escalation pairs produce 5.6x more adverse events (broken promises, charge-offs, DNC flags, etc.) than the same accounts during non-escalation periods.
**Negative = umbrella of all 15 adverse activity types** (9 terminal + 6 non-terminal).

> **TODO:** Add negative volume lift vs random baseline to the pipeline. Currently only incidence (not volume) is computed vs random.

#### Relapse

**Definition:** Recurrence lift vs random baseline at 30 days. % of trigger accounts with ≥1 new DQ start within 30 days of escalation day, divided by random baseline %.
**Pipeline column:** `recur_30d_lift`
**Cross-client median:** 8.0x (range 4.8–21.7x)
**Supporting metric:** Absolute recurrence rate — median 69% of trigger accounts relapse within 30 days (vs ~9% random baseline).
**Interpretation:** Trigger accounts are 8x more likely to enter a new delinquency within a month.

---

## Escalation Opportunity Score

**Definition:** coverage × mean impact, where mean impact = (duration + fallout + relapse) / 3.

**Formula:** `pct_all_dqs_escalated / 100 × (duration_lift + fallout_lift + relapse_lift) / 3`

**Cross-client range:** Varies by client. Coverage scales the raw impact — a client with extreme lifts but 4% coverage scores lower than one with solid lifts and 20% coverage.

**Note:** Can exceed 100% — it's an index, not a probability. The % unit reflects that coverage is a percentage, not that the score is bounded.

---

## Extensive Metrics List

All metrics computed per client by the pipeline (`escalation-rich18-v2-W15Z90.csv`).

### Coverage
| Metric | Column | Median | Description |
|---|---|---|---|
| % network DQs escalated | `pct_network_dqs_escalated` | 27.6% | Esc pairs as % of DQs on network accounts |
| **% all DQs escalated** | `pct_all_dqs_escalated` | 7.5% | Esc pairs as % of all DQs (**= core "coverage"**) |
| Escalation pairs | `n_escalation_pairs` | 1,839 | Absolute count per client |

### Duration
| Metric | Column | Median | Description |
|---|---|---|---|
| **A duration lift** | `dur_a_lift` | 2.0x | Trigger DQ duration vs intra-account baseline |
| **B duration lift** | `dur_b_lift` | 1.8x | Escalated DQ duration vs intra-account baseline |
| A trigger duration (mean) | `dur_a_trigger_mean` | 23.6d | Raw mean days |
| B escalated duration (mean) | `dur_b_esc_mean` | 21.2d | Raw mean days |
| Global baseline duration | `dur_global_mean` | 15.1d | All non-escalation DQs |

### Negative Outcomes (umbrella — 15 types)
| Metric | Column | Median | Description |
|---|---|---|---|
| Incidence lift vs intra | `out_negative_lift_intra` | 3.4x | % with ≥1 adverse event, esc vs intra |
| Incidence lift vs random | `out_negative_lift_rand` | 8.8x | % with ≥1 adverse event, esc vs random |
| **Volume lift vs intra** | `out_negative_vol_lift` | 5.6x | Mean event count, esc vs intra (**= core "fallout"**) |
| Incidence (escalation) | `out_negative_esc_incidence` | 11.5% | Raw incidence rate |
| Incidence (intra) | `out_negative_intra_incidence` | 3.3% | Raw intra baseline rate |

### Non-terminal Outcomes (6 types)
| Metric | Column | Median | Description |
|---|---|---|---|
| Incidence lift vs intra | `out_nonterminal_lift_intra` | 3.4x | Distress signals lift |
| Volume lift vs intra | `out_nonterminal_vol_lift` | 4.9x | Distress volume lift |

### Terminal Outcomes (9 types)
| Metric | Column | Median | Description |
|---|---|---|---|
| Incidence lift vs intra | `out_terminal_lift_intra` | 6.2x | Loss events lift (noisy — sparse events) |
| Volume lift vs intra | `out_terminal_vol_lift` | 7.6x | Loss volume lift (very noisy) |

### Recurrence
| Metric | Column | Median | Description |
|---|---|---|---|
| Recurrence % (trigger) | `recur_30d_esc_pct` | 69.0% | % of A-side accounts with new DQ within 30d |
| Recurrence % (random) | `recur_30d_rand_pct` | 8.8% | Random baseline recurrence rate |
| **Recurrence lift** | `recur_30d_lift` | 8.0x | Trigger vs random (**= core "relapse"**) |

### Composite
| Metric | Column | Median | Description |
|---|---|---|---|
| Escalation opportunity score | `escalation_opportunity` | — | coverage × mean(duration, fallout, relapse) |

---

## Outcome Category Definitions

**Negative** (15 types) = any adverse event (umbrella):
- **Terminal** (9 types) — loss events: CREATE_CASE_CHARGE_OFF, RECOMMEND_CHARGE_OFF, CREATE_CASE_REPOSSESSION, RECOMMEND_REPOSSESSION, CREATE_CASE_BANKRUPTCY, CREATE_CASE_IMPOUND, RECOMMEND_FORECLOSURE, CREATE_CASE_LEGAL, CREATE_CASE_FORECLOSURE
- **Non-terminal** (6 types) — distress signals: PROMISE_BROKEN, PROMISE_CANCELLED, DO_NOT_COLLECT, DO_NOT_CONTACT, RECOMMEND_SKIP_TRACE, CREATE_CASE_HARDSHIP

---

## Cross-Client Consistency (for reference)

| Core metric | Median | Range | Consistency (1-CV) |
|---|---|---|---|
| Coverage (% all DQs) | 7.5% | 4.2–21.6% | 0.53 |
| Duration (mean A+B lift) | ~1.9x | ~1.4–2.8x | ~0.79 |
| Fallout (neg vol lift) | 5.6x | 3.8–9.0x | 0.74 |
| Relapse (recurrence lift) | 8.0x | 4.8–21.7x | 0.50 |

---

## Open Items

- [ ] Add negative volume lift vs random to pipeline
- [ ] Formally define control group sampling procedures
- [ ] Assess and document sample sizes per metric per client
- [ ] Add confidence intervals or significance tests (especially for intra-account with smaller samples)
- [ ] Recompute escalation opportunity score with updated formula: coverage × mean(duration, fallout, relapse)
