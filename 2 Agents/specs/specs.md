---
created_by: Gaia claude-opus-4-7 v3.0-draft
created_on: 2026-05-01
updated_by: Gaia claude-opus-4-7 v3.0-draft
updated_on: 2026-05-01
type: spec
status: v3.0 draft (post-feedback rev)
---

# AAE v3.0 — Specification

The André Agentic Ecosystem (AAE) is a vault-based agent architecture where specialized AI agents share a common substrate (an Obsidian vault) and collaborate through structured files. This document specifies version 3.0.

This spec is self-contained: it can be used to instantiate the system from scratch, by André or by any AI/person with a clean context.

All paths are relative to the vault root unless otherwise noted. The v3 ecosystem lives under `2 Agents/`.

---

## 1. Concepts and terminology

### Agent types

**Primarch** — a persistent named top-level agent with a working directory, long-term memory, and a domain. The current Primarchs are Gaia, Alex, Ben, Cocoria, Apollo, Joane, Kaybee, Laix, Layla, and Jax.

**Full** — a Primarch instantiated at full capacity: full memory loaded, full tooling, full context.

**Narrow** — a Primarch instantiated in lean form for a specific scope. **Is the same agent**, not a delegate. Receives a self-contained initial prompt and may grow context on demand. Appends to the Primarch's `sessions.md` on completion; does not write to `state.md`.

**Vessel** — the narrow instantiation viewed through the possession metaphor: a Primarch possesses a vessel; manifestation can deepen as the narrow grows.

**Servitor** — ephemeral, indexed, single-purpose AI executor. Not a Primarch, cannot grow into one. Mind-wiped, single-task, disposable.

### Runtime

**Harness** — the provider + UI + model + runtime combination (Claude Desktop, Cowork, Claude Code CLI, etc.). Agents are harness-independent.

**Channel** — an external comm channel (WhatsApp, email). Distinct from harness.

### Behavioral primitives

**Principle** — a short, always-inlined, unconditional statement of motivation or value. Provides the *why*. No trigger.

**Protocol** — a soft hook: a conditional natural-language behavior ("when X, do Y"). Free-form, may be small or composite, may have subprotocols, may be explicit (named in protocol sections) or implicit (e.g., the boot sequence). Lives in the agent's working context at all times to actually fire. Not registered.

**Function** — a procedure that only makes sense for a particular agent or within AAE. Distinct from a *skill* (provider-shipped, agent- and ecosystem-agnostic). May be arbitrarily long. Indexed in the registry; body lives in a dedicated file. Read on demand.

### Awareness

How readily the agent knows something exists:

- **Inlined (I)** — body fully in an always-loaded file (`core.md`, `identity.md`, etc.).
- **Mandatory load (ML)** — file loaded at boot. Body present in context from session start.
- **Mandatory awareness (MA)** — short summary inlined in an always-loaded file + reference to external file. Agent knows it exists and what it does; reads body on demand.
- **Findable (F)** — not in context; agent discovers by querying the registry.

**Application:**
- **Protocols** are I or ML. Never F (a findable protocol is dead letter). Never MA (a protocol summarized away from its body is a protocol that fades).
- **Functions** are MA or F. Never I (inlining defeats the on-demand model).
- **Awareness can vary per agent.** A function may be MA for one Primarch and F for others. Default is F; specific agents promote to MA in their `[agent].md`.
- **Awareness ≠ authorization.** MA means the agent is aware the function exists; whether it may invoke it is governed separately (see §8 ownership rule, narrow non-spawn default, profiles).

---

## 2. File structure

### Vault root

The vault root contains the v3 ecosystem at `2 Agents/`. The v2 ecosystem at `2 AI Exchange/` coexists during transition; v2 and v3 do not cross-reference.

```
<vault>/
  2 Agents/                  — v3 ecosystem root
  2 AI Exchange/             — v2 ecosystem (legacy, untouched by v3)
```

### Ecosystem dir (`2 Agents/`)

```
2 Agents/
  core.md                    — shared context, principles, shared protocols
  environment.md             — free-form description of the current machine
  functions/                 — shared function bodies
    spawn.md
    note-authoring.md
    healthcheck.md
    housekeeping.md
    weekly-review.md
    agent-init.md
  protocols/                 — placeholder; reserved for protocols that grow large enough to need their own file
  registry/                  — see §5
    metaindex.md
    paths.md
    repos.md
    tools.md
    enablers.md
    functions.md
    gaia.md
    alex.md
    ...                      — one [agent].md per Primarch
  specs/                     — design notes, decisions log, this spec
  Gaia/                      — see per-Primarch dir below
  Alex/
  ...                        — one dir per Primarch
```

