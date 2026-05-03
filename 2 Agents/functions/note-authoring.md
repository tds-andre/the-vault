---
type: function
awareness: MA all agents
---

# note-authoring

Invoke whenever authoring or editing a note. **Strong default-fire** — don't bypass.

## Scope

Markdown files in `2 Agents/[Primarch]/notes/`, `1 OFP/`, `Personal/`, `Professional/`, `Cocoricó/`, `Janea Akuvo/`, `Key Bridge/`. Does **not** cover system files (`boot.md`, `identity.md`, `state.md`, `sessions.md`, `history.md`, registry, function bodies, specs).

## Frontmatter

```yaml
---
created_by: <Primarch> | André
created_on: <ISO date>
updated_by: <Primarch> | André
updated_on: <ISO date>
type: <free-form>
---
```

## Naming

- Personal: `MMDD <title>.md`
- Briefings: `YYMMDD-<title>.md`
- Specialized agent notes: descriptive lowercase-hyphenated

If unsure, follow the convention already in the target dir.

## Conventions

- One H1 (or none if filename = title).
- No orphan content above first heading.
- Footnote section separator (`---`) only AFTER body content, never inside.
- Update `notes/index.md` on create/rename.
- Editing: bump `updated_*`. Don't reorganize aggressively without flagging.

## Defaults

For short or unrelated learnings, append to `notes/learnings.md`. New file only when the topic merits its own thread.
