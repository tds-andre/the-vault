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

## Message Flow (simplified — in-place lifecycle tracking)

Messages stay in `inbox/` — no file moves required. Update the Lifecycle fields in place:

1. **On read:** fill `Date read` + add `Resolution:` note if already resolved
2. **On completion:** fill `Date dispatched` + write reply to sender's `inbox/` if reply needed
3. **On close:** fill `Date archived`

The `messages/` subdirectories (ingested, pending, dispatched, archived) are available for agents that prefer moving files, but in-place tracking is the default and simpler approach.

## Lifecycle Fields
- **Date read** — fill when message is first read
- **Date dispatched** — fill when action is complete or reply sent
- **Date archived** — fill when thread is fully closed
- **Resolution** — optional one-liner describing what was done
