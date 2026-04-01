# Escalation Feature — Analytical Briefing
*2026-03-31 — Joane*

## What is escalation?

Delinquency escalation is when a person who holds multiple accounts goes delinquent on one, and then goes delinquent on another within a short time window. The hypothesis is that this isn't coincidence — financial distress spreads across a person's accounts, and detecting the first DQ should raise an alert on their other accounts.

This matters for Akuvo because the platform already tracks accounts in isolation. Escalation would add a *relational* signal: "this account hasn't missed a payment yet, but its owner just went delinquent on another account — treat it as higher risk."

## What's been done (three notebooks)

### Notebook 25 — First pass (Feb 2026, COMFIRSTCU via Spark)
- Proved the basic prevalence: multi-account holders exist, many have DQ on 2+ accounts
- Established the data pipeline (raw delta tables → Spark → pandas)
- Exploratory, ended mid-analysis — no outcome metrics

### Notebook 27 — V2 (Mar 2026, DNCU via datamart)
- Full analysis on a different client with richer data (79K accounts, 41K DQ episodes, 1.2M activities)
- Key findings:
  - 38% of accounts have first-order relations through shared holders
  - 79% of escalation-connected DQs are overlapping (simultaneously delinquent), 21% within 7 days
  - Escalated accounts: 87.5% adverse activity rate vs 70.7% non-escalated (1.24× uplift)
  - Escalated accounts average 6.2 DQs vs 4.9, and 74 days in DQ vs 51 days
- Used a hardcoded CLOSEBY_DAYS threshold
- Adverse outcome analysis based on activity codes (repossessions, charge-offs, foreclosures)
- Summary is clean and presentable, but methodology has gaps

### Notebook 28 — V3 (Mar 2026, COMFIRSTCU via Synapse half-cooked data)
- Structured around decision-relevant questions rather than descriptive summaries
- Key methodological improvements:
  - Statistical baseline: real related-account pairs vs random pairs (lift calculation)
  - Empirical lag distribution: no hardcoded threshold — measured the actual temporal pattern
  - Directional signal: which account type goes DQ first (portfolio-level direction matrix)
  - Richer activities table: includes dqamount, dqdays, balance at time of activity (pre-DQ signal)
- Structure: Data Audit → Account Network → DQ Co-occurrence → Escalation Window → Escalation Characteristics → Activity Signal → Summary
- Some cells unexecuted (sections 5-6) — work in progress

## Analytical gaps

Based on reading all three notebooks, here's what's missing or incomplete:

**1. The baseline lift is broken in nb28.** The random-pairs comparison shows lift of 0.0× — the normalization is wrong (dividing by different denominators for real vs random). The idea is right but the implementation needs fixing. This is the single most important metric: "are related accounts more likely to co-enter DQ than random pairs?"

**2. No outcome analysis in nb28.** Notebook 27 has the adverse activity analysis (1.24× uplift), but nb28 doesn't carry it forward. The outcome question — does escalation predict charge-offs, repossessions, foreclosures? — is partially answered but not with the improved methodology.

**3. Single-client analysis only.** All three notebooks run on one client at a time. The client segmentation work we just did identified 50 Rich-tier clients. The escalation findings need validation across at least a handful of clients to be credible as a cross-platform feature.

**4. No feature specification.** The notebooks prove the phenomenon exists and is associated with worse outcomes. But there's no concrete feature design: what exactly gets computed per account, at what cadence, and how does it integrate into the scoring pipeline?

**5. Temporal dynamics are thin.** Nb27 found all escalation is either overlapping or within 7 days. Nb28's empirical lag distribution shows 54% A-first, 43% B-first, 3% same-day — but the escalation window was set at 30 days without a clear empirical justification beyond "the distribution shows some concentration there."

**6. No causal analysis.** Is collection activity on account A *causing* B to go DQ (e.g., borrower shifts payments to save A, neglects B)? Or is it just shared financial distress manifesting independently? Nb28's Section 6 (activity signal) is designed to probe this but wasn't fully executed.

## How I would approach it

### Phase 1: Fix the foundation (1-2 days)
Fix the baseline lift calculation in nb28. The question is simple: among all account pairs where A enters DQ, what fraction of related-account B's also enter DQ within W days, vs the same fraction for random pairs? This needs to be an apples-to-apples comparison — same denominator shape. Once the lift is correct, sweep across window sizes (7, 14, 30, 60, 90 days) and plot the lift curve. If lift is significantly > 1 for related pairs and ~1 for random, the signal is real.

### Phase 2: Outcome validation (2-3 days)
Port the adverse outcome analysis from nb27 into nb28's framework. Two questions:
- **Are escalation-source accounts more likely to end in charge-off/repo?** Compare outcome rates for escalation-tagged episodes vs non-escalation episodes, controlling for basic account attributes (balance, portfolio, credit score).
- **Are escalation-target accounts harder to cure?** Compare DQ duration and depth (dqdays, dqamount) for target episodes vs non-target episodes on networked accounts.

### Phase 3: Cross-client validation (3-5 days)
Run the analysis on 5-8 Rich-tier clients of varying sizes. We now have the segmentation to pick good candidates: MACU (911K, large), UNIFY (350K, large), FAIRWINDS (138K, medium), DNCU (80K, medium), COMFIRSTCU (6K, small). The goal is a table: "across N clients, median lift is X, median adverse uplift is Y, median escalation window is Z days." If the signal is consistent, it's a feature. If it varies wildly, it's client-specific.

### Phase 4: Feature specification (1-2 days)
Define the concrete features for the scoring pipeline:
- `n_related_accounts` — number of first-order related accounts (static)
- `n_related_in_dq` — number of related accounts currently in DQ (dynamic)
- `related_dq_recency` — days since most recent related-account DQ episode started (dynamic)
- `is_escalation_source` — flag: this account has a DQ episode that was followed by a related account entering DQ (historical)
- `related_adverse_rate` — fraction of related accounts with adverse outcomes (historical)
- `related_max_dqdays` — worst DQ severity across related accounts (dynamic)

These could be computed at the account level and refreshed daily via the integration pipeline.

### Phase 5: Presentation for stakeholders (1 day)
Wrap Phases 1-4 into a clean narrative: "here's what escalation is, here's the evidence it matters across N clients, here's what the feature looks like, here's how it integrates into scores." The client segmentation presentation we just built is a good template.

## Summary

The analytical work is 60-70% done. The core phenomenon is proven: multi-account holders exist, their DQs co-occur, and escalated accounts have worse outcomes. What's missing is a robust statistical baseline, cross-client validation, and a feature spec. The path forward is clear and modular — each phase produces a standalone deliverable.
