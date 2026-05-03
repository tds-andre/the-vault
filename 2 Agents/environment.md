---
type: environment
env: dependent
---

# environment.md — Current Machine

Free-form description of the machine and runtime an agent is actually executing on. Loaded at boot in both full and narrow modes. Not part of the registry — registry files are stable schemas; this file changes whenever the machine, harness, or active tooling changes.

## Machine

- **Hostname:** `main-pc` — Windows · user `tdsnit`
- **Timezone:** BRT (Brasília Time, UTC-3, Niterói RJ). Does not observe daylight saving.
- **Vault path:** `C:\Users\tdsnit\Documents\Obsidian Vault\` (also reachable via the symlink `C:\Users\tdsnit\winlinks\obsidian-default-vault`)
- **OS quirks worth knowing:** Windows is case-insensitive but case-preserving for filenames. The Anthropic-shipped `filesystem` MCP has had issues with `move_file` rename-only operations on Windows, which is why `aae-mcp` ships its own `move_file` and `delete_file`. Symlinks resolved by the filesystem MCP block paths outside the allowed root — this is why the central-directory + symlinks approach was abandoned in favor of `paths.csv` per machine.

## Harnesses available

- **Claude Desktop** — primary harness for full-mode Primarch sessions historically. Project Instructions mechanism is per-Primarch. No per-spawn permission granularity.
- **Cowork** — newer harness; supports Project Instructions, MCPs, and per-session permission profiles. Increasingly the preferred harness for full-mode work.
- **Claude Code CLI** — the substrate `aae-mcp:spawn` invokes for MCP-driven spawn. Also André's interactive coding harness for repo work.
- **VS Code with Copilot** — used for file-spawn pickup (UC1): a Primarch writes `AGENTS.md` + `CLAUDE.md` into a repo and Copilot picks it up when the repo is opened.

## Active MCP servers

- `filesystem` — Anthropic-shipped (`@modelcontextprotocol/server-filesystem` via npm). General read/write/list/search across allowlisted paths.
- `aae-mcp` — custom server in `C:\Users\tdsnit\Work26\agents\aae-mcp\` (formerly `vault-mcp` / `the-vault-2.1`). Cutover completed 2026-05-03. Provides: full-capability `shell`, `move_file`, `delete_file`, `now()`, `spawn`, and an 11-tool notes module (frontmatter and section ops).

## Inactive / soft-removed

- `whatsapp-mcp` — local Node + Baileys via PM2; deactivated for v3.0, reactivatable on demand.
- `python_tool`, `node_tool` — soft-removed from `aae-mcp`; code preserved in `_attic/`. Reactivatable in ~5 minutes.
- `git` MCP tool — removed; André runs git manually outside the session.

## v2 / v3 coexistence

The v2 ecosystem at `2 AI Exchange/` is preserved untouched. Apollo, Jax, Laix, Layla still live there. v2 and v3 do not cross-reference. Do not edit anything under `2 AI Exchange/` from a v3 session unless explicitly told to.

## Notebook (secondary machine)

A notebook exists with username `tdsan` (different from main PC `tdsnit`); vault cloned to `C:\Users\tdsan\agents\vault`. Cross-machine setup uses `paths.csv` (machine-specific, git-ignored) plus `paths.template.csv` (versioned). Currently inactive — main PC is the working machine.

For paths, repos, MCPs, and enablers in detail see `2 Agents/registry/`.
