# Alex — Memory
*Persistent context accumulated across sessions. Most recent entries at the top.*
*Do not load archive.md at session start — only on explicit request.*

---

## Session: 2026-04-06

### python, pip, venv_list, node tools shipped
- `vault_mcp/tools/python_tool.py` — `python(code, venv, cwd)`, `pip(packages, venv)`, `venv_list()`
- `vault_mcp/tools/node_tool.py` — `node(code, cwd)`
- Venvs managed at `C:\Users\tdsnit\Work26\venvs\`
- Root cause of delayed load: stale import of `SHELL_ALLOWED_DIRS` in python_tool.py — fixed
- shell timeout raised to 120s; full venv python paths now allowed in shell tool
- node, npm, npx added to SHELL_ALLOWED_COMMANDS
- Work26 added to SHELL_ALLOWED_DIRS (informational)

### git mv shipped
- Added `mv` to GIT_ALLOWED_SUBCOMMANDS — enables clean file moves within vault
- Requested by Gaia for Threads directory reorganization
- Gaia notified via inbox

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

### Inbox messages resolved (retroactively)
- `2026-03-27_Gaia_command-line-mcp-git.md` — resolved by vault-mcp git tool (2026-03-27)
- `2603291200_Gaia_file-move-tool-vault-mcp.md` — resolved by shell.py mv command
- `2603291300_Gaia_full-command-line-mcp.md` — resolved by shell.py
- Reply dispatched to Gaia inbox: `2603291_Alex_shell-mcp-shipped.md`

### Messaging protocol note
- Gaia noted inter-agent messaging was not followed properly this session
- Protocol: update `Date read:` in inbox file when read, update `Date dispatched:` when done, write reply to sender's inbox
- Simpler approach going forward: update lifecycle fields in-place, no need to move files

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
- Config: `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json` (accessible via that path directly)
- Root cause of hang: FastMCP INFO logs polluting stdout/JSON-RPC stream — fixed by `logging.basicConfig(level=WARNING, stream=stderr)`
- Git tool is async (`asyncio.create_subprocess_exec`) with 10s timeout and `stdin=DEVNULL`
- Gaia notified via inbox

### Open threads
- [ ] Update memory.md at session end (this entry)
- [ ] Add `PYTHONPATH` env var to config if import issues recur
- [ ] `chickendrive` missing from filesystem allowlist — was it intentional?

---

## Session: 2026-03-27 (founding session)

### Context established
- Alex created as André's hacker/engineering agent
- Primary role: software development, prototyping, MCP, integrations, automation
- André is a senior ML engineer — Python Jedi, strong software fundamentals, prefers simple solutions
- Current AI tooling: Claude + MCP filesystem on Obsidian Vault (already configured)
- André uses Cursor or considering it — confirm in first real session
- Vault is git-tracked; Alex will eventually handle git automation when command-line MCP is available

### André's tech profile (relevant to Alex)
- Fluent: Python, JavaScript/HTML/CSS
- Solid: Java, C++/CUDA, C#, C
- Current work: Azure/Synapse/Spark at Akuvo (Janea); Java/CBRS at Key Bridge
- Interested in: Rust, Go, Flutter
- AI tools in use: Claude (daily), Copilot/VSCode integration
- Prefers: end-to-end ownership, simple architectures, avoiding distributed systems unless necessary

### System context
- Vault MCP: filesystem access configured and working
- Future MCP targets: command-line execution (enables git automation, scripting)
- Agent system: Gaia (meta), Ben (finance), Apollo (knowledge), Alex (tech)
- Alex builds infrastructure other agents will depend on — think systemically

### Open threads
- [ ] Set up Alex as Claude Project using template in `2 AI Exchange/project-prompt-template.md`
- [ ] Evaluate Cursor/Windsurf if not already in use — high ROI for André
- [ ] Command-line MCP — when ready, enables git automation and scripting for all agents
- [ ] n8n or Make for workflow automation — evaluate when André has a specific automation need

---
*Format: new sessions prepended at top, founding session preserved permanently*
