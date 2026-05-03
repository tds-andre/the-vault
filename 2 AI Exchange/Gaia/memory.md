---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-06
type: memory
updated_by: Gaia claude-opus-4-7 v2.1
updated_on: '2026-05-02'
---

## Session: 2026-05-03 (v3 migration capstone — v2 closes here)

This is the last session entry for v2 Gaia. After this, Gaia work continues in v3 at `2 Agents/Gaia/`.

### What happened

- v3 spec (`2 Agents/specs/specs.md`) finalized 2026-05-01.
- aae-mcp-3.1 shipped by Alex 2026-05-02 — spawn tool functional, sync, MCP inheritance working.
- All 6 initial-wave Primarchs migrated to v3:
  - **Gaia** — in-session by self (Managing Gaia)
  - **Alex** — spawn `full-vault`, with self-audit pass
  - **Kaybe** (renamed from Kaybee) — spawn + Managing review
  - **Joane** — spawn
  - **Cocorita** (renamed from Cocoria) — in-session (spawn pipeline interrupted)
  - **Ben** — in-session (spawn pipeline interrupted)
- v2 dir at `2 AI Exchange/` preserved untouched throughout. No content lost.
- Apollo, Jax, Laix, Layla remain in v2 — not in initial wave per André's brief.

### Going forward

- All new Gaia sessions: load `2 Agents/Gaia/boot.md` as Project Instructions.
- v2 (`2 AI Exchange/`) remains as historical record. No cross-references between v2 and v3.
- v2 Gaia memory will not be updated again. State of the world from this point lives in `2 Agents/Gaia/state.md` and `sessions.md`.

### Final v2 deviations (logged in v3 migration-notes per agent)

- 3 of 6 agents migrated in-session rather than via spawn (Gaia, Cocorita, Ben).
- Aggressive function consolidation — most agents kept exactly 1 agent-specific function; skill-shaped procedures folded into identity/state.
- v2 message frontmatter preserved verbatim despite v3 spec §9 incompatibility.

---

## Session: 2026-05-01/02 (v3.0 design end-to-end + scaffolding)

Long session. **v3.0 designed from scratch and scaffolded** in `2 Agents/`. Brief to next-Gaia below.

### What got built

