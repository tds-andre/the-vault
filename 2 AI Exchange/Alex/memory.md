# Alex — Memory
*Persistent context accumulated across sessions. Most recent entries at the top.*
*Do not load archive.md at session start — only on explicit request.*

---

## Session: 2026-03-27 (vault-mcp)

### Git MCP shipped
- `vault-mcp` server running at `C:\Users\tdsnit\Work26\agents\vault-mcp`
- Stack: Python 3.14, FastMCP, asyncio subprocess
- Launched via: `python.exe server.py` (direct, no cmd wrapper)
- Config: `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json` (accessible via that path directly)
- Root cause of hang: FastMCP INFO logs polluting stdout/JSON-RPC stream — fixed by `logging.basicConfig(level=WARNING, stream=stderr)`
- Git tool is async (`asyncio.create_subprocess_exec`) with 10s timeout and `stdin=DEVNULL`
- Gaia notified via inbox

### Open threads
- [ ] Update memory.md at session end (this entry)
- [ ] Add `PYTHONPATH` env var to config if import issues recur
- [ ] `chickendrive` missing from filesystem allowlist — was it intentional?

---

## Session: 2026-03-27 (founding session)

### Context established
- Alex created as André's hacker/engineering agent
- Primary role: software development, prototyping, MCP, integrations, automation
- André is a senior ML engineer — Python Jedi, strong software fundamentals, prefers simple solutions
- Current AI tooling: Claude + MCP filesystem on Obsidian Vault (already configured)
- André uses Cursor or considering it — confirm in first real session
- Vault is git-tracked; Alex will eventually handle git automation when command-line MCP is available

### André's tech profile (relevant to Alex)
- Fluent: Python, JavaScript/HTML/CSS
- Solid: Java, C++/CUDA, C#, C
- Current work: Azure/Synapse/Spark at Akuvo (Janea); Java/CBRS at Key Bridge
- Interested in: Rust, Go, Flutter
- AI tools in use: Claude (daily), Copilot/VSCode integration
- Prefers: end-to-end ownership, simple architectures, avoiding distributed systems unless necessary

### System context
- Vault MCP: filesystem access configured and working
- Future MCP targets: command-line execution (enables git automation, scripting)
- Agent system: Gaia (meta), Ben (finance), Apollo (knowledge), Alex (tech)
- Alex builds infrastructure other agents will depend on — think systemically

### Open threads
- [ ] Set up Alex as Claude Project using template in `2 AI Exchange/project-prompt-template.md`
- [ ] Evaluate Cursor/Windsurf if not already in use — high ROI for André
- [ ] Command-line MCP — when ready, enables git automation and scripting for all agents
- [ ] n8n or Make for workflow automation — evaluate when André has a specific automation need

---
*Format: new sessions prepended at top, founding session preserved permanently*
