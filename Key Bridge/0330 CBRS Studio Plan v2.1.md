# CBRS Studio — Plan v2
**Date:** 2026-03-30 | **Author:** André (with Kaybee) | **Status:** Draft for Jesse review

---

## 1. Overview

CBRS Studio is a web application for CBRS radio planning and analysis. It serves current and potential CBRS users by letting them experiment with device configurations, analyze coverage and link performance, and optimize deployments.

The application provides five modes that share a common computation and visualization platform:

| Mode | Core question | Fixed | Solves for |
|------|--------------|-------|------------|
| **Forward** | Where can I provide service? | m transmitters | Coverage area |
| **Reverse** | How do I serve this location? | 1 receiver | Transmitter location + config |
| **Link** | How do I maximize this link? | 1 Rx + 1 Tx locations | Both configs |
| **Network** | How do I maximize service for all? | n Rx + m Tx locations | Configs (3 sub-modes) |
| **Network View** | What does my network look like? | n Rx + m Tx | Nothing (analysis only) |

All five modes produce **map outputs** (coverage rasters, link lines, polygons) and **analytical outputs** (link metrics, path loss curves, terrain profiles). The difference is what the user provides as input and what the system searches for or optimizes.

---

## 2. Mode Specifications

### 2.1 Forward Planner

**User question:** *Where can I provide service?*

**Inputs (given):**
- m transmitter configurations:
  - Position (lat, lon)
  - Antenna height AGL (m)
  - Antenna azimuth (°)
  - Antenna gain (dBi) — default: 12 dBi (omni)
  - Antenna beamwidth (°) — default: 360° (omni)
  - Emission power (dBm) — default: Cat B max (47 dBm EIRP)

**Assumed (defaults, configurable):**
- Receiver characteristics: antenna height (e.g., 3m AGL), antenna gain (e.g., 0 dBi)
- Minimum receivable signal threshold (e.g., -90 dBm)
- Propagation model selection (free space / ITM / ray trace)

**Outputs:**
- Coverage heatmap: received power (dBm) as a raster layer on the map
- Coverage boundary: polygon derived via marching squares at the signal threshold
- Per-transmitter and aggregated (best-server) views for m > 1
- Coverage statistics: area covered at various signal levels

**Computation:**
- For each grid cell in the analysis area, compute path loss from each transmitter using the selected model
- Grid resolution adapts to zoom level and model (coarser for ITM, finer for ray trace)

**Notes:**
- This is the foundational mode. Every other mode uses Forward internally to visualize results.
- Network View with 0 receivers is equivalent to Forward with m transmitters.
- Most computationally intensive at scale — primary candidate for pre-computation.

---

### 2.2 Reverse Planner

**User question:** *How do I provide service to this location?*

**Inputs (given):**
- 1 receiver configuration:
  - Position (lat, lon)
  - Antenna height AGL (m) — default: building roof height (from terrain data or user input)
  - Antenna gain (dBi)
  - Antenna beamwidth (°)
  - Minimum acceptable SNR or received power

**Solves for:**
- n candidate transmitter placements, each with:
  - Proposed position (lat, lon)
  - Proposed configuration (height, gain, azimuth, power)
  - Whether an existing CBSD is already present at that location (if using SAS/tower database)

**Candidate source options (to confirm with Jesse):**
- Existing CBSDs registered in our SAS
- Known tower locations (FCC ASR, user-uploaded)
- Algorithmically generated candidate sites (terrain-aware: hilltops, line-of-sight favorable positions)
- Combination of the above

**Analytical outputs (per candidate):**
- P2P link metrics: path loss, received power, SNR, link margin
- Terrain elevation profile between Tx and Rx
- Fresnel zone clearance analysis
- Path loss curve (distance vs. loss)

**Map outputs:**
- n link lines from candidates to receiver, color-coded by quality
- Candidate markers with summary metrics

**Algorithm sketch:**
1. Generate candidate Tx positions (from DB or spatial search)
2. For each candidate, compute path loss to the receiver
3. Filter by minimum signal threshold
4. Rank by link quality (SNR, margin, or composite score)
5. Return top n candidates with full analytics

