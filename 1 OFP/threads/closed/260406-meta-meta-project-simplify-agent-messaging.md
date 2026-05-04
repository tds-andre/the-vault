---
created_on: 2026-04-06
created_by: André
updated_on: 2026-05-03
updated_by: Gaia (cockpit refactor)
domain: meta
subdomain:
type: project
status: closed
due:
parent:
---

next: —

## Context
Current inter-agent messaging uses individual files in inbox/ directories with lifecycle fields (Date read, Date dispatched, Resolution). Works but is heavy — creating, updating and moving files for every message adds friction and makes the system harder to maintain at scale.

Goal: simplify so agents can communicate with less ceremony. Ideas to explore:
- Single inbox file per agent (append-only log) instead of one file per message
- Simpler lifecycle tracking (e.g., a status line in a shared log)
- Reduce required fields to the minimum that makes messages actionable
- Consider whether some messages are just vault updates and don't need a messaging protocol at all

## Updates
2026-04-06 — thread created
2026-04-07 — closed: resolved by v2.0 architecture. New protocol: agents write to messages/ dir with frontmatter status fields (sent/read/closed), no lifecycle files, no inbox/, messages/closed/ for resolved items. Ceremonyfree, simple.
2026-05-03 — schema migrated to v3; was already closed
