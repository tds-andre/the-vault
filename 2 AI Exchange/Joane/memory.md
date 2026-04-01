# Joane — Memory
*Persistent context. Most recent entries at the top.*

---

## Session: 2026-03-31

### What we did
- Created `docs/DATA.md` in akuvo-analytics2 (continued from 03-30 session)
- Updated `AGENTS.md` to point agents at DATA.md
- Improved `list_existing_clients()` Synapse method with recursive dir_size
- **Client segmentation analysis** — major analytical work:
  - Analyzed `client-stats.csv` (153 clients × 4 metrics: accounts, activities, dqs, payments)
  - Applied volume thresholds: accounts ≥ 3K, activities ≥ 2K, DQ ≥ 500, payments ≥ 3K → 41 removed
  - Removed 4 ratio outliers (dq_rate > 5, pay_rate > 20, act_rate > 60) → **108 clean clients**
  - Found dq_rate and pay_rate are 0.80 correlated → collapsed into single DQ+PAY density axis
  - Discovered act_rate is independent (0.05 correlation)
  - Proved scarce DQ+PAY data is **pipeline coverage issue**, not onboarding timing (148× act-to-txn ratio for scarce vs 1.5× for rich)
  - 12 pipeline-gap clients identified (large accounts+activities, near-zero DQ/payments)
  - Proposed 4-tier segmentation: Rich (50) / Moderate (47) / Scarce DQ+PAY (11) / Not ready (45)
  - Wrote up as `Janea Akuvo/0331 Client Segmentation Analysis.md`
- **Built React presentation** (`client-segmentation-report.jsx`):
  - 11 slides, Akuvo branding, assertion-driven titles
  - Icons for data types: ⚠️ DQ (amber), 💲 payments (green), 📞 activities (violet), 💼 accounts (navy)
  - Color carries meaning, minimal cards, variable-height slides
  - Terminology: "Sparse" renamed to "Scarce DQ+PAY" for narrative clarity
  - tx_density references replaced with DQ+PAY density / icons throughout

### Client segmentation summary (final numbers, LOW_DQ=500)
- 153 total → 41 low volume removed → 4 outliers → **108 clean clients**
- DQ+PAY density = sqrt(dq_rate × pay_rate)
- **50 Rich** (DQ+PAY ≥ 1.5): best for escalation, skews small (35 of 45 small clients)
- **47 Moderate** (0.1–1.5): decent depth, skews large (20 of 28 large clients)
- **11 Scarce DQ+PAY** (< 0.1): pipeline coverage gap
- Rich + large is rare: only MACU, UNIFY, CUTX
- 12 pipeline-gap clients: large institutions with normal activity but missing DQ/payment pipelines
- dq×pay correlation: 0.80 | act×DQ+PAY correlation: 0.05

### Data access established
- Filesystem MCP includes `D:\akuvo-data\stakuvoproddatalake\analytics\integration`
- Only prod-33 (COMFIRSTCU) present — Synapse-processed download
- Table names differ: `dqs.parquet` vs `dq_episodes`, `activities.parquet` vs `activity`
- Cannot run Python against data in sandbox (no pyarrow, no network)

### Open threads
- [ ] Set up Joane as Claude Project
- [ ] Wrap Escalation Phase 1 into clean presentation for stakeholders
- [ ] Consolidate capability building work into one-pager for Guarda/leadership
- [ ] Test Core Package refactor in Synapse
- [ ] Build MCP server for datamart (wrapping IntegrationDatamartIO)
- [ ] Implement segmentation as package function + update DATA.md
- [ ] Investigate 12 pipeline-gap clients with data engineering
- [x] Create DATA.md for Claude context (done 2026-03-30)
- [x] Client segmentation analysis (done 2026-03-31)
- [x] Client segmentation presentation (done 2026-03-31)

---

## Session: 2026-03-30

### What we did
- Created `docs/DATA.md` in akuvo-analytics2 — comprehensive data reference for the integration datamart
  - Documents all 5 datamart tables: loan_acc, acc_profile, dq_episodes, payments, activity
  - Includes schemas, relationships, pre-applied filters, known quirks, utility functions
  - Also covers timeseries tables and processing conventions
- Updated `AGENTS.md` to point Claude agents at DATA.md before analytical work
- Discussed strategy for giving Claude better data context: markdown reference (done) vs MCP tooling (future)

### Key insight
- André's `todos.md` already had "provide mcp for datamart" — the foundation for an MCP server exists in `IntegrationDatamartIO` (read_client_table, list_data)
- Next step after DATA.md: build a thin MCP server wrapping the datamart IO for live data exploration in Claude Code / Claude Desktop

### Repo state (akuvo-analytics2)
- Located at `C:\Users\tdsnit\Work26\akuvo-analytics2`
- Python 3.14 (also tested 3.10)
- Data lives at `D:\akuvo-data\integration`
- Azure account: `stakuvoproddatalake`
- 155 clients, partitioned as prod-{id}
- TIMECAP: 2026-03-17
- Notebook 27_escalation.ipynb: DNCU (client 34) — 79K accounts, 83K profiles, 41K DQ episodes, 1.2M activity

---

## Session: 2026-03-29 (founding session — renamed from Janea)

### Context established
- Agent renamed from Janea → Joane on 2026-03-29
- André is 3 months into the Akuvo assignment, struggling to showcase value to stakeholders
- Guarda (tech lead) recently accepted André's capability building proposal — important win

### Active projects

**Escalation Feature:**
- Phase 1 proven (COMFIRSTCU, prod-33, data to Feb 2026)
- Key numbers: 37,337 accounts / 37,174 people; 37% escalation potential; 33% multi-account holders DQ in 2+; 1.3x multiplier; shared accounts 30% more DQ episodes
- Phase 2 missing: outcome analysis (charge-offs, repossessions, timing)

**Core Package Refactor:**
- Refactored but not yet tested in Synapse or locally

**Capability Building / Shared Feature Store:**
- Guarda approved — André to spearhead
- Work scattered, needs consolidating into a coherent proposal
- Main strategic vehicle for showcasing value

**Inter-client Activity Correlation:**
- Desirable, not critical yet

### Team context
- Guarda: tech lead, practical, now on board with capability building
- CDO: commercial, feature-driven
- VP: smart, tech-savvy, voices user needs
- Filip: ML engineer (code reviewed Feb 2026)
- Anushka: ML engineer (model reviewed Jan 2026)

### André's framing (The Big Problem)
- Akuvo = cash flow optimization: maximize (payments inflow - debt collection costs)
- Perfect prescriptive model: which actions, against which accounts, when
- File: `Janea Akuvo/0329 Framing Prompt.md`

---
*Format: new sessions prepended at top, founding session preserved permanently*
