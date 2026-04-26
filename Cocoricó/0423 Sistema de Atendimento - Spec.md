---
writing_stage: complete
identification_stage: defined
type: strategy
owner: André
revised: 2026-04-23
---

# CocoriPede (SP) — Especificação Funcional v1.2

> Sistema de Pedidos da Cocoricó.
> Alias: SP
> Substitui o AnotaAí.
> Derivado da sessão de elicitação com Cocoria em 2026-04-23.

---

## 1. Visão Geral

Sistema próprio de gestão de pedidos, composto de três subsistemas integrados. Operado por **Cocoria** (funcionária digital) e pela equipe local, que interagem como colegas de trabalho.

**Stack:**
- Backend: Python + FastAPI
- Frontend: React
- Infra: EC2 Linux (AWS)
- Design: Claude

**Elementos locais (máquina da loja):**
- Baileys — bridge WhatsApp ↔ SP
- Claude Desktop — interface Cocoria ↔ equipe
- Bridge impressora de comanda (ESC/POS, Python)

---

## 2. Arquitetura de Alto Nível

```
[Cliente]
    ↕ WhatsApp (Baileys — local)
    ↕ Cardápio Digital (React — EC2)
    ↕ iFood (webhook — EC2)

[Equipe Local]
    ↕ Interface Balcão (React — EC2, acesso local)
    ↕ Claude Desktop (local) → Cocoria

[Cocoria]
    ↕ WhatsApp via Baileys (local)
    ↕ SP API (EC2)
    ↕ Chat com equipe via Claude Desktop (local)

[SP Backend — FastAPI, EC2]
    ↕ PostgreSQL (EC2 ou RDS)
    ↕ Impressora de comanda (local, via bridge ESC/POS)
    ↕ WebSocket (fila em tempo real)
```

---

## 3. Subsistemas (MVP)

| Subsistema | Descrição |
|---|---|
| SP Backend | API FastAPI central — pedidos, clientes, cardápio, pagamentos |
| Interface Balcão | React — fila de pedidos em tempo real para equipe |
| Cardápio Digital | React — pedidos pelo cliente via link/QR |

---

## 4. Canais de Entrada de Pedidos

| Canal | Operador | Pagamento |
|---|---|---|
| WhatsApp | Cocoria | Pix, cartão/dinheiro na entrega |
| Cardápio Digital | Cliente | Pix (MVP), gateway online (fase 2) |
| Balcão | Equipe local | Pix, cartão (Infinite Pay), dinheiro |
| iFood | Integração leitura | Gerenciado pelo iFood, repasse D+N |

---

## 5. Cocoria como Atendente

Cocoria é a atendente online da Cocoricó. Age como um atendente humano digital — lê o contexto, decide, age. Sem protocolo formal de handoff.

### 5.1 Comportamento no WhatsApp

- Autônoma no fluxo normal — responde, coleta pedido, confirma pagamento, notifica status
- Disponível 24h: durante operação fecha pedidos; fora do horário coleta pedidos agendados
- Quando a equipe intervém (via WhatsApp ou Chat), age como faria um atendente humano ao ver um colega assumindo a conversa

### 5.2 Fluxo WhatsApp — Horário de Operação (10:30–15:00)

```
Mensagem recebida
→ Cumprimento + pergunta o que deseja
→ Apresenta cardápio / tira dúvidas
→ Coleta pedido (itens + customizações)
→ Confirma pedido + total + taxa de entrega (se delivery)
→ Informa formas de pagamento
→ Cliente paga: Pix (envia comprovante) ou na entrega
→ Cocoria confirma Pix ou registra "pagar na entrega"
→ Cocoria cria pedido no SP via API
→ SP imprime comanda
→ SP notifica Cocoria quando pedido sai
→ Cocoria notifica cliente
```

### 5.3 Fluxo WhatsApp — Fora do Horário

```
Mensagem recebida
→ Informa horário de fechamento e próxima abertura
→ Oferece coletar pedido antecipado
→ Se aceito: coleta pedido e registra no SP como "agendado"
```

### 5.4 Métricas de Atendimento
- Tempo de primeira resposta
- Tempo de fechamento do pedido
- Taxa de conversão (conversa → pedido)
- Reclamações e motivos
- Satisfação pós-entrega (mensagem automática)

---

## 6. SP Backend — Especificação Funcional

### 6.1 Modelo de Dados Core

