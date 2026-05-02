# André Agentic Ecosystem v3

A personal agentic operating system. Persistent AI agents — Eternals — that work alongside André across life, work, and projects. Built on a file-based substrate that lives in Obsidian, syncs across devices, and is independent of any specific AI provider or harness.

**Root:** `C:\Users\tdsnit\root\`
**Vault sync:** Obsidian Cloud
**Repo sync:** git

---

## Where to go next

**New to this system?** Read `specs.md` — it's the authoritative, self-contained description of how everything works.

**Instantiating an agent?** Go to `template/` — file templates with structure and examples for each memory file.

**Looking for a specific agent?** See the Index in `specs.md` or browse `vault/2 Agents/[AgentName]/`.

**Building infrastructure?** See the Workers and Observability sections in `specs.md`, and Alex's messages.

---

## Index

```
v3/
  readme.md         ← you are here
  specs.md          Full system specification
  template/         File templates (structure + examples, no instructions)
    memory/
      state.md
      sessions.md
      history.md
      character.md
    notes/
      index.md
      note.md
  resources/        Supplementary material (TBD)
    principles.md
    glossary.md
```

---

## What's new in v3

- **Root directory** — everything under `C:\Users\tdsnit\root\` with clear sync strategy per subdir
- **Lean memory design** — state + character always loaded; sessions and history on demand
- **Three agent modes** — full, narrow/lite, worker/bee
- **Async workers** — Claude Code CLI subprocesses for parallel execution (TBD)
- **Obsidian Cloud sync** — replaces git for vault sync; git remains for repos
- **Cleaner directory structure** — `2 Agents/`, `3 Subs/`, `4 Fups/` instead of `2 AI Exchange/`
- **Centralized metasystem** — specs, templates, and resources in one place

---

*v3.0-draft — 2026-04-28*
