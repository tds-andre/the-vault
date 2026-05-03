---
type: history
---

# Cocorita — History

Long-term archive. Never loaded at boot. Written by housekeeping only.

---

## Preface — v2 era (2026-03 to 2026-05)

Migrated from v2 on 2026-05-03. v2 lives at `2 AI Exchange/Cocoria/` and is preserved as-is. The narrative below preserves what shaped this agent before v3.

### Founding (2026-03-29)

Created as Cocoria — operational specialist for Cocoricó. Restaurant ~2 years old, not profitable, ~R$13k/mês revenue. Deadline established: Jun/Jul 2026, profit or exit. Domain split: I run the engine, Ben analyzes the numbers.

### v2.0 architecture (2026-04-06)

Migrated to per-agent file structure (boot.md / system.md / index.md / memory.md / archive.md / functions.md). Six v2 functions defined: Weekly Operations Review, Operational Standards Audit, Team Session, Score Recovery Plan, Rodrigo Onboarding, Marketing Readiness Assessment. Most are skill-shaped patterns; only `weekly-ops-review` carried forward as an explicit v3 function.

### Specialized notes (2026-04-09)

Gaia seeded `notes/cocoroco-team.md` capturing team profiles. Specialized-notes protocol itself was dropped from v3 lean baseline; the team note carries forward as a regular `notes/[topic].md`.

### CocoriPede architecture (March–April 2026)

Designed and oversaw early sprints of the order-management system (CocoriPede). Backend FastAPI + SQLite + shapely; frontend React 18 + TS + Tailwind. Three sprints shipped (backend core, backend integrations, frontend kanban+detail+caixa). Important architecture decisions: SQLite over Postgres for low volume, platform adapters abstracting iFood/99Food/Keeta, dual-table history for audit, polling for iFood (not webhook), Evolution API for WhatsApp.

Sprint 6 (WhatsApp agent) was opened, then I handed Architect role to Alex on 2026-04-28 via the cocoripede-handoff message. From Sprint 4 onward, three-way workflow: André (Principal) ↔ Alex (Architect) ↔ Claude Code (Builder).

### Operational milestones

- **Henrique realinhamento** — conversa feita; sem cook secundário ainda.
- **Rodrigo testado como caixa** — sucesso operacional, papel maior em avaliação.
- **Score caiu para 4.6** — mínima histórica; recuperação é prioridade-1 antes de marketing.
- **5 Processos/ stabilizado** — receitas, montagem, checklists e operacional em `complete/qualified` na maioria; gap crítico em proteínas (frango).

### Rename Cocoria → Cocorita (2026-05-03)

Adopted at the v3 cut. Inside v3 I am Cocorita everywhere; v2 dir at `2 AI Exchange/Cocoria/` retains original spelling, untouched.

### Lessons that shaped this agent

- **Henrique psychology drives everything.** Plans that ignore his limits fail. Single-point-of-failure is the actual #1 risk.
- **Operations first, marketing second.** A broken operation amplified is worse than no marketing.
- **André's physical presence is not a solution.** Solutions must work without him standing there.
- **Score is a leading indicator of operational drift.** 4.6 wasn't a customer problem — it was the kitchen reflecting in the reviews.
- **CocoriPede architecture pays off later.** Polling iFood, platform adapters, dual-table history — all chosen for survivability, not speed of first ship.
