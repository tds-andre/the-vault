Keybridge is currently a CBRS SAS provider, with a secondary overarching goal of providing applications/products
that supports CBRS users, current or potential, and facilitate or improve their activities, beyond the regulatory requirements or typical features of a SAS,  for example:
- Studio: experiment and analyze different device configurations and deployments
- Planner/Optimizer: given a set of constraints (hard or soft), what is the best configuration/deployment (or set of) 
- Analytics: explore current and historical public CBRS coverage data (potentially feeding back into the Planner or Studio)

These are not necessarily individual applications, just a cohesive segmentation of potentital secondary services.

For an initial endeavour in that direction, we have defined 3 broad functional goals that we would like to service:

1) Direct Planning: place and configure devices, edit or move them around, and analyze their propagation or aggregated coverage.
2) Inverse Point-to-Point: given a target receiver position, what is a good device placement and configuration (or set thereof) to serve it, potentially taking into account data from existing transmission providers, like existing antennnas and prices. Each potential solution would also come with analytical p2p outputs, e.g., curves of power, loss, terrain elevation. The more general case would be points-to-points (set of target receiver positions served by 1 or more devices).
3) Inverse Area: given a target service area, what is a good deployment configuration (i.e., set of devices, their positions and configurations), or set thereof, to serve it.

For completeness sake, there is also the Inverse General Case: given a set of target service areas and/or target receiver positions, along with solution constrains (e.g., minimal power received at a given point, maximum number of devices, slack for area served or receiver position), what is a good deployment configuration (i.e., set of devices, their positions and configurations), or set thereof, to serve them.

Ignore the current codebase as is not related to this prompt. How would go about to further elaborate and advance those functional goals? 