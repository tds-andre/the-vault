# Methodology Learnings — Staging

*Patterns, anti-patterns, and refinements captured during analytical work.*
*Review periodically and integrate into `2 AI Exchange/Joane/analytics-methodology-core.md`.*

*Format: date, source context (brief), the learning, and suggested section in the methodology doc.*

---

### 2026-04-03 | Cross-client escalation, narrative structure

**Learning:** When presenting a cross-client validation story, the narrative arc should include the discovery journey: (1) raw results showing the effect generalizes, (2) anomalies/issues found along the way, (3) how they were addressed, (4) the cleaned results with a "at what cost?" framing. The "at what cost" comparison (before vs after) is powerful because it demonstrates robustness — the signal survived cleaning, not that cleaning created the signal. This is more convincing than just showing clean results.
**Section:** Scaffolding -> Wrap / communicate

---

### 2026-04-03 | Cross-client escalation, audience framing

**Learning:** High-level analytical questions for non-technical audiences should be cognitively simple, loosely defined, and headline-like. Humans hold ~7 items in working memory — the goal is to synthesize and communicate effectively, which is more important than being accurate, complete, or terminologically precise. 1-3 core questions that naturally lead to sub-questions is better than a flat list of 5-7 specific ones. Methodology comes afterwards, not upfront. The question structure should feel like a natural conversation: backward-looking ("does our finding hold?"), descriptive ("what does the landscape look like?"), forward-looking ("so what do we do about it?").
**Section:** Principles (new) or Scaffolding -> Wrap

---

### 2026-04-03 | Cross-client escalation, data quality as prologue

**Learning:** Before drawing cross-client conclusions, a data quality sanity check is essential — and the findings become part of the story, not just a footnote. Activity heterogeneity, DQ recording differences, and coverage gaps in outcome categories are not just caveats to mention; they drive decisions (client exclusions, category normalization) that should be shown as part of the analytical process. Saving the evidence as a standalone citable report (with before/after comparison) makes it reusable for future presentations.
**Section:** Scaffolding -> Orient / Clean

---

### 2026-04-02 | Escalation analysis, presentation format

**Learning:** The "Slide Report" hybrid format (dark presentation top 2/3 + light notes bottom 1/3) is an effective deliverable for analytical findings that need to be both presented live and shared asynchronously. Key principles: assertion-driven titles (the headline IS the insight), section tags as cognitive anchors, charts as primary evidence in the top section, full data tables and methodology in the notes. Each page should communicate one insight and be self-sufficient for a reader who wasn't in the room. This format should be extracted as a reusable template with instructions for any agent.
**Section:** Deliverables (new deliverable type — "Slide Report")

---

### 2026-04-02 | Escalation analysis, outcome measurement

**Learning:** Binary incidence (did it happen?) and event volume (how many times?) are complementary outcome metrics that should both be reported. The unconditional mean combines probability and volume into a single number and can show stronger separation than binary alone. The conditional mean (given >=1 event) isolates severity from probability. When the observation window is fixed (same Z for all groups), raw event counts are directly comparable without normalization.
**Section:** Principles (new) or Scaffolding -> Analyze outcomes

---

### 2026-04-02 | Escalation analysis, prod-31

**Learning:** When the human provides a reference table (e.g., "the table below is an example of what I mean"), reproduce the structure faithfully before populating it with new data. The structure *is* the specification — it encodes which comparisons matter and how they should be presented.
**Section:** Inquiry Loop → Operationalize

---

### 2026-04-02 | Escalation analysis, outcome methodology

**Learning:** When measuring outcomes across groups, first run at a single reference parameter value (e.g., one observation window) and present it as a chart. Then provide the full parameter sweep as a table below. This separates the cognitive load: the chart communicates the insight, the table provides completeness. Presenting all parameter values as the primary visualization (e.g., line chart over Z) obscures the core comparison.
**Section:** Principles (new) or Anti-patterns → Over-parameterizing comparisons

---

### 2026-04-02 | Escalation analysis, reporting

**Learning:** SVG diagrams created for inline chat rendering (using CSS variables like `var(--t)` and framework-specific classes) will not render in external tools (Obsidian, browsers, GitHub). Standalone SVGs must use inline styles with hardcoded colors. Always produce the standalone version for any SVG that will be saved as a deliverable.
**Section:** Deliverables (technical note)

---

### 2026-04-02 | Escalation analysis, metric naming

**Learning:** Define ambiguous metrics explicitly before first use in any report. "% of DQs with ≥1 negative outcome" is clear to the analyst but opaque to readers. Name the metric ("incidence rate"), define it in plain language, give a concrete example. Do this once, early in the document, and use the name consistently thereafter.
**Section:** Principles → Define metrics before counting (extend)

---

### 2026-04-02 | Escalation analysis, report generation

**Learning:** Two report prompts with distinct purposes work better than one flexible prompt. The Detailed Report (analytical process record) and Executive Report (fast-read narrative) serve different audiences and require fundamentally different structures. Trying to serve both with one document produces a mediocre compromise. The Detailed Report should follow the analytical journey chronologically (including dead ends). The Executive Report should restructure around questions and answers (eliding dead ends to the "challenged premises" section).
**Section:** Deliverables → Report generation instructions (context note)

---

<!-- New entries go above this line -->
