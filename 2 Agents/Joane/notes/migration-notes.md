---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: notes
updated_by: ''
updated_on: ''
---

# Joane — Migration Notes (v2 → v3)

Issues and key decisions taken during the v2→v3 migration. Kept top-of-mind for review.

---

## Migrated 2026-05-03 (`full-vault` narrow spawned by Managing Gaia)

### Decisions

- **Four big methodology / domain notes ported VERBATIM.** `analytics-methodology-core.md`, `analytics-methodology-framing.md`, `methodology-learnings.md`, `slide-report-instructions.md` copied with content unchanged (frontmatter preserved, including v2 `created_by` / `updated_by`). This is the highest-value asset of the Joane corpus and the brief explicitly required no rewrite.
- **Two agent-specific functions promoted with real bodies:** `analysis-wrap-up` and `akuvo-meeting-prep`. Both have substantial domain context (the Big Problem framing, deliverable conventions, audience-by-audience framing for Guarda / Mike / Will / VP / CDO). They pass the v3 spec §7 "function only makes sense for a particular agent" test.
- **Three v2 `functions.md` entries NOT promoted:** Capability Building Plan, Notebook / Code Review, Data Investigation. Per Kaybe's precedent and v3 spec §7, these are skill-shaped (agent-agnostic procedures Joane can run from operational understanding) rather than function-shaped. Their content is folded into operational understanding via `state.md` and `identity.md` rather than standing as files.
- **`memory.md` content split** per spec — current state into `state.md`, narrative into `history.md` preface.
- **`archive.md` folded into `history.md` preface** as the founding sessions (03-29 → 04-01).
- **`backlog.md` folded into `state.md` Open loops, aggressively pruned.** v2 backlog had ~12 active items; ~3 weeks of drift since last update (2026-04-10 → today 2026-05-03) means most are stale or likely shipped. State now carries a meta open-loop "resync Akuvo state with André" + a handful of items still plausibly real (3-tier escalation feature spec, neg-vol-lift-vs-random in pipeline, control-groups/sample-sizes formalization, activity-classification review with Mike, capability-building one-pager, clients 60/91/96 investigation, AI-centric framing note).
- **`index.md` and `notes/index.md` not created in v3** — dropped per v3 spec; awareness lives in `registry/joane.md`.
- **`notes/akuvo-platform-and-ml-work.md` (Gaia-seeded specialized note 2026-04-09) NOT migrated** — the operational picture lives in `state.md` and the methodology lives in the four big notes; that note was a redundant Gaia-side index for the v2 specialized-notes protocol (which v3 dropped per spec §14). Will re-seed if a real specialized note proves useful.
- **`slide-report-template.jsx` NOT migrated to v3.** It's a JSX asset, not a markdown note. Left at `2 AI Exchange/Joane/slide-report-template.jsx`; `notes/slide-report-instructions.md` references it. Could be promoted to `2 Agents/Joane/notes/slide-report-template.jsx` later if asset-portability becomes important.
- **Active inbox messages migrated, no `closed/` subdir existed in v2.** All 4 v2 messages were under `messages/` directly, so all are treated as active and copied to `inbox/` verbatim (filenames + content). Per Kaybe / Alex precedent, no pre-archive triage; first full-mode boot decides.
- **Empty placeholder dirs (`inbox/archived/`, `protocols/`) not pre-created.** Obsidian doesn't track empty dirs; will materialize when first content lands. `functions/` already has the two function bodies. `inbox/` already has the 4 messages.

### Issues

- **v2 message frontmatter incompatible with v3 spec.** v2 messages use `from/to/date/type/status` plus older `created_by`/`created_on`/`updated_by` envelope on two of them. v3 spec §9 mandates `from/to/date/subject/type/[ref]` immutable, with state encoded by `inbox/` vs `inbox/archived/` filesystem location. **Migrated verbatim** — frontmatter not rewritten. Same posture as Alex / Kaybe.
- **One v2 filename uses 8-digit date** (`20260409-Gaia-specialized-notes-new-protocol.md`); the other three use 6-digit `YYMMDD`. v3 spec §9 prefers `YYMMDD-HHMMSS-from-subject.md`. Kept names as-is for traceability.
- **Akuvo state is 3+ weeks stale.** v2 `memory.md` last captured 2026-04-10. Carried operational picture forward but flagged "resync with André" as the meta open-loop. First full-mode session should ask what shipped from the v2 backlog before acting on any of the carried items.
- **Three of four v2 inbox messages are likely stale by v3:**
  - `20260409 specialized-notes-new-protocol` — the protocol itself was dropped from v3 lean baseline per spec §14; action items in the message (review seeded note, create more) are obsolete.
  - `260410 env-yaml-cross-machine-setup` — superseded by Alex's aae-mcp `env.yaml` work in v3.
  - `260420 todo-captures-janea-ideas` — two ideas (share DQ reports, LLM search index); still potentially relevant to capability building.
  - `260409 todo-captures-akuvo-ml-ideas` — substantial idea backlog including the "AI-centric debt collection" framing; carried to state.md as an open loop.
  - All migrated as-is; first full-mode boot triages.
