# CBRS Studio — Plan v2.2
**Date:** 2026-03-30 | **Author:** André (with Kaybee) | **Status:** Draft for Jesse review

---

## 1. Premise

Build a pilot of CBRS Studio for a **single region** with **pre-computed path loss**, so the frontend delivers **instant results** — no loading spinners, no long-running jobs. The user interacts with the map and sees coverage update immediately.

This pilot validates the approach before scaling. Phase 1 delivers two modes: **Forward Planner** and **Network View**.

---

## 2. Pilot Region

Select one metro area where Key Bridge has existing customers or interest. Requirements:
- ~500–2,000 km² (a typical metro and surroundings)
- Good terrain data coverage
- Partial OSM building coverage (to exercise both propagation models)

**Suggested candidates:** (to confirm with Jesse — ideally where KB has customer activity)

**Pre-computation cost for the pilot** (at 1 min / km², 5 MB / km²):

| Region size | Configs | Total tiles | Storage | Compute @ 32 cores |
|-------------|---------|-------------|---------|---------------------|
| 500 km² | 10 | 5,000 | 25 GB | ~2.6 hours |
| 1,000 km² | 10 | 10,000 | 50 GB | ~5.2 hours |
| 2,000 km² | 10 | 20,000 | 100 GB | ~10.4 hours |

This is trivially feasible. Even re-running the full pipeline after changes costs hours, not days.

---

## 3. Pre-computation Architecture

### 3.1 Two-model strategy

The pilot region is partitioned into tiles. Each tile uses one of two propagation models based on data availability:

| Condition | Model | Rationale |
|-----------|-------|-----------|
| OSM buildings present in tile | **Sionna RT** (ray tracing) | Accurate urban propagation: reflections, diffraction, shadowing |
| No OSM buildings | **ITM** (Longley-Rice) | Reliable terrain-based propagation for suburban/rural |

Free-space path loss is not pre-computed — it's trivial to calculate at runtime if ever needed (e.g., as a quick comparison baseline).

### 3.2 What gets pre-computed

For each tile in the region, for each quantized transmitter configuration:

**Input:** transmitter config placed at tile center (or grid point)
**Output:** path loss raster — a grid of loss values (dB) at a fixed receiver height

**Quantized transmitter configuration space:**

| Parameter | Quantized values | Count |
|-----------|-----------------|-------|
| Antenna height AGL | 10m, 20m, 30m, 50m | 4 |
| EIRP | 37 dBm (Cat A max), 47 dBm (Cat B max) | 2 |
| Beamwidth | Omni (360°), Sectoral (90°) | 2 |

That gives **16 configs** per tile origin. Can trim to ~10 for the pilot by dropping less common combos (e.g., Cat A + 50m height is unlikely).

**Not quantized — handled at runtime:**
- **Azimuth:** rotate the pre-computed directional pattern. Valid for ITM; needs validation for ray trace.
- **Gain:** scales linearly in dB, applied as offset at runtime.
- **Exact position:** interpolate from nearest pre-computed grid points.

### 3.3 Runtime flow

```
User places Tx on map with config (h=25m, EIRP=47, omni)
  │
  ├─ Find nearest pre-computed grid points
  ├─ Find bracketing height configs (20m and 30m)
  ├─ Interpolate path loss rasters
  ├─ Apply gain offset
  ├─ Apply receiver assumptions (height, gain)
  └─ Render: received power raster + threshold polygon
  
  → All in-browser or lightweight API call, < 100ms
```

### 3.4 Storage format

Pre-computed rasters stored as tiled arrays (e.g., GeoTIFF, Zarr, or flat binary grids) indexed by:
```
region / tile_id / config_hash → path_loss_raster
```

Served via a simple lookup API or static file serving. The frontend fetches only the tiles visible in the current viewport.

### 3.5 Assumptions to validate in the pilot

| Assumption | Risk | Validation |
|------------|------|------------|
| Height interpolation is accurate | Medium — terrain effects are nonlinear | Compare interpolated vs. computed at intermediate heights for sample tiles |
| Azimuth rotation works for ray trace | Medium — urban reflections are direction-dependent | Compare rotated vs. recomputed for sample directional configs |
| Position interpolation from grid points | Medium — depends on grid spacing | Test at 500m and 1km grid spacing, measure error |
| ITM/RT boundary is clean | Low — may get discontinuities at tile edges | Visual inspection at model boundaries |
| OSM building completeness | Low-Medium — OSM coverage varies | Audit building coverage in pilot region before committing |

