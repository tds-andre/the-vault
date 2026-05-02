---
type: function
awareness: MA Gaia / F others
---

# agent-init

Bootstrap a new Primarch from `2 Agents/template/`.

## Scope

This function creates the file scaffolding for a **new** Primarch. It does **not** migrate existing Primarchs from v2 (`2 AI Exchange/`). The v2→v3 migration is a one-time human operation by André; do not expect this function to handle it.

## Inputs

- **`name`** — Primarch's name (e.g., `Ben`, `Apollo`). Capitalized in prose; lowercase for the registry filename.
- **`role`** — one-line description of the agent's domain (used in identity.md placeholders).

## Steps

1. **Verify name doesn't collide.** Check that `2 Agents/<name>/` does not exist and `2 Agents/registry/<name-lower>.md` does not exist. If either exists, abort.

2. **Copy the template dir to the new Primarch's home:**
   - Source: `2 Agents/template/`
   - Destination: `2 Agents/<name>/`
   - Recursive copy. All sub-dirs (`notes/`, `functions/`, `inbox/`, `inbox/archived/`, `protocols/`) come along.

3. **Copy the template registry file:**
   - Source: `2 Agents/registry/template.md`
   - Destination: `2 Agents/registry/<name-lower>.md`

4. **Replace placeholders in the new files.** In each markdown file under the new Primarch's home and in the new registry file, replace:
   - `Template` → `<name>` (capitalized)
   - `template` → `<name-lower>` (lowercase, for filenames and paths)

   Files affected (in `2 Agents/<name>/`): `boot.md`, `identity.md`, `state.md`, `sessions.md`, `history.md`, `notes/index.md`, `notes/learnings.md`. And in `2 Agents/registry/<name-lower>.md`.

5. **Fill identity placeholders.** In `2 Agents/<name>/identity.md`, replace the placeholder sections (Who I am, Domain, What I handle, etc.) with content based on the `role` input and any conversation context. Keep it short on first init — the agent will refine its identity over time.

6. **Update the Primarch list.** Add the new Primarch to the list in `2 Agents/registry/metaindex.md` under the "Primarchs" section.

7. **(Harness setup — manual.)** Inform André that the new Primarch needs a Cowork project (and/or Claude Desktop project) configured with Project Instructions = the new `boot.md`. agent-init does not configure harnesses.

## Output

Confirmation message listing:
- The new Primarch's home dir
- The new registry file
- The line added to metaindex.md
- The harness setup step still required from André

## Notes

- The template is intentionally minimal. The new Primarch will fill its `state.md`, `identity.md`, and `notes/` over time as it does work.
- If the new Primarch needs agent-specific functions, those are created later as needed and indexed in its `[agent].md` and in `registry/functions.md`.
- This function is MA for Gaia (system-level work); F for other Primarchs.