**Pedido:**
```
id                  int (sequencial por dia, ex: #42)
uuid                uuid (chave interna)
canal               enum: whatsapp | cardapio_digital | balcao | ifood
status              enum: recebido | em_preparo | pronto | saiu | retirado | entregue | cancelado
cliente_id          fk → Cliente
itens               json (lista: item_id, nome, qty, customizações, obs, preço_unit)
modalidade          enum: delivery | retirada
endereco            json (logradouro, número, complemento, bairro)
taxa_entrega        decimal
motoboy             string (nome)
pagamento_forma     enum: pix | cartao | dinheiro | ifood
pagamento_status    enum: pendente | confirmado | estornado
total               decimal
notas               text
created_at          timestamp
updated_at          timestamp
timestamps_status   json (registro de cada transição de status)
```

**Cliente:**
```
id                  uuid
telefone            string (chave única — identificador primário)
nome                string
enderecos           json[]
observacoes         text
created_at          timestamp
```

**Item do Cardápio:**
```
id                  uuid
nome                string
descricao           text
preco               decimal
categoria           string
foto_url            string
disponivel          boolean
customizacoes       json (adicionais com preço, remoções permitidas)
```

**Zona de Entrega:**
```
id                  uuid
bairro              string
taxa                decimal
ativo               boolean
```

### 6.2 Endpoints Prioritários (FastAPI)

**Pedidos:**
- `POST /pedidos` — criar pedido
- `GET /pedidos` — listar pedidos ativos (com filtros de status/canal/data)
- `GET /pedidos/{id}` — detalhe do pedido
- `PATCH /pedidos/{id}/status` — avançar status
- `PATCH /pedidos/{id}/pagamento` — confirmar pagamento
- `DELETE /pedidos/{id}` — cancelar (soft delete com motivo)

**Clientes:**
- `GET /clientes/{telefone}` — buscar cliente por telefone
- `POST /clientes` — criar cliente
- `PATCH /clientes/{id}` — atualizar

**Cardápio:**
- `GET /cardapio` — listar itens disponíveis
- `POST /cardapio` — criar item
- `PATCH /cardapio/{id}` — atualizar (incluindo disponibilidade)

**Zonas de Entrega:**
- `GET /zonas` — listar zonas ativas
- `GET /zonas/{bairro}/taxa` — consultar taxa por bairro

**Relatórios:**
- `GET /relatorios/vendas` — vendas por período, canal, produto
- `GET /relatorios/caixa` — resumo financeiro do dia

### 6.3 Interface Balcão (React)

- Fila de pedidos em tempo real via WebSocket
- Pedidos agrupados por status com código de cor
- Botão de avançar status por pedido
- Exibe: número, canal (ícone), itens resumidos, modalidade, nome, tempo decorrido
- Reimpressão de comanda

### 6.4 Impressora de Comanda

- Bridge local Python: escuta webhook do SP cloud → envia ESC/POS para impressora
- Disparo automático ao criar pedido
- Conteúdo: número, canal, itens + customizações + observações, modalidade, nome, endereço (se delivery), forma de pagamento

### 6.5 Integração iFood

- Webhook de entrada de pedidos via API iFood
- Pedidos mapeados para modelo interno do SP
- Pagamento registrado como `ifood` — repasses acompanhados separadamente

### 6.6 Relatórios

- Vendas: dia / semana / mês, por canal, por produto
- Ticket médio por canal
- Tempo médio de preparo e entrega
- Métricas de atendimento WhatsApp

---

## 7. Cardápio Digital — Especificação Funcional

Frontend React — cliente acessa via link ou QR code.

**Fluxo:**
```
Acessa CD
→ Vê cardápio por categoria (só itens disponíveis)
→ Monta pedido (itens + customizações)
→ Informa nome e telefone
→ Escolhe modalidade (delivery / retirada)
→ Se delivery: informa endereço → sistema exibe taxa
→ Escolhe pagamento: Pix ou na entrega
→ Confirma → recebe número do pedido + resumo
→ Pedido entra no SP
→ Atualizações de status via WhatsApp (Cocoria)
```

---

## 8. Fora do Escopo do MVP

- Dedução automática de inventário
- Gateway de pagamento online no CD (fase 2)
- App mobile nativo
- Rastreamento de entrega em tempo real
- Sistema financeiro completo
- Mídias sociais
- WhatsApp Pay (avaliar futuramente)

---

## 9. Migração do AnotaAí

- One-time export/import da base de clientes
- Não impacta arquitetura
- Executar após SP em produção e estável

---

## 10. Ordem de Desenvolvimento

| Fase | Entregável | Dependências |
|---|---|---|
| 1 | SP Backend — modelos, API, DB | — |
| 2 | Bridge local — Baileys + impressora ESC/POS | SP Backend |
| 3 | Interface Balcão (React) | SP Backend |
| 4 | Cocoria ↔ SP (MCP ou API) | SP Backend |
| 5 | Cardápio Digital (React) | SP Backend |
| 6 | Integração iFood (webhook) | SP Backend |
| 7 | Relatórios e dashboards | Fases 1–6 |

---

*Criado por Cocoria em 2026-04-23*
