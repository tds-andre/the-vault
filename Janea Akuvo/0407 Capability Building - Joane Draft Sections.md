---
created_by: Joane claude-opus-4-6 v2.0
created_on: '2026-04-07'
type: draft
updated_by: ''
updated_on: ''
---

# Capability Building — Joane's Draft Sections
*Companion to André's essay (`0407 Building Akuvo's Capability in Analytics - Essay.md`).*
*Drafts for sections 3-5: evidence, diagnosis, and plan. For André to review, edit, and integrate.*

---

## What We've Seen: Evidence from Practice

*This section uses recent analytical work as concrete evidence for why capability building matters. Each example surfaces a specific gap that a proper analytics foundation would have prevented.*

### Evidence 1: The Escalation Heterogeneity Wall

**What happened:** We ran escalation analysis across 21 data-rich clients to test whether delinquency escalation patterns generalize across the platform. The analysis pipeline worked — every client showed the effect. But the cross-client comparison nearly derailed because of data heterogeneity.

**What we found:**
- 76 unique activity types across clients, but only 19 are universal (present in all 21). The remaining 57 are client-specific or partially present.
- The same outcome category ("negative event") means different things for different clients: PROMISE_BROKEN ranges from 17% to 83% of negative events depending on the client's operational practices.
- Three clients (60, 91, 96) had to be excluded entirely because their DQ recording practices were fundamentally different — client 60 had a median DQ duration of zero days, with 72% of episodes lasting one day or less.

**What it cost:** Days of ad-hoc normalization work. We manually classified 76 activity types, designed an outcome hierarchy (terminal vs non-terminal vs negative umbrella), and built client-specific exclusion rules — all from scratch, all undocumented before we did it, all likely to be repeated by whoever does the next cross-client analysis.

**What a proper foundation would have prevented:** A canonical activity classification table, maintained once, would have eliminated the normalization effort. A data quality scoring system would have flagged clients 60/91/96 before we wasted time including them. A cross-client schema with documented column semantics would have made the pipeline build trivial instead of exploratory.

### Evidence 2: The LGBM Grid Search — 200 Models, One Lesson

**What happened:** A grid search was conducted to predict Max DQ Days — a core predictive model for the platform. A single LightGBM regressor was trained on 1.2 million DQ episodes (MACU dataset), using 282 features. The grid search explored 200+ model configurations, varying six parameters: L1 regularization, L2 regularization, number of leaves, number of lags, minimum history, and data quality filters.

**The expectation:** That hyperparameter tuning — the standard model optimization approach — would drive performance differences.

**What actually happened:** Five of the six parameters had essentially no effect on model accuracy. L1 regularization: flat. L2 regularization: flat. Number of leaves: flat. Number of lags: flat. Minimum history: flat. The only parameter that moved the needle was **data quality filters** — and it moved it dramatically.

**The numbers:**
- With no quality filter: MAE-over-bins ≈ 25 days
- With sensible filtering ("avg" — average score above 85%): MAE-over-bins ≈ 20 days (improved)
- With aggressive filtering ("all" — all scores above 85%): MAE-over-bins degraded — too few training examples remained
- The data funnel tells the story: 3.14M episodes → 1.91M qualified (60%) → 1.18M passed quality filter (61%) — 39% of the raw data didn't meet minimum quality criteria

The best model achieved MAE of 8 days (vs 12 for production) and MAE-over-bins of 20 days (vs 26 for production). But this improvement came from data quality control, not model sophistication.

**The implication:** This is the strongest possible argument for investing in data quality *before* investing in model sophistication. If the most expensive part of model development (a systematic grid search across 200+ configurations) produces a finding that says "your data is the bottleneck, not your model," then fixing the data is the highest-ROI activity the team can undertake. Every future model — not just Max DQ Days — benefits from the same data quality investment.

### Evidence 3: The ROI Denominator Trap

**What happened:** Mike asked for a simple number: "what percentage of DQs under 30 days cure without a phone call?" The raw answer was 91%. Impressive — but misleading.

**What we found:** 88% of those DQs had no outbound contact at all — they self-cured before any collection action. The automation story wasn't in the 91%; it was in the 53% of *contacted* DQs that were handled through automated channels. The same data told two completely different stories depending on the denominator.

**The implication:** Without a standardized analytical framework — clear metric definitions, documented baselines, and reproducible computation — every ad-hoc analysis risks producing numbers that are technically correct but practically misleading. The team has no shared conventions for how to compute, validate, and present metrics. Each analyst invents their own approach each time.

### Evidence 4: The André+Joane Showcase

**What happened:** In roughly one week of focused work, we went from a single-client hypothesis to:
- Full escalation analysis on one client (prod-31), with duration, outcomes, and recurrence analysis
- Cross-client validation across 18 clients, with data quality sanity checks, outcome normalization, and before/after robustness testing
- A parameterized pipeline that can be run on any new client in under 3 seconds
- Deliverables: detailed report, executive report, 14-page presentation, data quality report, column metadata
- A separate ROI/automated cure analysis inherited mid-stream and delivered in the same session
- An escalation opportunity score that ranks clients by potential benefit

**What made this possible:** A properly configured AI-assisted analytics environment (Claude + Python + vault + MCP tooling), combined with direct access to organized data (parquet cubes in a structured lake). The methodology (Socratic Analytics) provided the analytical discipline; the data access provided the speed.

**What it demonstrates:** This is what becomes *routine* — not exceptional — when the data layer is clean, accessible, and well-documented. Right now, the speed came from André building the infrastructure ad-hoc (cubes, pipelines, classification tables). With a permanent shared foundation, any team member (or any AI-assisted workflow) could achieve similar throughput.

---

## Current Issues: The Diagnosis

*Each issue is stated as a problem, its cost, and what it blocks. The framing is: these aren't complaints — they're measurable friction that slows down everything the team tries to do.*

### 1. Impractical Data Ecosystem

**The problem:** The current development environment for analytical work is slow, fragile, and hostile to iteration.

**Specific symptoms:**
- **Development interface:** Azure Synapse notebooks are the primary development surface. They lack code completion, debugging tools, version control integration, and basic IDE features. Working in Synapse is the analytical equivalent of coding on punch cards — technically possible, but orders of magnitude slower than modern alternatives.
- **Code duplication:** Without shared libraries or packages, each analyst reimplements common patterns (data loading, filtering, aggregation, plotting) from scratch. The same data loading boilerplate exists in dozens of notebooks with slight variations.
- **No single source of truth:** There is no canonical schema documentation, no lineage tracking, and no agreed-upon definitions for key metrics. When two analysts compute the same metric and get different numbers, there's no way to determine which is correct without manually tracing through their code.
- **Wide and detailed data:** The raw data model is unnecessarily voluminous, with many columns that are irrelevant to analytical workflows. Loading the full schema when only a handful of columns are needed wastes memory and processing time.
- **IDE-unfriendly:** The data formats, access patterns, and authentication requirements make it difficult to work outside Synapse — in VS Code, in Jupyter locally, or in any modern development environment.
- **Research-to-production gap:** Moving an analysis from a development notebook to a production pipeline requires substantial rewriting. There is no smooth path from "it works on my machine" to "it runs reliably in production."

**The cost:** Development that should take hours takes days. Iteration cycles that should be minutes are hours. The team spends more time fighting the tooling than doing analysis.

**What it blocks:** Rapid prototyping, cross-client analyses, reproducible results, team collaboration on shared codebases.

### 2. Poor Data Quality

**The problem:** Data quality issues are pervasive but unquantified, untracked, and addressed only when they visibly break something.

**Specific symptoms:**
- Missing values with no documentation of what's expected vs what's absent
- Irregular data presence — columns that exist for some clients but not others, with no metadata about coverage
- Varying onboarding dates that make temporal comparisons unreliable without client-specific adjustments
- Bulk data loads that distort date fields, creating artificial clustering of events on load dates rather than actual occurrence dates
- The LGBM Grid Search demonstrated this conclusively: data quality, not model sophistication, is the binding constraint on analytical accuracy

**The cost:** Every analysis begins with an undocumented data quality investigation. Findings are not recorded or shared. The next analyst repeats the same discovery process. Models trained on uncontrolled data produce unreliable results — the grid search proved this empirically.

**What it blocks:** Trustworthy models, reliable cross-client comparisons, automated monitoring, and any analytical product that clients depend on for decisions.

### 3. Heterogeneous Data Across Clients

**The problem:** Most data comes from client-controlled exports, not from Akuvo's internal transactional systems. This means the same tables and columns can have different patterns, distributions, and even semantic meaning across clients.

**Specific symptoms:**
- Activity type vocabularies differ (76 types total, 19 universal) — "negative event" is operationally different per client
- DQ recording practices vary wildly (some clients record sub-day DQs as real delinquency; others don't)
- Feature distributions shift across clients — a model trained on the aggregate dataset will be dominated by high-volume clients and perform poorly on smaller ones (client balancing problem)
- These differences have been observed informally and by accident, never through deliberate analysis

**The cost:** Cross-client analytics require ad-hoc normalization every time. Models trained on aggregate data produce unbalanced results. The team cannot make platform-level claims without qualifying them heavily.

**What it blocks:** Multi-client models, platform-level product features (like escalation alerts), benchmarking, and any "Akuvo customers see X" marketing claim.

### 4. Non-Existent Power-User Data Access

**The problem:** Stakeholders who want to explore data (Mike, Will) depend entirely on the team for manual exports. There is no self-service layer.

**Specific symptoms:**
- Mike builds analytical React applications with Claude but relies on the team for every data export
- Will understands the value of a "feature store" conceptually but has no way to interact with one
- The IT-blocked Claude Desktop attempt shows appetite for self-service but no infrastructure to support it

**The cost:** The team becomes a bottleneck for data access. Stakeholders wait days for exports that, with proper infrastructure, could be self-served in minutes. The team spends time on low-value extraction work instead of high-value analytical work.

**What it blocks:** Stakeholder independence, rapid decision-making, and the team's ability to focus on high-impact analysis.

### 5. Erratic Development Cycles

**The problem:** There is no structured development process, no prioritization framework, and no quality standards for analytical deliverables.

**Specific symptoms:**
- Leadership meetings follow no particular agenda
- The modus operandi is to work toward whatever product feature is most appealing at the moment
- No task tracking, no formal controls, no shared documentation
- Deliverable quality varies — some work is thorough, some is ad-hoc and undocumented

**The cost:** Effort is scattered. Work is duplicated. Knowledge is lost between projects. The team cannot demonstrate cumulative progress because there's no system for building on previous work.

**What it blocks:** Strategic capability accumulation, team coherence, and the ability to show leadership a clear trajectory of increasing analytical maturity.

---

## The Capability Building Plan: Components

*Each component addresses one or more of the diagnosed issues. They are ordered by dependency — later components build on earlier ones.*

### Component 1: Feature Store (Shared Data Layer)

**What:** Design, develop, and document analytical data assets — canonical, curated, cross-client data cubes that serve as the single source of truth for all analytical work.

**What it solves:** Code duplication (#1), no single source of truth (#1), heterogeneous data (#3), non-existent power-user access (#4).

**What exists already:** The escalation analysis cubes (`analytics/cubes/rich/`) are a prototype — 5 tables (accounts, acc_profile, dqs, activities, payments) for 21 Rich clients, organized in parquet format. They were built ad-hoc for one analysis but proved their value immediately: loading, joining, and analyzing data went from hours (Synapse) to seconds (local Python).

**What it would look like at maturity:**
- Canonical schemas documented with column metadata (we built `column-metadata-rich18-v2.csv` as a prototype)
- Automated cube generation from the delta lake, with versioning and lineage
- Coverage across all client quality tiers (Rich, Moderate, Scarce), not just Rich
- API or standardized access pattern for downstream consumers (notebooks, pipelines, applications)

**Dependencies:** None — this is the foundation everything else builds on.

**Effort estimate:** Medium. The pattern exists; it needs to be formalized, documented, and extended.

### Component 2: Analytical Toolkit (Shared Python Libraries)

**What:** Design, develop, and publish Python packages with common patterns and tools for analytical workflows — data loading, filtering, aggregation, visualization, reporting.

**What it solves:** Code duplication (#1), IDE-unfriendly ecosystem (#1), research-to-production gap (#1), erratic quality (#5).

**What exists already:** The escalation pipeline (`src/akuvo/analytics/pipelines/escalation/`) is a working example — parameterized analysis with CLI runner, metadata output, and reproducible results. The activity classification table is another reusable asset.

**What it would look like at maturity:**
- `akuvo-analytics` Python package installable via pip, with modules for: data loading (cube access), feature engineering (common transformations), analysis patterns (A/B comparison, lift computation, baseline construction), reporting (chart generation, slide reports)
- Consistent API so new analyses follow established patterns instead of reinventing them
- Deployable to Synapse as a wheel for production use (this path was already established in the refactor)

**Dependencies:** Feature Store (Component 1) for the data access layer.

**Effort estimate:** Medium-high. The patterns exist in scattered notebooks; they need extraction, generalization, testing, and packaging.

### Component 3: Data Quality Control System

**What:** Design, develop, and operationalize a rules-based system to evaluate data quality, integrity, and normality across clients. Tag data accordingly. Fix, discard, or dispatch bad data for human review.

**What it solves:** Poor data quality (#2), heterogeneous data (#3).

**What exists already:** The cross-client data quality sanity check we performed for escalation is a manual prototype — we checked DQ duration distributions, activity type coverage, outcome category presence, and activity intensity across 21 clients. The findings drove three client exclusions and a DQ duration filter. But it was all ad-hoc.

**What it would look like at maturity:**
- Automated quality scoring per client per table: completeness, temporal consistency, distributional normality, cross-client comparability
- A quality dashboard showing current state and trends
- Automated flagging of anomalies (e.g., client 60's zero-duration DQs would have been caught before any analysis consumed the data)
- Rules-based remediation: known issues get automatic fixes; unknown issues get flagged for review
- Could evolve into a learning system in a future version

**Dependencies:** Feature Store (Component 1) for standardized data access. Analytical Toolkit (Component 2) for computation patterns.

**Effort estimate:** High. This is the most complex component and the most valuable — it's the difference between "we think the data is OK" and "we know the data is OK."

### Component 4: Data Heterogeneity Analysis

**What:** Conduct a deliberate, systematic analysis of cross-client data heterogeneity — distribution shifts, missing value patterns, feature correlations, coverage gaps — to objectively quantify how much the data differs, where, and what's normal.

**What it solves:** Heterogeneous data (#3), client balancing problem.

**What exists already:** The `cross-client-data-quality.md` report and the before/after analysis from escalation are partial examples. We characterized 76 activity types, negative outcome composition, DQ duration distributions, and activity intensity across 21 clients. But this was limited to escalation-relevant dimensions.

**What it would look like at maturity:**
- A systematic audit of all major tables across all clients: accounts, DQs, activities, payments
- Quantified heterogeneity metrics (e.g., coefficient of variation per column per client)
- Client clustering based on data similarity — which clients are comparable and which aren't?
- Recommendations for normalization strategies, client-specific treatments, or segmented models

**Dependencies:** Feature Store (Component 1) for data access. Analytical Toolkit (Component 2) for computation.

**Effort estimate:** Medium. The methodology is straightforward; the volume is the challenge.

**Potential output:** A Data Balancing and Normalization System — systematic approach to segment, qualify, classify, and homogenize the data for cross-client models.

### Component 5: Analytical Applications Pipeline (Data Access for Power Users)

**What:** Establish a path from curated data to stakeholder-facing analytical applications — enabling Mike, Will, or any power user to access data through self-service tools and build client-facing dashboards and reports.

**What it solves:** Non-existent power-user access (#4), team as bottleneck for exports.

**What exists already:** The André+Joane workflow demonstrates what's possible: Claude-assisted analytics producing React presentations, interactive reports, and data exports. Mike already builds React applications with Claude but can't access the data layer independently.

**What it would look like at maturity:**
- A curated data API or export layer that power users can query without team intervention
- Templates for common analytical applications (client reports, score dashboards, metric summaries)
- A deployment path for client-facing applications (the "tricky part" Will is interested in)
- Documentation and examples so non-engineers can produce standard outputs

**Dependencies:** Feature Store (Component 1) — without clean, accessible data, self-service access is impossible. Data Quality (Component 3) — self-service data must be trustworthy.

**Effort estimate:** Medium. The technical path is clear; the organizational/governance questions are the hard part.

### Component 6: AI-Assisted Analytics Methodology

**What:** Document and standardize the Socratic Analytics approach — how AI-assisted analytical workflows operate, what they produce, and how they integrate with the team's processes.

**What it solves:** Erratic development cycles (#5), knowledge loss, quality variance.

**What exists already:** The methodology core document (`analytics-methodology-core.md`) with 6 sections, plus 12 learnings captured from practice. The escalation work is the primary demonstration.

**What it would look like at maturity:**
- A documented, teachable methodology that any team member could follow
- Templates for analytical deliverables (detailed reports, executive reports, slide reports)
- A pattern library of common analytical questions and how to approach them
- Integration with the toolkit and feature store so methodology + tools + data form a coherent system

**Dependencies:** All other components — this is the "how to use everything" layer.

**Effort estimate:** Low-medium. Most of the content exists in scattered form; it needs consolidation and generalization.

---

## Dependency Map and Phasing

```
Phase 1 (Foundation):     Feature Store → Analytical Toolkit
Phase 2 (Quality):        Data Quality Control → Heterogeneity Analysis
Phase 3 (Access):         Analytical Applications Pipeline
Continuous:               AI-Assisted Analytics Methodology (evolves with use)
```

Phase 1 is the prerequisite for everything. It's also where the team sees the most immediate benefit — faster development, less duplication, reproducible results. The escalation pipeline is a proof case that this approach works.

Phase 2 is where the strategic value compounds. Clean, characterized data enables trustworthy models, cross-client features, and platform-level claims.

Phase 3 is the stakeholder-visible payoff — power users can access data independently, and the team can focus on high-value work instead of manual exports.

---

## The Bite-Sized Menu

*For stakeholder consumption. Each item is a standalone 15-minute discussion or 1-page brief.*

1. **The Big Problem** — what Akuvo's platform is really optimizing, and why data is the strategic asset (the philosophical anchor; present first to Will/Mike to align on direction)
2. **Feature Store** — what shared data assets are, what exists, what's needed (Will's entry point; use his "data architecture" language)
3. **Data Quality** — the LGBM story + the escalation heterogeneity story (concrete, visual, hard to argue with)
4. **The Escalation Showcase** — what one week of focused analytics with proper infrastructure can produce (André+Joane demo; the "imagine this at scale" pitch)
5. **Analytical Applications** — the path from data to client-facing React apps (Mike's entry point; show what becomes possible with Components 1-3 in place)
6. **Cross-Client Intelligence** — what platform-level analytics enables for product and sales (connects back to the Big Problem; the "why this matters commercially" argument)

---

*This is a draft for André's review. All sections are proposals — edit, reorder, cut, or expand as needed.*
