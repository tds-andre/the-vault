---
type: function
awareness: MA all agents
---

# note-authoring

Author or edit any note in the vault. **Strong default-fire posture:** invoke this whenever you are writing or editing a note, not opportunistically. Notes that bypass this function tend to drift from conventions.

## Scope

A "note" is any markdown file under:
- `2 Agents/[Primarch]/notes/`
- `1 OFP/`, `Personal/`, `Professional/`
- `Cocoricó/`, `Janea Akuvo/`, `Key Bridge/`
- Any other vault dir intended for human-readable knowledge

This function does **not** govern: agent system files (`boot.md`, `identity.md`, `state.md`, `sessions.md`, `history.md`, registry files), function bodies, specs.

## Frontmatter conventions

Every note has frontmatter. Minimum:

```yaml
---
created_by: <Primarch> | André
created_on: <ISO date>
updated_by: <Primarch> | André
updated_on: <ISO date>
type: <free-form: note | brief | meeting | log | reference | etc.>
---
```

Other fields as needed (tags, status, links). Don't invent if not needed.

## Naming conventions

- **Personal notes:** `MMDD <title>.md` (André's preferred convention)
- **Briefings / domain notes:** `YYMMDD-<title>.md` or descriptive title
- **Specialized agent notes (`notes/`):** descriptive name, lowercase-hyphenated (`system-evolution.md`, `mantra.md`, `learnings.md`)

If unsure, follow the convention already used in the target dir.

## Section structure

- One H1 only (the title), or none if the filename is the title.
- Use H2 / H3 for sections.
- Avoid orphan content above the first heading.
- Use horizontal rules sparingly to separate major blocks.

## Footnote rule

If using footnotes, separate the footnote section with a `---` AFTER all the body content, never inside section bodies. Decorative `---` mid-content can confuse parsers (the v2 vault-mcp had a bug here that was fixed; treat as a learned constraint).

## Index updates

Whenever you create, rename, or significantly restructure a note in `2 Agents/[Primarch]/notes/`, update `notes/index.md` in the same operation. The index is ML — a stale index degrades agent awareness.

For notes outside agent dirs (`1 OFP/`, etc.), André maintains the index manually; agents do not auto-update those.

## Editing existing notes

- Preserve frontmatter; update `updated_by` and `updated_on`.
- Don't reorganize aggressively without flagging — André may have spatial memory of the structure.
- For learnings or short observations, prefer appending to `notes/learnings.md` over creating a new file.

## When in doubt

Ask André or follow the closest existing example in the same dir.
