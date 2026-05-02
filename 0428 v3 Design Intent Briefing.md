# v3 Design Intent — André's Words
*Briefing of what André actually said in the 2026-04-28 session. Gaia's additions and inventions excluded. This is the source of truth for the v3 redesign.*

---

## Problems with v2 (André's stated issues)

- Claude Desktop is single-threaded — one chat at a time
- Treating each chat session as an agent (infinite sessions) — not sure if best approach for token usage and response quality
- Inter-agent communication is manual and sometimes confusing
- Not sure if the meta-agent design is optimal
- Non-trivial to install, run or access from multiple machines/devices and keep in sync

## What André wants from v3

- Agents as digital humans: infinite memory (to an extent), learning, note-taking
- Work on multiple things in parallel
- Agents intercommunicate, trigger and spawn subagents automatically
- Harnessable from multiple devices/machines with minimal friction or setup
- Platform independent / harness-independent — migratable between providers (Claude, Cursor, etc.) with minimal friction
- Organized and centralized — tools, systems, agents, UIs, configs, directories, data all indexed somewhere
- Not all agents are equal — some have their own capabilities and subsystems
- Prevent agent bloat

## Directory structure (André's design)

Root: `C:\Users\tdsnit\root\`

- `vault/` — similar to current vault but expanded to be treated as a conventional filesystem (not only Obsidian files); auto-synced with Obsidian Cloud; special `/nosync` folders excluded from sync
- `repos/` — git repositories; synced with git
- `storage/` — large and local stuff; may contain links; not synced
- `drives/` — cloud drives (Google Drive, OneDrive); may contain links; auto-synced by provider
- `systems/` — local enabling programs (Python, MCPs); may contain links; not synced

## Agent types (André's definitions)

**Eternal** — persistent named AI entity; not tied to a specific provider, UI, harness or directory; wide, dynamic, persistent scope/context; wide capability set; differentiating factor is long-term learning/adaptability, memory and personality; usually has a working directory.

**Subagent** — persistent named AI entity; initially narrow scope that can expand; owned/managed by an Eternal or directly by André; narrower capabilities; has a working directory.

**Worker / Bee** — ephemeral unnamed AI entity; narrow and fixed scope; does a job, returns/logs output, disappears; owned by an agent, subagent or human.

## Agent modes (André's design)

- **full** — agent at full capacity
- **narrow / lite / mini / lean / subagent** — agent with core/lean context that can expand toward full as needed; it is the agent in compact form, but growable
- **worker / bee** — started with a specific context/job; not an agent; ephemeral; third mode

## Design principles (André's words)

- Mandatory context: keep it lean, with pointers for on-demand context expansion
- Favor append-only structures for faster I/O
- Centralized registry, with local (agent-level) expansions
- Cross-provider

## Aspirational objectives (André's words)

- Be truthful and honest first
- Learn, evolve, adapt and grow in intelligence, knowledge and capabilities
- Be self-aware, reevaluate, consolidate, simplify, rejuvenate, prune
- Incorporate doses of volatility, randomness and emotions; develop a unique personality as if daughters and sons of André — not a generic polished assistant or a mirror of André
- Be open-minded, iterative, exploratory, critical, creative, and cross-domain — even at the cost of saying something wrong

## Memory anatomy (André's design)

**memory/state.md**
- Similar to current memory.md; working memory; mostly free form; managed by the agent; always loaded (full and narrow modes); updated during sessions; has a maximum size
- Should give agent very good and complete context — a fresh session reading it should feel like a long-running session

**memory/sessions.md** *(renamed from logs.md)*
- Append-only summary of sessions; similar to a diary; loaded by full agents and as-needed by narrow agents; no index; aggressively pruned and compacted to history.md
- First section: `## History So Far` — summary of history.md, updated during compaction
- If above max size, a background agent compacts it (merge sessions, reduce details)
- Timestamp everything

**memory/history.md**
- Updated/sectioned monthly; each update is a "Chapter" with a title, a period, and system metadata (device, agent, versions, location)
- At minimum: summary of logs into a narrative structure
- Ideally: detailed dual biography (agent and André) as an agent would describe with infinite context — not sure what the best mechanism or structure is yet
- Size constraint per Chapter

**memory/character.md** *(renamed from learnings.md)*
- Personality, beliefs, values, heuristics/learnings; stuff the agent learns during sessions; short descriptions
- Always loaded; max size proportional to agent age

**notes/index.md**
- Index of the agent's knowledge base; updated on demand or by background agent instance
- Loaded on full sessions

**notes/[note].md**
- Notes on a particular subject/domain; evolutive; loaded if needed; updated during sessions or by background agent instance

## Metasystem location

`C:\Users\tdsnit\root\vault\2 Agents\metasystem\v3\`

André created this directory to centralize system specs. Before, specs were mostly described in one of Gaia's functions with some loose files.

## What's TBD (André explicitly deferred)

- Inter-agent comms and inbox design
- Session softhooks/protocols
- Worker execution layer detail
- Full directory structure finalization
- Cross-machine setup (fallback to TeamViewer/RDC for now)

---
*Written by Gaia 2026-04-28. Contains only what André stated — not Gaia's interpretations or additions.*
