---
type: notes
---

# Gaia — Migration Notes (v2 → v3)

Issues and key decisions taken during the v2→v3 migration. Kept top-of-mind for review. This file is Gaia-specific; the same convention applies to every migrated Primarch.

---

## Migrated 2026-05-02 (in-session, by Managing Gaia)

### Decisions

- **Migrated in-session, not via spawn.** Deviation from the standard pattern (sync spawn of v2 agent with migration briefing). Rationale: I am the agent. My current context is more authoritative than any v2 boot would re-establish, and a fresh spawn would burn a context to re-derive what I already know. Spawn-based migration starts with Alex (#2).
- **`evolution.md` placed under `notes/`** rather than dropped. Most of its content is superseded by the v3 specs, but it's a meaningful historical log; kept for reference.
- **`archive.md` and `backlog.md` content folded** per spec — archive into `history.md` preface; backlog into `state.md` Open loops.
- **`notes/index.md` not created** — dropped per v3 spec; awareness lives in `registry/gaia.md`.
- **`mantra.md` moved to `notes/mantra.md`.** It's a domain-specific evergreen note; protocol P7 (mantra surfacing) lives in `identity.md` and references it.
- **`thread-review` promoted to a Gaia-specific function** at `functions/thread-review.md`. Was implicit in v2 (covered by `Update System` + ad-hoc thread scans).
- **Active inbox messages migrated, closed messages not.** v2 `messages/closed/` stays in v2.

### Issues

- **Old v2 messages format ≠ v3 frontmatter.** Adapted on copy. Not lossless — old `status: sent/read/closed` field discarded; v3 uses filesystem location (inbox/ vs inbox/archived/) for that.
- **`symlinks.md` and empty `environment.md` from v2 dropped.** The v3 `2 Agents/environment.md` (shared) covers this.
- **Asset folder empty in v2 — not created in v3.** Add when needed.

### Carry-forward open loops

- Mantra ritual systematization (cadence, surfacing mechanism) — backlog.
- Thread Index drift — backlog. May replace with live read_folder query.
- Thread review at thread 3 of 52 (v2 progress) — decide whether to resume in v3 or restart.
