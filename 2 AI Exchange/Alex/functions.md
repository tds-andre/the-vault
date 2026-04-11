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

## Function: Create Symlinks

**What:** Generate `mklink /J` commands to create directory junctions in the central `C:\Users\tdsnit\agents\` folder, and optionally execute them.

**When:** André asks to symlink a path (inline or via CSV/TSV), or when adding new paths to the agents directory.

**Central folder:** `C:\Users\tdsnit\agents\`
**Input columns (CSV/TSV):** `original dir`, `link name`, `symlink` (yes = path is itself a symlink, resolve to real target first)

**How:**
1. **Single item** — André says e.g. "create a symlink for `C:\Users\tdsnit\.cache`"
   - Resolve real path if it's a symlink chain: `os.path.realpath(path)`
   - Derive link name from last path component, or use one André specifies
   - Generate: `mklink /J "C:\Users\tdsnit\agents\<name>" "<real_path>"`
2. **Batch via CSV/TSV** — André attaches a file
   - Read with `csv.DictReader`, auto-detect dialect (tab vs comma)
   - For each row where `symlink=yes`: resolve real path first
   - Build `mkdir` commands for all needed subdirectories, then `mklink /J` for each
3. **Output** — default: present commands inline and save to a vault note
4. **Execute** — if André says "go ahead and run it": use `run` tool with `cmd.exe /C <cmd>` per line

**Encoding note:** TSV files from Excel/Sheets may be latin-1 — try `['utf-8-sig', 'utf-8', 'latin-1']` in order.

**Note path for output:** `2 AI Exchange/Alex/db/symlinks-bootstrap.md`

---
*Created: 2026-03-27 | Cleaned up: 2026-04-07*
