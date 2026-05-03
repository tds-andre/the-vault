---
created_by: Alex claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: history
updated_by: ''
updated_on: ''
---

# Alex — History

Long-term archive. Never loaded at boot. Written by housekeeping only.

---

## Preface — v2 era (2026-03 to 2026-05)

Migrated from v2 on 2026-05-02. v2 lives at `2 AI Exchange/Alex/` and is preserved as-is. The narrative below preserves what shaped this agent before v3.

### Founding (March 27, 2026)

Created as André's hacker / engineering / tooling agent. Brief: own MCP servers, automation, integrations. Day one shipped `vault-mcp` v0 — Python + FastMCP, single `git` tool, scoped to vault, async subprocess. Root cause of an early stdio hang: FastMCP INFO logs going to stdout polluted the JSON-RPC stream — fixed by routing logging to stderr. That lesson carried forward.

### The vault-mcp arc (March → April 2026)

`vault-mcp` grew tool by tool:
- 2026-03-29: `shell` (allowlisted), `now()` (BRT), `git rm`. André's first commit attempts revealed the args-split-on-spaces bug — commits had to use hyphens.
- 2026-04-06: notes module (11 tools) shipped. `_split_footnote` bug surfaced and fixed (only split on `---` followed by `*`). `read_notes` / `read_folder` returned `{notes:[...]}` to dodge FastMCP single-item list unwrapping. `python_tool`, `node_tool`, `move_file`, `delete_file` added. Server renamed `the-vault-2.0` to bust Claude Desktop tool cache. **Versioning convention** was born here: bump the minor in both `FastMCP("the-vault-X.Y")` and the config key whenever tool descriptions change. v2.0 architecture migration also happened this day — `boot.md` + `system.md` + `index.md` + new memory model.
- 2026-04-07: `run` (unrestricted), bumped 2.1.

### whatsapp-mcp shipped (April 7)

