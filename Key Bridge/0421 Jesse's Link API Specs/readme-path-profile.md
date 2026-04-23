# Path Profile REST Resource

![pathProfile](docs/pathProfile.png)

## Overview

The `PathProfileResource` is a Java servlet component implemented in an OSGi environment, designed to compute and return path loss profiles for radio frequency (RF) propagation between two geographic points (transmitter and receiver). It leverages terrain data from NED (National Elevation Dataset) and NLCD (National Land Cover Database) raster libraries, and uses propagation models such as ITM (Irregular Terrain Model) or P2001 for path loss calculations.

This resource is part of the KeyBridge OSGi SAS (Spectrum Access System) Pollock Imager service, running on Java 11 with javax EE imports. It provides RESTful access via HTTP GET requests to evaluate ground paths, elevations, land cover, and RF propagation characteristics.

## Usage Instructions

To use the PathProfileResource, send an HTTP GET request to the servlet's endpoint. The servlet expects query parameters specifying the transmitter and receiver coordinates in decimal degrees (latitude/longitude).

- **Endpoint**: `/rs/pollock/path`
- **Method**: GET
- **Content-Type**: The response is returned as JSON.
- **Authentication**: Ensure proper access controls are in place as per your OSGi service configuration.
- **Prerequisites**: The service must be activated with a valid terrain loss model (e.g., "ITM" or "P2001" via configuration properties).

### Example Request

Using curl to request a path profile between transmitter (40.7128, -74.0060) and receiver (40.7589, -73.9851) in New York City:
```bash
curl -X GET "http://localhost:8080/rs/pollock/path?x1=-74.0060&y1=40.7128&x2=-73.9851&y2=40.7589" \
     -H "Content-Type: application/json"
```
This request computes the path loss profile, including elevations, land cover, and propagation metrics, assuming default antenna heights and frequency.

## Query Parameters

The following table describes the required and optional query parameters for the GET request:

| Parameter | Type   | Description                                                                 | Required | Default |
|-----------|--------|-----------------------------------------------------------------------------|----------|---------|
| `x1`      | double | Longitude of the transmitter in decimal degrees (e.g., -74.0060).           | Yes     | 0.0    |
| `y1`      | double | Latitude of the transmitter in decimal degrees (e.g., 40.7128).             | Yes     | 0.0    |
| `z1`      | double | Heightt of the transmitter in meters above ground level (mAGL).             | No      | 18.0   |
| `x2`      | double | Longitude of the receiver in decimal degrees (e.g., -73.9851).              | Yes     | 0.0    |
| `y2`      | double | Latitude of the receiver in decimal degrees (e.g., 40.7589).                | Yes     | 0.0    |
| `z2`      | double | Heightt of the receiver in meters above ground level (mAGL).                | No      | 6.0    |

- **Notes**:
  - All coordinates must be non-zero and valid geographic points.
  - Invalid or missing coordinates result in a 400 Bad Request error.
  - The service uses equirectangular distance to determine the number of path points (up to 256, based on NED raster resolution of 30 meters).

## Response: PathlossProfile

The response is a JSON object representing the `PathlossProfile` data transfer object (DTO). This object encapsulates the computed path profile, including geographic coordinates, elevation data, land cover, and RF propagation metrics.

### Detailed Description

The `PathlossProfile` includes the following key components:

- **transmitter**: Coordinate object (longitude, latitude, elevation) of the transmitter.
- **receiver**: Coordinate object (longitude, latitude, elevation) of the receiver.
- **earthCurvature**: Array of double values representing earth curvature corrections at each path point (in meters).
- **elevationProfile**: Array of double values representing terrain elevation at each path point (in meters).
- **landCoverProfile**: Array of integer values indicating land cover type at each path point (based on NLCD data).
- **losProfile**: Array of double values representing line-of-sight (LOS) heights at each path point (in meters).
- **fresnelUpperProfile**: Array of double values for the upper Fresnel zone heights at each path point (in meters).
- **fresnelLowerProfile**: Array of double values for the lower Fresnel zone heights at each path point (in meters).
- **clearanceProfile**: Array of double values for clearance (LOS minus effective terrain) at each path point (in meters).
- **fresnelClearanceOk**: Array of integer values (0 or 1) indicating whether Fresnel clearance is adequate at each point.
- **pathSuitability**: String describing the overall path suitability based on Fresnel clearance (e.g., "Excellent", "Good", "Marginal", "Poor").
- **pathLoss**: Double value representing the calculated path loss in dB using the selected terrain model (ITM or P2001).
- **txPower**: Double value for the transmitter power (set to CBRS Category B max EIRP in watts).
- **rxPower**: Double value for the received power (txPower - pathLoss in watts).
- **distance**: Double value for the total path distance (in meters).
- **txBearing**: Double value for the bearing from transmitter to receiver (in degrees).
- **txElevationAngle**: Double value for the elevation angle from transmitter (in degrees).
- **rxBearing**: Double value for the bearing from receiver to transmitter (in degrees).
- **rxElevationAngle**: Double value for the elevation angle from receiver (in degrees).

