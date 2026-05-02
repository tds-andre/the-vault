---
created_by: Gaia claude-opus-4-7 v3.0-draft
created_on: 2026-05-01
updated_by:
updated_on:
type: design-notes
status: draft — for André's review (step 3 of registry process)
---

# Registry Inventory + Classification — v3.0-draft

*Working file. Sweep + classification by Gaia, pre-review. Step 4 (placement) and step 5 (topology) pending André's pass.*
*Source: actual filesystem state on 2026-05-01.*

---

## Pre-flight: state of `root/` and `env.yaml`

Two finds during the sweep that change earlier assumptions and need flagging before classification:

1. **`C:\Users\tdsnit\root\` exists but is mostly empty.** Only `vault/` has content; `repos/`, `storage/`, `systems/`, `drives/` are empty. The new structure is in transition. Real content still lives in legacy paths (`Work26/`, `agents/repos/`, `D:/vault-data/`, etc.).
   > correct
2. **`env.yaml` already exists at vault root.** This is `paths.csv` evolved. Earlier this session you said "drop paths.csv, keep v2 hardcoded approach" — but `env.yaml` is the v2 approach already in place, more or less. Pre-flight question for you: keep `env.yaml` as the registry's environment seed, redesign it, or drop it?
   > let's keep environment as markdown/natural, later we see about cross environments and structured formats; also worth nothing, one thing is the list of environments (e.g., mobile, main, laptop), which is what I'm trying to capture now, other thing is the environment pointers/parameters, which is what we will try to centralize in the registry for THIS environment (main), dw about the others

---

## Inventory (raw sweep, unclassified)

### Vault structure

- **Vault root:** `C:\Users\tdsnit\Documents\Obsidian Vault\` (canonical via symlink `C:\Users\tdsnit\winlinks\obsidian-default-vault`)
- **Vault top-level dirs:** `0 Archieve/`, `1 OFP/`, `2 AI Exchange/`, `3 Subthreads/`, `4 To Follow Up/`, `Agentic Operating System/`, `Cocoricó/`, `Janea Akuvo/`, `Jax/`, `Key Bridge/`, `Personal/`, `Professional/`, `_local/`
- **Vault top-level files:** `agents.md`, `env.yaml`, `todo.md`, `random.md`, `Untitled.md`, `0426 IA para Amigos (1 dia).md`, `0428 v3 Design Intent Briefing.md`, `.gitignore`
- **Note:** v3 plans `2 Agents/` (rename of `2 AI Exchange/`); not yet renamed.

### Primarchs (currently in `2 AI Exchange/`)

10 active: Alex, Apollo, Ben, Cocoria, Gaia, Jax, Joane, Kaybee, Laix, Layla.

Per-Primarch files (Gaia as reference): `archive.md`, `backlog.md`, `boot.md`, `environment.md`, `evolution.md`, `functions.md`, `index.md`, `mantra.md`, `memory.md`, `symlinks.md`, `system.md`, plus dirs `assets/`, `backups/`, `messages/`, `notes/`. *Other Primarchs may have a subset.*

### Shared agent files

- `2 AI Exchange/core.md` — shared context
- `2 AI Exchange/boot-template.md` — boot template
- `2 AI Exchange/paths.template.csv` — env path template (pre-`env.yaml`)
- `2 AI Exchange/protocol-three-way-workflow.md` — the externalized three-way protocol
- `2 AI Exchange/metasystem/` — currently has `v3-agent-memory-spec.md`; v3 design files live in `root/vault/2 Agents/metasystem/v3/`

### Root structure (transitional, mostly empty)

- `C:\Users\tdsnit\root\vault\` — has content (the v3 design dir)
- `C:\Users\tdsnit\root\drives\` — empty
- `C:\Users\tdsnit\root\repos\` — empty
- `C:\Users\tdsnit\root\storage\` — empty
- `C:\Users\tdsnit\root\systems\` — empty

### Real-content dirs outside the vault

- `C:\Users\tdsnit\Work26\agents\` — agent infrastructure: `vault-mcp/`, `whatsapp-mcp/`, `sionna-blog/`, `claude_desktop_config.json`
- `C:\Users\tdsnit\Work26\sod-report\` — repo
- `C:\Users\tdsnit\Work26\cbrs-studio-lite\` + `cbrs-studio-dark\` — repos (Key Bridge work)
- `C:\Users\tdsnit\Work26\akuvo-analytics2\` — repo (Akuvo work)
- `C:\Users\tdsnit\Work24\raytrace\` — repo
- `C:\Users\tdsnit\agents\repos\` — symlinks/files: `agents`, `akuvo-analytics`, `cbrs-link`, `raytrace`, `sod-report` (files); `cocoripede/`, `cocorisuite/`, `spawn-mcp/` (dirs)
- `C:\Users\tdsnit\My Drive (...)\the_gdrive\0_ofp\` — OFP gdrive root
- `C:\Users\tdsnit\My Drive (...)\the_gdrive\1_docs\2_resume\V6\` — resume
- `C:\Users\tdsnit\My Drive (...)\mess\Cocoricó\` — Cocoricó gdrive
- `J:\My Drive\frango\` — Cocoricó gdrive (legacy)
- `D:\vault-data\whatsapp\` — WhatsApp data
- `D:\akuvo-data\` — Akuvo data
- `C:\Users\tdsnit\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\` — Claude Desktop config

### MCP servers (from `claude_desktop_config.json`)

- `filesystem` — `@modelcontextprotocol/server-filesystem` (npm); 16 paths whitelisted
- `whatsapp-mcp` — local Node server (`Work26/agents/whatsapp-mcp/server.js`)
- `the-vault-2.1` — local Python server (`Work26/agents/vault-mcp/server.py`); provides git, shell, and `now()` tools, plus the (now-fixed) note tools

Other MCPs referenced but may not be active: `spawn-mcp/` exists in `agents/repos/`. Status unknown.

### Harnesses (in active or planned use)

- **Claude Desktop** — current primary. Has Project Instructions per Primarch.
- **Cowork** — v3 target for parallel streams (per session goal #1). `coworkScheduledTasksEnabled: true` in config.
- **Claude Code CLI** — v3 target for background processes (per session goal #5). `ccdScheduledTasksEnabled: true`. Joane is configured for this.
- **Claude Web (claude.ai)** — used ad-hoc, no agent state.

### Comm channels (external)

- WhatsApp (via `whatsapp-mcp`)
- Email (planned, per memory.md "WhatsApp via Baileys, inbox bridge integrations")
- Inbox bridge — planned

### Functions (existing)

- Per-Primarch: `2 AI Exchange/[Primarch]/functions.md` (currently a single file, not yet a `functions/` directory per v3 plan)
- Shared: none yet (v3 plans `2 Agents/functions/` for shared/housekeeping)

### Skills

- None registered yet within AAE. Anthropic's own `SKILL.md` system is separate (e.g. `pptx`, `docx`, `pdf` shipped with Claude). v3 may register external skills if used.

### Credentials / secrets

- Implicit only (Claude API key handled by harness, gdrive auth via Google account, git credentials via system, WhatsApp session in `D:\vault-data\whatsapp\`). Not currently in any file in the vault.

### Servitor definitions

- None yet (servitor concept introduced in v3).

---

## Classification

**Axes (revised):**

1. **Ownership** — `agent` (single Primarch) | `shared` (multiple agents) | `system` (AAE infrastructure) | `external` (gdrive, repos, etc.)
2. **Environment-dependence** — `env-dep` (path/value differs per machine) | `env-indep` (same everywhere)
3. **Resource type** — `dir` | `file` | `repo` | `system` (running service / MCP / harness) | `credential` | `concept` (e.g., a Primarch as identity, not a file)
4. **Dynamism** — `static` (changes ~never) | `slow` (changes occasionally) | `dynamic` (changes often, possibly per-session)

**New axis I'm proposing (axis 5): Cardinality** — `single` | `per-agent` | `per-X` (where X is some other dimension). Helps the placement decision: per-agent things obviously go in `identity.md`; single things go in shared registry; per-X things may need their own structure.

### Classification table

| Item                                                                                  | Ownership | Env       | Type       | Dynamism | Cardinality                                     |
| ------------------------------------------------------------------------------------- | --------- | --------- | ---------- | -------- | ----------------------------------------------- |
| **Vault root path**                                                                   | system    | env-dep   | dir        | static   | single                                          |
| **Vault top-level dir layout** (`1 OFP/`, `2 AI Exchange/`, etc.)                     | system    | env-indep | dir        | slow     | single                                          |
| **`agents.md`** *(dropped per latest decision)*                                       | system    | env-indep | file       | static   | single                                          |
| **`env.yaml`**                                                                        | system    | env-dep   | file       | slow     | single                                          |
| **`todo.md`**                                                                         | shared    | env-indep | file       | dynamic  | single                                          |
| **Vault git repo**                                                                    | system    | env-dep   | repo       | dynamic  | single                                          |
| **Primarch list** (Alex, Apollo, Ben, Cocoria, Gaia, Jax, Joane, Kaybee, Laix, Layla) | system    | env-indep | concept    | slow     | single (the list); each Primarch is `per-agent` |
| **Per-Primarch home dir** (`2 Agents/[Primarch]/`)                                    | agent     | env-indep | dir        | static   | per-agent                                       |
| **Per-Primarch `boot.md`**                                                            | agent     | env-indep | file       | slow     | per-agent                                       |
| **Per-Primarch `identity.md`**                                                        | agent     | env-indep | file       | slow     | per-agent                                       |
| **Per-Primarch `state.md`**                                                           | agent     | env-indep | file       | dynamic  | per-agent                                       |
| **Per-Primarch `sessions.md`**                                                        | agent     | env-indep | file       | dynamic  | per-agent                                       |
| **Per-Primarch `notes/`**                                                             | agent     | env-indep | dir        | dynamic  | per-agent                                       |
| **Per-Primarch `functions/`**                                                         | agent     | env-indep | dir        | slow     | per-agent                                       |
| **Per-Primarch `messages/` inbox**                                                    | agent     | env-indep | dir        | dynamic  | per-agent                                       |
| **`core.md`** (shared context)                                                        | shared    | env-indep | file       | slow     | single                                          |
| **Shared `functions/` dir**                                                           | shared    | env-indep | dir        | slow     | single                                          |
| **`metasystem/` dir** (specs, design notes)                                           | shared    | env-indep | dir        | slow     | single                                          |
| **MCP server: filesystem**                                                            | system    | env-dep   | system     | slow     | single                                          |
| **MCP server: whatsapp-mcp**                                                          | system    | env-dep   | system     | slow     | single                                          |
| **MCP server: the-vault-2.1**                                                         | system    | env-dep   | system     | slow     | single                                          |
| **MCP allowlist paths**                                                               | system    | env-dep   | concept    | slow     | single (the list)                               |
| **`claude_desktop_config.json`**                                                      | system    | env-dep   | file       | slow     | single (per machine)                            |
| **Harness: Claude Desktop**                                                           | system    | env-dep   | system     | static   | single                                          |
| **Harness: Cowork**                                                                   | system    | env-dep   | system     | slow     | single                                          |
| **Harness: Claude Code CLI**                                                          | system    | env-dep   | system     | slow     | single                                          |
| **Repo: agents**                                                                      | external  | env-dep   | repo       | dynamic  | single                                          |
| **Repo: vault-mcp**                                                                   | external  | env-dep   | repo       | dynamic  | single                                          |
| **Repo: whatsapp-mcp**                                                                | external  | env-dep   | repo       | dynamic  | single                                          |
| **Repo: spawn-mcp**                                                                   | external  | env-dep   | repo       | dynamic  | single                                          |
| **Repo: akuvo-analytics2**                                                            | external  | env-dep   | repo       | dynamic  | single                                          |
| **Repo: cbrs-studio-lite/dark**                                                       | external  | env-dep   | repo       | dynamic  | single                                          |
| **Repo: sod-report**                                                                  | external  | env-dep   | repo       | dynamic  | single                                          |
| **Repo: raytrace**                                                                    | external  | env-dep   | repo       | dynamic  | single                                          |
| **Repo: cocoripede / cocorisuite**                                                    | external  | env-dep   | repo       | dynamic  | single                                          |
| **Gdrive: OFP**                                                                       | external  | env-dep   | dir        | dynamic  | single                                          |
| **Gdrive: Cocoricó**                                                                  | external  | env-dep   | dir        | dynamic  | single                                          |
| **Gdrive: resume**                                                                    | external  | env-dep   | dir        | slow     | single                                          |
| **WhatsApp data dir**                                                                 | external  | env-dep   | dir        | dynamic  | single                                          |
| **Akuvo data dir**                                                                    | external  | env-dep   | dir        | dynamic  | single                                          |
| **Comm channel: WhatsApp**                                                            | system    | env-indep | concept    | static   | single                                          |
| **Comm channel: email**                                                               | system    | env-indep | concept    | static   | single                                          |
| **Comm channel: inbox bridge**                                                        | system    | env-indep | concept    | slow     | single                                          |
| **Skills** (Anthropic-shipped)                                                        | external  | env-indep | concept    | slow     | single (catalog)                                |
| **Credentials / secrets**                                                             | system    | env-dep   | credential | slow     | varies                                          |
| **System requirements** (Python 3.14, Node, Obsidian, Claude Desktop)                 | system    | env-dep   | system     | static   | single                                          |

### Patterns I see in the table

- **`env-dep` = single biggest cluster.** Almost every concrete path, every running system, every external resource is environment-dependent. Strong support for the cross-machine-test rationale: a registry that captures all `env-dep` items in one place is the high-value piece.
- **`per-agent` items are uniformly `agent`-owned and `env-indep`.** They don't belong in the registry. They belong in the agent's own files. Registry doesn't track `state.md` of each Primarch — the agent owns that.
- **`shared` + `env-indep` + `static/slow`** = `core.md` content (already decided).
- **`external` resources are env-dep without exception.** Repos, gdrive dirs, data dirs — all of them.
- **Concepts (Primarch list, comm channels, skills catalog)** are env-indep but don't fit in `core.md` cleanly because they are *enumerations* — agents may need to see "what Primarchs exist" or "what comm channels are available". These feel registry-shaped.
- **Credentials** are sui generis — never in a file, never in registry, only ever a pointer to where they live (env vars, OS keychain, gdrive auth, etc.).

---

## Proposed placement (preview, for André's pass)

Not committing to placement yet — this is what naturally falls out of the classification. Confirmation/correction needed.

| Group                                                                                                                  | Where it belongs                                                             |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| All `env-dep` items (paths, MCP configs, harness paths, repos, gdrive dirs, system requirements, credentials pointers) | **Registry** (single shared file or files; the cross-machine setup target)   |
| `per-agent` items                                                                                                      | **Agent's own files** (`identity.md`, `state.md`, etc.) — not registry       |
| Shared concepts that are enumerations (Primarch list, comm channels, skills catalog, MCP catalog with descriptions)    | **Registry** as nominal reference; pointers may be referenced from `core.md` |
| Shared procedural content (memory protocols, shared principles, About André)                                           | **`core.md`**                                                                |
| Static metasystem content (this file, decisions.md, eventually specs.md)                                               | **`metasystem/`** (already there)                                            |

### Implication for registry topology

If `env-dep` and shared enumerations are the only registry content, registry has roughly two halves:
- **Environment registry** — paths, MCPs, harnesses, repos, gdrive dirs, credentials. Edited per machine.
- **Nominal registry** — Primarchs, comm channels, skills catalog, function catalog. Edited rarely; same across machines.

Could be one file with two sections, or two files. Decision deferred to step 5.

---

## Notes for André's review

1. **`env.yaml` already exists** — it's the strongest candidate seed for the environment registry. Probably keep, refactor in place, don't rebuild.
2. **`root/` is empty.** The transition to that structure is unfinished. Worth deciding: complete the migration as part of v3, or finish v3 first then migrate?
3. **`spawn-mcp/`** exists in `agents/repos/` — not in `claude_desktop_config.json`. Status unclear. Possibly relevant to the v3 spawn primitive.
4. **Cardinality (axis 5)** — added it. Useful or noise?
5. **Skills** — do you want AAE to track Anthropic's shipped skills (pptx, docx, pdf, etc.) in the registry, or treat them as harness-implicit?
6. **Credentials placement** — registry as pointers only (e.g., "API key: env var `ANTHROPIC_API_KEY`"), never values. Confirm.
7. **Sensitivity:** registry will list paths like `D:\vault-data\whatsapp\`. If the vault is ever shared/published, registry may need a private layer. Worth flagging now.

---

*Step 4 (final placement) and step 5 (topology) pending André's review of this classification.*
