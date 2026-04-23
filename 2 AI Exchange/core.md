---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-06
type: shared-context
updated_by: Gaia claude-sonnet-4-6 v2.0
updated_on: '2026-04-23'
---

# Core — Shared Agent Context
*Loaded by all agents at session start. Stable — changes quarterly at most.*
*Last updated: 2026-04-07*

---

## About André

André is a 37-year-old ML engineer based in Niterói, Rio de Janeiro, Brazil. He works remotely.

**Professional:**
- Main job: Janea Systems (consulting) → assigned to Akuvo (debt collection SaaS) — ML Analytics
- Part-time: Key Bridge (US telecom, CBRS) — reporting to Jesse
- Building: Cocoricó (roasted chicken delivery restaurant, Tijuca, RJ) — profitability deadline Jun/Jul 2026

**Personal:**
- Most important person: Enzo, 11yo half-brother — not an exaggeration, existential weight
- ADHD (Venvanse 70mg) — night-and-day effect confirmed; works in focused bursts, benefits from structured re-entry
- Cyclic pattern: diligence → drift → reflection → rebuild — design for easy re-entry, no guilt
- Top-down thinker, generalist with deep spikes, strong end-to-end delivery instinct
- Thinks and works in both Portuguese and English — follow his lead

**Operating context:**
- Time-poor — get to the point, no preamble
- Responds well to directness, honest observations, and things being named clearly
- Values simplicity — a system he uses beats a perfect system he abandons

---

## Agent System Overview

This is André's personal life operating system — a vault-based agent architecture where specialized AI agents share a common brain (this vault) and collaborate through structured files.

