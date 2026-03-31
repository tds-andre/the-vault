
## Jesse's Feedback
- **Forward planner**: 1  (or m?) transmitter -> coverage
- **Reverse planner**: 1 receiver -> transmitter location/config options + p2p link metrics for each 
- **Link planner**: 1 receiver and 1 transmitter -> optimize both configurations + before/after p2p link metrics
- **Network optimizer**: n receivers and m transmitters 
	- optimization a: fixed receivers, optimize transmitter configs
	- optimization b: fixed transmitters, optimize receivers configs
	- optimization c: optimize all configs
- **Network view**: n receivers and m transmitters -> no optimization, just coverage and p2p link metrics
	- Public towers data (fixed)

## Original Design
- Direct Planning: maps directly to Forward planner
- Inverse Point-to-Point: general case of Reverse planner, and partially intersects with Network optimizer
- Inverse Area: not covered by Jesse (keep that way)
- Inverse General Case: covers all cases

## Notes
- Jesse Network view is essentially the concept of the Studio, i.e., see your stuff plotted, and a general case case of the Forward planner
- The other features from Jesse covers the concept of the Planner
- Jesse has more specific constraints, which is good, but eventually as requirements expand they move closer to general optimization cases
- Inverse Area is not needed
- Inverse General Case covers all case, but impractical implementation

### Modes/Features

| Item         | Fixed                        | Optimizes                          | Outputs                                                 |
| ------------ | ---------------------------- | ---------------------------------- | ------------------------------------------------------- |
| Forward      | m transmitters               | n/a                                | coverage area metrics                                   |
| Reverse      | 1 receiver                   | transmitter<br>config and location | location and config options along with p2p link metrics |
| Link         | 1 receiver and 1 transmitter | configs                            | config options along with p2p link metrics              |
| Network<br>  | n receiver and m transmitter | configs                            | config options along with p2p link metrics              |
| Network view | n receiver and m transmitter | n/a                                | converage area and <br>p2p link metrics                 |

### Optimization Table

|                     | Reverse                             | Link                                     | Network                        |
| ------------------- | ----------------------------------- | ---------------------------------------- | ------------------------------ |
| Inputs<br>(Given)   | 1 Rx                                | 1 Rx + 1 Tx locations                    | n Rx + m Tx locations          |
| Outputs (Optimizes) | *n* Tx<br>(search)                  | 1 Rx + 1 Tx configs<br>(config matching) | n Rx + m Tx configs            |
| Analytical Outputs  | n link metrics <br>(good solutions) | link metric<br>(optimized link)          | n link metrics<br>(best links) |
| Map Outputs         | n lines                             | 1 line                                   | n lines                        |
