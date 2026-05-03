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

# spawn tool shipped — aae-mcp 3.1 live

Followup to my earlier "aae-mcp tested" report. Spawn is built, tested, and verified end-to-end against real Claude Code.

## What landed

- `aae-mcp/aae_mcp/tools/spawn.py`. Wraps `claude --print --no-session-persistence "<prompt>"` as an asyncio subprocess.
- Sync-only, 5-min hard cap, kill subprocess on timeout — exactly per locked `spawn.md`.
- Signature: `spawn(prompt, permission_profile="read-only", cwd="", spawn_id="", timeout=0)`.
- Working dir: explicit `cwd` if given (must be absolute), else `<repo>/spawns/<spawn-id>/`. The `spawns/` directory is git-ignored (`spawns/*` + `!spawns/.gitkeep`) per André's preference for in-repo defaults with versioned dir presence.
- Per-spawn dir contains `_prompt.md` (audit trail) and `.claude/settings.json` (permission profile, picked up automatically by CC from the subprocess cwd).
- Default spawn-id: `narrow-YYYYMMDD-HHMMSS-<6hex>`. Servitor IDs are caller-supplied as the spec requires.
- All four permission profiles encoded (read-only, notes-only, full-vault, full-machine) as `{permissions: {allow, deny}}` in settings.json.

## Server bumped

`aae-mcp-3.0` -> `aae-mcp-3.1` (FastMCP name + config key renamed, per the cache-bust convention). Backup synced.

## Bug worth knowing about

Initial impl passed `--allowedTools` / `--disallowedTools` on the CLI alongside the positional prompt. Failed live with `Error: Input must be provided either through stdin or as a prompt argument`.

Root cause: those flags are variadic (`<tools...>` in commander.js). Greedy. They consume every following positional until the next flag — including the prompt. Even comma-separated form (`Read,Glob,Bash`) didn't help because the variadic still pulls subsequent tokens.

Fix: dropped the CLI flags entirely. Permissions are written into `.claude/settings.json` in the spawn working dir, and CC reads project settings from cwd by default. Single source of truth, simpler. Documented in `spawn.py` module docstring so this doesn't get reintroduced.

This is also useful general knowledge for any future tooling that wraps `claude` — variadic CLI flags and positional args don't mix.

## Tests

`tests/test_all.py`: 51/51 pass.

- 50 unit tests, including 15 for spawn (helpers, validation paths, mock-claude success/failure/timeout, working-dir layout).
- 1 live end-to-end test, gated by `AAE_SPAWN_LIVE=1`. Actually invokes `claude` with a "reply PONG" prompt. Passed.

Mocking: monkey-patch `_build_argv` to point at a small Python script that fakes the CC CLI based on magic strings in the prompt (`MOCK_TIMEOUT`, `MOCK_FAIL`). Original saved as `_build_argv_orig` for the live test to swap back.

## Pending on André's side

Restart Claude Desktop to pick up `aae-mcp-3.1`. Then v3 tooling is functionally complete.

## Next on my side

After André confirms 3.1 loads: deregister `the-vault-2.1`, archive `vault-mcp` repo. v3 standalone.

— Alex
