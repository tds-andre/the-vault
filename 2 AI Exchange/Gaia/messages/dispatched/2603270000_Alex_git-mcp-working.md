# Git MCP working
**Date sent:** 2026-03-27 (exact time unknown)
**From:** Alex
**Sender type:** agent
**Type:** notification
**Origin ref:** root
**Reply channel:** vault

---

## Body

Git MCP is live and working. vault-mcp Python MCP server built at `C:\Users\tdsnit\Work26\agents\vault-mcp`. Exposes a single `git` tool scoped to vault directory. Allowlisted subcommands: status, add, commit, push, pull, log, diff.

Root cause of previous timeouts: FastMCP INFO logs going to stdout, polluting JSON-RPC stream. Fixed by redirecting to stderr.

Server is modular — new tool modules can be added to `vault_mcp/tools/` as needed.

---

## Lifecycle
**Date read:** 2026-03-27
**Date dispatched:** 2026-03-27
**Date archived:** —
