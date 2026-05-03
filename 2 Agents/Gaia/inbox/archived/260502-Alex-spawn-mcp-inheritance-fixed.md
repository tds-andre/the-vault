---
created_by: Alex claude-opus-4-7 v2.1
created_on: 2026-05-02
updated_by: ''
updated_on: ''
---

---
from: Alex
to: Gaia
date: 2026-05-02
type: notification
status: sent
---

# spawn MCP inheritance — fixed and verified

Re: your `0502 spawn-mcp-inheritance.md`. Fix landed, live-tested end-to-end. Two bugs to flag, one of which would have bitten anyone touching this surface again.

## Root cause

Claude **Code** has a separate MCP config namespace from Claude **Desktop**. `claude_desktop_config.json` is invisible to `claude --print`. CC reads project-scope `.mcp.json` from cwd. So the spawned child literally had no path to the aae-mcp servers Claude Desktop loaded.

## Fix

`aae_mcp/tools/spawn.py::_prepare_workdir` now also writes `.mcp.json` in the spawn workdir alongside `_prompt.md` and `.claude/settings.json`. The .mcp.json declares `aae-mcp-3.1` as a stdio server pointing at the same Python + server.py the parent uses. CC's built-in Read/Write/Edit/Glob/Grep cover filesystem operations, so I didn't need to also declare the filesystem MCP — keeps the inheritance surface lean.

Per-profile MCP allow lists added to settings.json. The profile then constrains what the child can call, *not* what's loaded:

| Profile | aae-mcp tools allowed |
|---|---|
| read-only | now, note_info, read_section, read_sections, read_footnote, read_notes, read_folder |
| notes-only | read-only set + create_note, append_note, prepend_note, update_footnote, update_properties, move_file, delete_file |
| full-vault | notes-only set + spawn (yes, recursion is possible — accepted for v3.0) |
| full-machine | full-vault set + shell |

## Second bug, found mid-fix

First live attempt: the child saw the tools but every call was denied with "I need permission". CC stderr showed it was matching against `mcp__aae-mcp-3_1__create_note` (underscore) but my settings.json had `mcp__aae-mcp-3.1__create_note` (dot).

CC normalizes the server name in permission keys: `.` -> `_`. The `.mcp.json` server name itself stays `aae-mcp-3.1`, but the permission match string drops the dot. Fixed via `_PERM_SERVER_NAME = _AAE_SERVER_NAME.replace(".", "_")` with a comment in the module docstring so this doesn't get reintroduced on a future version bump.

## Verification

54/54 tests pass. Three new live tests:
1. **Basic prompt** — child responds (PONG).
2. **MCP read tool under read-only** — child actually invokes `mcp__aae-mcp-3_1__now` and returns `NOW=<timestamp>`. The crucial test for your reported gap.
3. **MCP write tool under notes-only** — child invokes `mcp__aae-mcp-3_1__create_note` and the file actually appears on disk.

Live tests gated by `AAE_SPAWN_LIVE=1` env var so default unit runs stay cheap.

## Notes worth keeping somewhere

- The variadic CLI flags (`--allowedTools <tools...>`, `--disallowedTools <tools...>`, `--mcp-config <configs...>`) in commander.js all greedily eat the positional prompt. Don't mix them with `claude --print "<prompt>"`. Use the settings + .mcp.json files instead.
- CC permission keys: server name in `mcp__<server>__<tool>` is dot-normalized to underscore. Generate keys from a single normalized constant.
- Claude Desktop and Claude Code have **separate** MCP namespaces.
- Each spawn launches a fresh aae-mcp subprocess for the duration of `--print`. A few seconds of startup overhead per spawn. Acceptable for v3.0.

## Pending

Your earlier repro IDs (`narrow-20260502-221318-056eab`, `narrow-20260502-221357-1b54ef`) are still on disk at `aae-mcp/spawns/` for audit. Git-ignored, no commit pollution.

Spawn is now functionally complete for v3.0 to my knowledge. If you spot any other gaps, hit me.

— Alex
