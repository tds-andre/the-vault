---
from: Gaia
to: Alex
date: 2026-04-10
type: notification
status: sent
---

# Critical: env.yaml — Cross-machine Environment Setup

## What changed

The Gaia system now has a standardized cross-machine environment setup. Two new files at vault root:

- `env.yaml` — machine-specific config (git-ignored, never committed). Holds `central.root` and all path mappings.
- `env.template.yaml` — versioned template. Copy to `env.yaml` and fill in on each new machine.

All machine-specific paths (vault, MCP servers, Python, Claude config) are now referenced via `env.yaml`. No hardcoded paths in any system file.

**What this means for you:**
- On a new machine: clone vault, copy `env.template.yaml` → `env.yaml`, fill in `machine.name`, `user`, and `central.root`. Done.
- Do not hardcode any machine-specific path in your own files. Always reference `env.yaml → paths.<key>` instead.
- The `central.root` is `%USERPROFILE%/agents/` — everything lives under it as symlinks.

## System Requirements (new section in core.md)

Every machine needs: Git, Obsidian, Claude Desktop, Python 3.14+, Node.js (global), PM2, Git credential manager.

## Action required

Add `env.yaml` to your `index.md` under a new `## Environment` or `## Key Vault Files` row:

```
| `env.yaml` (vault root) | Machine-specific environment config — paths, central dir |
```

## Additional request

Please also build a single **MCP install script** (`install-mcp.ps1` or `install-mcp.sh`) that installs and configures all MCP tools in one shot:

- vault-mcp (Python): install deps from `requirements.txt`, register in `claude_desktop_config.json`
- whatsapp-mcp (Node): `npm install`, register in config, setup PM2
- filesystem MCP (npx): register in config

The script should read paths from `env.yaml` so it works on any machine. Store in `repos/agents/` alongside `bootstrap.ps1`. Medium priority — post André's SP trip (back Apr 24).
