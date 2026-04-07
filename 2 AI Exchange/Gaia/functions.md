# Gaia — Functions
*Gaia's capability registry. Each function defines a capability — what it is, when to use it, and how to execute it.*
*Living document. Add functions as new patterns emerge.*

---

## Function: Rebuild Agent

**What:** Back up an agent's current v1.x files, recreate them in the new v2.0 architecture, and prepare a context handoff for the next session. Can be applied to Gaia (self-rebuild) or any subordinate agent.

**When:**
- Major architecture migration (v1.x → v2.0 or later)
- Agent has drifted significantly from current architecture standards
- André explicitly requests a clean rebuild of an agent

**Parameters:**
- `agent` — name of the agent to rebuild (e.g. "Gaia", "Alex")
- `date` — YYMMDD string for backup directory name (e.g. "26-04-06")
- `self` — boolean: true if Gaia is rebuilding herself, false if rebuilding a subordinate

**How:**

*Phase 1 — Backup*
1. Create `2 AI Exchange/[Agent]/backups/[date]/` directory
2. Copy all current agent files to the backup directory:
   - Own files: `system-prompt.md`, `memory.md`, `archive.md`, `functions.md`, `tasks.md`, `evolution.md` (Gaia only), any other files in the agent dir
   - Own subdirs: `public/`, `inbox/`, `messages/` — copy with contents
   - If self-rebuild: also copy shared files (`message-template.md`, `project-prompt-template.md`, `agents.md`) into the backup
3. Create `backups/backups.md` as an index and context file:
   - What date the backup was taken
   - What architecture version it captures
   - What triggered the rebuild
   - Table of all backed-up files with brief notes
   - What is NOT backed up (e.g. thread files, domain folders — not agent config)

*Phase 2 — Recreate shared files (self-rebuild only)*
If rebuilding Gaia (root of the system), also recreate shared files:
1. `2 AI Exchange/core.md` — copy from test environment or write fresh
2. `2 AI Exchange/boot-template.md` — copy from test environment or write fresh
3. `agents.md` (vault root) — slim version: frontmatter + What This Is + agent table + cold-boot instructions

*Phase 3 — Recreate agent files (v2.0 structure)*
Create the following files in `2 AI Exchange/[Agent]/`:

1. **`boot.md`** — identity + load sequence (Project Instructions):
   - Frontmatter (created_by, created_on, type: boot)
   - Version header: `v2.0 | Created: [date] | Domain: [domain]`
   - Note: paste below frontmatter as Project Instructions
   - Identity: who this agent is (2-4 lines)
   - Personal space reference: `2 AI Exchange/[Agent]/`
   - Load sequence: greet → memory.md → core.md → system.md → index.md → on demand
   - Cold-boot fallback: read `agents.md` first if no Project Instructions
   - Footnote

2. **`system.md`** — slow-changing domain content:
   - Frontmatter (type: system)
   - Version header + "slow-changing" note
   - `## Role` — handles / does not handle / escalate to
   - `## Vault Scope` — reads by default / on demand / does not read
   - `## Domain` — current briefing, key people, active projects
   - `## Operating Principles` — 4-6 agent-specific principles
   - `## Tone and Style`
   - `## Key Files and Functions` — references to functions.md and key vault files
   - `## Changelog` — v2.0 entry at minimum
   - For self-rebuild (Gaia): also add `## Git Operations` section

3. **`index.md`** — agent-maintained resource map:
   - Frontmatter (type: index)
   - Own files table
   - Shared files table
   - Domain-specific sections (threads, key vault files, etc.)
   - External resources table (paths, URLs, config locations)

4. **`memory.md`** — preserve existing content, prepend a new session entry noting the rebuild

5. **`archive.md`** — preserve as-is

6. **`functions.md`** — preserve as-is; update `Create New Agent` function to reflect v2.0 structure if rebuilding Gaia

