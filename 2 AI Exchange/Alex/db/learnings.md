# Alex — Learnings
*Technical and software learnings accumulated across sessions.*
*Structured by topic. Query on demand — do not load at session start.*
*Last updated: 2026-03-27*

---

## MCP (Model Context Protocol)

### FastMCP stdout pollution bug
**Date:** 2026-03-27
**Context:** Building vault-mcp, a Python MCP server for git automation
**Learning:** FastMCP's INFO logs default to stdout, which pollutes the JSON-RPC stream and causes Claude Desktop to time out silently on all tool calls. The fix is to redirect logging to stderr before initializing the server.
**Fix:**
```python
import logging
logging.basicConfig(stream=sys.stderr)
```
**Impact:** This was the root cause of all agent session timeouts in Claude Desktop. Any MCP server built with FastMCP must do this.

### MCP commit message arg parsing
**Date:** 2026-03-27
**Context:** Gaia using vault-mcp git tool for first automated commit
**Learning:** The vault-mcp git tool splits `args` on spaces, so commit messages with spaces break. Messages must use hyphens or underscores.
**Workaround:** `gaia-YYYY-MM-DD-summary` format for commit messages.
**Future fix:** Wrap args parsing to handle quoted strings properly in vault-mcp.

### Claude Desktop MCP timeout behavior
**Date:** 2026-03-27
**Context:** Alex and other agents hanging on session start
**Learning:** Claude Desktop silently times out if too many sequential tool calls are made before the first response token is generated. The fix is the crawler pattern — greet first, read files progressively, never block first response on tool calls.
**Rule:** Never chain more than 1-2 tool calls before producing a first text response in Claude Desktop.

### vault-mcp architecture
**Date:** 2026-03-27
**Location:** `C:\Users\tdsnit\Work26\agents\vault-mcp`
**Design:** Modular Python MCP server. New tools added as modules in `vault_mcp/tools/`. Currently exposes one tool: `git` with allowlisted subcommands (status, add, commit, push, pull, log, diff), scoped to vault directory.
**Next extension points:** shell execution (broader commands), file watching, Toggl API, Microsoft ToDo API.

---

## Claude / AI Agents

### Project prompt "do not respond until" anti-pattern
**Date:** 2026-03-27
**Learning:** Instructing an agent to read files before responding causes silent hangs in Claude Desktop. The instruction "do not respond until you have read all X files" causes the model to chain tool calls indefinitely before generating a first token, triggering a timeout.
**Fix:** Always instruct agents to greet first, then read progressively. See crawler pattern in `agents.md`.

### Claude Desktop vs claude.ai MCP behavior
**Date:** 2026-03-27
**Learning:** MCP connections must be explicitly enabled per Project in Claude Desktop. A new Project doesn't automatically inherit the global MCP config. Always verify MCP is connected when setting up a new agent Project.

---
*Add new entries at the bottom of the relevant section, or create a new section if the topic is new.*
