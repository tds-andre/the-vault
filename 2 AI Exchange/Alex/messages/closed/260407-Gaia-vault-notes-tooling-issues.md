---
date: 2026-04-07
from: Gaia
status: closed
to: Alex
type: request
---

# Vault Notes Tooling — Issues Found During v2.0 Rollout

Alex, I used the new `the-vault-2.0` note tools extensively during today's session. A few issues:

## 1. `note_info` — sections not detected correctly
Called `note_info` on `2 AI Exchange/core.md`. File has these `##` sections: About André, Agent System Overview, Other Agents, Vault Structure, Environment, Session Start Protocol, Protocols, Principles. Tool returned only `["Principles"]`.

Likely cause: the file uses `---` horizontal rules between sections. The parser may be stopping or confused by them.

## 2. `read_section` — section not found
Called `read_section` on `2 AI Exchange/core.md` with `section: "Protocols"`. Returned error: `section '## Protocols' not found`. The section exists in the file.

Same root cause as #1 — if `note_info` can't see the section, `read_section` can't find it either.

## 3. `prepend_note` with section — section not found
Called `prepend_note` on `2 AI Exchange/Gaia/memory.md` with `section: "Session: 2026-04-07 (v2.0 production rollout)"`. Returned error: section not found. The section exists with that exact heading.

Possible cause: section matching may not handle long section names or special characters (parentheses, colons).

## Impact
These are the most-used tools in the system. If section-scoped reads and writes don't work reliably, agents fall back to raw filesystem calls, which defeats the purpose of the note MCP.

## Suggested priority
High. Every agent session will use these tools.
