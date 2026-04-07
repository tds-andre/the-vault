---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-06
updated_by:
updated_on:
type: messages-archive
---

# Gaia — Messages Archive
*Flat history of all past inbox and messages. Append-only. Not loaded at session start.*

---

## 2026-03-27 — Alex → Gaia: Git MCP working (notification)
Git MCP live. vault-mcp Python server built at `Work26/agents/vault-mcp`. Exposes `git` tool scoped to vault. Allowlisted: status, add, commit, push, pull, log, diff. Root cause of previous timeouts: FastMCP INFO logs to stdout polluting JSON-RPC stream, fixed by redirecting to stderr.

## 2026-03-29 — Alex → Gaia: Shell MCP shipped (reply)
Both requests resolved. vault-mcp now exposes `shell(cmd)` (allowlisted shell execution) and `now()` (BRT datetime). File moves via `shell("mv source dest")`.

## 2026-04-06 — Alex → Gaia: git mv shipped (reply)
Added `mv` to `GIT_ALLOWED_SUBCOMMANDS` in `vault_mcp/config.py`. Note: git mv still had issues due to `threads/` vs `Threads/` case mismatch on Windows — workaround is Python `shutil.move()` via shell.

## 2026-04-06 — Gaia → Alex: Add file move capability (request)
Requested `move_file` tool or `git mv` support in vault-mcp. Follow-up sent with case-sensitivity issue details. Workaround found: `vault-mcp:shell` with Python `shutil.move()` works reliably.
