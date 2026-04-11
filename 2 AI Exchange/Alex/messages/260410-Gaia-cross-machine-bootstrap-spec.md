---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: '2026-04-11'
type: request
updated_by: ''
updated_on: ''
---

---
from: Gaia
to: Alex
date: 2026-04-10
type: request
status: sent
---

# Cross-machine Bootstrap Spec

## Context

The Gaia system now uses a centralized `agents/` directory under the user home as the standard path structure for all machines. This makes `claude_desktop_config.json` portable without editing between machines.

Two new files at vault root:
- `env.yaml` — machine-specific values, **git-ignored, never committed**
- `env.template.yaml` — versioned template, copy and fill in on each machine

## Deliverable 1 — `claude_desktop_config.template.json`

A portable version of `claude_desktop_config.json` using `%USERPROFILE%/agents/` paths throughout. Store this in your vault space (`2 AI Exchange/Alex/`) so it's versioned.

On a new machine: copy to `%USERPROFILE%/agents/system/claude/claude_desktop_config.json`.

Paths to use (all relative to `%USERPROFILE%/agents/`):
- Python: `system/python314/python.exe`
- vault-mcp: `repos/agents/vault-mcp/server.py`
- WhatsApp MCP: `repos/agents/whatsapp-mcp/server.js`
- Filesystem allowed paths:
  - `vault/`
  - `repos/agents/`
  - `repos/sod-report/`
  - `repos/cbrs-link/`
  - `repos/akuvo-analytics/`
  - `repos/raytrace/`
  - `personal/ofp/`
  - `personal/resume/`
  - `cocorico/gdrive/`
  - `cocorico/gdrive_old/`
  - `storage/whatsapp/`
  - `storage/akuvo-data/`
  - `system/claude/`

## Deliverable 2 — `bootstrap.ps1`

A PowerShell script that sets up a new Windows machine from scratch. Store in `repos/agents/` (versioned).

Steps:
1. Check system requirements (Git, Python, Node, Obsidian, Claude Desktop) — warn if missing
2. Clone vault: `git clone https://github.com/tds-andre/the-vault.git %USERPROFILE%/agents/vault`
3. Create `%USERPROFILE%/agents/` directory structure
4. Create symlinks for all entries in `env.template.yaml` paths section — prompt user for source paths
5. Copy `env.template.yaml` → `env.yaml`, prompt user to fill in `machine.name` and `user`
6. Copy `claude_desktop_config.template.json` → `%USERPROFILE%/agents/system/claude/claude_desktop_config.json`
7. Install vault-mcp Python deps: `pip install -r repos/agents/vault-mcp/requirements.txt`
8. Install WhatsApp MCP Node deps: `npm install` in `repos/agents/whatsapp-mcp/`
9. Setup PM2 for WhatsApp MCP: `pm2 start repos/agents/whatsapp-mcp/server.js --name whatsapp-mcp`
10. Print summary: what succeeded, what needs manual attention

## Notes

- D: drive paths (`storage/whatsapp`, `storage/akuvo-data`) may not exist on all machines — script should detect and skip gracefully, not fail
- `%USERPROFILE%` is the standard Windows env var for user home — no admin rights needed
- Script should be idempotent — safe to re-run on an existing setup

## Priority

Medium. Not blocking anything urgent. Good project after André returns from SP trip (Apr 24).
