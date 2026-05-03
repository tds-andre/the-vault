---
created_by: Kaybe claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: history
updated_by: ''
updated_on: ''
---

# Kaybe — History

Long-term archive. Never loaded at boot. Written by housekeeping only.

---

## Preface — v2 era as Kaybee (2026-03 to 2026-05)

Migrated from v2 on 2026-05-02. v2 lives at `2 AI Exchange/Kaybee/` and is preserved as-is. **Spelling changed at the cut: Kaybee → Kaybe.** The narrative below preserves what shaped this agent before v3.

### Founding (2026-03-29)

Created as André's specialized agent for his part-time work at **Key Bridge** — US telecom, CBRS (Citizens Broadband Radio Service). Renamed at founding from `Keybridge` → `Kaybee`. Reports-to: Jesse (CEO). André's career goal: become indispensable across Java, operations, ESC, Map/Viz.

Founding session: established CBRS Studio as the main deliverable. Jesse's 5 functional goals at the time: Forward, Reverse, Link, Network Optimizer, Network View. Stack: Python for Studio, Java broadly at KB.

### Plan v2 (2026-03-30)

Red-teamed Jesse's feedback. Spec'd 5 planners with shared computation layer, phased roadmap. Pre-computation analysis: urban+suburban sweet spot ~7.5 days/32 cores, ~1.7 TB. Decision: regional pilot first, hybrid approach (Free Space → ITM → RT). Propagation models lined up: Free Space (instant), ITM (standard), Sionna RT (urban GPU).

### MVP pivot + repo setup (2026-04-01 → 2026-04-06)

Jesse simplified dramatically at the 2026-04-01 meeting: two clicks on map (Tx+Rx), default assumptions, one API call, elevation + path loss plots. Reset. Done. Public tool, no auth. Client-side except one API call. Jesse's team is the client, not the computation backend builder. Previous plans (Tx inventory, coverage heatmaps, Network View) all deferred.

`cbrs-studio-lite` set up at `C:\Users\tdsnit\Work26\cbrs-studio-lite`. CLAUDE.md + tasks.md + initial-prompt.md written. Tech: Python/FastAPI, vanilla HTML/CSS/JS frontend, MapLibre, Plotly.js.

### v2.0 architecture migration + cbrs-studio-dark (2026-04-06)

Migrated from v1.1 to v2.0 file structure by Gaia. New files: `boot.md`, `system.md`, `index.md`. Messaging protocol deprecated.

Same day: spun up `cbrs-studio-dark` at `C:\Users\tdsnit\Work26\cbrs-studio-dark` — fresh project, dark theme default, React from day 1, all learnings from `lite` baked in. Three-way workflow validated: Claude Code leaves session logs in tasks.md, Kaybee syncs by reading the repo. CLAUDE.md never modified by Claude Code.

### Three-Way Workflow Protocol authored (2026-04-23)

Wrote and published the Three-Way Workflow Protocol at `2 AI Exchange/protocol-three-way-workflow.md`. Codified the Architect / Builder / Principal split, the CLAUDE.md + tasks.md sync contract, the bootstrap files (CLAUDE.md, tasks.md, initial-prompt.md), and anti-patterns (Builder modifying CLAUDE.md, Architect not reading session logs, Principal as full-time relay, CLAUDE.md too long).

Alex reviewed same day — added "Notes from Alex (Infrastructure)" section: shell-capable Architects can sync via git commands not just file reads; recommended `%USERPROFILE%/agents/repos/<slug>/` repo location convention; CLAUDE.md size discipline (<400 lines; externalize to `docs/`).

Validated end-to-end on CBRS Studio across three sprints (mock MVP → React migration → live API integration). Picked up by Alex on `cocoripede`.

### v3 design + rename (2026-04-28 → 2026-05-02)

André drove the v3 redesign of the AAE. v3 root is `2 Agents/`; v2 (`2 AI Exchange/`) coexists; no cross-reference. Awareness ontology (I / ML / MA / F), Primarch / Narrow / Servitor types, `boot.md` as sole orchestrator. Renames in flight: Kaybee → Kaybe; Cocoria → Cocorita.

Role generalized at v3: from Key Bridge specialist (CBRS Studio planner/Architect) to product / strategy / coding-protocols agent across André's coding work — CBRS Studio is one application.

### Lessons that shaped this agent

- **Architect ≠ relay.** The CLAUDE.md + tasks.md sync contract exists so the Principal isn't a full-time middleman. If session logs go missing, the protocol breaks.
- **CLAUDE.md must be scannable.** Under ~400 lines. Externalize API contracts and glossaries to `docs/`. Builder context overflows otherwise.
- **Builder never modifies CLAUDE.md.** Spec drift the Architect doesn't see is the failure mode.
- **Know Jesse's priorities before optimizing technically.** Jesse pivots; technical elegance wasted on the wrong product.
- **Delivery over perfection.** Ship incrementally. Jesse values working software.

### Carried forward to v3

- Three-Way Workflow Protocol — authored, validated, ported to v3 as note + function.
- CBRS Studio domain context — current state preserved in `state.md`; needs resync on first full session (3-week drift).
- Three-way workflow as a pattern, not just a CBRS thing — generalized to all of André's coding work.
- Tone: technical, focused, structured-when-it-merits-it, not preachy.
- Domain split: deep tech infra → Alex; cross-domain → Gaia; financial → Ben; Akuvo data → Joone.
