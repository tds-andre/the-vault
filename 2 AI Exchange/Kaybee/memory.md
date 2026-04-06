# Kaybee — Memory
*Persistent context. Most recent entries at the top.*

---

## Session: 2026-04-06b (sync after Claude Code sessions)

### Code sessions completed
- **Session 1:** Full vanilla JS MVP scaffold. FastAPI backend (3 endpoints, mock Friis + random terrain), MapLibre map, Plotly charts, two-click flow, Reset button. All working.
- **Session 2:** React migration on `react` branch. Vite + React, react-map-gl (MapLibre), react-plotly.js. Draggable Tx/Rx markers with live API re-calls (AbortController for rapid drags). Charts taller (320px), legend overlap fixed. All original tasks complete.

### Current repo state
- **Branch:** `react` (active development)
- **Backend:** FastAPI, unchanged, 5/5 tests passing
- **Frontend:** `frontend/` — Vite + React, 5 components (Header, MapView, LinkSummary, ElevationChart, PathLossChart)
- **Dev flow:** Vite on :5173 proxies `/api` to FastAPI on :8000
- **Production:** `vite build` outputs to `../static`, served by FastAPI

### CLAUDE.md updated
- Project structure now reflects React app layout
- Tech stack: react-map-gl, react-plotly.js, Vite
- Frontend approach section updated

### Mock analysis reviewed
- Elevation: random walk + cumulative sum + smoothing, seeded by coordinate hash, ~50m base
- Path loss: Friis free-space + terrain-correlated fading (0-6 dB excess)
- Known limitation: terrain not spatially continuous — hash seeding means nearby positions can produce very different profiles. Visible when dragging markers. Will be replaced by Jesse's real API.

### Three-way workflow validated
- Claude Code left clean session logs in tasks.md ✅
- Kaybee (me) was able to sync by reading tasks.md + scanning repo ✅
- CLAUDE.md was not modified by Claude Code ✅
- Workflow is working as designed

### Open threads
- [ ] **Jesse's API spec** — still waiting. When it arrives, update CLAUDE.md + implement real_link.py
- [ ] Friday meeting with Jesse — show React prototype with draggable markers
- [ ] André exploring Copilot/VS Code as alternative coding client
- [ ] Future: Fresnel zone decoration, link budget details, coverage heatmaps

---

## Session: 2026-04-06 (MVP pivot + repo setup)

### Major pivot from meeting transcript (0401)
- Jesse dramatically simplified the MVP in the 0401 meeting
- **"Step Zero" MVP:** Two clicks on a map (Tx + Rx), default assumptions, one API call, show elevation + path loss XY plots. Reset button. Done.
- **Public tool, no auth, no login.** Tx data from SAS is private — not shown in MVP.
- **Client-side** except for one API call. No database, no persistence.
- **Jesse will define and send the API spec** for the path loss/elevation service — André's team is the client, not the builder of the computation backend.
- Previous plans (Tx inventory, coverage heatmaps, Network View) all deferred to portal integration later.
- Jesse sees this as 80% of the solution — rest is layering data on top.
- Competitor Federated Wireless spent millions on a similar tool — validates market demand.
- Friday follow-up meetings with Jesse.

### What was killed from v3 plan
- ❌ Tx inventory / list sidebar (Tx data is private)
- ❌ Coverage tiles / heatmaps
- ❌ Coverage stats / boundary polygons
- ❌ Network View mode
- ❌ CSV upload
- ❌ Heavy Studio API (just a thin backend now)

### Repo setup: cbrs-studio-lite
- **Location:** `C:\Users\tdsnit\Work26\cbrs-studio-lite`
- **CLAUDE.md** written — full project brain: identity, MVP spec, API endpoints, visual identity, domain glossary, coding conventions, vault references
- **tasks.md** written — task queue with session log for sync
- **initial-prompt.md** written — kickoff prompt for Claude Code
- André will do the initial prompt himself and course correct

### Three-way workflow established
- **Kaybee (Claude Desktop):** Planner/brain. Owns CLAUDE.md (read/write). Has vault + browser + repo access. Sets tasks, updates specs.
- **Claude Code:** Coder/hands. Reads CLAUDE.md (read-only). Writes tasks.md (session logs, task status). Owns all code.
- **André:** Decision-maker, bridges the two. Relays Jesse feedback and decisions.
- **Sync mechanism:** Claude Code appends session summaries to tasks.md. Kaybee reads tasks.md + scans repo to catch up. Minimizes André's relay burden.
- **CLAUDE.md is never modified by Claude Code** — only Kaybee maintains it.

