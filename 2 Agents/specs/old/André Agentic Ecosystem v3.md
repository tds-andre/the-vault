# André Agentic Ecosystem v3
## Concepts


### Eternal
An eternal is persistent named AI entity, similar to a digital human; it's not a specific provider, UI, harness or directory; it has wide, dynamic and persistent scope/context; has wide set of capabilities (e.g., memory, notes, tools access); it's differentiating factor is long-term learning/adaptability, memory and personality; usually will have a working directory.

### Subagent
It's an randomly or sequentially named persistent AI entity, similar to a digital human; it's not a specific provider, UI, harness or directory; has an initial narrow scope/context that can be expanded or changed if needed; owned or managed by an `agent` or directly by a human; has a narrower set of capabilities;  usually will have a working directory.

### Worker
It's ephemeral unnamed AI entity; narrow and fixed scope/context; it does a job or task, returns or logs it's outputs and then disappears; other agents, subagents or works might follow up on the task; owned by an agent, subagent or human; 




## Design Principles
- **Context Window Efficiency**
	- Windows should be narrowed for specific tasks
## Design Definitions
- Agents will be persisted in a Obsidian Vault, which will be synced between devices by Obsidian itself; no git; all types of files; especial /nosync folders that will not be sync


I'm thinking of redesign, here is the prompt I sent another AI for a fresh opnion:

I'm thinking on how to design a agentic ecosystem for my daily life. I have set it up to an extent using Claude Desktop (Chat mainly) empowered MCP tooling (shell, notes, filesystem); it currently helps with my personal stuff, organization, my jobs, business, system development, etc; but I don't know if it's the best setup and I've came across some limitations and inefficiencies, for example: - Claude Desktop Chat is single threaded, i.e., one Chat at the time (Cowork came after, but it runs on some sort of sandbox environment that I think will limit or complicate the overall system) - I'm treating each Chat session as an agent, (aka digital human) i.e., infinite sessions; but I'm not sure if thats the best approach in terms of token usage and response quality. - The interfacing between agents/subagents is enacted with manual steps, and sometimes confusing - I'm not sure if I made the best meta-agent design system - It is not trivial to install, run or access the agentic ecosystem from multiple machines/devices and keep in sync

The design I'm aiming for would mitigate the following issues: - Agents would be akin to digital humans that work with me, i.e., infinite memory (to an extent of course), learning, note taking, etc - The ecosystem would allow me to work on multiple things in parallel - Agent would intercomunicate, trigger and spawn subagents automatically - The ecosystem would be harnessed/used from multiple devices/machines, with minimal friction or setup - It should be platform independent to extent possible, i.e., migrable between providers (e.g., Claude, Cursor, etc) with minimal friction - Currently there are lot of providers and variantions, with different purposes, e.g., Claude Desktop Chat, Cowork, Claude CLI, Claude Web, Claude Design, Claude VS Code integration, VS Code Github Copilot, Cursos (those are the ones I've used so far); Ideally the system should be "harness-independent" - There are lot of spread out files, directories, notes, repositories, MCP tools/configs, system requirements; would be nice to have it organized and centralized/indexed somehow - Not all agents are born equal; some might have it's own set of capabilities and subsystems - Currently is hard to keep track of it all; - There is a tendency for agents to get bloated


## Agent
An agent is persistent named AI entity, similar to a digital human; it's not a specific provider, UI, harness or directory; it has wide, dynamic and persistent scope/context; has wide set of capabilities (e.g., memory, notes, tools access); it's differentiating factor is long-term learning/adaptability, memory and personality; usually will have a working directory.

## Subagent
It's an randomly or sequentially named persistent AI entity, similar to a digital human; it's not a specific provider, UI, harness or directory; has an initial narrow scope/context that can be expanded or changed if needed; owned or managed by an `agent` or directly by a human; has a narrower set of capabilities;  usually will have a working directory.

## Worker
It's ephemeral unnamed AI entity; narrow and fixed scope/context; it does a job or task, returns or logs it's outputs and then disappears; other agents, subagents or works might follow up on the task; owned by an agent, subagent or human; 

