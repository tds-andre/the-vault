---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: registry-agent
env: independent
updated_by: ''
updated_on: ''
---

# joane.md — Per-Agent Registry Anchor (Joane)

Loaded at boot (ML).

## My functions (MA)

| Function | Body | Description |
|---|---|---|
| `spawn` | `2 Agents/functions/spawn.md` | Spawn narrows or servitors |
| `note-authoring` | `2 Agents/functions/note-authoring.md` | Author/edit notes |
| `housekeeping` | `2 Agents/functions/housekeeping.md` | Maintenance routines |
| `analysis-wrap-up` | `2 Agents/Joane/functions/analysis-wrap-up.md` | Turn a completed analysis into stakeholder-ready deliverables (slide report / executive markdown / one-pager / email) under `Janea Akuvo/[Analysis Name]/MMDD/` |
| `akuvo-meeting-prep` | `2 Agents/Joane/functions/akuvo-meeting-prep.md` | Prep for an Akuvo stakeholder meeting — talking points, anticipated pushback, prep tasks, audience-specific framings |

## My notes

| Note | Purpose |
|---|---|
| `notes/learnings.md` | Short distilled cross-cutting learnings (working with André, working with Akuvo stakeholders, operating in two interfaces) |
| `notes/analytics-methodology-core.md` | Socratic Analytics — scaffolding + inquiry loop + principles + anti-patterns. Evergreen reference. |
| `notes/analytics-methodology-framing.md` | André's framing & aspirational goals for the methodology. Evergreen reference. |
| `notes/methodology-learnings.md` | Staging file for analytical-methodology refinements; periodically integrated into the core doc |
| `notes/slide-report-instructions.md` | Slide Report format spec (dark top / cream notes A4 portrait, DM Sans, Recharts) |
| `notes/migration-notes.md` | Issues & decisions from v2→v3 migration |

## My paths

| What | Path |
|---|---|
| Akuvo work notes | `Janea Akuvo/` |
| Escalation analysis | `Janea Akuvo/Escalation Analysis/` |
| ROI analysis | `Janea Akuvo/ROI Analysis/` |
| Capability building integrated essay | `Janea Akuvo/0407 Capability Building - Integrated Essay.md` |
| `akuvo-analytics2` repo (Claude Code interface) | `C:\Users\tdsnit\Work26\akuvo-analytics2\` |
| Project venv | `C:\Users\tdsnit\Work26\akuvo-analytics2\_venv314` |
| Escalation pipeline core | `C:\Users\tdsnit\Work26\akuvo-analytics2\src\akuvo\analytics\pipelines\escalation\analysis.py` |
| Escalation pipeline runner | `C:\Users\tdsnit\Work26\akuvo-analytics2\src\akuvo\analytics\pipelines\escalation\run.py` |
| ROI script | `C:\Users\tdsnit\Work26\akuvo-analytics2\notebooks\roi_automated_cure.py` |
| Akuvo data lake | `D:\akuvo-data\stakuvoproddatalake\` |
| Rich client cubes | `D:\akuvo-data\stakuvoproddatalake\analytics\cubes\rich\` |
| Cross-client escalation outputs | `D:\akuvo-data\stakuvoproddatalake\analytics\analysis\escalation\cross-client\` |
| ROI analysis outputs | `D:\akuvo-data\stakuvoproddatalake\analytics\analysis\roi\` |
| Slide report template (legacy v2 location) | `2 AI Exchange/Joane/slide-report-template.jsx` |

## My tools

*Inherits shared MCP tooling (see `registry/tools.md`). No agent-specific tools.*

Note: I run in two interfaces — Claude (vault, this profile) and Claude Code inside the `akuvo-analytics2` repo. Same agent, two surfaces. `CLAUDE.md` at project root loads vault context.
