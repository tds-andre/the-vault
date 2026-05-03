---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: function
updated_by: ''
updated_on: ''
---

# Function: akuvo-meeting-prep (Joane)

Help André prepare for a meeting with Akuvo stakeholders.

## When to invoke

Before any scheduled meeting with Guarda, Mike, Will, the VP, the CDO, or mixed leadership. Also useful before async stakeholder communications (seed emails, follow-up menus) that benefit from the same prep work.

## Inputs

- Who's in the room (or on the email).
- The trigger / agenda for the meeting.
- The meeting's objective from André's perspective (decision sought, info to share, value to demonstrate, capability to position).

## Procedure

1. **Read `state.md` first.** What's moved since the last touchpoint with this stakeholder? What's the current status of the work streams they care about?
2. **Map the audience to their lens:**
   - **Guarda** — practical / operational. Frame strategy as practical enablers; he's the gatekeeper. Lead with what works, not what could.
   - **Mike** — wants specific framings ("X% of DQs under 30 days cure without a phone call"). Match his frame, then offer the better one.
   - **Will** — owns "Feature Store" framing; skeptical of competitor's 20x ROI claim. Use his vocabulary.
   - **VP** — smart, tech-savvy; can absorb depth.
   - **CDO** — commercial, feature-driven; lead with business impact.
3. **Frame contributions in business terms.** Not "we ran 200 LightGBM models with grid search" — "data quality, not hyperparameter tuning, was the lever; 200 model runs proved it." Always map back to the Big Problem (cash flow optimization).
4. **Prepare 3–5 talking points,** each:
   - One assertion (the headline).
   - One supporting number (with denominator and support).
   - One connection to a stakeholder priority (what they care about).
5. **Anticipate pushback.** What's the obvious challenge from each person in the room? Have a one-line response ready, or honestly flag the open question.
6. **Identify what should land in the room vs after.** Two-step communication usually wins: seed the meeting, let stakeholders ask, follow up with a menu they can pick from. Avoid TED-talks.
7. **Flag prep tasks to complete before the meeting.** Anything that needs to ship first: a slide, a number, a one-pager, an email.
8. **For meetings driving capability building:** the integrated essay is internal-only source. Stakeholder material is compiled per audience — don't share the raw essay.
9. **Append meeting prep summary to `state.md`.** Talking points + open prep tasks. Surface to André as a checklist.

## Outputs

- A short prep brief (talking points, anticipated pushback, prep tasks).
- `state.md` updated with the prep summary and any new open loops (e.g., "ship one-pager before Tuesday").

## Anti-patterns

- Preparing without re-reading `state.md` — guarantees stale framings.
- Showing internal honest framings (e.g., raw capability-building essay) to stakeholders.
- Leading with method instead of result — Guarda specifically tunes out.
- Trying to land everything in one meeting — let stakeholders pull rather than push.
- Forgetting the Big Problem connection — Akuvo leadership respects the spine.
