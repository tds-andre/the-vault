---
created_by: Joane v1.0
created_on: 2026-03-29
type: memory
updated_by: Joane claude-opus-4-6 v2.0
updated_on: '2026-04-10'
---


## Session: 2026-04-08

### What we did
- **Concepts & definitions doc** — created `Janea Akuvo/Escalation Analysis/concepts-and-definitions.md` with core metrics (coverage, impact = duration + fallout + relapse), updated escalation opportunity score formula
- **One-pager infographic v4** — dark theme, scannable, with coverage/impact/consistency/opportunity score sections. Title: "Delinquency Escalation: How Actionable is it?" Placeholder client codes.
- **Data infrastructure diagram** — Data Lake → Quality Control → Analytical Data Store (integration → cubes → apps → sandbox). André has canonical version in PowerPoint.
- **QC system spec discussed** — 5-step pipeline (rules → detect → score/tier → sort → downstream + report), rule types (atomic/relational/statistical) mapped to compute patterns, autofix between steps
- **Capability building SCR framing** — Situation (cash flow → data is king) → Complications (data quality + suboptimal workflows) → Resolution (4 components: variability analysis, QC, feature store, toolkit)
- **Seed email sent** — subject "Feature Store & company", to Mike/Will, cc Guarda/Filip. Meeting set for Tuesday.
- **Firework analogy saved** to essay

