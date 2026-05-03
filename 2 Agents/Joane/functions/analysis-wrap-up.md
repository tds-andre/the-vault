---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: function
updated_by: ''
updated_on: ''
---

# Function: analysis-wrap-up (Joane)

Turn a completed analysis into stakeholder-ready deliverables.

## When to invoke

When an analytical inquiry has reached a natural wrap-up point and the outputs need to land somewhere visible — for Guarda, Mike, Will, the VP, or the CDO. Don't fire this mid-inquiry; fire it when the analysis is conclusive (or honestly inconclusive) and ready to be presented.

## Inputs

- The analysis itself (notebook, scripts, raw outputs).
- The audience (Guarda / Mike / Will / VP / CDO / mixed leadership).
- The communication channel (slide report, executive markdown, one-pager, email + PDF).
- Any prior framings or stakeholder vocabulary already in play (e.g., "Feature Store", "automated cure").

## Procedure

1. **Identify the headline finding in one sentence.** What's the assertion? If you can't state it, the analysis isn't ready to wrap.
2. **Sanity-check methodology integrity** before formatting anything:
   - Coverage measured before impact?
   - Dual baselines (random + intra-entity)?
   - Metrics defined (numerator, denominator, window, name)?
   - Sample size and support reported with every key number?
   - Dead ends and broken premises documented?
   - If any are missing, do not wrap yet — flag to André and resolve.
3. **Pick the deliverable shape per audience:**
   - **Slide Report** (`notes/slide-report-instructions.md`) when it'll be both presented live and circulated as a PDF.
   - **Executive Report** (markdown, fast-read, inquisitive headlines) for leadership async consumption.
   - **Detailed Report** (markdown, chronological including dead ends) for the analytical record / agent context.
   - **One-pager infographic** when the audience won't read past one screen.
   - **Email + asset(s)** for the lightest touch.
   - It's normal to produce more than one — Detailed for the record, Slide Report for the meeting, executive markdown for circulation.
4. **Frame in stakeholder vocabulary.** Use the words they already use ("Feature Store", "automated cure", "B-side coverage"). Adopt Mike's framing then propose the better one rather than overwriting his.
5. **Tie back to the Big Problem.** Cash flow optimization (recovery − cost). Every wrap-up should make the connection visible — not as decoration, as the spine.
6. **Land the artifacts in the canonical location:** `Janea Akuvo/[Analysis Name]/MMDD/` with assets in `MMDD/assets/`. Slide reports as `slide-report.jsx`. Append `v2`, `v3`... to MMDD on subsequent versions.
7. **Strip technical noise.** Stakeholder docs: no library names, no parameter sweeps in the main flow (push to appendix tables), no internal-only framings.
8. **Capture methodology learnings.** If the analysis surfaced a new pattern, anti-pattern, or principle, append to `notes/methodology-learnings.md` with date + context + suggested section.
9. **Update `state.md` Open loops.** What's now closed, what spawned, what stakeholder action is pending.
10. **Update `sessions.md`.** What was wrapped, key findings, what was delivered, where.

## Outputs

- The deliverable(s) at `Janea Akuvo/[Analysis Name]/MMDD/`.
- Methodology learnings appended (if any).
- `state.md` and `sessions.md` reflect the wrap.

## Anti-patterns

- Wrapping mid-inquiry to look productive — quality slips, stakeholders bounce.
- Single document trying to be both Detailed Report and Executive Report — produces a mediocre compromise.
- Showing parameter sweeps as the primary visualization (over-parameterizing — see methodology anti-pattern 4.6). Pick a reference value, table the rest.
- Skipping the Big Problem connection because "they know."
- Sharing internal-only framings with stakeholders (capability-building essay is the canonical example — internal source, stakeholder docs compile from it).
