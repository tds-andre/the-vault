# Thread System
*Schema, conventions and operating guide for Gaia.*
*Last updated: 2026-03-29*

---

## What is a Thread

A thread is any evolving unit of intent — from a single action to a years-long mission. Every thing André wants to do, track, or remember lives as a thread. Threads are never assumed to be single actions until they prove to be.

---

## Directory

All threads live in `1 OFP/threads/` as individual markdown files.

```
1 OFP/
  threads/
    life-bonaire-north-trip.md
    professional-cbrs-studio.md
    enzo-cursos-extracurriculares.md
    ...
  Thread System.md       ← this file
  Thread Index.md        ← Gaia's fast-load overview
  Obsidian Base/         ← André's UI (Obsidian Base config)
```

---

## Filename Convention

```
<domain>-<subject-slug>.md
```

- Domain: one of the domains below
- Subject slug: 2-5 words, hyphen-separated, lowercase, descriptive
- Examples: `life-bonaire-north-trip.md`, `admin-declarar-ir.md`, `enzo-cursos-extracurriculares.md`

Filenames don't encode status — status lives in frontmatter and changes without renaming.

---

## Frontmatter Properties

```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
domain: <domain>
type: <type>
status: <status>
due: YYYY-MM-DD        # optional
parent:                # optional — markdown link to parent thread file
---
```

All properties are required except `due` and `parent`.

---

## Types

| Type | Description | Closes? |
|---|---|---|
| `action` | Single step | Yes — when done |
| `project` | Multi-step, known shape and end | Yes — when complete |
| `mission` | Long endeavor, steps not yet clear | Yes — when resolved |
| `decision` | Needs deliberation | Yes — once decided |
| `system` | Ongoing strategic behavior | No — cycles |
| `skill` | Capability building | No — has milestones |
| `routine` | Recurring task | No — resets |
| `habit` | Behavior change | Yes — when embedded |

---

## Status

| Status | Meaning |
|---|---|
| `prioritized` | Active and urgent — needs attention this week |
| `active` | Active but not urgent — will get prioritized when relevant |
| `eventually` | Postponed — below active in priority, no timeline |
| `dormant` | On hold indefinitely — not forgotten, not active |
| `captured` | Needs evaluation — initial state for most new threads |
| `closed` | Done, canceled, or archived — add a final update note |

Note: `prioritized` is a subset of `active`. All prioritized threads are active. When nothing is urgent, `prioritized` is simply empty.

---

## Domains

| Domain | Scope |
|---|---|
| `professional` | Jobs, career, skills, ML/AI work |
| `cocoroco` | Restaurant |
| `building` | Business ideas, future ventures |
| `personal` | Health, aesthetics, social, identity |
| `enzo` | Little brother — activities, development, relationship |
| `life` | Travel, freedom, experiences, big purchases |
| `admin` | Bureaucracy, finance, legal, logistics |
| `meta` | The system itself — agents, vault, OFP |

---

## Body Structure

```markdown
---
frontmatter
---

next: single next action
due: YYYY-MM-DD         # inline due if different from or more specific than frontmatter

## Context
Background info, history, why this matters. Optional — only when needed.

## Subtasks
- [ ] subtask one
- [ ] subtask two `due: YYYY-MM-DD`

## Updates
YYYY-MM-DD — first update, appended chronologically
YYYY-MM-DD — second update
```

**Rules:**
- `next:` and `due:` are bare inline text — no header, no bold
- `## Context`, `## Subtasks`, `## Updates` are headers — only present when needed
- Section order is always: inlines → Context → Subtasks → Updates
- Updates are append-only, newest at bottom
- Closed threads: add a final update line with free-form resolution note (e.g. `2026-05-01 — done, tickets bought and trip completed`)
- Parent thread links go inline: `parent: [[life-north-trip]]`

---

## Gaia Operating Protocol

**Session start:**
1. Read `Thread Index.md` — fast overview, no individual file reads needed
2. Read specific thread files only when working on them
3. Check `inbox/` for pending messages

**Thread state changes:**
1. Update the thread file (status in frontmatter, add update note)
2. Update `Thread Index.md` entry
3. Commit

**New thread:**
1. Create file in `1 OFP/threads/`
2. Add to `Thread Index.md`
3. Commit

**Closed thread:**
1. Update `status: closed` in frontmatter
2. Add final update line
3. Thread stays in `threads/` — no archiving to separate folder
4. Thread Index entry marked closed — Gaia stops loading it by default

**Weekly review:**
- Scan Thread Index for all prioritized and active threads
- Load individual files for threads being reviewed or updated
- Promote/demote status as needed

---

## What This File Is Not

This is a schema and operating guide — not a thread database. The threads themselves live in `1 OFP/threads/`. The live overview is `Thread Index.md`. This file changes only when the system design changes.
