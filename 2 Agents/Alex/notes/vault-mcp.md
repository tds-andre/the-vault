---
created_by: Alex claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: specialized-note
updated_by: ''
updated_on: ''
---

# vault-mcp (legacy)

Historical reference. `vault-mcp` is being archived as part of the v3 cutover; primary tooling is now `aae-mcp` at `C:\Users\tdsnit\Work26\agents\aae-mcp\`. Most architectural lessons here carried forward to aae-mcp.

## Overview

`the-vault` (a.k.a. `vault-mcp`) was André's first custom Python MCP server — the infrastructure layer that gave Claude agents shell, git, file, note, and scripting capabilities. Modular by design: each capability lived in its own `tools/` module, registered at startup.

**Repo:** `C:\Users\tdsnit\Work26\agents\vault-mcp\`
**Entry point:** `server.py` → imports `vault_mcp/server.py` → registers all tool modules
**Final server name:** `the-vault-2.1`
**Python:** 3.14 at `C:\Users\tdsnit\AppData\Local\Programs\Python\Python314\python.exe`

## Architecture

```
vault-mcp/
├── server.py                  # entry point — mcp.run(transport="stdio")
└── vault_mcp/
    ├── server.py              # FastMCP init + tool registration
    ├── config.py              # VAULT_PATH, allowlists, timeouts, paths
    └── tools/
        ├── git.py             # git subcommands (allowlisted)  — DROPPED in aae-mcp
        ├── shell.py           # shell, move_file, delete_file, now()
        ├── python_tool.py     # python(), pip(), venv_list()    — soft-removed in aae-mcp (_attic/)
        ├── node_tool.py       # node()                          — soft-removed in aae-mcp (_attic/)
        └── notes.py           # 11 structured markdown note tools
```

## Tool inventory (final v2.1)

| Tool                      | Module         | Notes                                                         | Status in aae-mcp |
| ------------------------- | -------------- | ------------------------------------------------------------- | --- |
| `git(subcommand, args)`   | git.py         | Allowlist: status, add, commit, push, pull, log, diff, rm, mv | dropped (André commits manually) |
| `shell(cmd, cwd)`         | shell.py       | Allowlist of executables                                      | merged with `run`, no allowlist |
| `run(cmd, cwd)`           | shell.py       | Unrestricted                                                  | merged into `shell` |
| `move_file(src, dst)`     | shell.py       | pathlib.rename — Windows case-safe                            | dedicated tool |
| `delete_file(path)`       | shell.py       | Files only                                                    | dedicated tool |
| `now()`                   | shell.py       | Returns BRT datetime string                                   | kept |
| `python(code, venv, cwd)` | python_tool.py | Auto-creates venv; venvs at `Work26/venvs/`                   | _attic/ |
| `pip(packages, venv)`     | python_tool.py | 120s timeout                                                  | _attic/ |
| `venv_list()`             | python_tool.py | Lists managed venvs + installed packages                      | _attic/ |
| `node(code, cwd)`         | node_tool.py   | Runs JS via Node                                              | _attic/ |
| notes tools (11)          | notes.py       |                                                               | kept verbatim |

## Versioning convention (still applies in aae-mcp)

Bump the minor version in **both** places when tool descriptions change:
1. `vault_mcp/server.py` → `FastMCP("the-vault-X.Y")`
2. `claude_desktop_config.json` → key name `"the-vault-X.Y"`

This busts the Claude Desktop tool list cache — the only reliable way short of a new conversation.

## Known issues / lessons learned (carried into aae-mcp)

- FastMCP INFO logs must go to stderr, not stdout — otherwise they pollute the JSON-RPC stream and the server appears to hang.
- `subprocess.run()` blocks the asyncio event loop — always use `asyncio.create_subprocess_*` for shell calls.
- Windows NTFS case-insensitivity breaks `git mv` — use `move_file` instead.
- Claude Desktop caches tool list per-conversation — new tools only appear in fresh conversations after a server restart.
- Symlinks in MCP only work if they point to targets within whitelisted directories (filesystem MCP resolves symlinks then validates the target).
- `python_tool.py` once imported `SHELL_ALLOWED_DIRS` after that constant was removed — caused silent import failure. Always check imports after config changes.
- vault-mcp's `shell`/`run` use `create_subprocess_exec` and so are NOT real shells on Windows. Latent defect — not fixing because both are slated for retirement.

## MCP config location

`C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`
Backup: `2 AI Exchange/Alex/db/claude_desktop_config.backup.json` (legacy v2 location).

## Changelog

- 2026-03-27: git tool shipped, stdio hang fixed (logging to stderr).
- 2026-03-29: shell, now(), move_file, delete_file added.
- 2026-04-06: python, pip, venv_list, node added; notes.py (11 tools); server renamed `the-vault-2.0`.
- 2026-04-07: run tool added (unrestricted); bumped to `the-vault-2.1`; notes `_split_footnote` bug fixed.
- 2026-05-02: superseded by aae-mcp-3.1; archive-pending.
