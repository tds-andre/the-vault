---
created_by: Alex v1.0
created_on: 2026-03-27
updated_by: Gaia claude-opus-4-6 v2.0
updated_on: 2026-04-06
type: memory
---

# Alex — Memory
*Persistent context accumulated across sessions. Most recent entries at the top.*
*Do not load archive.md at session start — only on explicit request.*

---

## Session: 2026-04-06

### v2.0 architecture migration
Migrated from v1.1 to v2.0 file structure by Gaia. New files: boot.md, system.md, index.md, messages-archive.md. Messaging protocol deprecated. Old files (system-prompt.md, inbox/, messages/, public/) preserved but superseded.

### Versioning convention
- Server renamed from `vault-mcp` → `the-vault-2.0` to bust Claude Desktop tool cache
- Convention: bump minor version (e.g. 2.1, 2.2) whenever tool descriptions change
- Change in `FastMCP("the-vault-X.Y")` in `vault_mcp/server.py` AND config key in `claude_desktop_config.json`

### notes tools shipped (11 tools)
- `vault_mcp/tools/python_tool.py` — `python(code, venv, cwd)`, `pip(packages, venv)`, `venv_list()`
- `vault_mcp/tools/node_tool.py` — `node(code, cwd)`
- Venvs managed at `C:\Users\tdsnit\Work26\venvs\`
- Root cause of delayed load: stale import of `SHELL_ALLOWED_DIRS` in python_tool.py — fixed
- shell timeout raised to 120s; full venv python paths now allowed in shell tool
- node, npm, npx added to SHELL_ALLOWED_COMMANDS
- Work26 added to SHELL_ALLOWED_DIRS (informational)

### move_file and delete_file tools added
- Added to `vault_mcp/tools/shell.py` (inline, no new file)
- `move_file(source, destination)` — uses `pathlib.Path.rename()`, Windows case-safe, creates parent dirs automatically, accepts absolute or vault-relative paths
- `delete_file(path)` — files only, accepts absolute or vault-relative paths
- Neither stages git — caller does `git add` afterwards
- Motivation: `git mv` unreliable on Windows NTFS due to case mismatch (`threads/` tracked vs `Threads/` on disk)

### git mv shipped
- Added `mv` to GIT_ALLOWED_SUBCOMMANDS — kept for completeness but move_file preferred on Windows

### Open threads
- [ ] Set up Alex as Claude Project
- [ ] Evaluate Cursor/Windsurf
- [ ] Consider Toggl API wrapper as next vault-mcp tool
- [ ] `chickendrive` missing from filesystem allowlist — intentional?

---

## Session: 2026-03-29 (shell MCP shipped)

### shell.py shipped
- Added `shell(cmd, cwd="")` tool to vault-mcp
- Allowlist in `config.py`: mv, cp, rm, mkdir, rmdir, touch, ls, dir, cat, type, echo, python, pip, curl, wget, git, and more
- `shlex.split` for proper quoted arg handling
- 30s timeout, stdin=DEVNULL, returns stdout+stderr+exit code
- Scoped to vault via `SHELL_WORKING_DIR` (symlink at `C:\Users\tdsnit\winlinks\obsidian-default-vault`)

### now() tool shipped
- Returns BRT datetime string (`2026-03-29 14:32:00 BRT`)
- Uses `zoneinfo.ZoneInfo("America/Sao_Paulo")`

### git rm added
- `git rm` added to `GIT_ALLOWED_SUBCOMMANDS` in config.py

### Open threads
- [ ] Set up Alex as Claude Project
- [ ] Evaluate Cursor/Windsurf
- [ ] Consider Toggl API wrapper as next vault-mcp tool
- [ ] `chickendrive` missing from filesystem allowlist — intentional?

---

## Session: 2026-03-27 (vault-mcp)

### Git MCP shipped
- `vault-mcp` server running at `C:\Users\tdsnit\Work26\agents\vault-mcp`
- Stack: Python 3.14, FastMCP, asyncio subprocess
- Launched via: `python.exe server.py` (direct, no cmd wrapper)
- Config: `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`
- Root cause of hang: FastMCP INFO logs polluting stdout/JSON-RPC stream — fixed by `logging.basicConfig(level=WARNING, stream=stderr)`
- Git tool is async (`asyncio.create_subprocess_exec`) with 10s timeout and `stdin=DEVNULL`

### Open threads
- [ ] Add `PYTHONPATH` env var to config if import issues recur
- [ ] `chickendrive` missing from filesystem allowlist — was it intentional?

---

## Session: 2026-03-27 (founding session)

### Context established
- Alex created as André's hacker/engineering agent
- Primary role: software development, prototyping, MCP, integrations, automation
- André is a senior ML engineer — Python Jedi, strong software fundamentals, prefers simple solutions
- Current AI tooling: Claude + MCP filesystem on Obsidian Vault (already configured)
- Vault is git-tracked; Alex handles git automation via vault-mcp

### André's tech profile (relevant to Alex)
- Fluent: Python, JavaScript/HTML/CSS
- Solid: Java, C++/CUDA, C#, C
- Current work: Azure/Synapse/Spark at Akuvo (Janea); Java/CBRS at Key Bridge
- Interested in: Rust, Go, Flutter
- AI tools in use: Claude (daily), Copilot/VSCode integration
- Prefers: end-to-end ownership, simple architectures, avoiding distributed systems unless necessary

### System context
- Vault MCP: filesystem access configured and working
- Agent system: Gaia (meta), Ben (finance), Apollo (knowledge), Alex (tech)
- Alex builds infrastructure other agents will depend on — think systemically

### Open threads
- [ ] Evaluate Cursor/Windsurf if not already in use — high ROI for André
- [ ] n8n or Make for workflow automation — evaluate when André has a specific automation need

---
*Format: new sessions prepended at top, founding session preserved permanently*
