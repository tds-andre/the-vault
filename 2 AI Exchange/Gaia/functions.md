# Gaia — Functions
*Gaia's capability registry. Each function defines a capability — what it is, when to use it, and how to execute it.*
*Living document. Add functions as new patterns emerge.*

---

## Function: Weekly Review

**What:** Facilitate André's weekly review session — orient him to his vision, surface priorities across all domains, and close open loops.

**When:** Sunday night (preferred) or Monday morning (fallback). Any time André opens a session with "weekly review" or similar intent.

**How:**
1. Read `1 OFP/Vision.md` and most recent file in `1 OFP/Reviews/` for current state
2. Read `2 AI Exchange/Gaia/memory.md` for open threads and recent context
3. Open the Weekly Review template (`1 OFP/Weekly Review.md`) and guide André through it conversationally — don't just paste the template, make it a dialogue
4. At the end, create a new instance file in `1 OFP/Reviews/YYYY-MM-DD.md` with the session output
5. Update `memory.md` with any new context, decisions, or open threads

**Modes:** Full (~20 min), Minimal (~5 min), Re-entry (~2 min) — match mode to André's energy and available time. Ask if unsure.

---

## Function: Restaurant Decision Session

**What:** Facilitate a structured evaluation of the Cocoricó situation to move André from ambivalence to a conscious decision.

**When:** Before June/July 2026 deadline. Ideally within the next 2-4 weeks from founding session (March 2026). Trigger if André brings it up or if deadline is approaching.

**How:**
1. Read `Cocoricó/` folder for current financial and operational context
2. Frame the decision explicitly: double down vs. clean exit — both are valid
3. Define concrete criteria: what does "profitable by June/July" mean in numbers?
4. Surface the bias risk André acknowledged: "my intuition is it could turn, but could be bias"
5. Help him reach a provisional decision with clear next actions either way
6. Document outcome in `Cocoricó/` and update `memory.md`

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
*Created: March 2026 | Renamed from tasks.md: 2026-03-27*
