---
created_by: Joane claude-opus-4-6 v2.0
created_on: '2026-04-07'
type: essay
updated_by: ''
updated_on: ''
---

# Building Akuvo's Capability in Analytics

André Teixeira dos Santos — Niterói, RJ, Brazil — April 2026
With contributions from Joane (AI analyst agent)

---

## About this document

This is an internal reference essay — an honest, comprehensive articulation of how we see Akuvo's analytics capability: where it stands, where it should go, and why. It is written for our eyes only. It serves as the "source of truth" from which we compile stakeholder-facing materials, adapted in scope and language for each audience. Nothing in this document is intended to be presented as-is.

---

## Part I: The Core Idea

### The Big Problem

Akuvo's clients — banks and credit unions — have two core business functions: lend money, and receive it back with interest. On the lending side, the lender manages exposure by controlling how much it lends and at what risk. On the receiving side, the operation reduces to a cash flow optimization problem:

**maximize: cash flow = payments inflow − debt collection costs**

The operational lever is the set of collection actions — contacts, letters, escalations, third-party referrals — that can be performed against a delinquent borrower. Each action incurs a cost and changes the expected present value of recovery.

When collection costs are mostly fixed (payroll dominates), the optimization further simplifies to **recovery maximization**.

The bottom line: the entirety of Akuvo's platform features could, in theory, be reduced to a single optimization model that prescribes which actions should be taken, against which accounts, and when — to maximize recovery. This perfect model isn't technically feasible today, but it is conceptually simple. We call this **The Big Problem**.

### Why The Big Problem matters

The Big Problem matters not because we're going to solve it, but because it provides a long-term guiding light. Right now, the ML/Analytics team scrambles in all directions — delivering one-off analyses, building scores, responding to ad-hoc requests — without a unifying frame for what "good" looks like. The Big Problem gives us that frame: every initiative can be evaluated by how much it moves us closer to prescribing better collection actions.

### The reductions: from Big Problem to practical priority

The Big Problem is a rabbit hole. Trying to solve it directly would consume indefinite resources with no guarantee of outcome. But it can be reduced through a chain of practical simplifications:

1. **A prescriptive model requires a predictive model.** To prescribe the best action, you first need to predict what will happen under each option. A predictive meta-model — one that encodes account history, payment behavior, delinquency patterns, and activity outcomes — would be the core engine (roughly 80%) of any prescriptive system.

2. **Any predictive model, regardless of target, uses the same features.** Whether predicting DQ duration, charge-off probability, or payment likelihood, the input data is the same: account/person information, payment history, delinquency episodes, collection activities. This means building the feature layer once serves all models.

3. **But features require clean, accessible, well-understood data.** And this is where we hit reality. The data layer — quality, accessibility, documentation, cross-client consistency — is the binding constraint. Not model architecture. Not hyperparameters. Not algorithms.

This leads to the fundamental strategic insight:

### Data is the asset, not models

The current mindset at Akuvo is platform, product, and feature-driven: how many more bullet points can we add to the pricing page? What can we charge extra for? This is understandable commercially but strategically dangerous.

If Akuvo is to differentiate against the incoming wave of AI competitors — who will all have access to the same algorithms and foundation models — the strategic differentiator is the **data ecosystem**: the richness, quality, accessibility, and cross-client breadth of the data. Models are increasingly commodity. Data is not.

Every hour invested in data infrastructure compounds across every future model, every future analysis, every future product feature. Every hour invested in a one-off model or ad-hoc analysis is consumed once and discarded.

### A note on The Playbook

The Playbook is Akuvo's core product feature: a prescriptive, customizable set of rules that steers each delinquency episode through its lifecycle — triggering automated actions or dispatching to human collectors. It is the primary selling point.

But consider: if we had the perfect predictive model, would The Playbook still be the right abstraction? A perfect AI could steer each episode individually, with no pre-defined rules — only guardrails and policies. The Playbook's centrality may obscure the vision of what an AI-first collection platform would actually look like.

This is a long-term provocation, not a near-term recommendation. But it's worth keeping in mind as we invest in capability: we should build toward the future architecture, not just optimize the current one.

