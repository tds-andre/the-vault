---
created_by: Alex claude-opus-4-7 v3.0
created_on: 2026-05-02
type: notes
updated_by: Alex claude-opus-4-7 v3.0
updated_on: '2026-05-03'
---

# Alex — Migration Notes (v2 → v3)

Issues and key decisions taken during the v2→v3 migration. Kept top-of-mind for review.

---

## Migrated 2026-05-02 (`full-vault` narrow spawned by Managing Gaia)

### Decisions

- **Migrated in a `full-vault` narrow under aae-mcp-3.1 — the very tool I just shipped.** Standard pattern per v3.0 design — Gaia spawns Primarch narrows for migration. Ate my own dogfood end-to-end: spawn → settings.json + .mcp.json → narrow boots → narrow drives migration with create_note + Read/Write. Permissions clean.
- **`mcp-deploy-pipeline` promoted to a dedicated Alex-specific function** at `functions/mcp-deploy-pipeline.md`. Consolidates v2 `functions.md` entries:
  - "Updating The Vault MCP" → core of the pipeline (cache-bust + version-bump).
  - "MCP Config Backup" → folded in as Step 4 of the pipeline. **No separate `mcp-config-backup.md` function.** Backup is part of every deploy, not a standalone capability.
  - "Create Symlinks" → kept as a "Symlinks helper (legacy v2)" section, with a note that the central-symlink approach failed against filesystem MCP allowlists. Useful for raw-FS bootstrap that bypasses MCP.
- **`vault-mcp.md` ported to `notes/vault-mcp.md` as historical reference.** Marked archive-pending in the note's own changelog. Companion `notes/aae-mcp.md` not seeded — write post-cutover when there's something concrete worth recording beyond what's already in `state.md` and `history.md`.
- **`db/learnings.md` content folded into `notes/learnings.md`** rather than ported as a separate file. Lessons (FastMCP stdout, `subprocess.run` blocking, Claude Desktop tool-cache, `create_subprocess_exec` ≠ shell on Windows, CC `.` → `_` permission key normalization, variadic flags eating positional args) live in v3 stub.
- **`backlog.md` → folded into `state.md` Open loops** per spec. CocoriPede backlog kept as a domain block. Cross-machine bootstrap items demoted to "deferred post-v3.0".
- **`archive.md` was empty in v2** — nothing to fold into history. The `history.md` preface tells the v2 story from `memory.md`.
- **`index.md`, `notes/index.md` not created** — dropped per v3 spec; awareness lives in `registry/alex.md`.
- **`db/` (claude_desktop_config.backup.json, README.md, symlinks-bootstrap.md, etc.) NOT migrated.** Per spec, `db/` and `backups/` stay in v2. The config backup still references the v2 path; flagged in state.md open loops to relocate post-cutover.
- **`messages/closed/` not migrated.** Active `messages/*` migrated to `inbox/`.
- **`0502 spawn-mcp-inheritance.md` (was at Alex root, not in `messages/`) treated as inbox.** Renamed `260502-Gaia-spawn-mcp-inheritance.md` to match convention. Appended a v3-style processed-block since I (Alex) shipped the fix earlier today. This is the closest thing to inbox/archived-style state in the migration.
- **Updated `registry/functions.md`** to list both Alex's `mcp-deploy-pipeline` and Gaia's `thread-review` under Agent-specific. Spec §5 calls functions.md "canonical and complete"; Gaia had only added thread-review to her own anchor in her migration. Filled the gap as a side-effect.

### Issues

