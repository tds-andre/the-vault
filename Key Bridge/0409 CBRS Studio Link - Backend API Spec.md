---
created_by: Kaybee
created_on: '2026-04-14'
type: spec
updated_by: ''
updated_on: ''
---


# CBRS Studio Link — Backend API Specification

*For Jesse — current endpoint definitions for the Studio Link tool.*

All endpoints are `GET`, unauthenticated, and return JSON. Base URL: `{host}/api`

---

## Endpoints

### 1. `GET /api/link`

**Purpose:** Core endpoint. Given a transmitter and receiver position, returns full link analysis data including elevation profile, path loss profile, Fresnel zone geometry, and link budget summary.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `tx_lat` | float | yes | — | Transmitter latitude (decimal degrees) |
| `tx_lon` | float | yes | — | Transmitter longitude (decimal degrees) |
| `rx_lat` | float | yes | — | Receiver latitude (decimal degrees) |
| `rx_lon` | float | yes | — | Receiver longitude (decimal degrees) |
| `tx_height_m` | float | no | 30.0 | Transmitter antenna height AGL (meters) |
| `rx_height_m` | float | no | 3.0 | Receiver antenna height AGL (meters) |
| `frequency_mhz` | float | no | 3550.0 | Operating frequency (MHz) |

**Example request:**
```
GET /api/link?tx_lat=38.9072&tx_lon=-77.0369&rx_lat=38.92&rx_lon=-77.01
```

**Response:**

```json
{
  "tx": {
    "lat": 38.9072,
    "lon": -77.0369,
    "height_m": 30.0
  },
  "rx": {
    "lat": 38.92,
    "lon": -77.01,
    "height_m": 3.0
  },
  "frequency_mhz": 3550.0,
  "distance_km": 2.816,
  "path_loss_db": 125.3,
  "free_space_loss_db": 119.2,
  "received_power_dbm": -78.3,
  "propagation_model": "ITM",
  "elevation_profile": {
    "distances_m": [0.0, 28.4, 56.9, ...],
    "elevations_m": [45.2, 43.1, 41.0, ...],
    "los_heights_m": [75.2, 74.9, 74.6, ...],
    "fresnel_upper_m": [75.2, 76.1, 76.8, ...],
    "fresnel_lower_m": [75.2, 73.7, 72.4, ...]
  },
  "path_loss_profile": {
    "distances_m": [0.0, 28.4, 56.9, ...],
    "path_loss_db": [0.0, 85.2, 91.4, ...]
  }
}
```

**Response field details:**

| Field | Type | Description |
|-------|------|-------------|
| `tx`, `rx` | object | Echo back of positions and heights |
| `frequency_mhz` | float | Operating frequency used |
| `distance_km` | float | Great-circle distance between Tx and Rx |
| `path_loss_db` | float | Total path loss at the receiver point (dB) |
| `free_space_loss_db` | float | Free-space path loss for comparison (dB) |
| `received_power_dbm` | float | Estimated received power: `EIRP - path_loss + rx_gain` (dBm) |
| `propagation_model` | string | Which model produced the result (e.g., "ITM", "Sionna RT", or "Friis (mock)") |
| `elevation_profile.distances_m` | float[] | Distance from Tx at each sample point (meters), 100 points |
| `elevation_profile.elevations_m` | float[] | Terrain elevation at each sample (meters AGL) |
| `elevation_profile.los_heights_m` | float[] | Line-of-sight height at each sample (straight line from Tx tip to Rx tip) |
| `elevation_profile.fresnel_upper_m` | float[] | Upper boundary of 1st Fresnel zone at each sample |
| `elevation_profile.fresnel_lower_m` | float[] | Lower boundary of 1st Fresnel zone at each sample |
| `path_loss_profile.distances_m` | float[] | Distance from Tx at each sample (meters) |
| `path_loss_profile.path_loss_db` | float[] | Cumulative path loss at each sample (dB) |

**Link budget assumptions** (current defaults, configurable later):
- Tx EIRP: 47 dBm (Cat B max)
- Tx gain: 12 dBi
- Rx gain: 0 dBi

---

### 2. `GET /api/config`

**Purpose:** Returns default configuration values and the initial map region. Used by the frontend on startup.

**Parameters:** None.

**Response:**

```json
{
  "defaults": {
    "tx_height_m": 30.0,
    "rx_height_m": 3.0,
    "tx_eirp_dbm": 47.0,
    "tx_gain_dbi": 12.0,
    "rx_gain_dbi": 0.0,
    "frequency_mhz": 3550.0
  },
  "region": {
    "center_lat": 38.9072,
    "center_lon": -77.0369,
    "zoom": 10,
    "name": "Washington DC Metro"
  }
}
```

---

### 3. `GET /api/health`

**Purpose:** Simple health check.

**Response:**

```json
{
  "status": "ok",
  "mock": true
}
```

The `mock` field indicates whether the backend is using simulated data (`true`) or real propagation services (`false`).

---

## Current State

The backend currently returns **mock data** using free-space path loss (Friis equation) and synthetic terrain. The elevation profile is generated from a seeded random walk — it looks plausible but is not real terrain.

**To swap to real data**, we need the path loss and elevation services to provide:
1. **Path loss** between two points (using ITM or Sionna RT)
2. **Elevation profile** — terrain heights sampled along the path between Tx and Rx
3. **Propagation model indicator** — which model produced the result

The response format above is what the frontend expects. If the real backend services return data in a different shape, we'll write an adapter.

---

## Error Handling

All errors return JSON:
```json
{
  "detail": "Error message here"
}
```

| HTTP Code | Meaning |
|-----------|---------|
| 200 | Success |
| 400 | Invalid parameters (missing required fields, out-of-range values) |
| 500 | Server error |