---

## Part II: The Evidence

Before diagnosing problems in the abstract, we present four concrete experiences from recent analytical work. Each one surfaces a specific gap that a proper analytics foundation would have prevented.

### The LGBM Grid Search: 200 models, one lesson

A grid search was conducted to predict Max DQ Days — a core predictive model for the platform. A single LightGBM regressor was trained on 1.2 million DQ episodes (MACU dataset), using 282 features. The search explored 200+ configurations across six parameters: L1 regularization, L2 regularization, number of leaves, number of lags, minimum history, and data quality filters.

**Five of the six parameters had no effect on accuracy.** L1 reg: flat. L2 reg: flat. Leaves: flat. Lags: flat. History: flat. The only parameter that moved the needle was data quality filters — and it moved it dramatically:

- No quality filter: MAE-over-bins ≈ 25 days
- Sensible filtering (average score above 85%): MAE-over-bins ≈ 20 days
- Aggressive filtering (all scores above 85%): degraded — too few training examples

The data funnel tells the story: 3.14M raw episodes → 1.91M qualified (60%) → 1.18M passed quality filter (61%). Thirty-nine percent of the raw data didn't meet minimum quality criteria.

The best model achieved MAE of 8 days (vs 12 for production) and MAE-over-bins of 20 days (vs 26 for production). But this improvement came entirely from data quality control, not from model sophistication.

**Implication:** If the most expensive part of model development — a systematic grid search across 200+ configurations — produces the finding that "data quality is the bottleneck," then fixing the data is the highest-ROI investment the team can make. Every future model benefits from the same investment.

### The escalation heterogeneity wall

We ran an escalation analysis across 21 data-rich clients to validate whether delinquency escalation patterns generalize across the platform. The pipeline worked — every client showed the effect (universal, zero exceptions). But cross-client comparison nearly derailed because of data heterogeneity:

- 76 unique activity types across clients, only 19 universal. The remaining 57 are client-specific or partially present.
- The same category ("negative event") means different things per client: PROMISE_BROKEN ranges from 17% to 83% of negative events depending on operational practices.
- Three clients had to be excluded entirely because their DQ recording was fundamentally different — one had a median DQ duration of zero days.

**What it cost:** Days of ad-hoc normalization. We manually classified all 76 activity types, designed a three-tier outcome hierarchy, and built client-specific exclusion rules — from scratch, undocumented before we did it, and likely to be repeated by whoever does the next cross-client analysis.

**What a proper foundation would have prevented:** A canonical activity classification table (maintained once) would have eliminated the normalization effort. A data quality scoring system would have flagged the anomalous clients before we wasted time including them. Documented column semantics would have made the pipeline trivial instead of exploratory.

### The ROI denominator trap

Mike asked for a simple number: "what percentage of DQs under 30 days cure without a phone call?" The raw answer: 91%. Impressive.

But 88% of those had no outbound contact at all — they self-cured before any collection action. The real automation story was in the 53% of *contacted* DQs that resolved through automated channels. Same data, two completely different narratives, depending on the denominator.

**Implication:** Without standardized metric definitions, documented baselines, and reproducible computation, every ad-hoc analysis risks producing numbers that are technically correct but practically misleading. The team has no shared conventions for how to compute, validate, and present analytical results. Each analyst invents their own approach each time.

### The André+Joane showcase: what becomes possible

In roughly one week of focused work, we produced:

- Full escalation analysis on one client (prod-31) — duration, outcomes, recurrence, volume
- Cross-client validation across 18 clients — with data quality checks, outcome normalization, and before/after robustness testing
- A parameterized pipeline runnable on any new client in under 3 seconds
- Deliverables: detailed report, executive report, 14-page presentation, data quality report, column metadata documentation
- A separate ROI/automated cure analysis, inherited mid-stream and delivered in the same sessions
- An escalation opportunity score ranking all clients by potential benefit

This throughput was possible because of two things: a properly configured AI-assisted analytics environment (Claude + Python + structured vault + MCP tooling), and direct access to organized data (parquet cubes in a structured data lake).

