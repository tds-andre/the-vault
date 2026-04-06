# Slide Report — Format Specification & Instructions

*A hybrid presentation-report format for analytical deliverables.*

---

## What is a Slide Report?

A Slide Report is a single React document that serves **two purposes simultaneously**:

1. **Presentation** — the top 2/3 of each page is designed for live presenting: assertion-driven titles, charts, headline metrics, minimal text
2. **Self-explanatory report** — the bottom 1/3 provides the context a reader needs to understand the page without a presenter: methodology, full data tables, definitions, caveats

This dual nature makes it the ideal format when the same analytical work needs to be both presented live and shared asynchronously.

---

## When to use

- Stakeholder presentations that will also be circulated as a PDF
- Analytical findings that need both "the punchline" and "the evidence"
- Work that multiple audiences will consume at different levels of detail
- Any deliverable where the audience might ask "show me the numbers behind that chart"

## When NOT to use

- Pure exploratory analysis (use notebooks or detailed reports)
- Dashboards meant for ongoing monitoring
- Documents that are primarily text (use markdown reports)
- Quick updates or status reports

---

## Design Principles

### 1. The page is the unit of thought

Each page should communicate **one insight**. The title states the insight as an assertion, the chart/metrics prove it, and the notes provide the evidence trail. If a page needs two charts to make its point, that's fine — but it should still be one insight.

### 2. Assertion-driven titles

The title IS the insight. Not "Coverage Analysis" but "15–30% of network DQs could have been preceded by an alert." The audience should understand the finding from the title alone; the chart confirms it.

### 3. Section tags as cognitive anchors

Small, colored, uppercase labels above the title tell the reader which thread of the narrative they're in. Examples: "Q1 — COVERAGE", "Q2 — IMPACT / DURATION", "STANDOUT FINDING", "ADDITIONAL FINDING". Use consistent colors per thread.

### 4. Top section: show, don't tell

The presentation area should be predominantly visual: charts, headline metrics, and minimal supporting text. If you need a paragraph, it probably belongs in the notes. Exceptions: one-line subtitles that define what the chart shows (e.g., "Incidence rate at Z=90d — broken promises, skip traces, DNC events").

### 5. Notes section: explain without apologizing

The notes should make the page self-sufficient for a reader who wasn't in the room. Include:
- **Methodology** for the metric shown (how it was computed)
- **Full data tables** that the chart summarizes (all parameter values, not just the reference)
- **Definitions** for any non-obvious terms (first time they appear)
- **Caveats and sample sizes** where relevant
- **Cross-references** to related pages or detailed reports

### 6. Consistent visual language

Use the same color for the same concept throughout: if "escalation" is coral in the chart, it's coral in the metrics, the dots, and the section tags. Colors should encode meaning, not decoration.

---

## Page Structure

```
┌─────────────────────────────────────┐
│  TOP 2/3 — DARK BACKGROUND          │
│                                      │
│  [Section Tag]                       │
│  [Assertion Title]                   │
│  [Optional subtitle]                 │
│                                      │
│  ┌──────────┐  ┌──────────┐         │
│  │  Chart    │  │ Headline │         │
│  │           │  │ Metrics  │         │
│  └──────────┘  └──────────┘         │
│                                      │
│                          [page #]    │
├──────────────────────────────────────┤
│  BOTTOM 1/3 — LIGHT/CREAM BG        │
│                                      │
│  NOTES                               │
│  Methodology explanation...          │
│  Full data table with all params...  │
│  Caveats and sample sizes...         │
│                                      │
└──────────────────────────────────────┘
```

---

## Typical Page Sequence

1. **Title page** — analysis name, client, date, qualifying pills (type, scope, timeframe)
2. **Context/motivation** — the question driving the analysis, key sub-questions, limitations
3. **Data overview** — what we're working with, funnel chart, key volume metrics
4. **Definition** (if needed) — the core concept explained visually (timeline diagram, schema)
5. **Finding pages** (the core) — one per insight, grouped by question thread
6. **Takeaways** — key findings as numbered cards with color-coded borders
7. **Next steps** — open questions and proposed actions, stacked vertically
8. **Additional findings** — supporting analyses that aren't part of the main narrative
9. **Closing slide** — title recap, 3 headline metrics, "Thank you"

