---
type: registry
env: independent
---

# functions.md — Complete Functions Index

Canonical and complete. Every function in the system.

## Shared (`2 Agents/functions/`)

| Name | Awareness | Body | Description |
|---|---|---|---|
| `spawn` | MA all | `functions/spawn.md` | Spawn narrow or servitor |
| `note-authoring` | MA all | `functions/note-authoring.md` | Author/edit notes |
| `housekeeping` | MA all | `functions/housekeeping.md` | Maintenance routines |
| `healthcheck` | F | `functions/healthcheck.md` | System drift check |
| `weekly-review` | F | `functions/weekly-review.md` | OFP weekly review |
| `agent-init` | F | `functions/agent-init.md` | Bootstrap a Primarch from `template/` |

## Agent-specific

| Name | Owner | Awareness | Body | Description |
|---|---|---|---|---|
| `thread-review` | Gaia | MA Gaia | `Gaia/functions/thread-review.md` | Walk the thread set, validate state, act on drift |
| `mcp-deploy-pipeline` | Alex | MA Alex | `Alex/functions/mcp-deploy-pipeline.md` | Ship a change to an MCP server end-to-end (cache-bust, config edit, backup, verify) |
| `three-way-workflow` | Kaybe | MA Kaybe | `Kaybe/functions/three-way-workflow.md` | Bootstrap + operate the Three-Way Workflow for a repo with a Builder counterpart |
| `analysis-wrap-up` | Joane | MA Joane | `Joane/functions/analysis-wrap-up.md` | Turn a completed analysis into stakeholder-ready deliverables |
| `akuvo-meeting-prep` | Joane | MA Joane | `Joane/functions/akuvo-meeting-prep.md` | Prep for an Akuvo stakeholder meeting — talking points, anticipated pushback, audience-specific framings |
| `weekly-ops-review` | Cocorita | MA Cocorita | `Cocorita/functions/weekly-ops-review.md` | Cocoricó weekly operational review |
| `pnl-build` | Ben | MA Ben | `Ben/functions/pnl-build.md` | Construct Cocoricó P&L from category-by-category data |

---

## Rules

- Skill (agent- and ecosystem-agnostic) is not a function.
- Index here; body in dedicated file.
- MA grants awareness, not authorization.
- When you add or move a function, update this file in the same operation.
