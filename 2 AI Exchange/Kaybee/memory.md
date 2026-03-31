# Kaybee — Memory
*Persistent context. Most recent entries at the top.*

---

## Session: 2026-03-30 (meeting prep)

### Work done
- Red-teamed Jesse's 0325 feedback against André's 0323 prompt and 0324 AI elaboration
- Key finding: André's Inverse Area goal dropped from Jesse's framing; Network Optimizer is different (brownfield tuning vs greenfield deployment)
- Identified inconsistencies in Jesse's doc: Forward planner receiver defaults unspecified, Reverse planner tower source unclear, Link planner fixed-vs-tuned contradiction, Network Optimizer CSV fields unrealistically detailed
- Clarified "missing info" = what's being solved for (not a gap)
- Stack is **Python** (not Java as originally noted — André is becoming a Java asset at KB more broadly, but Studio is Python)
- Produced CBRS Studio Plan v2 (`Key Bridge/0330 CBRS Studio Plan v2.md`)

### Pre-computation estimates
- Built interactive calculator for US pre-computation scenarios
- Sweet spot: urban+suburban (~350K km²) at 1 min/km², 5 MB/km² = ~7.5 days on 32 cores, ~1.7 TB storage
- Critical multiplier: per transmitter config — need to quantize (height, gain, pattern) and multiply
- André's approach: coarse pre-computed losses with runtime interpolation
- Hidden risk: path loss not smoothly interpolable across terrain features
- **Decision: regional pilot first** before committing to national pre-computation
- Hybrid approach likely: Free Space instant → pre-computed ITM for standard configs → on-demand ITM with caching → RT on demand

### Propagation models confirmed
- Free Space Path Loss (instant preview)
- ITM (standard planning, existing KB code)
- Sionna RT (ray tracing, GPU, for close-up urban scenes)
- Terrain elevation data already available as performant service

### Plan v2 structure
- 5 planners fully spec'd from Jesse's perspective (inputs, solving for, outputs, computation flow)
- Shared computation layer: 3 models, pre-computation architecture with pilot recommendation
- UI architecture: one map, five mode tabs, shared device state across modes
- Phased roadmap: Forward → Link → Network View → Reverse → Network Optimizer
- 7 open questions for Jesse identified
- Future extensions: Inverse Area, General Optimizer, Analytics (André's broader vision preserved)

### Open threads
- [ ] Jesse meeting today (2026-03-30) — use Plan v2 as reference
- [ ] Regional pre-computation pilot — needs to be scoped and proposed to Jesse
- [ ] Validate receiver defaults with Jesse (3m AGL, 0 dBi, -90 dBm threshold)
- [ ] Clarify tower source for Reverse planner (SAS data vs user upload)
- [ ] Determine acceptable latency: instant (<1s) vs loading state (5-30s)
- [x] Set up Kaybee as Claude Project (done — this is it)

---

## Session: 2026-03-29 (founding session — renamed from Keybridge)

### Context established
- Agent renamed from Keybridge → Kaybee on 2026-03-29
- André reports to Jesse (CEO/boss) — relationship previously at risk, now stabilized
- Current wage is low due to company financial reasons — back pay expected
- André's goal: become indispensable at KB (Java asset, operations asset, ESC asset, Map/Viz asset — last achieved)

### CBRS Studio — current state
- Jesse's feedback received 2026-03-25 (see `Key Bridge/0325 Jesse's Feedback on CBRS Studio Plan.md`)
- Jesse reframed the goals as 5 planners:
  1. **Forward** — transmitter config → service area (dBm raster + polygon)
  2. **Reverse** — receiver location → potential serving towers (P2P links)
  3. **Link** — transmitter + receiver → optimize SNR
  4. **Network optimizer** (NEW) — existing tx + customer CSV → optimize service quality (3 modes: tx, rx, all)
  5. **Network view** — describe current service portfolio, no optimization
- Key transmitter config: position (x,y), height (z), azimuth (w), gain (g), beamwidth (bw, default 12dB omni), emission power (e, default cat B max)
- Pre-computation estimates still needed: time + storage for whole US
- Weekly meeting with Jesse — progress expected by Monday mornings

### Technical context
- Stack: Python for Studio; Java more broadly at KB
- Broader system: MariaDB, Hazelcast, Cassandra, Prometheus
- SAS (Spectrum Access System) protocol knowledge required
- Worst case measurement volume: 100k devices × 10 channels × 60s = 1.5 MB/s = 50 TB/year

### Open threads
- [x] Set up Kaybee as Claude Project
- [ ] Incorporate Jesse's feedbacks into Studio before next Monday meeting → done in 0330 session
- [x] Produce pre-computation estimates for US-wide scenes (time + storage)
- [ ] Advance Forward planner to functional state

---
*Format: new sessions prepended at top, founding session preserved permanently*
