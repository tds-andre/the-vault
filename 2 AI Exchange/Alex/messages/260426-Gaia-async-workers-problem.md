---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: '2026-04-26'
type: message
updated_by: ''
updated_on: ''
---

---
from: Gaia
to: Alex
date: 2026-04-26
status: unread
priority: normal
---

# Async Workers — Problem Description

André wants to be able to run Claude Code CLI as async subprocesses — one per active conversation. The goal is for agents to delegate tasks that run autonomously in the background without André being present, and without blocking the orchestrator.

## The core problems to solve

**1. Concurrency**
Multiple conversations may be active simultaneously. Each needs its own Claude Code subprocess. These need to run independently — one slow or hung subprocess should not affect the others.

**2. Blocking on MCP tool calls**
Claude Code CLI will sometimes call MCP tools that wait for external responses — for example, waiting for a WhatsApp reply, a network call, or a long-running bash command. During that wait, the subprocess is blocked. The orchestrator needs to handle this gracefully — knowing when a worker is hung vs. legitimately still working, and being able to recover or retry if needed.

**3. Result handoff**
When a subprocess completes, the orchestrator needs to know about it and be able to consume the result. The result needs to land somewhere predictable and be distinguishable from in-progress or failed runs.

**4. Failure handling**
Subprocesses can fail silently, produce malformed output, or time out. The orchestrator needs enough observability to detect these cases and act on them — retry, escalate, or notify André.

**5. Context sufficiency**
Each Claude Code subprocess starts fresh — no shared memory with the Chat agents. The task it receives needs to be self-contained enough to produce a useful result without access to the full session context. Designing the right task format is part of this problem.

## Constraints
- Claude Code CLI is already installed on the main PC
- The vault is the shared filesystem — both orchestrator and workers can read/write it
- PM2 is available for process management
- WhatsApp (Baileys) is the notification channel to André
- Keep it local — no cloud infrastructure for now

## What we're NOT asking for yet
Not asking for a full implementation — just your thinking on the architecture: what the right shape of this system is, what the failure modes are, and what you'd want to validate before building.
