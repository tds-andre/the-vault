---
created_by: Alex v1.0
created_on: 2026-03-27
updated_by: Alex claude-opus-4-7 v2.1
updated_on: 2026-05-02
type: memory
---

# Alex — Memory
*Persistent context accumulated across sessions. Most recent entries at the top.*
*Do not load archive.md at session start — only on explicit request.*

---

## Session: 2026-05-02

### aae-mcp v3.0 scaffold shipped, tested, fixed
- New repo at `C:\Users\tdsnit\Work26\agents\aae-mcp\` (parallel to vault-mcp).
- FastMCP server: `aae-mcp-3.0`. Registered in `claude_desktop_config.json` alongside `the-vault-2.1` for parallel testing.
- Tools live (15 total): `shell`, `move_file`, `delete_file`, `now`, 11 `notes:*`. Spawn stubbed.
- Dropped: `git` (André commits manually), `python_tool` + `node_tool` (preserved in `aae_mcp/_attic/`, reactivation path in attic README).
- Machine-specific config: `aae-mcp/env.yaml` (git-ignored) + versioned `aae-mcp/env.template.yaml`. Loaded by `aae_mcp/config.py` at startup. New dep: `pyyaml` (already installed in system Python 3.14). Mirrors vault root `env.yaml` pattern.

### Test harness at `aae-mcp/tests/test_all.py` — 34/34 pass
- Direct invocation of tool functions (no MCP layer). Run with `python tests/test_all.py`.
- Coverage: config loading, all shell features (builtins, external exes, cwd, pipes, chaining, error cases), files (abs + vault-relative paths, missing/conflict cases), now format, all 11 notes operations including the `_split_footnote` bug-fix regression test, server boot.

### Bug found and fixed: shell wasn't actually a shell
- Initial port from vault-mcp's `run.py` used `asyncio.create_subprocess_exec`. On Windows that exec's the executable directly — no `cmd.exe`. Result: `echo`, `dir`, `cd`, `type`, `|`, `>`, `&&`, all failed with `FileNotFoundError`.
- Since v3 explicitly drops the allowlist for an unrestricted shell, this was a real defect.
- Fixed by switching to `asyncio.create_subprocess_shell` — routes through `cmd.exe /c` on Windows, `/bin/sh -c` on Unix. All shell features now work; tests cover them.
- **Same defect is latent in vault-mcp's `shell` and `run` tools.** Not fixing — both are slated for retirement on cutover.

### whatsapp-mcp fully decommissioned
- Removed from `claude_desktop_config.json`. Backup synced.
- PM2: process list was already empty (probably wiped on a prior reboot). Saved empty dump, ran `pm2 kill`. If a `pm2 startup` hook exists, it'll spawn an empty daemon on next reboot; `pm2 unstartup` removes it permanently.

### spawn.md locked sync-only
- `2 Agents/functions/spawn.md` edited directly per André's instruction.
- Async mode dropped (deferred post-v3.0). Sync timeout = kill subprocess, return error to caller. Servitor template prints to stdout, no inbox write.
- Notifications to Gaia: `2 AI Exchange/Gaia/messages/260502-Alex-spawn-md-spec-fixes.md` (spec lock) and `260502-Alex-aae-mcp-tested.md` (test report).

### Tooling note for self
- the-vault-2.1 tools are deferred — must call `tool_search` to load before use. Got this wrong twice in session before André pushed back. Default behavior: when André asks "can you run X", call tool_search BEFORE concluding I can't.

### Next steps
- André restarts Claude Desktop → verify `aae-mcp-3.0` shows up.
- Implement spawn tool per locked `spawn.md`. Working dir: `<central root>/spawns/<spawn-id>/`, no auto-cleanup for v3.0.
- After spawn ships and is verified: deregister `the-vault-2.1`, archive vault-mcp repo.

---

## Session: 2026-04-07

### whatsapp-mcp shipped
- Repo at `C:\Users\tdsnit\Work26\agents\whatsapp-mcp`
- Stack: Node.js, Baileys (@whiskeysockets/baileys), PM2
- PM2 installed globally, service runs as `whatsapp-baileys`
- Ecosystem config: `ecosystem.config.cjs` (CJS, not ESM — PM2 can't load ESM configs)
- Tools: `send_whatsapp`, `get_contacts`, `check_replies`, `await_replies`, `get_chat_history`
- Registered in `claude_desktop_config.json` as `whatsapp-mcp`
- Auth stored in `./auth/`, contacts cached in `D:\vault-data\whatsapp\contacts\contacts.json`
- History persisted to `D:\vault-data\whatsapp\history\<jid>.json`, deduped by message ID
- History built from real-time `messages.upsert` events (not initial sync — Baileys v6 limitation)
- `the-vault` bumped to `2.1` — now has unrestricted `run` tool (pm2.cmd etc.)
- MCP config backup added to `2 AI Exchange/Alex/db/claude_desktop_config.backup.json`
- **Always update backup after every config change**

### Versioning convention
- Server renamed from `vault-mcp` → `the-vault-2.0` to bust Claude Desktop tool cache
- Convention: bump minor version (e.g. 2.1, 2.2) whenever tool descriptions change
- Change in `FastMCP("the-vault-X.Y")` in `vault_mcp/server.py` AND config key in `claude_desktop_config.json`

### notes tools shipped (11 tools)
- `vault_mcp/tools/notes.py` — create_note, append_note, prepend_note, read_section, read_sections, read_footnote, update_footnote, update_properties, note_info, read_notes, read_folder
- Bug fixed: `_split_footnote` was splitting on all `---` lines; now only splits on `---` followed by `*` (italic footnote)
- `read_notes` / `read_folder` return `{notes: [...]}` dict to avoid FastMCP single-item list unwrapping

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
