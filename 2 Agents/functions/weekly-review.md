---
type: function
awareness: MA Gaia / F others
---

# weekly-review

The OFP weekly review. Sunday night or Monday morning. André writes; Gaia briefs and assesses.

This function codifies the v2 process that ran reliably through April 2026. Refine in v3 as the new memory model (state / sessions / history / notes per Primarch) settles in. The shape below is a starting point.

---

## Intent

Once a week:

- Surface what got done.
- Surface what's open and aging — threads that haven't moved in a while.
- Surface what's drifting from priorities.
- Name what needs a decision (and from whom).

The review is for André's orientation, not for Gaia's archive. Optimize for his clarity over completeness.

## Inputs

- **Thread Index** — `1 OFP/Thread Index.md` for fast overview of all threads.
- **Most recent weekly review** — `1 OFP/Weekly Reviews/` (latest file). Continuity check.
- **Sessions tail across Primarchs** — `2 Agents/[Primarch]/sessions.md` recent entries for each migrated Primarch. The cross-domain picture comes from assembling these.
- **Open loops** — Gaia's own `state.md`, plus any open loops surfaced from other Primarchs' state if they've flagged escalations.
- **Vault changes** — git log since last review (if available); otherwise scan recent vault edits.

Individual thread files: open only if needed.

## Phases

### Phase 1 — Gaia's briefing

1. Read `1 OFP/Thread Index.md`.
2. Read most recent `1 OFP/Weekly Reviews/` file (continuity).
3. Skim `sessions.md` tails across the active Primarchs (Gaia, Alex, Kaybe, Joane, Cocorita, Ben).
4. Surface mantra — 5 curated items selected for the week's context (per the Mantra protocol in Gaia's `identity.md`).
5. Create the new review file: `1 OFP/Weekly Reviews/YYMMDD weekly review.md`.
6. Fill the Briefing section: progress, aging threads, drift signals, decisions needed. Keep it tight — André reads this.
7. Tell André the file is ready and ask him to write his side.

### Phase 2 — André writes

Gaia waits. André writes in Obsidian: what happened, what he's noticing, what he wants to focus on next week, what he's avoiding.

### Phase 3 — Gaia's assessment

1. Read what André wrote.
2. Append the Assessment section: patterns observed, blind spots worth naming, things being deferred, cross-domain conflicts surfacing. Honest over comfortable.
3. Update threads where the review revealed status changes (with André's sign-off on non-trivial changes).
4. Update Gaia's `state.md` with any open loops that emerged.
5. Append a session entry to Gaia's `sessions.md`.

## Output format

Weekly review file structure (suggested — refine as the v3 ritual settles):

```
# YYMMDD Weekly Review

## 📋 Gaia's Briefing
- Progress this week
- Open and aging
- Drift signals
- Decisions needed
- Mantra surfacing (5 items)

## ✍️ André's Reflection
*(André writes here)*

## 📊 Gaia's Assessment
- Patterns observed
- Blind spots worth naming
- What's being avoided
- Cross-domain conflicts
- Suggested focus for next week
```

## Token efficiency

The Briefing must be completable from Thread Index + recent sessions tails + last review alone. Don't open every thread file; use the Index. Open individual threads only when the Index suggests something needs verification.

## Notes

- **Cadence** is Sunday night or Monday morning — André's choice in the moment.
- **Cross-Primarch coherence** is part of the value here. The meta-picture (who's doing what across Akuvo, Key Bridge, Cocoricó, personal) only exists if Gaia assembles it. This is unique to Gaia's role.
- **Don't gate on perfection.** A short, honest weekly review beats a comprehensive one that André skips because it's intimidating.
