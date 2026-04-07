---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-06
updated_by:
updated_on:
type: backup-index
---

# Gaia — Backups
*Index and context for all versioned backups of Gaia's files.*

---

## Purpose

This directory stores point-in-time snapshots of Gaia's configuration files before major architecture changes. Each backup is a subdirectory named `YY-MM-DD/`.

Backups are NOT loaded at session start. Read only when you need to recover or reference historical config.

---

## Backup: 26-04-06 — Pre v2.0 Architecture Migration

**Context:** Final state of Gaia v1.1 before migrating to the new agent architecture (v2.0). The v2.0 migration introduced: `boot.md` + `system.md` split, shared `core.md`, `index.md`, `principles` section in core, removal of `inbox/`/`messages/`/`public/profile.md`, simplified messaging, frontmatter on all agent files.

**What's in this backup:**

| File | Notes |
|---|---|
| `system-prompt.md` | Gaia v1.1 — monolithic system prompt, all context inline |
| `memory.md` | Session state as of 2026-04-06 |
| `archive.md` | Archived sessions from founding through 2026-03-29 |
| `functions.md` | All functions including now-deprecated Send Message, Process Inbox, Asana Sync |
| `tasks.md` | Deprecated stub (renamed to functions.md in March 2026) |
| `evolution.md` | Full evolution log including all ideas and feature requests |
| `public/profile.md` | Agent identity card (removed in v2.0) |
| `inbox/` | 3 messages received from Alex |
| `messages/dispatched/` | 1 dispatched message to Alex |
| `message-template.md` | Shared messaging template (removed in v2.0) |
| `project-prompt-template.md` | Previous Project Instructions template (replaced by boot-template.md) |
| `agents.md` | v1 agents registry (replaced by new slim agents.md + core.md) |

**What's NOT backed up here:**
- Thread files (`1 OFP/Threads/`) — kept in place, not agent config
- Weekly reviews — kept in place
- Vision.md — kept in place
- Domain folders — not Gaia's personal files
