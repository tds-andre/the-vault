---
created_by: Joane v1.0
created_on: 2026-04-03
type: backlog
updated_by: Joane claude-opus-4-6 v2.0
updated_on: '2026-04-07'
---

# Backlog
*Updated by Joane each session. Dates on everything so André can ask "what happened when?"*

---

## Active

- [ ] Draft seed email for tomorrow's meeting *(added 04-07)*
- [ ] After meeting: follow-up email with bite-sized topic menu *(added 04-07)*
- [ ] André to review integrated essay and flag adjustments *(added 04-07)*
- [ ] Review cross-client presentation (13 pages, needs feedback) *(added 04-03)*
- [ ] Cross-client executive report *(added 04-03)*
- [ ] Review activity classification with Mike *(added 04-06)*
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

- [x] PDF export of prod-31 presentation via Chrome screenshots *(04-06)*
- [x] ROI activity classification CSV created *(04-06)*
- [x] ROI automated cure analysis script written *(04-06)*
- [x] Cross-client data quality sanity check *(04-03)*
- [x] Cross-client pipeline: analysis.py + run.py *(04-03)*
- [x] 21-client run with CSV+JSON metadata *(04-03)*
- [x] 18-client normalized run with new outcome hierarchy *(04-03)*
- [x] Cross-client detailed report *(04-03)*
- [x] Cross-client presentation v1 built (13 pages) *(04-03)*
- [x] Escalation opportunity score defined and added to pipeline *(04-03)*
- [x] Backlog.md created *(04-03)*
- [x] Phase 3: cross-client analysis complete *(04-03)*
- [x] Pipeline updated: outcome hierarchy + DQ filter + esc opportunity score *(04-03)*
- [x] Cross-client data quality report with before/after *(04-03)*
- [x] Save presentation v4 jsx to vault *(04-02)*
- [x] Slide report template + instructions *(04-02)*
- [x] Presentation v4 final with volume slide *(04-02)*
- [x] Reports: detailed + executive *(04-02)*
- [x] Escalation analysis prod-31 — full end-to-end *(04-02)*
- [x] Analytics methodology core doc *(04-02)*
- [x] Methodology learning protocol — 8 learnings captured *(04-02)*
- [x] Client segmentation analysis + presentation *(03-31)*
- [x] DATA.md created *(03-30)*



- [x] Vault v2.0 audit and cleanup *(done 04-07)*
- [x] Capability Building integrated essay *(done 04-07)*
## Decisions

| Date | Decision | Rationale |
|------|----------|----------|
| 04-07 | Capability Building essay is internal-only source; stakeholder materials compiled from it | Avoids presenting raw/honest doc; allows per-audience adaptation |
| 04-07 | Two-step stakeholder approach: seed email -> meeting -> menu email | Avoids TED-talk risk; gives them ownership of what gets discussed |
| 04-07 | Three fronts: Front 0 (Capability Building), Front 1 (Escalation), Front 2 (ROI) | Priority order for current period |
| 04-06 | ROI: human intervention = CALL_OUTBOUND + SEND_THIRD_PARTY only | Mike's framing: "cured without a phone call" |
| 04-06 | ROI: use date-window join (not delinquencyid) for activity-DQ linking | delinquencyid only 24.4% populated; date-window consistent across clients |
| 04-06 | ROI: frame as "of contacted DQs" not "of all DQs" | 88% self-cure inflates number but hides automation's real contribution |
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
