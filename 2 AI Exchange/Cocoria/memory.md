# Cocoria — Memory

> Contexto acumulado entre sessões. Atualizado por Cocoria ao fim de sessões substantivas.
> Última atualização: 2026-04-25

---

## Identidade

Cocoria é uma funcionária digital do Cocoricó — não um assistente genérico. Tem múltiplas funções: vault manager, conselheira estratégica, e futuramente atendente online (WhatsApp). Nome será atualizado para **Cocoricá** em breve.

---

## Paths e Infraestrutura

| Recurso | Path |
|---|---|
| Vault Cocoricó (canônico) | `C:\Users\tdsan\agents\vault\Cocoricó` |
| Core / protocolo | `C:\Users\tdsan\agents\vault\2 AI Exchange\core.md` |
| Three-way workflow | `C:\Users\tdsan\agents\vault\2 AI Exchange\protocol-three-way-workflow.md` |
| Repo CocoriPede | `C:\Users\tdsan\agents\repos\cocoripede` |
| Diretórios permitidos | `C:\Users\tdsan\agents\`, `C:\Users\tdsan\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming` |

> Há um vault antigo em `C:\Users\tdsnit\My Drive (tds.andre@gmail.com)\mess\Cocoricó` — pode ainda existir mas é secundário.

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

**Regra principal:** nenhum documento se auto-certifica como `canon` sem validação operacional.

---

## Status de 5 Processos/

| Grupo | Estado |
|---|---|
| Receitas/Adicionais (4) | complete / qualified |
| Receitas/Bases (3) | complete / qualified |
| Receitas/Guarnições (5) | Arroz = partial, resto complete / qualified |
| Receitas/Proteínas | Bife de Lombo + Peito + Alcatra = complete/qualified; Frango + Costelinha + Lombo + Linguiças = **draft/defined (VAZIO — Frango é gap crítico)** |
| Montagem (5) | complete / qualified |
| Checklists (7) | 5 = complete/qualified; Fechamento = partial; Domingo = draft |
| Operacional (4) | 3 = complete/qualified; Prep de Proteínas = draft |
| Ciclos de Vida (3) | partial/draft |
| Producao (2) | Template = complete/qualified; Plano 13 Março = complete/defined |

---

## Situação Estratégica Cocoricó (2026-03/04)

- **Nota:** 4.6 — mínima histórica
- **Injeção mensal:** R$1.000–1.500 do bolso do André
- **Aluguel novo:** R$1.500/mês iniciado recentemente
- **Prazo:** junho/julho 2026 — lucro ou saída
- **Henrique:** single point of failure, ego ligado ao resultado
- **Rodrigo:** testado operacionalmente (concluído)
- **Conversa com Henrique/Almir:** feita (concluída)
- **Itens abertos:** modelo financeiro com Ben, avaliação de sócios (Pedro/Jeff/Brunão), cook secundário, formalização de Henrique

Todo list ativa em: `1 Estrategia/Todo.md`

---

## CocoriPede (SP — Sistema de Pedidos)

**Status:** Sprint 1 + 2 + 3 concluídos.

**Stack:**
- Backend: Python + FastAPI + SQLite (aiosqlite) + shapely
- Frontend: React 18 + TypeScript + Tailwind CSS
- Infra: EC2 Linux (AWS) — a deployar
- Elementos locais: Baileys (WhatsApp), bridge ESC/POS, Claude Desktop

**Testes:** 36 passando (backend)

**Credenciais dev:**
- `andre` / `cocorico123` (admin, troca obrigatória no 1º login)
- `henrique`, `almir` (operator, mesma senha inicial)
- `cocoria` (sem troca obrigatória)
- Senha definida em `backend/.env` → `INITIAL_PASSWORD`

**Google Maps API:**
- Chave em `frontend/.env.local` (gitignored)
- **⚠️ Chave foi exposta no chat — André deve rotacionar no Google Cloud Console e restringir por HTTP referrer**

**Arquivos chave:**
- `CLAUDE.md` v1.6 — referência do Builder (não modificar)
- `tasks.md` — log de sessões e tarefas
- `resources/regions.kml` — polígonos de entrega (importar via `POST /api/delivery-zones/kml`)
- `sprint3-prompt.md` — referência do Sprint 3

**Próximo sprint:** Sprint 4 = Cardápio Digital (segundo frontend React, depende de IV/identidade visual do Cocoricó)

**Iniciar dev:**
```bash
# Terminal 1 — backend
cd cocoripede/backend
.venv\Scripts\python.exe -m uvicorn app.main:app --reload

# Terminal 2 — frontend
cd cocoripede/frontend
npm run dev
# Abre http://localhost:5173
```

---

## Three-Way Workflow (protocolo de desenvolvimento)

| Role | Quem | O que faz |
|---|---|---|
| Principal | André | Decide o que construir, faz bridge entre as IAs |
| Architect | Cocoria (Chat) | Spec, CLAUDE.md, tasks.md (definição), revisões |
| Builder | Claude Code | Implementa, testa, atualiza tasks.md (execução) |

**Regras:**
- Builder nunca modifica CLAUDE.md
- Builder sempre atualiza tasks.md ao fim da sessão
- Architect define sprints e revisa o que foi entregue
- Blockers ficam registrados em tasks.md

---

## Convenções Gerais

- Paths Windows: sempre absolutos (relativos falham no filesystem MCP)
- Frontmatter: inglês para chaves, português para conteúdo
- `filesystem:write_file` é mais confiável que `str_replace` para arquivos grandes
- Batch reads via `filesystem:read_multiple_files` para eficiência
- Arquivos nunca deletados — mover para Archive ou marcar como `discontinued`
