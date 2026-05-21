# Thread System
*Schema, conventions and operating guide for Gaia.*
*Last updated: 2026-05-03*

---

## What is a Thread

A thread is any evolving unit of intent — from a single action to a years-long mission. Every thing André wants to do, track, or remember lives as a thread. Threads are never assumed to be single actions until they prove to be.

---

## Filesystem-as-Index

There is **no separate Thread Index file**. The filesystem itself is the index: status lives in the directory, key metadata lives in the filename. A `glob` over `1 OFP/Threads/**/*.md` plus filename parse is enough to enumerate everything.

```
1 OFP/Threads/
  prioritized/    ← active and urgent (this week)
  active/         ← active but not urgent
  captured/       ← needs evaluation (initial state)
  postponed/      ← eventually + dormant (no timeline)
  closed/         ← done, canceled, archived
```

Status changes = file moves between dirs. Nothing else needs updating.

---

## Filename Convention

```
YYMMDD-domain-subdomain-type-subject.md
```

- `YYMMDD` — date thread was created
- `domain` — top-level domain (see Domains below)
- `subdomain` — subdomain within the domain. When subdomain is `Other` or unclear, default to the domain name
- `type` — thread type (see Types below)
- `subject` — 2-5 word slug, hyphen-separated, lowercase, descriptive

**Examples:**
- `260410-personal-aesthetics-project-skin-improvement.md`
- `260410-family-brother-project-cursos-extracurriculares.md`
- `260410-family-family-action-help-pai.md` (Other → family)
- `260410-ventures-ventures-mission-x-in-rio.md`
- `260410-meta-meta-system-vault-cleanup.md`

Filenames don't encode status — status lives in the directory.

---

## Domains

| Domain | Scope |
|---|---|
| `professional` | Paid work, current jobs, deliberate skill building toward those jobs |
| `family` | Relationships and obligations with family members |
| `personal` | André's own body, mind, life, identity, social presence |
| `assets` | Possessions, finances, legal/bureaucratic standing — what he owns or owes |
| `ventures` | Business ideas, future plays, side ventures (not current jobs) |
| `meta` | The system itself: agents, vault, OFP, tooling, operating layer |

**Subdomains are dynamic** — not prescribed by this spec. They emerge per domain as patterns surface (e.g. `professional/janea`, `personal/aesthetics`, `assets/management`). When a subdomain is `Other` or unclear, default to the domain name in the filename slot.

Domains stabilize first; subdomains live in frontmatter and filename without ceremony.

---

## Types

| Type | Description | Closes? | Threads as subtasks? |
|---|---|---|---|
| `action` | Single step | Yes — when done | No |
| `mission` | In-between action and project — few steps | Yes — when resolved | No |
| `project` | Multi-step, known shape and end | Yes — when complete | **Yes** |
| `program` | Biggest unit. Composition / life-level / ongoing strategic | No — cycles or evolves | **Yes** |
| `evaluate` | Needs deliberation / evaluation | Yes — once resolved | No |
| `skill` | Capability building | No — has milestones | No |
| `special` | Container for items: lists, inboxes, collections, routines | Special — see below | No |

**Subtasks rule:** only `project` and `program` threads may have other Threads as formal subtasks (linked via frontmatter `parent:` from the child, listed in body of parent). Other types may *reference* other threads in their body but never as subordinated subtasks.

**Use markdown links liberally** between related Threads, back and forth. Forward link from parent listing, back-reference from any thread that touches the topic. Wikilink format: `[[YYMMDD-domain-subdomain-type-subject]]`.

**Special threads** are containers (lists of books, links to revisit, capture inbox, routines tracker, chores tracker, financial accounts list). They don't have a `next` action — they have items. Body uses `## Items` (or domain-appropriate header like `## Books`, `## Routines`) instead of `## Subtasks`. Cockpit renders them as lists, not as projects.

**Routines have no type** — all recurring obligations live as items inside a single Routines special thread (`meta/routines`), regardless of which domain they belong to.

**Type history:** `system` → `program` (semantic expansion to "biggest unit"); `decision` → `evaluate`; `habit` merged into `routine`; `routine` removed (absorbed into Routines special); `mission` redefined from "long endeavor" to "in-between action and project".

---

## Status

| Status | Dir | Meaning |
|---|---|---|
| `prioritized` | `prioritized/` | Active and urgent — needs attention this week |
| `active` | `active/` | Active but not urgent |
| `captured` | `captured/` | Needs evaluation — initial state for new threads |
| `postponed` | `postponed/` | On hold — no timeline (was: eventually + dormant) |
| `closed` | `closed/` | Done, canceled, or archived |

Note: `prioritized` is a subset of `active`. When nothing is urgent, `prioritized/` is empty.

---

## Frontmatter

```yaml
---
created_on: YYYY-MM-DD
created_by: <agent identifier>
updated_on: YYYY-MM-DD
updated_by: <agent identifier>
domain: <domain>
subdomain: <subdomain | null>
type: <type>
status: <status>
due: YYYY-MM-DD        # optional
parent:                # optional — markdown link to parent thread file
tags:                  # optional — list of free-form tags
  - tag-name
---
```

Required: `created_on`, `domain`, `subdomain`, `type`, `status`. Audit fields (`created_by`, `updated_on`, `updated_by`) are conventionally present but not enforced.

**Known tags (grow organically):**
- `todo-in-rio` — requires physical presence in Rio to execute

---

## Body Structure

```markdown
---
frontmatter
---

next: single next action            # not for special-type threads
due: YYYY-MM-DD                     # inline due if different from frontmatter

## Context
Background info, history, why this matters. Optional.

## Subtasks                          # for project/mission/etc.
- [ ] subtask one
- [ ] subtask two `due: YYYY-MM-DD`

## Items                             # for special-type threads
- item one
- item two

## Comments
Free-form notes, raw details. Not timestamped — scratchpad, not a log.

## Updates
YYYY-MM-DD — first update, appended chronologically
YYYY-MM-DD — second update
```

**Rules:**
- `next:` and `due:` are bare inline text — no header, no bold
- Section order: inlines → Context → (Subtasks | Items) → Comments → Updates
- Comments is a free-form scratchpad — no timestamps
- Updates are append-only, newest at bottom, timestamped
- Closed threads: add a final update line with resolution note
- Parent thread links: `parent: [[260410-personal-...]]`

---

## Gaia Operating Protocol

**Session start:**
1. Glob `1 OFP/Threads/prioritized/*.md` and `1 OFP/Threads/active/*.md` for the working set
2. Read individual thread files only when working on them
3. Check inbox for pending messages

**Status changes (status = file location):**
1. Update frontmatter: `status`, `updated_on`, `updated_by`
2. Move file to the matching status dir
3. If renaming (domain, subdomain, type, or subject changes), rename in same operation

**New thread:**
1. Create file in `1 OFP/Threads/captured/` (or wherever appropriate)
2. Filename per convention; frontmatter complete
3. No index update needed — filesystem is the index

**Closed thread:**
1. Update `status: closed`, append final update line
2. Move to `closed/`

**Weekly review:**
- Glob `prioritized/` + `active/` for working set
- Walk threads being reviewed; promote/demote status as needed
- Capture sweep: walk `captured/`, qualify, move

---

## What This File Is Not

This is a schema and operating guide — not a thread database. The threads themselves live in `1 OFP/Threads/<status>/`. This file changes only when the system design changes.
