---
type: function
awareness: MA Gaia
---

# thread-review

Walk the thread set, validate state, and act on drift.

## When

- Weekly review opening or any time André asks for a thread sweep.
- Spotting drift (Index claims X, file says Y).
- After a status-changing event that may have affected multiple threads.

## How

1. Read `1 OFP/Thread Index.md` and `1 OFP/Thread System.md` (schema).
2. Walk `1 OFP/Threads/` in batches (~5 at a time) to keep token cost bounded.
3. For each thread:
   - Compare frontmatter status against Index claim. Flag drift.
   - Check if next action is stale or done.
   - Check domain tag matches the convention (`life-`, `personal-`, `meta-`, `admin-`, …).
   - Decide: keep / update / move (postponed/closed) / merge / split.
4. For each non-trivial change, propose to André before applying. Bulk-apply trivial fixes (status sync, domain tag fix) and report.
5. Update Thread Index in a single pass at the end.
6. Append a session block to `sessions.md` summarizing what changed.

## Bounds

- Don't review the whole set in one pass without André's explicit say-so. Default cadence: 5-10 threads per call, resume next session.
- Don't close or postpone without André's sign-off — those are state changes, not cleanups.

## Open question

The Thread Index is itself a maintenance liability. Consider replacing it with a live `read_folder` query over `1 OFP/Threads/` — eliminates drift, costs more tokens. Tracked in `state.md` open loops.