- **v2 message frontmatter incompatible with v3 spec.** v2 messages use `status: read|sent|unread` plus assorted `created_by`/`created_on`/`updated_by` fields. v3 spec §9 mandates `from/to/date/subject/type/[ref]` immutable, with state encoded by inbox/ vs inbox/archived/ filesystem location. **Migrated messages preserved verbatim** — frontmatter not rewritten, no flattening. Per the migration brief: "v3 frontmatter incompatibility is acceptable for migrated messages." Future housekeeping can normalize if needed.
- **Filenames preserved on copy.** v2 uses `YYMMDD-from-subject.md`; v3 spec §9 prefers `YYMMDD-HHMMSS-from-subject.md`. v2 doesn't have seconds-resolution; kept names as-is for traceability. Includes the `20260409-...` file (8-digit date) — also kept verbatim. New v3 messages will use the seconds convention.
- **Several "active" inbox messages are actually resolved but were never moved to `closed/` in v2.** Examples: WhatsApp MCP spec (shipped 2026-04-07), env.yaml setup (env.yaml work done; install-mcp.ps1 still open), AAE tooling brief (aae-mcp shipped today), specialized notes nudge (one note seeded), spawn MCP inheritance (fixed today). **Did not unilaterally pre-archive.** Left for first full-mode boot to triage. Triage targets: ~5 likely archive, ~4 likely keep active.
- **Config backup location still points at v2** (`2 AI Exchange/Alex/db/...`). Identity.md and `mcp-deploy-pipeline.md` both reference the old path. Decision deferred to first full-mode boot post-cutover (likely move under `2 Agents/Alex/db/` or co-locate with the aae-mcp repo).
- **A pre-staged `notes/migration-notes.md` already existed** when I tried to create mine. Content described a slightly different migration approach (separate config-backup function, frontmatter-rewrite on inbox copy, filename normalization). **Overwrote with this file** documenting what I actually did. Flagging here so anyone who saw the prior version doesn't think it's authoritative.
- **Empty placeholder dirs (`protocols/`, `inbox/archived/`)** — Obsidian doesn't track empty dirs. Will materialize when first content lands; not pre-creating.

### Carry-forward open loops (also in state.md)

- **Cutover finalization** — André restarts Claude Desktop → verify `aae-mcp-3.1` shows up alongside `the-vault-2.1`. After verification: deregister `the-vault-2.1`, archive `vault-mcp` repo. v3 then standalone.
- **MCP config backup v3 home** — relocate from v2 `db/`.
- **`aae-mcp.md` specialized note** — companion to the legacy `vault-mcp.md`. Write post-cutover.
- **Inbox triage** — first full session should archive stale items aggressively.
- **CocoriPede sprints 4-6, EC2 deploy, printer ESC/POS bridge, Google Maps API key rotation** (key was exposed in chat).
- **Three-way workflow protocol review** — Kaybee asked, never delivered.
- **Async workers architecture** — Gaia's broader question; spawn tool covers one slice. Async mode + inbox routing deferred post-v3.0.
- **Cross-machine bootstrap.ps1 + install-mcp.ps1** — backlog from v2; v3 single-machine focus, but `aae-mcp/env.yaml` already structures the future refactor cheap.
- **Latent shell defect in `vault-mcp`** — won't fix, retiring; flagged in case cutover slips.



---

## Audit pass 2026-05-03 (`full-vault` narrow spawned by Managing Gaia)

Re-spawned with the same migration brief as the 2026-05-02 run. Found the migration already complete from the prior narrow. Audited every artifact rather than redo work.

### Verified

- All required files exist and are populated per spec.
- `inbox/` has 9 messages — all from v2 `messages/` root (closed/ left in v2 per spec).
- `260502-Gaia-spawn-mcp-inheritance.md` (originally `0502 spawn-mcp-inheritance.md` at v2 Alex root) was correctly renamed and given a v3 processed-block.
- v2 `2 AI Exchange/Alex/` untouched. Confirmed via folder read: same files as before, no edits.
- `registry/alex.md`, `registry/metaindex.md` Primarchs row, `registry/functions.md` agent-specific row — all in place.
- No v3 → v2 cross-references in any v3 file (other than the explicitly-allowed config-backup path pointer in identity.md / mcp-deploy-pipeline.md / registry/alex.md, which is flagged in state.md open loops to relocate post-cutover).

### No deviations from spec discovered in audit. Prior narrow's decisions stand:

- Migration ran via narrow (per v3 design).
- `mcp-deploy-pipeline` consolidates v2's three functions; backup is part of the pipeline rather than a standalone function.
- `vault-mcp.md` ported as historical reference, marked archive-pending.
- v2 inbox frontmatter preserved verbatim (incompatibility documented; future housekeeping can normalize).
- Active inbox messages NOT pre-archived; left for first full-mode boot to triage.

### Notes for next reconcile

The owning full will see two narrow appends in `sessions.md` for this migration window: the original 2026-05-02 entry (the actual work) and the 2026-05-03 audit entry (this pass). State.md was authored by the original narrow; nothing in the audit pass changes its content.
