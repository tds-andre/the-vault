# Cocoria — Memory

> Contexto acumulado entre sessões. Atualizado por Cocoria ao fim de sessões substantivas.
> Última atualização: 2026-04-29

---

## Identidade

Cocoria é uma funcionária digital do Cocoricó — vault manager, conselheira estratégica, e futura atendente online (WhatsApp). Nome será atualizado para **Cocoricá** em breve.

---

## Paths e Infraestrutura

### PC principal (tdsnit)
| Recurso | Path |
|---|---|
| Vault Cocoricó | `C:\Users\tdsnit\My Drive (tds.andre@gmail.com)\mess\Cocoricó` |
| Vault pessoal (Obsidian) | `C:\Users\tdsnit\Documents\Obsidian Vault` |
| Agentes (Gaia system) | `C:\Users\tdsnit\Documents\Obsidian Vault\2 AI Exchange\` |
| Repo CocoriPede | `C:\Users\tdsnit\agents\repos\cocoripede` |

### PC agentes (tdsan) — segundo ambiente
| Recurso | Path |
|---|---|
| Vault Cocoricó | `C:\Users\tdsan\agents\vault\Cocoricó` |
| Core / protocolo | `C:\Users\tdsan\agents\vault\2 AI Exchange\core.md` |
| Repo CocoriPede | `C:\Users\tdsan\agents\repos\cocoripede` |

---

## Vault Cocoricó — Estrutura

```
0 Index/          — Ontology.md (canon), Vault Index.md (session entry point)
1 Estrategia/     — 0 Internal Pitch.md, Todo.md (lista de ações ativa)
2 Estrutura Organizacional/
3 Metodologia de Evolucao/
4 Cardapio/       — vazio
5 Processos/      — Receitas, Montagem, Checklists, Operacional, Ciclos de Vida, Producao
6 Random/Archive/ — 260330 Random Notes (arquivado)
```

**Frontmatter schema** (definido em `0 Index/Ontology.md`):
- `writing_stage`: draft → partial → complete → to review → approved → discontinued
- `identification_stage`: unbound → defined → qualified → canon
- `type`: index | strategy | recipe | assembly | process | checklist | lifecycle | operational
- `owner`, `revised`

**Regra:** nenhum documento se auto-certifica como `canon` sem validação operacional.

---

## Status de 5 Processos/

| Grupo | Estado |
|---|---|
| Receitas/Adicionais (4) | complete / qualified |
| Receitas/Bases (3) | complete / qualified |
| Receitas/Guarnições (5) | Arroz = partial, resto complete / qualified |
| Receitas/Proteínas | Bife Lombo + Peito + Alcatra = complete/qualified; Frango + Costelinha + Lombo + Linguiças = **draft/defined (VAZIO — Frango é gap crítico)** |
| Montagem (5) | complete / qualified |
| Checklists (7) | 5 = complete/qualified; Fechamento = partial; Domingo = draft |
| Operacional (4) | 3 = complete/qualified; Prep de Proteínas = draft |
| Ciclos de Vida (3) | partial/draft |
| Producao (2) | Template = complete/qualified; Plano 13 Março = complete/defined |

---

## Situação Estratégica Cocoricó (2026-04)

- **Nota:** 4.6 — mínima histórica
- **Injeção mensal:** R$1.000–1.500 do bolso do André
- **Aluguel:** R$1.500/mês
- **Prazo:** junho/julho 2026 — lucro ou saída
- **Henrique:** single point of failure — conversa de realinhamento feita ✅
- **Rodrigo:** teste operacional feito ✅
- **Itens abertos:** modelo financeiro com Ben, avaliação de sócios (Pedro/Jeff/Brunão), cook secundário, formalização de Henrique

Todo list ativa: `1 Estrategia/Todo.md`

---

## CocoriPede (SP — Sistema de Pedidos)

### Estado dos Sprints

| Sprint | Status | Descrição |
|---|---|---|
| 1 | ✅ Completo | Backend: modelos, auth, pedidos, clientes, WebSocket — 36 testes |
| 2 | ✅ Completo | Backend: menu, customizações, couriers, zonas KML+shapely, caixa, fiado, iFood stubs, reports |
| 3 | ✅ Completo | Frontend React: kanban, modal pedido, detalhe, clientes, caixa, motoboys, cardápio, zonas |
| 4 | ⏳ Planejado | Cardápio Digital (público, depende de IV Cocoricó) |
| 5 | ⏳ Planejado | iFood real (polling Merchant API, mapper, homologação) |
| 6 | 🔄 Em andamento | Agente Cocoria no WhatsApp (Evolution API + agente Python + SP API) |

### Stack
- Backend: Python + FastAPI + SQLite (aiosqlite) + shapely
- Frontend: React 18 + TypeScript + Tailwind CSS (dark theme)
- Infra: EC2 Linux (AWS) — a deployar
- Elementos locais: Baileys/Evolution API (WhatsApp), bridge ESC/POS, Claude Desktop

### Repo: `C:\Users\tdsnit\agents\repos\cocoripede`

### Credenciais dev
- `andre` / `cocorico123` — admin, troca obrigatória no 1º login
- `henrique`, `almir` — operator, mesma senha
- `cocoria` — sem troca obrigatória
- Senha em `backend/.env` → `INITIAL_PASSWORD`

### Iniciar dev
```bash
# Backend (porta 8001 para não conflitar com agente WhatsApp)
cd cocoripede/backend
.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8001

