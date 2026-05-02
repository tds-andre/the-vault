---
created_by: Gaia claude-opus-4-7 v2.1
created_on: 2026-05-01
updated_by: Gaia claude-opus-4-7 v2.1
updated_on: 2026-05-01
type: design-notes
status: draft — capture in progress
---

# v3 Design Decisions — Working Capture

*Faithful record of decisions made in design sessions. Feeds the eventual single self-contained `specs.md`. Not authoritative on its own — captures decisions as they're made.*
*Started: 2026-05-01.*

---

## Purpose

A running log of v3 design decisions. The eventual self-contained `specs.md` will be assembled from this once enough of the system is decided. Until then, this file is the working source.

This file is **not** for runtime reference. It exists for André's review and for instantiating the v3 system later (by Gaia or by another AI/person with clean context).

Each section is marked **draft** or **stable** so consolidation knows what's locked vs. still moving.

---

## Session goals (2026-05-01) — *stable*

The seven outcomes André wants from the v3 redesign — these are **outcomes, not tasks**:

1. Migrate Primarchs to Cowork in v3 → parallel streams of work
2. Review custom MCP tooling; reduce and simplify
3. Add MCP tool for inter-agent comms (ask, delegate, escalate; sync or async)
4. Spawn agents in full / narrow / servitor mode from any harness
5. Background process that triggers agents via Claude Code CLI
6. Centralize and parametrize environment-specific stuff
7. Optimize context window usage patterns

## Approach — *stable*

Three layers + one cross-cutting concern:

