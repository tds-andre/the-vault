# Escalation Terminology and Concepts Review

## Terms and Definitions

### Related Account
An account that is related to another account (or it's delinquency episode) via one common person, which may be the main account holder or not.

### Escalation Scenario
An event where a delinquency was followed by another delinquency in a related account. The first delinquency is called **A** or **trigger**, the second delinquency is called **B** or **ripple** (renamed from escalated) - it can follow A after it ends, up to W days (escalation window) to be considered an escalation scenario (**serial escalation**), or it can start before A ends (**concurrent escalation**).

### Escalation Day
The date when the escalation scenario could be identified, i.e., the start date of delinquency B.

### Escalation Window (W)
The number of days after delinquency A ends that a delinquency started in a related account would still count as an escalation. It can be zero, but usual values tested are 5, 15, 25 and 35.

### Observation Window (Z)
The number of days after escalation day (B start date) in which both delinquencies will be observed to measure effects (e.g., negative outcomes). Typical value is Z = 90 days.

### Escalated Delinquency
A delinquency that was part of an escalation scenario


## Motivation

To analyze Escalation, we have two broad conceptual metrics:
1. **Coverage**: how much of a client portfolio would be covered by a potential escalation scenario flag; example: 10% of all delinquencies were part in a escalation scenario.
2. **Fallout**: how much, if at all, does an escalation scenario leads to worse outcomes; example: delinquencies part of escalation scenario are 8x times more likely to result in negative outcomes.

## Measuring Fallout

**Fallout** is further divided in 3 categories, **conceptually** defined as:
1. **Impact** (renamed from Fallout): how much more likely negative events happens in an escalation scenario
2. **Duration**: how much longer delinquencies last in an escalation scenario
3. **Relapse**: how much more likely are escalated delinquencies accounts to relapse

Most metrics are relative to **baseline control groups**; we have 2 control groups:
1. **Random baseline**: whenever the delinquency control group is samples for the overall delinquency population (?pairs?)
2. **Intra-account baseline**: whenever the delinquency control group is sampled from the same pair of related accounts; more fair comparison, but with limited sample sizes.


## Key Metrics

| Metric Metric             | Shortcut Name | Group    | Definition                                                             | Control Groups |
| ------------------------- | ------------- | -------- | ---------------------------------------------------------------------- | -------------- |
| Negative volume           |               | Impact   |                                                                        | random; intra  |
| Negative incidence        | Impact        | Impact   |                                                                        | random; intra  |
| Non-terminal volume       |               | Impact   |                                                                        | random; intra  |
| Non-terminal incidence    |               | Impact   |                                                                        | random; intra  |
| Terminal volume           |               | Impact   |                                                                        | random; intra  |
| Terminal incidence        |               | Impact   |                                                                        | random; intra  |
| Duration AB               | Duration      | Duration | (Duration A + Duration B) / 2                                          | random; intra  |
| Duration A                |               | Duration |                                                                        | random; intra  |
| Duration B                |               | Duration |                                                                        | random; intra  |
| Relapse % of A up to D+30 | Relapse       | Relapse  | Relapse % of trigger delinquencies in 30 days                          | random; intra  |
| Coverage % of Total       | Coverage      |          | % of delinquencies (of total) that were part of an escalation scenario |                |

## Supporting Metrics
- Sample sizes (for each group)
- 