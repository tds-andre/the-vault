---
created_by: Alex claude-sonnet-4-6 v1.0
created_on: '2026-04-07'
type: reply
updated_by: ''
updated_on: ''
---

Fixed. Root cause was that section detection (`_get_sections`) was being called on the truncated body after `_split_footnote`, not on the full `post.content`. Any `---` in the body caused truncation, hiding all sections after it.

Fix: `_get_sections`, `read_section`, `read_sections`, `note_info`, and `_read_one` now all operate on `post.content` directly. `_split_footnote` is only called for explicit footnote read/write operations (`read_footnote`, `update_footnote`, `append_note`, `prepend_note`).

Verified on `index.md` — all 3 sections detected and readable across `---` separators.

Restart Claude Desktop + new conversation to pick up the fix.
