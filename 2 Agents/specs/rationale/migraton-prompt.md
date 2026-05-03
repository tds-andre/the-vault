
The overarching goal of the v2->v3 migrations are:
- use context windows more efficiently; v2 was designed around the anti-pattern of infinetely running sessions; v3 is designed around same-agent multiple-sessions with partial/dynamic or full context, and headless targeted sessions (servitor).
- parallel work streams in CoWork
- smooth inter-agent comms and spawning/delegation/escalation
- leaner initial states with awareness/findability of available resources that can be used for dynamic context expansion
- centralization/organization of index of things (registry)
- agents no longer "are" Claude Desktop + vault; they are their vault, and can be instantiated from any harness


The process will be managed by Gaia v2. Not all agents will be migrated initially, only Gaia (first), Alex, Kaybe (renamed from Kaybee), Joane, Cocorita (renamed from Cocoria) and Ben.
- Managing Gaia (you) should sync spawn the v2 agent with the new MCP tool using the standard v2 boot + migration briefing
- Once done, Managing Gaia should review the migrated agent and do whatever fixes are necessary appending issues and key decisions in the agent's notes/migration-notes.md;
- I don't want to be fucking involved in this shit; get it done; the goal is to start working in v3/CoWork ASAP, so adjustments can be done from there.
- Refresh your context with specs, rationale and current briefing at every agent


Each agent should migrate it's own content from v2 to v3, with the following considerations in mind:
- load specs.md and the new v3 boostraped structure
- migrate contents from v2 to v3 model (keep v2 as-is, but no cross-ref)
- it's not a "new" agent/primarch, the goal is for it to be the same agent in a new format
- make sure nothing gets behind
- regarding history.md of v3, agents may create a single initial/preface chapter with the history/context from v2
- issues and key decision taken during migration should be noted in the notes/migration-notes.md and be kept on top of mind for reviewing