### Visual identity
- Derived from keybridgewireless.com (stock Bootstrap blue) but more colorful
- Primary: deeper blue (#1a56db), Secondary: teal (#0d9488), Accent: amber (#d97706)
- Signal strength scale: green → yellow → orange → red
- Typography: Inter, 14px body, 600 weight headings
- Map-first design principle

### Tech stack (confirmed)
- Backend: Python / FastAPI (serves API + static files)
- Frontend: Vanilla HTML/CSS/JS (no build step, no React, no npm)
- Map: MapLibre GL JS (CDN)
- Charts: Plotly.js (CDN)
- Mock: Friis free-space path loss + random terrain

### API endpoints (our backend)
- `GET /api/link` — core MVP: Tx/Rx positions → elevation profile + path loss + link metrics
- `GET /api/config` — default assumptions and region config
- `GET /api/health` — alive check
- Mock implementation until Jesse sends real API spec

### Plan file evolution
- `0330 CBRS Studio Plan v2.0.md` — first full plan
- `0330 CBRS Studio Plan v2.1.md` — exists
- `0330 CBRS Studio Plan v2.2.md` — pre-computed pilot, Forward + Network View
- `0401 CBRS Studio MVP Plan v3.md` — comprehensive plan with data model, full API spec, mock strategy (superseded by meeting pivot but still reference for future phases)

### Open threads
- [ ] André running initial prompt in Claude Code — scaffold + mock MVP
- [ ] **Jesse's API spec** — he'll send it in the next few days. When it arrives, update CLAUDE.md.
- [ ] Friday follow-up meeting with Jesse — show progress
- [ ] Copilot/VS Code integration — André exploring better MCP access there; may reduce bridging need if vault accessible from coding agent
- [ ] Validate: does CLAUDE.md work correctly in André's Copilot setup?

---

## Session: 2026-03-30 (meeting prep)

### Work done
- Red-teamed Jesse's 0325 feedback against André's 0323 prompt and 0324 AI elaboration
- Key finding: André's Inverse Area goal dropped from Jesse's framing; Network Optimizer is different (brownfield tuning vs greenfield deployment)
- Identified inconsistencies in Jesse's doc: Forward planner receiver defaults unspecified, Reverse planner tower source unclear, Link planner fixed-vs-tuned contradiction, Network Optimizer CSV fields unrealistically detailed
- Clarified "missing info" = what's being solved for (not a gap)
- Stack is **Python** (not Java as originally noted — André is becoming a Java asset at KB more broadly, but Studio is Python)
- Produced CBRS Studio Plan v2 (`Key Bridge/0330 CBRS Studio Plan v2.md`)

### Pre-computation estimates
- Built interactive calculator for US pre-computation scenarios
- Sweet spot: urban+suburban (~350K km²) at 1 min/km², 5 MB/km² = ~7.5 days on 32 cores, ~1.7 TB storage
- Critical multiplier: per transmitter config — need to quantize (height, gain, pattern) and multiply
- André's approach: coarse pre-computed losses with runtime interpolation
- Hidden risk: path loss not smoothly interpolable across terrain features
- **Decision: regional pilot first** before committing to national pre-computation
- Hybrid approach likely: Free Space instant → pre-computed ITM for standard configs → on-demand ITM with caching → RT on demand

### Propagation models confirmed
- Free Space Path Loss (instant preview)
- ITM (standard planning, existing KB code)
- Sionna RT (ray tracing, GPU, for close-up urban scenes)
- Terrain elevation data already available as performant service

### Plan v2 structure
- 5 planners fully spec'd from Jesse's perspective (inputs, solving for, outputs, computation flow)
- Shared computation layer: 3 models, pre-computation architecture with pilot recommendation
- UI architecture: one map, five mode tabs, shared device state across modes
- Phased roadmap: Forward → Link → Network View → Reverse → Network Optimizer
- 7 open questions for Jesse identified
- Future extensions: Inverse Area, General Optimizer, Analytics (André's broader vision preserved)

### Open threads
- [x] Jesse meeting (2026-03-30 / 0401) — done, resulted in MVP pivot
- [x] Regional pre-computation pilot — deferred; MVP doesn't need it
- [ ] Validate receiver defaults with Jesse (3m AGL, 0 dBi, -90 dBm threshold) — deferred to post-MVP
- [ ] Clarify tower source for Reverse planner — deferred to post-MVP
- [x] Determine acceptable latency — resolved: MVP uses backend API call, not pre-computed tiles
- [x] Set up Kaybee as Claude Project (done)

---

## Session: 2026-03-29 (founding session — renamed from Keybridge)

### Context established
- Agent renamed from Keybridge → Kaybee on 2026-03-29
- André reports to Jesse (CEO/boss) — relationship previously at risk, now stabilized
- Current wage is low due to company financial reasons — back pay expected
- André's goal: become indispensable at KB (Java asset, operations asset, ESC asset, Map/Viz asset — last achieved)

### CBRS Studio — current state
- Jesse's feedback received 2026-03-25 (see `Key Bridge/0325 Jesse's Feedback on CBRS Studio Plan.md`)
- Jesse reframed the goals as 5 planners:
  1. **Forward** — transmitter config → service area (dBm raster + polygon)
  2. **Reverse** — receiver location → potential serving towers (P2P links)
  3. **Link** — transmitter + receiver → optimize SNR
  4. **Network optimizer** (NEW) — existing tx + customer CSV → optimize service quality (3 modes: tx, rx, all)
  5. **Network view** — describe current service portfolio, no optimization
- Key transmitter config: position (x,y), height (z), azimuth (w), gain (g), beamwidth (bw, default 12dB omni), emission power (e, default cat B max)
- Pre-computation estimates still needed: time + storage for whole US
- Weekly meeting with Jesse — progress expected by Monday mornings

### Technical context
- Stack: Python for Studio; Java more broadly at KB
- Broader system: MariaDB, Hazelcast, Cassandra, Prometheus
- SAS (Spectrum Access System) protocol knowledge required
- Worst case measurement volume: 100k devices × 10 channels × 60s = 1.5 MB/s = 50 TB/year

### Open threads
- [x] Set up Kaybee as Claude Project
- [x] Incorporate Jesse's feedbacks into Studio → done in 0330 session
- [x] Produce pre-computation estimates for US-wide scenes → done in 0330 session
- [ ] Advance Forward planner to functional state → now "advance MVP to functional state"

---
*Format: new sessions prepended at top, founding session preserved permanently*
