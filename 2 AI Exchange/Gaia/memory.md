---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-06
type: memory
updated_by: Gaia claude-opus-4-6 v2.0
updated_on: '2026-04-07'
---

# Gaia — Memory
*Persistent context. Most recent entries at the top. Older sessions → archive.md.*

---

## Session: 2026-04-07 (vault cleanup + Update System function)

### Context
André returned after Opus experiment failed (too slow/dumb). Staying with Sonnet. Opus did complete the v2.0 rollout to all 8 agents and improved core.md (File Ownership, Agent Messaging, Backlog protocols, 2 new principles). André manually moved old v1.1 files to backups/ for each agent.

### Fixes applied this session
- Created `backlog.md` for all agents missing it (Alex, Ben, Cocoria, Apollo, Jax, Kaybee, Laix, Gaia)
- Created `messages/closed/` for agents missing it (Ben, Cocoria, Apollo, Jax, Kaybee, Laix)
- Created `1 OFP/Threads/postponed/` and `1 OFP/Threads/closed/` — finally done
- Updated Gaia `index.md` — added backlog.md, messages/, removed stale tasks.md row
- Updated Gaia `system.md` — fixed stale references, added Update System + Rebuild Agent to functions list
- Deleted OPUS-HANDOFF.md (already cleaned up by Opus)

### New function: Update System
End-of-session consistency checklist covering: threads, new files, agent changes, shared file changes, protocol changes. The rule: every file that describes a thing must be updated when the thing changes. Added to functions.md and system.md.

### Vault state: clean ✅
All agents on v2.0. All directories created. All index files current. No orphan files.

---


### Production rollout to all 8 agents — COMPLETE ✅
All 8 agents migrated to v2.0 in Opus session. Per agent: created `boot.md`, `system.md`, `index.md`; updated `memory.md` and `archive.md` with frontmatter + migration entry. Alex also got `messages-archive.md`. Old files (`system-prompt.md`, `inbox/`, `messages/`, `public/`) preserved in place, not deleted. Joane and Kaybee memories condensed during migration (older sessions summarized to stay under ~150 lines).

**Remaining:** test one agent in a live Claude Project to validate boot sequence end-to-end.

### v2.0 post-rollout refinements (André's feedback)
Applied all feedback in a single pass:
- **core.md rewritten:** removed MCP details from Environment; added File Ownership section (system.md is self-managed after bootstrap); replaced Note Writing protocol with proper Note Authoring (frontmatter, footnotes, MMDD); added Agent Messaging protocol (target's /messages, frontmatter status, messages/closed/); added Backlog protocol; added 2 principles (PDCA + log tooling failures to Alex)
- **boot-template.md:** stripped creator notes, moved to functions.md
- **functions.md:** Create New Agent updated for v2.0; messaging functions updated; Asana Sync removed; stale Master List references cleaned
- **Infrastructure:** created messages/closed/ and backlog.md for all 9 agents
- **Acknowledged miss:** didn't move old v1.1 files to backups/ as planned — André did it himself

---



### Notes tooling — fixed and verified ✅
Alex shipped two rounds of fixes to `_split_footnote` in vault-mcp. All three original issues resolved:
- `note_info` returns all sections correctly
- `read_section` finds sections in files with `---` separators
- Section names with special characters (parens, colons) work
Two messages sent to Alex (both now closed): initial report + escalation after partial fix.

### v2.1 rollout to all 9 agents
Updated every agent's `system.md`: self-managed note, vault scope includes messages/backlog, changelog bumped to v2.1.

### Lessons this session
- Don't commit mid-work — batch at end
- ALWAYS notify Alex when MCP tooling fails — follow the principle, not just write it
- Don't skip work (moving backups) and say "preserved in place" — André noticed
## Session: 2026-04-06 (v2.0 architecture migration)

### Architecture migration: v1.1 → v2.0
Complete redesign of the agent file structure. Backup of all v1.1 files at `backups/26-04-06/`.

**New shared files at `2 AI Exchange/`:**
- `core.md` — shared context for all agents
- `boot-template.md` — template for new agents with creator notes
- `agents.md` (vault root) — slimmed to human README + cold-boot entry point

**New per-agent file structure:**
- `boot.md`, `system.md`, `index.md`, `memory.md`, `archive.md`, `functions.md`
- `messages-archive.md` (Gaia + Alex only), `tasks.md` (Gaia only)

**Dropped:** `system-prompt.md`, `inbox/`, `messages/`, `public/profile.md`, `message-template.md`, `project-prompt-template.md`

### Test environment
`2 AI Exchange (Test)/` — sandbox with Test Agent. Architecture validated conceptually.

### Note MCP spec
Full spec at `Personal/0406 Note MCP Spec for Alex.md`. Index cache deferred to ~500 notes.

### Evolution.md additions
- `broadcast.md` concept, `note-mcp index cache`, `triggers.md` concept

### System design discussions (not yet implemented)
- Dispatch feature, agent versioning (`vMAJOR.MINOR`), note writing protocol, Windows symlinks

---

## Session: 2026-04-05/06 (thread review + trips)

### Thread review: 26 of 52 reviewed
Closed 6, renamed 2, promoted 1 (Jax kickoff), new thread meta-simplify-agent-messaging.

### Three trips fully planned
- **SP moto (Apr 11-24):** Niterói → Itatiaia → SP Apr 15-19 → Ubatuba → Angra/Ilha Grande → Rio
- **Paraná (May 5-16):** Gol GIG→CWB May 5, LATAM CWB→IGU May 10, LATAM IGU→GIG May 16. Course May 6 Kartódromo Rio Negro-PR.
- **Bonaire (May 30–Jun 9):** Copa GIG→PTY→CUR May 30, Divi CUR→BON→CUR, Copa CUR→PTY Jun 6, 2 nights Panama, Copa PTY→GIG Jun 8. ⚠️ CUR arrival time conflict with dive agency.

### Pending this week (before Apr 11 departure)
- Book Itatiaia accommodation (urgent)
- Buy and install bike accessories (urgent)
- Setup working environments
- CBRS Studio MVP prototype (Monday)
- FUP Filip (Akuvo) — Monday morning
- IR / find accountant
- Jax kickoff session
- The Final Push planning (Cocoricó)
- Bonaire: confirm Copa arrival time with dive agency

---
*Older sessions archived in archive.md*
