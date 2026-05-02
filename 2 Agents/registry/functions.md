---
type: registry
env: independent
---

# functions.md — Complete Functions Index

On-demand registry. **Canonical and complete.** Every function in the system — shared and agent-specific — is listed here.

`metaindex.md` and each `[agent].md` may surface a subset for top-of-mind awareness; this file is the source of truth.

---

## Shared functions (`2 Agents/functions/`)

| Name | Owner | Awareness | Body | Description |
|---|---|---|---|---|
| `spawn` | shared | MA all agents | `functions/spawn.md` | Spawn a narrow or servitor; every spawn has an owner |
| `note-authoring` | shared | MA all agents | `functions/note-authoring.md` | Author or edit any note; strong default-fire |
| `housekeeping` | shared | MA all agents | `functions/housekeeping.md` | Maintenance routines (state pruning, sessions compaction, History So Far refresh, registry checks) |
| `healthcheck` | shared | F | `functions/healthcheck.md` | Drift / system check; typically run as a doctor servitor |
| `weekly-review` | shared | MA Gaia / F others | `functions/weekly-review.md` | OFP weekly review (Gaia-driven) |
| `agent-init` | shared | MA Gaia / F others | `functions/agent-init.md` | Bootstrap a new Primarch from `2 Agents/template/` |

## Agent-specific functions

| Name | Owner | Awareness | Body | Description |
|---|---|---|---|---|
| `thread-review` | Gaia | MA Gaia | `Gaia/functions/thread-review.md` | Iterate threads in `1 OFP/Threads/` |
| `daily-ops-summary` | Cocoria | MA Cocoria | `Cocoria/functions/daily-ops-summary.md` | Cocoricó ops digest (planned) |
| `mcp-deploy-pipeline` | Alex | MA Alex | `Alex/functions/mcp-deploy-pipeline.md` | Test → restart Claude Desktop → verify (planned) |
| `weekly-fitness-update` | Apollo | MA Apollo | `Apollo/functions/weekly-fitness-update.md` | Weekly health/fitness update (planned) |

---

## Authoring rules

- A function only makes sense for a particular agent or within AAE. If it's agent- and ecosystem-agnostic, it's a skill, not a function.
- Functions can be arbitrarily long; do not load them by default.
- Index here; body in dedicated file.
- MA grants awareness, not authorization. Whether an agent may invoke a function is governed by ownership rules (see `2 Agents/functions/spawn.md`), mode rules, and permission profiles.
- When you add or move a function, update this file in the same operation.
