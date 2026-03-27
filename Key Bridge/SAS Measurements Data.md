### Overall SAS Data Landscape

| Data             | Tech       | Type                                | Volume | Throutput       |
| ---------------- | ---------- | ----------------------------------- | ------ | --------------- |
| Portal/User      | MariaDB    | Transactional / Operational         | Small  | High for tokens |
| Entities & State | Hazelcast  | Ephemeral / Operational             | Medium | Medium          |
| FAD & Cubes      | Cassandra  | Ephemeral / Analytical, Operational | High   | Low             |
| Logs             | ?Files     | Ephemeral / Operational             | High   | High            |
| Telemetry        | Prometheus | Ephemeral / Analytical, Operational | Medium | High            |
### Data Model
- MeasurementReport
	- Device / Device Info (lat, lon, etc)
	- Grant / Grant Info
	- Timestamp
	- Measurements [0 or n]
		- Low Freq
		- Bandwidth
		- Power
### Worst Case Volume
- 100.000 devices
- 10 channels
- 60s
- Payload size: 1 KB
- = 1.5 MB/s
- = 50 TB/year
## States
- Capable or not of Meas
### Notes
In GRA, if meas report is wrong, does it register the device? What is the response code?