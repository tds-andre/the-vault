# Gaia's Evolution
*A living thread for ideas, improvements, and feature requests for the Gaia system — agents, vault architecture, tooling, and meta-processes.*
*Maintained by Gaia. Append freely — André or any agent can drop ideas here.*
*Last updated: 2026-03-28*

---

## How To Use This Thread

- **Add ideas as they come** — no need to qualify or prioritize upfront
- **Gaia reviews this during weekly review** — surfaces what's ripe to act on
- **Items graduate to Master List** when they become concrete enough to track as threads
- **Format:** brief description + optional context. Date + author optional but helpful.

---

## Ideas & Feature Requests

### Messaging system — file move via Alex
`2026-03-27`
Currently agents can't truly "move" files (no delete tool in filesystem MCP). Moving a message from inbox to messages/pending requires writing to destination + overwriting source with a redirect stub. Alex should build a proper `move_file` tool in vault-mcp to make message routing clean.

### Toggl MCP integration
`2026-03-27`
André started Toggl tracking in late March 2026. Once 2+ weeks of data exist, build an MCP or export pipeline so Gaia can read time tracking data directly. Enables data-driven weekly reviews and time accounting. Alex's territory.

### Microsoft ToDo MCP integration
`2026-03-27`
ToDo = mobile capture inbox; Vault = central source of truth. Build a periodic import that pulls unprocessed ToDo items into Master List Unqualified section. Uses Microsoft Graph API. Alex's territory. Someday status.

### Weekly Review automation
`2026-03-27`
Partial automation of the weekly review — e.g. Gaia auto-generates a draft review from Toggl data + Master List state, André reviews and adjusts rather than building from scratch. Depends on Toggl MCP.

### Agent version audit function
`2026-03-27`
As agents evolve independently, generations drift. Gaia should have a periodic function to audit agent versions, compare against current blueprint, and flag agents that are significantly behind. Revisit when system has 6+ months of history.

### Vegeta — red team agent
`2026-03-27`
Planned future agent. Criticizes the system, agents, and decisions to trigger improvements and identify flaws. Key design challenge: making criticism actionable by design, not just noise. Needs careful prompt design.

### Apollo — knowledge base bootstrap
`2026-03-27`
Apollo exists but Personal/ folder is empty. First real Apollo session should focus on: establishing capture conventions, processing 4 To Follow Up/, and bootstrapping the PKB structure. Prerequisite for André (clone) agent.

### André — clone agent
`2026-03-27`
Requires Apollo's PKB as foundation. Long-term, ambitious. Don't start until Apollo has substantial organized knowledge about how André thinks, writes, and decides.

### Beocca — priest agent
`2026-03-27`
For reflections, confessions, old wisdom. Distinct from Gaia's strategic role. Good complement to the weekly review — a place for the inner life, not just priorities.

### Saul — lawyer agent
`2026-03-27`
WIP. Define the need more concretely before creating. Likely useful for contract review, CNPJ/legal processes, future investment agreements.

### Juliana — secretary spin-off
`2026-03-27`
Currently absorbed into Gaia. Spin off when the boundary between operational and strategic becomes clear through actual use. Don't rush — let the pattern emerge.

### Git commit message spaces fix
`2026-03-27`
vault-mcp git tool splits args on spaces, so commit messages use hyphens. Alex should fix args parsing to handle quoted strings properly, enabling natural commit messages.

### Command-line MCP scope expansion
`2026-03-27`
vault-mcp currently only exposes git. Modular architecture supports adding new tools. Next candidates: shell script execution (for automation), file move/delete (for message routing), Toggl API wrapper.

### System bloat / pruning / rejuvenation
`2026-03-29`
Fear that long-running systems get bloated over time — memory grows, functions accumulate, agents drift, context gets stale. Need a periodic pruning, recalibration and rejuvenation mechanism. Could be a Gaia function: "System Health Review" — audit all agents, archive stale memory, validate that functions still reflect reality, check that vault structure is still serving its purpose. Quarterly cadence probably right. Related to agent generations problem already noted.

