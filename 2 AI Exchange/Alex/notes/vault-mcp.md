---
created_by: Alex claude-sonnet-4-6 v1.0
created_on: '2026-04-10'
type: specialized-note
updated_by: ''
updated_on: ''
---

## Overview
`the-vault` is André's custom Python MCP server — the infrastructure layer that gives Claude agents shell, git, file, note, and scripting capabilities. It's modular by design: each capability lives in its own `tools/` module, registered at startup.

**Repo:** `C:\Users\tdsnit\Work26\agents\vault-mcp\`
**Entry point:** `server.py` → imports `vault_mcp/server.py` → registers all tool modules
**Current server name:** `the-vault-2.1` (versioned to bust Claude Desktop tool cache)
**Python:** 3.14 at `C:\Users\tdsnit\AppData\Local\Programs\Python\Python314\python.exe`

## Details

### Architecture
```
vault-mcp/
├── server.py                  # entry point — mcp.run(transport="stdio")
└── vault_mcp/
    ├── server.py              # FastMCP init + tool registration
    ├── config.py              # VAULT_PATH, allowlists, timeouts, paths
    └── tools/
        ├── git.py             # git subcommands (allowlisted)
        ├── shell.py           # shell, move_file, delete_file, now()
        ├── python_tool.py     # python(), pip(), venv_list()
        ├── node_tool.py       # node()
        └── notes.py           # 11 structured markdown note tools
```

### Tool inventory
| Tool                      | Module         | Notes                                                         |
| ------------------------- | -------------- | ------------------------------------------------------------- |
| `git(subcommand, args)`   | git.py         | Allowlist: status, add, commit, push, pull, log, diff, rm, mv |
| `shell(cmd, cwd)`         | shell.py       | Allowlist of executables; accepts full paths to venv pythons  |
| `move_file(src, dst)`     | shell.py       | pathlib.rename — Windows case-safe                            |
| `delete_file(path)`       | shell.py       | Files only                                                    |
| `now()`                   | shell.py       | Returns BRT datetime string                                   |
| `python(code, venv, cwd)` | python_tool.py | Auto-creates venv; venvs at `Work26/venvs/`                   |
| `pip(packages, venv)`     | python_tool.py | 120s timeout                                                  |
| `venv_list()`             | python_tool.py | Lists managed venvs + installed packages                      |
| `node(code, cwd)`         | node_tool.py   | Runs JS via Node                                              |
| `run(cmd, cwd)`           | shell.py       | Unrestricted — pm2, etc.                                      |
| notes tools (11)          | notes.py       | See vault-mcp-notes.md                                        |
|                           |                |                                                               |

### Config (config.py)
- `VAULT_PATH` = `C:\Users\tdsnit\winlinks\obsidian-default-vault`
- `SHELL_WORKING_DIR` = VAULT_PATH (default cwd for shell calls)
- `SHELL_TIMEOUT` = 120s
- `PYTHON_EXE` = Python 3.14 path
- `PYTHON_VENVS_DIR` = `C:\Users\tdsnit\Work26\venvs`

### Versioning convention
Bump `the-vault-X.Y` in **both** places when tool descriptions change:
1. `vault_mcp/server.py` → `FastMCP("the-vault-X.Y")`
2. `claude_desktop_config.json` → key name `"the-vault-X.Y"`

This busts the Claude Desktop tool list cache — the only reliable way short of a new conversation.

### Known issues / lessons learned
- FastMCP INFO logs must go to stderr, not stdout — otherwise they pollute the JSON-RPC stream and the server appears to hang
- `subprocess.run()` blocks the asyncio event loop — always use `asyncio.create_subprocess_exec` for shell calls
- Windows NTFS case-insensitivity breaks `git mv` — use `move_file` instead
- Claude Desktop caches tool list per-conversation — new tools only appear in fresh conversations after a server restart
- Symlinks in MCP only work if they point to targets within whitelisted directories
- `python_tool.py` previously imported `SHELL_ALLOWED_DIRS` which was removed — caused silent import failure; always check imports after config changes

### MCP config location
`C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`
Backup: `2 AI Exchange/Alex/db/claude_desktop_config.backup.json`
Always update backup after config changes.

## Changelog
- 2026-03-27: git tool shipped, stdio hang fixed (logging to stderr)
- 2026-03-29: shell, now(), move_file, delete_file added
- 2026-04-06: python, pip, venv_list, node added; notes.py (11 tools); server renamed the-vault-2.0
- 2026-04-07: run tool added (unrestricted); bumped to the-vault-2.1; notes _split_footnote bug fixed

## Updates
