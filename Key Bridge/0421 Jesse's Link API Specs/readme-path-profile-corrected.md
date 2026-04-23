---
created_by: Kaybee
created_on: '2026-04-21'
type: spec
updated_by: ''
updated_on: ''
---


# Path Profile REST Resource

![pathProfile](docs/pathProfile.png)

## Overview

The `PathProfileResource` computes and returns path loss profiles for RF propagation between two geographic points (transmitter and receiver). It uses terrain data from NED (National Elevation Dataset) and NLCD (National Land Cover Database), and the ITM (Irregular Terrain Model) for path loss calculations.

This resource is part of the KeyBridge SAS Pollock Imager service.

## Endpoint

- **URL**: `/rs/pollock/path`
- **Method**: GET
- **Content-Type**: `application/json`

### Example Request

```bash
curl -X GET "http://a1.mcl.keybridge.ch:9090/rs/pollock/path?x1=-77.0369&y1=38.9072&x2=-77.01&y2=38.92"
```

## Query Parameters

**Coordinate convention: x = longitude, y = latitude.**

| Parameter | Type   | Required | Default | Description |
|-----------|--------|----------|---------|-------------|
| `x1`      | double | Yes      | —       | Tx **longitude** (decimal degrees) |
| `y1`      | double | Yes      | —       | Tx **latitude** (decimal degrees) |
| `z1`      | double | No       | 18.0    | Tx antenna height AGL (meters) |
| `x2`      | double | Yes      | —       | Rx **longitude** (decimal degrees) |
| `y2`      | double | Yes      | —       | Rx **latitude** (decimal degrees) |
| `z2`      | double | No       | 2.0     | Rx antenna height AGL (meters) |

- All coordinates must be non-zero and valid geographic points.
- Invalid or missing coordinates result in a 400 Bad Request error.
- The number of profile sample points is determined by the path length and NED raster resolution (30 meters), up to a maximum of 256 points.
- Frequency is fixed at 3600 MHz (not configurable).

## Response

### Fields

| Field | Type | Unit | Description |
|-------|------|------|-------------|
| `transmitter` | object | — | `{x: longitude, y: latitude, z: height_m}` — echo of Tx position |
| `receiver` | object | — | `{x: longitude, y: latitude, z: height_m}` — echo of Rx position |
| `earthCurvature` | float[] | meters | Earth curvature correction at each sample point. **Sum with `elevationProfile` for corrected terrain display.** |
| `elevationProfile` | float[] | meters | Raw terrain elevation (NED) at each sample point |
| `landCoverProfile` | int[] | NLCD code | Land cover classification at each sample point (see NLCD codes below) |
| `losProfile` | float[] | meters | Line-of-sight height at each sample point |
| `fresnelUpperProfile` | float[] | meters | Upper boundary of 1st Fresnel zone at each sample point |
| `fresnelLowerProfile` | float[] | meters | Lower boundary of 1st Fresnel zone at each sample point |
| `clearanceProfile` | float[] | meters | Vertical clearance (LOS minus effective terrain) at each sample point |
| `fresnelClearanceOk` | int[] | 0 or 1 | Per-point Fresnel clearance flag: **1** = adequate clearance, **0** = Fresnel zone obstructed by terrain |
| `pathSuitability` | string | — | Overall path quality assessment: "Excellent", "Good", "Marginal", or "Poor" with detail |
| `pathLoss` | float | dB | Calculated path loss using the ITM propagation model |
| `txPower` | float | dBm | Transmitter EIRP (Cat B max = 47 dBm) |
| `rxPower` | float | dBm | Estimated received power: `txPower - pathLoss` (assumes 0 dBi antennas) |
| `distance` | float | meters | Total great-circle path distance |
| `txBearing` | float | degrees | Compass bearing from Tx toward Rx |
| `txElevationAngle` | float | degrees | Elevation angle from Tx toward Rx |
| `rxBearing` | float | degrees | Compass bearing from Rx toward Tx |
| `rxElevationAngle` | float | degrees | Elevation angle from Rx toward Tx |

### Notes

- All profile arrays share the same length (number of sample points along the path).
- No distances array is provided. Compute sample distances as: `distances[i] = i × (distance / (num_points - 1))`.
- **Terrain display:** Plot corrected elevation as `elevationProfile[i] + earthCurvature[i]`.
- **LOS coloring:** Use `fresnelClearanceOk` to color the LOS line — green where 1, red where 0.
- **Land cover coloring:** Use `landCoverProfile` values to color-fill the terrain area by land type.
- Link budget assumes Cat B CBSD at 47 dBm EIRP with 0 dBi antennas at both ends.

### Example Response

```json
{
  "transmitter": { "x": -77.0369, "y": 38.9072, "z": 18.0 },
  "receiver": { "x": -77.01, "y": 38.92, "z": 2.0 },
  "earthCurvature": [0.0, 0.0, 0.0, ...],
  "elevationProfile": [22.0, 22.7, 22.3, 23.4, ...],
  "landCoverProfile": [23, 22, 23, 24, ...],
  "losProfile": [40.0, 40.1, 40.1, ...],
  "fresnelUpperProfile": [40.0, 41.6, 42.3, ...],
  "fresnelLowerProfile": [40.0, 38.5, 37.9, ...],
  "clearanceProfile": [18.0, 17.4, 17.8, ...],
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

This example is a ~2.7 km link in the DC metro area, yielding 91 sample points (~30m spacing). All Fresnel clearance points pass (excellent path).

### Error Handling

| HTTP Code | Meaning |
|-----------|---------|
| 400 | Invalid or missing coordinates (e.g., zero values) |
| 500 | Server error during terrain evaluation or path loss calculation |

---

## Appendix: NLCD Land Cover Codes

Common values returned in `landCoverProfile`:

| Code | Description | Suggested color |
|------|-------------|-----------------|
| 11 | Open water | Blue |
| 21 | Developed, open space | Light gray |
| 22 | Developed, low intensity | Medium gray |
| 23 | Developed, medium intensity | Dark gray |
| 24 | Developed, high intensity | Charcoal |
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
