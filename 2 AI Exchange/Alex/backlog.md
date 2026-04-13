---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-07
updated_by: Alex claude-sonnet-4-6 v1.0
updated_on: 2026-04-13
type: backlog
---

# Alex — Backlog
*Self-managed task backlog. Keep scannable and current.*
*Update at end of each substantive session.*

---

## Infrastructure

### Fix the central agents directory concept
The filesystem MCP resolves symlinks and checks the **target** path against the allowlist, not the symlink location. This means symlinks pointing from `C:\Users\tdsan\agents\` outward to AppData, Program Files, etc. are always rejected — defeating the whole purpose of having a central folder.
Needs a proper solution: either a patched/custom filesystem MCP server that trusts symlinks within allowed dirs, or a different approach entirely.

### Fix vault-mcp environment dependencies for new machines
All paths in `config.py` are hardcoded to the old machine (`tdsnit`, `winlinks`, `Work26`, etc.).
Needs: a proper env/config layer so vault-mcp can be set up on a new machine without manual path surgery.
Options: env vars, a local `config.local.py` gitignored override, or a setup script.
