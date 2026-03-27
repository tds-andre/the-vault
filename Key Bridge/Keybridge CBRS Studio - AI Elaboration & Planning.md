March 24, 2026

Here's a structured plan for elaborating and advancing the 4 functional goals:

---

## Plan: Elaborate & Advance CBRS Functional Goals

**TL;DR** — Decompose the 4 goals into concrete user stories, a shared platform layer, goal-specific entities, and a phased roadmap. The key insight is that all 4 goals share substantial infrastructure (map UI, path loss engine, rendering, scenario management), so elaboration should start from the shared platform outward.

---

### Shared Platform Foundation

All goals depend on common infrastructure. Elaborating this first avoids duplication and ensures coherence:

- **Device / Scenario / Simulation / Rendering** entities are shared across all goals
- **Path Loss Engine** (pluggable models + terrain data) — consumed by every goal
- **Map UI** (MapLibre + device placement + area drawing + point selection)
- **Computation Queue** (async simulations) + **Result Cache** (content-addressed, avoid recomputation)
- **Terrain/Elevation Service** (interface to your on-prem elevation data)

---

### Goal #1: Direct Planning (Forward Problem)

**User journey**: Place devices → configure RF params → simulate → view coverage on map → iterate.

**Key user stories**:
- Place devices on map, configure parameters, see quick approximate coverage preview (instant, simplified model)
- Run full terrain-aware simulation, view detailed heatmap
- Inspect any point on map → terrain profile + path loss curve to nearest device
- Aggregate coverage across multiple devices (best-server, total power)
- Manage/compare multiple scenarios and simulations
- Export results (image, GeoJSON, CSV)

**Why first**: Pure consumer of shared platform. Builds all infrastructure other goals depend on, and delivers immediate standalone value.

---

### Goal #2: Inverse Point-to-Point

**User journey**: Place receiver target(s) → define constraints → system suggests candidate device placements → browse candidates with P2P analytics → promote best to a Scenario for Goal #1 deep analysis.

**Key user stories**:
- Drop receiver pin(s), get ranked candidate device placements
- See per-candidate P2P link analysis: terrain profile, Fresnel zone clearance, path loss curve, link budget
- Set constraints (max devices, min received power, max EIRP, budget)
- Factor in existing infrastructure (tower DBs, rooftop access)
- Promote a candidate solution into a full Scenario

**New entities**: ReceiverTarget, InverseP2PRequest, CandidateSolution, LinkAnalysis

**Technical challenge**: Candidate position generation — terrain-aware search over potential device sites (grid, hilltops, existing towers). Needs a heuristic approach with LOS pre-screening.

---

### Goal #3: Inverse Area

**User journey**: Draw service area polygon → define coverage requirements (min signal over X% of area) → system generates candidate deployments → browse candidates with projected coverage maps → promote to Scenario.

**Key user stories**:
- Draw target service area on map (polygon, circle)
- Set coverage quality targets and constraints (max devices, candidate sites, budget)
- See projected coverage map for each candidate deployment
- Compare candidates, promote one to Scenario

**New entities**: ServiceArea (GeoJSON + requirements), InverseAreaRequest, DeploymentCandidate

**Technical challenge**: Optimization algorithm — greedy placement heuristic for v1, with a path to metaheuristic (simulated annealing, genetic) for better solutions. Design the interface so the algorithm is swappable.

---

### Goal #4: Inverse General Case

**User journey**: Define mixed targets (areas + points) with per-target requirements and global constraints → unified multi-objective optimization → candidates evaluated against all targets.

**Design note**: This is the superset of Goals #2 and #3. Should be deferred until both are solid, but Goals #2/#3 should be designed with this generalization in mind (e.g., shared candidate generation, shared scoring framework).

---

### Phased Roadmap

| Phase | Goal | Dependencies | Key Deliverable |
|-------|------|-------------|----------------|
| **1** | Shared Platform + Direct Planning | None (foundational) | Interactive device placement, simulation, coverage visualization |
| **2** | P2P Link Analysis + Inverse P2P | Phase 1 | P2P analytics, candidate device suggestions for receiver targets |
| **3** | Inverse Area | Phase 1, partially Phase 2 | Area coverage optimization and deployment suggestions |
| **4** | Inverse General | Phases 2 + 3 | Combined multi-target optimization |

Each phase delivers standalone value and can be shipped independently. Phase 1 alone is a compelling free tool for CBRS experimenters.

---

### Cross-Cutting Decisions to Make Early

1. **Two-tier computation**: fast preview (free-space, low-res) for interactive feedback + full simulation for detailed analysis — worth the complexity?
2. **Optimization libraries**: build custom heuristics vs. leverage scipy.optimize / DEAP for inverse problems?
3. **Coverage rendering**: server-side tile generation vs. client-side WebGL (deck.gl)?
4. **External data**: which tower/antenna databases to integrate for inverse problems (FCC ULS, ASR, proprietary)?
5. **Monetization boundary**: Phase 1 free, inverse features gated behind signup? Or all free for lead gen?

---

### Recommended Next Steps

1. **Validate the shared entity model** — refine device attributes, confirm relationships, settle on content-addressing scheme
2. **Prioritize Phase 1 user stories** — which are MVP vs. fast-follow
3. **Define path loss engine API contract** — the interface between UI ↔ compute, since it's the critical shared dependency
4. **Sketch UX wireframes** for each goal's key workflow (even rough ones clarify scope immensely)
5. **Feasibility study on inverse algorithms** — prototype candidate generation for Goal #2 with your terrain data to gauge viability and performance
6. **Survey external data sources** — inventory available tower/antenna databases and their accessibility

---

The plan is saved to session memory. Want me to drill deeper into any specific goal, entity model, or phase?