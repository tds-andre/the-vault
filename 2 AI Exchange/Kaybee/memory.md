---
created_by: Kaybee v1.0
created_on: 2026-03-29
updated_by: Gaia claude-opus-4-6 v2.0
updated_on: 2026-04-06
type: memory
---

# Kaybee — Memory
*Persistent context. Most recent entries at the top.*

---

## Session: 2026-04-06 (v2.0 migration + cbrs-studio-dark)

### v2.0 architecture migration
Migrated from v1.1 to v2.0 file structure by Gaia. New files: boot.md, system.md, index.md. Messaging protocol deprecated. Old files preserved but superseded.

### New repo: cbrs-studio-dark
- **Location:** `C:\Users\tdsnit\Work26\cbrs-studio-dark`
- Fresh project — dark theme default, React from day 1, all learnings from lite baked in
- CLAUDE.md, tasks.md, initial-prompt.md written
- André about to run initial prompt in Claude Code

### cbrs-studio-lite state
- React branch complete (draggable markers, charts fixed). Vanilla JS on main.
- Waiting for Jesse's API spec.

### Three-way workflow validated
- Claude Code leaves session logs in tasks.md, Kaybee syncs by reading repo ✅
- CLAUDE.md never modified by Claude Code ✅

### Open threads
- [ ] André running initial prompt on cbrs-studio-dark
- [ ] Jesse's API spec still pending
- [ ] Friday meetings with Jesse — show progress
- [ ] André exploring Copilot/VS Code as alternative coding client

---

## Session: 2026-04-06 (MVP pivot + repo setup)

### Major pivot from 0401 meeting
- Jesse simplified MVP: two clicks on map (Tx+Rx), default assumptions, one API call, elevation + path loss plots. Reset. Done.
- Public tool, no auth. Client-side except one API call.
- Jesse will send API spec — André's team is the client, not the computation backend builder.
- Previous plans (Tx inventory, coverage heatmaps, Network View) all deferred.

### cbrs-studio-lite repo set up
- `C:\Users\tdsnit\Work26\cbrs-studio-lite`
- CLAUDE.md + tasks.md + initial-prompt.md written
- Tech: Python/FastAPI backend, vanilla HTML/CSS/JS frontend, MapLibre, Plotly.js

---

## Session: 2026-03-30 (meeting prep)

### Plan v2 produced
- Red-teamed Jesse's feedback, identified gaps and inconsistencies
- 5 planners spec'd, shared computation layer, phased roadmap
- Pre-computation: urban+suburban sweet spot ~7.5 days/32 cores, ~1.7 TB
- Decision: regional pilot first, hybrid approach (Free Space → ITM → RT)
- Propagation models: Free Space (instant), ITM (standard), Sionna RT (urban GPU)

---

## Session: 2026-03-29 (founding session)

### Context established
- Renamed Keybridge → Kaybee
- André reports to Jesse (CEO), part-time, relationship stabilized
- CBRS Studio is the main deliverable
- Jesse's 5 functional goals: Forward, Reverse, Link, Network Optimizer, Network View
- Stack: Python for Studio, Java broadly at KB

---
*Format: new sessions prepended at top, founding session preserved permanently*