### Token efficiency
`2026-03-29`
Not about being cheap — about being smart. As sessions grow and more files are read, token usage scales. Key levers: crawler pattern already implemented (don't load everything), memory pruning already designed, archive.md pattern already exists. Future: smarter context loading (only fetch files when directly relevant), compressed memory summaries for older sessions, Gaia should be aware of context window limits and manage gracefully.

### WhatsApp capability
`2026-03-29`
Ability for agents (especially Gaia) to send/receive messages via WhatsApp. Enables mobile-native interaction without opening Claude Desktop. Options: WhatsApp Business API, Twilio, unofficial libraries (risky). High value for Gaia's daily operating rhythm — André could message Gaia from his phone naturally.

### Email capability
`2026-03-29`
Agents read and send email. Enables: Gaia receiving context from email chains, automated follow-ups, report delivery. Gmail MCP or Microsoft Graph API (already relevant for ToDo integration). Needs careful permission scoping — read vs. send are different trust levels.

### Phone/SMS/call capability
`2026-03-29`
SMS and potentially phone call capability. Twilio is the standard route. SMS for urgent notifications or quick captures. Calls more complex and probably low priority.

### Internet access + account login + 2FA handling
`2026-03-29`
Full browser automation capability — login to accounts, handle 2FA, navigate web interfaces. Alex's Claude in Chrome tools already partially address this. 2FA handling is the hard part — requires access to authenticator or SMS. High capability, high security risk — needs careful design. Could unlock enormous automation surface.

### Sandboxed filesystem / dedicated hardware
`2026-03-29`
Question: what's the best human-machine shared filesystem architecture? Options: current approach (local Windows vault + git), dedicated home server (Raspberry Pi or similar), cloud VM, NAS. Key requirements: always-on for agent access, fast MCP reads, secure, versioned. A dedicated low-power server running the MCP services 24/7 would decouple agent availability from André's laptop being on. Worth designing when system is stable.

### Website creation and publishing capability
`2026-03-29`
Agents can create and publish websites to a domain. Alex already has prototyping capability. Adding: static site generation (Hugo, Jekyll, or simple HTML), domain management via API (Namecheap, Cloudflare), deployment (GitHub Pages, Netlify, Vercel via CLI). Directly relevant to X In Rio and future business ventures.

### Automatic digital marketing + lead routing
`2026-03-29`
Agents manage digital marketing campaigns and route leads automatically. Ambitious — requires: ad platform APIs (Meta, Google), CRM integration, lead scoring logic. Most relevant to future businesses. Probably a dedicated marketing agent when the time comes. Seed idea for the agentic ecosystem business (see Master List).

### Microsoft ToDo MCP integration
`2026-03-27` *(moved here from earlier)*
Already tracked in Master List as someday thread. André uses ToDo as mobile capture inbox; vault is source of truth. Periodic import of ToDo items into Master List Unqualified section.

### XMind files reconciliation with Vision.md
`2026-03-27`
OFP 2025.xmind and OFP 2026.xmind not yet read or reconciled with Vision.md. André to open these and flag anything missing. XMind format not readable by agents directly — export to markdown or summarize manually.

### Obsidian Bases / Dataview integration
`2026-03-27`
Master List uses inline metadata tags (type:, domain:, status:). Could be queried via Obsidian Dataview or Bases for filtered views (e.g. "all prioritized threads", "all cocoroco threads"). Low priority for now — human-readable first.

---

## Graduated to Master List
*Ideas that became concrete threads — moved here for reference.*

- Command-line MCP → `closed` (built by Alex 2026-03-27)
- Microsoft ToDo integration → `someday` thread in Master List
- Messaging system → `closed` (built 2026-03-27)

---
*This thread is Gaia's, but belongs to the whole system.*
