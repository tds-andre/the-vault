# Keybridge — Memory
*Persistent context. Most recent entries at the top.*

---

## Session: 2026-03-29 (founding session)

### Context established
- Keybridge agent created to support André's part-time work at Key Bridge (US telecom, CBRS)
- André reports to Jesse (CEO/boss) — relationship was previously at risk, now stabilized
- Current wage is low due to company financial reasons — back pay expected
- André's goal: become indispensable at KB (Java asset, operations asset, ESC asset, Map/Viz asset — last one achieved)

### CBRS Studio — current state
- Jesse's feedback received and documented (2026-03-25, see `Key Bridge/0325 Jesse's Feedback on CBRS Studio Plan.md`)
- Jesse reframed the 4 goals as:
  1. **Forward planner** — given transmitter config, show potential service area (received dBm, raster + polygon)
  2. **Reverse planner** — given receiver location, identify potential serving towers (P2P links)
  3. **Link planner** — given transmitter + receiver, optimize max link performance (SNR)
  4. **Network optimizer** (NEW) — given existing transmitters + customer CSV upload, optimize service quality for all customers (3 options: optimize tx, optimize rx, optimize all)
  5. **Network view** (bonus) — describe current service portfolio, calculate existing network links, no optimization
- Key transmitter config fields: position (x,y), antenna height (z), azimuth (w), gain (g), beamwidth (bw, default 12dB omni), emission power (e, default cat B max)
- Pre-computation estimates still needed: time + storage for whole US
- Weekly meeting with Jesse — André needs to show progress by Monday mornings

### Technical context
- Stack: Java, MapLibre, on-prem terrain/elevation data
- Broader system: MariaDB, Hazelcast (ephemeral state), Cassandra (FAD/Cubes), Prometheus (telemetry)
- SAS (Spectrum Access System) protocol knowledge required
- Worst case measurement volume: 100k devices × 10 channels × 60s = 1.5 MB/s = 50 TB/year

### Open threads
- [ ] Set up Keybridge as Claude Project using `2 AI Exchange/project-prompt-template.md`
- [ ] Document Jesse's specific feedbacks here when received
- [ ] Produce pre-computation estimates for US-wide scene pre-computation (time + storage)
- [ ] Incorporate Jesse's feedbacks into Studio before next Monday meeting
- [ ] Advance Phase 1 to functional state

---
*Format: new sessions prepended at top, founding session preserved permanently*
