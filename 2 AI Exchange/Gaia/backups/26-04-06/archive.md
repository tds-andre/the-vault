# Gaia — Archive
*Long-term memory. Do NOT load this file at session start — it is loaded only on explicit request or when memory.md references something that needs elaboration.*
*Entries are moved here from memory.md when they are resolved, stale, or no longer operative.*

---

## How to use this file

**Agents:** Do not read this file proactively. Only read it when:
- André explicitly asks to recall something ("do you remember when we discussed X?")
- A `memory.md` entry references the archive for more detail
- You are doing a full system review or Vision update

**Moving entries here:** When pruning `memory.md`, move entire session blocks or specific items here with a one-line summary tag so they're searchable without full reading.

---

*No archived entries yet — archive populated as memory.md matures.*

---

## Archived: Sessions 2026-03-26 through 2026-03-29 (founding + early architecture)
*Moved from memory.md on 2026-04-06. Summary: vault structure built, thread system migrated, 9 agents created, weekly review established, Asana retired in favor of Obsidian Base.*

### Key facts established in founding sessions
- André: 37yo ML engineer, Niterói/RJ. Main job Janea/Akuvo, part-time Key Bridge, weekend Cocoricó.
- Lives with mother. ADHD (Venvanse 70mg). Cyclic pattern: diligence → drift → reflection → rebuild.
- Top-down thinker, generalist with deep spikes. Most important person: Enzo (11yo half-brother).
- Vision: break engineering ceiling through business ownership, recognized ML authority, profitable restaurant or clean exit by June/July 2026, travel, real social bonds.

### Architecture established
- Vault = sovereign brain in markdown/git, owned by André, portable across AI providers
- Thread system: 55 threads in `1 OFP/Threads/`, Thread Index for fast loading, Thread System.md as schema
- 9 agents: Gaia, Alex, Ben, Cocoria, Apollo, Joane, Kaybee, Laix, Jax
- Agent structure: system-prompt.md + memory.md + archive.md + functions.md + public/profile.md + inbox/
- Asana retired — Obsidian Base (Thread Base.base) replaces as UI
- Weekly review: Sunday night anchor, three modes, instances in `1 OFP/Weekly Reviews/YYYY-MM-DD.md`
- Inter-agent messaging: inbox/ files with lifecycle fields (Date read, Date dispatched, Resolution)
- vault-mcp: git + shell tools for automation, Python shutil.move() for file moves
- Claude Code configured for Joane (CLAUDE.md in akuvo-analytics2, vault MCP via ~/.claude/settings.json)

### Status vocabulary
prioritized (urgent active) → active → eventually → dormant → captured → closed

### Pending from founding sessions (still open)
- Thread directory reorganization: Threads/ + Threads/postponed/ + Threads/closed/ — unblocked, pending execution
- True RAG implementation over vault (evolution.md)
- WhatsApp MCP via Baileys + inbox bridge (evolution.md)
- `meta-simplify-agent-messaging` thread — active
