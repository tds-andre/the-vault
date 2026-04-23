---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: '2026-04-23'
domain: building
status: active
type: thread
updated_by: Gaia claude-sonnet-4-6 v2.0
updated_on: '2026-04-23'
---

next: research existing technology + define MVP for fixed station prototype

## Context
André's life mission: eradicate flies (and potentially all insects) from targeted areas using autonomous laser systems. Not environmental eradication — precision targeting in defined spaces.

## Three arrangements

### 1. Fixed Station
Radar + laser in a single fixed unit. Covers a radius around itself.
- Best for: enclosed/semi-enclosed areas (terrace, dining area, campsite)
- Simplest, most viable today
- Prior art: Photonic Fence (Intellectual Ventures, 2010) — acoustic radar + species ID by wing frequency + low-power laser

### 2. Distributed Mode
Stationary radar network triangulates targets + dispatches attack minicopter. The minicopter carries its own directional laser and onboard tracking — once locked, it pursues and kills autonomously. No real-time comms needed after lock.
- Best for: larger open areas
- Key insight: separating detection (wide area) from execution (mobile, precise)
- Minicopter has: directional laser + onboard vision/IR tracking + galvanometer or gimbal for laser steering

### 3. Blackbat (TBD)
Fully autonomous minicopter: detection + tracking + kill all onboard. Patrulha uma área sem infraestrutura fixa.
- Most ambitious
- To be elaborated in a future session

## Technical notes

**The hard problem in all modes:** targeting accuracy. Hitting a 1cm object moving at 2m/s requires sub-millisecond tracking and sub-millimeter laser pointing. Solved with:
- Acoustic sensing (wing beat frequency) for initial detection
- IR/optical tracking for lock-on
- Galvanometer mirror for fast laser steering (can track at kHz speeds)

**Laser specs:** low-power diode laser sufficient for insects (~100-500mW). Not dangerous to humans at typical distances.

**Species discrimination:** wing beat frequency varies by species — mosquitoes ~600Hz, houseflies ~200Hz. Can filter non-target insects (bees, butterflies) acoustically before engaging.



## Prototype Spec (Fixed Station — 120° cone)

### Scope
Single unit, fixed installation, 120° horizontal coverage. No rotation. André's personal prototype.

### Sensor architecture
- **LiDAR** (solid-state, ~120° FOV): detection layer — sweeps the zone, flags moving objects by position and size threshold. No species discrimination needed — rule is "small + flies = kill."
- **IR camera** (fixed, wide-angle, covers same 120° FOV): tracking layer — receives XYZ hint from LiDAR, locks onto target in frame, tracks at ~1000fps, outputs predicted intercept point.
- **No acoustic layer** for v1 — size threshold in LiDAR/camera pipeline replaces species discrimination.

### Kill mechanism
- **Galvanometer mirror**: steers kill laser to intercept point. Only moving part in the system. Microsecond response, solid-state.
- **Laser**: low-power diode, ~100-500mW. Sufficient for insects, not dangerous to humans at typical distances.

### Camera specs
- Resolution: 320×240 sufficient (target is ~1cm at 2-3m range)
- Frame rate: 1000fps minimum (at 2m/s target speed, 2mm displacement per frame at 1000fps — well within beam spot)
- Raw data: ~75 MB/s, but on-chip blob detection collapses this to bytes/second (x, y, radius, timestamp per detection event)
- Processing: Kalman filter for trajectory prediction → intercept point → galvanometer fires

### Full pipeline
```
LiDAR sweep (120° continuous)
  → moving object detected, XYZ position estimated
IR camera (fixed, 1000fps)
  → XYZ hint received, target locked in frame
  → blob tracking + Kalman filter
  → predicted intercept point computed
Galvanometer mirror
  → steers laser to intercept point
  → fires
Total latency target: < 5ms
```

### Coverage
- Range: ~3-5m effective radius
- Angle: 120° horizontal cone
- Targets: anything small and flying (no species discrimination in v1)

### Farm/cattle application (future)
Distributed mode maps well to livestock pest control. Fence-post radar network + autonomous minicopter with onboard lock-and-track. Enormous market ($3-5B/year fly-related losses in US cattle alone). Organic/premium producer angle. No chemicals, no residue.
## Related ideas
- building-x-in-rio (Laix) — potential commercial application
- andreml — potential software/CV component

## Updates
2026-04-22 — thread created; concept discussed with Gaia; distributed mode clarified: minicopter is self-contained after lock-on
