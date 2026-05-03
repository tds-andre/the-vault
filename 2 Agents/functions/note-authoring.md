---
type: function
awareness: MA all agents
---

# note-authoring

Invoke whenever authoring or editing a markdown note. **Strong default-fire** — don't bypass, even when the edit feels small. Consistency across notes is part of why the vault stays usable across agents and sessions.

## Scope

Markdown files in:

- `2 Agents/[Primarch]/notes/`
- `1 OFP/` (threads, weekly reviews, vision, life plan)
- `Personal/`, `Professional/`
- `Cocoricó/`, `Janea Akuvo/`, `Key Bridge/`
- `3 Subthreads/`

**Does NOT cover** system files, where stricter conventions live with the file itself: `boot.md`, `identity.md`, `state.md`, `sessions.md`, `history.md`, registry files, function bodies, specs.

## Frontmatter

Every authored note carries:

```yaml
---
created_by: <Primarch> | André
created_on: <ISO date>
updated_by: <Primarch> | André
updated_on: <ISO date>
type: <free-form>
---
```

**Frontmatter is extensible.** Add domain-specific fields as needed: `status`, `domain`, `parent`, `due`, `source`, `version`, `agent`, etc. The five fields above are the minimum.

When editing an existing note, bump `updated_by` and `updated_on`. Don't rewrite content the agent didn't author without flagging.

## Naming

Pattern depends on audience and dir:

- **Personal notes for André** (in `Personal/`, `Professional/`, etc.): `MMDD <Title>.md` — e.g., `0407 Trip Checklist.md`. Place in the relevant domain folder.
- **Briefings or dated context dumps**: `YYMMDD-<title>.md` — e.g., `260428 v3 Design Intent Briefing.md`.
- **Specialized agent notes** (in `2 Agents/[Primarch]/notes/`): descriptive lowercase-hyphenated — e.g., `analytics-methodology-core.md`.
- **Threads** (in `1 OFP/Threads/`): `<domain>-<subject-slug>.md` — e.g., `life-moto-trip-sao-paulo.md`. Domain prefixes: `life-`, `personal-`, `professional-`, `meta-`, `admin-`, etc.

If unsure, follow the convention already in the target dir.

## Conventions

- **One H1.** Either the file has an explicit `# Title` H1, or none if filename serves as title. Don't double up.
- **No orphan content above the first heading.** Frontmatter is followed by either an H1 or directly by the first section.
- **Footnote section separator.** A trailing `---` is used only AFTER body content to separate optional footnote/metadata. Never inside body content.
- **Specialized note structure** (for evergreen briefings):
  - `## Overview` — synthesized current understanding; rewritten on consolidation.
  - `## Details` — expanding body; append-only between consolidations.
  - `## Changelog` — records when consolidations happened and why.
  - `## Updates` — append-only dated entries; newest at bottom.
- **Update default = append.** New facts append a dated `## Updates` entry: `YYYY-MM-DD — [observation]`. Don't rewrite the whole note on every update.
- **Consolidate when** `## Updates` accumulates ~10 entries, or `## Overview` feels stale, or a `housekeeping` event triggers it. Steps: rewrite Overview, integrate Updates into Details, append to Changelog, clear Updates.
- **Editing other agents' notes:** generally don't reorganize aggressively without flagging. Append, don't rewrite.

## Registry side-effects

- **New note** in `2 Agents/[Primarch]/notes/`: add to `registry/[agent].md` under "My notes."
- **Renamed or moved note**: update `registry/[agent].md` in the same operation. If the note was promoted from `learnings.md` to its own file, update both.
- **Deleted note**: remove the entry.

Registry maintenance is the second most important ongoing responsibility after Offload and Refresh. Don't defer.

## Defaults

For short or unrelated learnings, **append to `notes/learnings.md`** rather than creating a new file. New file only when the topic merits its own thread (sustained pattern, evergreen briefing, methodology depth).