---

### 2.3 Link Planner

**User question:** *How do I maximize service quality for this specific link?*

**Inputs (given):**
- 1 transmitter position + initial configuration
- 1 receiver position + initial configuration

**Solves for:**
- Optimal configuration for both Tx and Rx to maximize link performance (typically SNR)

**Optimization space:**
- Tx: antenna height, gain, azimuth, beamwidth, emission power (within regulatory limits)
- Rx: antenna height, gain, azimuth
- Positions are fixed — only configurations are adjusted

**Analytical outputs:**
- Before/after comparison: initial vs. optimized link metrics
- Parameter sensitivity: which adjustments had the most impact
- P2P link metrics (same as Reverse planner, but for initial and optimized configs)
- Terrain profile and Fresnel clearance for the link

**Map outputs:**
- 1 link line (Tx to Rx)
- Before/after visualization toggle

**Algorithm sketch:**
1. Compute baseline link metric with initial configs
2. Search configuration space (grid search or gradient-based over discrete params)
3. Respect regulatory constraints (max EIRP for Cat A/B, antenna height limits)
4. Return optimized config with improvement metrics

---

### 2.4 Network Optimizer

**User question:** *How do I maximize service quality for all my customers?*

**Inputs (given):**
- m existing transmitter configurations (same fields as Forward planner)
- n receiver locations via CSV upload
  - Required: latitude, longitude
  - Optional: antenna height, gain, azimuth, beamwidth (defaults applied if absent)
- Minimum viable SNR threshold

**Sub-modes:**
| Sub-mode | Fixed | Optimizes |
|----------|-------|-----------|
| **a) Optimize Tx** | Receiver configs | Transmitter configs |
| **b) Optimize Rx** | Transmitter configs | Receiver configs |
| **c) Optimize all** | Nothing (locations fixed) | All configs |

**Includes implicit step:** Tx-Rx pairing — assign each receiver to its best-serving transmitter(s) based on path loss. This pairing is itself part of the optimization (re-evaluated as configs change).

**Analytical outputs:**
- Per-link metrics for all n Tx-Rx pairs
- Network-level statistics: % of receivers meeting SNR threshold, average SNR, worst-case links
- Before/after comparison for the network

**Map outputs:**
- n link lines, color-coded by quality
- Coverage overlay from all transmitters
- Highlight underserved receivers

**Algorithm considerations:**
- For small n×m: exhaustive evaluation feasible
- For large n×m: heuristic optimization (iterative improvement, simulated annealing)
- The Tx-Rx pairing sub-problem can be solved greedily (each Rx takes best available Tx) as baseline, then refined during optimization

---

### 2.5 Network View

**User question:** *What does my current network look like?*

**Inputs (given):**
- m transmitter configurations
- n receiver locations (same CSV as Network Optimizer)

**Solves for:** Nothing — pure analysis, no optimization.

**Outputs:**
- Same as Network Optimizer but showing current state only
- Coverage heatmap from all transmitters (same as Forward with m Tx)
- P2P link metrics for all Tx-Rx pairs (using current configs)
- Network statistics: coverage, signal quality distribution, underserved areas

**Notes:**
- This is the "Studio" concept — see your stuff on the map
- Functionally equivalent to Forward planner (for coverage) + automatic link analysis for all Tx-Rx pairs
- Serves as the baseline "before" snapshot for Network Optimizer
- Lowest technical risk — no optimization logic required

---

## 3. Shared Platform Architecture

### 3.1 Propagation Engine (3-model stack)

All modes consume path loss calculations. The engine provides three models selected by context:

| Model | Use case | Speed | Accuracy | Data needs |
|-------|----------|-------|----------|------------|
| **Free space** (Friis) | Quick previews, long range rough estimates | Instant | Low (no terrain) | None |
| **ITM** (Longley-Rice) | Standard analysis, medium zoom | Fast (existing implementation) | Good | Terrain elevation |
| **Ray trace** (Sionna RT) | Close-range detailed analysis, urban | Slow | High | Terrain + 3D building data |

