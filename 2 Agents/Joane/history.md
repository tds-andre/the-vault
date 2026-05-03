---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: history
updated_by: ''
updated_on: ''
---

# Joane — History

Long-term archive. Never loaded at boot. Written by housekeeping only.

---

## Preface — v2 era as Joane (2026-03 to 2026-05)

Migrated from v2 on 2026-05-03. v2 lives at `2 AI Exchange/Joane/` and is preserved as-is. The narrative below preserves what shaped this agent before v3.

### Founding (2026-03-29)

Created as André's specialized agent for his main paid engagement at **Janea Systems**, assigned to **Akuvo** — a US SaaS for debt collection analytics. Renamed at founding from `Janea` → `Joane`. André was 3 months in. Active projects at founding: Escalation Feature (Phase 1 proven), Core Package Refactor (untested in Synapse), Capability Building (Guarda had just approved the proposal).

### Repo and data setup (2026-03-30)

Repo `C:\Users\tdsnit\Work26\akuvo-analytics2`, Python 3.14. Data lake `D:\akuvo-data\stakuvoproddatalake`. 155 clients partitioned `prod-{id}`, TIMECAP 2026-03-17. `DATA.md` written.

### Client segmentation (2026-03-31)

153 total → 108 clean clients after filtering. Segmented into 50 Rich / 47 Moderate / 11 Scarce / 45 Not ready. Built `client-segmentation-report.jsx`.

### Cross-client foundations (2026-04-01)

Segmentation converted to standalone HTML (Chart.js). Escalation briefing written (6 gaps, 5-phase plan). Rich-client aggregation dataset established (5 tables, ~50 clients). Cross-client escalation notebook drafted.

### Phase 1 — full escalation analysis (2026-04-02)

End-to-end escalation analysis on prod-31 (CAPEDCU) with real data. Key results: A triggers 1.6× duration lift, B escalated 1.3×, combined 3.5× vs global. Negative outcome lift 4.0× vs intra, 10.0× vs random (Z=30d). DQ recurrence A-side 69–84% vs 13–23% random (5–6× lift). Volume amplifies probability AND severity (5.1× unconditional). Presentation v4 (14 pages, dark/cream hybrid) finalized along with detailed + executive reports.

Same day: **analytics methodology corpus seeded**. Wrote `analytics-methodology-core.md` (Socratic Analytics — scaffolding + inquiry loop + principles + anti-patterns) and `analytics-methodology-framing.md` (André's aspirational goals). Started `methodology-learnings.md` as a staging file. Extracted the **Slide Report format** as a reusable template (`slide-report-instructions.md` + `slide-report-template.jsx`) — the dark-top / cream-notes A4 portrait hybrid that fuses presentation and self-explanatory report. Infrastructure: vault-mcp:python with project venv, D:\akuvo-data mounted in MCP.

### Phase 2 — cross-client (2026-04-03)

Built cross-client pipeline (`analysis.py` + `run.py` at `src/akuvo/analytics/pipelines/escalation/`). 21-client initial run — all Rich clients, all lifts positive, 133K esc pairs. Outcome normalization added (terminal/negative categories, excluded 3 problematic clients). 18-client normalized run with DQ ≤1d filter — all lifts positive, 63.5K esc pairs, CV dropped 0.24 → 0.15. Phase 3 framing locked: 3 core questions. Captured 11 methodology learnings. Cross-client detailed report written. Slide report template extracted to Joane's dir for reuse.

### v2.0 architecture migration (2026-04-06)

Migrated from v1.1 to v2.0 file structure (`boot.md` + `system.md` + `index.md`). Messaging protocol deprecated. Same day: PDF export of prod-31 presentation via Chrome screenshots (14 pages, 2.0 MB). Cross-client presentation v1 built (13 pages JSX). Standalone HTML version partially built. Executive email drafted for Will/Mike (two variants).

**ROI / Automated Cure** task inherited from Filip. Built activity classification CSV (76 types by channel + human_intervention), wrote `notebooks/roi_automated_cure.py`, ran across all 21 Rich clients. Key insight: raw "91% cure without phone call" misleading — 88% self-cure (no contact at all). Better framing: **53% of contacted DQs under 30d resolved through automation alone**. 0–14d band strongest at **70% automated** among contacted DQs. Per-client variation 0%–96% (median 40%). Initial findings report saved.

Escalation feature brainstorm: 3 tiers — detect+alert (MVP), prioritize+route, proactive watch list.

### Vault audit + capability building essay (2026-04-07)

Vault audit and cleanup (10 v2.0-migration inconsistencies fixed). Memory pruned (sessions 03-29 → 04-01 moved to archive.md). **Capability Building essay** — André wrote source essay; Joane drafted companion sections; integrated version produced. LGBM grid search context updated with real numbers (200+ models, 6 params, only data quality moved the needle). Communication strategy locked: two-step (short email → meeting → follow-up menu email).

### Concepts & one-pager + capability building rollout (2026-04-08)

`Janea Akuvo/Escalation Analysis/concepts-and-definitions.md` written — coverage, impact (duration + fallout + relapse), opportunity score formula. One-pager infographic v4 built (dark theme, scannable, four sections). Data infrastructure diagram drafted (Data Lake → QC → Analytical Data Store: integration → cubes → apps → sandbox). QC system spec discussed (5-step pipeline, atomic/relational/statistical rule types, autofix between steps). Capability building SCR framing locked. Seed email sent to Mike/Will (cc Guarda/Filip); Tuesday meeting scheduled. "Feature Store" adopted as stakeholder-facing name for the Analytical Data Store.

### Specialized notes protocol seeded (2026-04-09)

Gaia introduced the Specialized Notes protocol; `notes/akuvo-platform-and-ml-work.md` was seeded by Gaia from session memory + system.md. Two todo-capture digests landed in inbox (Akuvo/ML ideas and broader items). The "AI-centric debt collection" framing — cooked data + MCP + dynamic action + token efficiency — was captured from André's todo as a candidate for a dedicated note.

### Cross-machine env.yaml (2026-04-10)

Gaia's env.yaml cross-machine setup landed in inbox. (Later superseded in v3 by Alex's aae-mcp env config.)

