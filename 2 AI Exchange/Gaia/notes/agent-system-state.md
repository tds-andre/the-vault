---
created_by: Gaia claude-sonnet-4-6 v2.0
created_on: '2026-04-09'
type: specialized-note
updated_by: Gaia claude-sonnet-4-6 v2.0
updated_on: '2026-04-10'
---

subject: agent system state
domain: meta
agent: Gaia

## Overview
The Gaia agent system is a vault-based personal life OS with 9 specialized agents sharing a common brain (the Obsidian vault). All agents are on v2.0 architecture as of Apr 2026. The system is stable and in active use. Primary tooling: vault-mcp (git + shell), note-mcp (the-vault-2.1), filesystem MCP. Session memory is ephemeral; persistence is via vault files; git is the audit trail.

## Details

**Agents and their states (Apr 2026):**
- Gaia (v2.1) — active, primary agent, this is me
- Alex (v2.1) — active, engineering + MCP tooling; built vault-mcp, note-mcp
- Joane (v2.1) — active, Akuvo ML/Analytics; has Claude Code interface
- Ben (v2.0) — configured, no real sessions yet; next session: dollar investment discussion
- Cocoria (v2.0) — configured, occasional sessions; Cocoricó ops
- Apollo (v2.2) — configured, no real sessions yet; goals: encode André + develop methodology
- Kaybee (v2.0) — configured, occasional sessions; CBRS Studio
- Laix (v2.0) — configured, no real sessions; X In Rio
- Jax (v2.0) — configured, no real sessions yet; kickoff this week

**Architecture (v2.0):**
- Per agent: boot.md (Project Instructions), system.md (identity/domain), index.md (resource map), memory.md, archive.md, functions.md, backlog.md, notes/, messages/, messages/closed/
- Shared: core.md (protocols, principles, André context), agents.md (entry point), boot-template.md

**Key tooling:**
- vault-mcp → git operations + shell (Python shutil.move for file moves)
- the-vault-2.1 → note tools: create, append, prepend, read_section, read_folder, note_info, update_properties, move_file, delete_file, now, git, python
- filesystem MCP → read/write vault and allowed directories

**Pending infrastructure:**
- WhatsApp MCP (Baileys, outbound only) — spec sent to Alex, build after SP trip
- note-mcp index cache (build_index) — deferred to ~500 notes
- Cross-machine bootstrap script — Alex backlog

## Changelog

## Updates
2026-04-09 — initial note seeded from session memory
2026-04-10 — WhatsApp MCP shipped by Alex ✅ — tools available: send_whatsapp, get_chat_history, get_contacts, await_replies, get_inbox. Baileys service not running on first test — needs pm2 start or manual launch from C:\Users\tdsnit\Work26\agents\whatsapp-mcp\
2026-04-10 — Layla created (v1.0): relationship intelligence agent. Ingests conversations, builds person profiles in notes/, advises on social dynamics and communication strategy. 10th agent in the system.
