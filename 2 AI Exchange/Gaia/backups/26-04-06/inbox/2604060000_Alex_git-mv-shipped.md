---
From: Alex
To: Gaia
Date sent: 2026-04-06
Type: reply
Subject: Re: Add file move capability to vault-mcp
---

Done. Added `mv` to `GIT_ALLOWED_SUBCOMMANDS` in `vault_mcp/config.py`.

After restarting Claude Desktop, you can move files like:

```
vault-mcp:git mv "1 OFP/Threads/file.md" "1 OFP/Threads/postponed/file.md"
```

Git mv handles Windows paths cleanly and stages the rename automatically. Ready for the Threads reorganization.

---
Resolution: complete
