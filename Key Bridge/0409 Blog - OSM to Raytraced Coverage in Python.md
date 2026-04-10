# From OpenStreetMap to Ray-Traced Radio Coverage in Python

*André Teixeira dos Santos — Electronics Engineer, Key Bridge Wireless*

---

## Introduction

With a pair of coordinates and a handful of open-source Python libraries, you can generate a physically accurate radio coverage map for any urban area in the world — rendered on an interactive web map, in under 10 seconds of compute time.

This tutorial walks through the complete pipeline: pulling real 3D building geometry from OpenStreetMap, constructing a ray-tracing scene, simulating radio propagation with NVIDIA's Sionna RT, and overlaying the result on a web map. No commercial software, no proprietary data.

The image below shows the end result — a 3.6 GHz transmitter placed on a rooftop in downtown Los Angeles. The coverage pattern, computed through full ray tracing with reflections, diffraction, and refraction off real building geometry, is overlaid on a dark basemap. The warm colors indicate strong signal near the transmitter; dark areas mark where buildings block or attenuate the signal. This isn't a simple distance-based gradient — every shadow and corridor of propagation comes from rays interacting with the actual 3D geometry of this neighborhood.

![[coverage-raytrace-la.png]]

*Interactive version: open the attached [[coverage-raytrace-la-map.html]] in a browser to zoom, pan, and adjust opacity.*

---

## The Pipeline

The process has five stages, each handled by a short Python script:

1. **Fetch** — download building footprints from OpenStreetMap for a given location and radius
2. **Build** — extrude those footprints into 3D geometry and package them into a ray-tracing scene
3. **Trace** — run NVIDIA Sionna's radio propagation solver over the scene
4. **Render** — turn the raw path-loss grid into a colorized, transparent PNG
5. **Overlay** — place the geo-referenced image on an interactive web map

Each step feeds into the next through simple files on disk — GeoJSON, Mitsuba XML, numpy array, PNG, HTML — so you can re-run any individual stage without redoing the whole pipeline.

---

## Step 1: Real Buildings from Open Data

The foundation of realistic radio propagation is realistic geometry. Fortunately, OpenStreetMap has remarkably detailed building coverage for most urban areas worldwide, including footprint polygons and — crucially — a `building:levels` tag that tells us how many stories each building has.

