---
created_by: Gaia claude-opus-4-6 v2.0
created_on: 2026-04-06
updated_by: Joane claude-opus-4-6 v2.0
updated_on: 2026-04-07
type: index
---

# Joane — Index
*Agent-maintained resource map. Update when new resources are created or discovered.*

---

## Home — `2 AI Exchange/Joane/`

- `boot.md` — Project Instructions (paste into Claude Project)
- `system.md` — domain identity and operating model (self-managed)
- `memory.md` — current state and session history
- `archive.md` — long-term memory (sessions 03-29 through 04-01)
- `backlog.md` — work items tracker with decisions log
- `index.md` — this file
- `functions.md` — capability registry (analysis wrap-up, meeting prep, etc.)
- `messages/` — incoming messages from other agents
- `analytics-methodology-core.md` — working methodology (Socratic Analytics)
- `analytics-methodology-framing.md` — André's framing/goals for methodology
- `methodology-learnings.md` — staging for methodology refinements (12 entries)
- `slide-report-instructions.md` — deliverable template instructions
- `slide-report-template.jsx` — slide report starter code

## Work — `Janea Akuvo/`

- `Janea Akuvo/Escalation Analysis/` — escalation feature analysis
  - `0402/` — prod-31 single-client analysis (detailed + executive reports, charts, PDF)
  - `0403/` — cross-client analysis (detailed report)
  - `cross-client-data-quality.md` — data quality report with before/after (Section 8)
  - `column-metadata-rich18-v2.csv` — 62 columns documented
  - `column-reference.md` — column reference
  - `status-overview.md` — status snapshot
- `Janea Akuvo/ROI Analysis/` — ROI / automated cure analysis
  - `0406 Automated Cure - Initial Findings.md` — initial findings report
- `Janea Akuvo/0407 Capability Building - Integrated Essay.md` — canonical reference for capability building strategy
- `Janea Akuvo/0407 Capability Building - Joane Draft Sections.md` — draft companion sections

## Shared — `2 AI Exchange/`

- `core.md` — shared agent context (loaded every session)

## Codebase — `C:\Users\tdsnit\Work26\akuvo-analytics2\`

- `_venv314` — Python 3.14 venv
- `src/akuvo/analytics/pipelines/escalation/analysis.py` — escalation pipeline core
- `src/akuvo/analytics/pipelines/escalation/run.py` — CLI runner + column metadata
- `notebooks/roi_automated_cure.py` — ROI automated cure analysis script

## Data Lake — `D:\akuvo-data\stakuvoproddatalake\`

- `analytics/cubes/rich/` — Spark-output parquet (accounts, acc_profile, dqs, activities)
- `analytics/integration/` — persistent integration layer
- `analytics/analysis/escalation/` — escalation analysis outputs
  - `cross-client/escalation-rich18-v2-W15Z90.csv` + `.json` — canonical 18-client results
  - `cross-client/escalation-rich21-W15Z90.csv` + `.json` — original 21-client results
- `analytics/analysis/roi/` — ROI analysis outputs
  - `activity-classification.csv` — 76 activity types classified
  - `cure-channels-by-dpd.csv` — cure channel by DPD band
  - `cure-channels-by-client-under30.csv` — per-client under-30d results
  - `_dqs_classified.parquet` — all DQs with cure channel labels

---
