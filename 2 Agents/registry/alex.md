---
created_by: Alex claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: registry-agent
updated_by: ''
updated_on: ''
---

# alex.md — Per-Agent Registry Anchor (Alex)

Loaded at boot (ML).

## My functions (MA)

| Function | Body | Description |
|---|---|---|
| `spawn` | `2 Agents/functions/spawn.md` | Spawn narrows or servitors |
| `note-authoring` | `2 Agents/functions/note-authoring.md` | Author/edit notes |
| `housekeeping` | `2 Agents/functions/housekeeping.md` | Maintenance routines |
| `mcp-deploy-pipeline` | `2 Agents/Alex/functions/mcp-deploy-pipeline.md` | Ship a change to an MCP server end-to-end (cache-bust, config edit, backup, verify) |

## My notes

| Note | Purpose |
|---|---|
| `notes/learnings.md` | Accumulated technical learnings, blind spots |
| `notes/vault-mcp.md` | Historical reference for `the-vault` MCP (being archived; superseded by aae-mcp) |
| `notes/migration-notes.md` | Issues & decisions from v2→v3 migration |

## My paths

| What | Path |
|---|---|
| aae-mcp repo (primary) | `C:\Users\tdsnit\Work26\agents\aae-mcp\` |
| vault-mcp repo (legacy, archive-pending) | `C:\Users\tdsnit\Work26\agents\vault-mcp\` |
| whatsapp-mcp repo (deregistered, reactivatable) | `C:\Users\tdsnit\Work26\agents\whatsapp-mcp\` |
| cocoripede repo | `C:\Users\tdsnit\agents\repos\cocoripede` |
| Python 3.14 | `C:\Users\tdsnit\AppData\Local\Programs\Python\Python314\python.exe` |
| Managed venvs | `C:\Users\tdsnit\Work26\venvs\` |
| Claude Desktop MCP config | `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json` |
| Claude Desktop config backup (legacy v2 location) | `2 AI Exchange/Alex/db/claude_desktop_config.backup.json` |
| Claude Code CLI binary | `C:\Users\tdsnit\.local\bin\claude` |
| aae-mcp env config (gitignored) | `C:\Users\tdsnit\Work26\agents\aae-mcp\env.yaml` |
| aae-mcp env template | `C:\Users\tdsnit\Work26\agents\aae-mcp\env.template.yaml` |
| Spawn workdirs (gitignored) | `C:\Users\tdsnit\Work26\agents\aae-mcp\spawns\` |

## My tools

| Tool | Purpose |
|---|---|
| `aae-mcp-3.1` (own MCP) | All notes ops, shell, move/delete, now, spawn |
| `the-vault-2.1` (legacy) | Mounted in parallel during cutover; deregister after verify |
| `filesystem` (Anthropic) | Read/write/list/search outside vault-mcp scope |
| Claude Code CLI | Spawned subprocess target (`claude --print --no-session-persistence`) |
| PM2 (Node) | Process manager — used by whatsapp-mcp; currently empty list |
| Cowork | Native Claude Code project harness (vault mounted) |
