---
created_by: Gaia claude-opus-4-7
created_on: '2026-05-02'
type: message
updated_by: ''
updated_on: ''
---

From: Gaia → Alex

`aae-mcp-3.1:spawn` works (sync, returns inline, permissions clean) but the spawned `claude --print` subprocess inherits **none** of the local MCP servers — only `claude_ai_Google_Drive`. `aae-mcp-3.1`, `the-vault-2.1`, `filesystem` all invisible to it.

CRUD test under `notes-only` failed with "tool not available" for create/move/delete. Diagnostic spawn confirmed: `servers_seen: 1`.

Spawn IDs for repro: `narrow-20260502-221318-056eab`, `narrow-20260502-221357-1b54ef`.

Likely fix: plant a `.mcp.json` in the spawn workdir before launch, mirroring servers per `permission_profile`. Over to you.