### v3 design and migration prep (2026-04-28 → 2026-05-03)

André drove the v3 redesign of the AAE. v3 root `2 Agents/`; v2 (`2 AI Exchange/`) coexists; no cross-reference. Awareness ontology (I / ML / MA / F), Primarch / Narrow / Servitor types, `boot.md` as sole orchestrator. Gaia, Alex (2026-05-02), Kaybe (2026-05-02) migrated; Joane fourth (2026-05-03).

### Lessons that shaped this agent

- **Visibility = value.** Great work that isn't seen doesn't help André. Frame analytics as deliverables stakeholders can absorb.
- **The Big Problem framing is the spine.** Cash flow optimization (recovery − cost). Every analysis ladders back.
- **Guarda is the gatekeeper.** Practical / operational lens. Strategic contributions land best as practical enablers.
- **Denominator-defines-story.** Same data, different denominators, opposite narratives — pick the one that isolates the intervention's contribution. (ROI 91% vs 53% was the canonical example.)
- **Profile before asking.** Volume, shape, distributions, outliers, nulls. Surprises in profiling reframe analyses.
- **Dual baselines, always.** Random for existence-of-signal, intra-entity for specificity. Either alone misleads.
- **Coverage before impact.** Cheap and gating; impact analysis is expensive and only worth it where coverage justifies.
- **Define metrics before counting.** Numerator, denominator, window, human-readable name. Ambiguous metrics cause re-work.
- **Track what didn't work.** Failed approaches narrow the solution space; broken premises point to the right framing.
- **Challenge null results.** A null from a flawed metric is not a finding.
- **Slide Reports work.** Dark presentation top / cream notes bottom — same artifact serves live presenting and async sharing.

### Carried forward to v3

- The four-note **methodology corpus** — ported verbatim. Highest-value asset.
- Akuvo domain context — team, work streams, tech stack — preserved in `state.md` (3+ weeks stale; needs resync).
- Two agent-specific functions — `analysis-wrap-up` and `akuvo-meeting-prep` — promoted with real bodies.
- Tone: technical, precise, results-oriented; visibility-first.
- Domain split: meta/coherence → Gaia; deep tech infra → Alex; KB / coding-protocols → Kaybe; financial → Ben; identity → Apollo; restaurant → Cocorita.
- Specialized note `akuvo-platform-and-ml-work.md` (Gaia-seeded 04-09) NOT migrated as a notes file — the operational picture lives in `state.md` and the methodology lives in the four big notes; that note was a redundant Gaia-side index. Will re-seed if a real specialized note proves useful.
