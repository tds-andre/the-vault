A few additional definitions regarding protocols:
	* they are not a function in the sense of input -> process -> output
	* they might be a complex composition of definitions, procedures, triggers, circumstances, rules, constraints, etc, so I'm not sure if we'll be able to put a common structure around them; my intuition is that they should be free form and small, at least initially (if we add a structure we are in sense creating a protocol for protocols)
	* don't take this as a prescription or structure, but they might have subprotocols or be part of group of protocols. For example when we talk about memory protocols, these will include instructions on how to handle sessions.md, state.md, history.md, etc, and how they inter-relate; which could be further broken down on how/when to read or write or consolidate each file; I don't want to set a hard ontology on that, I'm just exemplifying what a protocol is so we can have a shared understanding when comunicating: I might refer to them as memory protocols or memory protocol or session update protocol, they are all related to a single memory protocol; again, this is not a prescription, maybe be memory protocol should be broken down
	* protocols may be more or less explicit/implicit (categorically or in a spectrum); for example, the boot sequence is a protocol, but we won't list it as such in the protocols section, i.e., it's a categorically implicit protocol; typically when we talk about protocols we'll be referencing explicit protocols (e.g., memory protocols)
	* one thing to consider: we might need/want to create a markdown file for a relatively complex/big protocol, instead of just inlining it on core.md or identity.md; the important thing to accomplish is for the agent to be aware of it at all times, even in long running sessions.
	* protocolos não existirão no registry, portanto podemos resolver registry antes de protocolos


Let's also define now *functions*:
	* functions are not skills, because they only make sense for a particular agent and/or within the André Agentic Ecosystem; an agnostic set of instructions agent-wise and ecosystem-wise is not a function, is a skill (in the typical sense of how the term is used by AI providers)
	* functions can be arbitrarily long and they shouldn't be loaded unnecessarily by agents; agent-specific functions should be indexed in it's registry (more on that bellow) and reference files in the agent's functions/ directory with the full instruction set, i.e., the agents should be aware of their existence; system-wide or shared functions (e.g., housekeeping) should be indexed in the registry and reference files in "2 Agents/functions/"	
	* tbd: programs, projects, routines, tasks (dw about it now, just take note)


Regarding resources and the registry:
- like you pointed out, fells like a list of everything, so we might need to refine it a little further; the key features is to have a centralized place for "stuff" so agents can know what exists nominally, while also preventing environment specific stuff being spread out all over the agents files making it hard for future cross-machine setups, i.e., if we were to setup the AAE in another machine we would only need to make changes in the registry
- to start, I think we can classify all the stuff by:
	- ownership: e.g., agent-owned, shared by agents, external, .. (not prescriptive or extensive list, just examples)
	- environment: environment dependent or not
	- resource type: files, dirs, repos, enabling systems, mcps, credentials, .. (not prescriptive or extensive list, just examples)
	- dynamism: static final, almost static, grow-prone, change-prone,.. (not prescriptive or extensive list, just examples)
- then we can make a list of everything, including:
	- roor dirs
	- vault dirs
	- ecosystem dirs
	- primarch dirs
	- primarchs
	- environments
	- systems requirements
	- dirs and files
	- repos and projects
	- enabling systems
	- mcps
	- skills
	- functions
	- harnesses
	- ..
- once we have it classified, we can decide where each belongs (in a registry, or core.md or indentity.md or ..)

What do you think?

### Mostly Static Resources
- root dirs (first levels)
- vault dirs (first levels)
- ecosystem dirs
- agent dirs (common levels)
- agents
- environments
	  
Regarding registry:
- protocolos não existirão no registry, portanto podemos resolver registry antes de protocolos
- things that should be inlined in core.md or identity.md and :
	- the root, vault, ecosystem and agent directory structure	  
* a idéia é centralizar todos os recursos existentes em um diretório registry/
	1) madatory.md: cross agent mandatory resources
	2) lookup.md: for cross agent optional resources
	3) [agent].md: agent managed registry so they don't bloat the other two (other agents can read if necessary)

* each file will be divided in sections by resource type, and each resource type can have it's own ontology; resource types include but are not limited to:
	* enviroments (e.g, mobile, main pc, laptop) - in mandatory.md; we'll not worry now about how the other resources are available or not depending on the environment, it's just a soft registry for now.
	* primarchs - in mandatory.md; 
	* repos/projects
	* directories and files(general purpose, e.g., storage, cloud drives)
	* mcp tools
	* systems (e.g., Python, Node)
	* services (e.g., Google Maps API + key)
	* knowledge base (tbd)
	* skills
	* functions
	* harnesses
* Unrelated: system requirements should be in the spec only

subagents function