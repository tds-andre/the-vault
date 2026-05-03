---
type: function
awareness: MA all agents
---

# housekeeping

Maintenance routines. **Manually triggered in v3.0** — André invokes or asks. If not run, sessions grows, History So Far stales, state bloats.

Full-mode only. Atomic — start, complete, save, next.

## Routines

**Compact sessions** — when `sessions.md` exceeds soft target.
1. Move content older than threshold (e.g., 2 weeks) into `history.md` as a chapter (`## YYYY-MM`).
2. Refresh "History So Far" at top of `sessions.md`.

**Prune state** — when `state.md` bloats.
1. Move resolved/stale items to `history.md` (next compaction) or `notes/[topic].md` if worth preserving.
2. Trim closed open loops.

**Refresh History So Far** — after compaction, or when stale.
- Re-write the summary at top of `sessions.md` from last 2-3 chapters of `history.md`.

**Registry sweep** — monthly.
- Verify paths, repos, MCPs, enablers still correct. Flag stale.
- If `functions.md` lists a function whose body file is missing — flag.

**Inbox sweep** — weekly.
- Process or escalate stale messages. Move processed to `inbox/archived/`.

Log significant actions to `sessions.md`.
