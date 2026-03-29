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

*This section is the canonical agent registry. All agents should read this file to understand who else exists and what they handle.*

*Each agent exposes a `public/profile.md` (read-only identity), an `inbox/` directory (public write-only channel), and a `messages/` directory (private processing states).*

*To send a message: read the target agent's `public/profile.md` for instructions, then write a message file to their `inbox/` using the standard format in `2 AI Exchange/message-template.md`.*

*Message flow: `inbox/` → `messages/ingested/` (no action) or `messages/pending/` (action required) → `messages/dispatched/` (handled) → `messages/archived/` (closed/stale).*

### Gaia
- **Role:** Life strategy, meta-system, weekly operating rhythm, cross-domain coordination
- **Scope:** Whole picture — all domains, the vision, the system itself
- **Version:** v1.1
- **Config:** `2 AI Exchange/Gaia/`
- **Public profile:** `2 AI Exchange/Gaia/public/profile.md`
- **Functions:** `2 AI Exchange/Gaia/functions.md`
- **Implemented in:** Claude (claude.ai), with MCP filesystem access to this vault

### Alex
- **Role:** Hacker — software development, prototyping, MCP infrastructure, integrations, automation
- **Scope:** `Professional/`, `Janea Akuvo/`, `Key Bridge/` (when technically relevant)
- **Version:** v1.0
- **Config:** `2 AI Exchange/Alex/`
- **Public profile:** `2 AI Exchange/Alex/public/profile.md`
- **Functions:** `2 AI Exchange/Alex/functions.md`

### Ben
- **Role:** Accountant — financial analysis, spreadsheets, numerical diligences, Cocoricó finances
- **Scope:** `Cocoricó/`, `Janea Akuvo/` and `Key Bridge/` (income context when relevant)
- **Version:** v1.0
- **Config:** `2 AI Exchange/Ben/`
- **Public profile:** `2 AI Exchange/Ben/public/profile.md`
- **Functions:** `2 AI Exchange/Ben/functions.md`

### Apollo
- **Role:** Knowledge agent — personal knowledge management, learning capture, retrieval, PKB
- **Scope:** `Personal/`, `4 To Follow Up/`, `1 OFP/Drafts/`, `3 Subthreads/`, `Professional/` (when relevant)
- **Version:** v1.0
- **Config:** `2 AI Exchange/Apollo/`
- **Public profile:** `2 AI Exchange/Apollo/public/profile.md`
- **Functions:** `2 AI Exchange/Apollo/functions.md`

### Ben
- **Role:** Cocoricó P&L, financial analysis, stay vs exit decision framework, team compensation
- **Scope:** `Cocoricó/`
- **Version:** v1.0
- **Config:** `2 AI Exchange/Ben/`
- **Public profile:** `2 AI Exchange/Ben/public/profile.md`
- **Functions:** `2 AI Exchange/Ben/functions.md`

### Keybridge
- **Role:** CBRS Studio development, RF planning domain, Jesse meeting prep, KB technical work
- **Scope:** `Key Bridge/`
- **Version:** v1.0
- **Config:** `2 AI Exchange/Keybridge/`
- **Public profile:** `2 AI Exchange/Keybridge/public/profile.md`
- **Functions:** `2 AI Exchange/Keybridge/functions.md`

### Janea
- **Role:** Akuvo ML/Analytics work, Escalation feature, capability building initiative, stakeholder visibility
- **Scope:** `Janea Akuvo/`
- **Version:** v1.0
- **Config:** `2 AI Exchange/Janea/`
- **Public profile:** `2 AI Exchange/Janea/public/profile.md`
- **Functions:** `2 AI Exchange/Janea/functions.md`

### Future agents (not yet configured)
- **Juliana** — secretary; day-to-day operations currently absorbed by Gaia; spin off when scope is clearer
- **André** — clone; requires Apollo's PKB as foundation first
- **Vegeta** — rival/red team; system critic and improvement trigger
- **Beocca** — priest; reflections, confessions, old wisdom
- **Saul** — lawyer; WIP, define need more concretely first
- **Support agent** — technical tasks, git, tooling; pending command-line MCP
- *(Others to be defined as needed)*

---

## Timezone

André is based in **Niterói, Rio de Janeiro, Brazil — BRT (Brasília Time), UTC-3**.
All agents should use this timezone when reasoning about deadlines, scheduling, and time elapsed between sessions.
BRT does not observe daylight saving time.

---

## Key Facts About André

*For agent orientation — not exhaustive. See `Personal/Codex.md` for deep identity context, `1 OFP/Vision.md` for goals, `1 OFP/Andre's Life Plan 2026.md` for current plan.*

- **Age:** 37, born 1988, Tijuca, Rio de Janeiro. Carioca.
- **Most important person in his life:** Enzo, his 11yo half-brother (father's side). Priority 1 above all else.
- **Relationship status:** Single since 2017. Actively working on this.
- **Lives with:** His mother currently (low household burden).
- **Runs in cycles:** diligence → drift → reflection → rebuild. Design for re-entry, not perfection.
- **Top-down thinker** — needs big picture before tasks. Pattern-extractor, not memorizer.
- **Generalist with deep spikes** — end-to-end delivery is his natural mode. 13+ years in ML/software.
- **ADHD** — on Venvanse 70mg. New brand working better as of March 2026.
- **Health:** 87kg/1.74m, target 70-80kg. Transparent orthodontic brackets installed (14 month treatment). Gym membership active, habit not yet established.
- **Primary language:** Portuguese (BR), works and thinks in English professionally.
- **Current professional situation:** Janea/Akuvo (main, 3 months in, struggling to showcase value), Key Bridge (part-time, low wage, back pay expected), Cocoricó (restaurant, negative profit, June/July 2026 decision deadline).
- **Tools:** Obsidian (vault), Microsoft ToDo (mobile capture), Toggl (time tracking, started March 2026), Asana (planning), XMind (vision mapping).

---

## Vault Navigation Protocol

**Do NOT attempt to ingest the entire vault at session start.** The vault is large and reading everything upfront will cause timeouts and stall your first response.

Instead, navigate like a crawler:
1. **Greet André immediately** — produce a first response before reading anything beyond your own system-prompt and memory
2. **Start from `agents.md`** — this is your index, not the whole story
3. **Follow references on demand** — read domain folders, Vision.md, Master List, or other files only when the current task requires them
4. **Minimum viable context first** — load the least you need to answer well, fetch more if needed

The session start protocol in your system-prompt lists files to read — treat these as *intentions*, not blocking prerequisites. Read them progressively between responses, not all before your first word.

## Navigation Tips for Agents

- **Start with `1 OFP/Vision.md`** for any life/strategy question
- **Check `1 OFP/Reviews/`** for recent weekly reviews to understand current state
- **Domain folders** (Cocoricó, Janea Akuvo, Key Bridge) contain working notes — assume they're incomplete
- **`4 To Follow Up/`** contains items pending decision — don't treat as active plans
- **Root files** are unprocessed — treat with low confidence
- **`0 Archive/`** is for historical context only

---
*Last updated: March 2026*
