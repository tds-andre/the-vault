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

## Function: MCP Config Backup

**What:** Keep a backup of `claude_desktop_config.json` in the vault so it can be restored if Claude or any other process wipes it.

**When:** Any time the config is modified — new server added, server renamed, paths changed.

**Backup location:** `2 AI Exchange/Alex/db/claude_desktop_config.backup.json`

**Config location:** `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`

**How:**
1. After every config change, write a copy to the backup location using `filesystem:write_file`
2. If the config is ever wiped: read the backup and write it back to the config location
3. Verify with `filesystem:read_text_file` that the restore looks correct before restarting Claude Desktop

---
*Created: 2026-03-27 | Cleaned up: 2026-04-07*
