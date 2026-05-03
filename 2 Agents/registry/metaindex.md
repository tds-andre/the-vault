---
type: registry-index
env: independent
---

# metaindex.md — Shared Registry Index

Loaded at boot (ML) by every Primarch. The shared anchor of the registry: who the Primarchs are, where the resources live nominally, and how to find anything that's not already in your context.

Paired with `[agent].md` (per-Primarch anchor, also ML). Together these two files give every full-mode agent enough top-of-mind awareness to operate without searching.

---

## Why the registry exists

The registry centralizes references to resources that would otherwise be scattered across agent files: paths, repos, tools, enabling systems, functions. This serves two goals:

1. **Cross-agent coherence.** All Primarchs reference the same registry entries by name. When something is renamed or moved, the fix is one edit, not ten.
2. **Cross-machine portability** *(forward-looking)*. The design intent is that to set up the AAE on another machine, the only files that need editing are in `registry/` plus `2 Agents/environment.md`. v3.0 is single-machine-focused; portability is a property the design preserves rather than a deliverable.

Registry maintenance is **the second most important ongoing responsibility** after Offload and Refresh. Drift compounds silently. When you change something the registry tracks, update the registry in the same operation — not deferred.

## Overlap is intentional

`functions.md` is the canonical complete list of functions. `metaindex.md` (this file) and each `[agent].md` re-surface a subset of the same content for top-of-mind awareness. When you change a function, edit the canonical file first, then propagate to the surfacing files if needed. Don't try to deduplicate the surfacing files — the redundancy is the point.

---

## Primarchs

| Name | Domain | Anchor | v3 status |
|---|---|---|---|
| **Gaia** | Meta-layer; system & coherence; chief of staff | `registry/gaia.md` | migrated 2026-05-02 |
| **Alex** | Engineering; MCP tooling & infrastructure | `registry/alex.md` | migrated 2026-05-02 |
| **Kaybe** | Product / strategy / coding-protocols; Builder workflow; Key Bridge | `registry/kaybe.md` | migrated 2026-05-03 (renamed from Kaybee) |
| **Joane** | Analytics / data-science; Akuvo / Janea ML, methodology, slide reports | `registry/joane.md` | migrated 2026-05-03 |
| **Cocorita** | Cocoricó operations; team, product, kitchen, marketing | `registry/cocorita.md` | migrated 2026-05-03 (renamed from Cocoria) |
| **Ben** | Cocoricó financials; P&L, jun/jul decision, citizenship, USD investing | `registry/ben.md` | migrated 2026-05-03 |
| Apollo | Personal knowledge, identity work, Codex | — | v2 only (`2 AI Exchange/Apollo/`) |
| Jax | AI mastery, deliberate learning | — | v2 only |
| Laix | X In Rio business development | — | v2 only |
| Layla | Relationship intelligence, person profiles, social strategy | — | v2 only |

Six Primarchs constitute the v3 initial wave. Apollo, Jax, Laix, Layla remain in v2 at `2 AI Exchange/`. v2 and v3 ecosystems do not cross-reference; each stands alone.

---

## Agent type ontology (summary)

For full definitions see `core.md §The system you are part of`.

- **Primarch** — persistent named top-level agent with a working dir under `2 Agents/`, long-term memory, and a domain.
- **Full** — Primarch at full capacity: full memory loaded, full tooling, full context. Full mode writes `state.md`.
- **Narrow** — Primarch in lean form for a specific scope. Same agent, different vessel. Self-contained initial prompt; appends to `sessions.md`; does not write `state.md`.
- **Servitor** — ephemeral, indexed, single-purpose AI executor. Not a Primarch and cannot grow into one. Naming: `serv-YYMMDD-HHMMSS-NNN`.
- **Vessel** — narrow viewed through the possession metaphor. Same as narrow, different framing.
- **Harness** — runtime: provider + UI + model combination. Examples: Claude Desktop, Cowork, Claude Code CLI, VS Code + Copilot.

## Awareness levels

- **I** — inlined, body in always-loaded file.
- **ML** — mandatory load, file loaded at boot.
- **MA** — mandatory awareness, summary inlined + reference to body file.
- **F** — findable, discovered via registry on demand.

Protocols are I or ML. Functions are MA or F. Awareness can vary per agent.

---

## Paths (conceptual)

- **Vault root** — established by harness configuration; see `environment.md` for current machine path.
- **Ecosystem root** — `2 Agents/` (v3). v2 lives at `2 AI Exchange/` and is preserved untouched.
- **OFP root** — `1 OFP/` (André's life-operating layer; Gaia-managed).

For concrete paths see `paths.md`.

---

## Registry files (this directory)

| File | Loadiness | Purpose |
|---|---|---|
| `metaindex.md` | ML (this file) | Shared anchor — Primarch list, ontology summary, registry topology, index of optional registry files |
| `[agent].md` | ML (per agent) | Per-Primarch anchor — that agent's paths, functions, tools, notes top-of-mind |
| `paths.md` | on demand | Files & dirs (vault and external) |
| `repos.md` | on demand | Code repositories |
| `tools.md` | on demand | MCP servers and configs |
| `enablers.md` | on demand | Enabling systems (Python, Node, services) |
| `functions.md` | on demand | Complete index of every function |
| `template.md` | on demand | Per-Primarch registry-anchor scaffold (used by `agent-init`) |

**Frontmatter convention:** each registry file has `env: dependent | independent`. Single-machine focus for v3.0; the `dependent` flag marks files that will need per-machine attention if the AAE is set up elsewhere.

---

## Shared functions — top-of-mind (MA all)

These are the shared functions every Primarch should know exist. Bodies in `2 Agents/functions/`. Full index in `functions.md`.

- **`spawn`** — spawn a narrow or servitor. `2 Agents/functions/spawn.md`. Includes ownership rule, three variants (inline / file / MCP), permission profiles.
- **`note-authoring`** — author or edit notes. `2 Agents/functions/note-authoring.md`. Strong default-fire posture.
- **`housekeeping`** — pruning, compaction, registry sweeps, inbox sweeps. `2 Agents/functions/housekeeping.md`. Manually triggered in v3.0.

Other shared functions (`weekly-review`, `agent-init`) are F by default; specific Primarchs (notably Gaia) promote them to MA in their `[agent].md`.

---

## Out of registry scope

What does NOT live in the registry:

- **Metasystem files** — specs, design rationale, templates → `2 Agents/specs/` and `2 Agents/template/`.
- **Agent standard files** — `boot.md`, `identity.md`, `state.md`, `sessions.md`, `history.md`, `notes/` are owned by each agent, not by the registry.
- **Vault structure** — described once in `core.md`.
- **Environment** — current-machine context lives at `2 Agents/environment.md`, not in registry.
- **Comm channels** — deferred from registry for v3.0.
- **Harnesses** — deferred from registry for v3.0; the human chooses harness, not the agent.
- **Credentials** — registry stores pointers only (env vars, OS keychain references), never values.
- **Skills** — provider-shipped capabilities (e.g. Anthropic's `pptx`, `docx`) are not tracked in v3.0.
