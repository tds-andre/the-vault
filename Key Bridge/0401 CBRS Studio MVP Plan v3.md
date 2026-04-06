# CBRS Studio — MVP Plan v3
**Date:** 2026-04-01 | **Author:** André (with Kaybee) | **Status:** Active plan

---

## 1. MVP Concept

A map-based tool that shows **existing Key Bridge CBRS transmitters** and lets users explore coverage and link quality. No device placement, no optimization — just visibility and analysis of what's already deployed.

The user flow is three steps:
1. **See** — map of existing transmitters
2. **Explore** — select a Tx, see its coverage footprint
3. **Analyze** — add receiver(s), see link metrics for each

This is the simplest thing that delivers real value: a customer (or KB sales) can look at the network, pick a tower, check if a location is serviceable, and see the link quality details.

---

## 2. System Boundaries

### What we build (Studio team — André)
- **Studio API**: FastAPI backend that orchestrates data and serves the frontend
- **Studio Frontend**: map-based UI (Dash/Panel + MapLibre)
- **Mock layer**: synthetic data backend for development until real services are available
- **Link analysis logic**: Fresnel zone, received power, best-Tx ranking, coverage stats, boundary polygons

### What we consume (other team)
- **Path Loss Tile Service**: pre-computed path loss rasters per Tx, served as tiles. We are a client.
- **Terrain Elevation Service**: point and profile elevation queries. Already exists, performant. We are a client.

### What we don't build
- Propagation models (ITM, Sionna RT) — used by the tile service internally
- Pre-computation pipeline — run by the other team
- Terrain data processing — already operational
- SAS database — we read Tx inventory from it, don't write

```
┌─────────────────────────────────────────────────┐
│                  Studio (we build)               │
│  ┌──────────┐    ┌──────────────────────────┐   │
│  │ Frontend │◄──►│ Studio API (FastAPI)      │   │
│  │ MapLibre │    │  - Tx inventory           │   │
│  │ Dash     │    │  - Link analysis          │   │
│  └──────────┘    │  - Coverage stats/boundary│   │
│                  │  - Best-Tx ranking        │   │
│                  └──────┬───────┬────────────┘   │
│                         │       │                │
└─────────────────────────┼───────┼────────────────┘
                          │       │
              ┌───────────▼─┐  ┌──▼──────────────┐
              │ Path Loss   │  │ Terrain          │
              │ Tile Service│  │ Elevation Service│
              │ (other team)│  │ (other team)     │
              └─────────────┘  └──────────────────┘
```

---

## 3. Data Model

### 3.1 Core Entities

#### Region
The pilot area for which data is pre-computed.

| Field | Type | Description |
|-------|------|-------------|
| `region_id` | string | Unique identifier (e.g., "dc-metro") |
| `name` | string | Human-readable name |
| `bbox` | [float × 4] | Bounding box [west, south, east, north] |
| `area_km2` | float | Total area |
| `precomputed_at` | datetime | When pre-computation was last run |
| `propagation_models` | [string] | Models available (e.g., ["ITM", "sionna_rt"]) |

#### Transmitter
A registered CBSD in the SAS. Read-only for the Studio.

| Field | Type | Description |
|-------|------|-------------|
| `tx_id` | string | CBSD ID (primary key) |
| `region_id` | string | FK → Region |
| `lat` | float | Latitude (decimal degrees) |
| `lon` | float | Longitude (decimal degrees) |
| `height_m` | float | Antenna height AGL (meters) |
| `eirp_dbm` | float | Effective isotropic radiated power |
| `gain_dbi` | float | Antenna gain |
| `azimuth_deg` | float | Antenna boresight azimuth (0 = north, clockwise) |
| `beamwidth_deg` | float | 3 dB beamwidth (360 = omni) |
| `category` | enum(A, B) | CBSD category |
| `frequency_mhz` | float | Operating frequency (default 3550) |
| `label` | string | Optional display name |
| `coverage_radius_km` | float | Pre-computed coverage extent |

#### Receiver
User-placed point of interest. Exists only in the current session (not persisted in MVP).

