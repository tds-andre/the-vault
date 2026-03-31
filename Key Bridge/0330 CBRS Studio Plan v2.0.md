# CBRS Studio — Plan v2
**Date:** 2026-03-30 | **Status:** Draft for Jesse review | **Stack:** Python
**Context:** Incorporates Jesse's 0325 feedback on the 5 planners. Starts from Jesse's customer-facing framing; broader extensions noted at end.

---

## 1. Product vision

CBRS Studio is a web-based planning tool for CBRS deployments. It lets users experiment with device configurations, visualize coverage, analyze links, and optimize networks — all on a map interface backed by real terrain data and multi-fidelity propagation models.

**Target users:** CBRS operators, WISPs, enterprise private network planners, and prospective CBRS entrants evaluating deployment scenarios.

**Value proposition:** "What would my coverage look like?" answered instantly, with real terrain, real propagation physics, and no hardware required.

---

## 2. The five planners

All five planners share a common pattern: **configure known parameters → solve for unknowns → visualize on map**. They differ in what's known, what's solved for, and what's displayed.

### 2.1 Forward planner
> *"Where can I provide service?"*

**Inputs (known):**

| Parameter          | Symbol | Notes                                    |
| ------------------ | ------ | ---------------------------------------- |
| CBSD position      | (x, y) | Placed on map or entered as coordinates  |
| Antenna height AGL | z      | Meters above ground level                |
| Antenna azimuth    | w      | Degrees, 0 = North                       |
| Antenna gain       | g      | dBi (default: 12 dBi omni)               |
| Antenna beamwidth  | bw     | Degrees, horizontal (default: 360° omni) |
| Emission power     | e      | dBm EIRP (default: Cat B max = 47 dBm)   |

**Solving for:** service area footprint — where received signal exceeds a useful threshold.

**Assumed/defaulted (receiver side):**
- Receiver antenna height: 3m AGL (typical CPE on residential roof)
- Receiver antenna gain: 0 dBi (conservative; isotropic)
- Minimum useful signal: -90 dBm (configurable threshold)
- *These defaults should be exposed as "advanced settings" in the UI*

**Output:**
- Coverage heatmap (received dBm raster, color-coded)
- Service area polygon (marching squares contour at threshold)
- Both overlaid on terrain map

**Computation flow:**
1. For each pixel in the area of interest, compute path loss from CBSD to pixel center
2. Received power = EIRP - path loss + receiver gain
3. Render as raster, derive polygon via contour extraction

**Key design decisions:**
- Area of interest radius: auto-determined from EIRP and free-space falloff (e.g., where free-space loss alone drops below threshold + margin), or user-adjustable
- Pixel resolution: tied to propagation model fidelity (see §3)

---

### 2.2 Reverse planner
> *"How do I provide service to this location?"*

**Inputs (known):** 

| Parameter               | Symbol | Notes                                                           |
| ----------------------- | ------ | --------------------------------------------------------------- |
| Receiver position       | (x, y) | Placed on map                                                   |
| Receiver antenna height | z      | Default: building roof height (from terrain data or default 3m) |
| Receiver antenna gain   | g      | Default: 0 dBi                                                  |
| Receiver beamwidth      | bw     | Default: omni                                                   |

**Solving for:** which transmitter locations (existing or candidate) can serve this receiver, and with what link quality.

**Tower/CBSD source — needs clarification with Jesse:**
- Option A: Existing CBSDs registered in our SAS → most realistic, uses real data
- Option B: User-uploaded tower inventory (CSV of candidate sites)
- Option C: Algorithmically generated candidates (hilltops, grid search) → complex, defer
- **Recommended:** Start with Option A (our SAS data), add Option B as secondary

**Output:**
- Map showing candidate serving towers, ranked by link quality
- Per-link P2P analysis: terrain profile, path loss curve, Fresnel zone clearance, link budget summary
- Color-coded viability (green = strong link, yellow = marginal, red = below threshold)

**Computation flow:**
1. Query candidate tower inventory within a search radius of receiver
2. For each candidate, compute P2P path loss using terrain profile
3. Compute link budget (tx EIRP - path loss + rx gain → received SNR)
4. Rank candidates, present top N with analytics

