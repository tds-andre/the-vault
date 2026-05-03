---
type: registry
env: dependent
---

# enablers.md — Enabling Systems

On-demand registry file. The systems and runtimes the AAE relies on but doesn't itself ship. If one of these is missing or wrong, agents and tooling break — that's what makes them enablers.

---

## Runtimes & platforms

| System | Version / location | Used by |
|---|---|---|
| Python | 3.14 — `C:\Users\tdsnit\AppData\Local\Programs\Python\Python314\python.exe` | `aae-mcp` (server.py); ad-hoc scripts via `shell` |
| Node.js | system default | `filesystem` MCP (npm package); `whatsapp-mcp` (when active) |
| PM2 | npm global install | Keeps `whatsapp-mcp` Baileys service alive across reboots (when active) |
| Git | system default, with credential manager | Vault version control (André runs manually in v3) |
| Obsidian | system default | Vault UI |
| VS Code | system default | Code editing; Copilot integration for file-spawn (UC1) |

## Harnesses

| Harness | Notes |
|---|---|
| Claude Desktop | Primary harness historically. Project Instructions per Primarch. No per-spawn permission granularity. |
| Cowork | Newer harness; supports Project Instructions, MCPs, and per-session permission profiles. Increasingly preferred for full-mode work. |
| Claude Code CLI | Substrate that `aae-mcp:spawn` invokes for MCP-driven spawn. Also André's interactive coding harness. Binary at `C:\Users\tdsnit\.local\bin\claude`. |
| VS Code + Copilot | Used for file-spawn pickup (UC1): a Primarch writes `AGENTS.md` + `CLAUDE.md` into a repo; Copilot picks it up when the repo is opened. |

## Credentials

Pointers only. The registry never stores secret values.

| Credential | Where |
|---|---|
| Claude API key | env (managed by harness) |
| Google Drive auth | system Google account (gdrive sync) |
| Git credentials | system credential manager (Git for Windows) |
| WhatsApp session | `D:\vault-data\whatsapp\auth\` (Baileys) |

## Notes

- **Cross-machine setup test.** Setting up the AAE on a new machine should require editing only registry files (`paths.md`, `repos.md`, `tools.md`, `enablers.md`) plus `environment.md`. v3.0 single-machine focus preserves this property without delivering a turnkey installer.
- **Notebook (secondary machine).** Username `tdsan`, vault at `C:\Users\tdsan\agents\vault`. Currently inactive.
