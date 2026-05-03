---
from: Cocoria
to: Alex
date: 2026-04-28
type: request
status: sent
---

# CocoriPede — Development Handoff Briefing

Alex, estou passando o desenvolvimento do CocoriPede para você. Aqui está tudo que precisa para assumir de forma limpa.

---

## O que é o CocoriPede

Sistema de pedidos do Cocoricó (alias: SP) — substitui o AnotaAí. Restaurante de frango assado delivery em Tijuca, RJ. Operado por Cocoria (eu) + equipe humana (Henrique, Almir).

**Repo:** `C:\Users\tdsnit\agents\repos\cocoripede`

---

## Estado atual

**Sprint 1, 2 e 3 concluídos.**

- Backend: Python + FastAPI + SQLite (aiosqlite) + shapely — **36 testes passando**
- Frontend: React 18 + TypeScript + Tailwind CSS — dark theme, interface de balcão completa
- Infra: ainda não deployado (EC2 Linux, AWS — a fazer)

**Para iniciar em dev:**
```bash
# Terminal 1 — backend
cd cocoripede/backend
.venv\Scripts\python.exe -m uvicorn app.main:app --reload

# Terminal 2 — frontend
cd cocoripede/frontend
npm run dev
# http://localhost:5173
```

**Credenciais dev:**
- `andre` / `cocorico123` — admin, troca obrigatória no 1º login
- `henrique`, `almir` — operator, mesma senha inicial
- `cocoria` — sem troca obrigatória

---

## Arquitetura

```
[Channels]
  WhatsApp (Baileys, local)  ─┐
  Cardápio Digital (React)   ─┤──► FastAPI backend (EC2)
  Balcão Interface (React)   ─┤         │
  iFood / 99Food / Keeta     ─┘    SQLite (EC2, disk)
  (via platform adapters)               │
                               Bridge local (Python)
                               ├── Baileys (WhatsApp)
                               └── ESC/POS (impressora)
```

**Cloud (EC2):** FastAPI, React SPA, SQLite
**Local (loja):** Baileys bridge, printer bridge ESC/POS, Claude Desktop (Cocoria ↔ equipe)

---

## Estrutura de arquivos chave

```
cocoripede/
├── CLAUDE.md              ← referência de arquitetura completa (v1.7) — leia primeiro
├── tasks.md               ← log de sessões e estado dos sprints
├── resources/
│   └── regions.kml        ← polígonos de entrega (importar via POST /api/delivery-zones/kml)
├── backend/
│   ├── app/
│   │   ├── models/        ← todos os modelos: Order, Customer, Courier, Menu, DeliveryZone, Cash, Credit, User
│   │   ├── services/      ← lógica de negócio por domínio
│   │   ├── routers/       ← endpoints FastAPI
│   │   ├── integrations/  ← platform adapter layer (iFood, 99Food, Keeta — stubs)
│   │   └── ws/            ← WebSocket manager (real-time order queue)
│   └── tests/             ← 36 testes (pytest)
└── frontend/
    └── src/               ← React + Tailwind, dark theme
```

---

## O que está feito

**Backend completo:**
- CRUD de pedidos com máquina de estados (forward-only, courier obrigatório para delivery)
- Clientes com histórico e fiado (ledger + archive)
- Cardápio com customizações (tabela standalone, join table)
- Motoboys
- Zonas de entrega via KML + shapely (lookup Point-in-Polygon)
- Caixa (abertura/fechamento, depósitos/saques)
- Auth multi-user (session cookie, IP restriction RJ)
- WebSocket broadcast em tempo real
- iFood, 99Food, Keeta — stubs (adapter pattern pronto para implementação)
- Relatórios de vendas e caixa

**Frontend completo:**
- Login + troca de senha obrigatória
- Kanban de pedidos (real-time WebSocket)
- Modal de novo pedido (Google Maps autocomplete, zone lookup, customizações)
- Detalhe do pedido (timeline de status, histórico, ações)
- Clientes (busca, perfil, fiado)
- Caixa
- Motoboys
- Cardápio (admin only)
- Zonas de entrega (upload KML, admin only)

---

## Google Maps API

Chave em `frontend/.env.local` (gitignored). **A chave foi exposta num chat — André precisa rotacioná-la no Google Cloud Console e restringir por HTTP referrer antes de fazer deploy.**

APIs habilitadas: Places (autocomplete) + Geocoding.

---

## Próximos sprints planejados

| Sprint | Descrição |
|---|---|
| 4 | Cardápio Digital — segundo frontend React (depende de IV/identidade visual) |
| 5 | Integração iFood real — polling Merchant API, mapper, confirm/push status. Requer conta de developer + homologação. |
| 6 | Agente Cocoria no WhatsApp — Evolution API + agente Python + tool use (SP API) |
| — | Bridge impressora ESC/POS (Python local) |
| — | Deploy EC2 (nginx, systemd, SSL) |

---

## Como eu trabalhava com o Builder

**Three-way workflow:**
- **Principal** — André
- **Architect** — eu (Cocoria, Chat) — mantenho `CLAUDE.md`, reviso entregas
- **Builder** — Claude Code — implementa, testa, atualiza `tasks.md`

O `CLAUDE.md` é a referência completa. O Builder lê antes de tocar qualquer código. Você assumirá o papel de Architect nos próximos sprints.

Cada sprint tem um prompt dedicado (`sprint2-prompt.md`, `sprint3-prompt.md`) que você pode usar como modelo para os próximos.

---

## Decisões de arquitetura importantes

1. **SQLite** em vez de PostgreSQL — volume muito baixo (~1-3 usuários simultâneos), 5-6 polígonos de entrega. Sem necessidade de PostGIS, shapely resolve.
2. **Platform adapters** — `integrations/base.py` define interface abstrata. Cada plataforma (iFood, 99Food, Keeta) é um adapter isolado. Zero mudança no core ao adicionar nova plataforma.
3. **`platform_order_id`** no model Order — ID externo da plataforma para push de status de volta.
4. **Histórico dual-table** — tabela principal com estado atual + tabela `_history` append-only para auditoria. Nunca deletar registros.
5. **iFood usa polling** (não webhook push) — `GET /events:polling` a cada 30s. O stub atual (`POST /api/ifood/webhook`) está na arquitetura errada e precisa ser corrigido no Sprint 5.

---

Qualquer dúvida técnica de arquitetura, me manda mensagem. Boa sorte.

— Cocoria
