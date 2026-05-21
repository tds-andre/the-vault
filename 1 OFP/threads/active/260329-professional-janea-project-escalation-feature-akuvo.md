---
created_on: 2026-03-29
created_by: André
updated_on: 2026-05-03
updated_by: Gaia (cockpit refactor)
domain: professional
subdomain: janea
type: project
status: active
due:
parent:
---
This is done, close it.


next: FUP Filip's message Sunday/Monday — then Phase 3

## Context
Multi-phase escalation analysis project at Akuvo. Full reference: `Janea Akuvo/Escalation Analysis/status-overview.md`

## Phases

- **Phase 1** ✅ — Single-client deep dive (prod-31). 23% coverage, 3.5x negative lift, 69% recurrence at 30d. Presented Friday Apr 4.
- **Phase 2** ✅ — Cross-client pipeline + validation. 21/21 Rich clients ran, all lifts positive, 100% consistency.
- **Phase 2.5** ✅ — Cross-client data quality sanity check. Key decisions: exclude DQ ≤1 day, remove clients 60/91/96, normalize activity sets. 18 clients remaining.
- **Phase 3** ← current — Cross-client analysis. Update pipeline with normalized sets + DQ filter, re-run 18 clients, Layer 1 (universality) + Layer 2 (variation drivers), cross-client report + presentation.

## Updates
2026-03-29 — thread created, Phase 1 complete
2026-04-03 — FUP Filip flagged for Sunday/Monday
2026-04-05 — Phase 1 presented Friday. Phase 2 + 2.5 done. Phase 3 is current. Thread updated with full phase structure from status-overview.md.
2026-05-03 — schema migrated to v3; subdomain janea
