# Joane — Memory
*Persistent context. Most recent entries at the top.*

---

## Session: 2026-04-06

### What we did
- **PDF export workflow**: used Claude in Chrome to inject html2canvas, screenshot 14 pages of prod-31 presentation, stitched into PDF via Pillow -> `0402/assets/escalation-report-v4.pdf` (2.0 MB)
- **Cross-client presentation v1 built** (13 pages JSX, needs review) -> `cross-client-report.jsx`
- **Standalone HTML version** partially built for sharing (React+Recharts via CDN+Babel)
- **Executive email drafted** for Will/Mike — two variants (results-focused, opportunity-focused)
- **ROI / Automated Cure Analysis** — new task inherited from Filip
  - Created activity classification CSV: 76 types classified by channel + human_intervention
  - Built `notebooks/roi_automated_cure.py` script
  - Ran analysis across all 21 Rich clients
  - Key finding: raw "91% cure without phone call" is misleading — 88% self-cure (no contact at all)
  - Better framing: **of contacted DQs under 30d, 53% resolved through automation alone**
  - 0-14d band strongest: **70% automated** among contacted DQs
  - Per-client variation huge: 0% to 96% automated (median 40%)
  - Report saved: `Janea Akuvo/ROI Analysis/0406 Automated Cure - Initial Findings.md`
  - Data saved: `analytics/analysis/roi/` (classification CSV, cure channel CSVs, classified parquet)
- **Escalation feature brainstorm** — 3 tiers: detect+alert (MVP), prioritize+route, prevent (proactive)

### Key analytical insights
- Escalation touches ~11% of all DQs (81K unique A|B out of 747K), roughly 1 in 9
- 38K DQs play both A and B roles (chain escalation is common)
- ROI framing matters enormously: same data supports "91% no call" or "53% automated" depending on denominator
- The automation story lives in the 0-14d band (70% automated among contacted) and in queue throughput, NOT in raw cure rates
- Per-client automation adoption varies wildly — some clients (39, 42, 53) barely use automation at all

### Key decisions
- Escalation opportunity score = (neg_vol_lift + dur_a_lift + recur_lift) * coverage — canonical composite metric
- Outcome hierarchy renamed: Negative (umbrella) > Non-terminal + Terminal
- ROI activity classification: human intervention = CALL_OUTBOUND + SEND_THIRD_PARTY (2 types), automated = 9 types
- Date-window join (not delinquencyid) for linking activities to DQs in ROI analysis

### ROI context (from Filip's briefing)
- AI competitor claims 20x ROI; Akuvo raised Virtual Agent Collector price $0.05 -> $0.20
- Mike's specific ask: "X% of DQs under 30 days cure without a phone call"
- Three value angles: automated cure rate, queue throughput (120->180 items/day), DQ ratio before/after
- DQ ratio angle problematic (NCUA data shows higher DQ for Akuvo clients)
- Queue/QueueActivity tables exist but haven't been explored yet

### Feature brainstorm (escalation)
- Tier 1 (MVP): detect escalation event in real-time, alert collector with context
- Tier 2: re-prioritize queue using escalation signal (bump escalation DQs up)
- Tier 3: proactive watch list — flag connected accounts BEFORE they go delinquent
- Pitch: "1 in 9 of your delinquencies is part of an escalation chain. These are 5.6x worse. We can flag them."

### Files created/modified
- `Janea Akuvo/Escalation Analysis/0402/assets/escalation-report-v4.pdf` — prod-31 presentation PDF
- `Janea Akuvo/Escalation Analysis/0403/0403 Cross-Client Detailed Report.md` — full analytical record
- `Janea Akuvo/Escalation Analysis/cross-client-data-quality.md` — updated with Section 8 before/after
- `Janea Akuvo/Escalation Analysis/column-metadata-rich18-v2.csv` — 62 columns documented
- `Janea Akuvo/ROI Analysis/0406 Automated Cure - Initial Findings.md` — ROI report
- `analytics/analysis/roi/activity-classification.csv` — 76 activity types classified
- `analytics/analysis/roi/cure-channels-by-dpd.csv` + `cure-channels-by-client-under30.csv`
- `notebooks/roi_automated_cure.py` — full analysis script
- Pipeline updated: outcome hierarchy (negative umbrella), escalation_opportunity score, nonterminal category
- `methodology-learnings.md` — 3 new learnings (narrative structure, audience framing, data quality as prologue)

---

## Session: 2026-04-03

