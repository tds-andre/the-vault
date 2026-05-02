---
type: function
awareness: F
status: stub
---

# healthcheck

System drift / health check. Runs as a doctor servitor (typically) or as a narrow.

**Status:** stub for v3.0. Implementation deferred — typed servitor concept on hold; cron mechanism for UC3 deferred.

## Intent

When the system feels off (refresh protocol P10 didn't restore clarity, or André reports drift, or background schedule fires), spawn this to:

- Verify identity, mode, and core protocols are loaded as expected
- Cross-check `state.md` vs `sessions.md` tail for unreconciled narrow appends
- Spot stale or broken file references
- Check inbox for stuck messages
- Surface anomalies as a report

## Inputs (TBD)

- Target Primarch
- Depth: light (in-context only) | full (cross-checks files)

## Output

Markdown report to owner's inbox.

## Implementation

To be designed. For v3.0, treat as a placeholder — André may invoke manually by spawning a narrow with explicit instructions until this is built.
