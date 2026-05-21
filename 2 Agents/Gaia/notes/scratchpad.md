---
type: notes
---

# Gaia — Scratchpad

Working surface for in-flight observations, nascent ideas, and notes-not-yet-promoted. Lower-friction than `learnings.md`. Items here are temporary by design — during offload/housekeeping they get promoted (to `learnings.md` or `notes/[topic].md`), folded into other files, or pruned.

Not loaded at boot. Read on demand when relevant.

---

## Resurface Queue

Items deliberately closed with intent to resurface at next weekly review. Each item: thread name, why closed, what to evaluate when resurfaced.

- **[[260329-meta-meta-project-toggl-time-accounting]]** *(closed 2026-05-08)* — Toggl tracking project; closed pending data review. At next weekly review (>= 2026-05-24): pull Toggl data, evaluate whether to revive as project or fold the time-accounting practice into the weekly review template itself.

---

## Side quests — thread review v2 (2026-05-08)

Captured during André's `[A]:` annotation pass on prioritized + active threads. Not solved now; revisit when relevant or during housekeeping.

- **Routine surfacing UX** — every routine now lives inside the Routines special thread (`meta/routines`). How do they get surfaced when due (1st of month, end of month, etc)? Cockpit Operational view? Scheduled-task mechanism? Open.
- **"Resurface this on next weekly review" mechanism** — toggl-time-accounting was closed with intent to resurface in next weekly review. Where does that reminder live? Probably a `## Resurface Queue` section in the weekly review template, or in `meta/capture-inbox` with a tag. Not designed yet.
- **Products list "Thread system is failing" concern** — André wants the canonical list of aesthetic products (cleanser, caffeine cream, La Roche serum, SPF50) findable somewhere. Currently scattered in eye/skin thread bodies. The new Face Revamp parent project should consolidate, or it lives in `Personal/Aesthetics/action-plan.md` referenced from there. Decide canonical home.
- **Aesthetics action-plan.md integration** — `Personal/Aesthetics/action-plan.md` exists as external doc. Face Revamp parent should either reference it or absorb key content into the thread body. Threads can reference externals but should be self-contained "to an extent" (André's words).
- **Cocoricó thread linkage policy** — every cocoricó-related thread should link to `cocorico-revamp` (forward or back). Apply on creation of new cocoricó threads going forward.
- **Common subdomain patterns to watch** — `assets/management`, `assets/credit`, `assets/security`, `meta/routines`, `meta/maintenance`, `meta/management`. If patterns crystallize, can be added as descriptive (not prescriptive) in spec.
- **`Thread Base.base` validation** — Obsidian Base view file. Updated `updated` → `updated_on` (2026-05-08). Still uses `file.folder == "1 OFP/Threads"` filter — unclear if matches nested status subdirs in Obsidian Base; André should validate the view loads correctly and adjust filter (e.g. `startsWith`) if needed. Also has stale `note.Acquisition` reference — harmless, can clean later.

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

