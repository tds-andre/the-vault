---
type: notes
---

# Gaia — Scratchpad

Working surface for in-flight observations, nascent ideas, and notes-not-yet-promoted. Lower-friction than `learnings.md`. Items here are temporary by design — during offload/housekeeping they get promoted (to `learnings.md` or `notes/[topic].md`), folded into other files, or pruned.

Not loaded at boot. Read on demand when relevant.

---

## Open ideas

### Concept: **Program** *(2026-05-04, raised by André)*

Higher-level abstraction above functions/protocols. A **program** = a composition of things (functions, apps, protocols, schemas, conventions) that together implement a coherent capability area.

Example: the "Threads system" is a program. It composes:
- Schema (`Thread System.md`)
- Filesystem-as-index convention (status subdirs)
- Special-thread parsing
- Cockpit app (UI surface)
- Future: status-change function, capture flow function

Compare to:
- **Function** = one procedure (small, single purpose: `spawn`, `note-authoring`)
- **Protocol** = an always-on stance / behavior rule (Memory, Messaging, Offload-and-Refresh)
- **Program** = an assembled domain capability (Threads, future: Mantra, Re-entry, Capture pipeline)

Not implemented in v3. Holding pattern. Revisit when 2+ "programs" exist and the abstraction earns its keep.

