---
updated_by: Gaia claude-sonnet-4-6 v2.0
updated_on: '2026-04-26'
---

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
`2026-03-27` — **SHIPPED 2026-03-29**
Alex added `shell(cmd)` tool to vault-mcp with full allowlist (mv, cp, rm, mkdir, python, curl, etc.) and `now()` for BRT timestamps. File move/delete now available. Next candidates: Toggl API wrapper, automated message routing.

### Agent triggering via Claude API
`2026-03-29`
Capability for Gaia to programmatically trigger specialized agents without André manually opening a Claude Desktop session. Architecture: Alex adds a `trigger_agent(agent_name, task, context_files)` tool to vault-mcp that calls the Claude API with the target agent's system-prompt + memory + task, writes result back to vault (agent's inbox or messages/dispatched). Requires a separate Anthropic API key (billed per token, separate from claude.ai subscription). This is the unlock for genuine agent autonomy — delegation without human carry. For now: manual triggering via Claude Desktop + notes system via inbox. Revisit when API key is set up and cost model is understood.

### System reboot / dump / export / transit / backup
`2026-03-29`
Capability to export or serialize the entire agent system state — memory, vault structure, functions, threads — in a portable format. Use cases: migrating to new hardware, backing up before a major change, bootstrapping a new agent system from scratch using the exported state, or "rebooting" a drifted system back to a known good state. Think of it like a system snapshot or a brain export. Related to the sandboxed filesystem idea and the dedicated hardware question. Alex's territory technically; Gaia's territory strategically.

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

### WhatsApp MCP via Baileys
`2026-03-31`
Unofficial WhatsApp automation using Baileys (or whatsapp-web.js) — open source libraries that automate WhatsApp Web via a headless browser session authenticated to André's personal account. Alex builds a local service exposing vault-mcp tools: `send_whatsapp(number, message)` and `get_messages()`. Risk: Meta occasionally bans accounts using unofficial automation, low probability for personal low-volume use. Prerequisite for the WhatsApp→inbox bridge below.

### WhatsApp → inbox bridge
`2026-03-31`
Once WhatsApp MCP is live: messages sent to a designated number/contact are captured by the Baileys service and written to `2 AI Exchange/Gaia/inbox/` as properly formatted message files. Enables mobile-native capture — André messages Gaia from his phone naturally, no Obsidian or GitHub needed. Depends on WhatsApp MCP above.

### Context architecture — notes vs. Claude's intrinsic capability
`2026-04-05`
Deep conversation about the philosophy behind the vault system. Key aspirations identified:
- **Rebootable/transferable state** — vault in plain markdown/git means no vendor lock-in; works with any future AI
- **Infinite local RAG** — local storage is unlimited, notes accumulate indefinitely; true RAG (semantic search across vault) not yet implemented — gap worth addressing
- **Asymptotic context** — the agent should approach André's context level over time; session-limited interaction is the enemy; infinite chat + vault memory is the current workaround
- **Cross-intelligence medium** — plain markdown is readable by humans, any LLM, any search engine; storing state as notes rather than encoded vectors makes it inspectable, editable, portable