**Model selection strategy:**
- User selects default model per session
- Auto-escalation: free space for overview → ITM on zoom → ray trace on close zoom (optional)
- All modes can override: e.g., Forward planner quick preview uses free space, detailed run uses ITM

**Common interface:**
```
path_loss(tx_config, rx_point, model) → loss_dB, metadata
coverage(tx_config, grid_bounds, resolution, model) → raster[dBm]
```

Both already exist as performant services. Sionna RT integration is the new addition.

### 3.2 Terrain & Elevation Service

- Existing performant service providing elevation data
- Used by ITM and ray trace models
- Can also provide building roof height estimates (relevant for Reverse planner receiver defaults)

### 3.3 Pre-computation Strategy

**Goal:** Enable near-instant responses in the Studio for common scenarios.

**Challenge:** Path loss depends on both the terrain (fixed) and the transmitter configuration (variable). Pre-computing for every possible configuration is infeasible. The approach is to pre-compute for a **quantized configuration space** and **interpolate at runtime**.

**Quantization dimensions:**
- Antenna height: e.g., 5 levels (10m, 15m, 20m, 30m, 50m)
- EIRP: e.g., 3 levels (30 dBm, 40 dBm, 47 dBm)
- Beamwidth: e.g., 2-3 levels (omni, 90°, 45°)
- Azimuth: continuous (can be rotated from a pre-computed pattern)

With 5 × 3 × 3 = 45 configs per grid origin point, and assuming each grid origin is tiled at ~1 km spacing:

| Scope | Area (km²) | Configs | Total tiles | Storage (5 MB/tile) | Compute (1 min/tile) @ 32 cores |
|-------|-----------|---------|-------------|--------------------|---------------------------------|
| Top 10 metros | ~20K | 45 | 900K | 4.5 TB | ~19 days |
| Urban+suburban | ~350K | 45 | 15.75M | 79 TB | ~342 days |
| Urban, 5 configs | ~350K | 5 | 1.75M | 8.8 TB | ~38 days |

**Key insight:** Full quantized pre-computation for all urban areas is expensive. A phased approach is necessary.

**Hidden assumptions to validate:**
- Interpolation accuracy: does interpolating between pre-computed heights (e.g., 10m and 20m for a 15m query) produce acceptable results? This is terrain-dependent — smooth terrain interpolates well, urban canyons may not.
- Tiling granularity: 1 km tiles assume the transmitter can be placed anywhere within the tile. Coarser tiles mean more interpolation error.
- Azimuth rotation: assumes path loss pattern can be rotated — valid for ITM (azimuth-independent models), needs validation for ray trace.

**Recommended approach:**

**Phase 0 — On-demand with caching (immediate):**
- All computation is live, results cached by (tx_config_hash, grid_bounds, model, resolution)
- No upfront cost. First query is slow, repeated queries are instant.
- This is sufficient for initial deployment and lets us learn real usage patterns.

**Phase 1 — Regional pilot (1-2 months):**
- Select 1-2 metro areas (e.g., where KB has existing customers)
- Pre-compute for 5-10 standard configs using ITM
- Validate interpolation accuracy against on-demand results
- Measure actual storage and compute costs vs. estimates
- Result: proven approach + instant results for pilot regions

**Phase 2 — Expand based on pilot learnings (ongoing):**
- If interpolation validated: expand to top 20 metros, increase config count
- If interpolation poor: invest in smarter tiling (adaptive resolution near terrain features) or accept on-demand + caching as the production model

**Architecture implication:** The system must support both on-demand and pre-computed paths from day one. The API contract is the same — the engine checks cache/pre-computed store first, falls back to live computation. This means the architecture doesn't change between phases, only the cache population strategy.

---

## 4. UI Integration

### 4.1 Unifying model

All five modes follow the same interaction pattern:

1. **Configure inputs** — place devices, set parameters, upload data
2. **Run analysis** — system computes (or retrieves pre-computed) results
3. **Visualize on map** — rasters, link lines, polygons, markers
4. **Inspect details** — click any element for full analytics (profiles, curves, metrics)
5. **Iterate** — adjust inputs, re-run