- **Layer 0 — Pre-requisite:** centralize/parametrize env (#6).
- **Layer 1 — Spawn primitive:** define instantiation; file load list, order, mode-aware (#4). Cowork (#1) and CC CLI background (#5) are validation harnesses for this primitive, not separate work. Context-window optimization (#7) is a property of the modes.
- **Layer 2 — Ecosystem:** MCP cleanup (#2) + comms MCP (#3). Treated as a single pass.

This session: **Layer 1 first**, starting with current boot sequence audit then redesign.

---

## Spec domains (André's draft outline) — *draft*

The eventual `specs.md` will cover:

1. **boot** — session start, mode-aware
2. **system / identity / protocols** — agent identity, shared and per-agent protocols
3. **memory** — state, sessions, history, notes
4. **functions / programs / routines / triggers / skills** — vocabulary needs cleanup (see Review backlog)
5. **agents** — registry, lifecycle, tracking *(originally drafted as "subagents"; Gaia proposed rename to "agents" as superset covering Primarchs + subagents + servitors — pending confirmation)*
6. **comms** — inter-agent communication
7. **resources / registry / centralization** — environment, tools, subsystems, pointers, indices, dirs
8. **housekeeping / health / monitor / rejuvenation / pruning** — self-maintenance

Not all will be tackled in v3.0. P0 scope confirmation deferred (Gaia proposal: P0 = boot, system, memory, comms, resources; P0-lite = housekeeping; P1 = agents detail, functions/skills bag).

---

## Boot sequence — current v2 state — *stable* (audit, immutable)

### Where boot logic lives today

| Source | What it defines |
|---|---|
| `boot.md` (Project Instructions) | Identity + primary load order + `agents.md` fallback |
| `agents.md` (vault root) | Cold-boot entry point without Project Instructions |
| `core.md → Session Start Protocol` | Canonical numbered load order |
| `system.md → Vault Scope` | Per-agent: "Reads by default" vs "Reads on demand" |
| `system.md → Operating Principles` | Implicit boot behaviors (mantra surface, dormant surface) |

### Effective sequence (union of what those sources require)

1. Project Instructions = boot.md → greet immediately, do not block on file reads
2. Load in order: `memory.md` → `core.md` → `system.md` → `index.md`
3. (Gaia, additionally) `todo.md`, `agents.md`, `Thread Index.md`, `Thread System.md`
4. Check `messages/` inbox
5. Surface 1 mantra item (alternating Compass/Self-talk)
6. If user message is open-ended, surface 1 dormant item
7. Everything else on demand

### Frictions identified

1. **Same load order in 3 sources, not aligned.**
2. **No mode concept.** Every boot is identical today.
3. **`memory.md` is monolithic.**
4. **No explicit token budget** anywhere.
5. **Hardcoded paths** in boot.md, incompatible with cross-harness direction.
6. **Pre-session behaviors fragmented** across multiple sources.
7. **Cold-boot fallback** via `agents.md` exists but rarely exercised.
8. **"Greet immediately, don't block on reads"** — aspirational, not literal in practice.

---

## Terminology — *stable*

| Term | Meaning |
|---|---|
| **Primarch** | A persistent named top-level agent — Gaia, Alex, Ben, Cocoria, Apollo, Joane, Kaybee, Laix, Layla, Jax. Replaces "Eternal" entirely; drop "Eternal". |
| **Full** | A Primarch instantiation at full capacity — full memory loaded, full tooling, full context. |
| **Narrow** | A Primarch instantiation in lean form for a specific scope/task. **Is the same agent**, not a delegate. Can search/grow into fuller context if it judges the need. Can write `sessions.md` (append-only); cannot write `state.md`. |
| **Vessel** | The narrow instantiation viewed through the possession metaphor: a Primarch possesses a vessel; manifestation can deepen as the narrow grows. Confirmed. |
| **Servitor** | Ephemeral, indexed, single-purpose AI executor. Not a Primarch, cannot grow into one. Mind-wiped, single-task, disposable. Replaces "Bee" / "Worker"; drop those terms. |
| **Harness** | The provider + UI + model + runtime combination (Claude Desktop, Cowork, Claude Code CLI, etc.). Replaces ambiguous "channel". Comm channels (WhatsApp, email) keep "channel". |
| **Protocol** | A soft hook — a conditional natural-language behavior ("when X happens, do Y"). Evaluated at session time by full agents (initially). Distinct from principles (always-on stance). |

---

## Decisions on agent modes — *stable*

### Full
- A Primarch at full capacity.
- Multiple full instances of the same Primarch can run in parallel. Write protocols designed with this in mind (see Memory write rules under boot).

### Narrow
- **Is the Primarch**, not a delegate or slave. André can interact with full or narrow as the same entity (within reason).
- Initial prompt is written at session time by a full Primarch, possibly using a template. Self-contained enough that the narrow can work without growing.
- Decides its own growth into fuller context based on the semantic index in its initial prompt.
- Growth heuristics will be observed and refined over time, not pre-specified.
- **Write surface:** appends to `sessions.md` per the update protocol inlined in the initial prompt by the owning full. **Does not write to `state.md`** — state is full-only territory. This is the integration channel for the Naruto shadow-clone merge: narrow records what happened, full reads and reconciles into state on its next turn.
- Design intent (Naruto shadow-clone analogy): narrow does focused work and integrates experience back into the Primarch on completion — no master/slave handoff, no debrief turn.

**Narrow initial prompt — required content:**
- Brief about the system
- Brief about André
- Who the agent is (Primarch identity)
- Mode declaration: you are narrow, scope = X
- Current state of things (compressed `state.md` extract relevant to the task)
- Why spawned — the task or purpose (may be blank = general-purpose narrow)
- Growth protocol (other protocols TBD)
- **`sessions.md` update protocol** — inlined by owning full; what/how to append
- Semantic index of available full files (so narrow can grow on demand)

### Servitor
- Ephemeral by default.
- Indexed naming (e.g. `serv-YYMMDD-NNN`); optional human-readable handle for recurring jobs (`serv-weekly-health`).
- Cannot grow into a Primarch.
- **Persistent definition + ephemeral invocation:** recurring servitor types live as definitions in the metasystem; each run is a fresh instance.

**Servitor initial prompt — required content:**
- Brief about the system
- Role/mode: you are a servitor, ephemeral, single-task
- Owner identification (who spawned you)
- Why spawned — the task
- Standard I/O protocol (TBD; can be overridden by owner per task)
- André brief: **omitted by default**; owner injects if relevant to the task

### Open: tier between servitor and narrow
André noted there may be a missing intermediate type. **Deferred to post-v3.0.**

---

## Decisions on file structure — *stable*

### Memory layout

| File | Purpose | Loaded in full at boot | Loaded in narrow at boot |
|---|---|---|---|
| `state.md` | Working memory; living model of André + agent's world; absorbs old `backlog.md` ("open loops" section) | yes | no (compressed extract injected via initial prompt) |
| `sessions.md` | Append-only session log; first section is rolling "History So Far" summary of `history.md` | **on demand** (read when historical context is needed) | on demand |
| `history.md` | Long-term narrative (monthly Chapters); never loaded at session start; searched on demand | no | no |
| `notes/index.md` | Knowledge base index for the agent's notes/ dir | yes | optional growth |
| `notes/[topic].md` | Domain-specific evergreen notes | on demand | on demand |

**Specialized notes** absorb v2 specialized files:
- `evolution.md` (Gaia) → `notes/system-evolution.md`
- `mantra.md` (Gaia) → `notes/mantra.md`; the surfacing protocol stays in `identity.md`

**Dropped from v3.0** (see Review backlog for revisit triggers):
- `archive.md` — superseded by `history.md`
- `backlog.md` — folded into `state.md`
- `character.md` (briefing proposal) — name unsatisfying, semantic overlap with identity; learnings handled by per-agent operating principle (see below)

**Deferred** (tied to registry/resources domain):
- `index.md` (agent's resource map)

### File redistribution (v2 → v3)

| v2 | v3 |
|---|---|
| `boot.md` | kept; per-agent, slim, identity inline; load order + greet behavior |
| `system.md` | renamed to `identity.md`; agent-owned; identity, role, tone, agent-specific principles, agent-specific protocols, function pointers |
| `core.md` | slimmed; basic about-André + system overview, shared protocols (memory only for v3.0), shared principles |
| `memory.md` | split into `state.md` + `sessions.md` + `history.md` + `notes/` |
| `archive.md`, `backlog.md` | dropped |
| `agents.md` | dropped (no cold-boot fallback in v3.0; agent registry deferred to resources/registry domain) |
| `index.md`, `evolution.md`, `mantra.md` | see Memory layout above |

### Removed-from-core.md-but-noted (review post-v3.0)

These currently live in core.md and are removed from v3.0 for lean baseline:
- Note Authoring protocol
- Agent Messaging protocol
- Backlog protocol
- Index Maintenance protocol
- Specialized Notes meta-protocol
- Three-Way Dev Workflow protocol
- "Log tooling failures to Alex" principle
- File Ownership protocol — superseded by new default principle (see below)

### Path resolution

- All paths in spec/system files are **relative to the vault root**.
- Declared once at the top of `boot.md`; assumed everywhere else.
- No anchor file (`agents.md` dropped — see below). Vault root is established by harness configuration (Project Instructions, MCP allowlist, working directory).
- `paths.csv` dropped for v3.0 (current v2 hardcoded-relative approach kept).

---

## Decisions on boot — *stable*

### Structure

- **Per-agent `boot.md`** retained (v2 approach kept). Slim file, identity inline so the agent reading its own `boot.md` recognizes itself without external lookup.
- **No shared boot.md.** Single-source approach considered and rejected — would force identity to come from harness, fragile.
- **No cold-boot fallback file.** `agents.md` dropped entirely from v3.0. Identity comes from `boot.md` itself; if a harness fails to provide it, the agent doesn't boot — explicit failure rather than fallback.
- **Format:** prose (warm, instruction-style), with a structured section for the load list.
- **Path resolution declared at top:** "All paths in this file are relative to the vault root."

### Full mode — load order

1. `boot.md` (this file — provides the load list and greet behavior)
2. `core.md` — shared context (André basic, system overview, shared principles, shared protocols)
3. `identity.md` — who I am, role, tone, agent-specific principles & protocols, function pointers
4. `state.md` — current world model (absorbed `backlog.md`)
5. `notes/index.md` — pointer for on-demand notes loading

**Read on demand only (not at boot):**
- `sessions.md` — when historical session context is needed *(deviation from briefing, which loaded HSF mandatory)*
- `history.md` — searched on demand
- `notes/[topic].md` — loaded as relevant

**Pre-session protocols fire after loads:**
- Check `messages/` inbox
- Surface mantra (Gaia)
- Surface dormant if user message is open-ended (Gaia)
- Other agent-specific protocols defined in `identity.md`

### Narrow mode — boot phases

1. Read initial prompt (self-contained per spec)
2. Growth check: consult semantic index, load referenced files only if needed
3. Execute task
4. Append to `sessions.md` per the update protocol inlined in initial prompt by owning full
5. **Does not write to `state.md`** — full-only territory

### Servitor mode — boot phases

1. Read initial prompt
2. Execute task
3. Output per spec
4. Terminate

### Memory write rules (refined from C2)

- **`state.md` — full mode only.** Single mutable surface. Concurrent fulls writing the same state remains a real conflict surface but is the only one (Open #1 narrowed).
- **`sessions.md` — append-only.** Both full and narrow append. Narrow's append is the integration channel for the Naruto shadow-clone merge. Append-only minimizes concurrency risk.
- **`history.md` — housekeeping only.** Written by background processes during compaction.
- **`notes/*.md` — full or housekeeping.** Narrow does not edit notes (consistent with state being full-territory).

---

## Decisions on protocols — *stable*

- A protocol is a conditional natural-language behavior, kept in the agent's working context at all times so it actually fires (current Gaia failure mode: protocols fade in long sessions).
- Evaluated at session time by full agents — initially. Narrow protocol evaluation TBD.
- **Location:**
  - Shared across all agents (memory protocols only for v3.0) → `core.md`
  - Agent-specific (e.g. mantra surfacing for Gaia) → that agent's `identity.md`
- **No hard cap** on protocol count for now. Proliferation handled later via housekeeping/healthcheck warnings.

---

## Operating principles — new in v3 — *stable*

- **Agents self-manage their vault.** A Primarch owns and may modify any file in its working directory, including `identity.md`. No bootstrap-only restriction.
- **Learnings management is agent-decided** (initially). Each Primarch chooses how to handle accumulated learnings/blind spots. To be reviewed after v3.0.

---

## Review after v3.0 — backlog

Items explicitly deferred but worth revisiting once v3.0 is shipped:

1. `archive.md` — bring back if `history.md` proves insufficient
2. `backlog.md` — extract from `state.md` if state bloats
3. `character.md` (or replacement under a better name) — separate file for personality / values / blind spots / learnings
4. `index.md` (agent resource map) — design alongside registry/resources domain
5. Note Authoring protocol
6. Agent Messaging protocol
7. Backlog protocol
8. Index Maintenance protocol
9. Specialized Notes meta-protocol
10. Three-Way Dev Workflow protocol
11. "Log tooling failures to Alex" principle
12. File Ownership protocol — review whether the new self-manage default is sufficient
13. Tier between servitor and narrow
14. Vocabulary cleanup: functions / programs / routines / triggers / skills disambiguation
15. P0 scope confirmation across the 8 spec domains
16. Renaming "subagents" domain → "agents" (Gaia proposal)
17. Session-end protocol design (deferred from boot session)

---

## Decisions on protocols (refined) — *stable*

Expanded definition:

- **Not a function.** A protocol is not input → process → output.
- **Free form, small** — at least initially. May be a complex composition of definitions, procedures, triggers, circumstances, rules, constraints. **No common structure imposed** (a structure for protocols would itself be a protocol-for-protocols — premature).
- **May have subprotocols or be part of a group.** "Memory protocols" can refer to the whole or to a part (e.g., "session update protocol"). Both usages are valid; no hard ontology. When André or an agent says *the* memory protocol, treat it as the whole; *a* memory protocol = a piece of it.
- **Implicit vs explicit, on a spectrum.** The boot sequence is a protocol but lives in `boot.md`, not in a "protocols" section — it is **categorically implicit**. Memory protocols are **explicit**. "Protocols" without qualifier typically means explicit ones.
- **May live in their own file** when sufficiently complex. Not all protocols inline into `core.md` or `identity.md`. Goal: agent must remain aware of the protocol at all times, including in long sessions. Whether that requires inlining or pointer-with-summary is a per-protocol judgment.
- **Not registered.** Protocols don't appear in the registry (resolved before registry domain is defined).

Location rules unchanged: shared → `core.md` (or referenced file in `2 Agents/`); agent-specific → `identity.md` (or referenced file in `2 Agents/[Primarch]/`).

---

## Decisions on functions — *stable*

- **Functions are not skills.** A skill is agent-agnostic and ecosystem-agnostic — typical AI-provider sense. A function only makes sense for a particular agent and/or within the André Agentic Ecosystem (AAE).
- **Arbitrarily long.** Functions can be large; do not load them by default.
- **Index in registry, body in file.**
  - Agent-specific functions: indexed in the agent's part of the registry; body in `2 Agents/[Primarch]/functions/[name].md`.
  - System-wide / shared functions (e.g., housekeeping): indexed in the shared part of the registry; body in `2 Agents/functions/[name].md`.
- **Awareness without loading.** Agent must know its functions exist (via registry index entry); body is read on demand when invoked.

**Deferred** (vocabulary cleanup post-v3.0): programs, projects, routines, tasks. Captured in Review backlog #14.

---

## Decisions on registry — *stable*

### Purpose

A centralized place where agents know what exists nominally, while preventing environment-specific stuff from being scattered across agent files. **Cross-machine setup test:** to set up the AAE on another machine, the only file(s) that should need editing are in the registry.

For v3.0, scope is **this machine only.** Cross-machine portability is a property the design preserves, not a v3.0 deliverable.

### Classification axes (used during inventory)

- **Ownership:** agent-owned | shared by agents | system | external
- **Environment-dependence:** env-dep | env-indep
- **Resource type:** dir | file | repo | system | credential | concept
- **Dynamism:** static | slow | dynamic
- **Cardinality:** single | per-agent | per-X
- **Loadiness** *(decisor for placement):* always | boot | on-demand | never-load

### Out of registry scope (decided)

- **Metasystem files** (this file, specs.md, templates) — live in `metasystem/`, not registry.
- **Agent standard files** (boot.md, identity.md, state.md, sessions.md, history.md, notes/) — owned by each agent, not registry.
- **Agent dir structure** — described once in `core.md`, not registry.
- **Root / vault / ecosystem structure** — `core.md`.
- **`environment.md`** — free-form description of the current machine; lives at `2 Agents/environment.md`; loaded at boot in **both full and narrow** modes; not part of registry.
- **Comm channels** — deferred from registry for v3.0.
- **Harnesses** — deferred from registry for v3.0; agent doesn't choose harness, the human does.

### Topology — two-tier, mandatory-load anchors

```
2 Agents/
  registry/
    metaindex.md       — shared mandatory; pointed from core.md, always loaded
    paths.md           — files & dirs; on-demand
    repos.md           — repos; on-demand
    tools.md           — MCPs and configs; on-demand
    enablers.md        — systems (Python, Node, services); on-demand
    functions.md       — nominal index of shared functions; on-demand
    [agent].md         — per-Primarch mandatory; pointed from each identity.md, always loaded
```

**Two-tier rule:**
- `core.md` mandates reading `metaindex.md`.
- Each `identity.md` mandates reading its own `[agent].md`.
- This way no other index files are needed across the vault.

**`metaindex.md`** — implicit protocol explaining the registry at a high level. Contains essential/mandatory resources inlined (Primarchs, vault path, agent ontology summary, servitor definitions summary). Plus a high-level index of optional/additional resources (paths.md, repos.md, tools.md, enablers.md, functions.md).

**`[agent].md`** — canonical (every Primarch has one, may be empty/placeholder). Complements `identity.md`. Mixed-type content grouped by agent rather than by resource type — paths, functions, tools that the agent needs to know exist. May overlap with content in `identity.md` for important items. Filename lowercase (`gaia.md`, `alex.md`, …) consistent with Unix conventions; Primarch name in prose stays capitalized.

**`functions.md`** — nominal index only (name + 1-line description + path). Bodies live in `2 Agents/functions/[name].md` (shared) or `2 Agents/[Primarch]/functions/[name].md` (agent-specific).

### Env-dep marking

- Single-machine focus for v3.0 — no environment branching needed yet.
- **Frontmatter `env: dependent | independent`** on each registry file. Cheap to add now; pays back when migrating machines.
- No separate dirs/files for env-dep vs env-indep.

### Deferred to post-v3.0 (registry slots)

- `harnesses.md`
- `knowledge.md`
- `skills.md`
- `capabilities.md`
- Comm channels in registry
- Servitor definitions in registry (inlined briefly in `core.md` for v3.0; full details in shared function `spawn.md`)

### Resolved earlier registry questions

- `env.yaml` exists at vault root and is the de-facto seed of environment registry; for v3.0 single-machine focus, registry takes over and `env.yaml` becomes optional/legacy.
- Cardinality (axis 5) accepted as useful for placement decisions.
- Skills tracked nominally in `skills.md` post-v3.0; out of scope for v3.0.
- Credentials = pointers only (env vars / OS keychain / etc.), never values.
- `root/` migration timing: out of scope for v3.0; complete after.

---

## Decisions on spawn — *stable*

### Ownership rule

- **Every spawn has an owner.** Owner is André (human) or a full Primarch. Narrow agents do **not** spawn by default — only if the task explicitly requires it.
- Servitors always have an owner; output is routed to the owner's inbox in async mode, or returned via stdout in sync mode.

### Spawn use cases (v3.0 scope)

| UC | Use case | Owner | Mode | Mechanism | Notes |
|---|---|---|---|---|---|
| UC1 | Domain-specific code dev (narrow) | full Primarch | async | Write `AGENTS.md` + `CLAUDE.md` (one-line ref) into target repo | Picked up by VS Code Copilot (Claude model). No permission preset needed (repo-scoped). **Future:** track spawns globally. |
| UC2 | Agents enacting preset/dynamic functions (Gaia Capture, Gaia Weekly, ...) | André | manual | André spawns new session in Cowork project | Full vessel may produce inline initial prompts on demand for André to paste into a fresh session. No spawn function involvement at session-creation time. |
| UC3 | Background preset functions ([Agent] Housekeeping, Doctor Healthcheck) | system (cron-like) | async | CC CLI subprocess (or Cowork native scheduler when available) | **Cron mechanism deferred to post-v3.0.** |
| UC4 | Fresh subdomain long-running full sessions (Ben real estate research) | André | manual | André spawns new session in Cowork project/agent | Same as UC2 — manual, no spawn function. Inline initial prompts on demand. |
| UC5 | Inter-agent sync comms (delegation / escalation / question) | full Primarch | sync or async | Spawn MCP tool in `aae-mcp` invoking CC CLI | The genuinely new piece for v3.0. **Qualification of delegation/escalation/question is intentionally open** — categorization will emerge from use; spawn.md provides 1-line guidance per type without enforcement. |

### Spawn mechanism (v3.0)

Multiple paths supported, owner- and use-case-dependent:

- **Human-driven manual** (UC2, UC4) — André spawns directly via harness. No MCP involvement at spawn time.
- **Inline initial prompt generation** (UC2, UC4) — full vessel of a Primarch can produce a self-contained initial prompt as text output on request, for André to paste into a fresh session manually.
- **Agent-driven via file write** (UC1) — full Primarch writes `AGENTS.md` + `CLAUDE.md` in a target repo. Spawn happens when VS Code Copilot opens the repo. No MCP tool invocation.
- **Agent-driven via MCP** (UC5) — full Primarch calls the spawn tool in `aae-mcp`, which wraps Claude Code CLI.
- **Background scheduled** (UC3) — cron-like mechanism, deferred to post-v3.0.

**Direction:** specialized spawn MCP (long-term) so subagents can be transactionally managed and tracked globally. Not blocking for v3.0.

### Initial prompt assembly

- **Templates inlined in `2 Agents/functions/spawn.md`.** Full Primarch reads `spawn.md`, follows the template with inline placeholders, produces the initial prompt.
- One template for narrow, one for servitor. **Less is more** — keep templates minimal.
- No separate template files; no per-spawn artifact stored by default.

### Tracking

- **No specialized registry of active narrows/servitors for v3.0.**
- Owner tracks spawned subagents in its own context or `state.md` if the work merits it.
- On servitor return, owner can refresh awareness from the inbox message itself.

### Sync vs async invocation

Spawn carries a mode:

- **Sync (fire-and-wait).** Owner blocks on the subagent. Output returns via terminal/stdout.
  - **Hard timeout: 5 minutes** (inlined/hardcoded in `spawn.md`, not configurable per spawn for v3.0).
  - On timeout: owner receives an explicit error explaining the spawn continues running and the result will be saved to inbox as async. Subagent is not informed of timeout — it finishes naturally and writes to inbox.
- **Async (fire-and-forget).** Owner does not block. Output goes to owner's inbox.

Mode applies to both narrows and servitors. Default per call site is documented in `spawn.md`.

### Narrow protocol inheritance

- Narrow inherits **all `core.md` protocols** (essentials): memory protocols, messaging protocol, note authoring (when reintroduced).
- Narrow does **not** inherit agent-specific protocols (e.g., Gaia mantra surfacing). Those are full-mode only.
- Resolves Open/TBD #2.

### Concurrent state writes (resolved)

- **By convention only:** assume two full instances of the same Primarch will not write `state.md` concurrently. André manages this operationally.
- No locking, CRDT, or technical mitigation in v3.0.
- If real conflict appears, fallback is sessions-append-only writes from the second full + reconciliation by the first. Not implemented; emergency path.
- Resolves Open/TBD #1.

---

## Decisions on messaging protocol — *stable*

Reintroduced from the post-v3.0 review backlog into v3.0 because spawn async + sub-agent comms depend on it.

### Inbox structure

Each Primarch has:

```
2 Agents/[Primarch]/
  inbox/              — unread messages
  inbox/archived/     — processed messages
```

Messages are markdown files. Filename convention: `YYMMDD-HHMM-from-subject.md` (or similar, decided per agent).

### Frontmatter (immutable metadata)

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
- Agent appends a status block at the end of the file when it processes the message:
  ```
  ---
  read: <ISO datetime> by <Primarch>
  [optional: brief comment / action taken]
  ---
  ```
- Once fully processed, agent **moves the file** from `inbox/` to `inbox/archived/`. Filesystem location = state.

### André's inbox

- André shares Gaia's inbox (`2 Agents/Gaia/inbox/`).
- Messages addressed to André use `to: André` in frontmatter.
- **Gaia must not touch messages with `to: André`** — does not read, does not append, does not archive. André archives at his own discretion.
- This rule is part of the messaging protocol in `core.md`.

### Append format on read

Protocol in `core.md` specifies the exact append format (see above). Without a fixed format each agent invents its own and the protocol drifts.

---

## Decisions on MCP tooling — *stable*

### Inventory before cleanup

- `filesystem` (Anthropic-shipped, npm) — 16 paths whitelisted; kept as-is.
- `whatsapp-mcp` (local Node + Baileys + PM2) — 4 tools; **drop for v3.0**, can be reactivated.
- `the-vault-2.1` (local Python custom) — 21 tools across git/shell/run/python/node/notes.

### Cleanup decisions

- **Drop whatsapp** for v3.0 — reactivatable when needed.
- **Drop git** entirely — commits done manually by André (single-daily-commit principle).
- **Integrate shell + run** into a single `shell` tool, **full capability (no allowlist)** for v3.0. Scoping with 3rd-party MCP can be evaluated later.
- **Keep `move_file` and `delete_file`** as dedicated tools — created originally because the 3rd-party `filesystem:move_file` had Windows case-insensitive rename issues.
- **Keep `now()`** — cheap and useful.
- **Soft-remove `python_tool` and `node_tool`** — deregister from `server.py`, keep code in repo (move to `_attic/` or `disabled/`). Reactivatable in ~5 minutes if needed.
- **Keep `notes.py` (11 tools)** — frontmatter + section operations have no equivalent in `filesystem`.
- **Integrate spawn tooling** into `the-vault-2.1` (don't create a separate spawn-mcp). The empty stub at `agents/repos/spawn-mcp/` is dropped.
- **Rename `the-vault-2.1` to `aae-mcp`** post-v3 (when scope clearly broader than vault ops). Not a v3.0 task.
- **Topology direction:** integrate rather than break apart. New servers only when category is genuinely different (e.g., comm channels MCP — WhatsApp, email, inbox bridge — post-v3).

### Env-dependence in vault-mcp config

For cross-machine portability (post-v3), `config.py` constants `VAULT_PATH`, `SHELL_ALLOWED_DIRS`, `SHELL_WORKING_DIR`, `PYTHON_EXE`, `PYTHON_VENVS_DIR` should move out of code into a config file the registry knows about. **Not a v3.0 deliverable** — single-machine focus.

### Spawn permissions (preset during spawning)

Mechanism: full Primarch (owner) writes a `.claude/settings.json` in the working directory of the narrow/servitor before invoking it. Settings file specifies `permissions.allow` and `permissions.deny` lists per tool name. Done by `spawn.md` function as part of its template.

**v3.0 approach: profiles loose by default.** Don't over-specify; let permissions stay generally permissive for typical work. **One hard rule:** full shell access (no-allowlist `shell` tool) is restricted to **full vessels of Gaia or Alex only**. All other agents/modes get a scoped shell or no shell.

Profile names for spawn.md (loose definitions, refine in practice): read-only, notes-only, full-vault, full-machine (Gaia/Alex full only). Owner picks profile at spawn time.

A proper `authorizations.md` / `permissions.md` system to formalize who-can-use-what is **deferred to post-v3.0**.

Claude Desktop has no per-spawn granularity — profiles only meaningful for Cowork and Claude Code CLI spawns.

---

## Decisions on awareness axis — *stable*

Separate from loadiness. Loadiness = mechanism (where the file is + when it loads). Awareness = objective (does the agent know it exists, and how readily).

**Three levels:**

- **Inlined (I)** — body fully in an always-loaded file (`core.md` or `identity.md`). High context cost, slow fade.
- **Mandatory awareness (MA)** — short summary inline + reference to external file. Agent knows it exists and what it does. Medium cost, medium fade.
- **Findable (F)** — not in context; agent discovers by querying the registry. Zero cost; fades fully if the agent doesn't think to look.

**Application:**

- **Protocols** can be I or MA. Never F — a findable protocol is dead letter.
- **Functions** can be MA or F. Never I — inlining a function defeats the on-demand model.
- **Awareness can vary by agent.** A function may be MA for one Primarch, F for others. Default is F; specific agents promote to MA in their `[agent].md`.

---

## Decisions on principles vs protocols — *stable*

- **Principles:** shorter, always inlined, provide motivations / reasoning / *why* for everything else. No conditional trigger.
- **Protocols:** conditional behavior ("when X, do Y"). Trigger present.

Difference is the presence of a trigger. If the rule is unconditional and explanatory, it is a principle.

---

## Decisions on functions and protocols inventory — *stable*

### Principles

| # | Name | Loc |
|---|---|---|
| Pr1 | Self-managed vault | `core.md` |
| Pr2 | Agent-decided learnings | `identity.md` |
| (others) | inherited from current `core.md` principles section | `core.md` |

### Protocols

| # | Name | Awareness | Loc |
|---|---|---|---|
| P1 | Boot sequence (implicit — not listed in protocols section) | I | `boot.md` |
| P2 | Memory protocols (state read/write, sessions append, history off-limits) | I | `core.md` |
| P3 | Messaging protocol (inbox structure, frontmatter, read-and-archive, `to: André` rule) | I | `core.md` |
| P7 | Mantra surfacing | I | Gaia `identity.md` |
| P8 | Dormant surfacing | I | Gaia `identity.md` |
| P9 | Inbox check at boot | I | `core.md` |
| **P10** | **Refresh + drift detection** | **I** | **`core.md` + Project Instructions** |

**Dropped/merged:**
- P4 (spawn ownership) — folded into F1 spawn function inline.
- P11 (drift detection) — merged into P10.

### P10 — Refresh + drift detection (full text)

> **Refresh** — every ~N turns or when you sense drift:
> - Re-read `boot.md` (your orchestrator) to re-anchor identity, mode, and the load chain.
> - If drift confirmed: call `healthcheck` function.

Short, trigger-explicit, soft reboot. Lives in `core.md` and is duplicated in Project Instructions (the highest-fidelity location). Repetition is intentional.

### Functions — Shared (in `2 Agents/functions/`)

| # | Name | Awareness | Body location |
|---|---|---|---|
| F1 | spawn (includes ownership rule inline) | MA all agents | `2 Agents/functions/spawn.md` |
| F2 | note-authoring | MA all agents | `2 Agents/functions/note-authoring.md` |
| F3 | healthcheck | F (background-only; typed servitor concept on hold) | `2 Agents/functions/healthcheck.md` |
| F4 | housekeeping (single file, all routines) | MA all agents | `2 Agents/functions/housekeeping.md` |
| F5 | weekly-review | MA Gaia / F others | `2 Agents/functions/weekly-review.md` |
| F6 | agent-init (bootstrap new Primarch) | MA Gaia / F others | `2 Agents/functions/agent-init.md` |
| F7 | archive-thread (post-v3 if threads system survives) | F | TBD |

### Functions — Agent-specific (in `2 Agents/[Primarch]/functions/`)

| # | Name | Awareness | Loc of summary |
|---|---|---|---|
| AF1 | Gaia: thread-review | MA Gaia | Gaia `[agent].md` |
| AF2 | Cocoria: daily-ops-summary | MA Cocoria | Cocoria `[agent].md` |
| AF3 | Alex: mcp-deploy-pipeline | MA Alex | Alex `[agent].md` |
| AF4 | Apollo: weekly-fitness-update | MA Apollo | Apollo `[agent].md` |

### `functions.md` is the complete registry

- `functions.md` (in `registry/`) lists **every** function (shared and agent-specific), with: name, owner (shared / `[agent]`), awareness (MA per-agent / F), body location, 1-line description.
- **Overlap by design** between `functions.md`, `metaindex.md`, and each `[agent].md`. The registry is canonical and complete; the others are mandatory-awareness duplications for top-of-mind reminders.
- An **anonymous/implicit protocol note** at the top of `metaindex.md` explains this overlap is intentional.

### Placeholder dirs

- `2 Agents/protocols/` — placeholder; not used in v3.0 (all protocols inline in `core.md`/`identity.md`). Reserved for any future protocol that grows large enough to need its own file.
- `2 Agents/[Primarch]/protocols/` — same, per-agent.

---

## Decisions on boot orchestration and refresh target — *stable*

- **`boot.md` remains the sole orchestrator** (v2 approach kept). It carries the full load chain: `boot.md → core.md → identity.md → state.md → notes/index.md`. Neither `core.md` nor `identity.md` orchestrates loads.
- **`core.md` and `identity.md` add MA pointers** to registry files in v3 (a change from v2): `core.md` points to `metaindex.md`; `identity.md` points to `[agent].md`. These are awareness pointers, not load orchestration.
- **Refresh target is `boot.md`** — a soft reboot. Re-reading `boot.md` re-anchors identity and triggers re-loading the chain as needed.

---

## Decisions on agent self-awareness of structure — *stable*

v2's `system.md → Vault Scope` ("Reads by default" / "Reads on demand" lists) needs a v3 home. Decision:

- **Universal memory layout** (state/sessions/history/notes table) → `core.md`. Same for all Primarchs.
- **Per-agent file structure** (which files compose me, where my functions/notes/inbox live) → `identity.md`, in a section like "My files" or "My structure".
- The per-agent section enumerates concrete paths so the agent knows its own footprint without external lookup.

---

## Open / TBD (active design work)

1. **Subagents** in v3.0 vs v3.1. And whether subagent = the missing tier between servitor and narrow.
2. **Spawn MCP** — specialized spawn MCP for transactional subagent management with global tracking. Direction confirmed; design deferred.
3. **Cron mechanism for UC3** (background scheduled spawns) — Windows Task Scheduler + CC CLI vs Cowork native scheduler vs other. Deferred to post-v3.0.
4. **`authorizations.md` / `permissions.md`** — formal who-can-use-what system. Deferred to post-v3.0.

---

## Changelog

- 2026-05-01 — file created. Session 1 of v3 design captured: goals, approach, boot audit, terminology, agent modes, protocols.
- 2026-05-01 — major update: spec domains outline, file structure decisions (memory layout, file redistribution, path resolution), mode-specific initial prompt content, two new operating principles (vault self-management, agent-decided learnings), Review-after-v3.0 backlog consolidated. Vessel terminology confirmed.
- 2026-05-01 — boot decisions added: structure (per-agent slim, identity inline), load order per mode, memory write rules refined (state full-only, sessions append-only, narrow inlines sessions update protocol). Open/TBD #1 narrowed from "concurrent writes + narrow merge" cluster to "concurrent state writes" only. Sessions.md reclassified to on-demand at boot (deviation from briefing).
- 2026-05-01 — `agents.md` dropped from v3.0 entirely. No cold-boot fallback file. Path resolution simplified: "relative to vault root" with no anchor file; vault root established by harness configuration. Agent registry function deferred to the resources/registry domain.
- 2026-05-01 — protocols section refined (free-form, small, possible groups/subprotocols, implicit-vs-explicit spectrum, may live in own file, not registered). Functions section added (not skills, indexed in registry, body in `functions/` dir, agent-specific or shared). Registry section added as draft: purpose, four classification axes, working inventory, process. TBD #5 added (registry inventory + classification work).
- 2026-05-01 — registry section moved to *stable*. Two-tier topology decided: `metaindex.md` (shared, mandatory via core.md) + `[agent].md` (per-agent, mandatory via identity.md), plus on-demand `paths.md`, `repos.md`, `tools.md`, `enablers.md`, `functions.md`. v3.0 scoped to single machine; cross-machine preserved as design property. Loadiness added as classification axis #6 (decisor for placement). `environment.md` defined as free-form per-machine description, loaded at boot in both full and narrow, lives at `2 Agents/environment.md`, not part of registry. Servitor definitions inlined briefly in `core.md` plus shared `spawn.md` function. Harnesses, comm channels, knowledge, skills, capabilities deferred from registry. TBD #5 replaced (inventory work done) with new TBD #5 (spawn function design).
- 2026-05-01 — Layer 1 closed. Spawn section added (*stable*): every spawn has an owner; multiple mechanisms (human, MCP, file-write); templates inlined in `spawn.md`; no tracking registry for v3.0; sync mode with hard 5-min timeout falling back to async on inbox; narrow inherits `core.md` protocols only. Messaging protocol section added (*stable*) and reintroduced into v3.0 (was in post-v3.0 backlog): inbox + inbox/archived dirs per Primarch; immutable frontmatter; read = append status block + move file; André shares Gaia's inbox with `to: André` rule. TBDs #1 (concurrent state writes) and #2 (narrow protocol inheritance) and #3 (servitor I/O) and #5 (spawn function design) all resolved. Two new TBDs: subagents tier post-v3.0; spawn MCP design deferred.
- 2026-05-01 — Layer 2 (MCP cleanup) decided: drop whatsapp + git; integrate shell+run as full-capability `shell`; soft-remove python/node tools; keep notes.py; integrate spawn into vault-mcp; rename to aae-mcp post-v3. Awareness axis added (Inlined / Mandatory awareness / Findable), separate from loadiness, with rule: protocols never F, functions never I, awareness can vary per agent. Principles vs protocols distinction codified (principles = unconditional explanatory, protocols = conditional behavioral). Full functions/protocols inventory tabled with per-item awareness and locations. P4 dropped (folded into F1); P11 dropped (merged into P10). P10 refresh protocol finalized: target is `boot.md` (soft reboot), inlined in `core.md` and Project Instructions. `functions.md` registry is canonical and complete; overlap with `metaindex.md`/`[agent].md` is by design (implicit anonymous protocol noted at top of `metaindex.md`). Placeholder `protocols/` dirs created (system + per-agent). Boot orchestration confirmed: `boot.md` sole orchestrator (v2 approach kept); `core.md`/`identity.md` add MA pointers to registry files (new in v3). v2 `Vault Scope` content split: universal memory layout to `core.md`; per-agent file structure to `identity.md`. New TBD #3: spawn permission profiles for `spawn.md`.
- 2026-05-01 — Spawn use cases formalized (UC1-UC5 table). UC1 (file-spawned via AGENTS.md/CLAUDE.md for VS Code Copilot) + future global spawn tracking noted. UC2/UC4 (manual Cowork sessions) — added 'inline initial prompt generation' as a spawn variant: full vessel produces self-contained prompt text for André to paste manually. UC3 (background) cron mechanism deferred post-v3.0. UC5 (inter-agent sync) — delegation/escalation/question qualification explicitly kept open. Permission profiles loosened: loose by default, with one hard rule — full shell access restricted to Gaia/Alex full vessels only. Formal authorizations.md/permissions.md deferred to post-v3.0. TBD #3 (spawn permission profiles) replaced with TBD #3 (cron mechanism for UC3) and TBD #4 (authorizations.md formal system). Andre Mensagem to Alex with the AAE v3 tooling brief sent. Next step: consolidate specs for André's review, then test new tooling by spawning v2→v3 migration agents.
