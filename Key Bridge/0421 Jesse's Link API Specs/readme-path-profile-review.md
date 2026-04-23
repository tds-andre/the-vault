---
created_by: Kaybee
created_on: '2026-04-21'
type: spec-review
updated_by: ''
updated_on: ''
---


# Path Profile REST Resource — Doc Review

*Kaybee's review of Jesse's `readme-path-profile.md` (April 21, 2026). Corrections based on live API testing against `http://a1.mcl.keybridge.ch:9090/rs/pollock/path`.*

---

## Summary of corrections

1. **`z2` default is 2.0, not 6.0** — Docs say default Rx height is 6.0m, but the live API returns `z: 2.0` when `z2` is omitted. Either the server was updated or the docs were generated from older code.

2. **`txPower` and `rxPower` are in dBm, not watts** — Docs describe these as "in watts" but the live response returns `txPower: 47.0` and `rxPower: -66.1`. 47 watts would be ~16.7 dBW, and negative watts is physically meaningless. These are clearly dBm values (47 dBm = Cat B max EIRP, rxPower = txPower - pathLoss).

3. **`fresnelClearanceOk` is documented as "integer" but behaves as boolean** — Values are strictly 0 or 1. The schema says `"type": "integer", "enum": [0, 1]` which is correct but the text description should clarify this is a per-point boolean: 1 = Fresnel clearance adequate, 0 = Fresnel zone obstructed.

4. **No distances array provided** — The response contains profile arrays (elevation, LOS, Fresnel, etc.) but no corresponding array of distances along the path. Consumers must compute this from `distance` (total, in meters) divided by `(num_points - 1)`. The number of points varies with link length (up to 256 based on NED 30m resolution), so `distances[i] = i * (distance / (num_points - 1))`.

5. **Elevation plotting note** — The docs describe `elevationProfile` and `earthCurvature` as separate arrays but don't explicitly state they should be summed for display. From Jesse's annotated reference plot: **plot terrain as `elevationProfile[i] + earthCurvature[i]`** for the corrected elevation view.

6. **Frequency is not a parameter** — Docs mention "default frequency 3600 MHz" but there is no frequency query parameter. It's fixed server-side. Worth documenting explicitly as non-configurable.

7. **`clearanceProfile` not well documented** — Described as "clearance (LOS minus effective terrain) at each path point" but Jesse mentioned in the meeting this is "internal data" that can be ignored. It appears to be the vertical distance between the LOS line and the terrain+curvature surface at each point.

---

## Corrected parameter table

| Parameter | Type   | Description | Required | Default |
|-----------|--------|-------------|----------|---------|
| `x1` | double | Tx **longitude** (decimal degrees) | Yes | — |
| `y1` | double | Tx **latitude** (decimal degrees) | Yes | — |
| `z1` | double | Tx antenna height AGL (meters) | No | 18.0 |
| `x2` | double | Rx **longitude** (decimal degrees) | Yes | — |
| `y2` | double | Rx **latitude** (decimal degrees) | Yes | — |
| `z2` | double | Rx antenna height AGL (meters) | No | ~~6.0~~ **2.0** |

**Convention: x = longitude, y = latitude.** This is the opposite of the common (lat, lon) convention used in most web mapping APIs. Take care when integrating.

---

## Corrected response field descriptions

| Field | Type | Unit | Description |
|-------|------|------|-------------|
| `transmitter` | object | — | `{x: lon, y: lat, z: height_m}` |
| `receiver` | object | — | `{x: lon, y: lat, z: height_m}` |
| `earthCurvature` | float[] | meters | Earth curvature correction at each point. **Sum with `elevationProfile` for display.** |
| `elevationProfile` | float[] | meters | Raw terrain elevation (NED) at each point |
| `landCoverProfile` | int[] | NLCD code | Land cover type at each point (see NLCD legend) |
| `losProfile` | float[] | meters | Line-of-sight height at each point |
| `fresnelUpperProfile` | float[] | meters | Upper 1st Fresnel zone boundary |
| `fresnelLowerProfile` | float[] | meters | Lower 1st Fresnel zone boundary |
| `clearanceProfile` | float[] | meters | LOS minus effective terrain (internal, can ignore) |
| `fresnelClearanceOk` | int[] (0/1) | boolean | 1 = adequate Fresnel clearance, 0 = obstructed |
| `pathSuitability` | string | — | Human-readable assessment (e.g., "Excellent - Full 60%+ Fresnel clearance") |
| `pathLoss` | float | **dB** | Calculated path loss (ITM model) |
| `txPower` | float | ~~watts~~ **dBm** | Transmitter power (Cat B max = 47 dBm) |
| `rxPower` | float | ~~watts~~ **dBm** | Received power = txPower - pathLoss |
| `distance` | float | **meters** | Total path distance |
| `txBearing` | float | degrees | Bearing from Tx toward Rx |
| `txElevationAngle` | float | degrees | Elevation angle from Tx |
| `rxBearing` | float | degrees | Bearing from Rx toward Tx |
| `rxElevationAngle` | float | degrees | Elevation angle from Rx |

---

## Verified live example

**Request:**
```
GET http://a1.mcl.keybridge.ch:9090/rs/pollock/path?x1=-77.0369&y1=38.9072&x2=-77.01&y2=38.92
```

**Response (key fields, arrays truncated):**
```json
{
  "transmitter": {"x": -77.0369, "y": 38.9072, "z": 18.0},
  "receiver": {"x": -77.01, "y": 38.92, "z": 2.0},
  "elevationProfile": [22.0, 22.7, 22.3, 23.4, ...],
  "earthCurvature": [0.0, 0.0, 0.0, ...],
  "losProfile": [40.0, 40.1, 40.1, ...],
  "fresnelUpperProfile": [40.0, 41.6, 42.3, ...],
  "fresnelLowerProfile": [40.0, 38.5, 37.9, ...],
  "fresnelClearanceOk": [1, 1, 1, ...],
  "pathSuitability": "Excellent - Full 60%+ Fresnel clearance across entire path",
  "pathLoss": 113.1,
  "txPower": 47.0,
  "rxPower": -66.1,
  "distance": 2728.1,
  "txBearing": 58.6,
  "txElevationAngle": -0.3,
  "rxBearing": 238.7,
  "rxElevationAngle": 0.3
}
```

- 91 points in all arrays for a 2.7 km link (~30m spacing, matching NED resolution)
- `z2` returned as 2.0 (not the documented 6.0)
- `txPower` = 47.0 and `rxPower` = -66.1 confirm dBm, not watts
- `rxPower` = `txPower` - `pathLoss` = 47.0 - 113.1 = -66.1 ✓

---

## NLCD land cover codes (common values in the response)

For reference when rendering terrain colors:

| Code | Description | Suggested color |
|------|-------------|-----------------|
| 11 | Open water | Blue |
| 21 | Developed, open space | Light gray |
| 22 | Developed, low intensity | Medium gray |
| 23 | Developed, medium intensity | Dark gray |
| 24 | Developed, high intensity | Black/dark |
| 31 | Barren land | Tan |
| 41 | Deciduous forest | Green |
| 42 | Evergreen forest | Dark green |
| 43 | Mixed forest | Medium green |
| 52 | Shrub/scrub | Olive |
| 71 | Grassland/herbaceous | Light green |
| 81 | Pasture/hay | Yellow-green |
| 82 | Cultivated crops | Brown |
| 90 | Woody wetlands | Teal |
| 95 | Emergent herbaceous wetlands | Cyan |

The DC test link returned mostly codes 22-24 (developed areas), which is expected for an urban link.