*Phase 4 — Consolidate messages (if any exist)*
If the agent has content in `inbox/` or `messages/`:
1. Create `messages-archive.md` as a flat, append-only log
2. Write one entry per message: date, direction, subject, 1-2 line summary
3. Do NOT copy the full message files — just the history log
4. The old `inbox/` and `messages/` dirs remain in the backup; don't recreate them

*Phase 5 — Context dump (self-rebuild only)*
If rebuilding Gaia (the session will end and restart in a new model/context):
1. Create `2 AI Exchange/Gaia/OPUS-HANDOFF.md` (or similar name for the target model)
2. Contents:
   - What just happened this session (summary)
   - New file structure and what to read first
   - What was NOT finished (pending work)
   - Key decisions made
   - Urgent items and deadlines
   - André's current situation snapshot
   - What to do first in the new session
   - Note to delete this file after loading

*Phase 6 — Commit*
1. `vault-mcp:git add .`
2. `vault-mcp:git commit -m "[agent]-v2-rebuild-[date]"`
3. `vault-mcp:git push`
4. Tell André: "Rebuild complete. Boot the new session by pasting `boot.md` as Project Instructions."

**Self vs. subordinate differences:**

| Step | Self-rebuild (Gaia) | Subordinate rebuild |
|---|---|---|
| Shared files | Recreate `core.md`, `boot-template.md`, `agents.md` | Skip — shared files already exist |
| Context dump | Create `OPUS-HANDOFF.md` | Skip — no session handoff needed |
| Backup includes | Agent files + shared files | Agent files only |
| Memory.md | Add rebuild entry | Add rebuild entry |
| Post-rebuild | André restarts with new boot.md | Agent ready for next session as-is |

**Notes:**
- Thread files (`1 OFP/Threads/`) are never part of the backup — they are André's data, not agent config
- Domain folders (Janea Akuvo, Key Bridge, Cocoricó) are never backed up — not agent config
- The backup is a safety net, not an archive — it's there if something goes wrong, not for regular reference
- `tasks.md` (Gaia only) and `evolution.md` (Gaia only) are preserved as-is, not rebuilt
- `functions.md` is preserved as-is unless a specific function needs updating (e.g. `Create New Agent` after architecture change)

---

## Function: Version Agent

**What:** Bump an agent's version number and record what changed.

**When:** When an agent's files are meaningfully updated. Use judgment:
- **Patch (vX.Y.Z)** — typo fixes, minor wording clarifications, small factual updates
- **Minor (vX.Y)** — new function added, protocol change, tone/style adjustment, domain context updated
- **Major (vX.0)** — structural redesign, architecture change, fundamental role shift

Current architecture migration (v1.x → v2.0) = major bump for all agents.

**How:**
1. Identify which files carry the version header (`boot.md` and `system.md`)
2. Update the version string in both headers
3. Add a changelog entry at the bottom of `system.md`:
   ```
   ## Changelog
   - v2.0 (2026-04-06) — migrated to new architecture: boot.md + system.md + core.md + index.md
   - v1.1 (2026-03-29) — added Claude Code interface section
   - v1.0 (2026-03-27) — created
   ```
4. Update `memory.md` with a note that the agent was versioned
5. Include in the session's git commit

**Version format:** `vMAJOR.MINOR` (no patch for now — keep it simple)

---

## Function: Weekly Review
**Current version:** 1 (April 2026)

**Changelog:**
- v0 (March 2026) — Gaia writes the full review herself based on conversation with André. Single file output.
- v1 (April 2026) — Three-phase model: (1) Gaia writes briefing section before André starts, (2) André writes the review in his own voice as a personal time capsule, (3) Gaia adds assessment section after André finishes. Review file is primarily André's writing. Gaia never edits what André wrote. Token-efficient briefing protocol established.

**What:** Facilitate the weekly review session. Gaia opens with a briefing, André writes, Gaia closes with an assessment.

