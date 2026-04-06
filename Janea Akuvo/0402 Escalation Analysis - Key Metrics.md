# Escalation Analysis — Key Metrics (prod-31, 2026-04-02)

Client: prod-31 (CAPEDCU) | Data: Mar 2023 – Mar 2026 | Business-filtered

---

## Dataset Profile

| Metric | Value |
|---|---|
| Total accounts | 41,621 |
| Total people | 42,630 |
| DQ episodes | 143,761 |
| Activities | 464,174 |
| Network accounts (2+ per person) | 17,839 (42.9%) |
| Multi-account people | 9,396 (22.0%) |
| Account pairs (edges) | 16,990 |
| Connected components | 7,010 (largest: 17 accounts) |

---

## Q1: Coverage — How many DQs could an escalation alert cover?

**Escalation condition:** B.start >= A.start AND B.start <= A.end + W days

| W (days) | Escalated DQs | % of network DQs | % of ALL DQs |
|---|---|---|---|
| 5 | 8,174 | 17.6% | 5.7% |
| 15 | 10,676 | 23.0% | 7.4% |
| 25 | 13,001 | 28.0% | 9.0% |
| 35 | 14,170 | 30.5% | 9.9% |

**Lift vs random baseline (W=5d):** 1.16x — strongest at tightest window.

**Overlap types (W=5d):** FILO: 4,700 | FIFO: 2,118 | After: 1,684
FILO dominates — secondary DQs tend to be shorter, resolving inside trigger DQ.

---

## Q1b: Duration — Are escalation DQs longer?

**W=15d, intra-account baseline (same accounts, non-escalation DQs):**

| Group | Mean | Median | P75 | P90 |
|---|---|---|---|---|
| A (trigger) | 14.0d | 7.0d | 14.0d | 25.0d |
| A intra-baseline | 8.6d | 5.0d | 11.0d | 19.0d |
| B (escalated) | 11.8d | 5.0d | 13.0d | 23.0d |
| B intra-baseline | 9.3d | 5.0d | 11.0d | 19.0d |
| Combined A+B | 36.4d | 16.0d | 28.0d | 52.0d |
| Global baseline | 10.5d | 5.0d | 11.0d | 21.0d |

**A triggers are 1.6x longer than their own account's baseline.** B escalated 1.3x. Combined 3-4x any baseline.

---

## Q2: Impact — Do escalation cases lead to worse outcomes?

### Outcome categories
- **Terminal:** charge-off, repossession, bankruptcy, impound, foreclosure (731 total)
- **Negative:** broken/cancelled promises, DNC, skip trace (9,365 total)
- **Positive:** kept promises, payments (13,941 total)

### Incidence rates (% of DQs with ≥1 event in Z window from escalation day)

**W=15d escalation pairs, observation window Z days from B.start:**

#### Negative outcomes
| Z | Esc A | Esc B | Esc A+B | Random | Intra | Lift vs Rand | Lift vs Intra |
|---|---|---|---|---|---|---|---|
| 30d | 3.9% | 3.7% | 6.0% | 0.6% | 1.5% | 10.0x | 4.0x |
| 60d | 6.3% | 6.0% | 9.2% | 1.1% | 2.4% | 8.4x | 3.8x |
| 90d | 8.3% | 8.0% | 11.8% | 1.5% | 3.4% | 7.9x | 3.5x |
| 120d | 9.7% | 9.5% | 13.8% | 1.8% | 4.3% | 7.7x | 3.2x |

#### Terminal outcomes
| Z | Esc A+B | Random | Intra | Lift vs Rand | Lift vs Intra |
|---|---|---|---|---|---|
| 60d | 0.4% | 0.1% | 0.1% | 4.0x | 4.0x |
| 90d | 0.6% | 0.1% | 0.1% | 6.0x | 6.0x |
| 120d | 0.8% | 0.1% | 0.1% | 8.0x | 8.0x |

#### DQ recurrence (new DQ starts on A's account after escalation)
| Z | Esc A-side | Random | Lift |
|---|---|---|---|
| 30d | 68.6% | 12.7% | 5.4x |
| 60d | 77.5% | 17.6% | 4.4x |
| 90d | 82.0% | 21.1% | 3.9x |
| 120d | 84.2% | 23.1% | 3.6x |

---

## Key Insights

1. **Coverage:** 15-30% of network DQs (6-10% of all DQs) could be preceded by an escalation alert
2. **Duration:** Escalation DQs are 1.3-1.6x longer than same-account baseline; combined person exposure 3-4x
3. **Negative outcomes:** 8-10x lift vs random, 3-4x lift vs intra-account — strongest signal
4. **Terminal outcomes:** 4-8x lift but rare (low sample size)
5. **DQ recurrence on A-side:** 69-84% — trigger accounts are highly recidivist
6. **Symmetry:** A-side and B-side negative outcome rates are nearly identical
7. **Overall engagement elevated:** Positive outcomes also 2x intra — escalation accounts are "hotter"

---

## Methodology Notes

- **Business filter:** Removed 1,057 accounts where PRIMARY person is isbusiness=True
- **Random baseline:** Same B DQs, linked to random accounts instead of real connected accounts
- **Intra-account baseline:** Non-escalation DQs on the same accounts involved in escalation
- **Observation window:** From escalation day (B.start) + Z days, count events on A and B accounts independently

---

*Analysis performed: 2026-04-02 | Client: prod-31 | Analyst: André (via Joane)*