**What this demonstrates:** This level of productivity becomes *routine* — not exceptional — when the data layer is clean, accessible, and well-documented. Right now, the speed came from building infrastructure ad-hoc for one analysis. With a permanent shared foundation, any team member (or any AI-assisted workflow) could achieve similar throughput on any analytical question.

---

## Part III: The Diagnosis

The evidence above points to five structural issues. These aren't complaints — they're measurable friction that slows everything the team tries to do.

### Issue 1: Impractical data ecosystem

The development environment for analytical work is slow, fragile, and hostile to iteration.

**Symptoms:**
- Azure Synapse notebooks as the primary development surface — lacking code completion, debugging, version control, and basic IDE features. The analytical equivalent of punch cards.
- Rampant code duplication — each analyst reimplements data loading, filtering, and aggregation from scratch. The same boilerplate exists in dozens of notebooks with slight variations.
- No single source of truth — no canonical schema, no lineage, no agreed metric definitions. When two analysts compute the same number differently, there's no way to determine which is correct.
- Unnecessarily wide data — the raw model includes many irrelevant columns, wasting memory and processing time.
- IDE-unfriendly — data formats, access patterns, and auth make it difficult to work in VS Code, local Jupyter, or any modern environment.
- Research-to-production gap — moving from notebook to pipeline requires substantial rewriting.

**Cost:** Development that should take hours takes days. The team spends more time fighting tooling than doing analysis.

**Blocks:** Rapid prototyping, cross-client analyses, reproducible results, team collaboration.

### Issue 2: Poor data quality

Data quality issues are pervasive, unquantified, untracked, and addressed only when they visibly break something.

**Symptoms:**
- Missing values without documentation of what's expected vs absent
- Irregular data presence — columns existing for some clients but not others
- Varying onboarding dates making temporal comparisons unreliable
- Bulk data loads distorting date fields (clustering on load dates, not real dates)
- The LGBM grid search proved empirically: data quality is the binding constraint on model accuracy

**Cost:** Every analysis begins with an undocumented data quality investigation. Findings aren't recorded or shared. The next analyst repeats the same discovery. Models trained on uncontrolled data produce unreliable results.

**Blocks:** Trustworthy models, reliable cross-client comparisons, automated monitoring, any client-facing analytical product.

### Issue 3: Heterogeneous data across clients

Most data comes from client-controlled exports, not Akuvo's internal systems. The same tables and columns have different patterns, distributions, and semantic meaning across clients.

