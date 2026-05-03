---
type: function
awareness: MA all agents
---

# housekeeping

Maintenance routines for the agent's own files. **Manually triggered in v3.0** — André invokes housekeeping (or asks the agent to invoke it). The cron mechanism for scheduled background runs is deferred post-v3.0. If housekeeping doesn't run, `sessions.md` grows, "History So Far" goes stale, `state.md` bloats, the registry drifts.

**Full mode only.** Each routine is atomic — start, complete, save, then move to the next. Don't leave a routine half-done.

Log significant actions to `sessions.md` so the trail captures what was pruned, compacted, or swept.

---

## Routines

### Compact sessions

Trigger: `sessions.md` exceeds soft size target (~150 entries or noticeable scroll friction).

1. Identify content older than threshold (typically ~2 weeks).
2. Move that content into `history.md` as a chapter: `## YYYY-MM`.
3. Refresh "History So Far" at the head of `sessions.md` from the most recent 2-3 chapters of `history.md` — this is the rolling summary every full agent reads at boot.

### Prune state

Trigger: `state.md` is bloating with closed loops, stale items, or one-off context that's no longer current.

1. Move resolved items to `history.md` (next compaction event) if they have narrative value, or to `notes/[topic].md` if they're worth preserving as evergreen knowledge.
2. Trim closed open loops; remove obsolete priorities; tighten the "About André" view if it's drifted from current reality.
3. Don't delete things wholesale — when in doubt, archive rather than discard.

### Refresh History So Far

Trigger: stale (no compaction in a while), or after `compact sessions` ran without an automatic refresh.

Re-write the head section of `sessions.md` from the last 2-3 chapters of `history.md`. Keep it short — this is a rolling summary, not a digest. Goal is enough context for a fresh full session to know what shaped recent state.

### Registry sweep

Trigger: monthly cadence, or when something feels off.

1. Walk every registry file (`paths.md`, `repos.md`, `tools.md`, `enablers.md`, `functions.md`, your own `[agent].md`).
2. For each entry: does the resource still exist where claimed? Has it been renamed? Is the description still accurate?
3. For `functions.md` specifically: every listed function should have a body file at the claimed location. If not, the function is broken or moved — flag and resolve.
4. Fix what you can; flag what you can't (escalate to Gaia or the relevant agent via inbox).

### Inbox sweep

Trigger: weekly cadence, or when inbox is visibly cluttered.

1. Walk `inbox/`. For each unprocessed message:
   - Process it now (if quick) and archive.
   - Surface to André (if it needs his decision).
   - Escalate to the appropriate Primarch (if it's not in this agent's domain).
2. Archive resolved messages to `inbox/archived/`.
3. For Gaia: do **not** touch messages with `to: André` — those are André's to manage.

### Notes consolidation

Trigger: a `notes/[topic].md` has `## Updates` accumulating ~10 entries, or `## Overview` is visibly stale.

Per the note-authoring function's consolidation steps: rewrite Overview to absorb current understanding, integrate Updates into Details, append to Changelog, clear Updates.

---

## When in doubt

- **Don't compact aggressively.** Better to leave `sessions.md` slightly long than to prune entries that turn out to have been load-bearing.
- **Don't archive ambiguous messages.** They resurface at next boot — that's the safety net.
- **Always log to `sessions.md`** what housekeeping did. The trail matters.
