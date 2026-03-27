# Agents — Vault Navigation Guide
*This file is written for AI agents entering this vault. It explains what this vault is, how it's structured, who the agents are, and where to find things.*

---

## What This Vault Is

This is the personal knowledge and operating system of **André**, a 37-year-old ML engineer based in Niterói, Rio de Janeiro, Brazil. He works remotely for two US companies (Janea/Akuvo as main job, Key Bridge as part-time) and runs a delivery restaurant called Cocoricó on weekends.

The vault serves two purposes:
1. **Capture** — anything lands here first, qualified or not
2. **Operate** — structured notes, plans, reviews and systems that drive his life forward

The root directory is the **inbox/landing zone**. Unqualified notes live here temporarily until processed or deleted. Do not treat root files as canonical — they may be drafts, noise, or in-progress thoughts.

---

## Vault Structure

```
Obsidian Vault/
│
├── agents.md               ← this file
├── (root)                  ← inbox/landing zone, unqualified content
│
├── 1 OFP/                  ← Operating Framework & Person (life system root)
│   ├── Vision.md           ← canonical goals and aspirations — READ THIS FIRST
│   ├── Weekly Review.md    ← weekly ritual template
│   ├── Journal 2025.md     ← daily journal entries
│   ├── Reviews/            ← weekly review instances (YYYY-MM-DD.md)
│   └── Drafts/             ← thinking-in-progress, plans, past reflections
│
├── 2 AI Exchange/          ← agent configuration, memory and inter-agent context
│   └── Gaia/               ← Gaia agent (life strategy, meta-system)
│       ├── system-prompt.md
│       └── memory.md
│
├── 3 Subthreads/           ← open threads not yet a full domain (business ideas, projects)
│   ├── MiniMarket/
│   └── X In Rio/
│
├── 4 To Follow Up/         ← items to review then delete or promote elsewhere
│
├── Cocoricó/               ← restaurant domain (separate operational vault exists)
├── Janea Akuvo/            ← main job: Janea (consulting co.) + Akuvo (current client)
├── Key Bridge/             ← secondary job (part-time, US)
├── Personal/               ← health, social life, personal development
├── Professional/           ← engineering knowledge, job applications, career
│
└── 0 Archive/              ← completed or dead threads, do not delete
```

---

## The Agents

### Gaia (this vault's primary agent)
- **Role:** Life strategy, meta-system, weekly operating rhythm, cross-domain coordination
- **Scope:** Whole picture — all domains, the vision, the system itself
- **Config:** `2 AI Exchange/Gaia/`
- **Always read:** `1 OFP/Vision.md`, `1 OFP/Weekly Review.md`, this file
- **Implemented in:** Claude (claude.ai), with MCP filesystem access to this vault

### Future agents (not yet configured)
- **Engineering agent** — deep context on Janea/Akuvo and Key Bridge work
- **Cocoricó agent** — restaurant operations, finances, decisions
- *(Others to be defined as needed)*

---

## Timezone

André is based in **Niterói, Rio de Janeiro, Brazil — BRT (Brasília Time), UTC-3**.
All agents should use this timezone when reasoning about deadlines, scheduling, and time elapsed between sessions.
BRT does not observe daylight saving time.

---

## Key Facts About André

*For agent orientation — not exhaustive, see Vision.md for full picture.*

- Runs in **cycles**: diligence → drift → reflection → rebuild. Design for re-entry, not perfection.
- **Top-down thinker** — needs to orient to the big picture before descending into tasks
- **Generalist with deep spikes** — end-to-end delivery is his natural mode
- Primary language is **Portuguese (BR)**, but works and thinks in English professionally
- Current priority: stabilize professional income, turn Cocoricó profitable by June/July 2026 or exit cleanly, build toward long-term financial independence through business ownership
- Tools in use: Obsidian (this vault), Microsoft ToDo (capture/ops), Toggl (time tracking), Asana (planning), XMind (vision mapping)

---

## Navigation Tips for Agents

- **Start with `1 OFP/Vision.md`** for any life/strategy question
- **Check `1 OFP/Reviews/`** for recent weekly reviews to understand current state
- **Domain folders** (Cocoricó, Janea Akuvo, Key Bridge) contain working notes — assume they're incomplete
- **`4 To Follow Up/`** contains items pending decision — don't treat as active plans
- **Root files** are unprocessed — treat with low confidence
- **`0 Archive/`** is for historical context only

---
*Last updated: March 2026*