---

## Technical Specification

### Stack
- React functional component with hooks
- Recharts for data visualization (BarChart, LineChart, etc.)
- Google Fonts: DM Sans (400, 500, 600, 700, 800) + DM Mono (400, 500)
- No external CSS — all inline styles

### Navigation
- Arrow keys (left/right) and spacebar
- Click left half / right half of page
- Home/End for first/last page
- Progress bar at bottom (2px, colored fill)

### Color Palette

```javascript
// Semantic colors — use consistently throughout
const CORAL  = "#D85A30";  // Primary accent, escalation, group A
const BLUE   = "#378ADD";  // Secondary accent, group B, positive contrast
const PURPLE = "#534AB7";  // Combined/synthesis
const TEAL   = "#1D9E75";  // Additional findings, third category
const AMBER  = "#BA7517";  // Warnings, limitations, anchors
const GRAY   = "#888780";  // Baselines, neutral, muted
const RED    = "#C03030";  // Standout/critical findings

// Surface colors
const DARK    = "#1a1a1f";   // Top section background
const SURFACE = "#222228";   // Cards/code blocks in dark section
const MD      = "#9a9a9e";   // Muted text in dark section
const NOTE_BG = "#f5f4f0";   // Notes section background
const NM      = "#71706c";   // Notes text
const NB      = "#d8d6cf";   // Notes borders
```

### Component Library

The template provides these reusable primitives:

| Component | Purpose | Section |
|---|---|---|
| `Page` | Page wrapper with top/notes/page number | Both |
| `Tag` | Colored section label above title | Top |
| `H1` | Assertion title (configurable size) | Top |
| `Sub` | Subtitle/description | Top |
| `Big` | Large headline metric (value + label) | Top |
| `Sm` | Small headline metric | Top |
| `Pill` | Colored pill tag | Top |
| `Dot` | Bullet point with colored dot | Top |
| `NP` | Notes paragraph | Notes |
| `NT` | Notes table (with optional row highlight) | Notes |

### Layout Tips

- **Chart + metrics side by side:** `flex: 1.3` for chart, `flex: 0.7` for metrics
- **Two charts side by side:** `flex: 1` each, reduce chart height to ~160px
- **Chart height:** 180-210px for single chart, 160px for side-by-side
- **Metrics grid:** `gridTemplateColumns: "1fr 1fr"` for 2x2 layout
- **Notes tables:** keep font at 0.62-0.66rem, highlight rows with `highlight` prop

---

## Generation Instructions

When asked to create a Slide Report:

1. **Understand the content first.** Read the analysis findings, key metrics, and narrative structure before writing any code.

2. **Plan the page sequence.** List out the pages with their titles (as assertions) and what chart/metric goes on each. Get confirmation before building.

3. **Assign colors to meaning.** Decide what each color represents (e.g., coral = the main effect, blue = secondary, gray = baseline) and keep it consistent.

4. **Build from the template.** Copy the template JSX and customize the pages array, page components, and data.

5. **Title every page as an assertion.** "8–10x more negative outcomes than random" not "Negative Outcome Analysis."

6. **Notes should make each page standalone.** A reader seeing only this page should understand what was measured, how, and what the caveats are.

7. **Iterate on feedback.** The format is designed for rapid iteration — each page is independent, so changes to one don't cascade.

### Output Structure

```
/MMDD Analysis Name/
  /assets/
    slide-report.jsx          # The React presentation
    build.py                  # Python script for any matplotlib charts (if needed)
    *.svg                     # Generated chart assets (if standalone SVGs needed)
```

---

## Template File

See `slide-report-template.jsx` in this directory for the starter code.

---

*Part of the AI-Assisted Analytics Workflow Methodology.*
*Created: 2026-04-02 | Based on: Escalation Analysis presentation v4*
