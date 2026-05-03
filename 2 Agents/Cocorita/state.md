---
type: state
---

# Cocorita — State

Working memory. Full mode only writes here. Single mutable surface.

## About André (this agent's view)

37yo, restaurant co-owner. The restaurant is one of three concurrent worlds (Janea/Akuvo, Key Bridge, Cocoricó) and the one with the hardest deadline. ADHD, cyclic. Time-poor. Direct. Wants the operation to run without his constant presence — that's the actual measure of success, not just the P&L.

## Current state

### Cocoricó — situação estratégica

- **Endereço:** Rua General Roca 91, Tijuca, RJ
- **Operação:** Sex / Sáb / Seg, 10:30–15:00. Segunda é o dia principal de receita.
- **Capacidade:** 80 pedidos / 4h nominal; pico 40 pedidos / 1h (11:30–12:30); 4 pessoas normal, 5 no pico
- **Demanda:** Sex 4–12, Sáb 18–24, Seg 36–60 pedidos
- **Receita:** ~R$12k/mês bruto, estável
- **Nota:** 4.6 — mínima histórica (precisa subir para 4.7+ antes de qualquer marketing)
- **Custo de operação:** R$1.000–1.500/mês injetados pelo André + R$1.500/mês de aluguel
- **CAPEX investido:** ~R$40k
- **Prazo:** junho/julho 2026 — lucro ou saída limpa

### Time

- **Henrique** — cook, butcher, heat. Single point of failure. Diligente em distress constante. Despreza padrões mas tem ego no resultado. Conversa de realinhamento feita ✅ (data exata em history). Continua sem cook secundário.
- **Almir** (pai do André) — caixa / faz-tudo. Hardliner, confiável.
- **Sofia, Anna, Camila** — irmãs, papéis rotativos (packaging, limpeza, caixa). Anna se aproximando de admin.
- **Rodrigo** (pai delas) — testado como caixa ✅. Background consultoria + blue collar + tech power user. Em avaliação para papel tático/estratégico.
- **Max** — motoboy principal. Crítico, instável. Substituível.

### Vault Cocoricó (Google Drive)

```
0 Index/          — Ontology.md (canon), Vault Index.md (entry point)
1 Estrategia/     — Internal Pitch, Todo.md (lista ativa)
2 Estrutura Organizacional/
3 Metodologia de Evolucao/
4 Cardapio/       — vazio
5 Processos/      — Receitas, Montagem, Checklists, Operacional, Ciclos de Vida, Producao
6 Random/Archive/
```

**Frontmatter schema** (em `0 Index/Ontology.md`):
- `writing_stage`: draft → partial → complete → to review → approved → discontinued
- `identification_stage`: unbound → defined → qualified → canon
- `type`: index | strategy | recipe | assembly | process | checklist | lifecycle | operational

Regra: nada se auto-certifica como `canon` sem validação operacional.

### Status `5 Processos/`

| Grupo | Estado |
|---|---|
| Receitas/Adicionais (4) | complete / qualified |
| Receitas/Bases (3) | complete / qualified |
| Receitas/Guarnições (5) | Arroz = partial; resto complete / qualified |
| Receitas/Proteínas | Bife Lombo + Peito + Alcatra = complete; **Frango + Costelinha + Lombo + Linguiças = draft/defined (gap crítico — Frango)** |
| Montagem (5) | complete / qualified |
| Checklists (7) | 5 complete; Fechamento partial; Domingo draft |
| Operacional (4) | 3 complete; Prep de Proteínas draft |
| Ciclos de Vida (3) | partial / draft |
| Producao (2) | Template complete; Plano 13 Março complete |

### CocoriPede (sistema de pedidos) — handed to Alex

Arquitetado por mim, transferido ao Alex como Architect a partir do Sprint 4 (mensagem 2026-04-28).

| Sprint | Status | Descrição |
|---|---|---|
| 1 | ✅ | Backend: modelos, auth, pedidos, clientes, WebSocket |
| 2 | ✅ | Backend: menu, customizações, couriers, zonas KML+shapely, caixa, fiado, iFood stubs |
| 3 | ✅ | Frontend React: kanban, modal, detalhe, clientes, caixa, motoboys |
| 4 | ⏳ | Cardápio Digital (público) |
| 5 | ⏳ | iFood real (polling Merchant API) |
| 6 | 🔄 | Agente Cocorita no WhatsApp (Evolution API + Python + SP API) |

Stack: Python + FastAPI + SQLite + shapely / React 18 + TS + Tailwind / EC2 (a deployar). Repo: `C:\Users\tdsnit\agents\repos\cocoripede`.

⚠️ Google Maps API key foi exposta no chat — rotacionar e restringir por HTTP referrer.

### Three-Way Workflow (delegado)

| Role | Quem |
|---|---|
| Principal | André |
| Architect | Alex (Sprint 4 em diante) |
| Builder | Claude Code |

Protocolo completo em `2 Agents/Kaybe/notes/three-way-workflow.md`.

## Open loops

### Operacional (urgente)
- **Score recovery 4.6 → 4.7+** — root cause é operacional. Sem isso, marketing está bloqueado.
- **Cook secundário** — Henrique single point of failure. Treinar substituto antes de qualquer escalada.
- **Frango protein recipes** — gap crítico em `5 Processos/Receitas/Proteínas`. Itens `draft/defined`, vazio.
- **Fechamento checklist** — `partial`. Domingo `draft`.
- **Prep de Proteínas (Operacional)** — `draft`.

### Pessoas
- **Henrique formalização** — CLT vs Associado ainda indefinido.
- **Rodrigo onboarding** — papel tático/estratégico a definir após teste como caixa.
- **Avaliação de sócios** — Pedro (food safety + investimento), Jeff (finance/sistemas/QC), Brunão (QC / management / marketing). Decisão pendente.

### Financeiro (escalado para Ben)
- **Modelo financeiro real** — P&L proper não existe. Prioridade do Ben.
- **Bonus / incentivo system** — design financeiro com Ben.
- **Decisão jun/jul** — fica com Ben + Gaia, com input meu sobre viabilidade operacional.

### CocoriPede
- **Sprint 4-6 status** — ressincronizar com Alex; última nota Architect-handoff é de 2026-04-28.
- **EC2 deploy** — pendente.
- **Bridge ESC/POS para impressora** — pendente.
- **Google Maps API key rotation** — segurança.
- **WhatsApp Evolution API** — Sprint 6, em andamento. Status atual?

### Stale (resync first session)
- Estado operacional carregado de v2 memory.md atualizado em 2026-04-29. ~4 dias de drift; pequeno mas confirmar.
- Última conversa de realinhamento com Henrique — data exata em `history.md`.
