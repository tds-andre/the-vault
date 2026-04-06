# Backlog
*Updated by Joane each session. Dates on everything so André can ask "what happened when?"*

---

## Active

- [x] Update pipeline with normalized outcome sets + DQ ≤1 filter *(done 04-03)*
- [x] Re-run 18 clients (excl 60, 91, 96) with updated pipeline *(done 04-03)*
- [x] Phase 3: cross-client analysis (universality, variation drivers, aggregate story) *(done 04-03)*
- [ ] Review cross-client presentation (13 pages, needs feedback) *(added 04-03)*
- [ ] Cross-client executive report *(added 04-03)*
- [x] Save cross-client data quality report as markdown *(done 04-03)*
- [x] Save presentation v4 jsx to vault (manual: download from Claude artifact) *(added 04-02)*
- [ ] Update detailed/executive reports with volume analysis findings *(added 04-02)*

## Backlog

- [ ] Investigate clients 60, 91, 96 DQ recording practices *(added 04-03)*
- [ ] Activity classification pipeline — static map + unmapped flagging *(added 04-03)*
- [ ] Incorporate payment data into outcome analysis *(added 04-02)*
- [ ] Product feature spec — alert triggers, audience, actions *(added 04-02)*
- [ ] Causal vs correlational investigation *(added 04-02)*
- [ ] Capability building one-pager for Guarda/leadership *(added 03-29)*
- [ ] Implement segmentation as package function *(added 03-31)*
- [ ] Investigate 12 pipeline-gap clients *(added 03-31)*
- [x] Test Core Package refactor in Synapse *(added 03-29)*
- [ ] Integrate methodology-learnings.md into core doc periodically *(added 04-02)*
- [ ] Backlog hygiene — systemic way to clean up, archive, and prune this file *(added 04-03)*

## Done

- [x] Cross-client data quality sanity check *(04-03)*
- [x] Cross-client pipeline: analysis.py + run.py *(04-03)*
- [x] 21-client run with CSV+JSON metadata *(04-03)*
- [x] 18-client normalized run with new outcome hierarchy *(04-03)*
- [x] Cross-client detailed report *(04-03)*
- [x] Cross-client presentation v1 built (13 pages) *(04-03)*
- [x] Escalation opportunity score defined and added to pipeline *(04-03)*
- [x] Backlog.md created *(04-03)*
- [x] Slide report template + instructions *(04-02)*
- [x] Presentation v4 final with volume slide *(04-02)*
- [x] Reports: detailed + executive *(04-02)*
- [x] Escalation analysis prod-31 — full end-to-end *(04-02)*
- [x] Analytics methodology core doc *(04-02)*
- [x] Methodology learning protocol — 8 learnings captured *(04-02)*
- [x] Client segmentation analysis + presentation *(03-31)*
- [x] DATA.md created *(03-30)*

## Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 04-03 | Exclude DQ ≤ 1 day going forward | Not real delinquency; distorts metrics for clients 60/91/96 |
| 04-03 | Remove clients 60, 91, 96 from cross-client | DQ quality issues (>40% DQs ≤1 day) |
| 04-03 | Drop SWBC_PAYMENT, SWBC_PORTAL_PAYMENT | Vendor-specific, only 11/21 and 5/21 |
| 04-03 | Drop EXTERNAL_SKIP_TRACE from negative | Only 8/18 after exclusions |
| 04-03 | Add CREATE_CASE_LEGAL, CREATE_CASE_FORECLOSURE to terminal | 13/18 and 11/18 coverage |
| 04-03 | Add CREATE_CASE_HARDSHIP to negative | 15/18 coverage, strong negative signal |
| 04-03 | Disregard positive outcomes going forward | Sanity check only, confusing for audience |
| 04-03 | Escalation opportunity score = (neg_vol_lift + dur_a_lift + recur_lift) * coverage | Canonical composite metric for client ranking |
| 04-03 | Renamed outcome hierarchy: Negative=umbrella (any adverse), Non-terminal=distress, Terminal=loss | Cleaner for stakeholders, tighter umbrella metric |
| 04-03 | Static activity classification map (not LLM) | André's preference — predictable, auditable |
| 04-03 | Backlog with dates on all entries | Enables temporal queries ("what did we do yesterday?") |
| 04-02 | Positive outcomes out of main narrative | Confusing for audience |
| 04-02 | Deliverables in vault: Janea Akuvo/Escalation Analysis/MMDD/ | Convention |
| 04-02 | Slide Report as default presentation format | Dark top / cream notes, assertion titles |
