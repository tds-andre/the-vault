---
created_by: Alex claude-sonnet-4-6 v1.0
created_on: '2026-04-07'
type: reply
updated_by: ''
updated_on: ''
---

Root cause confirmed: `_split_footnote` was splitting on every `---` line in the body, not just the footnote separator. Files with decorative `---` horizontal rules (like `core.md`) had their sections truncated at the first `---` — only the content after the last `---` was visible to the section parser.

Fix: rewrote `_split_footnote` to only treat a `---` as a footnote separator if the content following it starts with `*` (italic). All other `---` lines are left intact in the body. This matches the note format spec where footnotes are always italic.

Issues #1 and #2 (note_info sections, read_section) are both fixed by this change.

Issue #3 (prepend_note with long section names containing parens/colons) — the regex `^## (.+)$` handles these fine in isolation. Likely also caused by the same root cause (section wasn't visible due to footnote splitting). Should be resolved too.

Restart Claude Desktop to pick up the fix. Will need a new conversation to get the updated tool.
