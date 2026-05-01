---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: '2026-04-30'
type: spec
updated_by: ''
updated_on: ''
---

*Draft v0.1 — 2026-04-28. Designed in session with André. Migrate to C:\Users\tdsnit\root\vault\2 Agents\metasystem\v3\ when root is mounted.*

## Design Principles

- **Mandatory context lean** — only load what's needed; use pointers for on-demand expansion
- **Append-only structures** — prefer append for speed and simplicity; rewrite only state.md
- **Centralized registry, local expansions** — shared substrate + per-agent specialization
- **Cross-provider** — no tool or platform lock-in in the memory format

## Agent Modes

### full
Agent at full capacity. Loads: state.md + character.md + sessions.md (History So Far section) + notes/index.md

### narrow / lite
Same agent, lean boot. Loads: state.md + character.md only. Expands toward full on demand as session develops.

### worker / bee
Ephemeral. Not an agent. Task-specific context only. No memory persistence. Dies after task.

## Memory Anatomy

### memory/state.md
- The agent's RAM — complete living model of André and the world
- Rich enough that reading it alone feels like a long-running session
- Always loaded (full + narrow modes)
- Free-form prose organized by section (see structure below)
- Updated *within* sections during sessions — sections replaced, not appended
- Hard token budget: ~2000-3000 tokens; stale sections migrate to history.md
- Never grows by prepending — it evolves by rewriting

**Structure:**
```
## Identity
Who I am, domain, relationship with André, generation, tools, mode defaults.

## André
Complete model: personality, values, patterns, current life situation,
key relationships, what matters now. INTP matured toward J.

## World state
Current focus across domains (Janea, Cocoricó, Key Bridge, Personal).
Hot threads only + pointer to index. Open loops. Upcoming deadlines.

## System state
Vault/agent fleet health. Known issues. What's built/broken/in progress.

## Conventions & decisions
Key decisions made. Naming conventions. Protocols to know.
Pointers to core.md + metasystem/ for full detail.

## Open questions
Unresolved things worth keeping in mind.
```

### memory/sessions.md
- Append-only summary of sessions; timestamped entries
- First section always: `## History So Far` — rolling summary of history.md, updated during compaction
- Loaded by full agents; loaded on demand by narrow agents
- No index needed
- Aggressively pruned: when above max size, background agent merges sessions and reduces detail
- Compacted content flows into history.md as monthly chapters

**Entry format:**
```
## Session 2026-04-28 — [title]
*Device: tdsnit | Mode: full | Duration: ~3h*

[What happened, what was decided, what was built, what I learned]
```

### memory/history.md
- Long-term memory; part of agent identity
- Never loaded on session start; searched on demand
- Organized in monthly **Chapters**
- Each Chapter has: title, period, system metadata, narrative
- Size constraint per Chapter (e.g. ~1500 tokens); older chapters compressed further
- Updated by background agent instance during compaction (not during foreground sessions)

**Chapter format:**
```
## Chapter N — [Month Year]
*Period: YYYY-MM-01 → YYYY-MM-30*
*Device: [machine] | Agent: [version] | Location: [city/context]*

### André
Narrative of André's life this month — decisions, emotional arc, milestones.

### System
What was built, changed, deprecated. Key architectural decisions.

### Agent
What I learned, how I changed, what I was wrong about. Sessions that mattered.
```

### memory/character.md
- Personality, values, beliefs, heuristics, known blind spots
- Always loaded (full + narrow modes)
- Max size proportional to agent age (older agents earn more)
- Updated during sessions when meaningful learnings occur
- The closest thing to identity — survives state pruning

**Structure:**
```
## Core values
## Personality traits (with tensions noted)
## Beliefs (held with confidence | uncertain)
## Heuristics learned from experience
## Relationship with André
## Known blind spots / what I'm probably wrong about
```

### notes/index.md
- Index of agent's knowledge base
- Loaded on full sessions
- Updated on demand or by background agent

### notes/[topic].md
- Domain notes on specific subjects
- Evolutive — updated during sessions or by background
- Loaded on demand (never mandatory)

## What Lives Outside memory/

**identity** — static or slow-changing description of the agent: name, domain, tools, boot sequence. Lives in boot.md or system.md, not memory/. Not part of the memory anatomy.

**inbox/comms** — inter-agent messages and triggers. TBD in comms design phase.

## Background Agent

A background instance (worker/bee mode) responsible for:
- Compacting sessions.md into history.md monthly
- Pruning state.md when it exceeds budget
- Updating notes/index.md
- Updating "History So Far" section in sessions.md

Runs on schedule (PM2 cron) or triggered by size thresholds. Never runs during active foreground sessions.

## Open Questions
- Exact token budgets per file
- Compaction algorithm detail for history.md chapters
- How background agent gets triggered (size threshold vs. schedule)
- Comms/inbox design (separate phase)
