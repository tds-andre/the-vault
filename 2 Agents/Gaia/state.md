---
type: state
---

# Gaia — State

Working memory. Full mode only writes here. Single mutable surface.

## About André (this agent's view)

37yo ML engineer, Niterói. INTP (matured toward J). Top-down, generalist with deep spikes.

**Roles:**
- Janea / Akuvo — main, ML Analytics engineer
- Key Bridge — part-time, CBRS / telecom
- Cocoricó — co-owner, roasted chicken delivery in Tijuca. Hard profitability deadline Jun/Jul 2026.

**Most important person:** Enzo, 11yo half-brother.

**Pattern:** ADHD. Cyclic — diligence → drift → reflection → rebuild. Design for re-entry.

**Current personal threads (working set highlights):**
- Aesthetics — daily routine running (cleanser → SPF50 + caffeine); now coordinated under `face-revamp` project parent
- Health — pending consultations (cirurgião refrativo priority, psiquiatra, ortomolecular)
- Trips — Curitiba/Foz 5-16 May (in progress), Bonaire diving 30 May–9 Jun (prioritized)
- Cocoricó — `cocorico-revamp` program covers operational threads (payroll, CNPJ, inventário, team meeting)

## Current state

### Threads system v3 (stabilized 2026-05-08)

**Ontology v2 applied** during the thread review:
- 6 domains: `professional`, `family`, `personal`, `assets` (promoted to top-level), `ventures`, `meta`
- Subdomains dynamic (not prescribed in spec)
- Types: `action`, `mission` (redefined as in-between action and project), `project`, `program` (renamed from `system`, biggest unit), `evaluate` (renamed from `decision`), `skill`, `special`
- `routine` type retired — all routines live as items in single `meta/routines` special thread
- `habit` removed (merged into routine then retired)
- Subtasks rule: only `project` + `program` can have threads as subtasks
- Markdown links liberally between related threads, back and forth
- Filesystem-as-index: no `Thread Index.md` — `glob 1 OFP/Threads/**/*.md` is the index

**Working set state:** ~100 threads, all v3 schema, distributed by status across `prioritized/`, `active/`, `captured/`, `postponed/`, `closed/`. No legacy schema remaining.

**New specials**: `meta/routines` (absorbed rudder/myconn/carsystem + aesthetic daily), `meta/chores` (absorbed devolver-keyway), `personal/aesthetics/face-revamp` (parent of eye/skin/qoves).

**Macro programs:** `cocorico-revamp` (operational umbrella for all Cocoricó threads), `weekly-review-ritual` (operating rhythm — restart May 24).

**Apollo handoff:** thread `estrutura-learnings` dispatched to Apollo v2 inbox via message; closed on v3 side.

### v3 ecosystem rollout (complete as of 2026-05-03)

All 6 initial-wave Primarchs migrated: Gaia, Alex, Kaybe, Joane, Cocorita, Ben. v2 at `2 AI Exchange/` preserved untouched. Apollo, Jax, Laix, Layla remain in v2 — not in initial wave.

### v3 system file rewrite (complete as of 2026-05-03)

Comprehensive rewrite of system files in scope: `core.md`, `environment.md`, Gaia's `boot.md`/`identity.md`/`notes/learnings.md`, all of `template/`, registry shared files, shared functions. Protocols clustered after Principles in `core.md`; P-numbering dropped throughout; reconcile policy strict (no writes at boot) + status-quo-honest.

### MCP tooling

- `aae-mcp-3.1` active. Replaces `vault-mcp` / `the-vault-2.1` (cutover 2026-05-03).
- Spawn working end-to-end.
- **Limitation discovered (2026-05-08):** aae-mcp not exposed to Cowork artifact runtime via `window.cowork.callMcpTool` — all calls return 400. Means live-data artifacts are not viable for aae-mcp tools; snapshot/inline data is the only path for now.

### Cockpit app (retired 2026-05-08)

Built and discarded in this session. Iterations: JSX file with inline data → JSX with fetch (CORS-blocked) → Cowork HTML artifact with live MCP (400 blocked) → HTML with template + inline data + Python build. André chose to retire after the artifact pivot didn't unblock. All files deleted from `2 Agents/Gaia/apps/cockpit/`; Cowork artifact `gaia-cockpit` flagged for manual removal via UI (no delete tool). Features captured in chat (inline bullets) for future revival.

### Cocoricó

Profitability push pending — Jun/Jul 2026 deadline. `decisao-frango` ("Final Push") thread closed; strategic context folded into `cocorico-revamp` program (operational umbrella). Henrique critical on cooking, Almir (father) on cashier. Rodrigo as potential new tactical team member, onboarding pending.

### Key collaborators

- **Akuvo / Janea:** Guarda (tech lead, approved capability-building initiative), Filip and Anushka (ML engineers).
- **Key Bridge:** Jesse.
- **Cocoricó:** Henrique (cook), Almir (cashier, father), Rodrigo (potential).

## Open loops

- **Daily Mantra ritual systematization** — Mantra protocol defined in identity.md; operational scaffolding not yet built.
- **Cocoricó profitability path** — `cocorico-revamp` now provides the operational structure; needs sustained execution + first sweep of subtasks (payroll, CNPJ, inventory, team meeting).
- **Cross-domain coherence check** — weekly review restart targeted Sunday 2026-05-24.
- **Per-agent registry anchors propagation** — `registry/{alex,ben,cocorita,joane,kaybe}.md` not yet aligned with rewritten template. André's review pass.
- **Cockpit live-data path** — blocked by Cowork artifact MCP allowlist. Revisit if/when allowlist exposed in Cowork settings, OR if we pivot to a different surface (e.g., desktop Electron app).
- **Side quests pile** (in `notes/scratchpad.md`) — routine surfacing UX, resurface queue mechanism, products list canonical home, aesthetics action-plan.md integration, cocoricó linkage policy automation, common subdomain patterns formalization.
- **`details.md` (MA) externalization (deferred)** — when `core.md` verbosity becomes a real problem, externalize Memory/Messaging protocol bodies.

## Notes

- `notes/learnings.md` — accumulated intelligence; loaded at boot.
- `notes/scratchpad.md` — working surface for in-flight observations + side quests + resurface queue.
- `notes/mantra.md` — André's living mantra. Surfaced per the Mantra protocol.
- `notes/agent-system-state.md` — agent system topology snapshot. May be stale post-v3.
- `notes/evolution.md` — historical improvement-ideas log from v2. Mostly superseded by v3 specs.
- `notes/migration-notes.md` — issues and key decisions during v2→v3 migration.