**When:** Sunday night or Monday morning. Trigger on "weekly review" or similar intent.

**How:**

*Phase 1 — Gaia's Briefing (before André writes):*
1. `filesystem:read_text_file` — `1 OFP/Thread Index.md` (fast overview, ~3KB)
2. `vault-mcp:git log --oneline --since=<last Sunday>` — what changed in the vault this week
3. `filesystem:read_text_file` — most recent file in `1 OFP/Weekly Reviews/` (what was committed to last week)
4. `filesystem:read_text_file` — individual thread files only if Thread Index is insufficient for a specific item
5. Create new review file from template: `1 OFP/Weekly Reviews/YYYY-MM-DD.md`
6. Fill in the `## 📋 Gaia's Briefing` section: what moved, what didn't, urgent/overdue items, thread changes since last review
7. Tell André the file is ready in Obsidian

*Phase 2 — André writes (Gaia waits):*
- André opens the file in Obsidian and writes the review in his own voice
- Gaia does not touch the file during this phase
- When André says "done" or "review done", proceed to Phase 3

*Phase 3 — Gaia's Assessment (after André writes):*
1. `filesystem:read_text_file` — read what André wrote
2. Append to `## 📊 Gaia's Assessment` section: patterns noticed, blind spots, things worth naming that André might not have
3. Update `meta-weekly-review-ritual` thread: status, next due date
4. Update `memory.md` with any new strategic context

**Token efficiency rule:** The briefing must be completable from Thread Index + git log + last review alone. Only open individual thread files if something specific requires verification. An accurate Thread Index is the prerequisite for a cheap review.

**Modes:** Full (~20 min), Minimal (~5 min), Re-entry (~2 min). In minimal/re-entry mode, skip Phase 3 assessment.


---

## Function: Create New Agent

**What:** Design and initialize a new specialized agent in the vault system.

**When:** When a domain or recurring task type has enough depth and frequency to warrant its own dedicated agent.

**How:**
1. Define the agent's name, role, scope, and primary vault folders with André
2. Create directories:
   - `2 AI Exchange/<AgentName>/`
   - `2 AI Exchange/<AgentName>/public/`
   - `2 AI Exchange/<AgentName>/inbox/`
3. Create `system-prompt.md` using this standard structure:
   - **Header:** agent name, version (start at `v1.0`), creation date, domain(s)
   - Identity & name
   - Role (what it does and does NOT do)
   - **Primary vault scope:** which folders the agent reads by default, and which it explicitly ignores
   - **Messaging rule:** any strategic, cross-domain, or life-level question → write a message file to the target agent's `inbox/` using the standard format (`YYYY-MM-DD_<AgentName>_<topic>.md`), then notify André to bring it to that agent's next session
   - **Inter-agent awareness:** always read `agents.md` to know who else exists; read other agents' `public/profile.md` for instructions
   - Operating principles
   - Session start protocol: **greet first, then read progressively** — memory.md first, inbox second, everything else on demand. Never block first response on file reads.
   - Timezone: **BRT, UTC-3, Niterói/RJ, Brazil** ← include in every agent
   - Tone & style
   - Memory update protocol (same pattern as Gaia: memory.md active, archive.md on demand)
4. Create `memory.md` with founding session entry
5. Create `archive.md`
6. Create `functions.md` with at least one initial function definition
7. Create `public/profile.md` with agent's role, scope, and inbox instructions
8. Update `agents.md` to register the new agent under "The Agents" section
9. Update `2 AI Exchange/Gaia/memory.md` to note the new agent was created
10. Commit to git via vault-mcp

**Standard files per agent:**
```
2 AI Exchange/<AgentName>/
├── system-prompt.md
├── memory.md
├── archive.md
├── functions.md
├── public/
│   └── profile.md          ← read-only identity; includes inbox instructions
├── inbox/              ← public write-only; senders drop messages here
├── messages/
│   ├── ingested/          ← read, no action needed
│   ├── pending/           ← read, action required
│   ├── dispatched/        ← handled
│   └── archived/          ← closed or stale
└── db/                 ← optional; only when real domain knowledge exists
    ├── README.md
    └── <topic>.md
```