The UI should present this as a **single workspace** with a mode selector, not five separate applications. The map is always the central element. The side panel adapts to show mode-specific inputs and results.

### 4.2 UI component structure

```
┌─────────────────────────────────────────────────┐
│  Mode selector: [Forward] [Reverse] [Link] [Network] [View]  │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│  Input   │                                      │
│  Panel   │           Map (MapLibre)             │
│          │                                      │
│  - Tx    │   - Coverage raster layers           │
│  - Rx    │   - Link lines                       │
│  - CSV   │   - Device markers                   │
│  - Model │   - Polygons                         │
│          │                                      │
├──────────┤                                      │
│          │                                      │
│ Results  │                                      │
│ Panel    │                                      │
│          │                                      │
│ - Metrics│                                      │
│ - Charts │                                      │
│ - Export │                                      │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

### 4.3 State continuity between modes

Devices placed in one mode should persist when switching modes. Example workflow:
- Start in **Forward** → place 3 transmitters, see coverage
- Switch to **Network View** → upload customer CSV, see all links
- Switch to **Network Optimizer** → optimize transmitter configs
- Compare before/after

This requires a shared scenario/workspace state that all modes read from and write to.

---

## 5. Phased Build Roadmap

### Phase 1: Foundation + Forward Planner
**Goal:** Interactive coverage visualization from placed transmitters.
**Delivers:** Forward planner (fully functional), shared map UI, propagation engine integration (free space + ITM), on-demand computation with caching.
**Why first:** Foundation for all other modes. Standalone value. Lowest algorithmic complexity.

### Phase 2: Network View + Link Analytics
**Goal:** See existing network on map with full link analysis.
**Delivers:** Network View mode, CSV upload for receivers, P2P link metric calculations, terrain profile visualization.
**Why second:** Adds high value with minimal new algorithmic work (Forward + link analysis). Exercises the full data pipeline (Tx + Rx + links).

### Phase 3: Link Planner + Reverse Planner
**Goal:** Single-link optimization and transmitter site search.
**Delivers:** Link planner (config optimization for 1 link), Reverse planner (candidate Tx search for 1 Rx).
**Why third:** Introduces optimization logic, but scoped to single links. Reverse planner requires candidate generation strategy (to confirm with Jesse).

### Phase 4: Network Optimizer
**Goal:** Multi-link optimization for entire customer base.
**Delivers:** All 3 sub-modes (optimize Tx, Rx, or both).
**Why last:** Most complex algorithmically. Benefits from all infrastructure built in prior phases. Tx-Rx pairing + config optimization at scale.

### Cross-cutting (ongoing):
- Pre-computation pipeline (Phase 0 on-demand from day 1, Phase 1 pilot during build Phase 2-3)
- Sionna RT integration (can be added to propagation engine at any point)
- Export capabilities (GeoJSON, CSV, images)

---

## 6. Open Questions for Jesse

1. **Forward planner — receiver defaults:** What receiver characteristics to assume? Suggestion: standard CPE at 3m AGL, 0 dBi gain. Configurable in settings.

2. **Reverse planner — candidate source:** Where do candidate transmitter locations come from? Our SAS registrations? FCC tower database? User-uploaded? Algorithmic search?

3. **Forward planner — m transmitters?** Your note says "start with a transmitter configuration" (singular). Is multi-transmitter support needed in v1, or can we start with single Tx and add multi-Tx later? (Andre's note: the mapping doc suggests m transmitters.)

4. **Network Optimizer CSV format:** Minimum required fields as lat/lon only, with defaults for height, gain, beamwidth? Or does Jesse expect full config from the CSV?

5. **Pre-computation appetite:** Given the cost/complexity tradeoffs, is on-demand + caching acceptable for initial deployment? Or is instant response a hard requirement from day one?

6. **Model priority:** Start with ITM only (already available) and add Sionna RT later? Or is ray trace needed for any v1 feature?

---

