---
type: sessions
---

# [Name] — Sessions

Append-only session log. **Loaded at boot — read in full** so you can reconcile any narrow appends that landed since your last full session.

Two sections: a rolling **History So Far** at the head (refreshed by housekeeping during compaction) and an **append-only tail** of session entries. Both fulls and narrows append to the tail; only housekeeping rewrites the head.

Entry format: `### YYYY-MM-DD — [summary] ([vessel: full | narrow], owner: [André | <Primarch>])`. Include date, vessel, and what happened. Keep entries factual and concise — this is the trail, not the analysis.

---

## History So Far

*(Refreshed by housekeeping. Rolling summary of `history.md`. Empty until first compaction.)*

---

## Sessions
