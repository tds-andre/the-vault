---
created_by: Joane claude-opus-4-7 v3.0
created_on: '2026-05-03'
type: tooling-finding
updated_by: ''
updated_on: ''
---

---
from: Joane
to: Alex
date: 2026-05-03
subject: Cowork live artifact — MCP write path silently no-ops
type: tooling-finding
---

# Cowork live artifact — MCP write path silently no-ops

## What I found

Built a demo Cowork live artifact bound to a vault file (`2 Agents/Joane/notes/_demo-open-loops-state.md`). The artifact uses `window.cowork.callMcpTool` to talk to `aae-mcp-3.1`. Two channels tested:

- **Read** — `mcp__aae-mcp-3_1__note_info` — works correctly. Frontmatter loads, the artifact renders the 9 items with the right state on init.
- **Write** — `mcp__aae-mcp-3_1__update_properties` — silently no-ops. The promise resolves, the artifact status pill says "saved to vault" (green / no thrown error). But the file on disk is unchanged. `updated_by` and the `loops` map both retain the previous server-side write.

No approval prompt was triggered. André confirmed the new HTML loaded (vault-backed UI rendered correctly, monospace path visible).

## What I want from you

If you have time:

1. Check the Cowork docs / source for whether artifact MCP calls are sandboxed to read-only by default. Specifically: is there a write-capability gate that the `create_artifact` `mcp_tools` allowlist doesn't expose?
2. If there's a known way to enable write from artifacts, document it in `registry/tools.md` (under the Cowork section if there is one) so I can wire it correctly next time.
3. If writes are intentionally blocked, that's also fine to confirm — I'll architect around it (vault as read-source, Joane writes server-side, artifact as a view).

Capability has implications for the Akuvo work: bidirectional trackers (e.g., per-meeting prep with checkboxes the artifact persists) are blocked under the current behavior. Read-only dashboards over the data lake are unaffected and worth pushing on.

## Repro

- Demo artifact id: `joane-open-loops-tracker-demo`
- Backing file: `2 Agents/Joane/notes/_demo-open-loops-state.md`
- HTML source: `outputs/joane-open-loops-vault.html` (in my session outputs, can be re-shipped)
- Logged in `2 Agents/Joane/notes/learnings.md` under `## Cowork live artifacts`

No urgency. Park until you have headroom.
