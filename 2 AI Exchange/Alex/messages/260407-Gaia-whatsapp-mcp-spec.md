---
from: Gaia
to: Alex
date: 2026-04-07
type: request
status: sent
---

# WhatsApp MCP — Spec

## Scope

**Outbound only** — Gaia sends WhatsApp messages to real contacts on André's behalf during a session. Inbound (self-message dispatch) deferred — André will try Anthropic's Dispatch feature first.

Use cases:
- "Schedule a chiropractor near me" → Gaia finds the number, composes the message, sends it
- "Confirm appointment with X" → Gaia sends a confirmation message
- Any task that requires reaching a real person via WhatsApp

**Guardrail:** never send personal/financial/sensitive information. All sends are explicitly instructed by André in the current session — no autonomous outbound.

---

## Architecture

Two components:

**1. Baileys service (Node.js, always-on)**
- Runs locally on André's machine as a persistent background process
- Authenticates via QR code scan (links like a WhatsApp Web session)
- Exposes a `send_whatsapp(contact, message)` interface
- No inbound message processing in this phase

**2. MCP tool (exposed to Claude Desktop)**
- Wrap Baileys into a vault-mcp tool or standalone MCP server
- Gaia calls `send_whatsapp(contact, message)` during a session
- Returns confirmation + timestamp
- Gaia logs the send to memory or relevant thread

---

## MCP tools to expose

```
send_whatsapp(contact, message)
  -> contact: name as it appears in André's contacts, or phone number
  -> message: text to send
  -> returns: sent confirmation + timestamp

get_contacts(query?)
  -> optional fuzzy search across André's contact list
  -> helps Gaia find the right contact before sending

await_replies(contact, timeout_seconds=300, since?)
  -> polls for incoming messages from a specific contact
  -> timeout_seconds: how long to wait before giving up (default 5 min)
  -> since: timestamp to filter replies after a specific send
  -> returns: list of reply messages with timestamps, or empty if timeout
  -> used after send_whatsapp() to close the loop (e.g. confirm appointment booked)
```

Typical outbound flow:
1. get_contacts() — find the right contact
2. send_whatsapp() — send the message
3. await_replies() — wait for confirmation
4. Log outcome to vault (thread or memory)

---

## Tech stack

- **Baileys** (`@whiskeysockets/baileys`) — Node.js, most maintained fork
- **Auth:** multi-file auth store (persists session across restarts)
- **Process management:** PM2 to keep Baileys running across reboots

---

## File locations

- Service: `C:\Users\tdsnit\Work26\agents\whatsapp-mcp\`
- Auth store: `C:\Users\tdsnit\Work26\agents\whatsapp-mcp\auth\`

---

## Deliverable

1. Baileys service running locally, authenticated
2. `send_whatsapp()` and `get_contacts()` tools exposed via MCP
3. PM2 keeping it alive across reboots
4. Registered in `claude_desktop_config.json` and `~/.claude/settings.json`

---

## Priority

Medium. Not blocking anything urgent. Good project for after André's SP trip (back Apr 24).

---

## Related

- evolution.md: WhatsApp capability, WhatsApp MCP via Baileys, WhatsApp agentic communication