| Field | Type | Description |
|-------|------|-------------|
| `rx_id` | string | Client-generated UUID |
| `lat` | float | Latitude |
| `lon` | float | Longitude |
| `height_m` | float | Antenna height AGL (default 3.0) |
| `gain_dbi` | float | Antenna gain (default 0.0) |
| `label` | string | Optional user label |

#### Link
A computed Tx → Rx connection. Derived at runtime, not stored.

| Field | Type | Description |
|-------|------|-------------|
| `tx_id` | string | FK → Transmitter |
| `rx_id` | string | FK → Receiver |
| `distance_km` | float | Great-circle distance |
| `path_loss_db` | float | From path loss tile service |
| `received_power_dbm` | float | `eirp - path_loss + rx_gain` |
| `propagation_model` | string | Model that produced the path loss |
| `fresnel_clearance_pct` | float | % of 1st Fresnel zone clear |

#### ElevationProfile
Terrain cross-section along a link path. Retrieved from terrain service.

| Field | Type | Description |
|-------|------|-------------|
| `tx_id` | string | FK → Transmitter |
| `rx_id` | string | FK → Receiver |
| `sample_count` | int | Number of sample points |
| `distance_m` | [float] | Distance from Tx at each sample |
| `elevation_m` | [float] | Terrain elevation at each sample |
| `los_height_m` | [float] | Line-of-sight height at each sample |
| `fresnel_upper_m` | [float] | Upper Fresnel zone boundary |
| `fresnel_lower_m` | [float] | Lower Fresnel zone boundary |

#### CoverageStats
Derived from path loss tiles. Computed by Studio API, not stored.

| Field | Type | Description |
|-------|------|-------------|
| `tx_id` | string | FK → Transmitter |
| `rx_height_m` | float | Assumed receiver height |
| `rx_gain_dbi` | float | Assumed receiver gain |
| `thresholds` | [{threshold_dbm, area_km2}] | Area covered at each signal level |
| `total_area_km2` | float | Total computed area |

### 3.2 Entity Relationships

```
Region 1──* Transmitter
Transmitter 1──* Link
Receiver 1──* Link
Link 1──1 ElevationProfile
Transmitter 1──1 CoverageStats (derived, parameterized by Rx assumptions)
```

### 3.3 Data lifecycle

