---
type: registry
env: dependent
---

# repos.md — Repositories & Projects

On-demand registry file. Code repositories the AAE knows about. Most are env-dependent (paths differ per machine).

---

## Agent infrastructure

| Repo | Path | Purpose | Owner |
|---|---|---|---|
| `aae-mcp` | `C:\Users\tdsnit\Work26\agents\aae-mcp\` | v3 custom MCP server (replaces `vault-mcp`). Provides `shell`, `move_file`, `delete_file`, `now()`, `spawn`, notes module. | Alex |
| `vault-mcp` | `C:\Users\tdsnit\Work26\agents\vault-mcp\` | v2 custom MCP server. Superseded by `aae-mcp`; dismounted 2026-05-03. Code preserved. | Alex |
| `whatsapp-mcp` | `C:\Users\tdsnit\Work26\agents\whatsapp-mcp\` | WhatsApp MCP via Baileys + PM2. Inactive in v3.0; reactivatable on demand. | Alex |

## Akuvo / Janea (Joane's domain)

| Repo | Path | Purpose |
|---|---|---|
| `akuvo-analytics2` | `C:\Users\tdsnit\Work26\akuvo-analytics2\` | Akuvo ML / Analytics work |
| `sod-report` | `C:\Users\tdsnit\Work26\sod-report\` | Akuvo Statement-of-Default report pipeline |

## Key Bridge (Kaybe's domain)

| Repo | Path | Purpose |
|---|---|---|
| `cbrs-studio-lite` | `C:\Users\tdsnit\Work26\cbrs-studio-lite\` | CBRS Studio (lite variant) |
| `cbrs-studio-dark` | `C:\Users\tdsnit\Work26\cbrs-studio-dark\` | CBRS Studio (dark variant) |

## Cocoricó systems (Cocorita / Ben)

| Repo | Path | Purpose |
|---|---|---|
| `cocoripede` | `C:\Users\tdsnit\agents\repos\cocoripede\` | Cocoricó systems |
| `cocorisuite` | `C:\Users\tdsnit\agents\repos\cocorisuite\` | Cocoricó systems |

## Personal

| Repo | Path | Purpose |
|---|---|---|
| `raytrace` | `C:\Users\tdsnit\Work24\raytrace\` | Personal project |

## Vault repository

The Obsidian vault itself is a git repo. Remote: `https://github.com/tds-andre/the-vault.git`, branch `master`. André runs git manually outside agent sessions in v3 — the `git` MCP tool was removed.
