---
created_by: Kaybe claude-opus-4-7 v3.0
created_on: '2026-05-02'
type: function
awareness: MA Kaybe
updated_by: ''
updated_on: ''
---

# three-way-workflow

Bootstrap and operate the Three-Way Development Workflow for a repo with a Builder counterpart (Claude Code, Copilot, Cursor, etc.).

Reference: protocol body at `2 Agents/Kaybe/notes/three-way-workflow.md`. Read it once if context is fresh; this function is the procedure, not the spec.

## When

- **Bootstrap (new repo).** André says "let's start project X" and intends to use a Builder.
- **Refresh (existing repo).** CLAUDE.md is missing, stale, or drifted; or Builder is improvising because the brief is unclear.
- **Sync (mid-project).** After a Builder session ran or a Jesse-style external input arrived. Pull session logs, update CLAUDE.md, set next tasks.
- **Debug.** Builder is misbehaving (touching CLAUDE.md, skipping session logs, building to wrong spec). Diagnose against protocol anti-patterns.

## How — Bootstrap

1. **Confirm intent with André.** Project name, repo location (default: `%USERPROFILE%/agents/repos/<slug>/`), Builder choice (Claude Code / Copilot / Cursor), tech stack hints.
2. **Draft `CLAUDE.md`.** Sections per protocol: agent identity, three-way workflow rules, project description, architecture, API contracts, tech stack, project structure, visual identity (if frontend), domain glossary (if specialized), coding conventions, vault references. Keep under ~400 lines; externalize deep detail to `docs/`.
3. **Draft `tasks.md`.** Header with workflow + session-log reminders. First sprint with categorized tasks. Empty `Blocked / Waiting`, `Session Log`, `Done` sections.
4. **Draft `initial-prompt.md`.** One-time kickoff: "Read CLAUDE.md", first-sprint instructions, quality bar, what NOT to do, environment setup (venv, deps).
5. **Hand off to André.** He pastes `initial-prompt.md` into the Builder's first session.

## How — Refresh / Sync

1. **Read repo.** `tasks.md` session logs first; new/changed files second; current `CLAUDE.md` third.
2. **Diff against state.** What did the Builder do vs what was asked? Any drift in spec, conventions, or scope?
3. **Update `CLAUDE.md`** if architecture, API, or decisions changed. Targeted edit, not rewrite.
4. **Update `tasks.md`** — mark stale tasks, add new ones with brief context, surface blockers explicitly.
5. **Brief André** on changes that need his judgment or external input (Jesse decisions, third-party API specs, etc.).

## How — Debug

Run against the anti-patterns:
- Builder modifying CLAUDE.md? → Restate the read-only rule in the Builder's next prompt; rebuild CLAUDE.md from the last clean version.
- No session log? → Add explicit reminder to `tasks.md` header; if recurring, instrument the Builder prompt with a session-log requirement.
- CLAUDE.md too long? → Externalize to `docs/`. Anything stable and reference-shaped (API contracts, glossaries) leaves CLAUDE.md and gets a one-line pointer.
- Builder building to wrong spec? → CLAUDE.md too vague, or stale. Tighten the relevant section.
- André as full-time relay? → Audit which of his relays could have been a Builder session-log read. Re-anchor the sync contract.

## Bounds

- **Don't pre-commit choices André hasn't made.** Builder choice and stack should be his call. Offer options, then draft.
- **Don't write CLAUDE.md as a brain-dump.** Architect's job is curation; write what the Builder needs to know to build correctly, not everything we know.
- **Don't run `git`.** André commits manually. Same as everywhere.
- **Don't quietly rewrite the protocol.** If the situation needs a deviation, name it in `notes/three-way-workflow.md` carry-forward section, then act.

## Open question

Builder landscape changed with v3 (Claude Code CLI + Cowork + aae-mcp shipped 2026-05-02). The Builder Slot Options table in `notes/three-way-workflow.md` is from April. Worth a refresh sweep — tracked in `state.md` open loops.
