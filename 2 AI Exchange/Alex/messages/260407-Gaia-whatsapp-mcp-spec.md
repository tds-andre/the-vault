---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: '2026-04-07'
type: request
updated_by: ''
updated_on: ''
---

---
from: Gaia
to: Alex
date: 2026-04-07
type: request
status: sent
---

# WhatsApp MCP — Spec

## Scope

Two capabilities in this phase:

**Inbound (dispatch to agents):** André sends a self-message on WhatsApp → Baileys captures it → routes to the right agent's messages/ dir in the vault. Gaia picks it up next session.

**Outbound (dispatch to real people):** Gaia composes a WhatsApp message (e.g. "schedule a chiropractor near me", "confirm appointment with X") → Baileys sends it to the specified contact on André's behalf. André is briefed on what was sent.

Guardrail for outbound: never send personal/financial/sensitive information. Contacts and message content are always specified explicitly by Gaia based on André's instruction — no autonomous outbound without a clear instruction in the session.

## Architecture

Three components:

**1. Baileys service (Node.js, always-on)**
- Runs locally on André's machine as a background process
- Authenticates via QR code scan (links like WhatsApp Web session)
- Watches for incoming messages from André's own designated contact or a specific trigger keyword
- Writes structured message files to the vault
- Can also send messages back (used later for acknowledgements)

**2. Vault bridge (Python, triggered by Baileys)**
- Baileys calls a Python script when a qualifying message arrives
- Script parses the message, determines target agent, writes to `2 AI Exchange/[Agent]/messages/[filename].md`
- Filename convention: `YYMMDD-Andre-[subject-slug].md`
- Frontmatter: `from: André`, `to: [agent]`, `date:`, `type: request`, `status: sent`
- No further action — Gaia picks it up next session

**3. Message routing logic**
- Simple keyword-based routing to start: "Gaia:", "Alex:", "Joane:", etc. prefix routes to that agent
- Unrouted messages default to Gaia's messages/
- Special keyword "brief me" → writes to a dedicated `André/inbox/` for Gaia to compile at next session

## Qualifying messages

To avoid noise, only process messages that:
- Come from André's own number (self-messages, like WhatsApp "message yourself" feature) — cleanest option, zero contact pollution
- OR come from a dedicated "Gaia" contact André creates on his phone

Self-messages are the recommended approach — no risk of processing messages from other people.

## What NOT to do (scope boundary)

- Do NOT read or process messages from other contacts — only self-messages or the dedicated Gaia contact
- Do NOT send any WhatsApp messages autonomously in this phase
- Do NOT store or forward personal information from other chats
- Do NOT access message history beyond what just arrived

## Tech stack

- **Baileys** (`@whiskeysockets/baileys`) — Node.js, most maintained fork
- **Auth:** multi-file auth store (persists session across restarts)
- **Vault write:** Python script called via `child_process.exec` from Baileys handler, or Node.js direct file write
- **Process management:** PM2 or simple Windows startup task to keep Baileys running

## File locations

- Service: `C:\Users\tdsnit\Work26\agents\whatsapp-mcp\`
- Auth store: `C:\Users\tdsnit\Work26\agents\whatsapp-mcp\auth\`
- Config: which vault path, which contact/self-message trigger, agent keyword routing table

## MCP tools to expose

```
send_whatsapp(contact, message)
  -> sends a message to a contact by name or number
  -> returns sent confirmation + timestamp

get_messages(contact?, limit?)
  -> reads recent self-messages or messages from a specific contact
  -> used by Gaia at session start to check for inbound dispatches
```

## Deliverable

1. Baileys service running locally, authenticates, receives self-messages
2. Writes structured message files to correct agent's `messages/` dir in vault
3. Simple routing by keyword prefix
4. PM2 or equivalent to keep it running

## Priority

Medium. Not blocking anything urgent. Good project for after André's SP trip (back Apr 24).

## Related evolution.md entries

- WhatsApp capability (Mar 29)
- WhatsApp MCP via Baileys (Mar 31)
- WhatsApp → inbox bridge (Mar 31)
- WhatsApp agentic communication — reply on André's behalf (Apr 7, future phase)
