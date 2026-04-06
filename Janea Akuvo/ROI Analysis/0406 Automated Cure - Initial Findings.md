# Automated Cure Rate Analysis — Initial Findings

**Date:** 2026-04-06 | **Data:** 21 Rich clients | **Status:** Preliminary, pending classification review

---

## Objective

Determine what proportion of cured DQ episodes resolved through automated channels (email, text, letter, virtual collector) versus requiring human intervention (outbound phone call or third-party referral).

## Population

- 21 Rich clients, 1,523,391 cured DQ episodes (cube excludes open episodes)
- Under 30 days duration: 1,446,430 (95% of all DQs)

## Activity classification

Activities linked to DQ episodes by matching on accountid and date window (activity created between DQ start and end dates).

- **Human intervention** (2 types): CALL_OUTBOUND, SEND_THIRD_PARTY
- **Automated outbound** (9 types): SEND_EMAIL, SEND_LETTER, SEND_ELTROPY, SEND_TEXT_AKUVO, SEND_TEXT_SBT, SEND_TO_VOAPPS, SEND_COLLECTION_ADVANTAGE, VIRTUAL_AGENT_ENGAGE, EXPIRE_VIRTUAL_COLLECTOR_LINK

Full classification of all 76 activity types at `analytics/analysis/roi/activity-classification.csv`.

## Key finding: framing matters

The raw numbers show that 91% of DQs under 30 days cure without a phone call. However, the vast majority (88%) had no outbound contact at all — they self-cured. The automation story becomes clear when looking at **DQs that actually received outbound contact.**

## Results — DQs that received outbound contact

### By DPD band

| Band | Contacted DQs | Automated only | Human-assisted | % automated |
|---|---|---|---|---|
| 0-14d | 72,545 | 50,722 | 21,823 | **69.9%** |
| 15-29d | 106,492 | 44,602 | 61,890 | 41.9% |
| 30-59d | 32,924 | 5,453 | 27,471 | 16.6% |
| 60-89d | 10,583 | 893 | 9,690 | 8.4% |
| 90d+ | 14,118 | 471 | 13,647 | 3.3% |
| **All bands** | **236,662** | **102,141** | **134,521** | **43.2%** |

Automation dominates the early stage and declines as DPD increases. By 60+ days, virtually all contacted DQs involve human intervention.

### Under 30 days — full breakdown

- Total DQs under 30d: 1,446,430
- Self-cured (no outbound contact): 1,267,393 (87.6%)
- Contacted: 179,037 (12.4%)
  - Automated only: 95,324 (**53.2%** of contacted)
  - Human-assisted: 83,713 (46.8% of contacted)

### Per client — contacted DQs under 30 days, % automated

| Client | Contacted | Auto | Human | % auto |
|---|---|---|---|---|
| 90 | 4,177 | 3,990 | 187 | 95.5% |
| 12 | 9,599 | 7,984 | 1,615 | 83.2% |
| 65 | 19,589 | 16,230 | 3,359 | 82.9% |
| 98 | 9,429 | 7,772 | 1,657 | 82.4% |
| 94 | 9,707 | 7,593 | 2,114 | 78.2% |
| 56 | 6,405 | 4,842 | 1,563 | 75.6% |
| 64 | 13,245 | 9,840 | 3,405 | 74.3% |
| 96 | 17,293 | 12,778 | 4,515 | 73.9% |
| 51 | 3,823 | 2,509 | 1,314 | 65.6% |
| 88 | 13,399 | 8,352 | 5,047 | 62.3% |
| 87 | 5,456 | 2,160 | 3,296 | 39.6% |
| 84 | 3,584 | 1,173 | 2,411 | 32.7% |
| 60 | 14,994 | 4,766 | 10,228 | 31.8% |
| 91 | 7,786 | 2,273 | 5,513 | 29.2% |
| 102 | 3,368 | 763 | 2,605 | 22.7% |
| 41 | 5,300 | 992 | 4,308 | 18.7% |
| 62 | 3,094 | 415 | 2,679 | 13.4% |
| 31 | 13,298 | 701 | 12,597 | 5.3% |
| 53 | 3,104 | 54 | 3,050 | 1.7% |
| 39 | 10,246 | 137 | 10,109 | 1.3% |
| 42 | 2,141 | 0 | 2,141 | 0.0% |

Median across clients: 39.6%. Wide range — some clients have fully embraced automated channels, others still rely almost entirely on phone calls. The per-client variation likely reflects configuration differences and adoption maturity.

## Candidate quotable statements

1. **"70% of early-stage DQs (0-14 days) that needed outbound contact were resolved entirely through automated channels."**
   — All clients, contacted DQs only, 0-14d band.

2. **"53% of DQs under 30 days that required outbound contact were handled through automation alone."**
   — All clients, contacted DQs only, under-30d.

3. **"Among clients actively using automation, 63% of contacted early DQs resolved without a human phone call."**
   — 17 clients with >=10% automation rate, contacted DQs, under-30d.

4. **"Only 9% of all DQs under 30 days required a collector to pick up the phone."**
   — All clients, all DQs (including self-cures), under-30d.

5. **"43% of all outbound collection contacts across all DPD bands are now automated."**
   — All clients, contacted DQs only, all bands.

## Considerations

- The "no outbound contact" bucket (88% of under-30 DQs) may include DQs where inbound contact occurred (member called in, made online payment). These aren't captured in the outbound classification.
- Per-client variation is very wide (0-96% automated). The aggregate numbers are pulled up by high-automation clients.
- The activity classification should be reviewed with Mike for accuracy (6 low-confidence types, all rare).
- This analysis does not distinguish between different automated channel effectiveness (e.g., virtual collector vs email vs text).

## Next steps

- Review classification and framing with Mike
- Explore queue throughput angle (collectors handling 120 vs 180 items/day)
- Consider time-series: is automation adoption growing over time?
