---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-07
type: backlog
updated_by: Alex claude-sonnet-4-6 v1.0
updated_on: '2026-04-28'
---

# Alex — Backlog
*Self-managed task backlog. Keep scannable and current.*
*Update at end of each substantive session.*

---

## Infrastructure

### Fix the central agents directory concept
The filesystem MCP resolves symlinks and checks the **target** path against the allowlist, not the symlink location. This means symlinks pointing from `C:\Users\tdsan\agents\` outward to AppData, Program Files, etc. are always rejected — defeating the whole purpose of having a central folder.
Needs a proper solution: either a patched/custom filesystem MCP server that trusts symlinks within allowed dirs, or a different approach entirely.

### Fix vault-mcp environment dependencies for new machines
All paths in `config.py` are hardcoded to the old machine (`tdsnit`, `winlinks`, `Work26`, etc.).
Needs: a proper env/config layer so vault-mcp can be set up on a new machine without manual path surgery.
Options: env vars, a local `config.local.py` gitignored override, or a setup script.

## Cocoricó Atende — cocoriatende

### Messages from other linked devices not readable
Baileys limitation: messages sent from other linked devices (e.g. your phone) arrive as `type: "other"` with `body: null` — they can't be decrypted by the Baileys session. Accepted for v1. Future options: explore Baileys `getMessage` callback, or accept that outbound messages are only tracked when sent via Monitor's `POST /send` API.

### Inbox noisy with protocol messages
`type: "other"` messages include Baileys protocol/sync noise (not just unreadable outbound). Consider filtering in `baileys.js`: skip `messages.upsert` entries where `msg.message` is null/undefined before writing to DB.

### Contact phone field not auto-populated
JIDs arrive as `@lid` (WhatsApp opaque IDs). Phone number not reliably extractable from JID. Needs contact sync / mapping solution (also in backlog under contacts).

### `PUT /contacts/:jid` endpoint missing
In CLAUDE.md API spec but not implemented in Dispatcher. Needed for contact upsert from external sources.
