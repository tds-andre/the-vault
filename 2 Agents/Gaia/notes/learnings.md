---
type: notes
---

# Gaia — Learnings

Accumulated intelligence and operational patterns. **Loaded at boot.** This file is how I get smarter session over session without changing the standard system files (`boot.md`, `core.md`, `identity.md`). Short observations, behavioral defaults discovered through use, blind spots noticed, things that worked, things that didn't.

When a thread here matures into something that deserves its own file (a richer methodology, a sustained pattern, a domain briefing), promote it to `notes/[topic].md` and update `registry/gaia.md`.

---

## Operational defaults

- **Lean over comprehensive.** When in doubt, write less. Expand on demand. André will cut what's bloated. Verified across multiple v2/v3 sessions where he asked me to halve drafts.
- **Capture his words faithfully when he designs.** Don't re-invent in my voice; transcribe and structure. v2 Gaia over-invented during v3 spec sessions and got steered repeatedly. The lesson stuck.
- **Tooling failures route to Alex immediately.** Not as a principle to log; as the actual next move. Send a brief message describing tool, input, error.
- **Batch git commits at end of session, with approval.** Never mid-session. André runs git himself outside the session in v3, but the batching discipline still applies to anything I propose.
- **Don't send substantive messages without confirmation.** I once sent a wrong message to Alex and had to retract. Confirm draft before dispatch.
- **Don't claim work that was skipped.** If I didn't do it, say so. André catches "preserved in place" / similar handwaves.
- **No preamble.** Get to the point. He has flagged this in multiple sessions.
- **Propose, don't describe.** When the next move is obvious, do it (or offer to). Don't narrate options he can already see.

## Patterns about André

- **He defers difficult conversations.** Restaurant pivot, professional reframes, body / image goals. My job is to surface what's being avoided, not to push. Naming it is enough — he takes it from there.
- **His re-entry threshold is low.** Small visible progress beats grand plans. Design for the smallest possible re-engagement after drift. Don't open with a big agenda.
- **When he says "keep it simple," he means it twice.** Cut to half then half again. The second cut is the one that lands.
- **He uses other AIs for second opinions sometimes.** During the v3 sprint he ran feedback through another model. Trust his calls — he's been steering correctly.
- **Frustration signals (swearing, "jesus please", short replies) mean the loop is too long.** Tighten output, get to a decision point, stop elaborating.

## Surfacing rituals — open

Mantra and dormant surfacing exist as protocols but the operational ritual hasn't been systematized in v3 yet. Backlog item in `state.md`. Watch for the first natural occasion to surface a mantra item and a dormant item — observe whether the protocols fire as designed; refine if they don't.

## Things to watch

- **Registry drift.** Easy to let pass. The fix is to update registry in the same operation as the change. If I create a function or move a file, the registry edit goes in the same turn — not "later."
- **State staleness.** `state.md` collects open loops faster than I close them. Periodically prune; don't let it become a wishlist.
- **Cross-Primarch coherence.** When multiple Primarchs run in parallel and append to their own session logs, the meta-picture (who's doing what, where things are stuck) only exists if I assemble it. That's part of weekly review.

## From v3 system file rewrite (2026-05-03)

- **Multi-pass review with `[A]:` annotations works well.** André leaves inline comments throughout a long doc; the right move is to capture all of them first and address them as a batch, not chase them piecemeal. Keeps the structural restructure coherent and avoids partial-state drift.
- **Bash sandbox view of the vault can go stale relative to Windows-side reality.** Hit this directly: `Write` to `Alex/boot.md` reported success, Windows-side correctly showed 4795 bytes / 62 lines, but the bash mount kept reporting 1456 bytes / 20 lines. Wasted some cycles re-writing the same file. Lesson: when verifying writes that look wrong, cross-check via `aae-mcp:shell` (Windows-side) for ground truth before re-acting.
- **Lean expansion path: `details.md` (MA).** When a `core.md` section gets long (~30+ lines and dense), the design escape hatch is to externalize the body to a `details.md` file at MA awareness — short summary in `core.md` plus pointer. Memory protocol and Messaging protocol are the obvious first candidates if/when core.md verbosity becomes a real problem. Not for now; flagged.
- **André's "strict + status-quo" reconcile call is a useful pattern.** When a write-time consistency rule has an edge case, the resolution is: keep the write rule strict (no writes here), but be honest about how reads work in the meantime (trust the more recent source, write the integration later). Applied to: no `state.md` writes at boot; trust `sessions.md` over `state.md` for in-session reasoning.

## From Cockpit arc + Thread review v2 (2026-05-08)

- **Two-stage thread review works.** v1 mechanical migration (schema + filename) first, then v2 semantic refinement with `[A]:` annotations from André on the migrated files. Cleaner than trying to do both at once — v1 normalizes the surface, v2 evolves the ontology against a clean baseline. Reuse this pattern for future schema overhauls.
- **Cowork artifact runtime ≠ chat MCP context.** Custom MCP servers (e.g., aae-mcp) may be available to me via chat tool-use but NOT exposed to artifact JS via `window.cowork.callMcpTool`. Symptom: HTTP 400 "Tool call failed" with no useful detail; the artifact's per-tool `mcp_tools` whitelist passes (no allowlist error message) but the call still fails. Reasoning: there's a separate server-level allowlist higher in the stack. **Probe via `now()` (no-arg sanity check) first** when an artifact's MCP calls fail mysteriously — the error message for unwhitelisted tools is clearer than the generic 400.
- **JSX-as-artifact via Claude UI right pane works** for inline-data UIs. No build step needed. Limitations: no `fetch` to local paths (CORS), localStorage status unknown, no MCP. Good for snapshot dashboards I regenerate; bad for live data.
- **Build first, probe runtime second is the wrong order.** I built a full Cowork artifact UI before validating the data path. Wasted cycles. **Always probe the data layer (one bare MCP call) end-to-end before investing in UI** — especially when the runtime is new/poorly-documented.
- **"Side quests" and "Resurface Queue" patterns earned their keep.** During the [A]: review, several systemic concerns surfaced (assets-as-domain, products-list canonical home, surfacing-routines UX). Capturing them in `notes/scratchpad.md` (rather than spawning new threads or trying to solve mid-review) let the review stay focused on its goal. The Resurface Queue section is the "I'll come back to this at next weekly review" channel — first item is the closed toggl-time-accounting thread.
- **Filesystem-as-index over markdown-index.** `Thread Index.md` died because the new schema makes it redundant — `glob 1 OFP/Threads/**/*.md` + filename parse + frontmatter gives everything. Lesson generalizes: when filesystem can encode the index naturally (via directory structure + filename conventions), prefer that over a separate index file that drifts. Maintenance cost approaches zero.
- **André's [A]: annotations work asymmetrically well.** He marks files in batch (low-friction for him); I address them in batch (efficient for me). The pattern needs me to (a) read all annotations before acting, (b) ask the small number of clarifying questions, (c) execute in waves. Same pattern as the v3 system file rewrite — repeatable.
