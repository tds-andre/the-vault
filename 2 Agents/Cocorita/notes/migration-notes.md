---
type: notes
---

# Cocorita — Migration Notes (v2 → v3)

Issues and key decisions taken during the v2→v3 migration. Kept top-of-mind for review.

---

## Migrated 2026-05-03 (in-session, by Managing Gaia)

### Decisions

- **Migrated in-session by Managing Gaia, not via spawn.** Deviation from the v3 design pattern. Rationale: the spawn process was interrupted mid-sequence (Cocorita and Ben hadn't started yet) and André instructed Gaia to finish all remaining migrations directly. Same approach Gaia used for her own migration on 2026-05-02.
- **Renamed Cocoria → Cocorita at the cut.** Adopted throughout v3: identity references, dir name (`2 Agents/Cocorita/`), registry entry (`registry/cocorita.md`), Primarchs row in `metaindex.md`. v2 stays at `2 AI Exchange/Cocoria/` with original spelling, untouched.
- **`weekly-ops-review` promoted as the sole agent-specific function.** v3 spec §7 inventory referenced `daily-ops-summary` for Cocoria; weekly cadence is the operational truth (sessions are weekly post-Monday-service), so renamed accordingly.
- **Five v2 functions NOT promoted to v3:** Operational Standards Audit, Team Session, Score Recovery Plan, Rodrigo Onboarding, Marketing Readiness Assessment. Per Kaybe/Joane precedent and v3 spec §7, these are skill-shaped (agent-agnostic procedures Cocorita can run from operational understanding) rather than function-shaped. Their content folds into operational understanding via `state.md` and `identity.md` rather than standing as files.
- **`memory.md` content split** per spec — current state (Cocoricó situation + team + 5 Processos status + CocoriPede + Three-Way) into `state.md`, narrative into `history.md` preface.
- **`archive.md` was empty in v2** — nothing to fold.
- **`backlog.md` was empty in v2** — nothing to fold; open loops carried from `memory.md` situational sections.
- **`notes/cocoroco-team.md` ported VERBATIM.** It's the highest-context evergreen note for the team; rewriting would lose nuance. Frontmatter preserved.
- **`notes/index.md` not migrated** — dropped per v3 spec; awareness lives in `registry/cocorita.md`.
- **Active inbox messages migrated, no `closed/` subdir existed in v2.** Both v2 messages copied to v3 `inbox/` verbatim, including legacy frontmatter. Per Alex/Kaybe/Joane precedent, no pre-archive triage; first full-mode boot decides.

### Issues

- **v2 message frontmatter incompatible with v3 spec.** v2 uses `from/to/date/type/status` plus older `created_by`/`created_on`/`updated_by` envelope on one. v3 spec §9 mandates `from/to/date/subject/type/[ref]` immutable, with state encoded by filesystem location. Migrated verbatim — same posture as Alex / Kaybe / Joane.
- **Both v2 inbox messages are likely stale by v3:**
  - `20260409 specialized-notes-new-protocol` — protocol was dropped from v3 lean baseline per spec §14; team note action item (review + append) is partially obsolete (note exists, but protocol-driven append cycle is gone).
  - `260410 env-yaml-cross-machine-setup` — env.yaml work superseded by Alex's aae-mcp `env.yaml` in v3.
  - Both kept for first-full-mode triage.
- **Cocoricó operational state** is ~4 days stale (v2 memory updated 2026-04-29). Carried forward but flagged as resync candidate. Less critical than Joane's 3-week drift.
- **CocoriPede status post-handoff to Alex** — sprint 4-6 progress unknown to Cocorita post-2026-04-28. Need ressincronization with Alex on first full session.
- **`backups/` from v2 NOT migrated.** Per spec convention (Alex/Kaybe/Joane precedent), backups stay in v2.

### Carry-forward open loops (also in `state.md`)

- Score recovery 4.6 → 4.7+ (operational root cause, gates marketing).
- Cook secundário — Henrique single point of failure.
- Frango protein recipes (gap crítico em `5 Processos/Receitas/Proteínas`).
- Henrique formalização CLT vs Associado.
- Rodrigo onboarding — papel tático/estratégico.
- Avaliação de sócios (Pedro / Jeff / Brunão).
- CocoriPede ressync com Alex (sprints 4-6, EC2 deploy, Google Maps key rotation).

### Things Managing Gaia should review

- **Dropping 5 of 6 functions.** Aggressive but matches Kaybe (kept 1 of 4) / Joane (kept 2 of 5) precedents. If Cocorita needs more explicit operational scaffolding (audit, score-recovery, marketing-readiness as named procedures), reverse on demand.
- **Verbatim port of `cocoroco-team.md`** — note still references "specialized-note" type and v2 protocol structure (`## Updates` etc.). Compatible with v3 but uses older idioms. Acceptable for first full session to refresh.
