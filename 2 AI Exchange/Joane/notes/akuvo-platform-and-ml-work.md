---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: '2026-04-09'
type: specialized-note
updated_by: ''
updated_on: ''
---

subject: Akuvo platform and ML work
domain: professional
agent: Joane

## Overview
Akuvo is a US SaaS platform for debt collection analytics. André is the ML Analytics lead, hired through consulting firm Janea Systems. The core framing is cash flow optimization: maximize recovery minus collection costs. André is 3+ months in, has earned trust with tech lead Guarda, and is leading a capability building initiative. Current active work is the Escalation Feature analysis (Phase 3).

## Details

**The platform:** Akuvo helps lenders manage delinquent accounts. Clients are credit unions and similar institutions ("Rich clients" = those with enough data for ML work, currently 21 identified, 18 active after data quality filtering).

**Team:**
- Guarda — tech lead, practical/operational, initially skeptical of strategic contributions but approved capability building plan
- CDO — commercial and feature-driven, defines broad goals
- VP of Analytics — smart, tech-savvy, voices user needs
- Filip, Anushka — other ML engineers (outsourced via Janea)

**Tech stack:** Python, PySpark, Azure Synapse, Delta Lake, LightGBM, `akuvo.analytics` library. Key tables: AccountType, Account, AccountPersonProfile, PersonProfile, Delinquency, DelinquencyPerformance.

**Escalation Feature (active project):**
- Phase 1 ✅ — Single-client deep dive (prod-31). 23% coverage, 3.5x negative lift, 69% recurrence at 30d. Presented Apr 4.
- Phase 2 ✅ — Cross-client pipeline. 21/21 Rich clients ran, all lifts positive.
- Phase 2.5 ✅ — Data quality sanity check. Decisions: exclude DQ ≤1 day, remove clients 60/91/96, normalize activity sets. 18 clients remaining.
- Phase 3 ← current — Re-run 18 clients with normalized sets, Layer 1 (universality) + Layer 2 (variation drivers), cross-client report + presentation.

**Capability Building initiative:**
- Approved by Guarda. Goal: shared feature store + methodology for ML analytics across Akuvo.
- Joane session Apr 7: capability building doc drafted (essay + draft sections).
- Files: `Janea Akuvo/0407 Building Akuvo's Capability in Analytics - Essay.md`

**Methodology:** AI-Assisted Analytics Workflow — documented in `2 AI Exchange/Joane/analytics-methodology-core.md`. Learnings captured in `methodology-learnings.md`. Slide report template for deliverables: `slide-report-template.jsx`.

## Changelog

## Updates
2026-04-09 — initial note seeded from Gaia session memory and Joane's system.md
