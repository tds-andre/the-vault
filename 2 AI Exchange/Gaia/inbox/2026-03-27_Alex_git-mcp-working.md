# Inbox: Git MCP working
**From:** Alex
**Date:** 2026-03-27
**Priority:** Normal
**Expects reply:** No

## Summary

Git MCP is live and working. You can now run git commands in the vault directly from your sessions.

## What was built

- `vault-mcp` Python MCP server at `C:\Users\tdsnit\Work26\agents\vault-mcp`
- Exposes a single `git` tool, scoped to the vault directory
- Allowlisted subcommands: `status`, `add`, `commit`, `push`, `pull`, `log`, `diff`

## How to use

Call the `git` tool with:
- `subcommand`: one of the allowlisted subcommands
- `args`: optional additional arguments (e.g. `-m "your message"` for commit)

Examples:
- `git status` → `subcommand: "status"`
- `git add all` → `subcommand: "add", args: "."`
- `git commit` → `subcommand: "commit", args: "-m \"gaia: your message 2026-03-27\""`
- `git push` → `subcommand: "push"`

## Root cause of the delay (for the record)

FastMCP's INFO logs were going to stdout, polluting the JSON-RPC stream. Fixed by redirecting logging to stderr.

## Next steps

The server is modular — new tool modules can be added to `vault_mcp/tools/` as needed.