Elevations are corrected and interpolated from NED data. Land cover is evaluated from NLCD. Path loss is computed with default antenna heights (Tx: 18m AGL, Rx: 2m AGL) and frequency (3600 MHz).

### JSON Schema

Below is a simplified JSON Schema (Draft 7) describing the structure of the `PathlossProfile` response. Note that this is based on inferred fields from the Java code; actual serialization may vary based on the JSON library used.
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "transmitter": {
      "type": "object",
      "properties": {
        "x": { "type": "number", "description": "Longitude in decimal degrees" },
        "y": { "type": "number", "description": "Latitude in decimal degrees" },
        "z": { "type": "number", "description": "Elevation in meters" }
      },
      "required": ["x", "y", "z"]
    },
    "receiver": {
      "type": "object",
      "properties": {
        "x": { "type": "number", "description": "Longitude in decimal degrees" },
        "y": { "type": "number", "description": "Latitude in decimal degrees" },
        "z": { "type": "number", "description": "Elevation in meters" }
      },
      "required": ["x", "y", "z"]
    },
    "earthCurvature": {
      "type": "array",
      "items": { "type": "number" },
      "description": "Array of earth curvature values in meters"
    },
    "elevationProfile": {
      "type": "array",
      "items": { "type": "number" },
      "description": "Array of elevation values in meters"
    },
    "landCoverProfile": {
      "type": "array",
      "items": { "type": "integer" },
      "description": "Array of land cover type values"
    },
    "losProfile": {
      "type": "array",
      "items": { "type": "number" },
      "description": "Array of LOS heights in meters"
    },
    "fresnelUpperProfile": {
      "type": "array",
      "items": { "type": "number" },
      "description": "Array of upper Fresnel heights in meters"
    },
    "fresnelLowerProfile": {
      "type": "array",
      "items": { "type": "number" },
      "description": "Array of lower Fresnel heights in meters"
    },
    "clearanceProfile": {
      "type": "array",
      "items": { "type": "number" },
      "description": "Array of clearance values in meters"
    },
    "fresnelClearanceOk": {
      "type": "array",
      "items": { "type": "integer", "enum": [0, 1] },
      "description": "Array of clearance status (1 for ok, 0 for not)"
    },
    "pathSuitability": {
      "type": "string",
      "description": "Descriptive string of path suitability"
    },
    "pathLoss": {
      "type": "number",
      "description": "Calculated path loss in dB"
    },
    "txPower": {
      "type": "number",
      "description": "Transmitter power in watts"
    },
    "rxPower": {
      "type": "number",
      "description": "Received power in watts"
    },
    "distance": {
      "type": "number",
      "description": "Total path distance in meters"
    },
    "txBearing": {
      "type": "number",
      "description": "Bearing from TX to RX in degrees"
    },
    "txElevationAngle": {
      "type": "number",
      "description": "Elevation angle from TX in degrees"
    },
    "rxBearing": {
      "type": "number",
      "description": "Bearing from RX to TX in degrees"
    },
    "rxElevationAngle": {
      "type": "number",
      "description": "Elevation angle from RX in degrees"
    }
  },
  "required": ["transmitter", "receiver", "pathLoss", "txPower", "rxPower", "distance"]
}
```

### Error Handling

- **400 Bad Request**: Invalid or missing query parameters (e.g., zero coordinates).
- **500 Internal Server Error**: Exceptions during terrain evaluation or path loss calculation (logged and returned as error message).

For more details on the underlying models or terrain data, refer to the KeyBridge GIS and Pathloss libraries documentation.