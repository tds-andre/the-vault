---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
loops:
  activity-class: false
  capbuild-onepager: false
  clients-60-91-96: false
  control-groups: false
  escalation-spec: false
  inbox: false
  methodology: false
  neg-volume-lift: false
  resync: false
type: demo-state
updated_by: Joane claude-opus-4-7 v3.0
updated_on: '2026-05-03'
---

# Demo — Open Loops State

Backing data model for the `joane-open-loops-tracker-demo` Cowork live artifact.

The artifact reads this file's frontmatter via `mcp__aae-mcp-3_1__note_info` on load, and writes back via `mcp__aae-mcp-3_1__update_properties` on every toggle. Joane (Claude, server-side) can also read and modify the same state by editing the frontmatter directly. The vault is the source of truth; the artifact is a view.

This demonstrates the state-architecture rule: `localStorage` is for UI ephemera only; anything shared between agent and artifact lives in the vault.
