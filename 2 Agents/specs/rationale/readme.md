---
type: index
---

# Rationale — Working files for AAE v3 design

This dir holds the design history. **`specs.md` (in the parent dir) is the canonical reference.** Files here are only for understanding *how* we got there.

## Files

- **`decisions.md`** — chronological capture of every design decision made during the v3 sessions. Sections marked *stable* / *draft*; full changelog at the bottom. The single most useful file if you want to understand reasoning behind a v3 choice.
- **`boot-draft-gaia.md`** — first concrete attempt at writing Gaia's boot.md in v3 format. Superseded by the boot section in `specs.md`. Kept for reference.
- **`core-draft.md`** — first attempt at the slimmed core.md. Superseded by the canonical `2 Agents/core.md`. Kept for reference.
- **`registry-inventory.md`** — sweep + classification of every "thing" in the system, used to design the registry topology. Mostly historical now; the registry topology in `specs.md §5` is the result.
- **`readme-stale.md`** — pre-existing readme from the early v3 dir. Cites concepts ("Eternals", `template/` dir) that were dropped or renamed during this design. Kept for reference; do not use as guidance.

## When to read what

- Want the truth → `../specs.md`
- Want the why behind a decision → `decisions.md`
- Want to see how an earlier draft looked → the corresponding `*-draft.md`
