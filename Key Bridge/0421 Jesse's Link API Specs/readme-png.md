# Pollock PNG Image Generator REST Resource

![image-generator](docs/examples/image-generator.png)

This document provides instructions for using the `rs/pollock/png` REST resource to generate PNG raster images of Pollock evaluations.

## Endpoint

- **URL**: `/rs/pollock/png`
- **Method**: GET
- **Content-Type**: `image/png`

## Description

The `rs/pollock/png` endpoint generates a PNG image representing a Pollock raster evaluation for a specified transmitter position and configuration. The image visualizes the evaluation results in a raster format.

## Usage

To use the endpoint, send a GET request to the base URL with the required and optional query parameters.

### Example Request

```
GET /rs/pollock/png?x=-122.4194&y=37.7749&z=10&cat=B&size=M
```

This example generates a medium-sized (512x512) PNG image for a Category B transmitter at longitude -122.4194, latitude 37.7749, with an antenna height of 10 meters.

## Query Parameters

The following table lists all supported query parameters:

| Parameter | Type    | Required | Default | Description |
|-----------|---------|----------|---------|-------------|
| **x**         | double  | **Yes**      | `0`       | The longitude of the transmitter position in decimal degrees. Must be non-zero. |
| **y**         | double  | **Yes**      | `0`       | The latitude of the transmitter position in decimal degrees. Must be non-zero. |
| **z**         | double  | No       | `0`       | The antenna height above ground in meters. If not provided or less than the category's nominal height, the category's nominal height is used. |
| **cat**       | string  | No       | `B`       | The CBSD category type. Valid values are those defined by `CbsdCategoryType` (e.g., A, B). Determines antenna gain, height, and EIRP defaults. |
| **size**      | string  | No       | `S`       | The size of the generated image. Valid values: S (256x256), M (512x512), L (1024x1024). Case-insensitive. |

## Response

- **Success (200 OK)**: Returns a PNG image with the specified content type. The image size in bytes is set in the `Content-Length` header.
- **Error (400 Bad Request)**: If the position parameters `x` or `y` are zero or invalid.
- **Error (500 Internal Server Error)**: If an exception occurs during evaluation or image generation.

## Cache Control

The response includes `Cache-Control: no-cache, no-store, must-revalidate` to prevent caching of the generated images.

## Notes

- The transmitter is constructed with default values for CBSD ID, channel type, frequency range, etc., based on the category.
- Antenna gain, height, and EIRP are set according to the CBSD category type.
- The Pollock service evaluates the raster based on the transmitter configuration.
- The image is generated from the evaluated raster and written as a PNG.