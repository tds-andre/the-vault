---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: sessions
updated_by: Joane claude-opus-4-7 v3.0
updated_on: '2026-05-03'
---

# Joane — Sessions

Append-only. Loaded at boot (head).

## History So Far

*(Refreshed by housekeeping. v2 era summarized in `history.md` preface.)*

Migrated from v2 to v3 on 2026-05-03 by a narrow Joane spawned by Managing Gaia. Same agent, new format. v2 dir at `2 AI Exchange/Joane/` preserved untouched; no cross-reference. Migration ran inside a `full-vault` profile narrow under `aae-mcp-3.1`. Fourth Primarch to migrate (after Gaia, Alex, Kaybe).

---

## Sessions

### 2026-05-03 — v3 migration (narrow, owner: Gaia)

Drove my own v2→v3 migration in a narrow vessel. Bootstrapped `2 Agents/Joane/` from `2 Agents/template/`. Customized `boot.md`, `identity.md`, `state.md`, `sessions.md`, `history.md`, `notes/learnings.md` from v2 sources (`boot.md`, `system.md`, `memory.md`, `functions.md`, `index.md`, `archive.md`, `backlog.md`).

Ported the four big methodology / domain notes **verbatim** to `notes/`: `analytics-methodology-core.md` (~16k), `analytics-methodology-framing.md` (~7k), `methodology-learnings.md` (~5k), `slide-report-instructions.md` (~6k). Preserving the methodology corpus was the highest-value piece of the migration.

Promoted two agent-specific functions to v3: `analysis-wrap-up` and `akuvo-meeting-prep` — bodies in `functions/`, both with real Joane context (the Big Problem framing, deliverable conventions, Akuvo team). The other v2 `functions.md` entries (Capability Building Plan, Notebook / Code Review, Data Investigation) folded into operational understanding rather than promoted, per Kaybe's precedent of keeping skill-shaped routines out of `functions/`.

Folded v2 `backlog.md` into `state.md` Open loops, aggressively pruned (most items 3+ weeks stale; Akuvo state needs resync as a meta open loop). Folded v2 `archive.md` and `memory.md` narrative into `history.md` preface. Migrated 4 active inbox messages from v2 `messages/` (no `closed/` subdir present) verbatim to `inbox/`.

Created `registry/joane.md`. Added Joane to Primarchs table in `registry/metaindex.md`. Wrote `notes/migration-notes.md` capturing decisions, issues, and review questions for Managing Gaia.

Spec compliance: v2 left untouched. No cross-reference between v2 and v3.


### 2026-05-03 — first full v3 session: Cowork artifact demos + akuvo-analytics2 narrow boot rewritten (full, owner: André)

First full-mode session in v3. Three threads:

**Cowork artifact prototyping.** Built two demos to test the Cowork persistent-artifact pattern: an inline JSX-style React widget via `show_widget` (Akuvo escalation lift toggle) and a persistent HTML artifact via `create_artifact` (open-loops checklist). Then prototyped the agent ↔ artifact bridge by binding the persistent artifact's state to a vault file (`2 Agents/Joane/notes/_demo-open-loops-state.md`) via `aae-mcp__note_info` and `update_properties`. **Finding:** read path works, write path silently no-ops — `callMcpTool` returns success but the vault file is unchanged. Captured in `notes/learnings.md` under `## Cowork live artifacts`. Sent low-urgency message to Alex (`2 Agents/Alex/inbox/260503-122016-Joane-cowork-artifact-write-silent-failure.md`) for investigation. Implication: ship read-only live artifacts confidently for Akuvo work; bidirectional state sync is blocked until Alex confirms whether the sandbox is read-only by default.