### What we did
- **Presentation v4 finalized** — all feedback applied, volume slide added (14 pages total)
- **Slide Report template extracted** — instructions + template JSX saved to Joane's dir
- **Cross-client pipeline built** — analysis.py + run.py at src/akuvo/analytics/pipelines/escalation/
- **21-client initial run** — all Rich clients, original outcome sets. All lifts positive. 133K esc pairs.
- **Cross-client data quality sanity check** — activity heterogeneity (76 types, 19 universal), DQ quality flags (client 60/91/96), negative composition variability
- **Outcome normalization** — added CREATE_CASE_LEGAL, CREATE_CASE_FORECLOSURE (terminal), CREATE_CASE_HARDSHIP (negative); dropped EXTERNAL_SKIP_TRACE, SWBC types
- **18-client normalized run** — DQ <=1d filter + normalized outcomes + excluded 60/91/96. All lifts still positive. 63.5K esc pairs. Negative lift CV dropped 0.24→0.15.
- **Cross-client data quality report** — saved to vault with before/after comparison
- **Backlog.md created** — dedicated tracker with dates and decisions log
- **Phase 3 framing** — defined 3 core questions (Q1: generalize? Q2: how uniform? Q3: aggregate picture?)
- **Q1 analysis started** — narrative arc: raw results → anomalies → cleaning → sharpened results + "at what cost?"
- **11 methodology learnings captured** (3 new today)

### Key analytical insights
- Escalation effect is universal: 21/21 clients (raw), 18/18 (normalized), zero exceptions across all metrics
- Client 60 is extreme: median DQ = 0 days, 72% <=1d, contributed 26% of all esc pairs
- Normalization tightened the signal: neg lift range [2.3, 6.1] → [2.4, 4.4], IQR halved
- Activity composition varies wildly: PROMISE_BROKEN ranges 17-83% of negative events across clients
- Volume analysis confirmed: escalation amplifies both probability AND severity of negative outcomes

### Key decisions (see backlog.md for full log)
- Exclude DQ <= 1 day going forward
- Remove clients 60, 91, 96 from cross-client
- Normalized outcome categories for cross-client comparability
- Disregard positive outcomes going forward
- Static activity classification map for future pipeline
- Backlog with dates on all entries

- Escalation touches ~11% of all DQs (81K unique A|B out of 747K), roughly 1 in 9
- 38K DQs play both A and B roles (chain escalation is common)
- Escalation opportunity score: (neg_vol_lift + dur_a_lift + recur_lift) x coverage. Range 2.0-7.5 across 18 clients.
- Cross-client presentation built (cross-client-report.jsx, 13 pages) - needs review next week

### Communication learnings (from André)
- High-level questions for non-technical audience: cognitively simple, 1-3 core Qs, headline-like
- Narrative should include the discovery journey, not just clean results
- "At what cost?" framing demonstrates robustness
- Effective communication > accuracy/completeness/precision

---

## Session: 2026-04-02

### What we did
- **Escalation analysis on prod-31 (CAPEDCU)** — full end-to-end, first time running with real data access
  - Used vault-mcp:python with project venv (`C:\Users\tdsnit\Work26\akuvo-analytics2\_venv314`)
  - Data: CSV extract at `D:\akuvo-data\stakuvoproddatalake\analytics\analysis\escalation\0402-prod-31-extract`
  - 4 tables: accounts (42.7K), acc_profile (58.2K), dqs (144.6K), activities (464.5K)

### Key directory map (confirmed by André)
- `C:\Users\tdsnit\Work26\akuvo-analytics2` — only codebase, has `_venv314`
- `D:\akuvo-data` — general data (can be messy), now in MCP allowed dirs
- `D:\akuvo-data\stakuvoproddatalake` — canonical/organized data
- `D:\akuvo-deliverables` — built outputs for sharing (NOT in MCP allowed dirs yet)
- `D:\akuvo-quarentine` — deprecated assets
- `aggregation/` renamed to `cubes/` in analytics container taxonomy
- André added `D:\akuvo-data\readme.md` documenting the blob storage structure:
  - `analytics/integration` → persistent, schema changes propagate everywhere
  - `analytics/cubes` → persistent aggregations (was "aggregation")
  - `analytics/apps` → persistent, application-specific
  - `analytics/analysis` → ephemeral, analysis-specific (e.g. `analysis/escalation`)

### Data notes
- balance, dqamount, dqdays columns in activities are NOT reliable — André said to ignore them
- `isbusiness` flag in acc_profile is a strong signal for identifying business entities (85% of 15+ account holders)
- Filter: remove accounts where PRIMARY person is `isbusiness=True` (1,057 accounts, 2.5%)