### Key decisions
- Coverage = % of all DQs escalated (B-side, ~8%, "1 in 12") — not A+B union
- Duration = mean(A lift, B lift) vs intra
- Fallout = negative volume lift vs intra (TODO: add vs random to pipeline)
- Relapse = recurrence lift vs random
- Escalation opportunity score = coverage × mean(duration, fallout, relapse) — can exceed 100%
- Random baseline already conditions on ≥1 DQ — correct
- "Feature Store" as outer name for Analytical Data Store (Will's language)
- QC sits between Core/integration and Cubes (not before integration)
- Integration = staging area, minimal processing; Cubes = value-add layer

### Files created
- `Janea Akuvo/Escalation Analysis/concepts-and-definitions.md`
- `Janea Akuvo/0408 Seed Email - Productivity Variant.md`
- One-pager v4: `/mnt/user-data/outputs/escalation-one-pager-v4.jsx`

### Next immediate
- Tuesday meeting: walk through capability building framing + ideas
- After meeting: follow-up email with bite-sized topic menu
- Finalize one-pager with real client codes and recomputed scores
- André to review integrated essay

---

## Session: 2026-04-07

### What we did
- **Vault audit and cleanup** — found and fixed 10 inconsistencies from v2.0 migration (missing messages/, frontmatter gaps, stale backlog items, incomplete index, memory over 150 lines)
- **Memory pruned** — sessions 03-29 through 04-01 moved to archive.md
- **Capability Building essay** — André wrote the source essay; Joane drafted companion sections; then produced integrated version
- **LGBM Grid Search context** — André shared slides; updated evidence section with real numbers (200+ models, 6 params, only data quality moved needle)
- **Communication strategy** — two-step approach: short email → meeting → follow-up menu email

### Key decisions
- Capability Building essay is internal reference only; stakeholder materials compiled from it
- Three fronts: Front 0 (Capability Building/strategy), Front 1 (Escalation/product), Front 2 (ROI/one-off)
- Avoid strategy/vision/framework language in first stakeholder email; lead with concrete evidence
- Two-step stakeholder approach: seed → meeting → menu

### Files created
- `Janea Akuvo/0407 Capability Building - Joane Draft Sections.md`
- `Janea Akuvo/0407 Capability Building - Integrated Essay.md`

### Next immediate
- Draft short email for tomorrow's meeting
- After meeting: follow-up email with bite-sized topic menu
- André to review integrated essay

---

# Joane — Memory
*Persistent context. Most recent entries at the top.*

---

## Session: 2026-04-06

### v2.0 architecture migration
Migrated from v1.1 to v2.0 file structure by Gaia. New files: boot.md, system.md, index.md. Messaging protocol deprecated. Old files preserved but superseded.

### What we did
- **PDF export workflow**: used Claude in Chrome to inject html2canvas, screenshot 14 pages of prod-31 presentation, stitched into PDF via Pillow -> `0402/assets/escalation-report-v4.pdf` (2.0 MB)
- **Cross-client presentation v1 built** (13 pages JSX, needs review) -> `cross-client-report.jsx`
- **Standalone HTML version** partially built for sharing (React+Recharts via CDN+Babel)
- **Executive email drafted** for Will/Mike — two variants (results-focused, opportunity-focused)
- **ROI / Automated Cure Analysis** — new task inherited from Filip
  - Created activity classification CSV: 76 types classified by channel + human_intervention
  - Built `notebooks/roi_automated_cure.py` script
  - Ran analysis across all 21 Rich clients
  - Key finding: raw "91% cure without phone call" is misleading — 88% self-cure (no contact at all)
  - Better framing: **of contacted DQs under 30d, 53% resolved through automation alone**
  - 0-14d band strongest: **70% automated** among contacted DQs
  - Per-client variation huge: 0% to 96% automated (median 40%)
  - Report saved: `Janea Akuvo/ROI Analysis/0406 Automated Cure - Initial Findings.md`
  - Data saved: `analytics/analysis/roi/` (classification CSV, cure channel CSVs, classified parquet)
- **Escalation feature brainstorm** — 3 tiers: detect+alert (MVP), prioritize+route, prevent (proactive)

### Key analytical insights
- Escalation touches ~11% of all DQs (81K unique A|B out of 747K), roughly 1 in 9
- 38K DQs play both A and B roles (chain escalation is common)
- ROI framing matters enormously: same data supports "91% no call" or "53% automated" depending on denominator
- The automation story lives in the 0-14d band (70% automated among contacted) and in queue throughput, NOT in raw cure rates
- Per-client automation adoption varies wildly — some clients barely use automation at all

### Key decisions
- Escalation opportunity score = (neg_vol_lift + dur_a_lift + recur_lift) * coverage — canonical composite metric
- Outcome hierarchy renamed: Negative (umbrella) > Non-terminal + Terminal
- ROI activity classification: human intervention = CALL_OUTBOUND + SEND_THIRD_PARTY (2 types), automated = 9 types
- Date-window join (not delinquencyid) for linking activities to DQs in ROI analysis

### ROI context (from Filip's briefing)
- AI competitor claims 20x ROI; Akuvo raised Virtual Agent Collector price $0.05 -> $0.20
- Mike's specific ask: "X% of DQs under 30 days cure without a phone call"
- Three value angles: automated cure rate, queue throughput (120->180 items/day), DQ ratio before/after

### Feature brainstorm (escalation)
- Tier 1 (MVP): detect escalation event in real-time, alert collector with context
- Tier 2: re-prioritize queue using escalation signal
- Tier 3: proactive watch list — flag connected accounts BEFORE they go delinquent

### Files created/modified
- `Janea Akuvo/Escalation Analysis/0402/assets/escalation-report-v4.pdf`
- `Janea Akuvo/Escalation Analysis/0403/0403 Cross-Client Detailed Report.md`
- `Janea Akuvo/Escalation Analysis/cross-client-data-quality.md`
- `Janea Akuvo/ROI Analysis/0406 Automated Cure - Initial Findings.md`
- `analytics/analysis/roi/activity-classification.csv`
- `methodology-learnings.md` — 3 new learnings

---

## Session: 2026-04-03

### What we did
- **Presentation v4 finalized** — all feedback applied, volume slide added (14 pages total)
- **Slide Report template extracted** — instructions + template JSX saved to Joane's dir
- **Cross-client pipeline built** — analysis.py + run.py at src/akuvo/analytics/pipelines/escalation/
- **21-client initial run** — all Rich clients, all lifts positive. 133K esc pairs.
- **Outcome normalization** — added terminal/negative categories; excluded 3 problematic clients
- **18-client normalized run** — DQ <=1d filter. All lifts positive. 63.5K esc pairs. CV dropped 0.24→0.15.
- **Phase 3 framing** — 3 core questions defined
- **11 methodology learnings captured**

### Key insights
- Escalation effect universal: 21/21 (raw), 18/18 (normalized), zero exceptions
- Normalization tightened signal significantly

---

## Session: 2026-04-02

### What we did
- **Full escalation analysis on prod-31 (CAPEDCU)** — end-to-end with real data
- **Duration analysis**: A triggers 1.6x, B escalated 1.3x, combined 3.5x vs global
- **Outcome analysis**: negative outcome lift 4.0x vs intra, 10.0x vs random (Z=30d)
- **DQ recurrence on A-side**: 69-84% vs 13-23% random (5-6x lift)
- **Volume analysis**: escalation amplifies both probability AND severity (5.1x unconditional)
- **Presentation v4**: 14 pages, dark/cream hybrid, finalized
- **Two reports**: Detailed + Executive
- **Analytics methodology**: core + framing docs, 5 learnings seeded
- **Infrastructure**: vault-mcp:python works with project venv, D:\akuvo-data in MCP

### Deliverable conventions (confirmed)
- Reports + assets → vault: `Janea Akuvo/[Analysis Name]/MMDD/`
- Assets in `MMDD/assets/`
- Slide reports: dark top / cream notes, A4 portrait, DM Sans, Recharts

---
*Sessions 03-29 through 04-01 archived → see archive.md*
*Format: new sessions prepended at top.*
