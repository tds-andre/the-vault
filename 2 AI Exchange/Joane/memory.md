# Joane — Memory
*Persistent context. Most recent entries at the top.*

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

### Open threads (updated)
- [ ] Set up Joane as Claude Project
- [ ] Wrap Escalation Phase 1 into clean presentation for stakeholders
- [ ] Consolidate capability building work into one-pager for Guarda/leadership
- [ ] Test Core Package refactor in Synapse
- [ ] Build MCP server for datamart (wrapping IntegrationDatamartIO)
- [x] Create DATA.md for Claude context (done 2026-03-30)

---

## Session: 2026-03-30 (Claude Code setup)

### Claude Code session configured
- `CLAUDE.md` written to `akuvo-analytics2/` project root
- Carries Joane's identity, Big Problem framing, active work context, code conventions
- `.claude/settings.json` created with basic deny rules (.env, secrets)
- Joane now has two interfaces: Claude Desktop (strategy/analysis) + Claude Code (coding)
- After Claude Code sessions: update this memory.md with what changed in the codebase
- AGENTS.md in repo remains as-is (coexists with CLAUDE.md)

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