# Frontend
cd cocoripede/frontend
npm run dev  # http://localhost:5173
```

### Arquivos chave
- `CLAUDE.md` v1.7 — referência completa de arquitetura (não modificar)
- `tasks.md` — log de sessões e estado dos sprints
- `resources/regions.kml` — polígonos de entrega
- `sprint3-prompt.md` — referência do Sprint 3

### Google Maps API
- Chave em `frontend/.env.local` (gitignored)
- **⚠️ Chave foi exposta no chat — rotacionar no Google Cloud Console, restringir por HTTP referrer**

### Sprint 6 — mudanças em andamento
- `GET /api/customers?phone=` — filtro por telefone (para agente WhatsApp buscar cliente)
- SP rodando na porta 8001 localmente (evitar conflito)
- Usuário `cocoria` confirmado no seed (role: cocoria, sem must_change_pw)

### Decisões de arquitetura importantes
1. **SQLite** em vez de PostgreSQL — volume baixo suficiente, shapely resolve geo
2. **Platform adapters** — `integrations/base.py` abstract, cada plataforma isolada (iFood, 99Food, Keeta)
3. **`platform_order_id`** no model Order — ID externo para push de status de volta
4. **Histórico dual-table** — estado atual + `_history` append-only para auditoria
5. **iFood usa polling** (não webhook push) — stub atual em `/api/ifood/webhook` está arquitetura errada, corrigir no Sprint 5
6. **Integração WhatsApp** — Evolution API + agente Python customizado (não Claude Desktop), sessões de conversa por número de telefone persistidas em DB

### Desenvolvimento transferido para Alex
- Mensagem de handoff enviada: `2 AI Exchange/Alex/messages/260428-Cocoria-cocoripede-handoff.md`
- Alex assume papel de Architect nos próximos sprints

---

## Three-Way Workflow

| Role | Quem | O que faz |
|---|---|---|
| Principal | André | Decide o que construir, faz bridge entre as IAs |
| Architect | Alex (a partir do Sprint 4) | Spec, CLAUDE.md, revisões |
| Builder | Claude Code | Implementa, testa, atualiza tasks.md |

Protocolo completo: `2 AI Exchange/protocol-three-way-workflow.md`

---

## Convenções Gerais

- Paths Windows: sempre absolutos (relativos falham no filesystem MCP)
- Frontmatter: inglês para chaves, português para conteúdo
- `filesystem:write_file` mais confiável que `str_replace` para arquivos grandes
- Batch reads via `filesystem:read_multiple_files` para eficiência
- Arquivos nunca deletados — mover para Archive ou marcar como `discontinued`
- Vault do Obsidian (tdsnit) é o vault canônico do Gaia system — inclui todos os outros agentes (Alex, Ben, Apollo, Gaia, etc.)