**Symptoms:**
- Activity type vocabularies differ (76 total, 19 universal)
- DQ recording practices vary (some record sub-day DQs as delinquency; others don't)
- Feature distributions shift across clients — models trained on aggregate data are dominated by high-volume clients
- Differences observed informally, by accident, never through deliberate analysis

**Cost:** Cross-client analytics require ad-hoc normalization every time. Aggregate models produce unbalanced results. Platform-level claims require heavy qualification.

**Blocks:** Multi-client models, platform-level features (like escalation alerts), benchmarking, and any "Akuvo customers see X" statement.

### Issue 4: No power-user data access

Stakeholders who want to explore data depend entirely on the team for manual exports.

**Symptoms:**
- Mike builds analytical React apps with Claude but relies on the team for every export
- Will understands "feature store" conceptually but can't interact with one
- IT-blocked Claude Desktop attempt shows appetite but no infrastructure

**Cost:** The team is a bottleneck for data access. Low-value extraction work displaces high-value analytical work.

**Blocks:** Stakeholder independence, rapid decision-making, team focus.

### Issue 5: Erratic development cycles

No structured process, no prioritization framework, no quality standards.

**Symptoms:**
- Leadership meetings with no agenda
- Modus operandi: work toward whatever feature is most appealing at the moment
- No task tracking, no formal controls, no shared documentation
- Deliverable quality varies

**Cost:** Scattered effort, duplicated work, lost knowledge. The team cannot demonstrate cumulative progress.

**Blocks:** Strategic capability accumulation, team coherence, demonstrable trajectory.

---

## Part IV: The Plan — Capability Building Components

Each component addresses one or more diagnosed issues. They're ordered by dependency.

### Component 1: Feature Store

**What:** Canonical, curated, cross-client data cubes — the single source of truth for all analytical work.

**Addresses:** Issues 1, 3, 4.

**Already exists (prototype):** The escalation cubes (`analytics/cubes/rich/`) — 5 tables for 21 Rich clients, parquet format. Built ad-hoc, proved their value immediately: data access went from hours to seconds.

**At maturity:**
- Documented schemas with column metadata
- Automated cube generation with versioning and lineage
- Coverage across all client quality tiers
- Standardized access pattern for downstream consumers

**Dependencies:** None — this is the foundation.
**Effort:** Medium. The pattern exists; needs formalization and extension.

### Component 2: Analytical Toolkit

**What:** Shared Python packages with common patterns — data loading, feature engineering, analysis patterns, reporting.

**Addresses:** Issues 1, 5.

**Already exists (prototype):** The escalation pipeline (`src/akuvo/analytics/pipelines/escalation/`) — parameterized analysis, CLI runner, metadata output, reproducible results. The activity classification table.

**At maturity:**
- `akuvo-analytics` package installable via pip
- Modules for: data access, feature engineering, A/B comparison, lift computation, chart generation, slide reports
- Deployable to Synapse as a wheel (path already established)

**Dependencies:** Feature Store.
**Effort:** Medium-high.

### Component 3: Data Quality Control System

**What:** Rules-based system to evaluate data quality, integrity, and normality. Tag, fix, discard, or dispatch data for review.

**Addresses:** Issues 2, 3.

**Already exists (prototype):** The cross-client data quality sanity check from escalation — manual, ad-hoc, but drove real decisions (3 client exclusions, DQ duration filter).

**At maturity:**
- Automated quality scoring per client per table
- Quality dashboard with trends
- Anomaly flagging (client 60 would have been caught pre-analysis)
- Rules-based remediation; could evolve into a learning system

**Dependencies:** Feature Store, Analytical Toolkit.
**Effort:** High — most complex component, most valuable.

### Component 4: Data Heterogeneity Analysis

**What:** Systematic, deliberate audit of cross-client data differences — distributions, missing patterns, feature correlations, coverage gaps.

**Addresses:** Issue 3 (client balancing problem).

**Already exists (prototype):** `cross-client-data-quality.md` — characterized 76 activity types, outcome composition, DQ distributions across 21 clients. Limited to escalation dimensions.

**At maturity:**
- Full audit of all major tables across all clients
- Quantified heterogeneity metrics per column per client
- Client clustering by data similarity
- Normalization strategy recommendations

**Output:** Informs a Data Balancing and Normalization System for cross-client models.

**Dependencies:** Feature Store, Analytical Toolkit.
**Effort:** Medium.

### Component 5: Analytical Applications Pipeline

**What:** Path from curated data to stakeholder-facing applications — self-service data access, React dashboards, client reports.

**Addresses:** Issue 4.

**Already exists (prototype):** The André+Joane workflow — Claude-assisted analytics producing React presentations and data exports. Mike builds React apps but can't access data independently.

**At maturity:**
- Curated data API or export layer for power users
- Templates for common applications
- Deployment path for client-facing apps
- Documentation for non-engineers

**Dependencies:** Feature Store, Data Quality Control.
**Effort:** Medium (technical path clear; governance is the hard part).

### Component 6: AI-Assisted Analytics Methodology

**What:** Documented, teachable approach to AI-assisted analytical workflows — how they operate, what they produce, how they integrate with team processes.

**Addresses:** Issue 5.

**Already exists:** Methodology core document (6 sections), 12 captured learnings, deliverable templates (detailed/executive reports, slide reports). Escalation work as primary demonstration.

**At maturity:**
- Teachable methodology for any team member
- Template library for deliverables
- Pattern library for common analytical questions
- Integration with toolkit and feature store

**Dependencies:** All other components (this is the "how to use everything" layer).
**Effort:** Low-medium.

---

## Part V: Phasing and Dependencies

```
Phase 1 — Foundation:     Feature Store → Analytical Toolkit
Phase 2 — Quality:        Data Quality Control → Heterogeneity Analysis
Phase 3 — Access:         Analytical Applications Pipeline
Continuous:               AI-Assisted Analytics Methodology
```

**Phase 1** is the prerequisite for everything and where the team sees the most immediate benefit — faster development, less duplication, reproducible results. The escalation pipeline proves the approach works.

**Phase 2** is where strategic value compounds. Clean, characterized data enables trustworthy models, cross-client features, and platform-level claims.

**Phase 3** is the stakeholder-visible payoff — power users access data independently, and the team focuses on high-value work.

---

## Part VI: The Rhetorical Challenge

*How to present this to stakeholders without triggering resistance.*

### The social dynamics

- The ML/Analytics team: 4 outsourced engineers from Janea, including André (3 months in). The team has an established technical leader (Guarda) with a practical/operational drive. Guarda has welcomed the capability building initiative.
- Akuvo leadership: CDO (commercial, feature-driven), VP (smart, tech-savvy, voices user needs). Will understands "feature store" and "data architecture." Mike builds React apps and understands data access pain firsthand.
- No formal process: no agenda, no task tracking, no strategy. Work follows whatever is appealing at the moment.

### Concerns to manage

- Being seen as abstract, arrogant, or overstepping
- Falling flat — presenting ideas that don't spin off concrete actions
- Being misunderstood — the audience conflating "data infrastructure" with "we need to rebuild everything before doing anything useful"

### Communication strategy

The essay is the source; stakeholder materials are compiled subsets.

**For Will/Mike (client-side stakeholders):**
- Use their language: "feature store," "data architecture," not "capability building"
- Lead with concrete evidence (the LGBM story, the escalation showcase) not theory
- Frame as enabling their goals: faster data access, better client-facing apps, trustworthy numbers

**For the team (Filip, Guarda, Federico):**
- Frame as reducing their pain: less boilerplate, faster iteration, reproducible results
- Position as non-mandatory — adopt what helps, ignore what doesn't
- Show, don't tell: the escalation pipeline is already a working example

**For leadership (CDO, VP):**
- Frame as competitive differentiation: data ecosystem as strategic moat against AI competitors
- Connect to The Big Problem: every component moves us closer to prescriptive intelligence
- Show ROI in team productivity: the André+Joane showcase demonstrates what's possible

### The bite-sized menu

Each item is a standalone 15-minute discussion or 1-page brief, compilable from this essay:

1. **The Big Problem** — what the platform is really optimizing; why data is the strategic asset
2. **Feature Store / Data Architecture** — what shared data assets are, what exists, what's needed
3. **Data Quality** — the LGBM story + escalation heterogeneity (concrete, visual, hard to argue with)
4. **The Analytics Showcase** — what one week of focused work with proper infrastructure produces
5. **Analytical Applications** — the path from data to client-facing React apps
6. **Cross-Client Intelligence** — what platform-level analytics enables for product and sales

---

## Appendix: Ideas and Drafts

*Raw thinking preserved for reference. Not integrated into the main narrative.*

### The Score Feature Package
What a fully-fledged Score deliverable could look like:
- A metric (or set thereof) available in the feature store and/or as a Playbook variable
- UI integration (or not)
- Formal technical documentation of concepts, formulas, and lineage
- Platform dashboard(s)
- One-time or regular reports (email), possibly to market its value
- Playbook recommendations or examples

### Embedded AI vs AI-friendly
The question isn't "how to embed our own AI into the platform" — that's a dead end, since any general-purpose AI can operate on well-structured data without custom embedding. The real question is: **how to make the platform AI-friendly** — clean data, open APIs, documented schemas, standardized exports. This is a more defensible and durable investment.

### Scores Ontology
See `0325 Random Notes, Attributes Ontology.md` — placeholder for future development.

### Analytics Workflow
See `0329 ML x Conventional Software workflows.md` — placeholder for future development.

---

*This document is maintained as the canonical reference for capability building strategy. Stakeholder-facing materials are compiled from it, never the reverse.*
