---
created_by: Alex claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: notes
updated_by: ''
updated_on: ''
---

# Alex — Learnings

Loaded at boot (ML). Append short observations. Promote to dedicated `notes/[topic].md` when a thread merits it.

---

## MCP build / deploy

- **FastMCP INFO logs default to stdout — pollutes JSON-RPC.** Always `logging.basicConfig(stream=sys.stderr)` before initializing the server. Day-one bug; never repeat.
- **`subprocess.run()` blocks the asyncio event loop.** Always `asyncio.create_subprocess_*`.
- **`asyncio.create_subprocess_exec` on Windows is NOT a shell.** No `cmd.exe`. `echo`, `dir`, `cd`, `|`, `>`, `&&` all fail. Use `create_subprocess_shell` whenever shell features are wanted.
- **Claude Desktop tool-list cache is per-conversation.** Bump `FastMCP("aae-mcp-X.Y")` AND the config key to bust it. Otherwise: new conversation.
- **Claude Desktop and Claude Code have separate MCP namespaces.** `claude_desktop_config.json` is invisible to `claude --print`. CC reads project-scope `.mcp.json` from cwd. The spawn tool plants one.
- **CC normalizes `.` → `_` in permission keys for MCP server names.** `mcp__aae-mcp-3.1__create_note` becomes `mcp__aae-mcp-3_1__create_note`. The `.mcp.json` server name itself stays unchanged. Bake the normalization into allow/deny generation.
- **Commander.js variadic flags (`<x...>`) eat positional args greedily.** `--allowedTools` ate prompt arg in early spawn impl. Don't mix variadic flags with positional. Use settings.json or stdin.

## Filesystem / Windows

- **Windows NTFS is case-insensitive but git is case-sensitive.** `git mv` is unreliable. That's why `move_file` (using `pathlib.Path.rename`) exists in aae-mcp.
- **Symlinks + filesystem MCP don't compose.** filesystem MCP resolves symlinks and validates the **target** against the allowlist, not the link path. Centralized symlinked `agents/` folder failed for this reason. Replaced with env.yaml + path mappings.

## Claude Desktop / Claude Code

- **"Do not respond until you have read X" is an anti-pattern in Claude Desktop.** Causes silent timeouts — the model chains tool calls indefinitely before producing a first token. Always greet first, read progressively.
- **MCP must be explicitly enabled per Project in Claude Desktop.** New Projects don't inherit global MCP config — verify on setup.
- **aae-mcp tools are deferred in Claude Code (this harness).** Must `tool_search` to load schemas before use. Default behavior when asked "can you do X": tool_search BEFORE "I can't".

## Working with André

- **He commits manually.** Don't run `git`. The dropped `git` tool in aae-mcp v3 is intentional.
- **He cuts back over-engineering.** When in doubt write less; bias toward the simplest thing that works.
- **He reads the code carefully.** Hiding shortcuts gets caught. Surface technical debt honestly.
- **"Test before shipping" is hard-rule.** Run a real test against the live service before declaring done or asking for a restart. Never write "restart and test" — test first, restart once.
- **Tooling failures are mine.** When other agents hit them, route to me immediately; don't sit on it.

## Architecture defaults

- **Modular tool layout.** Each capability in its own `tools/<name>.py`, registered at startup in `server.py`. Easy to add/remove/attic.
- **Env-deps in one file.** `env.yaml` (gitignored) + `env.template.yaml` (versioned). Mirrors vault root pattern. Saves the cross-machine refactor.
- **Sync-only spawn for v3.0.** 5-min hard cap. On timeout: kill, return error to caller. Async deferred post-v3.0 (cron mechanism not yet designed).
- **`<repo>/spawns/` is gitignored.** Per-spawn dir holds `_prompt.md` (audit), `.claude/settings.json`, `.mcp.json`. Not auto-cleaned in v3.0.
