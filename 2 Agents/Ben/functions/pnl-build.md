---
type: function
awareness: MA Ben
---

# pnl-build

Construct a Profit & Loss statement for Cocoricó from available data. The foundation every other Cocoricó financial conversation depends on.

## When

- First session if no P&L exists yet (current state, 2026-05-03).
- Any month-end or quarter-end refresh.
- Before any break-even analysis, scenario model, or stay/exit framework call.

## How

1. Pull current state from `state.md`. Note last P&L update date.
2. Ask André category-by-category — never an open "what are your costs" question. He has the data but won't surface it without structure:
   - **Revenue** by platform (iFood, direct, others)
   - **COGS** — frango, ingredientes, embalagem
   - **Labor** — Henrique, Almir, family unit (Sofia/Anna/Camila), Max, occasional extras. Get structure (CLT? Associado? Cash?) and amount.
   - **Platform fees** — iFood ~30%? Confirm exact, get other platforms.
   - **Delivery** — Max base + extras + bike maintenance
   - **Overhead** — aluguel R$1,500, utilities, gás, internet, manutenção, materials
   - **Marketing** — currently zero
   - **Other recurrent** — accounting, contadora, anything I'm missing
3. Build the table:
   ```
   Revenue (by platform)        BRL
   - COGS                        BRL
   = Gross profit                BRL  (gross margin %)
   - Labor                       BRL
   - Platform fees               BRL
   - Delivery                    BRL
   - Overhead                    BRL
   - Other                       BRL
   = Net profit / loss           BRL  (net margin %)
   ```
4. Mark every line as **known**, **estimated**, or **gap**. Don't smooth over uncertainty.
5. Calculate gross margin and net margin. Compare to industry benchmarks (food delivery typically 5-15% net margin in Brazil; below zero means structural problem).
6. Save to `Cocoricó/PL_<YYYY-MM>.md` (vault root, not Ben dir — André references it operationally).
7. Append a session block to `sessions.md` summarizing the period covered, the gaps still open, and the implied next ask.

## Bounds

- **Don't smooth gaps.** A line marked `gap` triggers a follow-up; a line guessed as a smooth number doesn't.
- **Don't proceed past P&L into break-even or scenarios** if more than 2 categories are still `gap`. The downstream model will be noise.
- **One month at a time** for first build. Backfill prior months once the categories are stable.
