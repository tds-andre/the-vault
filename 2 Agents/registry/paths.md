---
type: registry
env: dependent
---

# paths.md — Files & Directories

On-demand registry file. The canonical list of named paths the AAE references. Loaded only when an agent needs to look up a path it doesn't already have top-of-mind.

Most paths inside the vault are env-independent (relative to vault root). External paths are env-dependent — they will need editing if the AAE is set up on another machine. The current machine's vault root is in `2 Agents/environment.md`.

---

## Vault dirs (env-independent)

| Path | Purpose |
|---|---|
| `2 Agents/` | v3 ecosystem — agent ecosystem root |
| `2 AI Exchange/` | v2 ecosystem (legacy, untouched in v3) |
| `1 OFP/` | One Functioning Person — André's operating layer (Gaia-managed): threads, weekly reviews, vision |
| `1 OFP/Threads/` | Active thread working set |
| `1 OFP/Threads/postponed/` | Eventually + dormant threads |
| `1 OFP/Threads/closed/` | Closed threads |
| `1 OFP/Weekly Reviews/` | Past weekly review instances |
| `Personal/` | Personal notes; Codex (Apollo's domain); aesthetics |
| `Professional/` | Professional notes, career artifacts |
| `Janea Akuvo/` | Akuvo work notes & analysis (Joane's domain) |
| `Key Bridge/` | Key Bridge / CBRS work notes (Kaybe's domain) |
| `Cocoricó/` | Restaurant notes, recipes, ops (Cocorita / Ben) |
| `3 Subthreads/` | Business ideas, deep-dive subthreads |
| `4 To Follow Up/` | Inbox for things André wants to revisit |
| `0 Archieve/` | Archived material; never loaded |
| `_local/` | Machine-local-only (git-ignored); per-machine artifacts |

## Vault files (env-independent)

| Path | Purpose |
|---|---|
| `todo.md` | Shared quick-capture + daily plan (vault root) |
| `agents.md` | Human-facing README at vault root |
| `1 OFP/Thread Index.md` | Fast overview of all threads |
| `1 OFP/Thread System.md` | Thread schema and conventions |
| `1 OFP/Vision.md` | North star |
| `1 OFP/Andre's Life Plan 2026.md` | Primary personal briefing |
| `Personal/Codex.md` | Deep identity context (Apollo's domain) |

## External dirs (env-dependent)

| Path | Purpose |
|---|---|
| `C:\Users\tdsnit\Work26\` | Active code repos |
| `C:\Users\tdsnit\Work26\agents\` | Agent infrastructure (MCP servers, etc.) |
| `C:\Users\tdsnit\agents\` | Agent infrastructure root (additional) |
| `C:\Users\tdsnit\My Drive (tds.andre@gmail.com)\` | Google Drive sync root |
| `D:\vault-data\whatsapp\` | WhatsApp session data (when whatsapp-mcp active) |
| `D:\akuvo-data\` | Akuvo data (Joane's domain) |
| `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\` | Claude Desktop config & logs |

## Notes

- **Cross-machine.** Notebook (secondary machine) has username `tdsan`; vault cloned to `C:\Users\tdsan\agents\vault`. Currently inactive. The cross-machine pattern uses `paths.csv` (machine-specific, git-ignored) plus `paths.template.csv` (versioned). v3.0 is single-machine focused.
- **Symlinks.** The Anthropic-shipped `filesystem` MCP resolves symlinks and blocks paths outside the allowed root. The central-directory + symlinks approach was abandoned because of this.
