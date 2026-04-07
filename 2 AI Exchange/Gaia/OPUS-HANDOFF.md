---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-06
updated_by:
updated_on:
type: context-dump
---

# Context Dump — Opus Handoff
*Temporary file. Created 2026-04-06 end of Sonnet session.*
*Read this first before memory.md if booting fresh with no prior runtime context.*
*Delete after first Opus session has loaded it.*

---

## What just happened (this session)

This was a very long session covering:
1. Thread review (threads 1-26 of 52) — status changes, closes, renames
2. Trip planning — 3 trips fully structured
3. Agent architecture v2.0 — full design and partial implementation

You are now Gaia v2.0. Your new files are live at `2 AI Exchange/Gaia/`.

---

## Your new file structure (READ THESE)

```
2 AI Exchange/Gaia/
  boot.md          ← your new identity (was: system-prompt.md)
  system.md        ← your domain detail (slow-changing)
  index.md         ← your resource map
  memory.md        ← current state (READ THIS)
  archive.md       ← long-term memory
  functions.md     ← your functions (updated: added Version Agent)
  tasks.md         ← your to-dos
  evolution.md     ← system ideas log
  messages-archive.md ← flat message history
  backups/26-04-06/ ← v1.1 files backed up here
```

Shared files (new):
```
2 AI Exchange/core.md          ← shared context for all agents
2 AI Exchange/boot-template.md ← template for new agents
agents.md (vault root)         ← slimmed entry point
```

---

## Immediate context: what was NOT finished

### Thread review
- **Reviewed: 26 of 52** threads (threads 1-26)
- **Remaining: threads 27-52** — continue next session
- Thread directory reorganization (`Threads/postponed/` + `Threads/closed/`) — decided but not executed yet (needs file moves)

### v2.0 rollout to other agents
- Only Gaia has been migrated to v2.0
- Other 8 agents (Alex, Ben, Cocoria, Apollo, Joane, Kaybee, Laix, Jax) still on v1.1
- Test Agent in `2 AI Exchange (Test)/` is the reference implementation
- After André tests this Opus session and approves, roll out to all other agents

### Pending commits
Nothing to commit right now — will be committed after this context dump is written.

---

## Key decisions made this session

### Architecture
- `boot.md` = Project Instructions (paste verbatim, excluding frontmatter)
- `system.md` = slow-changing, agent-owned domain content
- `core.md` = shared context (quarterly-stable), principles included as section
- `index.md` = agent-maintained, includes external paths/links
- Messaging protocol deprecated — no more `inbox/`, `messages/`, `public/profile.md`
- Frontmatter on all agent files: `created_by`, `created_on`, `updated_by`, `updated_on`, `type`
- Agent versioning: `vMAJOR.MINOR` — Version Agent function in functions.md
- Note MCP spec written for Alex — `Personal/0406 Note MCP Spec for Alex.md`

### Trips
- SP moto departs **Saturday Apr 11** (this coming Saturday — 5 days away)
- Paraná flights bought (Gol + LATAM × 3)
- Bonaire itinerary set via Copa + Fly Divi (agency booked internal flights)
- ⚠️ Copa arrives Curaçao 14:36 but agency said by 13:00 — needs confirmation

### Threads
- `professional-aprimoramento-ia-agentes` → prioritized, Jax kickoff this week
- Jax kickoff agenda captured in thread comments
- `meta-simplify-agent-messaging` → new active thread
- Several closed: core-package-refactor, inter-client-correlation, cocoroco-ouvir-audios, processos-financeiros, substituto-henrique

---

## Urgent this week (André leaves Sat Apr 11)

🔴 **Critical (before Saturday):**
- Book Itatiaia accommodation Apr 11-14 (top picks in `life-moto-trip-sao-paulo.md` Comments)
- Buy and install bike accessories
- Setup working environment notebook + secondary PC
- CBRS Studio MVP for Jesse (Monday)
- FUP Filip / Akuvo escalation (Monday)

🟡 **This week:**
- Confirm Copa arrival time with Bonaire dive agency
- Buy Copa tickets Rio→Curaçao May 30
- Jax kickoff session
- The Final Push planning (Cocoricó)
- IR / find accountant (one message)

---

## André's current situation snapshot

- Leaves for SP moto trip Apr 11 (5 days)
- Back from SP ~Apr 24
- Paraná May 5-16 (flights bought)
- Bonaire May 30-Jun 9 (internal flights booked, main tickets pending)
- Cocoricó: R$1,500/month rent just started, profitability deadline Jun/Jul 2026, "The Final Push"
- Akuvo: Escalation Feature Phase 3 is current work; capability building plan approved by Guarda
- Key Bridge: CBRS Studio MVP pending for Jesse
- Body: ~87kg target 70-80kg; orthodontic brackets (14 months); skincare products arriving Apr 15

---

## What to do first in the Opus session

1. Read this file
2. Read `memory.md`
3. Read `system.md` (your new v2.0 identity)
4. Read `index.md`
5. Greet André, confirm you're oriented
6. Ask him what he wants to work on — likely: test that you work correctly, then continue thread review or handle the urgent pre-trip items

---
*Delete this file after the first Opus session has successfully loaded it.*
