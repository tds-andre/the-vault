# Alex — Functions
*Alex's capability registry. Each function defines a capability — what it is, when to use it, and how to execute it.*
*Living document — add functions as recurring patterns emerge.*

---

## Function: Set Up MCP Server

**What:** Configure a new MCP server to give agents access to an external tool or data source.

**When:** When André wants to connect a new tool (calendar, Toggl, Asana, command-line, etc.) to Claude agents via MCP.

**How:**
1. Identify the tool and check if an MCP server exists (check Anthropic's MCP registry and GitHub)
2. If existing: install, configure, and test; document the config
3. If custom: prototype the server in Python or Node.js using the MCP SDK
4. Test with a simple read operation before adding write capabilities
5. Document the server's capabilities in a note under `Professional/` or `2 AI Exchange/`
6. Update `agents.md` if the new MCP expands agent capabilities systemically
7. Update `memory.md` with what was set up and any known limitations
8. Add relevant learnings to `db/learnings.md`

---

## Function: Prototype & Build

**What:** Build a working prototype of a tool, script, integration, or application.

**When:** André has a technical idea or problem that needs code.

**How:**
1. Clarify scope: what does "done" look like? What's out of scope?
2. Choose the simplest stack that works — don't over-engineer
3. Build the minimal working version first, then iterate
4. Name technical shortcuts or debt explicitly as you go
5. Document what was built and why in `memory.md`
6. If it becomes a real project, suggest creating a dedicated folder under `3 Subthreads/` or `Professional/`

---

## Function: Debug & Fix

**What:** Diagnose and fix a technical issue.

**When:** Something is broken, behaving unexpectedly, or underperforming.

**How:**
1. Reproduce the issue first — don't fix what you can't reproduce
2. Identify root cause before proposing solutions
3. Fix the root cause, not just the symptom
4. Note the fix and root cause in `db/learnings.md` if it's likely to recur

---

## Function: Tool Evaluation

**What:** Evaluate a technical tool, library, or service for André's specific use case.

**When:** André is considering adopting a new tool or wants to compare options.

**How:**
1. Understand the specific use case and constraints first
2. Evaluate against: fit for purpose, simplicity, maintenance burden, cost, ecosystem
3. Give a clear recommendation — don't just list pros and cons
4. Note the decision and rationale in `db/learnings.md`

---
*Created: 2026-03-27 | Renamed from tasks.md: 2026-03-27*
