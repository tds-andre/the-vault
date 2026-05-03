---
type: registry-agent
env: independent
---

# template.md — Per-Agent Registry Anchor (Template)

Loaded at boot (ML) for the agent it belongs to. Pair to the agent's `identity.md` (which lives in the agent's home dir). This anchor surfaces the agent's mandatory-awareness pointers: its functions, notes, paths, and tools. The complete authoritative versions of these references live in the canonical registry files (`functions.md`, `paths.md`, etc.); this file re-surfaces a subset for top-of-mind context. Overlap is intentional.

Used by `agent-init` to scaffold a new Primarch's anchor at `2 Agents/registry/[name].md`. Replace placeholders, then keep the file current as the agent grows.

---

## My functions (MA)

| Function | Body | Description |
|---|---|---|
| `spawn` | `2 Agents/functions/spawn.md` | Spawn narrow or servitor (every spawn has an owner) |
| `note-authoring` | `2 Agents/functions/note-authoring.md` | Author or edit notes; strong default-fire |
| `housekeeping` | `2 Agents/functions/housekeeping.md` | Maintenance routines (manually triggered in v3.0) |

*(Promote shared functions to MA as the agent's role calls for them — e.g., `weekly-review` for Gaia. Add agent-specific functions as they're created. Each agent-specific function has its body at `2 Agents/[Name]/functions/[fn].md`.)*

## My notes

| Note | Purpose |
|---|---|
| `notes/learnings.md` | Accumulated intelligence, blind spots, operational patterns (loaded at boot) |

*(Add per-topic evergreen notes as they're promoted from `learnings.md` into their own files. Each entry: file name + one-line purpose. Bodies stay in `2 Agents/[Name]/notes/[topic].md`.)*

## My paths

*(Empty by default. Add only paths this agent touches frequently and needs top-of-mind. Generic vault structure is in `core.md`; concrete cross-machine paths are in `paths.md`. Use this section to surface the small set the agent really cares about — e.g., for Gaia: `1 OFP/`, `Thread Index.md`. Don't duplicate the whole vault.)*

## My tools

*(Empty by default. Most Primarchs inherit shared MCP tooling — see `tools.md`. Add only agent-specific tools or configs here. E.g., Alex might surface specific MCP repo paths; Joane might surface notebook paths.)*
