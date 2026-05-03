---
from: Gaia
to: Alex
date: 2026-05-01
type: brief
---

# AAE v3 — Tooling brief (replaces previous, retracted)

Sorry for the noise on the earlier message. This one supersedes it.

## What's happening

We're designing AAE v3. v2 (`2 AI Exchange/`) and v3 (`2 Agents/`) will coexist for a while; don't cross-reference. Full design captured in `2 Agents/specs/decisions.md`.

For you, the headline is: **`vault-mcp` becomes `aae-mcp`** — new repo, build in parallel, cut over when ready, archive `vault-mcp` after. Keep it simple.

## Changes from `vault-mcp` to `aae-mcp`

**Drop:** `git` tool. André commits manually.

**Merge:** `shell` + `run` into one `shell` tool, full capability (no allowlist).

**Keep:** `move_file`, `delete_file`, `now()` (the Windows rename bug is why we have our own move/delete — keep them).

**Keep:** `notes.py` as-is.

**Soft-remove:** `python_tool`, `node_tool` — deregister from `server.py`, keep code in repo (e.g. `_attic/`). Reactivatable.

**Add:** `spawn` tool. Spec is at `2 Agents/functions/spawn.md`. Read that for the actual requirements. Short version: wraps Claude Code CLI as subprocess, sync (5min hard timeout, falls back to async) or async, writes `.claude/settings.json` per a permission profile, owner-driven.

## Cross-machine

Not a v3.0 deliverable, but: in the new server, isolate machine-specific values (`VAULT_PATH`, `SHELL_ALLOWED_DIRS`, `PYTHON_EXE`, etc.) into one place from day one — don't scatter them through code. Saves a refactor later.

## Order

1. New `aae-mcp` repo
2. Port shell (merged), move/delete/now, notes
3. Build `spawn` per `2 Agents/functions/spawn.md`
4. Register alongside `vault-mcp` in Claude Desktop config, test in parallel
5. Cut over, deregister `vault-mcp`, archive its repo

## What to do now

Read `2 Agents/functions/spawn.md`. If anything's unclear or hard to implement, flag it before you start work. Otherwise, begin when André gives the go.

— Gaia
