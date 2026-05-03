---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: state
updated_by: ''
updated_on: ''
---

# Joane — State

Working memory. Full mode only writes here. Single mutable surface.

## About André (this agent's view)

37yo ML engineer, Niterói. Senior software fundamentals. Top-down generalist with deep spikes — strong on ML methodology, comfortable in PySpark / Synapse / Delta / LightGBM.

**Role relevant to me:** **Janea / Akuvo** is André's main paid engagement. He's the ML Analytics lead, ~5 months in (founded as Joane 2026-03-29). Earned trust with tech lead Guarda; capability-building plan approved.

**Working pattern:** wants prototypes fast; reads code carefully; commits manually (no `git` from me). Cuts back over-engineering. Strong opinion that visibility = value.

**Tech profile (relevant to me):** Python primary, PySpark, Azure Synapse, Delta Lake, LightGBM. AI tools: Claude (daily), Claude Code CLI inside `akuvo-analytics2`, Cowork.

## Current state

### v3 ecosystem cutover (active)

- AAE v3 spec finalized 2026-05-01 by Gaia. Lives at `2 Agents/specs/specs.md`.
- v2 (`2 AI Exchange/`) and v3 (`2 Agents/`) coexist; no cross-reference.
- Migrated to v3 today (2026-05-03) by a narrow Joane spawned by Managing Gaia.
- Predecessors migrated: Gaia, Alex (2026-05-02), Kaybe (2026-05-02). I'm fourth.
- `aae-mcp-3.1` shipped 2026-05-02 (Alex). Spawn smoke-tested.

### Akuvo work streams (carried from v2 memory; **3+ weeks stale — needs resync**)

Last v2 capture was 2026-04-10. State below reflects that snapshot.

- **Escalation Feature** — Phase 2 cross-client validated on 18 Rich clients (all lifts positive, normalized outcome hierarchy). Concepts & definitions doc finalized 04-08 (coverage = B-side ~8%, opp score = coverage × mean(duration, fallout, relapse)). One-pager infographic v4 built. Next: feature spec (3-tier: detect+alert / prioritize+route / proactive watch list).
- **ROI / Automated Cure** — initial findings delivered 2026-04-06. Key framing: 70% of contacted DQs under 0–14d resolved by automation alone. Per-client variation huge (0% to 96%, median 40%). Next: review activity classification with Mike, queue-throughput angle.
- **Capability Building / Shared Feature Store** — Guarda approved. Integrated essay drafted 2026-04-07. SCR framing (Situation → Complications → Resolution: variability analysis + QC + feature store + toolkit). Seed email sent to Mike/Will (cc Guarda/Filip) 2026-04-08; Tuesday meeting was scheduled.
- **Data Quality Control system spec** — discussed 2026-04-08. 5-step pipeline (rules → detect → score/tier → sort → downstream + report); QC sits between integration and cubes. "Feature Store" adopted as stakeholder-facing name (Will's language).
- **Core Package Refactor** — not yet tested in Synapse (was already stale at v2 cut).

### Akuvo team (stable)

- **Guarda** — tech lead. Practical, on board with capability building. The gatekeeper.
- **CDO** — commercial, feature-driven.
- **VP** — smart, tech-savvy.
- **Mike** — product. Asked for ROI / automated cure analysis. Key stakeholder for value demos.
- **Will** — product lead. Skeptical of competitor's 20x ROI claim. Owns "Feature Store" framing.
- **Filip, Anushka** — ML engineers (outsourced via Janea).

### Tech stack and operational facts

- Python, PySpark, Azure Synapse, Delta Lake, LightGBM, `akuvo.analytics` library.
- I also run as Claude Code inside `C:\Users\tdsnit\Work26\akuvo-analytics2\` (`_venv314`). Same brain, two interfaces. `CLAUDE.md` at project root loads vault context.
- Data Lake at `D:\akuvo-data\stakuvoproddatalake\`.
- Deliverables → vault: `Janea Akuvo/[Analysis Name]/MMDD/[+/assets]`.
- Slide reports: dark top / cream notes, A4 portrait, DM Sans, Recharts.

## Open loops

Cull-aggressive list — most v2 backlog items are stale (3+ weeks of drift). First full-mode session should resync with André before acting.

- **Resync Akuvo state with André.** Confirm what shipped from the v2 backlog (Tuesday cap-building meeting, one-pager finalization, integrated essay review, follow-up menu email) and what's actually open.
- **Triage v2 inbox.** 4 messages migrated; review on first full-mode session. Notes: specialized-notes-protocol was dropped from v3 lean baseline per spec §14; env.yaml message superseded by Alex's aae-mcp env work; two todo-capture digests need absorbing into notes/backlog.
- **Methodology-learnings integration.** v2 staging note has 10+ entries not yet folded into the core methodology doc. Standing periodic task.
- **Escalation feature spec — 3-tier write-up.** Detect+alert (MVP), prioritize+route, proactive watch list. Next concrete deliverable on the escalation track.
- **Add negative-volume-lift-vs-random to the cross-client pipeline.** Methodology gap noted 2026-04-08.
- **Formally define control groups, sample sizes, confidence intervals.** Methodology gap noted 2026-04-08; supports "Report results with support and sample size" principle.
- **Activity classification review with Mike.** Open since 2026-04-06.
- **Capability-building one-pager for Guarda / leadership.** Status unclear after the Tuesday meeting; resync.
- **Investigate clients 60, 91, 96 DQ recording practices.** Excluded from cross-client; the question of why was deferred.
- **AI-centric debt collection framing.** Big idea captured from André's todo (Gaia 04-09 inbox): cooked data + MCP + dynamic action + token efficiency. Worth a dedicated note when mature.

## Notes

- `notes/learnings.md` — short distilled learnings, blind spots.
- `notes/analytics-methodology-core.md` — Socratic Analytics methodology (evergreen).
- `notes/analytics-methodology-framing.md` — André's framing / aspirational goals (evergreen).
- `notes/methodology-learnings.md` — staging for new learnings; integrate into core periodically.
- `notes/slide-report-instructions.md` — Slide Report format spec (evergreen).
- `notes/migration-notes.md` — issues & decisions from v2→v3 migration.
