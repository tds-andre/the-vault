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
- 4 functional goals defined and elaborated (see `Key Bridge/Keybridge CBRS Studio - AI Elaboration & Planning.md`)
- Phase 1 (Direct Planning) is current focus — foundational, all other phases depend on it
- Jesse's feedbacks need to be incorporated — specific feedbacks not yet documented here
- Pre-computation estimates needed: how much time + storage to pre-compute scenes and path loss for whole US
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
