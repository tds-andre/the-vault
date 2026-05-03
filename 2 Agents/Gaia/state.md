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

**Current personal threads:**
- Weight loss — ~87kg toward 70-80kg target at 1.74m
- Orthodontic treatment — ~14-month timeline
- Aesthetics protocol — caffeine eye cream, SPF50, cleanser (QOVES report at `_local/Personal/protocol_report.pdf`)
- Mom interruption problem — behavioral approach (no-reward pattern)

## Current state

### v3 ecosystem rollout (active)

The AAE v3 spec was finalized 2026-05-01 and scaffolded under `2 Agents/`. v2 lives at `2 AI Exchange/`; v2 and v3 do not cross-reference. We are now migrating the active Primarchs (Gaia, Alex, Kaybe, Joane, Cocorita, Ben) one at a time. André is not involved in the migration execution — Managing Gaia (this agent) drives it; goal is to start working in v3 / Cowork ASAP.

Renames in flight: Kaybee → Kaybe; Cocoria → Cocorita.

Apollo, Jax, Laix, Layla are NOT being migrated initially.

### MCP tooling

- `aae-mcp-3.1` shipped today (Alex). Replaces `vault-mcp` / `the-vault-2.1`. Includes `spawn` tool wrapping CC CLI.
- `the-vault-2.1` still mounted in parallel during cutover.
- Spawn smoke test: works sync, returns inline. CRUD test (create/move/delete via spawned narrow) works after MCP-inheritance fix Alex shipped.

### Cocoricó

Profitability push pending — Jun/Jul 2026 deadline. Henrique critical on cooking, Almir (André's father) on cashier. Rodrigo as potential new tactical team member, onboarding pending.

### Key collaborators

- **Akuvo / Janea:** Guarda (tech lead, approved capability-building initiative), Filip and Anushka (ML engineers).
- **Key Bridge:** Jesse.
- **Cocoricó:** Henrique (cook), Almir (cashier, father), Rodrigo (potential).

## Open loops

- **v3 migration of remaining Primarchs** — Alex, Kaybe, Joane, Cocorita, Ben (in that order). Drive via `aae-mcp:spawn` with `full-vault` profile.
- **Thread review** — at thread 3 of 52 in v2. Decision needed in v3: bring forward as-is or restart leaner. Threads currently in `1 OFP/Threads/` (v2 location, outside `2 Agents/`).
- **WhatsApp / inbox bridge integrations** — logged, not built. Reactivatable post-v3.0.
- **Daily Mantra ritual systematization** — design cadence and surfacing mechanism in v3 (P7 protocol exists; ritual scaffolding doesn't).
- **Cocoricó profitability path** — define operationally what "profitable by Jun/Jul" looks like and what owners (André, Henrique, Rodrigo) drive it.
- **Cross-domain coherence check** — overdue. Last weekly review pre-dates v3 design sprint.

### Inherited from v2 backlog

- Thread Index drift — multiple status mismatches between Index and individual thread files (bonaire, curitiba, cbrs-studio, moto-trip).
- Consider replacing Thread Index with live `read_folder` queries — eliminates manual maintenance drift.

## Notes

- `notes/mantra.md` — André's living mantra. Surfaced per P7.
- `notes/agent-system-state.md` — agent system topology snapshot. May be stale post-v3.
- `notes/evolution.md` — historical improvement-ideas log from v2. Mostly superseded by v3 specs.
- `notes/migration-notes.md` — issues and key decisions during v2→v3 migration.
