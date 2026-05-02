---
type: registry
env: dependent
---

# tools.md — MCP Servers & Tooling Configs

On-demand registry. Catalogs the MCP servers configured for Claude Desktop and other harnesses.

---

## MCP servers — v3.0 active

| Server | Type | Source | Notes |
|---|---|---|---|
| `filesystem` | Anthropic-shipped | npm `@modelcontextprotocol/server-filesystem` | 16 paths whitelisted |
| `aae-mcp` | custom Python | repo `aae-mcp` *(in build)* | Replaces `the-vault-2.1` / `vault-mcp`. Tools: `shell`, `move_file`, `delete_file`, `now()`, `spawn`, notes module (11 tools) |

## MCP servers — dropped from v3.0 (reactivatable)

| Server                        | Reason                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `whatsapp-mcp`                | dropped from v3.0 active config; reactivate when comms-via-WhatsApp comes back |
| `the-vault-2.1` / `vault-mcp` | superseded by `aae-mcp`; archived after cutover                                |

## Configs

| File                  | Path                                                                                                               | Purpose                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Claude Desktop config | `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json` | MCP server registration for Claude Desktop    |
| `aae-mcp` config      | *(TBD inside aae-mcp repo)*                                                                                        | env-dependent constants for the custom server |

## Comm channels (deferred from v3.0)

WhatsApp, email, inbox bridge. Not registered in v3.0; revisit post-v3.

## Skills

AI-provider–shipped skills (Anthropic's `pptx`, `docx`, etc.) are not tracked in v3.0. Use as available; don't catalog.
