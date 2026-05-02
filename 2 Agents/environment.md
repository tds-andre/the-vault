---
type: environment
env: dependent
---

# environment.md — Current machine

Free-form description of the machine this AAE instance runs on. Loaded at boot in both full and narrow modes so agents know where they are. Not part of the registry; may stale.

---

## Machine

- **Name:** main-pc (André's primary workstation)
- **OS:** Windows
- **User:** tdsnit

## Vault

- **Location:** `C:\Users\tdsnit\Documents\Obsidian Vault\`
- **Symlink (canonical for some tools):** `C:\Users\tdsnit\winlinks\obsidian-default-vault`
- **Git-managed:** yes; manual commits only (André).

## Notable working dirs outside the vault

- `C:\Users\tdsnit\Work26\` — active repos (akuvo-analytics2, sod-report, cbrs-studio-*, agents/)
- `C:\Users\tdsnit\agents\` — central agent infrastructure, repos, MCP servers
- `C:\Users\tdsnit\My Drive (tds.andre@gmail.com)\` — Google Drive sync (gdrive)
- `J:\My Drive\frango\` — legacy Cocoricó gdrive
- `D:\vault-data\whatsapp\` — WhatsApp session data
- `D:\akuvo-data\` — Akuvo data

## MCP servers configured

- `filesystem` (Anthropic-shipped, npm) — 16 paths whitelisted
- `the-vault-2.1` (custom Python; will be replaced by `aae-mcp`)
- `whatsapp-mcp` (currently active in v2; dropped from v3.0 active config)

## Harnesses available

- Claude Desktop (primary)
- Cowork (planned for parallel sessions)
- Claude Code CLI (planned for background and inter-agent spawns)
- VS Code (with Claude / Copilot)

## Notes

- Path conventions: backslashes work in Windows tooling; forward slashes work in most MCP tools and config files.
- Python 3.14 is the default Python on this machine.
- v3 ecosystem at `2 Agents/`; v2 ecosystem at `2 AI Exchange/` still active during transition.
