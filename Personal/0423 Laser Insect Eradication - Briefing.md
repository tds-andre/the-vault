---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: '2026-04-23'
type: briefing
updated_by: ''
updated_on: ''
---

*Session briefing 2026-04-23. Copy to main vault manually.*

## The Concept

Autonomous laser system to eradicate flies (and insects generally) from targeted areas — not environmental eradication, precision targeting in defined spaces. Three arrangements in increasing complexity:

1. **Fixed Station** — LiDAR + IR camera + galvanometer laser, fixed position, covers a radius. Personal use, terraces, dining areas.
2. **Distributed Mode** — stationary radar network detects targets, dispatches attack minicopter. The minicopter carries its own directional laser + onboard tracking — once locked, pursues and kills autonomously. No real-time comms needed after lock-on.
3. **Blackbat** — fully autonomous minicopter, detection + tracking + kill all onboard. TBD later.

---

## Prior Art

**Photon Matrix** (Indiegogo, 2025) — Chinese-designed, LiDAR-based fixed station, kills 30 mosquitoes/second, 6m range, detects target in 3ms. Limitation: max target speed ~1 m/s — houseflies (~2 m/s) are harder.

**Photonic Fence / Photonic Sentry** (Gates-backed) — acoustic wing-beat discrimination for species ID, 30m range demonstrated. Proof of concept solid.

**Counter-drone laser systems** (Aurelius, Locust X3) — same autonomy architecture scaled up for drones. The stack exists, not miniaturized for insects.

**Gap André could own:** mobile autonomous attack unit (Distributed Mode) for insects. Does not exist.

---

## Prototype Spec — Fixed Station, 120° cone

### Scope
Single unit, fixed installation, 120° horizontal cone. No rotation. Personal prototype for André's use. Target rule: **small + flying = kill.** No species discrimination in v1 — size threshold only (no bees because they're larger and slower, not because of acoustic ID).

### Sensor concepts

**Camera (IR or visible) — passive**
Captures photons already in the scene. High spatial resolution, no direct distance measurement, needs contrast against background. Like your eye.

**LiDAR — active, light-based**
Emits laser pulses, measures time-of-return for 3D XYZ position. Works in dark, gives depth directly, lower "image" resolution than camera.

**RADAR — active, radio-based**
Same principle as LiDAR but with radio waves. Longer range, penetrates obstacles, too low resolution for insect-scale targets at short range. Not suitable here.

---

## Architecture A — LiDAR + IR Camera (original)

**Sensor pairing:** LiDAR for 3D detection/localization + IR camera for high-speed tracking. Complementary — LiDAR gives depth camera can't, camera gives resolution LiDAR can't.

**Key insight on distance:** Distance is NOT needed for the kill. A laser points at an angle and hits whatever is there regardless of range. Distance only affects beam spot size (divergence) and power density. For a bounded personal space neither matters much.

So LiDAR's role here is: detection layer + size discrimination + optional safety cutoff. Camera does the actual targeting.

### Pipeline
```
LiDAR (solid-state, 120° FOV, continuous sweep)
  → detects moving object, estimates XYZ, flags size
IR camera (fixed, wide-angle, 1000fps)
  → receives XYZ hint from LiDAR
  → locks onto target in frame
  → blob tracking + Kalman filter
  → predicted intercept angle computed
Galvanometer mirror (only moving part)
  → steers kill laser to intercept angle
  → fires
Target latency: < 5ms
```

### Cost estimate
| Component | Low | High |
|---|---|---|
| Solid-state LiDAR (~120° FOV) | $200 | $500 |
| IR camera (1000fps, 320×240) | $300 | $800 |
| Galvanometer + driver | $150 | $400 |
| Kill laser diode + driver | $50 | $150 |
| Processing (Jetson Nano) | $100 | $250 |
| Optics, mount, misc | $100 | $200 |
| **Total** | **~$900** | **~$2,300** |

---

## Architecture B — Camera Only (simplified, recommended for prototype)