`db/` is optional — only create when there is real content to seed it. Do not create empty databases.
Message filename: `YYMMDDHHMM_[Sender]_[Subject-with-hyphens].md`
Message template: `2 AI Exchange/message-template.md`

Also create the 4 message subdirectories:
- `2 AI Exchange/<AgentName>/messages/ingested/`
- `2 AI Exchange/<AgentName>/messages/pending/`
- `2 AI Exchange/<AgentName>/messages/dispatched/`
- `2 AI Exchange/<AgentName>/messages/archived/`

When creating `archive.md`, use this header:
```
# <AgentName> — Archive
*Long-term memory. Do NOT load at session start — only on explicit request or memory gap.*
```

---

## Function: Capture & Process

**What:** Help André process items sitting in the root inbox, `4 To Follow Up/`, or his head — decide what to do with each.

**When:** When André has a backlog of unprocessed notes, or when `4 To Follow Up/` is getting stale.

**How:**
1. List the items to process
2. For each, apply: **Delete / Archive / Promote** (move to a domain folder or `1 OFP/`) / **Defer** (stays in `4 To Follow Up/` with a note)
3. Never delete without confirming with André
4. Update `memory.md` if any captures reveal new context about his situation

---

## Function: Vision Review & Update

**What:** Review and update `1 OFP/Vision.md` to keep it current as André's situation evolves.

**When:** Quarterly, or when a major shift occurs (new job, restaurant decision, new business idea, significant personal change).

**How:**
1. Read current `Vision.md` and recent `Reviews/` entries
2. Identify what's stale, what's missing, what's changed
3. Propose updates conversationally — don't rewrite without dialogue
4. After agreement, update the file and note the revision date
5. Check if `agents.md` key facts section also needs updating

---

## Function: Thread Update

**What:** Update one or more threads in the Master List — change status, update Next step, add notes, move to Closed or Archived.

**When:** Any time André reports progress, completes something, or reprioritizes. Also during weekly review.

**How:**
1. Read `1 OFP/Master List.md`
2. Locate the relevant thread(s)
3. Update: status, Next step, Notes, due date as appropriate
4. If closed: move thread block to ## Closed section with completion date in Notes
5. If archived: move to ## Archived with reason
6. Update the footer `Last updated` date
7. Note significant status changes in `memory.md` if strategically relevant

For `routine` threads: update Notes with `Last done: YYYY-MM-DD` instead of closing.

---

## Function: Send Message

**What:** Compose and send a message to another agent's inbox.

**When:** When a task, question, or notification needs to be routed to a specific agent.

**How:**
1. Read the target agent's `public/profile.md` to confirm scope and inbox path
2. Compose the message using the template at `2 AI Exchange/message-template.md`
3. Set `type` correctly: `notification` | `request` | `reply` | `escalation`
4. Set `origin_ref` to the root message filename if this is part of a chain, or `root` if first
5. Save to target agent's `inbox/` with filename: `YYMMDDHHMM_Gaia_[Subject-with-hyphens].md`
6. Tell André: *"I've sent a [type] to [Agent] about [topic]. Bring it to their next session."*
7. Note in `memory.md` if the message is strategically significant

---

## Function: Process Inbox

**What:** Read and route all messages sitting in Gaia's inbox.

**When:** At every session start, after greeting André. Also on explicit request.

**How:**
1. List all files in `2 AI Exchange/Gaia/inbox/`
2. For each message file:
   a. Read the message
   b. Fill in `**Date read:** YYYY-MM-DD HH:MM BRT` in the Lifecycle section
   c. Decide: does this require action, decision, or follow-up?
      - **No** → move to `messages/ingested/`
      - **Yes** → move to `messages/pending/`
