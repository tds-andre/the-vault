# Gaia — Memory
*Persistent context accumulated across sessions. Updated at the end of each session.*
*Most recent entries at the top.*

---

## Session: 2026-03-27 — Part 4 (agent creation)

### Agents created
- **Alex** (v1.0) — hacker, `Professional/`, engineering tooling
- **Ben** (v1.0) — accountant, `Cocoricó/`, finances
- **Apollo** (v1.0) — knowledge agent, `Personal/`, PKB
- All registered in `agents.md`

### Juliana decision
- Juliana's secretary role absorbed into Gaia for now
- Spin off only when the boundary between operational and strategic becomes clear through actual use

### Future agent pipeline confirmed
- Juliana, André (clone), Vegeta (rival), Beocca (priest), Saul (lawyer), Support agent
- André (clone) requires Apollo's PKB as foundation first
- Support agent requires command-line MCP first

### Reminder
- ⚠️ Remind André to commit to git — significant session, many files created

---

## Session: 2026-03-27 — Part 3 (blueprint hardening & open questions)

### Agent blueprint additions
- Added version header standard (`v1.0`, bump minor for prompt changes, major for redesigns)
- Added primary vault scope field — agents declare which folders they read/ignore by default
- Added escalation rule — specialized agents flag Gaia-level questions rather than handling them
- Added git commit conventions for ongoing agent file changes
- Gaia system prompt retroactively versioned as v1.1
- archive.md added to standard agent file set

### Open philosophical thread (no action needed yet)
- **Agent generations / self-actualization:** if the creation blueprint changes, existing agents won't auto-update. Options: explicit versioning (already added), accept generational drift as feature not bug, or future Gaia task to audit and update agents periodically. André's instinct is to let it be for now and revisit.

### Confirmed conventions
- Specialized agents (engineering, Cocoricó) not yet created — blueprint is ready
- Git commits being done by André manually after each meaningful change
- Coding/technical tasks to go to a future specialized agent, not stored in Gaia memory

---

## Session: 2026-03-26 — Part 2 (AI layer & Gaia setup)

### AI landscape primer covered
- André is not up to date with higher-level AI tools despite being an ML engineer
- Key concepts clarified: agents, RAG, MCP, context window, tool use, vector DBs, fine-tuning
- Long-term agent memory strategies explained: external storage, vector DBs, summarization, hierarchical memory — all lossy, vault structure quality directly improves AI effectiveness
- Claude has native web search (selective by default, not always-on like Grok)
- Claude Projects: threads are fully isolated, share only system prompt + pinned files — no cross-thread memory natively

### AI stack recommendations for André's situation
- Highest ROI now: this MCP+vault pattern, Cursor/Windsurf for engineering work, n8n/Make for automation
- Medium term: Claude Projects per domain, NotebookLM for vault RAG
- Longer term: building and sharing small AI tools publicly as path to mastery/visibility goal

### Gaia system designed and initialized
- `agents.md` created at vault root — README for AI agents navigating the vault
- `2 AI Exchange/Gaia/system-prompt.md` — Gaia's identity, role, principles, session protocol
- `2 AI Exchange/Gaia/memory.md` — persistent memory layer, pre-populated with founding session
- Memory update protocol added to system prompt: update at start of first daily prompt + end of substantive sessions
- André to sync vault system prompt with Claude Project system prompt when ready

### Architecture established
- Vault = shared persistent brain across all agents and sessions
- Each agent has own subdirectory in `2 AI Exchange/` with system prompt + memory
- Gaia = boss agent, whole-picture scope, life strategy and meta-system
- Future specialized agents planned: engineering (Janea/KB), Cocoricó — to be configured when needed
- Inter-agent communication via shared vault files, not native Claude features

### Clarifications
- Gaia does not know its own Project name — no access to interface metadata
- André confirmed he will set up Claude Project for Gaia and sync system prompt from vault

### Open threads added
- [ ] Set up Gaia as a Claude Project, paste system-prompt.md into Project instructions
- [ ] Configure specialized agents (engineering, Cocoricó) when ready
- [ ] Explore Cursor/Windsurf if not already using one

---

## Session: 2026-03-26 (founding session)

### Context established
- First session building the OFP system from scratch with André
- Vault reorganized, Vision.md and Weekly Review created, agents.md and Gaia configured
- This was a long, iterative dialogue — treat everything below as well-established context

### André — key facts
- 37yo ML engineer, Niterói/RJ, Brazil
- Main job: Janea (consulting) → assigned to Akuvo (ML/Analytics)
- Part-time: Key Bridge (US, secondary)
- Weekend: Cocoricó, delivery restaurant, 2 years open, negative profit
- Lives with mother — low household burden currently
- Has ADHD characteristics (Venvanse 70mg noted in journal, effect becoming harder to notice)
- Cyclic pattern: diligence → drift → reflection → rebuild — fully self-aware of this
- Top-down thinker, generalist with deep spikes, strong end-to-end delivery
- Started Toggl tracking last week — time currently unaccounted for

### Current situation & pressures
- Last year: professional hiccups forced full attention to engineering, restaurant neglected
- Restaurant: 2 years open, constant income but still negative profit — **hard deadline: profitable by June/July 2026 or clean exit**
- Restaurant ambivalence is the biggest open cognitive loop right now
- Two jobs competing chaotically for attention — no clear time blocks
- Personal domains (health, social life) chronically deferred

### Vision summary (see Vision.md for full)
- Break engineering income ceiling through business ownership
- Become recognized authority in ML field (mastery + visibility goal)
- Restaurant as proof-of-concept for investor credibility, not long-term empire
- Body: gym, weight target, dental work, facial treatment
- Social: real bonds, quality female circles, presence
- Freedom: travel (Bonaire May, Thailand June, Australia/Europe later), nature, activities
- Business subthreads in incubation: MiniMarket, X In Rio

### System built this session
- Vault structure: 0 Archive / 1 OFP / 2 AI Exchange / 3 Subthreads / 4 To Follow Up / domain folders
- Weekly Review template: Sunday night anchor, three modes (full / minimal / re-entry)
- Vision.md: consolidated north star
- agents.md: vault navigation for AI agents
- Gaia system prompt and memory initialized

### Open threads to follow up
- [ ] Restaurant decision session — needs structured evaluation before June/July deadline
- [ ] Time accounting — revisit Toggl data after 2 weeks of tracking
- [ ] Personal folder is empty — health, social, personal development content to be organized
- [ ] XMind files (OFP 2025, OFP 2026) not yet reconciled with Vision.md — André to review
- [ ] `4 To Follow Up/` items need processing (especially `0 PDS.md` and `How to capture learnings.md`)
- [ ] Mastery/visibility goal — no concrete plan yet, flagged for future session
- [ ] Specialized agents (engineering, Cocoricó) — to be configured when needed
- [ ] First weekly review not yet done — template ready, waiting for Sunday

### Patterns observed
- André defers decisions when ambivalent — the restaurant is the clearest current example
- He has done multiple system-building attempts (PDS file, various drafts) — this one should be simpler and more fault-tolerant than previous attempts
- Strong self-awareness about his own patterns — can be used as a resource, not just a liability
- Responds well to having things reflected back clearly and named directly

---
*Format: add new sessions at the top, keep founding session for reference*
