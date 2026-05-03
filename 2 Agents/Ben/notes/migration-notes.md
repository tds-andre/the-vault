---
type: notes
---

# Ben — Migration Notes (v2 → v3)

Issues and key decisions taken during the v2→v3 migration. Kept top-of-mind for review.

---

## Migrated 2026-05-03 (in-session, by Managing Gaia)

### Decisions

- **Migrated in-session by Managing Gaia, not via spawn.** Same deviation as Cocorita and Gaia. The original spawn process was interrupted before reaching Ben; André instructed Gaia to finish all remaining migrations directly.
- **`pnl-build` promoted as the sole agent-specific function.** It's the foundation every other Cocoricó financial conversation depends on. Without P&L baseline, break-even / scenarios / decision-framework all stall.
- **Four v2 functions NOT promoted to v3:** Break-Even Analysis, Decision Framework (Stay vs Exit), Team Payment Audit, Scenario Modeling. Per Kaybe / Joane / Cocorita precedent and v3 spec §7, these are skill-shaped procedures Ben can run from operational understanding once P&L exists. Their content folds into operational understanding via `state.md` and `identity.md`.
- **`memory.md` content split** per spec — current state (Q4 revenue + P&L gap + cidadania + USD investing pending) into `state.md`, narrative into `history.md` preface.
- **`archive.md` was empty in v2** — nothing to fold.
- **`backlog.md` was empty in v2** — nothing to fold; open loops carried from `memory.md`.
- **`notes/` was empty in v2** (only `notes/index.md` stub existed) — no specialized notes to migrate.
- **`notes/index.md` not migrated** — dropped per v3 spec; awareness lives in `registry/ben.md`.
- **Active inbox messages migrated.** All 3 v2 messages (no `closed/` subdir existed) → v3 `inbox/` verbatim. Per Alex / Kaybe / Joane / Cocorita precedent, no pre-archive triage.

### Issues

- **v2 message frontmatter incompatible with v3 spec.** Same as the other migrations. Migrated verbatim.
- **All 3 v2 inbox messages need triage:**
  - `20260409 specialized-notes-new-protocol` — protocol was dropped from v3 lean baseline per spec §14. The seeded-note suggestion (`andre-financial-state.md`) might still be worth doing on its own merits, just not under the v2 protocol structure.
  - `260409 dollar-investment-session` — this is **operationally relevant**. The USD investing session was requested 3+ weeks ago and never happened. Should be escalated by first full-mode boot.
  - `260410 env-yaml-cross-machine-setup` — superseded by Alex's aae-mcp `env.yaml` work in v3.
- **Cidadania state is ~4 weeks stale.** All planned activities (Cidadania 4U meeting 09/04, Simonato visit 11/04, contract comparison, decision 25/04) are now past. Need full resync with André on first session — what was decided, what was paid, how many requerentes, cash flow impact.
- **Cocoricó P&L baseline** still missing from v2; carried as the priority-1 open loop. No data magically appeared during migration.
- **`backups/` from v2 NOT migrated.** Per spec convention.

### Carry-forward open loops (also in `state.md`)

- Build P&L baseline (priority-1, gates everything else).
- Break-even analysis (depends on P&L).
- Stay vs exit framework (depends on both above; needed before June).
- Exit cost mapping.
- Cidadania italiana resync (decision deadline 25/04 was 1+ week ago).
- USD investing session (requested 2026-04-09, never executed).
- Henrique formalização — fiscal implication of CLT vs Associado.
- Avaliação de sócios — financial scenarios per candidate.

### Things Managing Gaia should review

- **Dropping 4 of 5 functions** — aggressive but consistent with precedent. If Ben needs explicit scaffolding for break-even or scenario-modeling as named procedures, reverse on demand.
- **Cidadania state captured in detail in `state.md`** — almost certainly stale. First full session must triage before acting on any of the carried items.
- **USD investing carry-forward** — high priority on resume. The request has been open 3+ weeks.
