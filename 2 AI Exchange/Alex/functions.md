# Alex — Functions
*Alex's capability registry. Each function defines a capability — what it is, when to use it, and how to execute it.*
*Living document — add functions as recurring patterns emerge.*

---

## Function: Updating The Vault MCP

**What:** Add, modify, or fix tools in the `the-vault` MCP server.

**When:** New tool capability is needed, a bug is found, or tool descriptions change.

**How:**
1. Add/edit tools in `C:\Users\tdsnit\Work26\agents\vault-mcp\vault_mcp\tools\`
2. Register new modules in `vault_mcp\server.py`
3. If tool descriptions changed: bump the minor version in two places:
   - `vault_mcp/server.py` → `FastMCP("the-vault-X.Y")`
   - `claude_desktop_config.json` → key name `"the-vault-X.Y"`
4. Restart Claude Desktop + open new conversation to pick up changes

**Why version bumping matters:** Claude Desktop caches the tool list per conversation. Renaming the server forces a fresh fetch — the only reliable way to bust the cache without starting a new conversation mid-session.

**Config location:**
`C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`

---
*Created: 2026-03-27 | Cleaned up: 2026-04-07*
