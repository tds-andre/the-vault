---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: notes
updated_by: Joane claude-opus-4-7 v3.0
updated_on: '2026-05-03'
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


## Cowork live artifacts

- **Read path works, write path silently no-ops** (observed 2026-05-03). Live artifacts can call `mcp__aae-mcp-3_1__note_info` via `window.cowork.callMcpTool` and get correct vault frontmatter back. The same channel calling `mcp__aae-mcp-3_1__update_properties` returns success — no thrown error, status pill shows "saved to vault" — but the vault file is unchanged (`updated_by` and `loops` map both stay at the previous server-side write). No approval prompt fires.
- **Working hypothesis.** Cowork sandboxes artifact MCP calls to read-only by default; the write capability isn't documented in the `create_artifact` schema we have. Not yet confirmed.
- **Shipping implication.** Read-only live artifacts (dashboards over `aae-mcp` reads, data-lake views once we wrap them) are safe to ship. Anything that needs the artifact to write back to the vault — bidirectional trackers, agent ↔ artifact state sync — is blocked until the write path is understood. Default to vault-as-read-source + Joane-edits-on-the-server until proven otherwise.
- **Open thread:** message sent to Alex 2026-05-03 to investigate.


## Escalation methodology — canon and predecessors

- **Canon = `D:\akuvo-deliverables\client-31-escalation\` (2026-04-24).** The Summary Report, Detailed Metrics, Technical Reference, and JSON/CSV outputs there define the methodology. Treat as the single source of truth.
- **Earlier cross-client outputs** at `D:\akuvo-data\stakuvoproddatalake\analytics\analysis\escalation\cross-client\` (`escalation-rich21-W15Z90.{csv,json}`, `escalation-rich18-W15Z90.{csv,json}`, `escalation-rich18-v2-W15Z90.{csv,json}`) **use a different methodology and are NOT comparable** to the canon. Don't stitch them into cross-client comparisons. Effectively superseded.
- **Implication for the Tech Reference §5 medians.** Those "cross-client median" values (impact 8.8x, relapse 8.0x, etc.) were inherited from earlier runs — not the canon methodology. Do not present them as comparable to Client 31 canonical numbers.
- **Why this matters.** Client 31 numbers stand alone until the canon is replicated across clients. Cross-client signal claims need to wait for the local cross-client re-run.
- Feedback from André 2026-05-03 — corrected me explicitly after I did the bad comparison in AGENTS.md.


## Recurring drift patterns — André corrections 2026-05-03

Three patterns that surfaced repeatedly today and André called out hard. Locking them in:

- **Drift back to old methodology.** I keep anchoring to "the 18-client set," "v2 normalization decisions," "cross-client medians," `rich18` outputs, etc. — even after being told the Client 31 deliverable IS the canon and the older methodology is gone. **Rule: forget it.** The old 18-client set is not a reference frame. The exclusion criteria 60/91/96 belong to the old methodology unless reaffirmed under canon. The cross-client medians at Tech Reference §5 are inherited from old runs and not comparable. When tempted to cite an old number as a baseline or anchor, stop — ask whether the canon establishes it, and if not, leave it out.
- **Pushing work into "tomorrow."** When André sets up a workstream, he means start now. "Tomorrow's task" framing is wrong — the work is **today's work**, iterative, in flight. Stop creating artificial "today / tomorrow" boundaries when he hasn't asked for one.
- **Asking redundant questions.** When he gives sufficient info to act, asking more questions reads as not paying attention. Reread his message before asking — he often answers things implicitly. Ask only what's actually blocking.

These are correction patterns, not principles to inherit verbatim — but they recur enough to risk drift if I don't bind them.
