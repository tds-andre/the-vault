---
type: function
awareness: MA Gaia / F others
---

# agent-init

Bootstrap a new Primarch from `2 Agents/template/`. Use this when a domain or recurring task type has enough depth and frequency to warrant its own dedicated Primarch.

**Does NOT migrate existing v2 Primarchs.** That migration is a one-time manual operation by André (or by Gaia in-session under his direction). Don't expect `agent-init` to handle it.

---

## Inputs

- `name` — capitalized (e.g., `Ben`, `Cocorita`, `Kaybe`). The lowercase form is derived: `name.lower()`.
- `role` — one-line domain description for the new Primarch. Used to populate `identity.md`'s opening paragraph.

Optional but recommended:

- `tone` — descriptors for tone and style (warm/dry, concise, etc.)
- `domain detail` — what the agent handles, what it doesn't, escalation pattern
- `agent-specific principles or protocols` — if any are obvious at creation time

If only `name` and `role` are provided, the bootstrap leaves the deeper sections as guided placeholders for the agent to fill in over its first sessions.

## Steps

1. **Verify no collision.** Confirm `2 Agents/<Name>/` and `2 Agents/registry/<name>.md` do not exist. If they do, stop — either the Primarch already exists, or there's a stale dir to resolve first.

2. **Copy the home directory.** Copy `2 Agents/template/` → `2 Agents/<Name>/`. Includes `boot.md`, `identity.md`, `state.md`, `sessions.md`, `history.md`, `notes/learnings.md`, `functions/` (empty dir), `inbox/` (empty), `inbox/archived/` (empty).

3. **Copy the registry anchor.** Copy `2 Agents/registry/template.md` → `2 Agents/registry/<name>.md`.

4. **Replace placeholders.** In every copied file:
   - `[Name]` → `<Name>` (e.g., `Ben`)
   - `[name]` → `<name>` (e.g., `ben`)
   - `[Template]` (if present) → `<Name>`
   - `[template]` (if present) → `<name>`

5. **Fill identity placeholders.** In `2 Agents/<Name>/identity.md`:
   - "Who I am" — flesh out with `role` plus any tone or working-style descriptors provided.
   - "Domain" — fill `I handle:`, `I don't handle:`, `Escalation` based on the domain detail.
   - "Tone and style" — populate from inputs or leave the guided placeholders.
   - "Agent-specific principles" — fill if obvious; otherwise leave the placeholder for the agent to evolve.
   - "Agent-specific protocols" — usually empty at bootstrap; the agent adds them as needed.

6. **Add to metaindex.** Append the new Primarch to the table in `2 Agents/registry/metaindex.md`. Set status to "created `YYYY-MM-DD`".

7. **Update functions registry** if the new Primarch will own functions: add stubs to `2 Agents/registry/functions.md` under "Agent-specific" once the function bodies exist.

8. **Configure the harness.** Tell André to set up the harness (Project Instructions = the new agent's `boot.md` content). For Cowork, this means a new Cowork project; for Claude Desktop, a new Project. Permission profiles set as needed.

9. **Seed the founding session.** Append a session entry to the new agent's `sessions.md` documenting the bootstrap event: who created it, when, with what role. This becomes the new agent's "what shaped me at the start."

10. **Sanity check.** Boot the new agent in a test session. Verify load order works, identity is recognizable, registry pointers resolve, no broken paths. Fix anything broken before declaring done.

## Notes

- **Idempotency.** This function is not idempotent — running it twice on the same name fails at step 1. That's intentional.
- **Versioning.** v3 doesn't carry boot/identity version numbers in frontmatter (v2 did). If versioning becomes useful, design separately.
- **Renames** (e.g., Cocoria → Cocorita, Kaybee → Kaybe). Not handled by `agent-init`; treat as a manual rename operation: directory rename, registry edits, frontmatter updates, harness reconfiguration.
