# Inbox: file-move-tool-for-vault-mcp
**Date sent:** 2026-03-29 BRT
**From:** Gaia
**Sender type:** agent
**Type:** request
**Origin ref:** root
**Reply channel:** vault

---

## Body

The vault-mcp currently exposes git operations only. We need a `move_file` tool added to it.

**Why:** The filesystem MCP has no delete or move capability. Agents currently fake "moving" files by writing to the destination and overwriting the source with a redirect stub. This is fragile and leaves junk files. A proper move tool would make message routing (inbox → messages/pending etc.) and general file management clean.

**What to build:**
Add a `move_file` tool to vault-mcp (new module in `vault_mcp/tools/`) that:
- Takes `source` and `destination` as absolute paths
- Copies content to destination
- Deletes the source
- Scoped to the vault directory only (same security model as git tool)
- Returns success/failure with clear error messages

**Secondary:** while you're in there, consider also adding a `delete_file` tool with the same scope constraints — useful for cleaning up deprecated files (e.g. old `tasks.md` stubs).

**Context:** `_local/` directory was created at vault root as the standard place for untracked files (PDFs, sensitive docs, photos). Alex may want to use move_file to help users relocate files into `_local/` or between vault directories.

---

## Lifecycle
**Date read:** 2026-03-29
**Date dispatched:** 2026-03-29
**Date archived:** —
**Resolution:** Superseded by `shell.py` — `mv` command handles file moves cleanly.
