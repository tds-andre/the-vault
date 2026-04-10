# From OpenStreetMap to Ray-Traced Radio Coverage in Python

  

**André Teixeira dos Santos** — Electronics Engineer, Key Bridge Wireless

  

---

  

## Executive Summary

  

With a pair of coordinates and a handful of open-source Python libraries, you can generate a physically accurate radio coverage map for any urban area in the world — rendered on an interactive web map, in under 10 seconds. This tutorial walks through the complete pipeline: pulling real 3D building geometry from OpenStreetMap, constructing a ray-tracing scene, simulating radio propagation with NVIDIA's Sionna RT, and overlaying the result on a MapLibre map. No commercial software, no proprietary data.

  

---

  

## The Final Result

  

Before getting into the how, here's the what. The image below shows a 3.6 GHz transmitter placed on a rooftop in downtown Los Angeles. The coverage pattern — computed through full ray tracing including reflections, diffraction, and refraction off real building geometry — is overlaid on a dark basemap.

  

![Coverage map overlay](output/coverage.png)

  

Open `output/map.html` in any browser for the interactive version. The warm colors (yellow/orange) indicate strong signal near the transmitter; dark purple marks areas where buildings block or attenuate the signal. The transparency fades toward the edges of the computed area, blending naturally into the basemap.

  

This isn't a simple distance-based gradient. The irregular shape of the coverage is entirely driven by the actual geometry of the buildings in this neighborhood — every shadow, every corridor of signal propagation between buildings, comes from the ray tracer interacting with real 3D structures.

  

---

  

## The Pipeline at a Glance

  

The process has five stages, each handled by a short Python script:

  

1. **Fetch** — download building footprints from OpenStreetMap for a given location and radius

2. **Build** — extrude those footprints into 3D geometry and package them into a ray-tracing scene

3. **Trace** — run NVIDIA Sionna's radio propagation solver over the scene

4. **Render** — turn the raw path-loss grid into a colorized, transparent PNG

5. **Overlay** — place the geo-referenced image on an interactive web map

  

Each step feeds into the next through simple files on disk (GeoJSON → Mitsuba XML → numpy array → PNG → HTML), so you can re-run any individual stage without redoing the whole pipeline.

  

---

  

## Step 1: Real Buildings from Open Data

  

The foundation of realistic radio propagation is realistic geometry. Fortunately, OpenStreetMap has remarkably detailed building coverage for most urban areas worldwide, including footprint polygons and — crucially — a `building:levels` tag that tells us how many stories each building has.

  