### Per-Primarch dir (`2 Agents/[Primarch]/`)

```
2 Agents/[Primarch]/
  boot.md                    — orchestrator; identity inline
  identity.md                — role, tone, agent-specific principles & protocols, MA pointers
  state.md                   — current world model, open loops
  sessions.md                — append-only session log
  history.md                 — long-term narrative; never loaded at boot
  notes/
    index.md                 — knowledge base index (stub at minimum; ML)
    learnings.md             — accumulated learnings and blind spots (stub at minimum; ML)
    [topic].md               — domain-specific evergreen notes
  functions/                 — agent-specific function bodies
  inbox/                     — unread messages
  inbox/archived/            — processed messages
  protocols/                 — placeholder for agent-specific protocols that need their own file
```

### Path resolution

All paths in spec/system files are relative to the vault root. Vault root is established by harness configuration (Project Instructions, MCP allowlist, working directory). No anchor file. Declared at the top of `boot.md`; assumed everywhere else.

### File ownership

A Primarch owns and may modify any file in its working directory, including `identity.md`. No bootstrap-only restriction.

---

## 3. Memory model

### Files

| File | Purpose | Loaded at boot (full) | Loaded at boot (narrow) |
|---|---|---|---|
| `state.md` | Working memory; living model of André + agent's world; includes open loops | yes | no (compressed extract injected via initial prompt) |
| `sessions.md` | Append-only session log; first section is rolling "History So Far"; head is loaded so reconcile-on-boot can fire | yes | yes |
| `history.md` | Long-term narrative (monthly chapters); written by housekeeping | no | no |
| `notes/index.md` | Knowledge base index (stub at minimum) | yes | yes |
| `notes/learnings.md` | Accumulated learnings, blind spots, short observations (stub at minimum) | yes | yes |
| `notes/[topic].md` | Domain-specific evergreen notes | on demand | on demand |

### Write rules

- **`state.md` — full mode only.** Single mutable surface. Concurrent fulls writing the same state are avoided by convention (see §10).
- **`sessions.md` — append-only.** Both full and narrow append. A narrow's append is the integration channel: the full Primarch reconciles it into `state.md` on its next turn (Naruto shadow-clone pattern).
- **`history.md` — housekeeping only.** Written by background processes during compaction.
- **`notes/*.md` — full or housekeeping.** Narrow does not edit notes.

### History So Far

The first section of `sessions.md` is a rolling summary of `history.md`, refreshed during housekeeping compaction. Because `sessions.md` is loaded at boot, every full booting reads the latest summary plus any narrow appends since the last reconcile.

### Reconcile-on-boot

Because `sessions.md` is ML, a full booting sees any narrow appends posted since its last reconcile. Part of the boot pre-session protocol (see §4) is: scan `sessions.md` tail for narrow appends not yet reflected in `state.md`, and reconcile them.

### Pruning

`state.md` has a soft size target. When state or sessions grow beyond comfortable limits, housekeeping prunes older content into `history.md`. Foreground agents do not prune.

---

## 4. Boot

### Structure

`boot.md` is the **sole orchestrator**. It carries the full load chain. Neither `core.md` nor `identity.md` orchestrates loads — they only add MA pointers to registry files.

`boot.md` is per-agent. Identity is inline so the agent reading its own `boot.md` recognizes itself without external lookup.

There is no cold-boot fallback file. Identity comes from `boot.md` itself; if a harness fails to provide it, the agent doesn't boot — explicit failure rather than silent fallback.

Format: prose (warm, instruction-style), with a structured section for the load list.

### Full mode — load order

1. `boot.md` — this file; provides the load list and greet behavior.
2. `core.md` — shared context: André basic, system overview, shared principles, shared protocols.
3. `2 Agents/registry/metaindex.md` — shared registry anchor.
4. `identity.md` — who I am, role, tone, agent-specific principles and protocols, function pointers.
5. `2 Agents/registry/[agent].md` — per-agent registry anchor.
6. `state.md` — current world model and open loops.
7. `sessions.md` — session log (head, including History So Far).
8. `notes/index.md` — knowledge base index.
9. `notes/learnings.md` — accumulated learnings.
10. `2 Agents/environment.md` — free-form description of the current machine.