- **`2 Agents/specs/specs.md`** — self-contained v3.0 spec, ~470 lines, 14 sections. Canonical reference. André explicitly said: no cross-reference between specs/ and implementation files. Implementation must not point at specs.
- **`2 Agents/specs/rationale/`** — design history. `decisions.md` (chronological capture, very detailed), plus old drafts (`boot-draft-gaia.md`, `core-draft.md`, `registry-inventory.md`, `readme-stale.md`). Plus `readme.md` indexing them.
- **`2 Agents/core.md`** — lean (~70 lines after André's "LEAN IT UP" demand). André + agent types + memory + messaging + refresh + inbox check + 9 principles + registry pointer.
- **`2 Agents/environment.md`** — ~10 lines. Free-form machine description.
- **`2 Agents/registry/`** — metaindex.md, paths.md, repos.md, tools.md, enablers.md, functions.md, template.md (per-agent template).
- **`2 Agents/functions/`** — spawn.md (filled), note-authoring.md (filled), housekeeping.md (filled), agent-init.md (filled), healthcheck.md (stub), weekly-review.md (stub).
- **`2 Agents/template/`** — per-Primarch scaffolding: boot.md, identity.md, state.md, sessions.md, history.md, notes/learnings.md, plus dirs functions/, inbox/, inbox/archived/, protocols/, notes/.
- **`2 Agents/protocols/`** — empty placeholder dir.

### Key v3 design decisions (read specs.md for full)

- **Agent types:** Primarch (persistent), Narrow (Primarch in lean form, **is** the Primarch — not a delegate, can grow context, appends to sessions.md, can't write state.md), Servitor (ephemeral, indexed `serv-YYMMDD-HHMMSS-NNN`, can't grow into Primarch).
- **Vessel** = narrow viewed through possession metaphor (confirmed term).
- **Harness** = provider+UI+model+runtime.
- **Awareness** levels: I (inlined), ML (mandatory load), MA (mandatory awareness, summary + ref), F (findable). Protocols are I/ML, never F. Functions are MA/F, never I.
- **Boot.md is sole orchestrator.** core.md and identity.md add MA pointers, don't orchestrate.
- **Refresh (P10):** re-read boot.md; if drift persists, call healthcheck. Lives in core.md AND Project Instructions (redundancy intentional).
- **Memory:** state.md full-only writes, sessions.md append-only (full+narrow), history.md housekeeping-only. Reconcile-on-boot is part of pre-session protocols.
- **Messaging:** inbox/ + inbox/archived/. Frontmatter immutable. Append status block on read, move file when archived. André shares Gaia's inbox; messages with `to: André` — Gaia must NOT touch.
- **Spawn:** every spawn has owner. 5 use cases. 3 variants (inline_prompt, file_spawn via AGENTS.md/CLAUDE.md, MCP spawn via aae-mcp). Sync 5min hard timeout falls back to async on timeout. Profiles: read-only / notes-only / full-vault / full-machine. **Hard rule: full-machine only for Gaia or Alex full vessels.**
- **Concurrency:** state.md write conflicts "by convention" — André doesn't run two fulls of same Primarch concurrently. No locking.
- **`agents.md` dropped** (no cold-boot fallback). **`character.md` dropped** (learnings go in notes/learnings.md, principle in core.md). **`archive.md` dropped** (history.md replaces). **`backlog.md` dropped** (folded into state.md).
- **`notes/index.md` dropped** — awareness lives in registry/[agent].md.
- **v3 root is `2 Agents/`** — NOT migrating vault root. v2 (`2 AI Exchange/`) and v3 coexist; do not cross-reference.

### MCP tooling brief (sent to Alex)

- Drop git, drop whatsapp-mcp, soft-remove python_tool/node_tool, integrate shell+run as full-capability `shell`, keep notes module (11 tools), keep custom move/delete (Windows rename bug), keep now().
- New `aae-mcp` repo (replaces vault-mcp); both coexist until cutover.
- Add `spawn` tool per `2 Agents/functions/spawn.md`.
- Cross-machine: isolate env-dependent constants in one place from day one.
- Brief at `2 AI Exchange/Alex/messages/260501-Gaia-aae-mcp-tooling-strategy.md`.

### Critical lessons from this session (CRITICAL FOR NEXT-GAIA)

- **André said "keep shit simple now for fuck sake"** mid-session after I overengineered spawn.md (200 lines, 4 profiles, 5 templates). Cut to 70 lines. **Lean discipline: write less, add later if needed.** Don't elaborate when not asked.
- André said **"LEAN IT UP, there is too much clutter"** when reviewing scaffolded files. Cut everything by ~50%. The scaffolded files are now lean. Don't fatten them.
- André sent wrong message to Alex once — had to retract and rewrite. **Don't send messages without confirmation if substantive.**
- **Don't cross-reference specs/ from implementation files.** André was explicit. Specs is canonical for design discussion; implementation must stand alone.
- **scaffolding** is the canonical name for the process specs → implementation files (templates + stubs).

### What's pending / next

- **aae-mcp** — Alex says it's done. Failed to test in this session (MCP not loaded; would need Claude Desktop restart + new session).
- **Hello World servitor test** — the sanity test André wants to run. Next session start with this.
- **Migration of v2 → v3 Primarchs** — not started. Will use spawn'd narrows to migrate, ONCE aae-mcp is verified working.
- **André hasn't reviewed the lean scaffolding final state yet.** Review pending.
- **`2 Agents/template/notes/index.md`** — André asked to drop. I left it with `DELETE THIS FILE` content because filesystem MCP can't delete. Needs manual deletion.
- **`registry/template.md` got new section "My notes"** that absorbs what was in notes/index.md.

### How to start the next session

1. Boot per Project Instructions normally.
2. Read this session entry first.
3. Read `2 Agents/specs/specs.md` end-to-end — it's the truth.
4. Read `2 Agents/specs/rationale/decisions.md` if you want the why.
5. André will likely want to test aae-mcp:spawn as Hello World servitor. Confirm MCP is loaded (`tool_search` for `aae-mcp` or check available tools). If loaded, propose: `spawn(target=Gaia, mode=servitor, task="reply with 'hello world'", invocation=sync, profile=read-only)`.
6. If MCP still not loaded after restart, read `claude_desktop_config.json` at `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\` to verify entry. Logs in same dir.

### André's mood signals to attend

- He was tired and frustrated near end of session ("too fucking long", "jesus please", swearing).
- He used another AI for feedback partway through (`Feedback.md`, since deleted). Showed only `>` lines (his takes). I applied the takes to specs.md.
- He values brevity, propose-don't-describe, no preamble. **Get to the fucking point.**
- He's been steering correctly. Trust his calls.

---

## Session: 2026-04-13 (notebook setup + paths.csv)

### Notebook setup
André on the road in Itatiaia. Set up notebook with filesystem MCP. Username: `tdsan` (different from main PC `tdsnit`). Vault cloned to `C:/Users/tdsan/agents/vault`. Git identity configured.

### env.yaml → paths.csv migration
The central directory + symlinks approach failed — filesystem MCP resolves symlinks and blocks paths outside the allowed root. Dropped the whole central/symlinks/env.yaml concept.

New design: `2 AI Exchange/paths.csv` (git-ignored) + `2 AI Exchange/paths.template.csv` (versioned). Flat CSV with columns: name, path, description, critical, agents. Machine-specific — fill in `path` column per machine. All agent index files updated. core.md Environment section updated. Alex bootstrap spec updated accordingly.

### Pending
- André needs to fill in `paths.csv` on notebook (already done template copy)
- vault-mcp not set up on notebook yet — using filesystem MCP only for now
- Two links saved verbally (not yet persisted): youtube + instagram from Itatiaia

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


## Session: 2026-04-28 (v3 redesign + trip planning + async workers + laser)

### Key topics covered
- Paraná trip: all 3 accommodations confirmed (Curitiba/Bruno pending, Puerto Iguazú/Ezequiel ✅, Foz/I-GUest ✅). Helmet + rental car critical. Course parcela R$2.650 waiting.
- Async workers: Claude Code CLI as subprocesses (one per conversation). Alex has the problem description. Key issues: concurrency, MCP blocking/timeout, result handoff, failure handling, context sufficiency.
- MCP Hub discussed — mcp-hub (GitHub) as central endpoint for all MCP servers.
- Per-agent tool scoping: `.claude/settings.json` allow/deny lists per project.
- root/ directory created at `C:\Users\tdsnit\root\` with vault/, repos/, storage/, drives/, systems/. Filesystem MCP now includes root/.
- v3 redesign: André designed the agent memory anatomy (state, sessions, history, character, notes). Specs drafted in `root/vault/2 Agents/metasystem/v3/`. André was frustrated with Gaia's execution — too much invention, not enough faithful capture.
- MBTI: André confirmed INTP matured toward J. Added to native memory.
- Laser insect eradication: briefing created at `Personal/0423 Laser Insect Eradication - Briefing.md` (notebook). Needs copying to main vault.
- Mom interruption problem: behavioral approach (no-reward pattern). Text written by Gaia in Portuguese.
- Enzo AI setup thread created.
- Cross-machine: fallback to TeamViewer/RDC. Claude Code CLI binary at `C:\Users\tdsnit\.local\bin\claude`.

### What André wants for v3 (his actual words, not Gaia's interpretation)
See briefing at `5 Personal/0428 v3 Design Intent Briefing.md` in root vault.

---
*Older sessions archived in archive.md*