Using the [osmnx](https://osmnx.readthedocs.io/) library, we define a circular area of interest (200 meters radius for this tutorial), pull all buildings that fall inside it, and project everything from geographic coordinates (latitude/longitude) into a metric coordinate system (UTM) so we can work in meters. Building heights are derived from the levels tag at 3.5 meters per floor, defaulting to one story where the tag is missing.

  

For our downtown LA test area, this yields about 20 building polygons ranging from single-story retail to multi-story office buildings — enough to produce interesting radio propagation effects.

  

> **Why metric projection matters:** Ray tracing and mesh operations need to work in consistent linear units. Geographic coordinates (degrees) distort distances depending on latitude, which would produce warped geometry. We project to EPSG:26915 (UTM Zone 15N) so that one unit in our scene equals one meter.

  

---

  

## Step 2: From Footprints to a 3D Scene

  

A building footprint on its own is just a 2D polygon. To model radio propagation, we need to give those polygons physical height — walls that rays can bounce off of, rooftops that signals can diffract around.

  

The construction process for each building:

  

1. Take the 2D footprint polygon (already in meters)

2. Centre it at the scene origin (Sionna expects the transmitter near (0,0))

3. Triangulate the base with a Delaunay mesh

4. Extrude vertically to the computed building height, capping the top

  

We use [PyVista](https://pyvista.org/) for the mesh operations and [Open3D](http://www.open3d.org/) for a cleanup pass that ensures proper vertex normals (important for Sionna's ray-surface interactions).

  

The full scene is saved as a Mitsuba XML file — the format that Sionna RT reads natively. Each mesh gets an ITU material classification (concrete for the ground and roads, marble for buildings) which governs how radio waves interact with the surface: reflection coefficients, diffraction behavior, and penetration loss.

  

The result is a complete 3D urban canyon in a format ready for electromagnetic simulation, constructed entirely from public data.

  

---

  

## Step 3: Ray Tracing with Sionna RT

  

[Sionna RT](https://nvlabs.github.io/sionna/) is NVIDIA's open-source, differentiable radio propagation library. Unlike empirical models (like Hata or COST-231) which estimate path loss from statistical curves, Sionna shoots actual rays through the 3D scene and computes propagation physics:

  

- **Line-of-sight** — direct path from transmitter to each point

- **Specular reflection** — rays bouncing off flat building surfaces (like a mirror)

- **Diffuse reflection** — scattered energy from rough surfaces

- **Diffraction** — signals bending around building edges and rooftops

- **Refraction** — signals passing through walls with attenuation

  

We place a transmitter at the scene center, 30 meters above ground (typical rooftop installation), configured as an 8×8 antenna panel at 3.625 GHz — standard CBRS band parameters. The solver then fires 100,000 rays (low-resolution for this tutorial; production runs use 10 million+) and tallies the received power at each cell in a 10×10 meter grid.

  

The output is a 2D numpy array of path gain values — essentially a heat map of how much signal reaches each point in the scene.

  

> **GPU vs. CPU:** Sionna is built on TensorFlow and benefits enormously from GPU acceleration. On an NVIDIA GTX 1660, the 200 m scene computes in about 2 seconds. Without a GPU, expect 10-30x longer — still workable for a tutorial, but you'd want a GPU for larger scenes.

  

> **A note on Python versions:** The scripts in this tutorial include both a Sionna RT path (for Python 3.10+ environments where sionna-rt installs cleanly) and a synthetic fallback that generates a plausible coverage pattern using free-space path loss with log-normal shadow fading. The fallback lets you run the full pipeline and see the visualization workflow even without a working Sionna installation.

  

---

  

## Step 4: From Numbers to a Coverage Image

  

The raw path-gain array is just a grid of floating-point numbers. To turn it into something visually useful, we need to:

  

1. **Smooth** — apply a Gaussian blur (σ=1.5) to reduce pixelation from the coarse 10 m grid

2. **Convert to dB** — radio engineers think in decibels, and the logarithmic scale compresses the enormous dynamic range of radio signals into a manageable visual range

3. **Colorize** — map the dB values through a perceptual colormap (`inferno` works well: dark purple for weak signal through red/orange to yellow for strong)

4. **Apply transparency** — two layers of alpha blending make the overlay work on a map:

   - **Signal-strength alpha:** weak signals become transparent, so the basemap shows through where there's no meaningful coverage

   - **Radial vignette:** a smooth fade-out toward the edges of the scene, so the coverage doesn't end in a harsh rectangular cutoff

  

The result is an RGBA PNG where strong coverage is bold and opaque, weak coverage is translucent, and areas beyond the simulation boundary are fully transparent.

  

This rendering step is separated from the ray tracing intentionally — you can re-render with different colormaps, opacity curves, or display ranges without re-running the expensive simulation.

  

---

  

## Step 5: Putting It on the Map

  

The final step ties everything together. We take the coverage PNG and overlay it on a [MapLibre GL JS](https://maplibre.org/) web map using the `image` source type. MapLibre needs four corner coordinates (the geographic bounding box of the scene) to position the image correctly on the map — we saved these during the OSM fetch step.

  

The generated `map.html` file is entirely self-contained: the coverage image is embedded as a base64 data URI, MapLibre loads from CDN, and the basemap tiles come from CARTO. Open the file in any browser and you get an interactive map with zoom, pan, and an opacity slider.

  

Using a dark basemap (CARTO Dark Matter) makes the warm-colored coverage overlay stand out clearly. A small marker indicates the transmitter position, and clicking it shows the simulation parameters.

  

---

  

## Running It Yourself

  

The full pipeline runs from a single command:

  

```bash

python run_all.py

```

  

On a machine with a compatible GPU, the entire process — from OSM download to final HTML — completes in under 10 seconds. Without a GPU, expect about a minute (the ray tracing step dominates).

  

The outputs land in `output/`:

- `coverage.png` — the rendered coverage image

- `map.html` — the interactive map (just open in a browser)

- `path_gain.npy` — the raw simulation data (for further analysis)

- `scene/` — the Mitsuba scene files (for re-running with different parameters)

  

---

  

## Where to Go from Here

  

This tutorial uses deliberately conservative settings to keep things fast. With more compute, you can push significantly further:

  

**Higher resolution.** Drop the cell size to 2-5 meters and increase ray count to 10⁷. The coverage map becomes sharp enough to see individual building shadows and signal corridors between streets.

  

**Larger scenes.** Extend the radius to 1-2 km to cover an entire neighborhood. At 500 m radius, you start to see really interesting multi-path effects where signals bounce through urban canyons.

  

**Different frequencies.** Swap the frequency to 28 GHz (millimeter wave) and watch how dramatically the propagation changes — mmWave barely diffracts around building corners, creating deep shadow zones that don't exist at 3.6 GHz.

  

**Multiple transmitters.** Add a second transmitter to model interference, handoff boundaries, or simply see how two base stations complement each other's coverage.

  

**Integration with planning tools.** The path-gain array is just a numpy matrix — feed it into a link-budget model to draw coverage contours at specific signal thresholds, or use it to evaluate candidate tower placements.

  

The full source code is available in the `scripts/` directory. Each script is standalone and well-commented.

  

---

  

## Links

  

- [Sionna RT](https://nvlabs.github.io/sionna/) — NVIDIA's differentiable radio propagation simulator

- [osmnx](https://osmnx.readthedocs.io/) — Python library for OpenStreetMap data

- [MapLibre GL JS](https://maplibre.org/) — open-source web map rendering

- [PyVista](https://pyvista.org/) — 3D mesh manipulation

- [Mitsuba 3](https://mitsuba-renderer.org/) — physically-based renderer (Sionna's backend)

  

---

  

*André Teixeira dos Santos — Electronics Engineer, Key Bridge Wireless*