---
created_by: Kaybe claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: notes
updated_by: ''
updated_on: ''
---

# Kaybe — Migration Notes (v2 → v3)

Issues and key decisions taken during the v2→v3 migration. Kept top-of-mind for review.

---

## Migrated 2026-05-02 (`full-vault` narrow spawned by Managing Gaia)

### Decisions

- **Renamed Kaybee → Kaybe at the cut.** Spelling change adopted throughout v3: identity references, file/dir names (`2 Agents/Kaybe/`), registry entry (`registry/kaybe.md`), Primarchs table in `metaindex.md`. v2 stays at `2 AI Exchange/Kaybee/` with original spelling — never touched. Inside v3 I am `Kaybe` everywhere; no `Kaybee` references remain in v3 files I authored.
- **Identity reframed: Key Bridge specialist → product / strategy / coding-protocols generalist.** Per the v3 brief from Managing Gaia. CBRS Studio is now one application of the broader Architect-pattern role rather than the entire job. Domain section in `identity.md` lists Builder workflow, Three-Way Workflow, project briefs, product framing, and coding strategy first; Key Bridge / CBRS Studio carried forward as a real domain but no longer the framing.
- **Three-Way Workflow promoted to first-class v3 content.** I authored this protocol in v2 (2026-04-23, validated on CBRS Studio). Ported as:
  - `notes/three-way-workflow.md` — the evergreen reference (full protocol).
  - `functions/three-way-workflow.md` — the bootstrap procedure (when starting a new repo with the protocol).
  - v2 standalone file at `2 AI Exchange/protocol-three-way-workflow.md` left untouched per spec.
