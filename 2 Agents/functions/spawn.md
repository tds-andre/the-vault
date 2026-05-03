---
type: function
awareness: MA all agents
---

# spawn

Spawn a narrow or servitor. Read this body when you're about to invoke a spawn.

## Ownership rule

**Every spawn has an owner** — André or a full Primarch. The owner is named in the initial prompt and is where output routes (sync return value, async inbox).

- **Narrows do not spawn by default.** A narrow may spawn only if its task explicitly requires it. The spawning posture is full-mode discipline.
- **Servitors always have an owner.** Output goes to the owner.

Awareness (MA on this function) does not authorize invocation. The ownership rule and mode rules govern who may invoke.

## Variants

There are three concrete spawn variants, picked by use case.

### 1. Inline initial prompt (manual paste)

A full vessel produces a self-contained initial prompt as text output. André pastes it into a fresh harness session. No tooling involvement at spawn time.

Used when André is creating a fresh Cowork session and wants the new vessel pre-briefed.

### 2. File spawn (VS Code Copilot pickup)

A full Primarch writes `AGENTS.md` and `CLAUDE.md` into a target repo. When VS Code Copilot opens the repo, it picks up the brief and runs as the agent.

Used for repo-scoped code work (e.g., a Primarch hands off implementation to Copilot in a specific repo).

### 3. MCP spawn (`aae-mcp:spawn`)

A full Primarch calls the `aae-mcp:spawn` tool, which wraps Claude Code CLI as a subprocess. The tool writes the initial prompt as `_prompt.md` and `.claude/settings.json` (permission profile) into the spawn's working directory before invoking the CLI.

- **Sync only for v3.0.** Owner blocks on the subagent. Output returns via subprocess stdout.
- **5-minute hard timeout.** On timeout, `aae-mcp:spawn` kills the subprocess and returns an error to the caller. Async mode and inbox routing are deferred post-v3.0.
- **Working dir per spawn:** `<central root>/spawns/<spawn-id>/`.

Used for inter-agent comms (delegation, escalation, question) and headless runs.

## Initial prompt — narrow

Self-contained per the spec. The narrow should be able to do its task without searching outside the prompt — but may grow context by reading vault files in the index if needed.

```
You are <Primarch>, in narrow mode.

Part of André's Agentic Ecosystem (AAE) v3. André: 37yo ML engineer, Niterói.
Vault root: <vault path from environment.md>.

You are the Primarch with limited context for a focused scope. Grow context if
needed by reading files in the index below.

Inherits core protocols (memory, messaging, refresh). Does not inherit
agent-specific protocols. May append to sessions.md, may not write state.md.

Scope: <one-line scope>
Task: <description; may be empty for general-purpose narrow>

State extract: <relevant excerpt from owning full's state.md>

Sessions update: when done, append to 2 Agents/<Primarch>/sessions.md a block
with date, owner, scope, outcome, and any state updates the full Primarch
should reconcile.

Index (read on demand):
- 2 Agents/<Primarch>/identity.md
- 2 Agents/<Primarch>/state.md (read-only — do not write)
- 2 Agents/<Primarch>/notes/learnings.md
- 2 Agents/core.md
- 2 Agents/registry/metaindex.md
- 2 Agents/environment.md

Owner: <owner>
```

## Initial prompt — servitor

Mind-wiped. No protocol inheritance. The servitor knows what its prompt tells it, nothing else.

```
You are a servitor. Ephemeral, single-task, mind-wiped.

Id: <serv-YYMMDD-HHMMSS-NNN>
Owner: <owner>

Task: <description>

Output: print your result to stdout, then terminate. The result returns to your
owner as the return value of the spawn call.
```

André brief omitted by default for servitors. Owner injects task-relevant context if needed.

## Permission profiles

Owner picks at spawn time. Encoded in `.claude/settings.json` written to the spawn's working dir before CLI invocation.

| Profile | Scope |
|---|---|
| `read-only` | Reads only; no writes, no shell, no spawn |
| `notes-only` | `read-only` + note operations + filesystem writes |
| `full-vault` | `notes-only` + spawn (no shell) |
| `full-machine` | Everything including unrestricted shell |

**Hard rule:** `full-machine` is restricted to **full vessels of Gaia or Alex only**. All other profile choices are advisory — the owner picks per situation.

A formal `authorizations.md` system is deferred post-v3.0. Claude Desktop has no per-spawn granularity; profiles are only meaningful for Cowork and Claude Code CLI.

## Servitor naming

Pattern: `serv-YYMMDD-HHMMSS-NNN`. The owner generates the id at spawn time. Seconds + 3-digit suffix avoids near-simultaneous collisions across owners.

Optional human-readable handle for recurring types (`serv-weekly-health`, `serv-housekeeping-gaia`). Tracking of active servitors is not formalized in v3.0 — owner tracks in its own context or `state.md` if the work merits it.

## Tracking

No specialized registry of active subagents in v3.0. The owner tracks active spawns in its own context. On servitor return, the owner refreshes awareness from the inbox message itself (async) or from the return value (sync).

## Implementation notes (for Alex)

- Working dir: `<central root>/spawns/<spawn-id>/`
- Write `_prompt.md` and `.claude/settings.json` in the working dir before invoking CC CLI
- Sync mode: capture stdout; 5-minute hard timeout. On timeout, kill the subprocess and return an explicit error to the caller. (The subagent finishes naturally and writes to inbox if/when async mode lands.)
- No async mode for v3.0.
- Spawn id naming for narrows is owner's responsibility; for servitors, follow the pattern above.