---

## 4. Phase 1 Modes

### 4.1 Forward Planner

**User question:** *Where can I provide service?*

**Interaction:**
1. User clicks map to place one or more transmitters
2. User configures each Tx: height, EIRP, antenna type (omni/sectoral), azimuth, gain
3. Coverage heatmap renders **instantly** on the map (received power in dBm)
4. Coverage boundary polygon overlays at configurable threshold (e.g., -90 dBm)
5. User adjusts parameters → coverage updates in real time
6. For multiple Tx: best-server aggregation (each pixel shows strongest signal)

**Inputs:**
- m transmitter configurations:
  - Position (lat, lon) — click on map
  - Antenna height AGL (m) — slider or input, default 30m
  - EIRP (dBm) — slider or input, default 47 dBm (Cat B max)
  - Antenna type — omni or sectoral
  - Azimuth (°) — rotatable on map, default 0° (north)
  - Antenna gain (dBi) — input, default 12 dBi

**Assumed receiver defaults (configurable in settings):**
- Antenna height: 3m AGL (typical CPE)
- Antenna gain: 0 dBi
- Minimum signal threshold: -90 dBm

**Outputs:**
- Coverage heatmap (dBm color scale) on map
- Coverage polygon at threshold
- Coverage statistics panel: area covered at various signal levels (e.g., >-70, >-80, >-90 dBm)
- Per-Tx and aggregated views

**What makes this compelling:** instant feedback. Drag a transmitter, watch coverage reshape in real time. Change height from 20m to 30m, see the difference immediately. This is the core selling point of pre-computation.

---

### 4.2 Network View

**User question:** *What does my current network look like?*

**Interaction:**
1. User uploads transmitter inventory (CSV: lat, lon, height, EIRP, antenna config)
2. User uploads receiver/customer locations (CSV: lat, lon; optional: height, gain)
3. Map shows: all Tx markers, all Rx markers, coverage from all Tx, link lines for all Tx-Rx pairs
4. User clicks any link line → detail panel shows P2P metrics

**Inputs:**
- m transmitters via CSV upload (or manual placement, reusing Forward planner UI)
  - Required: lat, lon
  - Optional: height, EIRP, gain, azimuth, beamwidth (defaults applied)
- n receivers via CSV upload
  - Required: lat, lon
  - Optional: height, gain (defaults: 3m, 0 dBi)

**Outputs:**
- Aggregated coverage heatmap from all transmitters (same as Forward with m Tx)
- All Tx-Rx link lines on map, color-coded by signal quality
  - Green: above SNR threshold
  - Yellow: marginal
  - Red: below threshold
- Automatic Tx-Rx pairing: each Rx assigned to best-serving Tx
- Network summary statistics:
  - Total receivers served / underserved
  - Average / min / max received power
  - Distribution histogram of signal levels
- Click any Rx → shows its serving Tx, link metrics, terrain profile
- Click any Tx → shows its coverage footprint, all served Rx

**Relationship to Forward:** Network View is Forward Planner (coverage from all Tx) plus link analysis for uploaded Rx. The coverage computation is identical — it just adds the Rx layer and link metrics on top.

---

## 5. Shared Components (Phase 1)

### 5.1 Map workspace
- MapLibre-based
- Tile-based raster overlay for coverage heatmaps
- Interactive device placement (drag, configure, delete)
- Link line rendering with click-to-inspect
- Viewport-aware tile loading (only fetch visible pre-computed tiles)

### 5.2 Configuration panel
- Transmitter parameter controls (sliders + inputs)
- Receiver default settings
- Propagation model indicator (shows ITM vs RT per area)
- Signal threshold selector

### 5.3 Analytics panel
- Coverage statistics (area by signal level)
- Link metrics for selected Tx-Rx pair:
  - Path loss (dB)
  - Received power (dBm)
  - SNR estimate
  - Terrain elevation profile
  - Fresnel zone clearance (stretch goal)
- Network-level statistics (Network View mode)

### 5.4 Data management
- CSV import (Tx and Rx inventories)
- Scenario save/load (save current workspace state)
- Export: coverage image, link metrics CSV, GeoJSON