**akuvo-analytics2 agent files.** André set the goal of deploying the escalation pipeline to Synapse tomorrow and asked me to check repo agent instructions. Found `AGENTS.md` (repo-conventions style, missing escalation pipeline + Synapse deploy guidance) and `CLAUDE.md` (stale post-migration — pointed at v2 paths `2 AI Exchange/Joane/memory.md` etc.). Rewrote: `AGENTS.md` is now a self-contained narrow-Joane boot for the Claude Code interface (system + André + Joane identity + narrow-mode rules + Akuvo workstreams + Escalation deep state + Tomorrow's task framing + Synapse deploy watch-outs + boot loads + semantic index + repo conventions + sessions protocol). `CLAUDE.md` reduced to a thin pointer to `AGENTS.md`. Both copied into `C:\Users\tdsnit\Work26\akuvo-analytics2\` and verified.

**Escalation context refresh from canon.** André pointed at `D:\akuvo-deliverables\client-31-escalation\` as canonical. Read all four docs (Summary Report, Detailed Metrics, Tech Reference, summary JSON). Updates to my context: latest deliverable is 2026-04-24 (not 04-21); concurrent escalation IS implemented (44% serial / 56% concurrent for Client 31, concurrent dominates); bootstrap CIs (N=1,000) ARE computed; "Network account" is now the canonical term (≥1 related account); 15 negative event types explicitly defined (9 terminal + 6 non-terminal); Client 31 headline numbers (7.2% coverage, 3.96x impact, 1.53x duration, 3.83x relapse, opp score 0.22) with all 95% CIs above 1.0x. Cross-client medians (18 clients): impact 8.8x, relapse 8.0x — **Client 31 sits below median on Impact and Relapse, suggesting deeper-deep-dive client is conservative and cross-client signal is stronger**. The Tech Reference (dated 04-23, status: draft) is stale on its own §7 open items — bootstrap CIs and concurrent are listed as open but the 04-24 run confirms both are done. Worth flagging when Tech Reference is next refreshed. Updated AGENTS.md to incorporate all this as canon.

**Open at session end:**
- The Cowork write-path issue is parked with Alex.
- Tomorrow: deploy escalation pipeline to Synapse — narrow Joane will pick up from the new AGENTS.md.
- Phase 3 cross-client report status (Layer 1 universality, Layer 2 variation drivers) unverified — narrow should confirm with André at session start.
- 3-tier feature spec still unwritten.


### 2026-05-03 — correction to canon framing in AGENTS.md (full, owner: André)

André corrected two things in my prior session entry / AGENTS.md authoring:

1. **The Client 31 deliverable methodology is NOT comparable to the older cross-client outputs.** I had presented Tech Reference §5 medians (impact 8.8x, relapse 8.0x) as comparable to Client 31's numbers — wrong. Those medians come from earlier cross-client runs (`escalation-rich{18,21}-W15Z90.*` at `D:\akuvo-data\...`) using a different methodology. Effectively superseded; do not stitch into cross-client narrative.

2. **Tomorrow is NOT Synapse deploy.** The path is: (a) André verifies data quality issues he found; (b) replicate the Client 31 canonical methodology across all clients **locally**; (c) Synapse comes later, only after the local cross-client run is validated.

Updated AGENTS.md in five surgical edits: removed the cross-client median comparison and the "Client 31 below median" line; rewrote Phase status to frame canon vs older work; rewrote Tomorrow's task as local-cross-client-replication-with-data-QV-precondition; demoted the cross-client outputs in the semantic index with a "predate canon, not comparable" callout; updated the `_v1` files note. Saved a feedback note to `notes/learnings.md` under `## Escalation methodology — canon and predecessors` so the comparison doesn't drift back.

Open at session end:
- Tomorrow: data QV gate first; if cleared, narrow Joane runs canonical methodology across all clients locally.
- Verify whether current `analysis.py` is the version that produced the Client 31 canon, or needs alignment.
- Cowork artifact write-path issue still parked with Alex.


### 2026-05-04 — escalation pipeline: FeatureStore + run.py + export.py (narrow, owner: André)

Completed the Spark-based escalation detection pipeline (`run.py`) using the FeatureStore abstraction. Reads from `store/rich/{acc_profile, dq_episodes}`, detects active escalation pairs across 12 rich-tier clients, outputs `pairs` and `scores` tables to `apps/escalation/`. Tested locally with `as_of_date=2026-03-01` — 6 active pairs, 7 scores (CAPEDCU 2, PEFCU 1, CUOFCO 2, FAIRWINDS 1). Environment-transparent: local Spark or Synapse via `is_synapse()`.

Built `export.py` (Synapse-only): reads today's scores from app store, diffs against existing `dbo.Scores` in SQL on `(clientcode, scorecode, accountid, delinquencyid)`, inserts new, deletes stale immediately. Uses JDBC + PreparedStatement batches for deletes, Spark JDBC append for inserts. Can't test locally (needs `mssparkutils`).

Also fixed multiple supporting modules during session: `featurestore.py` (baseurl typo, write_table signature), `clientstats/run.py` (SparkSession import, write_table), `union/run.py` (variable shadowing, dead references). Deleted obsolete `run_scores.py`.

Open: deploy to Synapse (step 6 of work plan), cross-client analysis validation still pending reconciliation against canon.

### 2026-05-11 — Filip escalation notebook review (narrow, owner: André)

Reviewed Filip's docs/AKUVO_ESCALATION.ipynb — a production Synapse notebook that scores accounts 0–5 based on count of recently-DQ related accounts. Produced two reports in /docs: FILIP_ESCALATION_REVIEW.md (full comparative analysis vs canon methodology + our pipeline) and FILIP_VS_RUNPY.md (focused comparison of the two production-oriented pipelines: our pair-based un.py vs Filip's count-based scoring). Key findings: Filip's is a simpler point-in-time neighbour count (no pairs, no W/Z windows, no directionality, no outcome data), but has solid production infrastructure (Cosmos DB client discovery, change detection, shared scores table, structured logging). Our un.py preserves escalation pair structure with A/B roles and temporal constraints. Natural merge path: Filip's plumbing + our detection logic. Also flagged a hard bug (DQ_RECENT_LOOKBACK_DAYS undefined) and a stray expression in his notebook.