---

### 2.3 Link planner
> *"How do I maximize service quality for one customer?"*

**Inputs (known):**
| Parameter | Notes |
|-----------|-------|
| Transmitter config | Full config: (x, y, z, w, g, bw, e) |
| Receiver config | Full config: (x, y, z, g) |

**Solving for:** optimal parameter adjustments to maximize link performance (SNR).

**What can be tuned:**
- Antenna heights (both sides)
- Antenna gains and beamwidths
- Azimuth alignment
- Emission power (within regulatory limits)

**Output:**
- Current link performance: terrain profile, path loss, received power, SNR, Fresnel clearance
- Suggested parameter adjustments with predicted improvement
- Sensitivity analysis: "if you raise the antenna by 3m, SNR improves by X dB"
- Interactive: user adjusts parameters, sees results update live

**Computation flow:**
1. Compute baseline P2P link with given parameters
2. Sweep adjustable parameters within feasible ranges
3. Present Pareto-optimal configurations (or top-N by SNR)
4. Allow interactive manual tuning with real-time recomputation

**Design note:** This is the simplest planner computationally — it's one P2P link. The value is in the UI: rich visualization of the link (terrain cross-section, Fresnel ellipsoids, power vs. distance curves) and responsive interactivity.

---

### 2.4 Network optimizer
> *"How do I maximize service quality for all customers?"*

**Inputs (known):** 

| Parameter | Notes |
|-----------|-------|
| Existing transmitter configs | From SAS data or user input |
| Customer locations | CSV upload: at minimum (x, y); optionally (z, g, bw) |
| Minimum viable SNR | User-configurable threshold |

**Solving for:** configuration adjustments that maximize aggregate service quality.

**CSV upload design:**
- **Required fields:** latitude, longitude (the rest gets defaults)
- **Optional fields:** antenna height (default 3m), gain (default 0 dBi), beamwidth (default omni)
- Provide a sample CSV template for download
- Parse flexibly: detect header names, handle common formats

**Transmitter-receiver pairing:**
- Assign each receiver to its best-path transmitter (highest received SNR)
- Allow re-pairing as part of optimization (a customer might be better served by a different tower after tuning)

**Three optimization modes:**

| Mode | What's fixed | What's optimized |
|------|-------------|-----------------|
| A: Optimize transmitters | Customer configs | Tx heights, azimuths, gains, powers |
| B: Optimize receivers | Transmitter configs | Rx heights, gains, orientations |
| C: Optimize all | Nothing fixed | All parameters (both sides) |

**Output:**
- Before/after comparison: coverage map, per-customer SNR, aggregate statistics
- Per-customer link status (served / marginal / unserved)
- Specific recommended changes per device
- Summary metrics: % customers served above threshold, mean/median SNR, worst-case SNR

**Computation flow:**
1. Compute baseline: all tx-rx pairs, current performance
2. For each optimization mode, run parameter search (gradient-based or heuristic depending on problem size)
3. Present optimized configuration with delta from baseline

**Algorithmic note:** For small networks (<50 tx, <500 rx), exhaustive parameter sweeps are feasible. For larger networks, use scipy.optimize or a genetic algorithm. The optimization surface is non-convex (terrain effects), so global search methods are appropriate.

---

### 2.5 Network view
> *"Describe my current service portfolio."*

**Inputs (known):** 

| Parameter | Notes |
|-----------|-------|
| Existing transmitter configs | From SAS data |
| Customer locations | CSV upload (same as Network Optimizer) |

**Solving for:** nothing — this is pure analysis, no optimization.

**Output:**
- Map visualization of all transmitters and customers
- Computed links between each customer and their best-serving transmitter
- Per-link quality metrics (SNR, path loss, received power)
- Network summary statistics:
  - Total customers served above threshold
  - Coverage gaps (customers below threshold)
  - Transmitter utilization (how many customers per tx)
  - Heat map of network quality across service area
- Exportable report (CSV of all link budgets, PDF summary)

**Design note:** This is effectively Network Optimizer with mode = "none." Architecturally, it's the same pipeline minus the optimization step. Build Network View first, then add optimization on top.

