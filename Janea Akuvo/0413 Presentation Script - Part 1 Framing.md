---
created_by: Joane claude-opus-4-6 v2.0
created_on: '2026-04-13'
type: script
updated_by: ''
updated_on: ''
---

# Feature Store & Company — Presentation Script

*Part 1: Framing (Business Reality + Technical Context)*
*Audience: Mike, Will, Guarda, Filip*
*Goal: align on why data quality matters, from business goals down*

---

## Beat sequence

1. **What do Akuvo's clients do?** — Lend money, get it back with interest. Two jobs.
2. **Where does Akuvo sit?** — On the "get it back" side. The collection operation.
3. **What is collection, operationally?** — Actions (calls, letters, automation) against delinquent accounts to motivate payment.
4. **What are we optimizing?** — Recovery minus costs. For simplicity, let's focus on recovery — we can factor in costs later, but the core logic holds either way.
5. **What's the lever?** — The right action, on the right account, at the right time. That's what the platform enables.
6. **What would a perfect system look like?** — It would prescribe the optimal action for every account. We're not there, but that's the direction.
7. **What does that require?** — Prediction. To prescribe the best action, you need to predict what happens under each option.
8. **What does prediction require?** — Features. Account history, payment behavior, DQ patterns, activities. Same inputs regardless of what you're predicting.
9. **What do features require?** — Clean, accessible, well-understood data.
10. **The punchline:** Data quality links directly to the net profit of the lenders. It's not a cliche — for Akuvo specifically, every model, score, and attribute downstream is only as good as the data it's built on. Models are commodity (everyone has access to the same algorithms). The data ecosystem is the differentiator.
11. **Lead out:** "We have some complications with our data that I'd like to walk through next time — but I wanted to start here so we're all on the same page about *why* data quality matters this much."

---

## Beat tracker (on screen throughout)

A horizontal chain that builds as you advance. Current beat highlighted, previous beats muted:

```
lend money → get it back → collection actions → recovery → the lever → perfect system → prediction → features → data quality
```

## Notes
- Avoid internal jargon: no "Big Problem", no "metamodel"
- Some beats will have explanatory detours (to be added)
- "Data is the strategic asset" — ground it in Akuvo's specific case: data quality → model quality → collection effectiveness → lender profit
