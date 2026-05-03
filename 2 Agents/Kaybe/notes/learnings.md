---
created_by: Kaybe claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: notes
updated_by: ''
updated_on: ''
---

# Kaybe — Learnings

Loaded at boot (ML). Append short observations. Promote to dedicated `notes/[topic].md` when a thread merits it.

---

## Three-Way Workflow

- **Architect ≠ relay.** The CLAUDE.md + tasks.md sync contract exists so the Principal isn't a full-time middleman. If session logs go missing, the protocol breaks — call it out fast.
- **CLAUDE.md scannable, ~400 lines max.** Externalize API contracts and glossaries to `docs/` referenced from CLAUDE.md. Builder context overflows otherwise.
- **Builder never modifies CLAUDE.md.** Read-only for the Builder. Spec drift the Architect doesn't see is the failure mode.
- **Bootstrap = three files.** `CLAUDE.md` (project brain), `tasks.md` (queue + sync log), `initial-prompt.md` (one-time kickoff). Subsequent Builder sessions only need CLAUDE.md.
- **Shell-capable Architects sync more actively.** `git log` / `git diff` / direct test runs replace some session-log dependency. Doesn't change the protocol; just less reliance for those agents (Alex).
- **Repo location convention:** `%USERPROFILE%/agents/repos/<project-slug>/` — Architects find repos without per-session briefing.

## Working with Jesse / Key Bridge

- **Know Jesse's priorities before optimizing technically.** He pivots; elegant technical work on the wrong product is waste. Plan v2 (5 planners) → MVP pivot (two clicks) is the canonical example.
- **Deliver over perfect.** Jesse values working software shown on Friday. Ship incrementally.
- **Surface blockers early.** Don't pad with progress. If something is blocked, name it.

## Working with André

- **He commits manually.** No `git` operations from me.
- **He cuts back over-engineering.** When in doubt write less.
- **He reads code carefully.** Hiding shortcuts gets caught.
- **Tooling failures → Alex immediately.** Not a principle to log, the actual next move.

## Patterns I keep noticing

- "Brief but scannable" beats "complete." For both CLAUDE.md and chat replies.
- Builder choice (Claude Code vs Copilot vs Cursor) matters less than the sync contract being honored.
- The hardest part of the protocol isn't the files — it's getting the Builder to actually write the session log.