---

## 3. Shared computation layer

### 3.1 Three propagation models

All planners consume path loss calculations. Studio uses three models at different fidelity levels:

| Model | Use case | Speed | Fidelity | Dependencies |
|-------|----------|-------|----------|-------------|
| **Free Space Path Loss** | Instant preview, UI responsiveness | < 1ms per point | Low (no terrain) | None |
| **ITM (Irregular Terrain Model)** | Standard planning, coverage maps | ~seconds per profile | Medium-high (terrain-aware, statistical) | Terrain elevation service |
| **Sionna RT (Ray Tracing)** | High-fidelity close-ups, urban canyons | ~minutes per scene | Very high (multipath, reflections) | 3D building data, GPU |

**Model selection strategy:**
- **Zoom-dependent:** zoomed out → Free Space or ITM. Zoomed in → ITM or RT.
- **Planner-dependent:** Forward planner raster uses ITM. Link planner detail view can offer RT.
- **User-selectable:** advanced users can force a specific model.

### 3.2 Pre-computation architecture

**The core problem:** For instant interactivity, we cannot compute ITM path loss on every user click. A Forward planner coverage map over a 50 km radius at 30m resolution is ~2.7M pixels, each needing a terrain-profile path loss calculation.

**Proposed approach: quantized pre-computation with runtime interpolation.**

The idea: pre-compute path loss grids for a discrete set of "standard" transmitter configurations at fixed grid points, then interpolate at runtime for actual user-specified parameters.

**Quantization dimensions:**
- **Spatial:** transmitter position on a coarse grid (e.g., 1 km spacing)
- **Height:** discrete antenna heights (e.g., 10m, 15m, 20m, 30m, 50m)
- **Frequency:** CBRS band is narrow (3550–3700 MHz), likely 1-2 representative frequencies suffice
- **Antenna pattern:** pre-compute for omnidirectional; apply directional gain pattern as a post-processing mask at runtime

**What gets stored per grid point:**
- Path loss raster from that point to surrounding area (out to ~X km radius)
- Resolution: matches terrain data resolution (e.g., 30m SRTM, or finer if available)

**Runtime interpolation for arbitrary tx position:**
- Given a user-placed transmitter at (x, y, z), find nearest pre-computed grid points
- Interpolate path loss values (bilinear in position, linear in height)
- Apply antenna pattern mask for directionality
- This gives an approximate result in milliseconds

**Hidden assumptions and risks:**
1. Path loss is not smoothly interpolable — terrain features (ridges, valleys) create sharp transitions. Interpolation between two grid points that straddle a ridge will be wrong.
2. The height dimension is particularly sensitive — a 5m height difference can mean LOS vs NLOS.
3. Storage scales as: (grid points) × (heights) × (pixels per raster). For a metro area this is manageable; for the US it's massive.
4. Pre-computation assumes a fixed receiver height — different rx heights would need separate layers or a correction model.

**Recommendation: regional pilot first.**
- Pick one metro area (e.g., ~500 km², a mid-size city)
- Pre-compute at proposed resolution and quantization
- Measure: storage size, computation time, interpolation accuracy vs. direct ITM
- Use results to calibrate assumptions before committing to national-scale pre-computation

**Fallback architecture (if interpolation proves too inaccurate):**
- On-demand computation with aggressive caching
- Cache key: hash of (tx config, area bounds, resolution, model)
- Pre-warm cache for popular areas and standard configs
- Users see a brief loading state for first query, then instant for subsequent views

**Hybrid approach (likely the production answer):**
- Free Space for instant preview while ITM computes in background
- Pre-computed ITM for standard configs in high-demand areas
- On-demand ITM with caching for everything else
- RT available on-demand for close-up analysis

### 3.3 Terrain elevation service

Already available and performant. Key requirements for Studio:
- **Profile extraction:** given two (lat, lon) points, return elevation profile (for P2P links)
- **Raster extraction:** given a bounding box and resolution, return elevation grid (for coverage maps)
- **Point query:** given (lat, lon), return ground elevation (for AGL → AMSL conversion)

### 3.4 Shared data model