Using the [osmnx](https://osmnx.readthedocs.io/) library, we define a circular area of interest (200 meters radius for this tutorial), pull all buildings that fall inside it, and project everything from geographic coordinates (latitude/longitude) into a metric coordinate system (UTM) so we can work in meters. Building heights are derived from the levels tag at 3.5 meters per floor, defaulting to one story where the tag is missing.

For our downtown LA test area, this yields about 20 building polygons ranging from single-story retail to multi-story office buildings — enough to produce interesting radio propagation effects.

A note on why metric projection matters: ray tracing and mesh operations need to work in consistent linear units. Geographic coordinates (degrees) distort distances depending on latitude, which would produce warped geometry. Projecting to UTM ensures one unit in our scene equals one meter.

---

## Step 2: From Footprints to a 3D Scene

A building footprint on its own is just a 2D polygon. To model radio propagation, we need to give those polygons physical height — walls that rays can bounce off of, rooftops that signals can diffract around.

For each building, we take the 2D footprint (already in meters), centre it at the scene origin, triangulate the base with a Delaunay mesh, and extrude it vertically to the computed height. We use [PyVista](https://pyvista.org/) for the mesh operations and [Open3D](http://www.open3d.org/) for a cleanup pass that ensures proper vertex normals, which are important for how Sionna computes ray-surface interactions.

The full scene is saved as a Mitsuba XML file — the format that Sionna RT reads natively. Each mesh gets an ITU material classification (concrete for the ground and roads, marble for buildings) which governs how radio waves interact with the surface: reflection coefficients, diffraction behavior, and penetration loss.

The result is a complete 3D urban canyon in a format ready for electromagnetic simulation, constructed entirely from public data.

---

## Step 3: Ray Tracing with Sionna RT

[Sionna RT](https://nvlabs.github.io/sionna/) is NVIDIA's open-source radio propagation library. Unlike empirical models (like Hata or COST-231) which estimate path loss from statistical curves, Sionna shoots actual rays through the 3D scene and computes the physics:

- **Line-of-sight** — the direct path from transmitter to each point
- **Specular reflection** — rays bouncing off flat building surfaces
- **Diffuse reflection** — scattered energy from rough surfaces
- **Diffraction** — signals bending around building edges and rooftops
- **Refraction** — signals passing through walls with attenuation

We place a transmitter at the scene center, 30 meters above ground (a typical rooftop installation), configured as an 8×8 antenna panel at 3.625 GHz — standard CBRS band parameters. The solver fires 100,000 rays (low-resolution for this tutorial; production runs use 10 million or more) and tallies the received power at each cell in a 10×10 meter grid.

The output is a 2D numpy array of path gain values — essentially a heat map of how much signal reaches each point in the scene. On an NVIDIA GTX 1660, the 200-meter scene computes in about 2 seconds. Without a GPU, expect 10-30x longer — still workable for a tutorial, but you'd want GPU acceleration for larger scenes.

---

## Step 4: From Numbers to a Coverage Image

The raw path-gain array is a grid of floating-point numbers. To turn it into something visually useful, we apply four transformations:

**Smoothing.** A Gaussian blur (σ=1.5) reduces pixelation from the coarse 10-meter grid.

**Conversion to decibels.** Radio engineers think in dB, and the logarithmic scale compresses the enormous dynamic range of radio signals into a manageable visual range.

**Colorization.** We map the dB values through a perceptual colormap. The `inferno` palette works well here: dark purple for weak signal, through red and orange, to yellow for the strongest areas near the transmitter.

**Transparency.** Two layers of alpha blending make the overlay work on a map. First, signal-strength transparency: weak signals become transparent so the basemap shows through where there's no meaningful coverage. Second, a radial vignette that smoothly fades out toward the edges of the scene, so the coverage doesn't end in a harsh rectangular cutoff.

The result is an RGBA PNG where strong coverage is bold and opaque, weak coverage is translucent, and areas beyond the simulation boundary are fully transparent. This rendering step is intentionally separated from the ray tracing — you can re-render with different colormaps, opacity curves, or display ranges without re-running the expensive simulation.

---

## Step 5: Putting It on the Map

The final step ties everything together. We take the coverage PNG and overlay it on a [MapLibre GL JS](https://maplibre.org/) web map using the `image` source type. MapLibre needs four corner coordinates — the geographic bounding box of the scene — to position the image correctly on the map. These were saved during the OSM fetch step.

The generated HTML file is entirely self-contained: the coverage image is embedded as a base64 data URI, MapLibre loads from CDN, and the basemap tiles come from CARTO. Open it in any browser and you get an interactive map with zoom, pan, and an opacity slider. Using a dark basemap (CARTO Dark Matter) makes the warm-colored coverage overlay stand out.

---

## What's Next

This tutorial uses deliberately conservative settings to keep things fast. With more compute, you can push significantly further.

**Higher resolution.** Drop the cell size to 2–5 meters and increase the ray count to 10 million. The coverage map becomes sharp enough to see individual building shadows and signal corridors between streets.

**Larger scenes.** Extend the radius to 1–2 km to cover an entire neighborhood. At 500 meters, you start to see interesting multi-path effects where signals bounce through urban canyons.

**Different frequencies.** Swap to 28 GHz (millimeter wave) and watch how dramatically the propagation changes — mmWave barely diffracts around building corners, creating deep shadow zones that don't exist at 3.6 GHz.

**Multiple transmitters.** Add a second transmitter to model interference, handoff boundaries, or see how two base stations complement each other's coverage.

**Integration with planning tools.** The path-gain array is just a numpy matrix — feed it into a link-budget model to draw coverage contours at specific signal thresholds, or use it to evaluate candidate tower placements.

---

## Code Reference

The complete pipeline consists of five scripts, each standalone and runnable individually. Below are the key excerpts. The full source is available in the `scripts/` directory.

### Fetching OSM buildings

```python
import osmnx as ox
import pyproj
from shapely.geometry import Polygon

CENTER_LAT, CENTER_LON = 34.0499, -118.2614
RADIUS_M = 200

# Build a circular area of interest in metric coordinates
fwd = pyproj.Transformer.from_crs("EPSG:4326", "EPSG:26915", always_xy=False)
inv = pyproj.Transformer.from_crs("EPSG:26915", "EPSG:4326", always_xy=False)
cx, cy = fwd.transform(CENTER_LAT, CENTER_LON)

pts = [(cx + RADIUS_M * math.cos(2*math.pi*i/64),
        cy + RADIUS_M * math.sin(2*math.pi*i/64)) for i in range(64)]
lats, lons = inv.transform(*zip(*pts))
poly = Polygon(zip(lons, lats))

# Fetch buildings
buildings = ox.features.features_from_polygon(poly, tags={"building": True})
```

### Extruding a building to 3D

```python
import pyvista as pv

levels = float(row.get("building:levels") or 1)
height = int(levels) * 3.5  # 3.5 m per floor

footprint = polygon_to_pv(geom, z=0.0).delaunay_2d().triangulate()
solid = footprint.extrude((0, 0, height), capping=True)
```

### Running Sionna RT

```python
import sionna.rt as srt

scene = srt.load_scene("output/scene/mitsuba.xml")
scene.frequency = 3.625e9

scene.tx_array = srt.PlanarArray(num_rows=8, num_cols=8,
    horizontal_spacing=0.5, vertical_spacing=0.5,
    pattern="iso", polarization="VH")

scene.add(srt.Transmitter(name="gNB", position=[0, 0, 30]))

solver = srt.RadioMapSolver()
rm = solver(scene=scene, samples_per_tx=int(1e5),
    max_depth=5, cell_size=(10, 10),
    los=True, specular_reflection=True,
    diffuse_reflection=True, diffraction=True,
    refraction=True, edge_diffraction=True, seed=0)

path_gain = np.array(rm.path_gain[0])
```

### Rendering the coverage PNG

```python
from scipy.ndimage import gaussian_filter
import matplotlib.pyplot as plt
from PIL import Image

arr = gaussian_filter(path_gain, sigma=1.5)
arr_db = 10 * np.log10(np.where(arr > 0, arr, 1e-20))

norm = np.clip((arr_db - (-140)) / ((-60) - (-140)), 0, 1)
rgba = plt.get_cmap("inferno")(norm)
rgba[..., 3] = np.clip((arr_db + 140) / 80, 0, 1)  # signal alpha

img = Image.fromarray((rgba * 255).astype(np.uint8), "RGBA")
img.save("output/coverage.png")
```

### Overlaying on MapLibre

```javascript
map.addSource("coverage", {
  type: "image",
  url: coverageDataUri,
  coordinates: [
    [min_lon, max_lat], [max_lon, max_lat],
    [max_lon, min_lat], [min_lon, min_lat]
  ]
});
map.addLayer({
  id: "coverage-layer", type: "raster",
  source: "coverage",
  paint: { "raster-opacity": 0.8 }
});
```

### Running the full pipeline

```bash
C:\Users\tdsnit\winlinks\python38d -m venv .venv
.venv\Scripts\pip install tensorflow==2.9.1 numpy==1.24.3 sionna-rt osmnx \
    open3d pyvista matplotlib pillow tqdm meshio pyproj shapely geopandas scipy

python run_all.py
```

---

## Links

- [Sionna RT](https://nvlabs.github.io/sionna/) — NVIDIA's differentiable radio propagation simulator
- [osmnx](https://osmnx.readthedocs.io/) — Python library for OpenStreetMap data
- [MapLibre GL JS](https://maplibre.org/) — open-source web map rendering
- [PyVista](https://pyvista.org/) — 3D mesh manipulation
- [Mitsuba 3](https://mitsuba-renderer.org/) — physically-based renderer (Sionna's backend)

---

*André Teixeira dos Santos — Electronics Engineer, Key Bridge Wireless*