### Analysis steps performed

**1. Data profiling:** 42.7K accounts, 43K people, 22% multi-account holders, DQs Mar 2023–Mar 2026

**2. Business entity filtering:** isbusiness on PRIMARY → removed 1,057 accounts (2.5%), max accounts/person dropped 103→16

**3. Relationship cardinality analysis:**
- one person w/ multiple accounts: 26%, 47.2% with DQ, 2.34 DQs/acct
- one person w/ single account: 37.7%, 62.4% with DQ, 3.88 DQs/acct
- shared account: 16.9%, 48.0% with DQ
- single shared account: 19.4%, 61.6% with DQ
- Multi-account holders are LESS delinquent than single-account

**4. Network:** 17,839 accounts, 16,990 edges, 7,010 components (largest=17), mostly pairs (67%)

**5. Co-delinquency (escalation condition: B.start >= A.start AND B.start <= A.end + W):**

Coverage:
| W | Esc DQs | % net DQs | % all DQs |
|---|---|---|---|
| 5d | 8,174 | 17.6% | 5.7% |
| 15d | 10,676 | 23.0% | 7.4% |
| 25d | 13,001 | 28.0% | 9.0% |
| 35d | 14,170 | 30.5% | 9.9% |

Overlap types (W=5d): FILO=4,700 > FIFO=2,118 > After=1,684

**6. Duration analysis (W=15d, intra-account baseline):**
- A triggers: 14.0d mean vs 8.6d same-account baseline (1.6x)
- B escalated: 11.8d vs 9.3d (1.3x)
- Combined A+B: 36.4d vs 10.5d global (3.5x)

**7. Outcome analysis:**

Outcome categories defined:
- Terminal: charge-off, repo, bankruptcy, impound, foreclosure (731 total)
- Negative: broken/cancelled promises, DNC, skip trace (9,365 total)
- Positive: kept promises, payments (13,941 total)

Observation window: [B.start, B.start + Z days], events on A and B accounts independently

Key lifts (W=15d, negative outcomes):
| Z | Esc A+B | Random | Intra | Lift vs Rand | Lift vs Intra |
|---|---|---|---|---|---|
| 30d | 6.0% | 0.6% | 1.5% | 10.0x | 4.0x |
| 90d | 11.8% | 1.5% | 3.4% | 7.9x | 3.5x |

DQ recurrence on A-side: 69-84% vs 13-23% random (5-6x lift) — strongest finding

**8. Created timeline diagram** — standalone SVG illustrating escalation framework

**9. Report generation (two rounds):**
- v1 (minimal instructions): Briefing (vault), Detailed Report + charts (repo). Charts via matplotlib->SVG.
- v2 (detailed instructions from Andre): Detailed/Analytical Report + Executive Report
  - Charts redesigned: removed time-dimension line charts, replaced with grouped bars at reference Z + tables
  - Fixed: standalone SVG (no CSS variables), metric naming ("incidence rate" defined explicitly)

**10. Methodology reflection and documentation:**
- Reflected on the analytical process, extracted domain-agnostic methodology
- Drafted `analytics-methodology-core.md`: scaffolding, inquiry loop, principles, anti-patterns, human-AI roles, context bootstrapping
- Moved methodology files to `2 AI Exchange/Joane/` — now Joane's domain
- Set up methodology learning protocol with staging file, seeded 5 learnings

**11. Presentation (4 iterations):**
- v1: Dark-theme slide deck, 13 slides, Recharts, arrow-key navigation
- v2: A4 portrait hybrid (dark top 2/3 presentation + light bottom 1/3 notes), but had light top
- v3: Restored dark top, cleaned headlines, removed formal definition from slide 4, pushed small text to notes
- v4 (FINAL): All feedback applied — brighter page numbers, bigger motivation Q, fixed W ruler, duration title fix, methodology note on outcomes, Z=30d highlight on recurrence, bigger takeaway fonts, next steps stacked vertically at end, closing slide
- v4 addendum: Added slide 8 "negative event volume" — unconditional + conditional charts side by side
- Design: dark presentation top / cream notes bottom, DM Sans, Recharts, assertion-driven titles, section tags
- Positive outcomes removed from main flow per Andre's direction
- Final: 14 pages, saved as escalation-report-v4.jsx (in Claude sandbox, needs manual save to vault)