```
Transmitter:
  position: (lat, lon)
  height_agl: float (meters)
  azimuth: float (degrees, 0=North)
  gain: float (dBi)
  beamwidth: float (degrees)
  eirp: float (dBm)
  category: A | B
  frequency: float (MHz, default 3625 — band center)

Receiver:
  position: (lat, lon)
  height_agl: float (meters, default 3.0)
  gain: float (dBi, default 0.0)
  beamwidth: float (degrees, default 360)

LinkBudget:
  tx: Transmitter
  rx: Receiver
  distance: float (km)
  path_loss: float (dB)
  received_power: float (dBm)  # = tx.eirp - path_loss + rx.gain
  snr: float (dB)              # = received_power - noise_floor
  noise_floor: float (dBm)     # thermal noise at CBRS BW
  model_used: free_space | itm | raytrace
  terrain_profile: list[(distance, elevation)]

CoverageRaster:
  tx: Transmitter
  bounds: BoundingBox
  resolution: float (meters)
  values: 2D array (received dBm per pixel)
  threshold: float (dBm)
  polygon: GeoJSON  # marching squares contour at threshold
```

---

## 4. UI architecture

### 4.1 Design principle: one map, multiple modes

All five planners operate on the same map canvas. The UI is structured as:

```
┌─────────────────────────────────────────────┐
│  [Forward] [Reverse] [Link] [Network] [View]│  ← planner mode tabs
├──────────┬──────────────────────────────────┤
│          │                                  │
│  Config  │         Map canvas               │
│  Panel   │         (MapLibre)               │
│          │                                  │
│  - params│    - devices on map              │
│  - upload│    - coverage overlays           │
│  - run   │    - link lines                  │
│          │    - terrain profiles            │
│          │                                  │
├──────────┴──────────────────────────────────┤
│  Results panel (collapsible)                │
│  - summary stats, link details, tables      │
└─────────────────────────────────────────────┘
```

### 4.2 Mode transitions and shared state

Devices placed on the map persist across mode switches. A user can:
1. Place a transmitter in Forward mode, see its coverage
2. Switch to Reverse mode, drop a receiver pin, see which towers serve it
3. Switch to Link mode with that tx-rx pair auto-selected
4. Upload customers in Network mode, using the same transmitters

This continuity is critical — the planners should feel like views on the same workspace, not separate tools.

### 4.3 Map interactions by planner

| Planner | Click on map | Drag | Overlays shown |
|---------|-------------|------|---------------|
| Forward | Places/selects transmitter | Moves transmitter (live coverage update if fast enough) | Coverage heatmap, service polygon |
| Reverse | Places receiver target | Moves receiver | Link lines to candidate towers, quality color |
| Link | Selects tx or rx endpoint | Moves endpoint | Terrain profile, Fresnel zone, link metrics |
| Network Opt. | Selects device for inspection | — | All links, color by quality, before/after toggle |
| Network View | Selects device for inspection | — | All links, color by quality, summary stats |

### 4.4 Progressive disclosure

- **Default view:** simplified — just the essential params for each planner
- **Advanced panel:** expand to see all parameters, model selection, threshold tuning
- **Results detail:** click a link or device to drill into full analytics

---

## 5. Phased roadmap

### Phase 1: Forward planner + core platform (foundation)
**Deliverables:**
- Map UI with transmitter placement and configuration panel
- Free Space instant preview
- ITM coverage computation (async, with loading state)
- Coverage heatmap rendering + service polygon
- Configurable receiver defaults (advanced panel)

**Why first:** Builds all shared infrastructure (map, config panel, propagation pipeline, rendering). Delivers standalone value immediately.

**Pre-computation pilot:** in parallel, run the regional pilot (§3.2) to validate the interpolation approach. Results inform whether Phase 2+ can be instant or async.

### Phase 2: Link planner + P2P analytics
**Deliverables:**
- Place tx + rx, compute P2P link budget
- Terrain profile visualization (cross-section view)
- Fresnel zone overlay
- Interactive parameter tuning with live update (using Free Space; ITM on "compute" action)
- Sensitivity sliders ("what if height = X?")

