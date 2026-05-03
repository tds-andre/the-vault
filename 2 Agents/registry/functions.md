---
type: registry
env: independent
---

# functions.md — Complete Functions Index

On-demand registry file. **Canonical and complete** — every function in the AAE, shared and agent-specific. Each Primarch's `[agent].md` re-surfaces a relevant subset for top-of-mind awareness; this file is the source of truth.

A **function** is a procedure that only makes sense for a particular agent or within the AAE. Skills (provider-shipped, agent- and ecosystem-agnostic) are not functions and are not tracked here. Bodies live in dedicated files; functions are read on demand when invoked.

**Awareness.** MA = mandatory awareness (summary inlined in `[agent].md` + reference). F = findable (reachable via this index). Awareness can vary per agent: a function may be MA for one Primarch and F for others.

**Authorization is separate from awareness.** MA grants context, not permission. Whether an agent may invoke a function is governed by the function itself (e.g., spawn ownership rule), mode rules (narrows don't spawn by default), and permission profiles.

---

## Shared (`2 Agents/functions/`)

| Name | Awareness | Body | Description |
|---|---|---|---|
| `spawn` | MA all | `functions/spawn.md` | Spawn a narrow or servitor; ownership rule, three variants (inline / file / MCP), permission profiles |
| `note-authoring` | MA all | `functions/note-authoring.md` | Author or edit notes; frontmatter, naming, conventions; strong default-fire posture |
| `housekeeping` | MA all | `functions/housekeeping.md` | Maintenance routines: compact sessions, prune state, refresh History So Far, registry sweep, inbox sweep. Manually triggered in v3.0. |
| `agent-init` | MA Gaia / F others | `functions/agent-init.md` | Bootstrap a new Primarch from `template/` |
| `weekly-review` | MA Gaia / F others | `functions/weekly-review.md` | Sunday/Monday OFP weekly review process |

## Agent-specific (`2 Agents/[Primarch]/functions/`)

| Name | Owner | Awareness | Body | Description |
|---|---|---|---|---|
| `thread-review` | Gaia | MA Gaia | `Gaia/functions/thread-review.md` | Walk the thread set, validate state, act on drift |
| `mcp-deploy-pipeline` | Alex | MA Alex | `Alex/functions/mcp-deploy-pipeline.md` | Ship an MCP-server change end-to-end: cache-bust, config edit, backup, verify |
| `three-way-workflow` | Kaybe | MA Kaybe | `Kaybe/functions/three-way-workflow.md` | Bootstrap and operate the Three-Way Workflow for a repo with a Builder counterpart |
| `analysis-wrap-up` | Joane | MA Joane | `Joane/functions/analysis-wrap-up.md` | Turn a completed analysis into stakeholder-ready deliverables |
| `akuvo-meeting-prep` | Joane | MA Joane | `Joane/functions/akuvo-meeting-prep.md` | Prep for an Akuvo stakeholder meeting — talking points, anticipated pushback, audience-specific framings |
| `weekly-ops-review` | Cocorita | MA Cocorita | `Cocorita/functions/weekly-ops-review.md` | Cocoricó weekly operational review |
| `pnl-build` | Ben | MA Ben | `Ben/functions/pnl-build.md` | Construct Cocoricó P&L from category-by-category data |

---

## Rules

- **Skill ≠ function.** A skill is agent- and ecosystem-agnostic (provider-shipped). A function only makes sense for a particular agent or within the AAE.
- **Index here; body in dedicated file.** Functions can be arbitrarily long; this index keeps them findable without inflating context.
- **MA grants awareness, not authorization.** See above.
- **Maintenance.** When a function is added, renamed, moved, or removed, update this file in the same operation. Update the relevant `[agent].md` and any other surfacing files. Don't defer.
