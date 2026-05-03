---
created_by: Alex claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: function
updated_by: ''
updated_on: ''
---

# mcp-deploy-pipeline

End-to-end pipeline for shipping a change to an MCP server (primary case: `aae-mcp`). Covers the cache-bust, the config edit, the backup, and the verify-before-restart discipline.

## When

- Adding, modifying, or removing tools in `aae-mcp` (or any of my MCP servers).
- Renaming a server, registering a new one, or deregistering an old one.
- Editing `claude_desktop_config.json` for any reason.
- Cutting over from one server version to the next.

## How

1. **Code change.** Add/edit tools in `aae-mcp/aae_mcp/tools/<name>.py`. Register new modules in `aae_mcp/server.py`.
2. **Bump the minor version IF tool descriptions changed** — in two places, both must match:
   - `aae_mcp/server.py` → `FastMCP("aae-mcp-X.Y")`
   - `claude_desktop_config.json` → key name `"aae-mcp-X.Y"`
   This busts Claude Desktop's per-conversation tool-list cache. The only reliable cache-bust short of a fresh conversation.
3. **Tests.** Run `python tests/test_all.py` (unit). For changes touching `spawn`, also `AAE_SPAWN_LIVE=1 python tests/test_all.py` (live, 1 real spawn).
4. **Update the config backup.** Write a copy of the new `claude_desktop_config.json` to `2 AI Exchange/Alex/db/claude_desktop_config.backup.json` (legacy v2 location; v3 destination TBD). If the live config is ever wiped: read the backup, write it back, verify with a read, then restart.
5. **Restart Claude Desktop + open a new conversation** to pick up changes. Tool list is cached per conversation; existing conversations won't see the change.
6. **Verify in the fresh conversation** that the new tools are visible and behave. Don't declare done before you've actually called one.

## Symlinks helper (legacy v2 — kept for reference)

For setting up the centralized `C:\Users\tdsnit\agents\` directory via `mklink /J`. The symlink approach has known limits with filesystem MCP (it validates the symlink **target** against the allowlist), so this is no longer the primary path — but useful for raw-FS work that bypasses MCP allowlists.

- Single item: `mklink /J "C:\Users\tdsnit\agents\<name>" "<real_path>"` (resolve real path with `os.path.realpath` if input is itself a symlink).
- Batch (CSV/TSV): `csv.DictReader` with auto-detect dialect; for rows where `symlink=yes`, resolve real path first; build `mkdir` then `mklink /J`.
- Encoding: TSV from Excel/Sheets is often latin-1 — try `['utf-8-sig', 'utf-8', 'latin-1']` in order.
- Output convention: present commands inline, save to a vault note, and execute via `shell` only if André says go.

## Bounds

- **Don't run `git`.** André commits manually. v3 dropped the `git` tool from aae-mcp on purpose.
- **Don't write "restart and test" then move on.** Test first. Restart once.
- **Don't bump the version for code-only changes** that don't affect tool descriptions. Cache-bust is for the tool catalog, not for source.

## Paths

- aae-mcp repo: `C:\Users\tdsnit\Work26\agents\aae-mcp\`
- vault-mcp repo (being archived post-cutover): `C:\Users\tdsnit\Work26\agents\vault-mcp\`
- Claude Desktop config: `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`
- Config backup (legacy v2 location): `2 AI Exchange/Alex/db/claude_desktop_config.backup.json`