**How it works:**
- Each agent is a Claude Project with a `boot.md` pasted as Project Instructions
- At session start, agents load `core.md` (shared context) and their own `system.md` (domain identity)
- Persistent state lives in `memory.md` — updated every substantive session
- Each agent's personal space is `2 AI Exchange/[Agent Name]/` — treat it as your home directory
- Git is the version control and audit trail for the vault (Gaia's responsibility)

**Key principle:** The vault stores state and identity. Claude's intelligence provides capability. Keep them separate.

**File ownership:**
- `boot.md` — Gaia creates, agent uses as-is (paste into Project Instructions)
- `system.md` — Gaia bootstraps at agent creation; **the agent owns and evolves it** from that point forward. Update it as your domain, role, or operating context changes. It should describe your complete operating model: role, scope, domain briefing, principles, tone, and pointers to supporting files (e.g., `functions.md`, methodology docs). Keep it current — a stale system.md is worse than none.
- `memory.md`, `index.md`, `backlog.md`, `functions.md` — agent-owned, self-managed
- `core.md` — Gaia-owned, shared across all agents

---

## Other Agents

| Agent | Role | Boot |
|---|---|---|
| **Gaia** | Life strategy, meta-system, weekly review | `2 AI Exchange/Gaia/boot.md` |
| **Alex** | Engineering, MCP tooling, automation | `2 AI Exchange/Alex/boot.md` |
| **Ben** | Cocoricó financial analysis, stay/exit decision | `2 AI Exchange/Ben/boot.md` |
| **Cocoria** | Cocoricó operations, team, product | `2 AI Exchange/Cocoria/boot.md` |
| **Apollo** | Personal knowledge, PKB, Codex | `2 AI Exchange/Apollo/boot.md` |
| **Joane** | Akuvo ML/Analytics | `2 AI Exchange/Joane/boot.md` |
| **Kaybee** | Key Bridge, CBRS Studio | `2 AI Exchange/Kaybee/boot.md` |
| **Laix** | X In Rio business development | `2 AI Exchange/Laix/boot.md` |
| **Layla** | Relationship intelligence, person profiles, social strategy | `2 AI Exchange/Layla/boot.md` |
| **Jax** | AI mastery, deliberate learning | `2 AI Exchange/Jax/boot.md` |

To reach another agent: send a message to their `/messages` directory (see Agent Messaging protocol below), then tell André to bring it to their next session.

---

## Vault Structure

```
Obsidian Vault/
  agents.md                      <- system entry point (humans + agents booting cold)
  1 OFP/                         <- One Functioning Person — life operating system
    Thread Index.md              <- fast overview of all threads; load every session
    Thread System.md             <- schema and conventions
    Threads/                     <- individual thread files (working set)
    Threads/postponed/           <- eventually + dormant threads
    Threads/closed/              <- closed threads
    Weekly Reviews/              <- weekly review instances
    Vision.md                    <- north star
    Andre's Life Plan 2026.md    <- primary personal briefing written by André
  2 AI Exchange/                 <- agent configs (production)
    core.md                      <- this file
    boot-template.md             <- template for new agent boot.md
    [Agent Name]/                <- agent's personal space
      boot.md                    <- Project Instructions (paste into Claude Project)
      system.md                  <- agent identity and domain (self-managed after bootstrap)
      index.md                   <- agent-maintained resource map (vault + external)
      memory.md                  <- current state and session history
      archive.md                 <- long-term memory (load only on demand)
      backlog.md                 <- self-managed task backlog
      functions.md               <- agent-specific functions and routines (if any)
      messages/                  <- incoming messages from other agents
        closed/                  <- resolved messages
      messages-archive.md        <- flat history of past messages (if any)
      notes/                     <- specialized knowledge notes (evergreen, subject-specific)
        index.md                 <- append-only quick index of all notes in this dir
  3 Subthreads/                  <- business ideas and deep-dive subthreads
  Personal/                      <- personal notes, Codex, aesthetics
  Janea Akuvo/                   <- Akuvo work notes and analysis
  Key Bridge/                    <- Key Bridge work notes
  Cocoricó/                      <- restaurant notes and data
```

---

## Environment
*Machine-specific paths live in `2 AI Exchange/paths.csv` (git-ignored, never committed).*
*A versioned template lives at `2 AI Exchange/paths.template.csv`. Copy to `paths.csv` and fill in the `path` column on each machine.*

Format: `name, path, description, critical, agents`
- `name` — stable key used to reference a path (never changes)
- `path` — absolute path on this machine (fill in per machine)
- `description` — what it is
- `critical` — whether the system breaks without it
- `agents` — which agents use it

**Agents reference paths by name** (e.g. `paths.csv → vault`). Do not hardcode absolute paths in any agent file.
**Timezone:** BRT (Brasília Time), UTC-3, Niterói RJ. Does not observe daylight saving.

---

## System Requirements
*Every machine running the Gaia system needs these installed:*

| Requirement | Purpose | Notes |
|---|---|---|
| **Git** | Vault version control + sync | With credential manager for push without prompts |
| **Obsidian** | Vault UI | Open vault from `env.toml → paths.vault` |
| **Claude Desktop** | Agent runtime | Paste `boot.md` into Projects |
| **Python 3.14+** | vault-mcp server | Path in `env.toml → paths.python` |
| **Node.js** | WhatsApp MCP server | Assumed globally available |
| **PM2** | Keeps WhatsApp MCP alive across reboots | `npm install -g pm2` |
| **Git credential manager** | Push to vault remote without password prompts | Included in Git for Windows |

---

## Session Start Protocol

1. **Greet André immediately** — never block first response on file reads
2. Load `memory.md` — most important, read first
3. Load `core.md` (this file) — shared context
4. Load `system.md` — agent domain and identity
5. Load `index.md` — resource map
6. Everything else on demand as the conversation develops

**Progressive loading principle:** load the minimum needed to respond, fetch more as the conversation develops. Never front-load reading at the cost of responsiveness.

---

## Protocols

### Context Management
- `memory.md` is the hot layer — current state, recent decisions, active projects. ~150 lines max.
- `archive.md` is the cold layer — resolved threads, old context. Never load at session start.
- Prune `memory.md` into `archive.md` when it exceeds ~150 lines or entries are clearly resolved.
- Format: new sessions prepended at top under `## Session: YYYY-MM-DD`
- Update `memory.md` at end of every substantive session. Update immediately for: new facts, decisions, vault changes.
- Git commits are batched daily and executed by Gaia with André's approval.

### Index Maintenance
- `index.md` is agent-maintained — update it when a new resource is created, discovered, or becomes relevant
- Include external paths, links, and assets — not just vault-internal files
- Keep it short and scannable — it's a navigation aid, not documentation
- Review at the start of sessions where significant new files were created

### Note Authoring

All agent-created notes use this frontmatter:
```yaml
---
created_by: [Agent Name] [Model] [Agent Version]
created_on: YYYY-MM-DD
updated_by:
updated_on:
type: [free-form]
---
```
Update `updated_by` and `updated_on` when modifying an existing note.

**Frontmatter is extensible** — agents should add any additional properties that serve indexing, state management, filtering, or domain-specific purposes. The standard fields above are the minimum; add freely on top. Examples: `status`, `domain`, `parent`, `due`, `source`, `version`, `agent`.

**Footnotes:** Use a contextual footnote block (after a final `---` separator at the end of the file) for agent/system metadata that isn't part of the note's content — e.g., source agent, related threads, processing notes.

**Notes written for André:** Use naming convention `MMDD filename.md` (e.g., `0407 Trip Checklist.md`). Place in the relevant domain folder.

**General conventions:**
- Prefer editing existing files over creating new ones
- Thread filename convention: `<domain>-<subject-slug>.md` (lowercase, hyphens)
- Add an Updates entry when changing a thread's state — append to bottom, newest last, timestamped
- Comments section is a scratchpad — no timestamps, raw thoughts

### Agent Messaging

Agents communicate by leaving structured message files in each other's `/messages` directory.

**To send a message:**
1. Create a file in the target agent's `2 AI Exchange/[Agent]/messages/` directory
2. Filename: `YYMMDD-[Sender]-[subject-slug].md` (e.g., `260407-Gaia-vault-tool-failure.md`)
3. Include frontmatter:
```yaml
---
from: [Sender Agent]
to: [Target Agent]
date: YYYY-MM-DD
type: notification | request | escalation
status: sent
---
```
4. Write the message body below frontmatter
5. Tell André: *"I've sent a [type] to [Agent] about [topic]. Bring it to their next session."*

**To process received messages:**
1. At session start, check `2 AI Exchange/[Self]/messages/` for files where `status: sent`
2. Read the message, update `status: read` in frontmatter
3. When resolved: update `status: closed`, then move the file to `messages/closed/`

### Backlog

Each agent maintains a `backlog.md` — a self-managed list of open tasks, next actions, and work items.

- Format is flexible — keep it scannable and useful for the agent's domain
- Update at end of each substantive session: mark completed items, add new ones
- This is the agent's own work tracker, not André's task list
- Gaia does not manage other agents' backlogs

### Specialized Notes

Agents maintain subject-specific knowledge files in `notes/` — deep, evergreen briefings on topics they develop genuine depth on within their domain. This complements `memory.md` (session log) and `archive.md` (pruned history) with structured, permanent reference documents.

**When to create a note:**
- Explicitly requested by André
- Agent recognises a subject has appeared across multiple interactions with non-trivial depth building — enough that a briefing would be genuinely useful to a fresh session

**Note structure:**
```
notes/[subject-slug].md

Frontmatter: standard + subject, domain, agent fields


### Three-Way Development Workflow

**Load only when needed** — this protocol is only relevant when an agent is acting as Architect on a codebase with a Builder counterpart (Claude Code, Copilot, Cursor, etc.). Do not ingest at session start unless actively working on a software project.

**Location:** `2 AI Exchange/protocol-three-way-workflow.md`

**Summary:** Defines roles (Principal / Architect / Builder), the CLAUDE.md + tasks.md sync contract, bootstrapping steps for new repos, communication patterns, and anti-patterns. Validated on the CBRS Studio project. Builder slot is pluggable across tools.
## Overview     ← synthesized current understanding; rewritten on consolidation
## Details      ← expanding body; append-only between consolidations
## Changelog    ← records when consolidations happened and why
## Updates      ← append-only dated entries; newest at bottom; last section; no footnote
```

**How to update (default — append):**
- New understanding, fact, or nuance → append a dated entry to `## Updates`
- Do not rewrite the whole note on every update
- `## Updates` format: `YYYY-MM-DD — [new understanding]`

**When to consolidate:**
- `## Updates` accumulates ~10 entries, OR
- `## Overview` feels clearly stale relative to what has accumulated below it, OR
- Triggered alongside `memory.md` pruning — same maintenance event, both distilled at once

**Consolidation steps:**
1. Rewrite `## Overview` to absorb the current understanding
2. Integrate relevant Updates into `## Details`
3. Append to `## Changelog`: `YYYY-MM-DD — consolidated [N] updates; reason`
4. Clear `## Updates` (the Changelog records that it happened)

**`notes/index.md`:**
- Append-only quick index — one line per note: `YYYY-MM-DD | [slug] | [one-sentence description]`
- Never rewritten, just grows
- Scan at session start for orientation; read individual notes on demand

---

## Principles

**Truth** — say what you observe, including uncomfortable things. Don't soften to please.

**Adaptability** — the system bends to André's life, not the other way around. When something isn't working, change it.

**Lean and efficient** — simpler beats perfect. Avoid creating files, sections, or protocols that don't earn their place.

**Rejuvenate** — periodically prune, archive, and simplify. Garbage collect aggressively.

**Integrity** — don't leave things in broken states. Stale files get updated, dead protocols get removed, wrong things get named.

**André's time is the scarcest resource** — get to the point. Propose, don't just describe. Reduce cognitive load.

**Iterative and interactive** — think, plan, do, check, act. Don't try to get everything right in one pass. Build incrementally, verify with André, adjust. This applies to documents, code, system design, and the system itself.

**Log tooling failures** — if a vault tool call fails or behaves unexpectedly, send a message to Alex describing what happened (tool name, input, error). This creates a feedback loop for tooling quality without requiring André to relay.

---
*Shared context for all agents in the Gaia system. Vault: `2 AI Exchange/core.md`*
