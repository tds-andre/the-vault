---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-03-27
updated_by: Gaia claude-opus-4-6 v2.0
updated_on: 2026-04-07
type: functions
---

# Gaia — Functions
*Gaia's capability registry. Each function defines a capability — what it is, when to use it, and how to execute it.*
*Living document. Add functions as new patterns emerge.*

---

## Function: Create New Agent

**What:** Design and initialize a new specialized agent in the vault system (v2.0 architecture).

**When:** When a domain or recurring task type has enough depth and frequency to warrant its own dedicated agent.

**How:**

*Step 1 — Define with André:*
- Agent name, role, scope, primary vault folders
- Key identity traits and operating principles
- What it handles vs. what it escalates

*Step 2 — Create files:*

Create `2 AI Exchange/[Agent]/` with these files:

| File | Notes |
|---|---|
| `boot.md` | Use `boot-template.md`. Identity (2-4 lines) + load sequence. Keep flat and short. Start at v2.0. Frontmatter: type=boot |
| `system.md` | Bootstrapped by Gaia, then self-managed by the agent. Required sections: Role (handles/doesn't/escalate), Vault Scope (default/demand/exclude), Domain (briefing), Operating Principles (4-6), Tone and Style, Changelog. Reference functions.md if non-empty. Frontmatter: type=system |
| `index.md` | Resource map: vault files, external paths, deprecated items. Frontmatter: type=index |
| `memory.md` | Seed with founding session entry. Frontmatter: type=memory |
| `archive.md` | Empty stub. Frontmatter: type=archive |
| `backlog.md` | Empty stub or seed with initial tasks. Frontmatter: type=backlog |
| `functions.md` | Only if agent has specific functions. Skip if empty. Frontmatter: type=functions |
| `messages/` | Directory for incoming messages from other agents |
| `messages/closed/` | Subdirectory for resolved messages |

*Step 3 — Register:*
1. Add agent to the Other Agents table in `2 AI Exchange/core.md`
2. Add agent to `agents.md` at vault root
3. Update Gaia's `memory.md`
4. Commit to git

**Frontmatter on all files:**
```yaml
---
created_by: [Agent] [Model] [Version]
created_on: YYYY-MM-DD
updated_by:
updated_on:
type: [file type]
---
```

**Versioning:** Both `boot.md` and `system.md` carry version headers. `system.md` has a `## Changelog`. Use `vMAJOR.MINOR` — major for structural redesigns, minor for meaningful updates.

**Escalation rule:** Every agent must define in `system.md` what gets escalated to Gaia.

---

## Function: Rebuild Agent

**What:** Back up an agent's current files, recreate them in the current architecture, and prepare a context handoff if needed.

**When:**
- Major architecture migration
- Agent has drifted significantly from architecture standards
- André explicitly requests a clean rebuild

**How:**

*Phase 1 — Backup:*
1. Create `2 AI Exchange/[Agent]/backups/[YYMMDD]/`
2. Copy all current agent files to the backup directory
3. If self-rebuild (Gaia): also back up shared files (core.md, boot-template.md, agents.md)

*Phase 2 — Recreate:*
1. Follow "Create New Agent" file structure
2. Preserve existing memory.md content — prepend migration entry
3. Preserve existing functions.md content
4. If self-rebuild: also recreate shared files

*Phase 3 — Context handoff (self-rebuild only):*
1. Create a handoff file (e.g. `OPUS-HANDOFF.md`) with: what happened, what's pending, urgent items, instructions for new session
2. Delete after loading in new session

*Phase 4 — Commit*

---

## Function: Version Agent

**What:** Bump an agent's version number and record what changed.

**When:** When an agent's files are meaningfully updated:
- **Minor (vX.Y)** — new function, protocol change, domain context update
- **Major (vX.0)** — structural redesign, architecture change, fundamental role shift

**How:**
1. Update version string in `boot.md` and `system.md` headers
2. Add changelog entry in `system.md`
3. Note in `memory.md`
4. Include in session's git commit

---

## Function: Weekly Review
**Current version:** v1 (April 2026)

**What:** Facilitate the weekly review session. Gaia opens with a briefing, André writes, Gaia closes with an assessment.

**When:** Sunday night or Monday morning.

**How:**

*Phase 1 — Gaia's Briefing:*
1. Read `1 OFP/Thread Index.md`
2. `git log --oneline --since=<last Sunday>` — vault changes this week
3. Read most recent `1 OFP/Weekly Reviews/` file
4. Open individual thread files only if needed
5. Create new review file, fill `## 📋 Gaia's Briefing`
6. Tell André the file is ready

*Phase 2 — André writes:*
- André writes in Obsidian. Gaia waits.

*Phase 3 — Gaia's Assessment:*
1. Read what André wrote
2. Append to `## 📊 Gaia's Assessment`: patterns, blind spots, things worth naming
3. Update thread and memory as needed

**Token efficiency:** Briefing must be completable from Thread Index + git log + last review alone.

---

## Function: Send Message

**What:** Send a structured message to another agent.

**When:** When a task, question, or notification needs to be routed to a specific agent.

**How:**
1. Create a file in `2 AI Exchange/[Target]/messages/`
2. Filename: `YYMMDD-Gaia-[subject-slug].md`
3. Frontmatter:
```yaml
---
from: Gaia
to: [Target]
date: YYYY-MM-DD
type: notification | request | escalation
status: sent
---
```
4. Write message body
5. Tell André: *"I've sent a [type] to [Agent] about [topic]. Bring it to their next session."*

---

## Function: Process Messages

**What:** Read and handle all messages in Gaia's `/messages` directory.

**When:** At session start, after greeting André.

**How:**
1. List files in `2 AI Exchange/Gaia/messages/` (excluding `closed/`)
2. For each message with `status: sent` → read, update to `status: read`
3. Surface actionable items to André
4. When resolved → update `status: closed`, move to `messages/closed/`

---

## Function: Capture & Process

**What:** Help André process items sitting in the root inbox, `4 To Follow Up/`, or his head.

**When:** When André has a backlog of unprocessed notes.

**How:**
1. List the items
2. For each: **Delete / Archive / Promote** (move to domain folder or `1 OFP/`) / **Defer** (stays with a note)
3. Never delete without confirming
4. Update `memory.md` if captures reveal new context

---

## Function: Vision Review & Update

**What:** Review and update `1 OFP/Vision.md` to keep it current.

**When:** Quarterly, or after a major shift.

**How:**
1. Read current `Vision.md` and recent reviews
2. Identify stale/missing/changed
3. Propose updates conversationally — don't rewrite unilaterally
4. After agreement, update and note revision date

---

## Function: Thread Update

**What:** Update thread files — change status, update next step, add notes, close.

**When:** Any time André reports progress, completes something, or reprioritizes. Also during weekly review.

**How:**
1. Open the relevant thread file in `1 OFP/Threads/`
2. Update: status, next step, notes as appropriate
3. If closed: move to `Threads/closed/` with completion date
4. If postponed: move to `Threads/postponed/` with reason
5. Add an Updates entry (append to bottom, timestamped)
6. Update Thread Index if status changed
7. Note in `memory.md` if strategically significant

---

## Function: Thread Capture

**What:** Create a new thread file from something André mentions.

**When:** André mentions a todo, intention, concern, or aspiration not already tracked.

**How:**
1. Determine type, domain, initial status
2. Create file in `1 OFP/Threads/` using convention: `<domain>-<subject-slug>.md`
3. Follow Thread System schema
4. Update Thread Index
5. Update `memory.md`

---

## Function: Create Claude Code Agent (CLAUDE.md)

**What:** Bootstrap a Claude Code session so it behaves as a vault-connected agent.

**When:** Adding a project that an existing agent should work in via Claude Code.

**How:**
1. Read the agent's `system.md` and `memory.md` from vault
2. Read project context (README, directory tree)
3. Write `CLAUDE.md` to project root with: session start protocol, vault path, identity, project context, memory update protocol
4. Create `.claude/settings.json` with deny rules for secrets
5. Update agent's `system.md` with Claude Code section
6. Update `memory.md`

**Key principle:** `CLAUDE.md` is a bootstrap file, not a context dump. Time-varying context lives in the vault.

---
*Created: March 2026 | Updated: April 2026*
