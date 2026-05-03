---
type: function
awareness: F
---

# agent-init

Bootstrap a new Primarch from `2 Agents/template/`.

Does **not** migrate existing v2 Primarchs — that's a manual operation.

## Inputs

- `name` — capitalized (e.g., `Ben`)
- `role` — one-line domain description

## Steps

1. Verify `2 Agents/<name>/` and `2 Agents/registry/<name-lower>.md` don't exist.
2. Copy `2 Agents/template/` → `2 Agents/<name>/`.
3. Copy `2 Agents/registry/template.md` → `2 Agents/registry/<name-lower>.md`.
4. In all copied files, replace `Template` → `<name>` and `template` → `<name-lower>`.
5. Fill identity placeholders in `2 Agents/<name>/identity.md` based on `role`.
6. Add Primarch to the list in `2 Agents/registry/metaindex.md`.
7. Tell André to configure the harness (Project Instructions = new `boot.md`).
