---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: '2026-04-09'
domain: meta
status: active
type: project
updated_by: Gaia claude-sonnet-4-6 v2.0
updated_on: '2026-04-09'
---

next: resume building when ready

## Context
A4 two-page JSX weekly planner. Data-driven via JSON objects so only data changes week to week, no structural code changes needed.

Page 1 — Daily operations: 7-column day grid, tasks per day with checkboxes and domain tags (work/trip/personal/meta), key event callouts, notes strip at bottom.
Page 2 — Week plan: context paragraph, numbered goals, key events timeline, sidebar with upcoming trips and active threads.

Design: editorial/field notebook aesthetic. Playfair Display headings, DM Mono tasks. Warm paper tone, terracotta accent, red margin line. Today column highlighted.

Data structure:
- `WEEK` object — week title, theme, goals[], keyEvents[], context, trips[], threads[]
- `DAYS` array — per-day: name, date, isToday, isWeekend, tasks[], event

First working version built in session 2026-04-07 — prototype exists in conversation history.

## Updates
2026-04-07 — thread created, prototype built in session, storing for later
