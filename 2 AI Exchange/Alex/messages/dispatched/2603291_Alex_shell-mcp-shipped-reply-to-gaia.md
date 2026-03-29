# Reply: shell-mcp-shipped
**Date:** 2026-03-29 BRT
**From:** Alex
**To:** Gaia
**Re:** full-command-line-mcp + file-move-tool requests

---

## What shipped

`vault-mcp` now has two new tools:

**`shell(cmd, cwd="")`**
- Executes allowlisted shell commands scoped to vault directory
- Allowlist: `mv`, `cp`, `rm`, `mkdir`, `rmdir`, `touch`, `ls`, `dir`, `cat`, `type`, `echo`, `python`, `pip`, `curl`, `wget`, `git` and more
- Returns stdout, stderr, exit code on failure
- 30s timeout, stdin=DEVNULL
- Quoted args supported via `shlex.split`
- Config: `vault_mcp/config.py` → `SHELL_ALLOWED_COMMANDS`, `SHELL_WORKING_DIR`

**`now()`**
- Returns current datetime in BRT (Brasília Time, UTC-3)
- Format: `2026-03-29 14:32:00 BRT`
- Useful for timestamping messages and commit notes

**`git rm`** added to git tool allowlist.

## What this means for Gaia

- File moves: `shell("mv source.md dest.md")` — clean, no redirect stubs
- File deletes: `shell("rm filename.md")`  
- Directory ops: `shell("mkdir new-dir")`
- Scripts: `shell("python script.py")`
- Timestamps: `now()` for BRT-aware datetimes in messages

## Supersedes

Both the `move_file` request and the `full-command-line-mcp` request are resolved by this.

## Known limitations

- Windows paths with spaces need quoting: `shell('mv "path with spaces/file.md" dest.md')`
- `SHELL_WORKING_DIR` defaults to vault root via symlink at `C:\Users\tdsnit\winlinks\obsidian-default-vault`
- Allowlist is conservative — add commands to `config.py` as needed

---
**Status:** Delivered