Key insight: vault should store *state* (what's happening, decisions, progress) and *identity* (who André is, his systems) — NOT *capability* (how to do things Claude already knows). Current system is slightly over-indexed on capability in system prompts, appropriately calibrated on state/identity.

Real gap: memory.md files are curated summaries, not transcripts — they lose texture and the *why* behind decisions. Weekly reviews (in André's own voice) are the highest-fidelity memory. The "infinite chat session" pattern is a workaround for session limits, not a sustainable solution — the vault should eventually be rich enough that a fresh session feels continuous.

Pattern observed: André uses a single long-running chat per agent rather than new sessions per topic. Goal: agent context should approach André's context asymptotically via vault accumulation.

To revisit: true RAG implementation (vector index over vault), richer memory.md format that captures *why* not just *what*, reducing capability instructions in system prompts in favor of accumulated personal context.

### Asana MCP integration
`2026-03-29`
Asana MCP connected to Claude Desktop (2026-03-29) but pointing to personal workspace (andrebahamut@gmail.com, old 2015 tasks). The correct workspace is "Grieb Emmerich" which is likely tied to a different/work email account. Need to re-authenticate or add a second Asana connection with the correct account. Once connected to Grieb Emmerich, most relevant for: Janea agent (Akuvo deliverables), Gaia (weekly review). MCP tools available: get_projects, get_tasks, create_task, create_project, get_task, get_stories, search, etc.

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



### Apollo passive mode — agent push / broadcast
`2026-04-07`
Apollo's passive/observational mode requires other agents to push updates to him. Two mechanisms to build:
1. **Agent push** — when Joane completes an analysis, when Gaia does a weekly review, when any agent produces something Apollo should observe, they write a summary to Apollo's messages/ dir. Convention TBD.
2. **Broadcast** — periodic system-wide broadcast (e.g. weekly) that any agent can read or write to. Apollo subscribes passively.

This is the unlock for Apollo's cumulative passive component. Related to broadcast.md concept already in evolution.md.


### Memory layers vocabulary
Three distinct layers:
- **Vault** — permanent, markdown/git, survives sessions
- **Memory** — per-session boundary, lives in `memory.md` / `archive.md`
- **Session memory** — ephemeral, exists only while the session runs (the context window); gone when session ends. This is what OPUS-HANDOFF.md was designed to preserve across a model switch.


### Document type and metadata registry
`2026-04-07`
As agents create more notes with varied frontmatter, a central registry of known `type` values and domain-specific properties would help consistency and discoverability. Registry would define: known types, recommended additional properties per type, conventions. Could live at `2 AI Exchange/metadata-registry.md`. Apollo is a natural owner — ties into the methodology/ontology goal.

### Link update on file move
`2026-04-07`
Obsidian automatically updates internal links when files are moved via its UI. Agents moving files via shell/Python bypass this — links break silently. Options: (1) note-mcp `move_file` runs a vault-wide link-update scan after moving, (2) agents avoid moving files that are heavily linked, (3) accept breakage and fix on next Obsidian open. Option 1 is cleanest — Alex to add link-rewrite step to `move_file` tool.

### Cross-machine agent system setup
`2026-04-07`
The vault is portable via git, but MCP server setup (vault-mcp, note-mcp, filesystem config) is machine-specific. Need: a bootstrap script or setup guide that installs and configures all MCP servers on a new machine from scratch. Makes the system truly cross-machine. Alex's territory. Relevant when setting up the secondary PC for the SP moto trip.


### WhatsApp agentic communication — reply on André's behalf
`2026-04-07`
Expanded vision beyond the capture bridge. Goal: Gaia reads incoming WhatsApp messages and replies on André's behalf for appropriate conversations.

**Layers required:**
1. Baileys bridge (already in evolution.md) — messages land in vault as structured notes
2. Routing/classification — handle vs. escalate to André vs. ignore; needs rules per contact/category
3. Context to reply well — who is this person, conversation history, relationship tone; Apollo's relationship profiles are upstream dependency
4. Confirmation step (initially) — Gaia drafts reply, André approves before sending; autonomy earned over time
5. Sending — Baileys send_whatsapp() writes reply back

**What makes it hard:** judgment, not technology. Replying well requires knowing André's voice per relationship, which conversations are safe to handle, when to escalate. Apollo's "encode André completely" goal is a direct prerequisite — voice and relationship profiles make replies accurate.

**Risk:** wrong auto-reply to wrong person creates real-world friction. Confirmation-first mandatory until system proves itself on low-stakes categories (scheduling, professional logistics, Cocoricó ops).

**Natural autonomy progression:**
- Phase 1: Gaia drafts, André approves all replies
- Phase 2: Autonomous for low-stakes categories (logistics, professional, Cocoricó team)
- Phase 3: Broader autonomy as Apollo's profiles mature

**Dependency chain:** Baileys MCP → routing layer → Apollo relationship/voice profiles → confirmation UX → autonomous replies


### Stamp of achievements
`2026-04-09`
A feature for Gaia (or the system) to track and surface André's achievements — things he's accomplished that are worth acknowledging explicitly. Could be: a periodic review function that scans threads for closed items and notable milestones, presents a "stamp" summary, and appends to a dedicated achievements log. Useful for re-entry after drift. Apollo may also have a role here (Codex integration). Format and cadence TBD.


### Claude BI
`2026-04-09`
Product idea: a BI tool powered by Claude. No further context captured — needs qualification. Could be: natural language querying over data, Claude-generated dashboards, or an analytics interface built on Claude's API. Worth a dedicated conversation.

### Agente para app de gestão (Cocoricó)
`2026-04-09`
Idea: build an agent or app for Cocoricó management — orders, inventory, team, financials. Could replace AnotaAí (mentioned in today's plan) or complement it. Related to the WhatsApp bot idea also captured today. Alex + Cocoria territory when scoped.

### Article idea: never use whitespaces for anything
`2026-04-09`
Article/post idea about avoiding whitespace in technical naming — files, paths, variables, git commit messages, etc. Why whitespace breaks things everywhere and the discipline of never using it. Short, opinionated, practical.


### Cowork as agent execution layer
`2026-04-10`
André has Cowork working with Jax imported natively. Both share the vault so memory/notes sync automatically. No programmatic trigger for Cowork exists yet (Scheduled Tasks is the closest). Conway (unreleased, ~Q2-Q3 2026) is the likely unlock for truly autonomous triggering.

Current best pattern: Gaia writes a structured task file to target agent's messages/ → André opens Cowork session for that agent → agent reads task + executes autonomously → result lands in vault → Gaia picks up next session. Cowork = execution layer, vault = coordination layer.

Worth revisiting when Conway ships or when Scheduled Tasks is better understood.


### Broadcast function
`2026-04-10`
Gaia needs a dedicated broadcast capability for system-wide notifications — used today to inform all agents of the env.yaml change and Specialized Notes protocol. Currently done manually by scripting individual message files per agent. Should be a proper Gaia function:

```
Broadcast(subject, body, agents=all, type=notification)
```

- Creates one message file per agent in their messages/ dir
- Standard frontmatter + shared body + optional per-agent extras
- Logged in Gaia memory as a broadcast event
- Agents acknowledge at their next session

Related to Apollo passive mode / agent push mechanism. Build after WhatsApp MCP is stable.


### Cross-machine sync — cloud drive vault
`2026-04-20`
Instead of (or alongside) git for sync, mount the vault on a cloud drive (Google Drive, OneDrive) so changes sync automatically across machines without manual git pull. Simpler for non-technical use on the road. Risk: conflicts if both machines write simultaneously — needs a clear "one active machine at a time" convention or conflict resolution strategy.

### System health check / self-diagnose
`2026-04-20`
A Gaia function that runs a quick diagnostic on the system state: are MCP tools responding? Is vault accessible? Is git up to date? Are any agent files missing or malformed? Could run at session start or on demand ("diagnose"). Alex territory for the tooling checks, Gaia for the vault/agent checks.


### Integrate all agentic modes
`2026-04-20`
André wants to integrate all agentic modes into a unified experience — Claude Desktop, Cowork, Claude Code, Claude.ai. Currently fragmented. Worth a design session once the cross-machine setup is stable.

### Automatic Toggl / active window tracker
`2026-04-20`
Auto-track time based on active window — eliminate manual Toggl entries. Could hook into Windows event log or foreground window API. Alex territory.


### Cross-machine setup — status update (2026-04-26)
Trip experiment didn't work smoothly enough for reliable remote use. Decision: **fallback to TeamViewer/RDC when remote** until a proper solution is designed. Cross-machine vault sync via cloud drive + health check still on the roadmap but deprioritized. Claude Code CLI now installed on main PC — binary at `C:\Users\tdsnit\.local\bin\claude`.
## Graduated to Master List
*Ideas that became concrete threads — moved here for reference.*

- Command-line MCP → `closed` (built by Alex 2026-03-27)
- Microsoft ToDo integration → `someday` thread in Master List
- Messaging system → `closed` (built 2026-03-27)
- **broadcast.md** — a shared file any agent can write to, broadcasting a message or state update to all other agents without individual inbox messages. Use case: system-wide announcements, status changes, alerts. Format TBD. Consider: append-only log vs. overwrite per agent vs. structured entries with timestamps and sender. Related to triggers.md concept.
- **note-mcp index cache** — `build_index(path)` command that walks a directory and writes `.note-index.json` with all frontmatter for fast queries. Build when vault hits ~500+ notes. Companion to the note-mcp server Alex is building.

---
*This thread is Gaia's, but belongs to the whole system.*
