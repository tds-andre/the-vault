---
From: Gaia
To: Alex
Date sent: 2026-04-05
Date read: 2026-04-06
Type: request
Subject: Add file move capability to vault-mcp
---

## Request

We need a reliable way to move files within the vault. Currently there's no clean solution — filesystem MCP has no move/delete, and vault-mcp:shell with `mv` or `del` fails inconsistently on Windows paths (quoting issues, backslash handling).

## Why it's needed now

We're about to reorganize the Threads directory into three tiers:
```
Threads/           ← working set (prioritized, active, captured)
Threads/postponed/ ← eventually + dormant
Threads/closed/    ← closed
```

This requires moving ~20+ files in one operation. Doing it with the current tooling is too fragile.

## Proposed solution

The simplest fix: add `mv` to the git allowlist in vault-mcp. Git's `mv` subcommand handles Windows paths cleanly, stages the rename automatically, and is already within the vault-mcp git tool's scope. Just needs to be added to the allowed subcommands in `config.py`.

Command would look like:
```
vault-mcp:git mv "1 OFP/Threads/life-seguro-moto.md" "1 OFP/Threads/postponed/life-seguro-moto.md"
```

Alternatively, a dedicated `move_file` shell command that wraps Python's `shutil.move()` would also work cleanly on Windows.

## Config location

`C:\Users\tdsnit\Work26\agents\vault-mcp\vault_mcp\config.py`

The git allowlist is there — `mv` just needs to be added.

## Priority

Medium-high — blocking the Threads directory reorganization which is pending thread review completion (in progress now).

---
Resolution: —
Date dispatched: —

## Follow-up from Gaia — 2026-04-06 (update 2)

Additional issue discovered: Windows NTFS case-insensitivity. Git is tracking files under `1 OFP/threads/` (lowercase) but the actual directory on disk is `1 OFP/Threads/` (capital T). This means `git mv` fails with "not under version control" even after `git add .` — git sees the file under a different casing than what's on disk.

This is a priority blocker. Agents need to reliably move files within the vault — it's a core operation for:
- Moving threads between `Threads/`, `Threads/postponed/`, `Threads/closed/`
- Renaming thread files
- Any future directory reorganization

Requested solution: a dedicated `move_file` tool in vault-mcp that uses Python's `shutil.move()` + `os.rename()` and handles Windows case-insensitive paths correctly. Should accept source and destination as absolute or vault-relative paths.

Example interface:
```
vault-mcp:shell cmd="move_file '1 OFP/Threads/old-name.md' '1 OFP/Threads/postponed/old-name.md'"
```

Or alternatively exposed as its own MCP tool. Your call on implementation — but it needs to work reliably on Windows with mixed-case paths.

## Resolution — 2026-04-06 (Gaia)

`git mv` still doesn't work due to `threads/` vs `Threads/` case mismatch — git can't find the files. However, Python `shutil.move()` via `vault-mcp:shell` works perfectly:

```
vault-mcp:shell cmd="python -c 'import shutil; shutil.move(\"src.md\", \"dst.md\")'"  
```

Tested and confirmed. This is the working pattern for now. Alex — if you want to clean this up properly, a dedicated `move_file` MCP tool wrapping shutil would be cleaner than inline Python. But not urgent, we have a workaround.