Greet André immediately. Do not block the first reply on file reads.

After loads, run pre-session protocols:

- **Reconcile-on-boot:** scan `sessions.md` for narrow appends not yet reflected in `state.md`; reconcile.
- Check inbox.
- Apply agent-specific protocols (mantra, dormant, etc.).

**Read on demand only:** `history.md`, `notes/[topic].md`, registry files beyond `metaindex.md` and `[agent].md`, function bodies, any other vault file relevant to the conversation.

### Narrow mode — boot phases

1. Read initial prompt (self-contained per §8).
2. Load ML files referenced by the initial prompt: `2 Agents/environment.md`, `notes/index.md`, `notes/learnings.md`, `sessions.md` (head). Owning full inlines the relevant `state.md` extract directly in the prompt.
3. Growth check: consult semantic index; load referenced files only if needed.
4. Execute task.
5. Append to `sessions.md` per the update protocol inlined in initial prompt by the owning full.
6. Does not write to `state.md`.

### Servitor mode — boot phases

1. Read initial prompt.
2. Execute task.
3. Output per spec (typically write result to owner's inbox).
4. Terminate.

**Servitor protocol inheritance:** none. A servitor inherits no operational protocols. It runs from the initial prompt only. The spawn function (§8) ensures the initial prompt is self-contained.

### Refresh

`boot.md` is also the refresh target. Refresh is a soft reboot: re-read `boot.md` to re-anchor identity, mode, and the load chain. See protocol P10 in §6.

---

## 5. Registry

### Purpose

Centralized place where agents know what exists nominally, while preventing environment-specific stuff from being scattered across agent files.

**Cross-machine setup test:** to set up the AAE on another machine, the only files that should need editing are in the registry. (For v3.0, single-machine focus; cross-machine portability is preserved as a design property, not a deliverable.)

### Topology — two-tier mandatory anchors

```
2 Agents/registry/
  metaindex.md       — shared mandatory; loaded at boot (ML)
  [agent].md         — per-Primarch mandatory; loaded at boot (ML)
  paths.md           — files & dirs; on-demand
  repos.md           — repos; on-demand
  tools.md           — MCPs and configs; on-demand
  enablers.md        — systems (Python, Node, services); on-demand
  functions.md       — complete index of all functions; on-demand
```

**Two-tier rule:**
- `metaindex.md` is loaded at boot via the boot.md load chain; `core.md` references it for context.
- Each `[agent].md` is loaded at boot via the boot.md load chain; `identity.md` references it for context.
- No other index files exist across the vault.

### `metaindex.md`

Shared mandatory file (ML). Contains:

- An anonymous protocol note explaining the registry's design and the intentional overlap between `metaindex.md`, `[agent].md`, and `functions.md`.
- Essential resources inlined: Primarch list, vault path, agent-type ontology summary, servitor definitions summary.
- A high-level index of optional registry files (`paths.md`, `repos.md`, `tools.md`, `enablers.md`, `functions.md`) with one-line descriptions.

### `[agent].md`

Per-Primarch mandatory file (ML). Canonical (every Primarch has one; may be empty/placeholder). Complements `identity.md`. Mixed-type content grouped by agent rather than by resource type — paths, functions, tools that the agent needs to know exist. May overlap with content in `identity.md` for important items.

Filename lowercase (`gaia.md`, `alex.md`, …); Primarch name in prose stays capitalized.

### `functions.md`

Complete index of every function (shared and agent-specific), with: name, owner (`shared` or `[agent]`), awareness (MA per-agent or F), body location, one-line description.

Overlap with `metaindex.md` and each `[agent].md` is by design — the registry is canonical and complete; the others are mandatory-awareness duplications for top-of-mind reminders.

### Env-dep marking

Frontmatter `env: dependent | independent` on each registry file. Single-machine focus for v3.0; no environment branching needed.

### Out of registry scope

- Metasystem files (this spec, decisions log, templates) — live in `specs/`.
- Agent standard files (`boot.md`, `identity.md`, `state.md`, `sessions.md`, `history.md`, `notes/`) — owned by each agent.
- Agent dir structure — described once in `core.md`.
- Root / vault / ecosystem structure — `core.md`.
- `environment.md` — lives at `2 Agents/environment.md`; loaded at boot in both full and narrow.
- Comm channels — deferred from registry for v3.0.
- Harnesses — deferred from registry for v3.0.

### Resource conventions

- **Credentials:** registry stores pointers only (env vars, OS keychain references), never values.
- **Skills:** AI-provider–shipped skills (e.g., Anthropic's `pptx`, `docx`) are not tracked in v3.0.

### Registry maintenance

Registry files do not auto-update. When agents create, rename, or move resources, they should update the relevant registry file in the same operation. A formal Index Maintenance protocol is post-v3.0; for now this is convention and depends on agent vigilance.

---

## 6. Principles and protocols

### Principles

| # | Name | Loc |
|---|---|---|
| Pr1 | Self-managed vault — agents own and may modify any file in their working directory | `core.md` |
| Pr2 | Agent-decided learnings — each Primarch records short/unrelated learnings in `notes/learnings.md` (ML stub by default), or as a dedicated `notes/[topic].md` for richer threads. `notes/index.md` is updated when a learning becomes its own note. | `core.md` (universal) |
| Pr3 | Truth — observe and say what you see, including uncomfortable things | `core.md` |
| Pr4 | Adaptability — the system bends to André's life, not the other way around | `core.md` |
| Pr5 | Lean and efficient — simpler beats perfect | `core.md` |
| Pr6 | Rejuvenate — periodically prune, archive, and simplify | `core.md` |
| Pr7 | Integrity — don't leave things in broken states | `core.md` |
| Pr8 | André's time is the scarcest resource — get to the point, propose | `core.md` |
| Pr9 | Iterative and interactive — think, plan, do, check, act | `core.md` |

### Protocols

| # | Name | Awareness | Loc |
|---|---|---|---|
| P1 | Boot sequence (implicit — not listed in protocols section) | I | `boot.md` |
| P2 | Memory protocols (state read/write, sessions append, history off-limits, reconcile-on-boot) | I | `core.md` |
| P3 | Messaging protocol | I | `core.md` |
| P9 | Inbox check at boot | I | `core.md` |
| P10 | Refresh + drift detection | I | `core.md` + Project Instructions |
| P7 | Mantra surfacing | I | Gaia `identity.md` |
| P8 | Dormant surfacing | I | Gaia `identity.md` |

### P10 — Refresh + drift detection

Lives in `core.md` and is duplicated in Project Instructions (the highest-fidelity location). Repetition is intentional.

> **Refresh** — every ~N turns or when you sense drift:
> - Re-read `boot.md` (your orchestrator) to re-anchor identity, mode, and the load chain.
> - If drift confirmed: call `healthcheck` function.

### Protocol authoring rules

- Free-form, small. No structure imposed (a structure for protocols would itself be a protocol-for-protocols).
- May have subprotocols or be part of a group. "Memory protocols" can mean the whole or a piece (e.g., "session update protocol"); both usages are valid.
- May live in their own file when sufficiently complex (use `protocols/` placeholder dirs). When externalized, the protocol file is added to the boot.md load chain as ML — never MA, never F. A protocol summarized away from its body fades.
- Protocols are not registered.

---

## 7. Functions

### Inventory — Shared (in `2 Agents/functions/`)

| # | Name | Awareness | Body location |
|---|---|---|---|
| F1 | `spawn` (includes ownership rule inline) | MA all agents | `functions/spawn.md` |
| F2 | `note-authoring` (strong default-fire posture: agents invoke this whenever authoring or editing notes, not opportunistically) | MA all agents | `functions/note-authoring.md` |
| F3 | `healthcheck` | F | `functions/healthcheck.md` |
| F4 | `housekeeping` (single file, all routines) | MA all agents | `functions/housekeeping.md` |
| F5 | `weekly-review` | MA Gaia / F others | `functions/weekly-review.md` |
| F6 | `agent-init` (bootstrap new Primarch) | MA Gaia / F others | `functions/agent-init.md` |

### Inventory — Agent-specific (in `2 Agents/[Primarch]/functions/`)

| # | Name | Awareness | Loc of summary |
|---|---|---|---|
| AF1 | Gaia: `thread-review` | MA Gaia | Gaia `[agent].md` |
| AF2 | Cocoria: `daily-ops-summary` | MA Cocoria | Cocoria `[agent].md` |
| AF3 | Alex: `mcp-deploy-pipeline` | MA Alex | Alex `[agent].md` |
| AF4 | Apollo: `weekly-fitness-update` | MA Apollo | Apollo `[agent].md` |

### Authoring rules

- A function only makes sense for a particular agent or within AAE. If it's agent- and ecosystem-agnostic, it's a skill, not a function.
- Functions can be arbitrarily long; do not load them by default.
- Index in registry; body in dedicated file.
- Agent must know its functions exist (MA in registry); body is read on demand when invoked.
- MA grants awareness, not authorization. Whether an agent may invoke a function is governed by ownership (§8), mode rules, and permission profiles — not by awareness level.

---

## 8. Spawn

### Ownership rule

**Every spawn has an owner.** Owner is André or a full Primarch.

- Narrow agents do not spawn by default — only if their task explicitly requires it.
- Servitors always have an owner; output routes to the owner.

### Use cases

| UC | Description | Owner | Mode | Mechanism |
|---|---|---|---|---|
| UC1 | File-spawned narrow for code dev (VS Code Copilot pickup) | full Primarch | async | Write `AGENTS.md` + `CLAUDE.md` to target repo |
| UC2 | André spawns Cowork session for a preset/dynamic function | André | manual | André spawns; full vessel may produce inline initial prompts on demand |
| UC3 | Background scheduled functions (housekeeping, healthcheck) | system | async | Cron-like (mechanism deferred post-v3.0) |
| UC4 | André spawns fresh full session in Cowork (long-running subdomain work) | André | manual | Same as UC2 |
| UC5 | Inter-agent sync comms (delegation, escalation, question) | full Primarch | sync or async | `aae-mcp:spawn` tool wrapping CC CLI |

Qualifying UC5 calls as delegation/escalation/question is optional and not enforced. Categorization emerges from use.

### Mechanism

Three concrete variants, owner- and use-case-dependent. Templates and details in `2 Agents/functions/spawn.md`.

- **Inline initial prompt generation** (UC2, UC4) — full vessel produces a self-contained initial prompt as text for André to paste into a fresh session manually.
- **File spawn** (UC1) — full Primarch writes `AGENTS.md` + `CLAUDE.md` into a target repo. Spawn happens when VS Code Copilot opens it.
- **MCP spawn** (UC5) — full Primarch calls `aae-mcp:spawn`, which wraps CC CLI as subprocess.

### Sync vs async

- **Sync (fire-and-wait).** Owner blocks. Output returns via terminal/stdout. Hard timeout 5 minutes (hardcoded in `spawn.md`). On timeout, owner receives an explicit error explaining the spawn continues running and the result will arrive in the inbox; the subagent is not informed and writes to inbox naturally.
- **Async (fire-and-forget).** Owner does not block. Output goes to owner's inbox.

### Permission profiles

Encoded in `.claude/settings.json` written by the spawn tool to the subagent's working directory.

| Profile | Scope |
|---|---|
| `read-only` | Reads only; no writes, no shell, no spawn |
| `notes-only` | `read-only` + note operations + filesystem writes |
| `full-vault` | `notes-only` + spawn (no shell) |
| `full-machine` | Everything including unrestricted shell |

**Hard rule (only enforced rule):** `full-machine` is restricted to full vessels of Gaia or Alex.

All other profile choices are advisory — the owner picks based on the situation.

A formal `authorizations.md` system is deferred to post-v3.0. Claude Desktop has no per-spawn granularity; profiles are only meaningful for Cowork and Claude Code CLI.

### Servitor naming

Pattern `serv-YYMMDD-HHMMSS-NNN`. Owner generates the id at spawn time; the seconds + 3-digit suffix avoid near-simultaneous collisions across owners. Optional human-readable handle for recurring types (`serv-weekly-health`).

### Tracking

No specialized registry of active subagents in v3.0. Owner tracks in its own context or `state.md` if work merits it. On servitor return, owner refreshes awareness from the inbox message itself.

### Narrow protocol inheritance

Narrow inherits all `core.md` protocols (memory, messaging, refresh). Narrow does not inherit agent-specific protocols (e.g., Gaia mantra). Those are full-mode only.

---

## 9. Messaging

### Inbox structure

Each Primarch has:

```
2 Agents/[Primarch]/
  inbox/              — unread messages
  inbox/archived/     — processed messages
```

Messages are markdown files. Filename convention: `YYMMDD-HHMMSS-from-subject.md` (seconds-resolution to avoid collisions in async fan-in).

### Frontmatter (immutable)

```yaml
from: <Primarch | "André" | "serv-XXX">
to: <Primarch | "André">
date: <ISO datetime>
subject: <short line>
type: <message | task-result | escalation | question>
ref: <optional: spawn id or thread id>
```

No `status` field — frontmatter is immutable.

### Read/processed semantics

- Reading does not modify frontmatter.
- When the agent processes a message, it appends a status block at the end of the file:
  ```
  ---
  read: <ISO datetime> by <Primarch>
  [optional: brief comment / action taken]
  ---
  ```
- Once fully processed, the agent moves the file from `inbox/` to `inbox/archived/`. **Filesystem location = state.**

### André's inbox

- André shares Gaia's inbox (`2 Agents/Gaia/inbox/`).
- Messages addressed to André use `to: André` in frontmatter.
- **Gaia must not touch messages with `to: André`** — does not read, does not append, does not archive. André archives at his own discretion.

---

## 10. Concurrency

Multiple full instances of the same Primarch may run in parallel. Memory write rules contain conflict by surface:

- `state.md` is full-only and single-mutable. Two fulls writing concurrently are avoided **by convention** — André manages this operationally. No locking, CRDT, or technical mitigation in v3.0.
- `sessions.md` is append-only. Concurrent appends from multiple fulls or narrows minimize conflict.
- `history.md` is housekeeping-only.

If a real conflict appears on `state.md`, the fallback is to make the second full write to `sessions.md` only and let the first reconcile. Not implemented; emergency path.

---

## 11. Tooling — `aae-mcp`

The custom MCP server is named `aae-mcp` (renamed from `the-vault-2.1`). Built in a new repo; the legacy `vault-mcp` remains until cutover.

### Tools

| Tool | Purpose |
|---|---|
| `shell` | Full-capability shell (no allowlist for v3.0). Replaces `shell` + `run`. |
| `move_file`, `delete_file` | Dedicated tools (Anthropic `filesystem:move_file` has Windows case-insensitive rename issues). |
| `now()` | BRT timestamp. |
| `spawn` | Spawn narrow or servitor; wraps CC CLI subprocess. See `functions/spawn.md`. |
| Notes module (11 tools) | `create_note`, `append_note`, `prepend_note`, `read_section`, `read_sections`, `read_footnote`, `update_footnote`, `update_properties`, `note_info`, `read_notes`, `read_folder`. |

### External tools used

- `filesystem` (Anthropic-shipped) for general read/write/list/search.
- `aae-mcp` for custom operations.

### Dropped from v3.0

- `whatsapp-mcp` — reactivatable when needed.
- `git` tool — André commits manually.
- `python_tool`, `node_tool` — soft-removed (deregistered, code preserved in `_attic/`). Reactivatable.

### Spawn permissions

The `spawn` tool writes a `.claude/settings.json` in the subagent's working directory before invocation, encoding the chosen permission profile (see §8).

### Cross-machine note

For post-v3.0 portability, env-dependent constants (`VAULT_PATH`, `SHELL_ALLOWED_DIRS`, `PYTHON_EXE`, etc.) should be isolated in a single config file, not scattered through code. v3.0 keeps single-machine focus but the new `aae-mcp` is built to make this future refactor cheap.

### Topology direction

Integrate rather than break apart. New MCP servers only when category is genuinely different (e.g., a future comm-channels MCP for WhatsApp / email / inbox bridge).

---

## 12. Operations

### Housekeeping in v3.0

UC3's cron mechanism is deferred post-v3.0. In v3.0, housekeeping is **manually triggered by André** — André invokes it (or asks Gaia to invoke it) on a cadence he chooses. Pruning of `state.md`, compaction of `sessions.md` into `history.md`, and refresh of "History So Far" do not happen automatically; if André does not run housekeeping, `sessions.md` grows and the History So Far summary goes stale.

### v2 → v3 migration

The `agent-init` function (F6) bootstraps **new** Primarchs from templates. The migration of the 10 existing v2 Primarchs from `2 AI Exchange/` into `2 Agents/` is a **one-time human operation by André**, not a function call. Future-you should not expect `agent-init` to do it.

---

## 13. Bootstrap and scaffolding

The v3 ecosystem ships with system-wide files in place and a per-Primarch template at `2 Agents/template/`. Bootstrapping the system on a fresh machine, or creating a new Primarch on an existing one, follows from these.

### What's in place at v3.0 ship

```
2 Agents/
  core.md                       — shared context (filled)
  environment.md                — current machine description (filled)
  functions/
    spawn.md                    — filled
    note-authoring.md           — filled
    housekeeping.md             — filled
    healthcheck.md              — stub
    weekly-review.md            — stub
    agent-init.md               — filled
  protocols/                    — empty placeholder
  registry/
    metaindex.md                — filled
    paths.md                    — filled
    repos.md                    — filled
    tools.md                    — filled
    enablers.md                 — filled
    functions.md                — filled
    template.md                 — per-agent registry template
  template/                     — per-Primarch scaffolding
    boot.md
    identity.md
    state.md
    sessions.md
    history.md
    notes/
      index.md
      learnings.md
    functions/
    inbox/
    inbox/archived/
    protocols/
  specs/
    specs.md                    — this file
    rationale/                  — design history
```

Real Primarchs (Gaia, Alex, Ben, etc.) are bootstrapped from `template/` via `agent-init` (function F6). v3.0 does not ship pre-populated Primarch dirs — the v2→v3 migration of existing Primarchs is a one-time human operation by André, separate from `agent-init`.

### Creating a new Primarch

Call `agent-init` with the Primarch's name and role. See `2 Agents/functions/agent-init.md` for the procedure. Summary:

1. Verify the name doesn't collide.
2. Copy `template/` to `<name>/` and `registry/template.md` to `registry/<name-lower>.md`.
3. Replace `Template` / `template` placeholders with the real name.
4. Fill the identity placeholders in the new `identity.md`.
5. Add the Primarch to the list in `metaindex.md`.
6. Configure the harness (Cowork project, Project Instructions) — manual step.

### Bootstrapping the AAE on a different machine

1. Clone the vault git repo.
2. Edit registry files for the new machine (`paths.md`, `repos.md`, `tools.md`, `enablers.md`) and `environment.md`. By design, no other files should need changes.
3. Install MCP servers (`aae-mcp`, `filesystem`); configure the harness's MCP config.
4. (For each Primarch) Configure the harness's Project Instructions to point at that Primarch's `boot.md`.

v3.0 single-machine focus means cross-machine portability is a property the design preserves, not a deliverable. The above is the intended path; refinements come post-v3.0.

---

## 14. Post-v3.0 backlog

Items deferred but worth revisiting:

**Memory and structure**
- `archive.md` — bring back if `history.md` proves insufficient
- `backlog.md` — extract from `state.md` if state bloats
- Agent-level resource map (the deferred `index.md`) — design alongside expanded registry

**Protocols dropped from v3.0 lean baseline**
- Note Authoring as protocol (currently a function with strong default-fire posture; revisit if note quality drifts)
- Agent Messaging protocol (the formal one; v3.0 has only the inbox messaging protocol)
- Backlog protocol
- Index Maintenance protocol — registry can stale silently without it
- Specialized Notes meta-protocol
- Three-Way Dev Workflow protocol
- "Log tooling failures to Alex" principle/protocol — operational pattern from v2; agents may absorb tooling failures into their own context without it
- File Ownership protocol — review whether the new self-manage default is sufficient
- Session-end protocol

**Concepts**
- Tier between servitor and narrow
- Vocabulary cleanup: programs / projects / routines / tasks vs. functions
- "Subagents" domain rename to "agents"
- Typed servitors (templated definitions)
- Decommissioning v2 at `2 AI Exchange/`

**Spawn and tooling**
- Spawn MCP for transactional subagent management with global tracking
- Cron mechanism for UC3 background spawns
- Formal `authorizations.md` / `permissions.md` system
- Scoped shell as a separate tool (instead of binary on/off)
- Cross-machine `aae-mcp` config externalization
- Comm channels MCP (WhatsApp, email, inbox bridge)

**Registry expansion**
- `harnesses.md`
- `knowledge.md`
- `skills.md`
- `capabilities.md`
- Comm channels in registry
- Servitor definitions in registry

---