3. For `pending` messages: surface to André and determine next action
4. For `dispatched` messages: when handling is complete, fill `**Date dispatched:**` and move to `messages/dispatched/`
5. For old/stalled messages: fill `**Date archived:**` and move to `messages/archived/`

Note: "moving" a file means writing it to the destination and deleting the original. Since filesystem MCP has no move/delete, write to destination first, then overwrite source with a redirect stub:
```
# Moved
This message has been moved to: messages/[state]/[filename]
```

---

## Function: Thread Capture

**What:** Add a new thread to the Master List from something André mentions.

**When:** André mentions a todo, intention, concern, or aspiration not already in the Master List.

**How:**
1. Determine type, domain, initial status (usually `registered` unless context is clear)
2. Write Next step if obvious, otherwise —
3. Add to appropriate domain section in `1 OFP/Master List.md`
4. If unqualified (type/domain unclear): add to ## Unqualified section
5. Update footer `Last updated` date

---

## Function: Asana Sync

**What:** Create, update, or close tasks in Gaia One (Asana) to reflect Master List thread states.

**When:** When a thread changes state, next step changes, or during weekly review.

**Gaia One GIDs:**
- Project: `1213847489121972`
- Domain custom field: `1213847448665011`
- Section Prioritized: `1213848089615369`
- Section Open: `1213848053325711`
- Section Dormant: `1213848120073607`

**How:**
1. Identify threads with state or next-step changes
2. New prioritized/open: create Asana task, set Domain, add to correct section, note `asana:GID` back in Master List
3. Closed threads: mark Asana task complete
4. State changes: move task to correct section
5. Next step changes: update task notes

**Rule:** Master List is always source of truth. Asana reflects it, not the reverse.

---

## Function: Create Claude Code Agent (CLAUDE.md)

**What:** Bootstrap a Claude Code session so it behaves as a full vault-connected agent — same identity, same memory, same protocols as Claude Desktop agents.

**When:** When adding a new project that an existing agent should work in via Claude Code, or when creating a new agent that has both a strategic (Desktop) and coding (Code) interface.

**How:**
1. Identify the agent and the project directory
2. Read the agent's `system-prompt.md` and `memory.md` from the vault
3. Read the project's existing context (README, AGENTS.md, pyproject.toml, directory tree)
4. Write `CLAUDE.md` to the project root with:
   - **Session start protocol** — greet immediately, then load vault progressively: `memory.md` → `inbox/` → domain notes → relevant threads
   - **Vault path** — absolute path to vault via filesystem MCP symlink
   - **Identity** — who the agent is, what it handles, what it doesn't
   - **Project-specific context** — repo architecture, setup commands, conventions (keep lean — time-varying context lives in `memory.md`)
   - **Memory update protocol** — both interfaces update the same `memory.md`
   - **Messaging protocol** — same inbox rules as Desktop
5. Create `.claude/settings.json` with deny rules for `.env` and secrets
6. Update the agent's `system-prompt.md` in the vault with a "Claude Code Interface" section
7. Update the agent's `memory.md` to log the setup
8. Note in evolution.md if `~/.claude/settings.json` needs updating for vault MCP access

**Key principle:** `CLAUDE.md` is a bootstrap file, not a context dump. Only put things that are always true (vault path, repo conventions, session protocol). Everything time-varying lives in the vault.

**The model:**
```
CLAUDE.md          → "I am [Agent], here's where my brain is"
memory.md          → "here's what's happening right now"
domain notes       → "here's the raw project material"
Threads/           → "here's what I'm working on"
```

**Global MCP requirement:** Claude Code needs `~/.claude/settings.json` with the same `mcpServers` block as `claude_desktop_config.json` to access the vault. Check with André if not already configured.

---
*Created: March 2026 | Renamed from tasks.md: 2026-03-27*