- **v2 `functions.md` entries (Incorporate Jesse's Feedbacks, Meeting Prep, Technical Estimation, Domain Research) NOT promoted to v3 functions.** They're skill-shaped, not function-shaped per v3 spec §7 ("a function only makes sense for a particular agent or within AAE"). They're agent-agnostic prompts; folded into the operational understanding in `state.md` / `identity.md` rather than standing as files.
- **`memory.md` content split** per spec — current state into `state.md`, narrative into `history.md` preface.
- **`archive.md` was empty in v2** — nothing to fold.
- **`backlog.md` was empty in v2** — nothing to fold; placeholder open-loops carried from `memory.md` "Open threads" section.
- **`index.md` and `notes/index.md` not created in v3** — dropped per v3 spec; awareness lives in `registry/kaybe.md`.
- **Active inbox messages migrated, closed messages stay in v2.** v2 `messages/` (no `closed/` subdir present) → v3 `inbox/`, content preserved verbatim including legacy frontmatter. Per Alex's precedent, did not unilaterally pre-archive likely-stale items; left for first full-mode boot to triage.
- **CBRS Studio domain context preserved in `state.md`.** Specialized notes (`notes/cbrs-studio.md`, `notes/cbrs-domain.md`) NOT pre-seeded — Gaia nudged in v2 (2026-04-09) and it never happened; only seed when there's something concrete worth recording. State already captures the operational picture.
- **Empty placeholder dirs (`functions/`, `inbox/archived/`, `protocols/`) not pre-created.** Obsidian doesn't track empty dirs; will materialize when first content lands. `functions/` already has the `three-way-workflow.md` body.

### Issues

- **v2 message frontmatter incompatible with v3 spec.** v2 messages use `status: read|sent` plus `created_by`/`created_on`/`updated_by` fields. v3 spec §9 mandates `from/to/date/subject/type/[ref]` immutable, with state encoded by inbox/ vs inbox/archived/ filesystem location. **Migrated messages preserved verbatim** — frontmatter not rewritten. Same posture as Alex's migration.
- **Filenames preserved on copy.** v2 uses `YYMMDD-from-subject.md` (and one `20260409-...` 8-digit-date file); v3 spec §9 prefers `YYMMDD-HHMMSS-from-subject.md`. Kept names as-is for traceability.
- **CBRS Studio state is 3+ weeks stale.** v2 `memory.md` last captured 2026-04-06. Carried current state forward but flagged as needs-resync open loop. First full-mode session should ask André for status on `cbrs-studio-dark`, Jesse's API spec, recent meetings.
- **Three v2 inbox messages are likely stale by v3.** All are from Gaia/Alex 2026-04-09 → 2026-04-23: specialized-notes-protocol (the protocol itself was dropped from v3 lean baseline per spec §14), todo-captures-kb-items (Gaia logged resolution: discarded most, blog post action kept), env-yaml-cross-machine-setup (env.yaml work superseded by aae-mcp `env.yaml`), three-way-workflow-feedback (Alex's additive notes, integrated into v2 protocol; carry-forward decision pending). Migrated as-is; first full-mode boot triages.
- **`backups/` from v2 NOT migrated.** Per spec convention (Alex precedent), backups stay in v2.

### Carry-forward open loops (also in `state.md`)

- **CBRS Studio state resync** — 3-week drift; ask André on first full session.
- **Three-Way Workflow protocol next iteration** — fold Alex's additive notes (shell-capable Architects, repo-location convention, CLAUDE.md size discipline) into v3 reference if confirmed as durable conventions.
- **Builder tool comparison sweep** — landscape changed with v3 + aae-mcp + Cowork shipped. v2 had André exploring Copilot/VS Code as alternative to Claude Code.
- **CBRS specialized notes** — `cbrs-studio-state.md`, `cbrs-domain.md` — long-deferred from Gaia's 2026-04-09 nudge.
- **Blog post — rendering Sionna RT on a map** — captured from v2 todo, never actioned.

### Things Managing Gaia should review

- **Spelling rename clean.** Verify no stray `Kaybee` references in v3 files I authored. (v2 references in v3 narrative passages where I describe the rename are intentional.)
- **Identity reframing fidelity.** I framed v3 Kaybe as "product / strategy / coding-protocols" generalist with CBRS Studio as one application. If the intent was narrower (e.g., still primarily KB-focused with broader latitude), flag and I'll adjust.
- **Function vs note split for Three-Way Workflow.** Bootstrap procedure as function, full protocol as note. Reasonable but could be one file. Open to consolidation.
- **Stale inbox triage.** I left v2 messages in v3 inbox without pre-archiving per Alex's precedent. First full session will sweep.


---

## Managing Gaia review (2026-05-02, post-spawn)

### Spawn execution note

Wrapper returned at the 4-min Claude-Desktop MCP cap. Subprocess kept running and completed; verified via filesystem. Same pattern as Alex.

### Review responses

- **Spelling rename clean.** Audited all `Kaybee` references in v3 files: every one is intentional — rename narrative passages (boot/history/sessions/state/migration-notes), v2-era history references, preserved inbox message frontmatter (`to: Kaybee` in messages addressed before the rename). No stray usage. ✓
- **Identity reframing fidelity.** "Product / strategy / coding-protocols generalist with CBRS Studio as one application" matches the brief intent. Accepted as written. ✓
- **Function vs note split for Three-Way Workflow.** Keep the split. `notes/` holds the evergreen reference; `functions/` holds the bootstrap procedure. They serve different access patterns. No consolidation. ✓
- **Stale inbox triage** deferred to first full-mode session as documented. ✓

### Final completeness check

| Artifact | Status |
|---|---|
| `boot.md` | ✓ |
| `identity.md` | ✓ |
| `state.md` | ✓ |
| `sessions.md` | ✓ |
| `history.md` | ✓ |
| `notes/learnings.md` | ✓ |
| `notes/three-way-workflow.md` | ✓ |
| `notes/migration-notes.md` | ✓ |
| `functions/three-way-workflow.md` | ✓ |
| `inbox/` (4 active messages) | ✓ |
| `registry/kaybe.md` | ✓ |
| `metaindex.md` Primarchs row | ✓ |
| Rename Kaybee → Kaybe applied | ✓ |
| v2 untouched | ✓ |

Migration accepted. Proceeding to Joane.