### 5.5 Tech stack
- **Frontend:** Python (likely Dash, Streamlit, or Panel) + MapLibre GL JS
- **Backend:** Python API serving pre-computed tiles + runtime interpolation
- **Pre-computation pipeline:** Python (Sionna RT, ITM library) + terrain elevation service
- **Storage:** File-based tile store (Zarr or flat binary), indexed by config hash

---

## 6. What Phase 1 Does NOT Include

- **Reverse Planner** (candidate Tx search) — Phase 2
- **Link Planner** (config optimization) — Phase 2
- **Network Optimizer** (multi-link optimization) — Phase 3
- **On-demand computation fallback** — not needed for pilot; all results come from pre-computed data
- **Multi-region support** — pilot is one region only
- **User accounts / multi-tenancy** — single-user tool for now

---

## 7. Build Sequence (Phase 1)

### Step 1: Pre-computation pipeline
- Select pilot region
- Partition into tiles, classify each tile as ITM or RT based on OSM building presence
- Implement batch pipeline: for each tile × each config → compute and store path loss raster
- Run full pre-computation for pilot region (~hours)
- Validate: spot-check interpolation accuracy, model boundary smoothness

### Step 2: Tile serving + interpolation API
- API that takes (lat, lon, tx_config) → returns interpolated path loss raster for viewport
- Handles: nearest grid point lookup, height interpolation, azimuth rotation, gain offset
- Target latency: < 100ms per request

### Step 3: Forward Planner UI
- Map with Tx placement
- Real-time coverage rendering from tile API
- Configuration controls
- Coverage statistics panel

### Step 4: Network View additions
- CSV upload (Tx and Rx)
- Batch coverage computation (m Tx coverage overlay)
- Tx-Rx pairing and link metric calculation
- Link visualization + detail panel
- Network statistics

### Step 5: Polish + validation with Jesse
- UX refinements
- Edge case handling (Tx placed outside pilot region, etc.)
- Performance tuning
- Demo prep

---

## 8. Open Questions for Jesse

1. **Pilot region:** Which metro area? Ideally one with KB customer activity. Need ~1,000 km² with mixed urban/suburban terrain.

2. **Forward planner — single or multi-Tx in v1?** Multi-Tx is more useful but adds UI complexity. Recommendation: support multi-Tx from the start since Network View needs it anyway.

3. **Receiver defaults:** 3m AGL, 0 dBi gain as standard CPE assumption — acceptable?

4. **Network View CSV format:** Minimum lat/lon, with optional fields for height, gain, etc. — acceptable? Or does Jesse expect full config from customers?

5. **Signal quality metric:** received power (dBm) only, or also SNR? SNR requires noise floor assumptions.

6. **Link analytics depth:** terrain profile + path loss is straightforward. Fresnel zone clearance adds value but more implementation work. Include in Phase 1?

---

## 9. Future Phases (sketch)

**Phase 2: Optimization modes**
- Reverse Planner: candidate Tx search from tower database or algorithmic generation
- Link Planner: single-link config optimization
- Requires: optimization algorithms, candidate generation strategy

**Phase 3: Network Optimizer**
- Multi-link optimization (3 sub-modes: optimize Tx, Rx, or both)
- Requires: Tx-Rx pairing optimization, scalable search over config space

**Phase 4: Scale-out**
- Expand pre-computation to additional regions based on demand
- Evaluate nationwide coverage (see pre-computation estimates appendix)
- Multi-region UI support

---

## Appendix: Pre-computation Estimates at Scale

Reference numbers for planning beyond the pilot (1 min/km², 5 MB/km², 10 quantized configs):

| Scope | Area | Storage | Compute @ 32 cores |
|-------|------|---------|---------------------|
| Pilot (1 metro) | 1,000 km² | 50 GB | ~5 hours |
| Top 10 metros | 20,000 km² | 1 TB | ~4 days |
| All urban+suburban US | 350,000 km² | 17.5 TB | ~76 days |
| Full US land | 8,100,000 km² | 405 TB | ~4.8 years |

The pilot-first approach lets us validate assumptions before committing to larger scale.

---

*Generated: 2026-03-30 | Supersedes: 0330 CBRS Studio Plan v2*