**Key insight:** LiDAR not strictly needed. Camera alone gives XY angle, galvanometer points there, laser fires. No distance required for a bounded personal space.

### Pipeline
```
IR camera (fixed, wide-angle, 1000fps, 120° FOV)
  → continuous blob detection across full frame
  → moving object detected by size threshold
  → target locked, trajectory tracked via Kalman filter
  → predicted intercept angle (XY only)
Galvanometer mirror
  → steers laser to intercept angle
  → fires
```

### What you lose without LiDAR
- No direct 3D size measurement (mitigated by calibrating pixel size at expected range)
- No distance-based safety cutoff (mitigated by operating in known bounded space)
- Slightly slower initial detection (camera scans full frame vs LiDAR flagging a candidate)

### Cost estimate
| Component | Low | High |
|---|---|---|
| IR camera (1000fps, 320×240) | $300 | $800 |
| Galvanometer + driver | $150 | $400 |
| Kill laser diode + driver | $50 | $150 |
| Processing (Jetson/RPi) | $100 | $250 |
| Optics, mount, misc | $100 | $200 |
| **Total** | **~$700** | **~$1,800** |

Saves ~$200-500 vs Architecture A. **Recommended for prototype.**

---

## Key Physics / Specs

**Frame rate derivation:**
- Target speed: 2 m/s
- Acceptable tracking error: ~5mm (half body width of fly)
- Required frame rate: 2 m/s ÷ 0.005m = 400fps minimum
- Practical target: **1000fps** (2mm displacement/frame, sufficient for Kalman filter)

**Data rate at 1000fps:**
- Resolution: 320×240 (sufficient — insect is ~1cm at 2-3m range)
- Raw: 320 × 240 × 1 byte × 1000 = ~75 MB/s
- In practice: on-chip blob detection collapses this to bytes/second (x, y, radius, timestamp per event). Heavy lifting in silicon, not CPU.

**Kill laser:** ~100-500mW diode. Sufficient for insects, not dangerous to humans at operating distances.

**Galvanometer mirror:** only moving part. Microsecond response. What makes real-time interception possible.

---

## Scaling Roadmap

**Prototype** → 1 unit, 120° cone, personal use (~$700-2,300)

**Phase 2 — Full 360°** → 3 units at 120° intervals, one central processor, 3 galvanometers. Full coverage, no rotation, redundant.

**Phase 3 — Product version** → Add rotation to reduce unit count. 1 rotating LiDAR + 1 omnidirectional fisheye IR camera + rotating galvanometer platform. Cheaper per unit, better industrial design. Follows same cost curve as commercial LiDAR evolution.

---

## Commercial Application — Cattle / Farm (Distributed Mode)

Flies cause **$3-5B/year** in losses to US cattle alone: stress, weight loss, reduced milk production, disease transmission. Conventional solutions are chemical, labor-intensive, increasingly resisted.

**Distributed Mode maps perfectly to farms:**
- Fence posts: radar nodes every 20-30m, mesh network, detect fly signatures (housefly ~200-220Hz wing beat)
- Charging station: minicopter docks and auto-recharges
- Coverage: ~1 minicopter per hectare
- After lock-on: minicopter is fully autonomous, no real-time comms needed
- Zero chemicals, no residue on animals, strong appeal to organic/premium producers

**Why cattle is a better MVP than residential:**
- Defined area (paddock/barn) — easier coverage design
- High willingness to pay (farmers quantify losses directly in dollars)
- Permissive regulatory environment for livestock pest control
- Scale justifies hardware cost

---

## Next Steps (for thread on main vault)
- [ ] BOM for fixed station prototype (Architecture B — camera only)
- [ ] Source high-speed IR camera options (Basler, FLIR, Sony IMX)
- [ ] Source galvanometer options (Sino-Galvo type, common in laser engravers)
- [ ] Source kill laser diode
- [ ] Design mount and enclosure
- [ ] Elaborate Blackbat concept in future session
