I want you to build web system, front and backend - that will be a CBRS Studio. Take a look online what Citzen Broadband Radio Service (CBRS) is. The overarching goal is to allow users to plan, play, analyze and simulate deployment of devices. Features examples:
- To place a device/antenna on a map an see it's propagation loss or power
- To simulate the PAL area for a set of devices and see the area loss or power
- To play around with different simulation parameters (e.g., raytracing pathloss number of radial samples)
- To play around with different vizualization and rendering options (e.g., colormap of the path loss)

The system will be open to the internet, for free, but you can expect limited load on the long run since it's very niche. A few pages/features might be behind a sign-up. The frontend should be done in typescript and react. It'll be used mostly from desktops and laptops. The backend in Python and Flask. Frontend and backend should reside in the same repository. The system will run on a single node, but don't worry about load or infrastructure now.

The owner of system is Key Bridge. You infer the visual indentity from the website https://keybridgewireless.com/
The strategic goal of the CBRS Studio system is to generated inbound for its SAS product.


The core value-add of the CBRS Studio system will come from path loss estimation algorithms, that take into account terrain and elevation, among other things. For now don't worry about the specific algorithms, we'll add them later. Just create a simple free space path loss implementation of it. The second value-add will be the rendering/displaying of Scenarios based on the path loss estimations. The system should allow for different rendering algorithm implementation - for now just create a simple one that you find suitable.

The main entities of the domain/data model are the following:
- Device: A CBRS device/antenna, having all typical CBRS device parameters or only the necessary for path loss computation (i.e., latitute, longitute, elevation, orientation and power).
- Scenario: A set of Devices, along with set-wise parameters yet to be discovered. One Device always belong to one Sceneario.
- PathLossComputationProfile: A dynamic set of predefined parameters used for path loss computation, which specifies the algorithm to be used along with its specific parameters.
- RenderingProfile: A dynamic set of predefined parameters used to render a Scenario in a map.
- SimulatedScenario: Represents the results of applying a PathLossComputationProfile to a Scenario - the PathLossComputationProfile will not be bound by foreign keys, the values of the PathLossComputationProfile should be denormalized into the SimulatedScenario itselt. A SimulatedScenario is imutable after the computatios are concluded. The SimulatedScenario, along with system/internal ID, should have a natural key or hash, based on its intrinsic values to avoid recomputations. Important to note that the computation of SimulatedScenario can take several minutes.
- RenderedScenario: Represents a set of images or assets resulted from applying a RenderingProfile to a SimulatedScenario. The RenderingProfile will not be bound by foreing keys, and its values should be denormalized into the RenderedScenario, which should be imutable. The RenderedScenario, along with system/internal ID, should have a natural key or hash, based on its intrinsic values to avoid recomputations. Important to note that the computation of RenderedScenario can take several seconds.
 

The backend should have endpoints for CRUD operations for all entities (i.e., CREATE, LIST, UPDATE and DELETE), along with the following endpoints:
- /scenario/{scenario_id}/simulate: this replaces the CREATE operation of the SimulatedScenario. It should receive the values of the new SimulatedScenario as POST parameters and add it to the computation queue. It should return the newly created entitity imeditally, along with it's ID. Only one SimulatedScenario might be computed at any given time.
- /simulation/{simulation_id}/status: returns the status/progress of the computation of a SimulatedScenario
- /simulation/{simulation_id}/render: this replaces the CREATE operation of the RenderedScenario. It should receive the values of the new RenderedScenario as POST parameters and it start computing it, and return when it's done.



We will start with just a single page, that will also be the main and home page. It should have a big map, preferably using MapLibre, and a section will all controls of the Studio. It should have the following features:
- All operations are always done in the context of a existing Scenario - if the user haven't created one before, a default one is provided.
- Display the current Scenario name
- Allow users to place markers/Devices on the map.
- Allow users to configure Device parameters.
- Allow users to move Devices around the map.
- Allow users to start the computation of a SimulatedScenario from a new or existing PathLossComputationProfile
- Display the status of a currently running SimulatedScenario
- Display a list of already computed SimulatedScenario and allow users to select an active one.
- Allow users to start the synchronous computation of a RenderedScenario from a new or existing RenderedScenario. Only one RenderedScenario might be calculating at any given time.
- Display a list of already computed RenderedScenario, for the currently active SimulatedScenario, and allow users to select one that will be displayed in the map.


Let me know if you have questions, or need any other information that is crucial, or if want to confirm any premisses. Otherwise you might infer and define missing pieces as you see fit.