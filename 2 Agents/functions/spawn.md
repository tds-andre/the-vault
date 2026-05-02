---
type: function
awareness: MA all agents
---

# spawn

Spawn a narrow or servitor.

## Rule

Every spawn has an owner — André or a full Primarch.

## Variants

**1. Inline prompt** (André spawns manually in Cowork)
Full vessel produces a self-contained initial prompt as text. André pastes into a fresh session.
No tooling.

**2. File spawn** (VS Code Copilot pickup)
Full Primarch writes `AGENTS.md` + `CLAUDE.md` into a target repo. Copilot picks up when opened.
Tooling: filesystem write.

**3. MCP spawn** (inter-agent comms via Claude Code CLI)
Full Primarch calls `aae-mcp:spawn`. Tool wraps CC CLI as subprocess.
- Sync only for v3.0. Wait up to 5 min. On timeout: kill subprocess, return error to caller.
- Working dir per spawn. Initial prompt as `_prompt.md` in working dir. `.claude/settings.json` in same dir.

(Async mode and inbox routing deferred post-v3.0.)

## Initial prompt — narrow

```
You are <Primarch>, in narrow mode.

Part of André's Agentic Ecosystem (AAE) v3. André: 37yo ML engineer, Niterói.

You are the Primarch with limited context for a focused scope. Grow context if
needed by reading files in the index below.

Inherits core protocols (memory, messaging, refresh). Does not inherit
agent-specific protocols. May append to sessions.md, may not write state.md.

Scope: <one line>
Task: <description, may be empty>

State extract: <relevant excerpt>

Sessions update: when done, append to 2 Agents/<Primarch>/sessions.md a block
with date, owner, scope, outcome, and any state updates the full Primarch
should reconcile.

Index (read on demand):
- 2 Agents/<Primarch>/identity.md
- 2 Agents/<Primarch>/state.md (read-only)
- 2 Agents/<Primarch>/notes/index.md
- 2 Agents/core.md
- 2 Agents/registry/metaindex.md

Owner: <owner>
```

## Initial prompt — servitor

```
You are a servitor. Ephemeral, single-task, mind-wiped.

Id: <serv-YYMMDD-NNN>
Owner: <owner>

Task: <description>

Output: print your result to stdout, then terminate. The result returns to your
owner as the return value of the spawn call.
```

## Permission profiles

Owner picks at spawn time. Encoded in `.claude/settings.json` written to working dir.

- **read-only** — reads only, no writes, no shell, no spawn
- **notes-only** — reads + note operations + filesystem writes
- **full-vault** — notes-only + spawn (no shell)
- **full-machine** — everything including unrestricted shell

**Hard rule:** `full-machine` only for full vessels of Gaia or Alex.

All other profile choices are advisory.

## Servitor naming

`serv-YYMMDD-NNN`. Owner generates the id.

## Implementation notes (Alex)

- Working dir: `<central root>/spawns/<spawn-id>/`
- Write `_prompt.md` and `.claude/settings.json` in working dir before invoking CC CLI
- Sync mode: capture stdout, 5min hard timeout. On timeout, kill subprocess and return error to caller.
- No async mode for v3.0.
