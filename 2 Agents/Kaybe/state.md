---
created_by: Kaybe claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: state
updated_by: ''
updated_on: ''
---

# Kaybe — State

Working memory. Full mode only writes here. Single mutable surface.

## About André (this agent's view)

37yo ML engineer, Niterói. Senior software fundamentals. Top-down generalist with deep spikes.

**Roles relevant to me:**
- **Key Bridge** — part-time, US telecom, CBRS. Reports to Jesse (CEO). Goal: become indispensable (Java asset, operations, ESC, Map/Viz).
- **Janea / Akuvo** — main, ML Analytics engineer. Joone's domain, but coding-strategy framing for that work can land here.
- **Cocoricó** — restaurant; CocoriPede project sits in Alex's lane, but product framing may surface here.

**Working pattern:** wants prototypes fast, will cut me back when I over-engineer. Reads code carefully, catches drift. Commits manually — does not want me running `git`.

**Tech profile (relevant to me):** Python primary, JavaScript/HTML/CSS fluent. Java + C++/CUDA + C# + C solid. Current stack: Azure/Synapse/Spark at Akuvo, Java/CBRS at Key Bridge. AI tools: Claude (daily), Copilot/VS Code, Claude Code CLI, Cowork.

## Current state

### v3 ecosystem cutover (active)

- AAE v3 spec finalized 2026-05-01 by Gaia. Lives at `2 Agents/specs/specs.md`.
- v2 (`2 AI Exchange/`) and v3 (`2 Agents/`) coexist; no cross-reference.
- Gaia and Alex migrated to v3 today. I'm being migrated now (this session).
- Renames in flight: **Kaybee → Kaybe** (this); Cocoria → Cocorita.
- `aae-mcp-3.1` shipped today (Alex). Spawn smoke-tested.

### Three-Way Workflow protocol

- Created by me (then Kaybee) 2026-04-23, validated on CBRS Studio.
- Alex reviewed 2026-04-23 — added "Notes from Alex (Infrastructure)" section: shell-capable Architects, repo-location convention (`%USERPROFILE%/agents/repos/<slug>/`), CLAUDE.md size discipline.
- v2 lives at `2 AI Exchange/protocol-three-way-workflow.md`. Ported to v3 as `notes/three-way-workflow.md` (reference) + `functions/three-way-workflow.md` (bootstrap procedure).
- Used in production on `cbrs-studio-lite`, `cbrs-studio-dark`, and (Alex side) `cocoripede`.

### CBRS Studio — current state (carried from v2 memory)

- **MVP pivot (2026-04-01):** Jesse simplified — two clicks on map (Tx+Rx), default assumptions, one API call, elevation + path loss plots. Public tool, no auth.
- **Two repos:**
  - `C:\Users\tdsnit\Work26\cbrs-studio-lite` — vanilla JS main + React branch. React branch complete (draggable markers, charts fixed).
  - `C:\Users\tdsnit\Work26\cbrs-studio-dark` — fresh, dark theme, React from start. Initial prompt was being run when v2 last logged.
- **Jesse's API spec** still pending (as of last v2 capture) — mock Friis + random terrain until then.
- **Friday meetings** with Jesse — show progress.
- **Tech stack:** Python/FastAPI backend, React (Vite), MapLibre GL JS, Plotly.js. Broader KB system: Java, MariaDB, Hazelcast, Cassandra, Prometheus.

### Key collaborators in my domain

- **Jesse** — Key Bridge CEO, sets product direction for CBRS Studio.
- **André** — Principal in the three-way workflow.
- **Alex** — infrastructure peer; reviews protocol for tooling implications, owns Builder integrations end-to-end.
- **Gaia** — escalation for cross-domain / career-level KB decisions.

## Open loops

- **Resync CBRS Studio current state.** v2 last captured 2026-04-06. Three weeks of drift. First action post-cutover: ask André for status on `cbrs-studio-dark`, Jesse's API spec, recent meetings.
- **Three-Way Workflow protocol next iteration.** Alex's three additive notes (shell-capable Architects, repo-location convention, CLAUDE.md size discipline) are integrated as comments in v2. Decide whether to harden as v3 conventions and update `notes/three-way-workflow.md`.
- **Builder tool comparison.** André was exploring Copilot/VS Code as alternative to Claude Code (v2 open thread). With v3 + aae-mcp + Cowork shipped, the landscape changed. Worth a fresh sweep.
- **CBRS Studio specialized notes.** Gaia nudged in v2 (2026-04-09) to seed `notes/cbrs-studio-state.md` and `notes/cbrs-domain.md`. Never done. v3 `notes/` directory exists; seed when there's something concrete worth recording.
- **Blog post — rendering Sionna RT on a map.** Captured from v2 todo list, kept; never actioned.

### Inherited from v2 backlog

- v2 `backlog.md` was empty. No items to carry.

## Notes

- `notes/learnings.md` — accumulated learnings, blind spots.
- `notes/three-way-workflow.md` — the protocol itself, evergreen reference.
- `notes/migration-notes.md` — issues and decisions from v2→v3 migration.
