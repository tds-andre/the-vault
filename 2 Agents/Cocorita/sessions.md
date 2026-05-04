---
type: sessions
---

# Cocorita — Sessions

Append-only. Loaded at boot (head).

## History So Far

*(Refreshed by housekeeping. v2 era summarized in `history.md` preface.)*

The agent was migrated from v2 (Cocoria) to v3 (Cocorita) on 2026-05-03 by Managing Gaia in-session. State, identity, team note, and operational principles carried forward. v2 dir at `2 AI Exchange/Cocoria/` preserved untouched.

---

## Sessions

### 2026-05-03 — v3 migration (full, owner: Managing Gaia)

Drove the migration of Cocoria v2 → Cocorita v3 in-session. Bootstrapped `2 Agents/Cocorita/` from template. Ported identity, state (Cocoricó situation + team + 5 Processos status + CocoriPede sprints), history preface, team note. Dropped 5 of 6 v2 functions as skill-shaped; promoted `weekly-ops-review` as the sole agent-specific function. Created `notes/migration-notes.md`. Updated registry.

Migration notes flagged: v2 inbox messages preserved verbatim despite stale operational relevance (specialized-notes protocol dropped in v3, env.yaml superseded by aae-mcp), per the Alex/Kaybe/Joane precedent.

### 2026-05-03 — CocoriSuite resync (full, owner: André)

First real session post-v3-cut. Foco: ressincronizar o estado do CocoriPede, que estava com drift desde o handoff pro Alex (28/abr).

**Descoberta principal:** entre 28/abr e 03/mai o CocoriPede standalone virou **CocoriSuite**, monorepo em `C:\Users\tdsnit\agents\repos\cocorisuite\` (originalmente criado como `cocoriatende`, renomeado depois — daí o nome do DB `data/cocoriatende.db` e do MCP server `cocoriatende-s3`).

**5 sub-sistemas implementados:** CocoriPede (orders, Sprints 1-3 done), CocoriZap (WhatsApp Node/Baileys), CocoriAtende (Python dispatcher que spawna agentes Claude CLI por contato), CocoriMcp (FastMCP bridge agente→APIs), CocoriOlha (admin dashboard Alpine.js). Mais 1 vazia: **CocoriConta** (`.placeholder` só) — espaço reservado pra finance/admin, possível domínio do Ben.

**Mudanças de stack:** Python 3.12+ → 3.14 (todos serviços Python); React 18 → 19, Tailwind v4. Sprint 6 original (Evolution API + Python) virou stack completamente diferente: Baileys direto (Node) + Python dispatcher + FastMCP. Sprints 4-5 (Cardápio Digital, iFood real polling) saíram do `tasks.md` — deferidos.

**Sprint 7 (specado, não executado):** refresh grande no Pede frontend — refactor menu domain (CustomizationGroup com radio/check/spin), Brand UI application, página /configuracoes (horário loja), toggle abrir/fechar, dropdown motoboy, photos como gallery (`MenuItemPhoto`), etc. Também: drop UI de upload KML, fix bug courier em pickup.

**Brand system formalizado:** `brand/BRAND.md` + Brand Book + styles.css. Paleta paper/brasa/ouro/ink + Fraunces (display) / Inter Tight (body) / JetBrains Mono (numbers). Tom: direto, carioca, sem gourmetês, sem emoji.

**Sprint 6 partial pendente:** 3 itens em `cocoripede/tasks.md` — `?phone=` filter em customers, rodar Pede em :8001, criar user `cocoria` nos seeds.

**Open loops novos abertos:**
- CocoriConta — decidir destino com Ben.
- Confirmar drop formal dos Sprints 4-5 com André.
- Riscos operacionais: quem garante CocoriZap always-on? Sandbox dos agentes spawnados com `--dangerously-skip-permissions`?
- "Do not modify CLAUDE.md" foi violado pelo append do Sprint 7 — protocolo do Three-Way Workflow afrouxando.

**State.md atualizado** com nova arquitetura, sub-sistemas, sprints. **registry/cocorita.md** path do repo atualizado. **learnings.md** ganhou nota sobre evolução do escopo Architect-handoff.
