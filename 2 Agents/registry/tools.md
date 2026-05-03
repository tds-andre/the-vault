---
type: registry
env: dependent
---

# tools.md — MCP Servers & Configs

On-demand registry file. The MCP servers the AAE relies on, plus pointers to configs that govern them. The agent doesn't choose the harness; the human does. The harness loads the MCPs declared in its config.

---

## Active

| Server | Source | Notes |
|---|---|---|
| `filesystem` | npm `@modelcontextprotocol/server-filesystem` | Anthropic-shipped. General read/write/list/search across allowlisted paths. |
| `aae-mcp` | repo `aae-mcp` (Python) | Custom server. Cutover from `vault-mcp` completed 2026-05-03. Provides `shell`, `move_file`, `delete_file`, `now()`, `spawn`, and an 11-tool notes module (frontmatter + section ops). |

### `aae-mcp` tools (in detail)

| Tool | Purpose |
|---|---|
| `shell` | Full-capability shell, no allowlist for v3.0. Replaces v2's `shell` + `run`. |
| `move_file` | File rename / move. Custom because `filesystem:move_file` has Windows case-insensitive rename issues. |
| `delete_file` | File delete. Custom for the same Windows reason. |
| `now()` | BRT timestamp. |
| `spawn` | Spawn narrow or servitor; wraps Claude Code CLI as a subprocess. See `2 Agents/functions/spawn.md`. Sync only for v3.0 (5-minute hard timeout). |
| Notes module (11 tools) | `create_note`, `append_note`, `prepend_note`, `read_section`, `read_sections`, `read_footnote`, `update_footnote`, `update_properties`, `note_info`, `read_notes`, `read_folder`. Frontmatter + section operations not available in `filesystem`. |

## Inactive / soft-removed

| Server / tool | Reason | Reactivation cost |
|---|---|---|
| `vault-mcp` (v2 custom MCP, also called `the-vault-2.1`) | Superseded by `aae-mcp`; dismounted 2026-05-03 | Code preserved at `C:\Users\tdsnit\Work26\agents\vault-mcp\` |
| `whatsapp-mcp` (Baileys + PM2) | Deactivated for v3.0 | Reactivatable on demand. PM2 needs to be running; service path `D:\vault-data\whatsapp\auth\` |
| `git` MCP tool | Removed; André runs git manually | n/a |
| `python_tool`, `node_tool` (in `aae-mcp`) | Soft-removed (deregistered in `server.py`); code preserved in `_attic/` | ~5 minutes — re-register and restart |

## Configs

| File | Path |
|---|---|
| Claude Desktop config | `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json` |
| Claude Desktop logs | same dir as config |
| Claude Code CLI binary | `C:\Users\tdsnit\.local\bin\claude` |
| Per-spawn permission profile | `.claude/settings.json` written by `aae-mcp:spawn` to the spawned vessel's working dir |

## Notes

- **Permission profiles for spawn:** `read-only`, `notes-only`, `full-vault`, `full-machine`. The only hard rule is that `full-machine` is restricted to full vessels of Gaia or Alex. All other choices are advisory; the spawning owner picks per situation. Bodies in `aae-mcp:spawn` enforcement; semantics in `2 Agents/functions/spawn.md`.
- **Topology direction:** integrate rather than break apart. New MCP servers only when the category is genuinely different (e.g., a future comm-channels MCP for WhatsApp / email / inbox bridge). Adding capability to `aae-mcp` is preferred to spawning new servers.