| Entity | Source | Persistence | Mutability |
|--------|--------|-------------|------------|
| Region | Config / SAS | Static (config file or DB) | Changes only when new region added |
| Transmitter | SAS database | Read-only mirror | Updates when SAS data refreshes |
| Receiver | User interaction | Session only (in-memory) | User creates/moves/deletes freely |
| Link | Computed at runtime | Session only (in-memory) | Recomputed when Tx or Rx changes |
| ElevationProfile | Terrain service | Cached | Immutable (terrain doesn't change) |
| CoverageStats | Computed from tiles | Cached | Recomputed if Rx assumptions change |

### 3.4 Pydantic models (Python)

```python
from pydantic import BaseModel
from enum import Enum
from datetime import datetime

class CbsdCategory(str, Enum):
    A = "A"
    B = "B"

class Region(BaseModel):
    region_id: str
    name: str
    bbox: tuple[float, float, float, float]  # west, south, east, north
    area_km2: float
    precomputed_at: datetime
    propagation_models: list[str]

class Transmitter(BaseModel):
    tx_id: str
    region_id: str
    lat: float
    lon: float
    height_m: float
    eirp_dbm: float
    gain_dbi: float = 12.0
    azimuth_deg: float = 0.0
    beamwidth_deg: float = 360.0
    category: CbsdCategory = CbsdCategory.B
    frequency_mhz: float = 3550.0
    label: str | None = None
    coverage_radius_km: float = 8.0

class Receiver(BaseModel):
    rx_id: str
    lat: float
    lon: float
    height_m: float = 3.0
    gain_dbi: float = 0.0
    label: str | None = None

class ElevationProfile(BaseModel):
    sample_count: int
    distance_m: list[float]
    elevation_m: list[float]
    los_height_m: list[float]
    fresnel_upper_m: list[float]
    fresnel_lower_m: list[float]

class LandCoverSegment(BaseModel):
    type: str
    fraction: float

class LinkMetrics(BaseModel):
    tx_id: str
    rx: Receiver
    distance_km: float
    path_loss_db: float
    received_power_dbm: float
    propagation_model: str
    fresnel_clearance_pct: float
    elevation_profile: ElevationProfile
    land_cover: list[LandCoverSegment]

class LinkCandidate(BaseModel):
    tx_id: str
    distance_km: float
    path_loss_db: float
    received_power_dbm: float
    rank: int

class CoverageThreshold(BaseModel):
    threshold_dbm: float
    area_km2: float

class CoverageStats(BaseModel):
    tx_id: str
    coverage: list[CoverageThreshold]
    total_computed_area_km2: float
```

---

## 4. External Service Contracts

These are the APIs we **consume** from the other team. We need to agree on these contracts (or mock them if the APIs don't exist yet).

### 4.1 Path Loss Tile Service (consumed)

We propose the following contract. To be confirmed with the provider team.

#### `GET /pathloss/{tx_id}/tiles/{z}/{x}/{y}`

Returns raw path loss data for a single tile in a transmitter's coverage area.

**Path parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `tx_id` | string | Transmitter / CBSD ID |
| `z` | int | Zoom level |
| `x` | int | Tile column (slippy map) |
| `y` | int | Tile row (slippy map) |

**Response:** Binary raster tile (format TBD with provider team — options below)

**Format options (to negotiate):**

| Format | Pros | Cons |
|--------|------|------|
| **GeoTIFF** (float32 grid) | Standard, self-describing, any resolution | Larger, needs server-side lib |
| **Protobuf / flat binary** (float32 array + header) | Compact, fast parse | Custom format, needs spec |
| **PNG with encoded values** (Mapbox Terrain RGB style) | MapLibre-native, tiled | Lossy encoding (8-bit per channel) |
| **JSON grid** | Simple, debuggable | Large, slow |

**Our preference:** Protobuf or flat binary for raw data. We handle colorization and rendering client-side. But if the team prefers to serve pre-rendered PNGs, we can adapt.

**Minimum data per tile:**
- Path loss values (dB) on a regular grid
- Grid resolution (meters per pixel)
- Propagation model used (ITM or sionna_rt)
- Bounds (geographic extent of this tile)

#### `GET /pathloss/{tx_id}/info`

Metadata about available pre-computed coverage for a transmitter.

**Response:**
```json
{
  "tx_id": "CBSD-00147",
  "coverage_bbox": [-77.25, 38.75, -76.85, 39.05],
  "coverage_radius_km": 8.0,
  "available_zoom_levels": [12, 13, 14],
  "resolution_m": 30,
  "propagation_models": ["ITM", "sionna_rt"],
  "computed_at": "2026-04-10T14:30:00Z"
}
```

#### `GET /pathloss/{tx_id}/value?lat=...&lon=...`

Point query: path loss at a specific location from a specific transmitter.

**Response:**
```json
{
  "tx_id": "CBSD-00147",
  "lat": 38.92,
  "lon": -77.01,
  "path_loss_db": 128.5,
  "propagation_model": "ITM",
  "resolution_m": 30
}
```

**Why we need this:** For link analysis, we need the exact path loss at the Rx location, not a full tile. This avoids fetching an entire tile just to read one pixel value.

### 4.2 Terrain Elevation Service (consumed)

Already exists and is performant. We need:

#### `GET /elevation?lat=...&lon=...`

Single point elevation query.

**Response:**
```json
{
  "lat": 38.92,
  "lon": -77.01,
  "elevation_m": 45.2,
  "source": "ned_10m"
}
```

#### `GET /elevation/profile?lat1=...&lon1=...&lat2=...&lon2=...&samples=100`

Elevation profile between two points.

**Response:**
```json
{
  "samples": 100,
  "distance_m": [0, 34.2, 68.4, "..."],
  "elevation_m": [45.2, 43.1, 41.0, "..."],
  "source": "ned_10m"
}
```

### 4.3 Integration status

| Service | Status | Action needed |
|---------|--------|--------------|
| Path Loss Tile Service | Not yet available | Agree on contract, mock for now |
| Terrain Elevation Service | Exists, performant | Confirm API format, test access |
| SAS Tx inventory | Exists | Confirm read access, extract pilot data |

---

## 5. Studio API (what we build)

Our API orchestrates the external services and adds Studio-specific logic. All endpoints unauthenticated REST. Base URL: `{host}/api/v1`

### 5.1 Transmitters

#### `GET /transmitters`

List all transmitters, optionally filtered by viewport.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `bbox` | string | No | `west,south,east,north` (decimal degrees) |

**Response:** `200 OK`
```json
{
  "transmitters": [Transmitter, ...],
  "count": 47
}
```

**Data source:** SAS inventory (read-only) or mock Tx list.

#### `GET /transmitters/{tx_id}`

Single transmitter detail.

**Response:** `200 OK` — Transmitter object + precomputed metadata from path loss service.

---

### 5.2 Coverage

#### `GET /coverage/{tx_id}/tiles/{z}/{x}/{y}.png`

Coverage heatmap tile for a transmitter. **We build this by:**
1. Fetching raw path loss tile from external Path Loss Tile Service
2. Applying receiver assumptions: `rx_power = eirp - path_loss + rx_gain`
3. Colorizing to PNG using the dBm color scale
4. Returning the PNG

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `rx_height_m` | float | 3.0 | Receiver antenna height AGL |
| `rx_gain_dbi` | float | 0.0 | Receiver antenna gain |

**Response:** `200 OK`, 256×256 PNG tile. Transparent where no data.

**Color scale:**

| Received power (dBm) | Color |
|----------------------|-------|
| ≥ -60 | Deep green |
| -60 to -70 | Green |
| -70 to -80 | Yellow |
| -80 to -90 | Orange |
| -90 to -100 | Red |
| < -100 | Transparent |

**MapLibre integration:**
```javascript
map.addSource('coverage', {
  type: 'raster',
  tiles: [`${API}/coverage/${txId}/tiles/{z}/{x}/{y}.png`],
  tileSize: 256
});
map.addLayer({ id: 'coverage', type: 'raster', source: 'coverage', paint: { 'raster-opacity': 0.6 } });
```

#### `GET /coverage/{tx_id}/stats`

Coverage area statistics. **We build this by** integrating over the path loss raster.

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `rx_height_m` | float | 3.0 | Receiver height |
| `rx_gain_dbi` | float | 0.0 | Receiver gain |
| `thresholds_dbm` | string | "-70,-80,-90" | Comma-separated thresholds |

**Response:** `200 OK` — CoverageStats object.

#### `GET /coverage/{tx_id}/boundary`

Coverage polygon at threshold. **We build this** via marching squares on the received power raster.

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `threshold_dbm` | float | -90.0 | Signal level for boundary |
| `rx_height_m` | float | 3.0 | Receiver height |
| `rx_gain_dbi` | float | 0.0 | Receiver gain |

**Response:** `200 OK`, GeoJSON Feature (Polygon).

---

### 5.3 Link Analysis

#### `GET /link`

Full link analysis between a Tx and a user-placed Rx. **We build this by:**
1. Querying path loss at Rx point from Path Loss Tile Service (`/pathloss/{tx_id}/value`)
2. Querying elevation profile from Terrain Elevation Service (`/elevation/profile`)
3. Computing: received power, Fresnel zone clearance, land cover fractions
4. Assembling the LinkMetrics response

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `tx_id` | string | Yes | Transmitter ID |
| `rx_lat` | float | Yes | Receiver latitude |
| `rx_lon` | float | Yes | Receiver longitude |
| `rx_height_m` | float | No (3.0) | Receiver height |
| `rx_gain_dbi` | float | No (0.0) | Receiver gain |

**Response:** `200 OK` — LinkMetrics object.

#### `GET /link/best`

Rank best-serving Tx for a given Rx location. **We build this by** querying path loss for the Rx point from every Tx's raster, then ranking.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `rx_lat` | float | Yes | Receiver latitude |
| `rx_lon` | float | Yes | Receiver longitude |
| `rx_height_m` | float | No (3.0) | Receiver height |
| `rx_gain_dbi` | float | No (0.0) | Receiver gain |
| `top_n` | int | No (3) | How many candidates |

**Response:** `200 OK`
```json
{
  "rx": { "lat": 38.92, "lon": -77.01 },
  "candidates": [LinkCandidate, ...]
}
```

---

### 5.4 Region

#### `GET /region`

Current pilot region info.

**Response:** `200 OK` — Region object.

---

### 5.5 Studio API summary

| Endpoint | What we compute | External calls |
|----------|----------------|----------------|
| `GET /transmitters` | Filtering, formatting | SAS DB read |
| `GET /transmitters/{tx_id}` | Formatting | SAS DB + pathloss info |
| `GET /coverage/.../tiles/{z}/{x}/{y}.png` | Rx power calc, colorization to PNG | Path Loss Tile Service |
| `GET /coverage/{tx_id}/stats` | Area integration | Path Loss Tile Service (full raster) |
| `GET /coverage/{tx_id}/boundary` | Marching squares | Path Loss Tile Service (full raster) |
| `GET /link` | Rx power, Fresnel, assembly | Path Loss (point) + Terrain (profile) |
| `GET /link/best` | Ranking across all Tx | Path Loss (point) × N |
| `GET /region` | Static config | None |

---

## 6. Feature Specification

### 6.1 Feature 1 — Tx Map

**What:** All existing transmitters in the pilot region displayed on the map.

**Data source:** SAS registration data → Studio API `/transmitters`.

**UI:**
- MapLibre base map
- Tx markers with color/size encoding category (A vs B)
- Click Tx marker → info popup with config summary
- Tx list sidebar with filter (optional MVP, nice-to-have)

**Complexity:** Low.

---

### 6.2 Feature 2 — Tx Coverage (point-to-area)

**What:** Select a Tx → see its coverage footprint.

**Interaction:**
1. Click Tx marker → coverage heatmap renders instantly on map
2. Coverage polygon overlays at threshold
3. Stats appear in side panel

**Frontend calls:**
- `/coverage/{tx_id}/tiles/...` → MapLibre raster source
- `/coverage/{tx_id}/stats` → stats panel
- `/coverage/{tx_id}/boundary` → GeoJSON polygon layer

**Receiver defaults (configurable):** 3m AGL, 0 dBi, -90 dBm threshold.

**Complexity:** Medium.

---

### 6.3 Feature 3 — Link Metrics (point-to-point)

**What:** Place Rx → see link metrics to serving Tx.

**Interaction:**
1. Click map to place Rx
2. Auto-call `/link/best` → identify and draw link to best Tx
3. Call `/link` → show metrics + elevation profile chart
4. Click other Tx to see alternative links

**Frontend calls:**
- `/link/best` → auto-pairing
- `/link` → full metrics including elevation profile
- Elevation profile chart (Plotly)
- Fresnel zone visualization overlaid on profile

**Complexity:** Medium-High.

---

## 7. Mock Strategy

Everything is mocked until real services are available. The mock implements the **same Studio API contract** — the frontend doesn't know or care whether it's mock or real.

### 7.1 What we mock

| Component | Mock approach |
|-----------|--------------|
| **Tx inventory** | 30–50 synthetic CBSDs in a real geographic area |
| **Path Loss Tile Service** | Free-space path loss (Friis equation), computed on-the-fly |
| **Terrain Elevation Service** | Smoothed random terrain profile generation |
| **Land cover** | Hardcoded 50/50 urban/open split |

### 7.2 Mock region

Use a real geographic area (e.g., Washington DC metro) so the map looks realistic. Only the data is synthetic.

### 7.3 Mock transmitters
```python
def generate_mock_transmitters(center_lat, center_lon, count=50):
    transmitters = []
    for i in range(count):
        transmitters.append(Transmitter(
            tx_id=f"MOCK-{i:04d}",
            region_id="mock-region",
            lat=center_lat + random.uniform(-0.1, 0.1),
            lon=center_lon + random.uniform(-0.15, 0.15),
            height_m=random.choice([10, 15, 20, 30, 50]),
            eirp_dbm=random.choice([30.0, 40.0, 47.0]),
            gain_dbi=12.0,
            azimuth_deg=random.uniform(0, 360),
            beamwidth_deg=random.choice([360.0, 90.0, 45.0]),
            category=random.choice([CbsdCategory.A, CbsdCategory.B]),
            label=f"Mock Tower {i}"
        ))
    return transmitters
```

### 7.4 Mock path loss (replaces external tile service)

Free-space path loss: `FSPL(d, f) = 20·log10(d) + 20·log10(f) + 32.45`

For coverage tiles: compute per-pixel distance to Tx → apply Friis + antenna pattern → colorize → PNG. Fast enough on-the-fly, no pre-computation needed.

Optional: add log-normal shadow fading (~8 dB std dev) for less-circular coverage.

### 7.5 Mock terrain (replaces external elevation service)

Generate a smoothed random profile between Tx and Rx:
```python
def mock_elevation_profile(n_samples=100, base_m=50, std_m=10):
    raw = [base_m + random.gauss(0, std_m) for _ in range(n_samples)]
    return moving_average(raw, window=5)
```

### 7.6 Project structure
```
studio/
├── api/
│   ├── app.py              # FastAPI app, route registration
│   ├── routes/
│   │   ├── transmitters.py # /transmitters endpoints
│   │   ├── coverage.py     # /coverage endpoints
│   │   ├── link.py         # /link endpoints
│   │   └── region.py       # /region endpoint
│   ├── models.py           # Pydantic models (shared)
│   ├── services/
│   │   ├── pathloss.py     # Client interface for Path Loss Tile Service
│   │   ├── terrain.py      # Client interface for Terrain Elevation Service
│   │   ├── coverage.py     # Coverage logic (colorize, stats, boundary)
│   │   ├── link.py         # Link analysis logic (Fresnel, ranking)
│   │   └── transmitters.py # Tx inventory access
│   └── mock/
│       ├── pathloss.py     # Mock path loss (Friis)
│       ├── terrain.py      # Mock elevation profiles
│       ├── transmitters.py # Mock Tx generator
│       └── region.py       # Mock region config
├── frontend/
│   └── ...                 # Dash/Panel + MapLibre
├── config.py               # DATA_SOURCE = "mock" | "real"
└── tests/
    └── ...
```

**Key pattern:** `services/pathloss.py` defines the interface (abstract class or protocol). `mock/pathloss.py` implements it with Friis. When real services come online, we add `real/pathloss.py` with HTTP client calls. The config flag switches implementations. Routes and frontend never change.

### 7.7 What mock validates vs. doesn't

| Validates | Does not validate |
|-----------|-------------------|
| API contract and response shapes | Propagation accuracy |
| Frontend rendering (heatmaps, lines, panels) | Real Tx positions and configs |
| User interaction flow | Performance at real tile sizes |
| MapLibre tile integration | External service reliability |
| Elevation profile charting | Terrain accuracy |
| Coverage polygon generation | Model boundary handling (ITM↔RT) |

---

## 8. Tech Stack

| Component | Technology | Notes |
|-----------|-----------|-------|
| Frontend | Python (Dash or Panel) + MapLibre GL JS | |
| Backend API | Python (FastAPI) | |
| Response models | Pydantic | Shared across mock and real |
| Mock coverage | Friis equation + Pillow (PNG) | On-the-fly, no pre-comp |
| Mock terrain | Random profile generation | |
| Charting | Plotly | Elevation profiles |
| External: Path Loss | TBD (HTTP client) | Other team builds |
| External: Terrain | TBD (HTTP client) | Already exists |
| External: Tx data | SAS DB (read-only) | Already exists |

---

## 9. UI Layout

```
┌──────────────────────────────────────────────────┐
│  CBRS Studio                          [Settings] │
├──────────┬───────────────────────────────────────┤
│          │                                       │
│ Tx List  │                                       │
│          │                                       │
│ ● Tx-001 │          Map (MapLibre)               │
│ ● Tx-002 │                                       │
│ ○ Tx-003 │   [Tx markers]                        │
│ ○ Tx-004 │   [Coverage heatmap when Tx selected] │
│   ...    │   [Rx markers when placed]            │
│          │   [Link lines when Rx placed]         │
│──────────│                                       │
│          │                                       │
│ Detail   │                                       │
│ Panel    │                                       │
│          │                                       │
│ Tx info  │                                       │
│ -or-     │                                       │
│ Link     │                                       │
│ metrics  │                                       │
│ + charts │                                       │
│          │                                       │
└──────────┴───────────────────────────────────────┘
```

**Panel states:**
- **No selection:** Tx list only
- **Tx selected:** Tx config + coverage stats
- **Rx placed:** Link metrics + elevation profile chart
- **Multiple Rx:** Link summary table, click row to expand

---

## 10. Build Plan

### Step 1: Project scaffold + data models (~2 days)
- FastAPI project with the mock/real service pattern
- Pydantic models for all entities
- Service interfaces (pathloss, terrain, transmitters)
- Mock implementations (Tx generator, Friis, random terrain)
- Config flag for data source switching

### Step 2: Studio API — transmitters + region (~1-2 days)
- `GET /transmitters` with bbox filtering (backed by mock Tx list)
- `GET /transmitters/{tx_id}`
- `GET /region`
- Test with Swagger UI

### Step 3: Studio API — coverage (~3-4 days)
- Coverage tile endpoint: fetch mock path loss → apply Rx assumptions → colorize → PNG
- `GET /coverage/{tx_id}/tiles/{z}/{x}/{y}.png`
- `GET /coverage/{tx_id}/stats`
- `GET /coverage/{tx_id}/boundary` (marching squares on the raster)
- Validate tiles render in a test MapLibre page

### Step 4: Studio API — link analysis (~2-3 days)
- `GET /link` with mock elevation profile, Fresnel zone calc, land cover
- `GET /link/best` (rank all Tx by received power at Rx point)
- Validate response shapes

### Step 5: Frontend — map + Tx display (~2-3 days)
- MapLibre setup
- Tx markers from Studio API
- Tx list sidebar
- Click Tx → detail panel

### Step 6: Frontend — coverage (~3-5 days)
- Raster tile source from Studio API
- Coverage layer with opacity
- Stats panel
- Boundary polygon overlay
- Receiver default settings

### Step 7: Frontend — link analysis (~3-5 days)
- Click-to-place Rx
- Auto `/link/best` → link line to best Tx
- Link metrics panel
- Elevation profile chart (Plotly)
- Fresnel zone on profile
- Multi-Rx support

### Step 8: Polish + demo (~2-3 days)
- UX (tooltips, legends, responsive panels)
- Edge cases
- Performance
- Demo prep

**Total estimate: ~18-27 working days** (4-5 weeks)

### Transition to real services
When external services come online, we:
1. Implement `real/pathloss.py` (HTTP client to Path Loss Tile Service)
2. Implement `real/terrain.py` (HTTP client to Terrain Elevation Service)
3. Point `real/transmitters.py` at SAS DB
4. Flip config flag from "mock" to "real"
5. Frontend: zero changes

---

## 11. Pilot Region Estimates

Once external services are operational:

| Item | Estimate |
|------|----------|
| Tx count in pilot | ~20–100 |
| Coverage radius per Tx | ~5–10 km (Cat B outdoor) |
| Tiles per Tx | ~80–300 (1 km² tiles) |
| Total tiles (50 Tx × 200 avg) | ~10,000 |
| Storage (5 MB/tile) | ~50 GB |
| Compute (1 min/tile @ 32 cores) | ~5 hours |

Model per tile: OSM buildings → Sionna RT, else → ITM.

---

## 12. Checkpoint After Phase 1

After MVP, evaluate:

**Option A — Find best Tx:** `GET /link/best` already exists. Just needs a UI mode ("click anywhere → see ranked towers"). Low effort.

**Option B — Optimizers:** Config optimization for Link/Network. Higher effort, requires algorithms.

---

## 13. Phase 2 sketch — Custom Tx

User places new Tx, configures, sees coverage. Two options for coverage:
1. Interpolation from pre-computed quantized configs
2. On-demand computation (slower)

Phase 1 defers this. Pilot experience informs the choice.

---

## 14. Open Questions for Jesse

1. **Pilot region** — which metro area?
2. **Path Loss Tile Service API** — does the other team have a contract, or should we propose one (Section 4.1)?
3. **Terrain Elevation Service API** — confirm current endpoint format matches Section 4.2
4. **Receiver defaults** — 3m AGL, 0 dBi acceptable?
5. **Coverage stats** — which signal thresholds to show? (-70, -80, -90 dBm?)
6. **Link metrics** — Fresnel zone in Phase 1, or stretch goal?

---

*Generated: 2026-04-01 | Based on: 0330 meeting notes, v2.2 plan, Jesse's 0325 feedback*