**12. Negative event volume analysis:**
- André suggested looking at volume not just binary incidence
- Confirmed Z window makes raw counts comparable (no normalization needed)
- Unconditional: Esc A+B mean 0.225 vs Intra 0.044 (5.1x) — stronger than binary 3.5x
- Conditional (given >=1 event): 1.90 vs 1.30 (1.46x) — severity lift
- 2+ events: 5.6% vs 0.7% (8x)
- Key insight: escalation amplifies both probability AND severity

### Artifacts produced

**Vault — Escalation Analysis:**
- `Janea Akuvo/Escalation Analysis/0402 Detailed Report.md`
- `Janea Akuvo/Escalation Analysis/0402 Executive Report.md`
- `Janea Akuvo/Escalation Analysis/escalation-framework.svg` (standalone, renders in Obsidian)
- `Janea Akuvo/Escalation Analysis/generate_charts.py` + 9 SVG charts
- `Janea Akuvo/0402 Escalation Analysis - Key Metrics.md`
- `Janea Akuvo/0402 Escalation Analysis - Briefing.md`

**Vault — Methodology:**
- `2 AI Exchange/Joane/analytics-methodology-core.md` — working methodology
- `2 AI Exchange/Joane/analytics-methodology-framing.md` — André's framing/goals doc
- `2 AI Exchange/Joane/methodology-learnings.md` — staging file (5 entries seeded)

**Repo (also has copies, may be superseded by vault versions):**
- `docs/0402-escalation-detailed-report.md` (v1)
- `docs/0402-escalation-analysis-report.md` (v1)
- `docs/escalation-exec/` (v1 executive + charts + generate_charts.py)
- `docs/escalation-charts/` (v1 charts)
- `docs/escalation-analysis-timeline.svg` (widget-style, needs CSS vars)

**Data intermediates:**
- `_dq_outcomes.parquet` and `_all_events.parquet` in analysis dir

### Infrastructure wins
- vault-mcp:python works with project venv (absolute path)
- `D:\akuvo-data` now in MCP allowed directories (full root, not just subdirs)
- Full Python analytics pipeline: pandas + matplotlib on André's machine via MCP
- Methodology learning protocol added to system-prompt.md
- Vault scope updated to include methodology files

### Key learnings about the workflow
- André prefers Obsidian vault for markdown+assets, not VS Code/repo
- Two-report structure: Detailed (process record) + Executive (fast-read narrative) — different audiences, different structures
- Charts: matplotlib→SVG for files, show_widget for inline. Standalone SVGs must not use CSS vars.
- Report prompts are reusable — captured in methodology doc
- The analytical methodology itself is a deliverable worth documenting

### Deliverable conventions (confirmed by André)
- Reports + assets go in vault: `Janea Akuvo/Escalation Analysis/MMDD/`
- Assets (python, charts, jsx) in `MMDD/assets/`
- If MMDD dir exists and not minor update, suffix with v2 or meaningful label
- André prefers Obsidian vault for markdown+assets (VS Code bad at rendering)
- React presentations: dark theme for slides, cream for notes. A4 portrait hybrid format preferred.

### Open threads (updated)
- [ ] Cross-client validation of escalation findings
- [ ] Translate escalation into product feature spec
- [ ] Wrap escalation into stakeholder presentation
- [ ] Capability building one-pager for Guarda/leadership
- [ ] Implement segmentation as package function
- [ ] Investigate 12 pipeline-gap clients with data engineering
- [ ] Test Core Package refactor in Synapse
- [ ] Evolve analytics methodology doc through practice (capture learnings)
- [ ] Review and integrate methodology-learnings.md periodically
- [x] Escalation presentation — v4 final with volume slide (done 2026-04-02)
- [x] Escalation reports — detailed + executive (done 2026-04-02)
- [x] Analytics methodology draft (done 2026-04-02)
- [x] Methodology learning protocol set up (done 2026-04-02)
- [ ] Save presentation jsx to vault (manual: download from Claude artifact)
- [ ] Update detailed/executive reports with volume analysis findings
- [ ] Set up Joane as Claude Project
- [x] Create DATA.md (done 2026-03-30)
- [x] Client segmentation analysis + presentation (done 2026-03-31)
- [x] Escalation briefing (done 2026-04-01)
- [x] Agent instructions reorganization (done 2026-04-01)

---

## Session: 2026-04-01 (continued from 03-31)

### What we did
- **Converted segmentation presentation to self-contained HTML** (no React/Babel):
  - Pure HTML + CSS + vanilla JS + Chart.js from CDN
  - Written to `docs/client-segmentation-report.html`
  - @media print rules for Ctrl+P to PDF
