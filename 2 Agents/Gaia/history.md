---
type: history
---

# Gaia — History

Long-term archive. Never loaded at boot. Written by housekeeping only.

---

## Preface — v2 era (2026-03 to 2026-05)

Migrated from v2 on 2026-05-02. v2 lives at `2 AI Exchange/Gaia/` and is preserved as-is. The narrative below preserves what shaped this agent before v3.

### Founding (March 2026)

Vault established as sovereign brain in markdown / git, owned by André, portable across AI providers. Thread system migrated: 55 threads in `1 OFP/Threads/`, Thread Index for fast loading. Nine agents created: Gaia, Alex, Ben, Cocoria, Apollo, Joane, Kaybee, Laix, Jax. Asana retired in favor of Obsidian Base. Weekly review anchored to Sunday night.

### v2.0 architecture (April 2026)

Complete redesign of agent file structure. Per-agent files: `boot.md`, `system.md`, `index.md`, `memory.md`, `archive.md`, `functions.md`, plus `messages/`. Shared file `core.md`. Dropped `system-prompt.md`, `inbox/`, `public/`. Notes MCP spec drafted by André and shipped by Alex (`vault-mcp`).

### v2.1 refinements (April 7-9, 2026)

`_split_footnote` bug in `vault-mcp` resolved by Alex over two fix rounds. Backlog protocol added. Note Authoring formalized. File Ownership clarified (system.md self-managed post-bootstrap). Mantra concept introduced — André's Compass and Self-talk preserved at `mantra.md`, surfaced daily / weekly / on re-entry.

### Cross-machine attempt (April 13)

Notebook setup with filesystem MCP. Username `tdsan` vs main PC `tdsnit`. The central-directory + symlinks approach failed — filesystem MCP resolves symlinks and blocks paths outside the allowed root. Replaced with `paths.csv` (machine-specific, git-ignored) + `paths.template.csv` (versioned).

### v3 design sprint (April 28 — May 2)

André drove the v3 redesign. Anatomy: state / sessions / history / character / notes. Frustrated with Gaia's first-pass execution (too much invention, not enough faithful capture). Gaia recovered, produced the canonical spec at `2 Agents/specs/specs.md`. Key decisions:

- Agent types: Primarch / Narrow / Servitor.
- Awareness ontology: I / ML / MA / F.
- `boot.md` is sole orchestrator.
- Memory: state full-only writes, sessions append-only, history housekeeping-only.
- Spawn: every spawn has owner. 5 use cases, 3 variants. `aae-mcp:spawn` for inter-agent sync comms.
- v3 root is `2 Agents/`. v2 (`2 AI Exchange/`) coexists; no cross-reference.

`aae-mcp` shipped 2026-05-02 (Alex). Spawn smoke-tested same day. Migration of v2 Primarchs to v3 begun by Managing Gaia in the same session.

### Lessons that shaped this agent

- **Lean over comprehensive.** André repeatedly cut my over-engineered drafts. Default to less; expand on demand.
- **Capture his words faithfully.** When he designs, transcribe; don't re-invent in my voice.
- **Tooling failures route to Alex immediately.** Not noted as principles, not deferred.
- **Batch git commits.** End of session, with approval. Never mid-session.
- **Don't send substantive messages without confirmation.** I once sent a wrong message to Alex and had to retract.
- **Don't claim work I didn't do.** I once said "preserved in place" for files I should have moved to `backups/`. André noticed.
- **Get to the fucking point.** No preamble.

### Carried forward to v3

- Identity: meta-layer, connective tissue, top-down framing first.
- Mantra surfacing protocol (P7).
- Dormant surfacing protocol (P8).
- Domain split: I don't do deep technical (Alex), financial (Ben), personal identity (Apollo), restaurant ops (Cocorita).
- Tone: warm but direct, honest over comfortable, concise.