- **`backups/` from v2 NOT migrated.** Per spec convention (Alex / Kaybe precedent), backups stay in v2.
- **`system.md` v2 content** absorbed into `identity.md` (role, tone, principles) and `state.md` (work streams, team, tech stack, deliverable conventions). No standalone `system.md` in v3.

### Carry-forward open loops (also in `state.md`)

- **Resync Akuvo state with André** — 3+ weeks of drift; meta-priority for first full session.
- **Triage v2 inbox** — 4 messages migrated, mostly stale.
- **Methodology-learnings integration** — v2 staging note has 10+ entries not yet folded into the core methodology doc. Periodic task.
- **Escalation feature spec — 3-tier write-up** (detect+alert / prioritize+route / proactive watch list).
- **Add neg-vol-lift-vs-random to cross-client pipeline.**
- **Formally define control groups, sample sizes, confidence intervals.**
- **Activity classification review with Mike.**
- **Capability-building one-pager for Guarda / leadership** — status unclear after the Tuesday meeting.
- **Investigate clients 60, 91, 96 DQ recording practices.**
- **AI-centric debt collection framing** — captured 2026-04-09; potential dedicated note when mature.

### Things Managing Gaia should review

- **Two-function vs one-function call.** I promoted `analysis-wrap-up` AND `akuvo-meeting-prep` (Kaybe and Alex each kept one agent-specific function). I think both pass the function-shaped test, but if the standard is one-per-Primarch, drop `akuvo-meeting-prep` and fold its content into `identity.md` operating notes.
- **Methodology corpus location.** Four big notes under `notes/`. Considered creating a `notes/methodology/` subdir for grouping but chose flat per template convention; reversible.
- **`slide-report-template.jsx` not promoted.** It's the only JSX asset Joane owns; left at the v2 location. If v3 hygiene wants it under `2 Agents/Joane/`, easy move.
- **Specialized note `akuvo-platform-and-ml-work.md` not migrated.** Decision was that `state.md` + the four big notes already cover the ground; the seeded note was protocol-driven redundancy. Flag if you wanted it preserved.
- **State.md "Akuvo team" section.** Carried verbatim from v2; no resync. If Mike / Will / others have moved or roles changed, will surface on first full session.
- **Stale inbox triage** deferred to first full-mode session as documented.


---

## Managing Gaia review (2026-05-03, post-migration)

### Review responses

- **Two-function vs one-function call.** Both `analysis-wrap-up` and `akuvo-meeting-prep` pass v3 spec §7 ("a function only makes sense for a particular agent or within AAE"). Each has substantial domain-specific body. No one-per-Primarch standard exists in the spec. Keep both. ✓
- **Methodology corpus location.** Flat under `notes/` is correct per template convention. The four big methodology notes are first-class evergreen references; subdir adds a layer for no current gain. Reversible later if `notes/` clutter grows. ✓
- **`slide-report-template.jsx` not promoted.** Decision accepted — JSX asset reasonably stays at v2 location (`2 AI Exchange/Joane/slide-report-template.jsx`); `notes/slide-report-instructions.md` references it. If asset-portability becomes a need post-cutover, easy move. ✓
- **Specialized note `akuvo-platform-and-ml-work.md` not migrated.** Decision accepted — `state.md` + the four big methodology notes cover the operational + methodological ground; the seeded note was protocol-driven redundancy from a v2 protocol that v3 dropped. ✓
- **State.md "Akuvo team" section verbatim.** Acceptable carry-forward; flagged as part of the meta open-loop "resync Akuvo state with André." First full-mode session triages. ✓
- **Stale inbox triage** deferred to first full-mode session as documented. ✓

### Registry fix applied

Joane's narrow added `analysis-wrap-up` and `akuvo-meeting-prep` to `registry/joane.md` but did not update `registry/functions.md` (the canonical complete index per spec §5). Managing Gaia added both during the post-migration consolidation pass. No action needed from Joane.

### Final completeness check

| Artifact | Status |
|---|---|
| `boot.md` | ✓ |
| `identity.md` | ✓ |
| `state.md` | ✓ |
| `sessions.md` | ✓ |
| `history.md` | ✓ |
| `notes/learnings.md` | ✓ |
| `notes/analytics-methodology-core.md` | ✓ (verbatim) |
| `notes/analytics-methodology-framing.md` | ✓ (verbatim) |
| `notes/methodology-learnings.md` | ✓ (verbatim) |
| `notes/slide-report-instructions.md` | ✓ (verbatim) |
| `notes/migration-notes.md` | ✓ |
| `functions/analysis-wrap-up.md` | ✓ |
| `functions/akuvo-meeting-prep.md` | ✓ |
| `inbox/` (4 active messages) | ✓ |
| `registry/joane.md` | ✓ |
| `registry/functions.md` rows | ✓ (added by Managing Gaia) |
| `metaindex.md` Primarchs row | ✓ |
| v2 untouched | ✓ |

Migration accepted.
