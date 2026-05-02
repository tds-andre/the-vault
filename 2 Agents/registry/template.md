---
type: registry-agent
env: independent
---

# template.md — Per-Agent Registry Anchor (Template)

*Per-Primarch registry file. Loaded at boot (ML) for the agent it belongs to. Complements `identity.md` — mixes paths, functions, and tools the agent needs to know exist.*

*This is the template version. When agent-init bootstraps a new Primarch, this file is copied to `registry/<primarch>.md` and adjusted.*

---

## My home

`2 Agents/Template/` *(replace)*

## My functions (MA)

*(List shared and agent-specific functions this agent has at MA awareness. Bodies referenced by path.)*

| Function | Owner | Body | Description |
|---|---|---|---|
| `spawn` | shared | `2 Agents/functions/spawn.md` | Spawn narrows or servitors |
| `note-authoring` | shared | `2 Agents/functions/note-authoring.md` | Author or edit notes |
| `housekeeping` | shared | `2 Agents/functions/housekeeping.md` | Maintenance routines |

*(Promote other shared functions to this list when this agent uses them often. Add agent-specific functions as they're created.)*

## My paths

*(Vault dirs, external dirs, files this agent works with. Empty by default.)*

## My tools (MA)

*(MCPs, configs this agent specifically depends on beyond the universal `aae-mcp` + `filesystem`. Empty by default.)*

## My channels (post-v3)

*(Comm channels this agent uses. Deferred from registry for v3.0.)*
