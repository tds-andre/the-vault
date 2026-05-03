---
type: history
---

# [Name] — History

Long-term archive. **Never loaded at boot.** Read on demand only.

Written by `housekeeping` during compaction: when `sessions.md` exceeds its soft size target, content older than the threshold (typically ~2 weeks) moves here as a chapter (`## YYYY-MM`). After moving, housekeeping refreshes "History So Far" at the head of `sessions.md` from the most recent chapters here.

Foreground agents do not write this file directly. If you find yourself wanting to add a long narrative entry, ask whether it belongs in `sessions.md` (a session entry) or `notes/[topic].md` (an evergreen briefing) instead.