**Why second:** Reuses Forward planner infra, adds the P2P analysis engine that Reverse and Network planners will need. Delivers a compelling standalone tool.

### Phase 3: Network View
**Deliverables:**
- CSV customer upload (with template)
- Bulk link computation (all tx-rx pairs)
- Network quality map (all links colored by quality)
- Summary statistics dashboard
- Export (CSV of link budgets)

**Why third:** Requires Phase 2's P2P engine. Builds the data pipeline and bulk computation that Network Optimizer needs. Useful on its own for existing operators.

### Phase 4: Reverse planner
**Deliverables:**
- Receiver placement, tower candidate search
- Integration with SAS CBSD data as tower source
- Ranked candidate list with P2P analytics per candidate
- Optional: user-uploaded tower inventory

**Why fourth:** Depends on P2P engine (Phase 2) and ideally on SAS data integration. More complex UX (multiple candidate results).

### Phase 5: Network optimizer
**Deliverables:**
- Three optimization modes (tx, rx, all)
- Before/after comparison view
- Per-device recommended changes
- Optimization algorithm (scipy.optimize or evolutionary for larger networks)

**Why last:** Most complex algorithmically. Requires all previous infrastructure. Highest risk, highest value.

### Cross-cutting (all phases):
- Sionna RT integration: add as optional high-fidelity model in any planner where P2P or close-up analysis is shown
- Pre-computation rollout: expand from pilot metro to more areas based on Phase 1 pilot results

---

## 6. Open questions for Jesse

1. **Forward planner receiver assumptions:** default rx height 3m AGL, gain 0 dBi, threshold -90 dBm — acceptable defaults?
2. **Reverse planner tower source:** start with our SAS CBSD data? Allow user-uploaded tower inventories?
3. **Link planner "optimization":** is this interactive manual tuning with suggestions, or fully automated parameter search?
4. **Network optimizer scale:** what's the expected customer count? <100 (easy), 100-1000 (moderate), 1000+ (needs careful algorithm design)?
5. **Network view data source:** are transmitters always from our SAS, or can users define hypothetical networks?
6. **Pre-computation vs. on-demand:** are we targeting instant results (<1s) or is a loading state acceptable (5-30s for ITM)?
7. **RT (ray tracing):** is Sionna RT integration a priority, or a later enhancement?

---

## 7. Future extensions (beyond Jesse's 5)

These are natural extensions of the platform that emerge from the current architecture:

### Inverse Area planner
> *"Given a target service area, where should I place towers?"*

This is a greenfield deployment design tool — not covered by Jesse's 5, but high value for prospective CBRS entrants. It's the hardest problem (combinatorial optimization over device placement), but the Forward planner + optimization infra from Phases 1-5 provides the foundation.

### General optimizer
> *"Given mixed targets (areas + points + constraints), find optimal deployment."*

The superset of all planners. Multi-objective optimization with hard constraints (regulatory limits, budget, site availability). Deferred until the individual planners are mature.

### Analytics / historical view
> *"What does CBRS usage look like in this area over time?"*

Leverages SAS registration data to show CBRS adoption trends, spectrum utilization, interference patterns. More of a market intelligence tool than a planner.

---

## 8. Technical notes

### Python libraries (likely stack)
- **Web framework:** FastAPI or Flask
- **Map frontend:** MapLibre GL JS (JavaScript, served by Python backend)
- **Propagation:** custom ITM wrapper (existing KB code), Sionna for RT
- **Terrain:** existing KB elevation service (API calls)
- **Optimization:** scipy.optimize, optuna, or DEAP for evolutionary
- **Raster processing:** numpy, rasterio
- **Contour extraction:** scikit-image (marching squares), or matplotlib contour
- **CSV parsing:** pandas
- **Async computation:** celery + redis, or simple threading for MVP

### Regulatory guardrails
- Emission power capped at Cat A / Cat B regulatory limits (no user override)
- Frequency range constrained to 3550–3700 MHz
- Antenna height limits per category
- DPA/ESC exclusion zones shown on map as reference (not enforced in planner — we're a planning tool, not a SAS)

---

*v2 — 2026-03-30 — Kaybee for André | Incorporates Jesse's 0325 feedback*
