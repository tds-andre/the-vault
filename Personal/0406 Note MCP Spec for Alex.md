---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: 2026-04-06
updated_by:
updated_on:
type: task-prompt
---

# Note MCP — Spec for Alex

## Context

We're building a new agent architecture (v2.0) and one of the key improvements is a dedicated MCP server for structured note operations. Currently agents use `filesystem:write_file` and `filesystem:edit_file` for everything — it works but is clunky for structured markdown notes because it requires reading full files and doing string surgery to find sections.

## Goal

A `note-mcp` Python MCP server that understands markdown structure (frontmatter + sections + footnotes) and exposes clean operations for agents to use.

## Note Format

Agent-created notes will follow this structure:

```markdown
---
created_by: [Agent Name] [Model] [Agent Version]
created_on: YYYY-MM-DD
updated_by: [Agent Name] [Model] [Agent Version]
updated_on: YYYY-MM-DD
type: [free-form string]
---

[body content with ## sections]

---
*[contextual footnote — agent/system metadata, not content]*
```

## Full API Spec

### Single note operations

```python
create_note(path, by, type, contents)
# Creates file with frontmatter auto-populated (created_by=by, created_on=today, type=type)
# contents = body text (no frontmatter)

append_note(path, by, contents, section=None)
# Appends to end of file, or to end of specific ## section if section provided
# Auto-updates updated_by and updated_on in frontmatter

prepend_note(path, by, contents, section=None)
# Prepends after frontmatter (or after section header) if section provided
# Auto-updates updated_by and updated_on

read_section(path, section)
# Returns content of a specific ## section (excluding the header line itself)

read_sections(path, sections[])
# Returns dict of {section_name: content} for multiple sections

read_footnote(path)
# Returns the footnote block (after the final --- separator)

update_footnote(path, contents)
# Replaces the footnote block. Creates --- separator if not present.

update_properties(path, new_properties{})
# Merges new_properties into existing frontmatter
# Does not touch other properties
# Auto-updates updated_by and updated_on if "by" is passed as a property

info(path)
# Returns: frontmatter dict + list of ## sections + word count + last modified
# Supersedes get_note_structure
```

### Bulk operations

```python
read_notes(paths[], sections[]=None, filter=None)
# Reads multiple files
# sections: if provided, returns only those sections per file (not full content)
# filter: dict of frontmatter key/value pairs to filter by
#         e.g. filter={"status": "prioritized"} — only returns matching files
# Returns: list of {path, frontmatter, sections or full_content}

read_folder(path, filter=None, sections[]=None)
# Reads all .md files in a directory
# filter: same as read_notes — frontmatter key/value filter
# sections: optional section subset to return
# Returns: same structure as read_notes
```

## Implementation Notes

- Python, use `python-frontmatter` library for YAML parsing
- Section detection: `##` headers (H2 only for now, can extend later)
- Footnote detection: content after the last `---` separator in the file
- `by` parameter format: `"AgentName model-name vX.Y"` — stored as-is in frontmatter
- `filter` parameter: exact match on frontmatter values for now (no regex/range)
- Error handling: raise descriptive errors for missing sections, malformed frontmatter, missing files
- Register in `claude_desktop_config.json` and `~/.claude/settings.json`

## Future (don't build now)

```python
build_index(path)
# Walks directory, writes .note-index.json with all frontmatter
# For fast future queries when vault hits ~500+ notes
```

## Priority

Medium-high. This unblocks cleaner agent note operations in the v2.0 architecture. Not blocking the current test agent work but needed before rolling out v2.0 to all production agents.

---
*Prompt written by Gaia for Alex. Carry to Alex session.*
