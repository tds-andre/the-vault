# Escalation Analysis — Status Overview
*As of 2026-04-03*

---

## Phase 1: Single-client deep dive (prod-31) ✅ DONE

- Full analysis: profiling → business filter → network → coverage → duration → outcomes (binary + volume) → recurrence
- Key findings: 23% coverage, 3.5x negative lift, 69% recurrence at 30d, volume amplifies both probability and severity
- Deliverables: Detailed Report, Executive Report, 9 SVG charts, standalone framework diagram — all in vault at `Janea Akuvo/Escalation Analysis/0402/`
- Presentation: v4 final (14-page slide-report hybrid) — needs manual save from Claude artifact to vault

## Phase 2: Cross-client pipeline + validation ✅ DONE

- Pipeline: `analysis.py` (core functions) + `run.py` (runner with CLI + JSON metadata) at `src/akuvo/analytics/pipelines/escalation/`
- 21/21 Rich clients ran successfully. All lifts positive, 100% consistency.
- Results: `escalation-rich21-W15Z90.csv` + `.json` at `analytics/analysis/escalation/cross-client/`

## Phase 2.5: Cross-client data quality sanity check ✅ DONE

- Activity type universe: 76 types, only 19 universal, significant heterogeneity
- Outcome category coverage gaps identified (EXTERNAL_SKIP_TRACE 9/21, SWBC types vendor-specific)
- Negative composition varies wildly across clients (PROMISE_BROKEN ranges 17-83%)
- DQ quality flags: client 60 (72% DQs ≤1 day, median=0d), clients 91/96 (>40% ≤1 day)
- Activity classification: André confirmed normalized sets

### Decisions made for Phase 3

- Exclude DQ ≤ 1 day going forward (not retroactively in existing code)
- Remove clients 60, 91, 96 → **18 remaining clients**
- Drop SWBC_PAYMENT and SWBC_PORTAL_PAYMENT from positive; disregard positives going forward
- Proposed terminal additions: CREATE_CASE_LEGAL (13/18), CREATE_CASE_FORECLOSURE (11/18)
- Proposed negative addition: CREATE_CASE_HARDSHIP (15/18)
- Proposed negative drop: EXTERNAL_SKIP_TRACE (8/18 after exclusions)
- Future: static activity classification table/map with flagging of unmapped types

## Phase 3: Cross-client analysis ← CURRENT

- Need to: update pipeline with normalized sets + DQ ≤1 filter, re-run 18 clients
- Then: Layer 1 (universality), Layer 2 (variation drivers), cross-client report/presentation

### Caveats to carry forward (noted, not addressed yet)

1. Client 60/91/96 DQ quality — needs investigation of their DQ recording practices
2. Cross-client activity heterogeneity — needs thorough future analysis and standardization

---

## Open backlog items outside escalation

- Save presentation jsx to vault (manual download from Claude artifact)
- Update detailed/executive reports with volume analysis findings
- Capability building one-pager for Guarda/leadership
- Activity classification pipeline (static map + unmapped flagging)
- Implement segmentation as package function
- Investigate 12 pipeline-gap clients
- Test Core Package refactor in Synapse
- Methodology learnings integration

---

## Methodology & templates

- Analytics methodology core doc ✅
- Methodology learning protocol ✅ (8 learnings captured)
- Slide Report template + instructions ✅
