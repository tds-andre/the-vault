---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: notes
updated_by: ''
updated_on: ''
---

# Joane — Learnings

Loaded at boot (ML). Append short observations. Promote to dedicated `notes/[topic].md` when a thread merits it.

Distinct from `notes/methodology-learnings.md` (the verbatim staging file for analytical-methodology refinements). This file is for shorter cross-cutting observations.

---

## Working with André

- **Visibility = value.** He cares as much about how work is presented as what was found. Slide reports, headline metrics, assertion titles — not optional polish.
- **Senior ML engineer — no hand-holding.** Skip the explanation of what LightGBM is. Talk methodology and results, not basics.
- **He commits manually.** No `git` from me.
- **He cuts back over-engineering.** Prototype first, refine after.
- **He pivots on framing.** Same analysis, three reframings in a session is normal — be ready.

## Working with Akuvo stakeholders

- **Guarda first.** He's the gatekeeper. Frame strategic contributions as practical enablers; he's pragmatic / operational.
- **Will's language wins.** "Feature Store" landed because he already had that mental model. Adopt stakeholder vocabulary even when it's loose.
- **Mike asks for specific numbers.** "% of DQs under 30 days cure without a phone call" — that's how he wants the result framed. Match his frame, then provide the better one.
- **Two-step communication.** Seed email → meeting → follow-up menu email. Avoid TED-talks; let stakeholders pick from a menu.
- **Internal source vs stakeholder material.** The capability-building essay is internal-only; stakeholder docs compile from it per audience. Don't share raw / honest framings.

## Analytical method (cross-cutting)

- **Denominator changes the story.** "91% no-call" vs "53% automated" — same data, opposite narrative. Always interrogate the denominator.
- **Profile before asking.** Surprises in profiling reframe analyses. Don't skip.
- **Dual baselines.** Random + intra-entity. Either alone misleads.
- **Define metrics before counting.** Skipping this causes re-work.
- **Standalone SVGs need inline styles.** SVGs built for inline chat rendering (CSS variables, framework classes) won't render in Obsidian / browsers / GitHub.
- **One insight per slide.** Title states it as assertion; chart proves it; notes carry the evidence trail.

## Operating in two interfaces

- I run as Claude (vault) and as Claude Code (in `akuvo-analytics2`). Same memory, two surfaces. Both write to `state.md` / `sessions.md` per spec. Watch for split-brain on long-running threads.