Standalone Node.js MCP using Baileys + PM2. Tools: `send_whatsapp`, `get_contacts`, `check_replies`, `await_replies`, `get_chat_history`. Auth via QR scan; multi-file auth store. Eco-config in CJS not ESM (PM2 can't load ESM configs). MCP config backup discipline established same day after a near-loss: backup at `2 AI Exchange/Alex/db/claude_desktop_config.backup.json`, written after every config change.

### Cross-machine attempts (April 13 → April 26)

Notebook setup with filesystem MCP. Symlink approach for centralized `agents/` dir failed — filesystem MCP resolves symlinks and checks the target against the allowlist, not the link location. Replaced with `paths.csv` (machine-specific, gitignored) + `paths.template.csv` (versioned), `env.yaml` + `env.template.yaml`. Trip experiment did not work smoothly enough for reliable remote use; fallback to TeamViewer/RDC when remote.

### CocoriPede handoff (April 28)

Cocoria handed CocoriPede development to me. Sprints 1-3 complete: FastAPI + SQLite (aiosqlite + shapely) backend with 36 passing tests; React 18 + TS + Tailwind frontend (dark theme); auth, kanban, customers, fiado, customizations, deliveries, KML zones, motoboys, cash, reports. Sprints 4-6 pending: Cardápio Digital (S4), iFood real polling-not-webhook integration (S5), Cocoria WhatsApp agent (S6). Plus printer ESC/POS bridge and EC2 deploy. Google Maps API key was exposed in chat — must rotate before deploy.

### v3 design + aae-mcp (May 1-2)

Gaia briefed me on the v3 cutover 2026-05-01: `vault-mcp` becomes `aae-mcp`. New repo, build in parallel, cut over when ready, archive `vault-mcp` after. Drop `git` (André commits manually). Merge `shell` + `run` (full capability, no allowlist). Keep `move_file`, `delete_file`, `now`, `notes`. Soft-remove `python_tool` + `node_tool` (preserved in `_attic/`, reactivatable). Add `spawn` per `2 Agents/functions/spawn.md`. Cross-machine env-deps isolated from day one in a single `env.yaml`.

Shipped 2026-05-02:
- aae-mcp v3.0 scaffold: 15 tools wired, 34/34 tests pass.
- Bug found day-of: `asyncio.create_subprocess_exec` doesn't go through `cmd.exe` on Windows — `echo`, `dir`, `cd`, `|`, `>`, `&&` all failed. Switched to `create_subprocess_shell`. Same defect is latent in `vault-mcp`'s `shell`/`run`; not fixing — both are slated for retirement.
- whatsapp-mcp fully decommissioned (deregistered, PM2 list emptied, killed). Reactivatable.
- spawn.md locked sync-only per André's instruction. Async dropped (deferred post-v3.0).
- spawn tool shipped: wraps `claude --print --no-session-persistence`, sync only, 5min hard cap. 4 permission profiles encoded in `.claude/settings.json` written to spawn workdir. Spawn-id default `narrow-YYYYMMDD-HHMMSS-<6hex>`. Spawn dir holds `_prompt.md` (audit) + `.claude/settings.json` + (later) `.mcp.json`.
- Bug 2: `--allowedTools <tools...>` is variadic in commander.js — greedily eats the prompt arg. Dropped CLI flag entirely; permissions live only in settings.json. Documented in module docstring so I don't reintroduce.
- Bug 3 (Gaia caught it): spawned `claude --print` saw zero aae-mcp tools because Claude **Code** has a separate MCP namespace from Claude **Desktop**. Plant `.mcp.json` in spawn workdir. Per-profile MCP allowlists in settings.json.
- Bug 4 (live testing): CC normalizes `.` to `_` in permission keys (`mcp__aae-mcp-3_1__create_note`), but `.mcp.json` server name itself stays `aae-mcp-3.1`. Baked `_PERM_SERVER_NAME = _AAE_SERVER_NAME.replace(".", "_")` into `_aae_tool_patterns`.
- Final: 54/54 tests (51 unit + 3 live).
- Server bumped `aae-mcp-3.0` → `aae-mcp-3.1`. Registered in Claude Desktop config alongside `the-vault-2.1`. Backup synced.

### Lessons that shaped this agent

- **FastMCP INFO logs to stderr, never stdout.** Pollutes JSON-RPC; server appears to hang.
- **`subprocess.run` blocks the asyncio loop.** Use `asyncio.create_subprocess_*` everywhere.
- **`asyncio.create_subprocess_exec` on Windows ≠ shell.** Use `create_subprocess_shell` for shell features.
- **Windows NTFS case-insensitivity breaks `git mv`.** That's why `move_file` exists.
- **Claude Desktop caches tool list per conversation.** Bump server version to bust cache; new conversation otherwise.
- **Claude Desktop and Claude Code have separate MCP namespaces.** Don't assume `claude_desktop_config.json` reaches `claude --print`. Plant `.mcp.json` in cwd.
- **CC permission keys normalize `.` → `_` in server names.** Bake into any allow/deny generation.
- **Variadic CLI flags eat positional args.** `<x...>` in commander.js help → don't mix with positional. Use settings.json or stdin.
- **André commits manually.** No `git` tool; no autonomous git mid-session.
- **Test before shipping.** "Restart and test" is a bug. Always test against the live thing before declaring done.
- **Tool-search before "I can't".** aae-mcp tools are deferred — call `tool_search` to load schemas before concluding capability is missing.

### Carried forward to v3

- The whole aae-mcp infrastructure — primary tooling for the v3 ecosystem.
- Pragmatic / simple-over-clever / surface-debt-honestly principles.
- Direct, technical tone; concise; English techspeak freely.
- MCP deploy pipeline as a function: version-bump cache-bust + config backup + symlinks pattern.
- The bug catalog above lives in `notes/learnings.md` going forward.