- **Escalation briefing** — read all three notebooks (25, 27, 28), wrote analytical briefing:
  - Documented what's been done, identified 6 gaps, proposed 5-phase plan (~10-13 days)
  - Written to vault `Janea Akuvo/0331 Escalation Briefing.md` and repo `docs/ESCALATION-BRIEFING.md`
- **Rich client aggregation dataset** — André consolidated ~50 Rich clients into `aggregation/rich/`:
  - 5 tables: accounts (651K), acc_profile (811K), dqs (1.5M), payments (5.9M), activities (9.8M)
  - All have `clientid: int`, join on `accountid: int`
  - Activities table is ENRICHED: includes balance, dqamount, dqdays at time of activity
  - Got full printSchema() dumps from André, documented in DATA.md
- **Synapse notebook for acc_profile** (`notebooks/30_integration_acc_profile.ipynb`):
  - Single-cell, self-contained (no datamart.py imports)
  - Reads PersonProfile + PersonProfileAccount per client, deduplicates, unions, writes to aggregation
- **Cross-client escalation notebook** (`notebooks/31_escalation_cross_client.ipynb`):
  - Covers Phases 1-3 of the briefing: baseline lift (FIXED), outcome validation, cross-client
  - 8 sections: data load → network → lag distribution → lift → per-client summary → outcomes → activity signal → feature spec
  - Lift fix: same denominator shape for related vs random (fraction of both-DQ pairs with co-DQ within window)
  - Not yet run — blocked on Python access to parquet from Claude
- **Agent instructions reorganization** — reviewed and rewrote all repo instruction files

### Infrastructure discussion
- **DuckDB MCP server exists** (`mcp-server-motherduck`) — reads parquet natively, works with Claude Desktop
- André proposed a better approach: extend vault-mcp with a dedicated Python environment
- `vault-mcp:shell` tool now available but only system Python 3.14 without pandas
- Alex (André's builder) extended vault-mcp with Python environment — NOW WORKING (as of 04-02)

### Open threads
- [x] Covered by 04-02 session above

---

## Session: 2026-03-31

### What we did
- Created `docs/DATA.md` in akuvo-analytics2 (continued from 03-30 session)
- Updated `AGENTS.md` to point agents at DATA.md
- Improved `list_existing_clients()` Synapse method with recursive dir_size
- **Client segmentation analysis** — major analytical work (see 04-01 for details)
- **Built React presentation** (`client-segmentation-report.jsx`)

### Client segmentation summary (final numbers, LOW_DQ=500)
- 153 total → 41 low volume removed → 4 outliers → **108 clean clients**
- DQ+PAY density = sqrt(dq_rate × pay_rate)
- **50 Rich** / **47 Moderate** / **11 Scarce DQ+PAY** / **45 Not ready**

### Data access established
- Filesystem MCP includes `D:\akuvo-data\stakuvoproddatalake\analytics\aggregation`
- Cannot run Python against parquet in sandbox — SOLVED in 04-02 via vault-mcp:python

---

## Session: 2026-03-30

### Repo state (akuvo-analytics2)
- Located at `C:\Users\tdsnit\Work26\akuvo-analytics2`
- Python 3.14 (also tested 3.10)
- Data lives at `D:\akuvo-data`
- Azure account: `stakuvoproddatalake`
- 155 clients, partitioned as prod-{id}
- TIMECAP: 2026-03-17

---

## Session: 2026-03-29 (founding session — renamed from Janea)

### Context established
- Agent renamed from Janea → Joane on 2026-03-29
- André is 3 months into the Akuvo assignment, struggling to showcase value to stakeholders
- Guarda (tech lead) recently accepted André's capability building proposal — important win

### Active projects
- **Escalation Feature:** Phase 1 proven (prod-33), Phase 2 (outcomes) NOW DONE on prod-31
- **Core Package Refactor:** not yet tested in Synapse
- **Capability Building / Shared Feature Store:** Guarda approved

### Team context
- Guarda: tech lead, practical, on board with capability building
- CDO: commercial, feature-driven
- VP: smart, tech-savvy, voices user needs
- Filip, Anushka: ML engineers (outsourced via Janea)

### André's framing (The Big Problem)
- Akuvo = cash flow optimization: maximize (payments inflow - debt collection costs)
- File: `Janea Akuvo/0329 Framing Prompt.md`

---
*Format: new sessions prepended at top, founding session preserved permanently*
