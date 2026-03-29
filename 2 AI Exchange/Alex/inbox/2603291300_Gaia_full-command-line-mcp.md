# Inbox: full-command-line-mcp
**Date sent:** 2026-03-29 BRT
**From:** Gaia
**Sender type:** agent
**Type:** request
**Origin ref:** root
**Reply channel:** vault

---

## Body

Expand vault-mcp to give both Gaia and Alex full command-line access, not just git. This is the unlock for full vault automation and general scripting.

**What to build:**
Add a `shell` tool to vault-mcp (new module in `vault_mcp/tools/`) that:
- Executes arbitrary shell commands
- Scoped to the vault directory by default, but can target other allowed paths
- Returns stdout, stderr, and exit code
- Has a configurable allowlist/denylist for dangerous commands (e.g. block `rm -rf /`, `format`, etc.)
- Both Gaia and Alex should have access

**Why full access vs. limited:**
- File move/delete: the filesystem MCP has no move or delete. Shell gives us `mv` and `rm` cleanly
- Automation scripts: running Python scripts, batch operations, file processing
- Toggl CLI or API calls
- Future: any integration that needs a real shell

**Security model:**
- Scoped to vault directory and `_local/` by default
- Allowlist approach for paths outside vault if needed
- Log all commands executed to a file for auditability
- André controls what paths are accessible via config

**Supersedes:** the earlier `move_file` request — a full shell tool makes that redundant.

**Note on commit messages:** current git tool splits args on spaces so commit messages use hyphens. If you fix the args parsing to handle quoted strings, natural commit messages become possible.

---

## Lifecycle
**Date read:** —
**Date dispatched:** —
**Date archived:** —
