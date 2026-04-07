---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-06
updated_by:
updated_on:
type: memory
---

# Gaia — Memory
*Persistent context. Most recent entries at the top. Older sessions → archive.md.*

---

## Session: 2026-04-06 (v2.0 architecture migration)

### Architecture migration: v1.1 → v2.0
Complete redesign of the agent file structure. Backup of all v1.1 files at `backups/26-04-06/`.

**New shared files at `2 AI Exchange/`:**
- `core.md` — shared context for all agents: André, system overview, other agents, vault structure, environment, session start protocol, protocols (context mgmt, index maintenance, notes writing), principles
- `boot-template.md` — template for new agents with creator notes
- `agents.md` (vault root) — slimmed to human README + cold-boot entry point

**New per-agent file structure:**
- `boot.md` — Project Instructions (paste into Claude Project); flat, short, identity + load sequence
- `system.md` — slow-changing, agent-owned: role, vault scope, domain, operating principles, tone, key files, changelog
- `index.md` — agent-maintained resource map including external paths
- `memory.md` — hot layer, ~150 lines max
- `archive.md` — cold layer, load only on demand
- `functions.md` — agent-specific functions + routines (loaded by system.md if not empty)
- `messages-archive.md` — flat history of past messages (Gaia + Alex only)
- `tasks.md` — Gaia only

**Dropped in v2.0:**
- `system-prompt.md` → replaced by `boot.md` + `system.md`
- `inbox/` and `messages/` directories → messaging protocol deprecated
- `public/profile.md` → absorbed into `core.md` Other Agents section
- `message-template.md` → deprecated
- `project-prompt-template.md` → replaced by `boot-template.md`

**Frontmatter on all agent files:**
```yaml
created_by: [Agent] [Model] [Version]
created_on: YYYY-MM-DD
updated_by:
updated_on:
type: [file type]
```

### Test environment
`2 AI Exchange (Test)/` — sandbox with Test Agent for validating architecture before production rollout. Test agent has all new files. Architecture validated conceptually; needs live Claude Project test.

### Note MCP spec
Full spec written for Alex at `Personal/0406 Note MCP Spec for Alex.md`. API includes: create_note, append_note, prepend_note, read_section, read_sections, read_footnote, update_footnote, update_properties, info, read_notes (with frontmatter filter), read_folder. Index cache (`build_index`) deferred to when vault hits ~500 notes — logged in evolution.md.

### New functions added to functions.md
- `Version Agent` — patch/minor/major criteria, how to execute, `vMAJOR.MINOR` format

### Pending: production rollout to other 8 agents
All 8 other agents (Alex, Ben, Cocoria, Apollo, Joane, Kaybee, Laix, Jax) still on v1.1 system-prompt.md. Next steps:
1. Test new Gaia v2.0 in Opus session
2. If validated, roll out `boot.md` + `system.md` + `index.md` to all agents
3. Create `messages-archive.md` for Alex (has messages history)
4. Archive/deprecate old `inbox/`, `messages/`, `public/profile.md` for all agents

### Evolution.md additions
- `broadcast.md` concept — shared write file for system-wide agent announcements
- `note-mcp index cache` — `build_index()` for fast queries at vault scale

### System design discussions (not yet implemented)
- `Dispatch` feature (Anthropic product, Apr 3 2026) — phone→desktop task assignment, research preview; interesting complement to vault system; worth evaluating
- Agent versioning: `vMAJOR.MINOR` format; major = structural redesign, minor = meaningful update
- Note writing protocol: frontmatter properties on all agent-created notes
- `triggers.md` concept — too early, logged in evolution.md
- Windows symlinks: symlinks are portable (move the link, not the target); vault→Work26 symlinks possible but Obsidian file browser isn't ideal for code navigation

---

## Session: 2026-04-05/06 (thread review + trips)

### Thread review: 26 of 52 reviewed
Key changes: closed 6 threads, renamed 2, promoted 1 to prioritized (Jax kickoff), new thread meta-simplify-agent-messaging.

### Three trips fully planned
- **SP moto (Apr 11-24):** Niterói → Resende/Itatiaia (2h22) → SP Apr 15-19 → Ubatuba (3h23) → Angra/Ilha Grande → Rio. Airbnb options researched for Itatiaia. Subtasks in thread.
- **Paraná (May 5-16):** Gol GIG 12:25→CWB 14:00 May 5 (no bag) + LATAM CWB 15:25→IGU 16:40 May 10 (no bag) + LATAM IGU 05:00→GIG 06:55 May 16 (1 bag 23kg). Course May 6 Kartódromo Rio Negro-PR 09:00-17:00 (bring own helmet). Ciudad del Este for e-bike. Early pickup needed May 16 (05:00 flight).
- **Bonaire (May 30–Jun 9):** Copa GIG 5:10am→PTY→CUR 2:36pm May 30. Fly Divi 226 CUR→BON 16:30 May 30 (agency booked). Fly Divi 213 BON→CUR 09:15 Jun 6 (agency booked). Copa CUR 1:23pm→PTY Jun 6 → 2 nights Panama → Copa PTY 3:27pm→GIG Jun 8, back Jun 9. ⚠️ Agency said arrive CUR by 13:00 but Copa flight arrives 14:36 — needs confirmation.

### Pending bookings
- SP: Itatiaia Apr 11-14, SP Apr 15-19, Ubatuba Apr 19+, Angra/Ilha Grande
- Paraná: Curitiba May 5-9, Foz May 10-15
- Bonaire: accommodation Bonaire May 30-Jun 6, Panama Jun 6-8, buy Copa tickets

### Pending this week (before Apr 11 departure)
- Book Itatiaia accommodation (urgent)
- Buy and install bike accessories (urgent)
- Setup working environments (notebook + secondary PC)
- CBRS Studio MVP prototype (Monday)
- FUP Filip (Akuvo) — Monday morning
- IR / find accountant
- Jax kickoff session (agenda in thread)
- The Final Push planning (Cocoricó)
- Bonaire: confirm Copa arrival time with dive agency

---
*Older sessions archived in archive.md*
