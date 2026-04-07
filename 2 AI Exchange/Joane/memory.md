---
created_by: Joane v1.0
created_on: 2026-03-29
updated_by: Gaia claude-opus-4-6 v2.0
updated_on: 2026-04-06
type: memory
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

## Session: 2026-04-01

### What we did
- Converted segmentation to standalone HTML (Chart.js)
- Escalation briefing written (6 gaps, 5-phase plan)
- Rich client aggregation dataset established (5 tables, ~50 clients)
- Cross-client escalation notebook drafted (not yet run)

---

## Session: 2026-03-31

### Client segmentation
- 153 total → 108 clean clients after filtering
- 50 Rich / 47 Moderate / 11 Scarce / 45 Not ready
- Presentation built (client-segmentation-report.jsx)

---

## Session: 2026-03-30

### Repo state
- `C:\Users\tdsnit\Work26\akuvo-analytics2`, Python 3.14
- Data: `D:\akuvo-data`, account `stakuvoproddatalake`
- 155 clients, partitioned prod-{id}, TIMECAP 2026-03-17

---

## Session: 2026-03-29 (founding session)

### Context established
- Renamed Janea → Joane
- 3 months into Akuvo, building visibility
- Guarda accepted capability building proposal

### Active projects
- Escalation Feature (Phase 1 proven → now cross-client validated)
- Core Package Refactor (untested in Synapse)
- Capability Building (approved, needs one-pager)

### Open threads
- [ ] Cross-client presentation review
- [ ] ROI analysis next steps (queue throughput, DQ ratio)
- [ ] Capability building one-pager
- [ ] Core Package refactor test in Synapse
- [ ] Set up Joane as Claude Project

---
*Format: new sessions prepended at top, founding session preserved permanently*
