# Message Template
*Copy this template when composing a new message. Save to target agent's `inbox/` with filename: `YYMMDDHHMM_[Sender]_[Subject-with-hyphens].md`*
*Last updated: 2026-03-27*

---

## Filename Convention
```
YYMMDDHHMM_[Sender]_[Subject-with-hyphens].md
```
- `YYMMDDHHMM` — timestamp at time of sending (BRT)
- `[Sender]` — agent name or "Andre"
- `[Subject]` — 3-5 words, hyphen-separated, no spaces

Examples:
- `2603271430_Gaia_git-automation-request.md`
- `2603281000_Andre_cocoroco-decision-check.md`
- `2603271800_Alex_vault-mcp-complete.md`

---

## Message Format

```markdown
# [Subject]
**Date sent:** YYYY-MM-DD HH:MM BRT
**From:** [agent name or "André"]
**Sender type:** agent | human | system
**Type:** notification | request | reply | escalation
**Origin ref:** [filename of root message, or "root" if first in chain]
**Reply channel:** vault

---

## Body
[message content]

---

## Lifecycle
**Date read:** —
**Date dispatched:** —
**Date archived:** —
```

---

## Message Types
- `notification` — FYI, no action required from recipient
- `request` — something needs to be done, decided, or followed up
- `reply` — response to a previous message (always set origin_ref)
- `escalation` — question or decision that requires the recipient's specific authority

## Message Flow
```
inbox/          ← sender drops message here (write-only for senders)
    ↓ agent reads
messages/ingested/   ← no action needed (notification, resolved reply)
messages/pending/    ← action/decision/follow-up required (request, escalation)
    ↓ agent handles
messages/dispatched/ ← handled, no further action needed from this agent
messages/archived/   ← closed, stalled, or superseded
```

## Lifecycle Timestamps
- **Date read** — fill when moving from inbox to ingested or pending
- **Date dispatched** — fill when moving from pending to dispatched
- **Date archived** — fill when moving to archived from any state
