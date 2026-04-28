---
created_by: Alex claude-sonnet-4-6 v1.0
created_on: '2026-04-27'
type: spec
updated_by: ''
updated_on: ''
---

## Overview

Persistence layer over Baileys that makes it easy for other systems (AI agents, automation) to communicate via WhatsApp. On-prem, always-on. Three systems, one repo (`cocoriatende`), shared SQLite database.

---

## Architecture

### System 1 — WhatsApp Monitor (Node.js / Baileys)
- Always-on process
- Hooks into WhatsApp Web via Baileys
- Owns the SQLite DB and schema
- Writes contacts and messages to DB as events arrive
- Agnostic to business domain — no knowledge of agents or Cocoricó
- Exposes a minimal internal HTTP API for sending messages (called by System 2)

### System 2 — Dispatcher (Python)
- On during business operations
- Client of System 1's DB (read + write)
- Reads unhandled messages, decides what to do with them
- Dispatches to agents, updates `handled_by` and `notified_at`
- Exposes HTTP API for consumers
- Owns business logic

### System 3 — WhatsApp MCP (Python, future)
- Wraps System 2's HTTP API as MCP tools for AI agents
- Gaia's primary interface to WhatsApp
- Not in scope for first version

### Shared DB
- SQLite, single file
- Owned by System 1 (schema, migrations)
- System 2 reads and updates — never alters schema

---

## Domain Model

### Contact
| Field | Type | Notes |
|-------|------|-------|
| `jid` | TEXT PK | WhatsApp canonical ID (`@s.whatsapp.net` or `@lid`) |
| `phone` | TEXT | E.164 format |
| `name` | TEXT | As saved in André's phone contacts |
| `whatsapp_name` | TEXT | As registered in WhatsApp |
| `aliases` | JSON | Array of alternative names, numbers, IDs for search |
| `type` | TEXT | `individual` / `group` |
| `created_at` | DATETIME | |
| `updated_at` | DATETIME | |

### Message
| Field | Type | Notes |
|-------|------|-------|
| `id` | TEXT PK | WhatsApp message ID |
| `contact_jid` | TEXT FK | → Contact.jid |
| `direction` | TEXT | `inbound` / `outbound` |
| `type` | TEXT | `text` / `image` / `audio` / `video` / `document` / `sticker` / `other` |
| `body` | TEXT | Text content. NULL for non-text. |
| `media_ref` | TEXT | Path to media file on disk. NULL if not applicable. |
| `timestamp` | DATETIME | WhatsApp timestamp |
| `created_at` | DATETIME | When we stored it |
| `notified_at` | DATETIME | NULL until push attempted |
| `handled_by` | JSON | Array of consumer names. Empty = not handled. |

**Derived status (server-side logic, not a stored field):**
- `handled_by` empty + `notified_at` NULL → **captured**
- `handled_by` empty + `notified_at` NOT NULL → **notified**
- `handled_by` not empty → **handled**

---

## System 2 HTTP API

### Contacts
```
GET  /contacts           list all; optional ?q= searches name, whatsapp_name, phone, aliases
GET  /contacts/:jid      get one contact
PUT  /contacts/:jid      upsert contact
```

### Messages
```
GET  /messages           query with filters (see below)
GET  /messages/:id       get one message
PATCH /messages/:id      update notified_at or handled_by
```

**Query filters for `GET /messages`:**
- `contact` — JID, phone, or alias
- `direction` — `inbound` / `outbound`
- `type` — message type
- `status` — `captured` / `notified` / `handled`
- `since` — ISO timestamp
- `until` — ISO timestamp
- `last` — last N messages
- `today` — boolean shorthand

Example: `GET /messages?contact=5521973937982&status=captured&last=20`

### Inbox
```
GET  /inbox              all captured + notified messages, newest first
```
Shorthand for `GET /messages?status=captured,notified`.

### Send
```
POST /messages/send      { contact, body } — sends via System 1 + stores as outbound
```

---

## Open Questions (deferred)

- **Non-text messages** — store metadata only for now (`type`, `media_ref` = NULL). Media handling TBD.
- **Persons service** — contacts enrichment, multi-source identity resolution. Future.
- **Schema migrations** — not in scope for v1. Add if/when needed.
- **System 3 (MCP)** — not in scope for v1.

---

## Repo
`C:\Users\tdsnit\agents\repos\cocoriatende`

Two packages in one repo:
- `monitor/` — Node.js / Baileys (System 1)
- `dispatcher/` — Python / FastAPI (System 2)
