---
type: registry
env: dependent
---

# enablers.md — Enabling Systems

On-demand registry. Catalogs underlying systems agents may rely on (interpreters, services, package managers).

---

| System | Version / location | Purpose |
|---|---|---|
| Python | 3.14 — `C:\Users\tdsnit\AppData\Local\Programs\Python\Python314\python.exe` | runs `aae-mcp` and ad-hoc scripts |
| Node.js | system default | runs `whatsapp-mcp` (when active) and `filesystem` MCP |
| npm | system default | package management for Node MCPs |
| pip | bundled with Python | package management for Python MCPs |
| Obsidian | system default | vault editor (André's primary UI) |
| Claude Desktop | system default | primary harness |
| Claude Code CLI | system default | secondary harness; spawn target |
| Cowork | system default | parallel-session harness |
| VS Code | system default | code editing; Copilot harness for file-spawned narrows (UC1) |
| PM2 | npm global | process manager for `whatsapp-mcp` Baileys service (when active) |
| Git | system default | version control for the vault and repos |

## Credentials

Never store values here. Pointers only:

| Credential | Where it lives |
|---|---|
| Claude API key | env var (managed by harness) |
| Google Drive auth | system Google account |
| Git credentials | system credential manager |
| WhatsApp session | `D:\vault-data\whatsapp\auth\` (when active) |
