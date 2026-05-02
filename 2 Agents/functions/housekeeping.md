---
type: function
awareness: MA all agents
status: stub
---

# housekeeping

Maintenance routines for an agent's memory and the broader system. **In v3.0, housekeeping is manually triggered by André** (or by André asking the agent to run it). UC3's cron mechanism is deferred post-v3.0.

If housekeeping doesn't run, `sessions.md` grows unbounded, History So Far goes stale, `state.md` may bloat, and the registry can drift.

## Routines

This single file gathers all housekeeping routines. Each routine below is a section.

---

### 1. Compact sessions

**Trigger:** `sessions.md` exceeds soft target, or quarter/month rollover.

**Steps:**
1. Read `sessions.md`.
2. Identify content older than the chosen threshold (typically: keep last 2 weeks live; older goes to history).
3. Move that content as a chapter into `history.md` (chapter heading: `## YYYY-MM` or similar).
4. Refresh the "History So Far" section at the top of `sessions.md` — a rolling summary of `history.md`.
5. Save both files.

---

### 2. Prune state

**Trigger:** `state.md` size or staleness.

**Steps:**
1. Review `state.md` against current reality.
2. Move resolved or stale items to `history.md` (often as part of the next compaction) or to a dedicated `notes/[topic].md` if they merit preservation.
3. Trim the "open loops" list — closed loops should not linger.

---

### 3. Refresh History So Far

**Trigger:** after compact-sessions, or whenever the summary feels stale.

**Steps:**
1. Read `history.md` (the last 2-3 chapters at minimum).
2. Re-write the "History So Far" section at the top of `sessions.md` — concise (one short paragraph per recent chapter).

---

### 4. Registry sweep

**Trigger:** monthly, or when something in the registry feels stale.

**Steps:**
1. Read each registry file.
2. Verify paths, repos, MCPs, enablers still exist and are correct.
3. Update or flag stale entries.
4. If `functions.md` lists a function whose body file is missing — flag.

---

### 5. Inbox sweep

**Trigger:** weekly, or when inbox feels cluttered.

**Steps:**
1. Read each message in `inbox/`.
2. If the message has been processed (per the messaging protocol), move it to `inbox/archived/`.
3. If unprocessed but stale, decide: process now, or escalate to André.

---

## Conventions

- Housekeeping routines are full-mode operations. Narrow does not run housekeeping.
- Routines should be atomic — start one, complete it, save, then start the next.
- Log significant actions to `sessions.md`.
