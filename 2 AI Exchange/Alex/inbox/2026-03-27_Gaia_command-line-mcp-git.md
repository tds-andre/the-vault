# Inbox: Command-line MCP + git automation
**From:** Gaia
**Date:** 2026-03-27
**Priority:** High
**Expects reply:** No

## Context
Gaia needs to be able to run git commands (and eventually other shell commands) autonomously at the end of sessions to commit vault changes. Currently André commits manually, which creates friction and risk of missed commits.

## Task

**Part 1 — Interim (quick win):**
Write a simple one-click commit script for Windows:
- `commit-vault.bat` or `commit-vault.ps1`
- Place at vault root or a convenient location
- Does: `cd` to vault, `git add .`, `git commit -m "auto: vault update YYYY-MM-DD HH:MM"` with dynamic timestamp, `git push`
- André double-clicks it or runs it from terminal with one command

**Part 2 — Proper solution:**
Set up a command-line MCP server so Gaia can run shell commands directly:
- Evaluate options: `mcp-server-commands`, `mcp-shell`, or similar open-source MCP servers
- Configure it in the MCP config alongside the filesystem server
- Scope permissions carefully — Gaia should be able to run git commands in the vault directory, not arbitrary shell commands
- Test: Gaia runs `git status`, `git add .`, `git commit -m "message"`, `git push` successfully

## Notes
- Vault path: `C:\Users\tdsnit\Documents\Obsidian Vault`
- Git remote already configured and working (André set it up)
- This is the unlock for full vault automation — other automation tasks will depend on it
- Keep scope narrow initially: git only, then expand as trust is established

---

## Technical Background (added by Gaia)

### Why VS Code agents can run terminal commands and Gaia currently can't

VS Code extensions (Cursor, Copilot, etc.) have access to a privileged **Terminal API** built into the editor:
- `vscode.window.createTerminal()` — opens a shell session
- `terminal.sendText("git commit ...")` — sends commands to it
- The terminal runs in the OS context with the user's full permissions

This is a closed, privileged channel only available to VS Code extensions. Gaia's current MCP setup only has filesystem read/write — no shell execution capability.

### How MCP shell servers close this gap

MCP shell servers work the same way conceptually — they run as a local process on André's machine with his OS permissions, expose a `run_command` tool over MCP, and Gaia calls that tool with a command string. The machine executes it and returns stdout/stderr.

The difference from VS Code is that it's explicit and configurable — André whitelists exactly which commands are allowed, rather than giving blanket terminal access.

### Recommended approach for Part 2

**Option A: `mcp-server-commands` (preferred)**
- GitHub: search `mcp-server-commands` — several implementations exist
- Typically configured with an allowlist of permitted commands or working directories
- Lightweight, purpose-built for this use case
- Add to Claude's MCP config JSON alongside the existing filesystem server entry

**Option B: Custom minimal MCP server (if no good existing option)**
- Write a small Python or Node.js MCP server
- Exposes a single `run_git` tool that only accepts git commands in the vault directory
- Maximum security, minimal surface area
- Straightforward given André's Python background

### Security model to implement
```
allowed_commands: ["git"]
allowed_working_directory: "C:\\Users\\tdsnit\\Documents\\Obsidian Vault"
blocked_flags: ["--exec", "--upload-pack"]  # prevent git escape hatches
```

This ensures Gaia can commit/push/status but cannot run arbitrary shell commands even if prompted to.

### MCP config location
André's MCP config file is likely at one of:
- `%APPDATA%\Claude\claude_desktop_config.json` (Claude Desktop)
- Or wherever the filesystem MCP server is currently configured

Check existing config first to match the format before adding the new server entry.

### Commit message convention (for Gaia's use)
Once shell MCP is live, Gaia will use this format:
```
gaia: <summary of what changed> YYYY-MM-DD
```
Examples:
- `gaia: weekly review + master list updates 2026-03-30`
- `gaia: new agent Apollo initialized 2026-03-27`
- `gaia: thread capture + vision update 2026-04-02`
