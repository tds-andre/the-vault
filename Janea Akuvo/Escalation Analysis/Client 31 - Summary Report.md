# Escalation Analysis — Client 31 Summary

## What is this?

This report summarizes an analysis of **delinquency escalation** for Client 31: what happens when a borrower who becomes delinquent on one account subsequently becomes delinquent on a related account.

We call this pattern an **escalation scenario**. The first delinquency is the **trigger (A)**, the second is the **ripple (B)**. Two accounts are "related" when they share a common person (primary holder or co-signer).

The analysis asks two questions: how often does escalation occur, and how much worse are outcomes when it does?

## Key findings

**Escalation is not rare.** We detected 8,588 escalation scenarios in Client 31's portfolio, covering 7.2% of all delinquency episodes. Among borrowers who hold multiple accounts (the only population where escalation is possible), the rate is 22.5%.

**Escalation is associated with substantially worse outcomes across every metric we measured.** Compared to similar non-escalation delinquencies:

- Escalation DQs are **4x more likely** to involve adverse events (broken promises, charge-offs, repossessions, etc.) and experience **6x the volume** of such events.
- Escalation DQs **last 53% longer** — 15 days on average versus 10 days for non-escalation DQs on the same accounts.
- Trigger accounts are **3.8x more likely to relapse** into a new delinquency within 30 days — nearly half (48%) do, compared to 12% for similar accounts.

All effects are statistically significant with narrow confidence intervals. The methodology tests against two independent baselines (random and intra-account); both confirm the same direction and magnitude.

**Concurrent escalation is more common than sequential.** 56% of escalation scenarios involve the ripple DQ starting while the trigger DQ is still active, rather than after it ends. This matters for detection timing: many escalation patterns are already in progress before the trigger resolves.

## What does this mean?

Escalation detection could serve as an early-warning signal for collection strategy. Accounts involved in escalation are at materially higher risk of adverse outcomes, longer delinquencies, and recurrence. If a borrower becomes delinquent on one account and holds other accounts, the probability that those accounts also deteriorate is elevated — and the consequences when they do are worse across the board.

Whether this signal can improve collection actions (earlier intervention, different routing, adjusted prioritization) is a downstream question that would require experimentation.

## Methodology

The analysis uses Akuvo's data lake tables: accounts, account profiles (person-account links), delinquency episodes, and collection activities. The detection algorithm identifies escalation pairs within a 15-day window (for sequential cases) or by temporal overlap (for concurrent cases). Outcomes are measured within 90 days of the escalation start date.

Two control groups are used to establish baselines: a **random baseline** (non-escalation DQ episodes on network accounts with delinquency history) and an **intra-account baseline** (non-escalation DQ episodes on the same accounts involved in escalation). The random baseline is the primary comparison for impact and relapse; the intra-account baseline is primary for duration.

All lift metrics include 95% bootstrap confidence intervals (1,000 iterations).

Full methodology is documented in the **Escalation Analysis — Technical Reference**. Complete metric breakdowns (by event type, control group, and measurement flavor) are in the **Client 31 — Detailed Metrics** companion document.

## Attached materials

| File | Description |
|---|---|
| `Escalation Analysis - Technical Reference.md` | Methodology: definitions, metrics, control groups, statistical approach |
| `Client 31 - Detailed Metrics.md` | Complete metric tables with CIs, breakdowns by event type |
| `metrics_detail-W15Z90.csv` | Machine-readable metrics (18 rows: one per metric x control group) |
| `source/accounts.csv` | Client 31 account data |
| `source/acc_profile.csv` | Person-account links |
| `source/dqs.csv` | Delinquency episodes |
| `source/activities.csv` | Collection activities |
