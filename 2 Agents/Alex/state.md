---
created_by: Alex claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: state
updated_by: ''
updated_on: ''
---

# Alex — State

Working memory. Full mode only writes here. Single mutable surface.

## About André (this agent's view)

37yo ML engineer, Niterói. Senior software fundamentals, Python Jedi.

**Tech profile (relevant to me):**
- Fluent: Python, JavaScript/HTML/CSS
- Solid: Java, C++/CUDA, C#, C
- Current: Azure/Synapse/Spark at Akuvo (Janea); Java/CBRS at Key Bridge
- Interested in: Rust, Go, Flutter
- AI tools: Claude (daily), Copilot/VSCode, now Cowork + Claude Code CLI
- Prefers: end-to-end ownership, simple architectures, avoiding distributed systems unless necessary

**Working pattern:** wants prototypes fast, will cut me back when I over-engineer. Reads code carefully, catches my drift. Commits manually — does not want me running `git`.

**Domain context that shapes my priorities:** Cocoricó profitability deadline Jun/Jul 2026 means CocoriPede ships matter. v3 cutover is current main thread.

## Current state

### aae-mcp-3.1 (just shipped, today)

- New repo at `C:\Users\tdsnit\Work26\agents\aae-mcp\` (parallel to vault-mcp).
- 15 tools: `shell`, `move_file`, `delete_file`, `now`, 11 notes operations, `spawn`.
- Dropped from v3.0: `git` (André commits manually), `python_tool` + `node_tool` (preserved in `_attic/`, reactivation path documented), `whatsapp-mcp` (deregistered, reactivatable).
- Machine-specific config isolated in `aae-mcp/env.yaml` (gitignored) + versioned `env.template.yaml`. Loaded by `aae_mcp/config.py`.
- 54/54 tests pass (51 unit + 3 live). Live tests gated by `AAE_SPAWN_LIVE=1`.
- Server name `aae-mcp-3.1` (bumped from 3.0 after spawn shipped); registered in `claude_desktop_config.json`. The-vault-2.1 still mounted in parallel during cutover.
- spawn-MCP-inheritance bug fixed earlier today — `.mcp.json` planted in spawn workdir alongside `.claude/settings.json`. Per-profile MCP allowlists in settings.json. CC permission keys normalize `.` → `_` in server name; baked into `_PERM_SERVER_NAME`.

### v3 ecosystem cutover (active)

- AAE v3 spec finalized 2026-05-01 by Gaia. Lives at `2 Agents/specs/specs.md`.
- v2 (`2 AI Exchange/`) and v3 (`2 Agents/`) coexist; no cross-reference.
- Gaia migrated herself v2→v3 today. I'm being migrated now (this session).
- Renames in flight (Gaia's call): Kaybee → Kaybe; Cocoria → Cocorita.
- Apollo, Jax, Laix, Layla NOT being migrated initially.

### Active infra I own / maintain

- **`aae-mcp`** at `C:\Users\tdsnit\Work26\agents\aae-mcp\` — primary, post-cutover home.
- **`vault-mcp`** at `C:\Users\tdsnit\Work26\agents\vault-mcp\` — being archived after cutover. The-vault-2.1.
- **`whatsapp-mcp`** at `C:\Users\tdsnit\Work26\agents\whatsapp-mcp\` — Baileys + PM2; deregistered from Claude Desktop; reactivatable.
- **`cocoripede`** at `C:\Users\tdsnit\agents\repos\cocoripede` — Cocoria handed dev to me 2026-04-28. Sprint 1-3 done (FastAPI + React, 36 tests). Sprints 4-6 + deploy + bridges pending.
- **Claude Desktop config** at `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json` — backup at `2 AI Exchange/Alex/db/claude_desktop_config.backup.json` (legacy v2 location).

### Key collaborators in my domain

- **Gaia** — primary peer; design partner on v3, spawn spec, MCP architecture.
- **Cocoria / Cocorita** — handed CocoriPede dev to me; she's still Architect.
- **Kaybee** — uses three-way workflow protocol I should review for tooling implications.
- **Builders:** Claude Code CLI (now), VS Code Copilot (CocoriPede sprints to date).

## Open loops

- **Cutover finalization** — André restarts Claude Desktop → verify `aae-mcp-3.1` shows up alongside `the-vault-2.1`. After verification: deregister `the-vault-2.1`, archive `vault-mcp` repo. v3 then standalone.
- **Async spawn (post-v3.0).** Sync-only locked for v3.0. Background async spawn deferred per `2 Agents/functions/spawn.md`; revisit when cron mechanism is designed.
- **Cross-machine portability.** v3.0 single-machine focus. `aae-mcp` already isolates env-deps in `env.yaml` to make the future refactor cheap. Bootstrap script (`bootstrap.ps1`) and MCP install script (`install-mcp.ps1`) are still backlog from v2 — Gaia briefs from 2026-04-10 in inbox/archived after migration.
- **CocoriPede sprints 4-6** — Cardápio Digital (S4), iFood real integration (S5, polling not webhook — fix the stub), Cocoria WhatsApp agent (S6). Plus printer ESC/POS bridge and EC2 deploy. Google Maps API key was exposed in chat — André must rotate before deploy.
- **Three-way workflow protocol review** — Kaybee asked me to review for tooling implications. Inbox.
- **Async workers architecture** — Gaia's 2026-04-26 brief asking for thinking on the architecture (concurrency, blocking, handoff, failure, context). The spawn tool I just shipped is one piece; the broader async-workers question is open.
- **Specialized notes** — Gaia's 2026-04-09 nudge to seed `notes/` with the deep things I know (vault-mcp internals, MCP patterns, Windows path quirks). One done in v2 (vault-mcp.md, now stale). Need an `aae-mcp.md` post-cutover.
- **MCP config backup location in v3.** Currently still pointing at the v2 path. Decide a v3 home (probably under `2 Agents/Alex/db/` or in the aae-mcp repo itself) and migrate.

## Notes

- `notes/learnings.md` — accumulated technical learnings, blind spots.
- `notes/vault-mcp.md` — historical note on `the-vault` MCP architecture; mostly superseded by aae-mcp but kept for reference until cutover completes.
- `notes/migration-notes.md` — issues and key decisions during v2→v3 migration.
