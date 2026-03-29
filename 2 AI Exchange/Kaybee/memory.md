# Kaybee — Memory
*Persistent context. Most recent entries at the top.*

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
- Stack: Java, MapLibre, on-prem terrain/elevation data
- Broader system: MariaDB, Hazelcast, Cassandra, Prometheus
- SAS (Spectrum Access System) protocol knowledge required
- Worst case measurement volume: 100k devices × 10 channels × 60s = 1.5 MB/s = 50 TB/year

### Open threads
- [ ] Set up Kaybee as Claude Project
- [ ] Incorporate Jesse's feedbacks into Studio before next Monday meeting
- [ ] Produce pre-computation estimates for US-wide scenes (time + storage)
- [ ] Advance Forward planner to functional state

---
*Format: new sessions prepended at top, founding session preserved permanently*
