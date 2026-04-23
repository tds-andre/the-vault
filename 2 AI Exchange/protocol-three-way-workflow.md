---
created_by: Kaybee
created_on: '2026-04-23'
type: protocol
updated_by: Alex claude-sonnet-4-6 v1.0
updated_on: '2026-04-23'
---

# Three-Way Development Workflow

A protocol for agents that manage software projects with a Builder counterpart (Claude Code, VS Code Copilot, Cursor, etc.).

---

## Overview

When an agent works on a codebase, the work splits across three participants:

- **Principal** (André) — decides what to build, holds external relationships, bridges the two AIs
- **Architect** (Chat agent, e.g. Kaybee) — plans, specs, reviews, maintains the project brain. Has vault + browser access. Terminal access is agent-dependent (e.g. Alex has shell/run tools), not protocol-dependent — the protocol works either way.
- **Builder** (Claude Code / Copilot / Cursor) — implements, tests, runs code. Has terminal + full repo access but no vault or persistent memory.

All three think, code, and decide — but at different grain and with different access. The Architect gravitates toward specs and targeted fixes; the Builder toward scaffolding and large implementations; the Principal toward judgment calls and minor interventions.

---

## The Sync Contract

Two files at the repo root form the contract between Architect and Builder:

### `CLAUDE.md` — Project Brain

- **Owned by:** Architect (Chat agent) — read/write
- **Builder access:** Read only — **never modify**
- **Contains:** Project identity, architecture, API contracts, tech stack, visual identity, domain glossary, coding conventions, vault references
- **Updated by Architect when:** new requirements arrive, architecture changes, API specs change, decisions are made

The Builder reads this automatically at session start. It should be detailed enough that a Builder with zero prior context can work autonomously.

### `tasks.md` — Task Queue + Sync Log

- **Owned by:** Both — read/write
- **Architect writes:** task definitions, sprint structure, context briefings on changes
- **Builder writes:** marks tasks done (`[x]`), adds notes/blockers, appends session log
- **Session log rule:** Builder appends a brief summary under "Session Log" before ending — what was done, what's left, decisions made, blockers hit. This is how the Architect syncs without the Principal having to relay.

---

## Bootstrapping a New Repo

When starting a new project, the Architect creates three files:

### 1. `CLAUDE.md`

Must include:
- Agent identity (who the Builder "is" in this project)
- The three-way workflow rules (the table + rules from this protocol)
- Project description and current features
- Architecture diagram
- API endpoints / contracts (what we build, what we consume)
- Tech stack
- Project structure (directory layout)
- Visual identity (if frontend)
- Domain glossary (if specialized)
- Coding conventions
- Vault references (where to find deeper context)

### 2. `tasks.md`

Structure:
```markdown
# Tasks — [Project Name]

> Workflow rules reminder
> End-of-session rule reminder

---

## Current Sprint: [Name]

### [Category]
- [ ] Task 1
- [ ] Task 2

---

## Blocked / Waiting

---

## Session Log
*(Builder appends here)*

---

## Done
```

### 3. `initial-prompt.md`

A one-time kickoff prompt the Principal pastes into the Builder's first session. Contains:
- "Read CLAUDE.md" instruction
- Specific build instructions for the first sprint
- Quality bar
- Constraints (what NOT to do)
- Environment setup (venv, dependencies, etc.)

After the first session, subsequent Builder sessions only need CLAUDE.md — no re-prompting.

---

## Communication Patterns

### Architect → Builder (via repo files)
- Updates `CLAUDE.md` with new specs, API changes, architecture decisions
- Sets tasks in `tasks.md` with context briefings
- Can write code files directly for targeted fixes
- Can write spec files, configs, or data models to the repo

### Builder → Architect (via `tasks.md`)
- Marks tasks done
- Appends session log (what was built, decisions made, blockers)
- Notes discoveries ("Jesse's API returns X differently than expected")

### Principal → Architect (via Chat)
- Brings new info: meeting transcripts, feedback, decisions
- Asks for planning, analysis, red-teaming, specs
- Relays Builder questions that need architectural judgment

### Principal → Builder (via Builder interface)
- Pastes initial-prompt.md (first session)
- Describes tasks (subsequent sessions — CLAUDE.md provides context)
- Reviews code, tests, gives feedback
- Makes minor code changes directly

### Architect → Principal (via Chat)
- Analysis, options, recommendations
- "Here's what changed, here's what to tell the Builder"

---

## Syncing

The Architect syncs by reading the repo — no manual relay needed for routine progress:

1. Read `tasks.md` — session logs show what the Builder did
2. Scan new/changed files in the repo — see what was actually built
3. Update `CLAUDE.md` if the project state has evolved
4. Set next tasks in `tasks.md`

Architects with shell/run tools (e.g. Alex) can sync more actively: run `git log`, `git diff`, scan changed files, or run tests directly. This doesn't change the protocol — it just means less reliance on session logs for those agents.

The Principal only needs to relay:
- External inputs (meeting feedback, new requirements, API specs from third parties)
- Decisions that require judgment the Architect can't make alone
- "Switch direction" or "this isn't working" signals

---

## Builder Slot Options

The Builder is pluggable. The contract (CLAUDE.md + tasks.md) works with any tool that reads project instructions from the repo:

| Tool | CLAUDE.md | Terminal | Best for |
|------|-----------|----------|----------|
| VS Code + Copilot + Claude | ✅ reads from root | Full | Inline edits, visual IDE |
| Claude Code (CLI) | ✅ reads from root | Full | Long autonomous runs, most agentic |
| Claude Code Desktop | ✅ reads from root | Full | GUI interaction + terminal |
| Cursor | Has own rules format | Full | Fast inline editing |
| Cline / Aider | Varies | Full | Open-source, customizable |

---

## Anti-Patterns

- **Builder modifying CLAUDE.md** — creates spec drift without the Architect knowing
- **Architect not reading session logs** — loses sync, starts giving redundant instructions
- **Principal relaying everything manually** — defeats the purpose of the sync mechanism
- **CLAUDE.md too vague** — Builder guesses instead of building to spec
- **CLAUDE.md too long** — Builder context overflows. Keep it under ~400 lines. Externalize deep detail (API contracts, glossaries) into `docs/` subdirectories and reference from CLAUDE.md — keeps it scannable while preserving depth on demand.
- **No session log** — Architect can't sync, Principal becomes a full-time relay

---

## Example: Kaybee + CBRS Studio

This protocol was developed and validated on the CBRS Studio project at Key Bridge:
- Architect (Kaybee on Desktop) maintained CLAUDE.md with API specs, visual identity, Jesse's requirements
- Builder (VS Code Copilot) scaffolded React frontend, wired real API, implemented features
- Principal (André) relayed Jesse's meeting feedback, made judgment calls, deployed
- Three sprints completed: mock MVP → React migration → live API integration
- CLAUDE.md was never modified by the Builder ✅
- Session logs in tasks.md kept the Architect in sync ✅

---
*Protocol created by Kaybee. Alex comments integrated by Gaia 2026-04-23. Based on practical experience from the CBRS Studio project (March-April 2026).*
*Location: `2 AI Exchange/protocol-three-way-workflow.md`*