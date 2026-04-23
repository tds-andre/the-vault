---
writing_stage: complete
identification_stage: defined
type: strategy
owner: André
revised: 2026-04-23
---

# Sistema de Atendimento Cocoricó — Especificação Funcional v1.1

> Derivado da sessão de elicitação com Cocoria em 2026-04-23.
> Base para desenvolvimento com Claude Code.

---

## 1. Visão Geral

Sistema próprio para substituir o AnotaAí, composto de três subsistemas integrados. O sistema é operado por **Cocoria** — uma funcionária digital com múltiplas funções, uma das quais é atendimento online — e pela equipe local, que interagem como colegas de trabalho.

**Stack:** Python (backend) + React (frontend)
**Infraestrutura:** Cloud (VPS) com elementos locais — Claude Desktop e WhatsApp (Baileys) rodam na máquina local da loja

---

## 2. Arquitetura de Alto Nível

```
[Cliente]
    ↕ WhatsApp (Baileys — local)
    ↕ Cardápio Digital (React — cloud)
    ↕ iFood (webhook — cloud)

[Equipe Local]
    ↕ Balcão / SGP frontend (React — cloud, acessado localmente)
    ↕ Claude Desktop (local) → Cocoria

[Cocoria]
    ↕ WhatsApp via Baileys (local)
    ↕ SGP API (cloud)
    ↕ Chat com equipe via Claude Desktop (local)

[SGP — backend Python, cloud]
    ↕ Banco de dados (cloud)
    ↕ Impressora de comanda (local, via bridge)
```

**Elementos locais (máquina da loja):**
- Baileys (bridge WhatsApp ↔ SGP)
- Claude Desktop (interface Cocoria ↔ equipe)
- Bridge para impressora de comanda (ESC/POS)

**Elementos cloud:**
- SGP backend (Python/FastAPI)
- SGP frontend / Balcão (React)
- Cardápio Digital (React)
- Banco de dados

---

## 3. Subsistemas (MVP)

### 3.1 SGP — Sistema de Gestão de Pedidos
Backend central. Todos os canais alimentam o SGP via API REST.

### 3.2 Cardápio Digital (CD)
Frontend React voltado ao cliente. Canal de pedidos próprio.
Pagamento MVP: somente Pix (manual) ou na entrega. Gateway online em fase posterior.

### 3.3 WhatsApp (operado por Cocoria)
Canal de atendimento e pedidos via Baileys.
Não é um sistema separado — é Cocoria com acesso ao WhatsApp e ao SGP.
Pagamento: Pix ou na entrega (cartão/dinheiro).
*Nota: avaliar futuramente pagamento nativo WhatsApp Pay.*

---

## 4. Canais de Entrada de Pedidos

| Canal | Quem opera | Pagamento disponível |
|---|---|---|
| WhatsApp | Cocoria (+ equipe em exceções) | Pix, cartão na entrega, dinheiro na entrega |
| Cardápio Digital | Cliente direto | Pix (MVP), gateway online (fase 2) |
| Balcão | Equipe local | Pix, cartão (Infinite Pay), dinheiro |
| iFood | Integração leitura | Gerenciado pelo iFood, repasse D+N |

---

## 5. Cocoria como Atendente

Cocoria é o atendente online da Cocoricó. Age como um atendente humano digital — lê o contexto, decide, age. Não há protocolo formal de handoff com a equipe.

### 5.1 Comportamento no WhatsApp

**Operação normal:**
- Responde mensagens, tira dúvidas, coleta pedidos, confirma pagamentos, notifica status
- Autônoma — não requer aprovação humana para fluxos rotineiros
- Disponível 24h: durante horário de operação fecha pedidos; fora do horário informa e coleta pedido agendado para próxima abertura

**Quando a equipe intervém:**
- Equipe pode digitar diretamente no WhatsApp ou avisar Cocoria via Chat
- Cocoria lê o contexto e age como qualquer atendente humano faria ao ver um colega assumindo uma conversa

### 5.2 Fluxo de Atendimento WhatsApp

**Durante horário de operação (10:30–15:00):**
```
Cliente manda mensagem
→ Cocoria cumprimenta e pergunta o que deseja
→ Cocoria apresenta cardápio ou responde dúvida
→ Cliente define pedido (itens + customizações)
→ Cocoria confirma pedido e total
→ Cocoria informa formas de pagamento
→ Cliente escolhe: Pix (envia comprovante) ou paga na entrega
→ Cocoria confirma recebimento do Pix ou registra "pagar na entrega"
→ Cocoria registra pedido no SGP via API
→ SGP imprime comanda
→ SGP notifica Cocoria quando pedido sai para entrega
→ Cocoria notifica cliente via WhatsApp
```

**Fora do horário de operação:**
```
Cliente manda mensagem
→ Cocoria informa que a loja está fechada e o próximo horário
→ Se cliente quiser, Cocoria coleta pedido antecipado
→ Pedido registrado no SGP como "agendado"
```

### 5.3 Métricas de Atendimento (capturadas por Cocoria)
- Tempo de primeira resposta
- Tempo de fechamento do pedido
- Taxa de conversão (iniciou conversa → pedido fechado)
- Reclamações e motivos
- Satisfação pós-entrega (mensagem automática após confirmação de entrega)

---

## 6. SGP — Especificação Funcional

### 6.1 Modelo de Pedido

**Campos:**
- `id` — número sequencial por dia (ex: #42)
- `canal` — WhatsApp | Cardápio Digital | Balcão | iFood
- `status` — Recebido → Em preparo → Pronto → Saiu / Retirado → Entregue
- `cliente` — nome + telefone (chave: telefone)
- `itens` — lista de itens com customizações e observações
- `modalidade` — delivery | retirada
- `endereco` — endereço + bairro (se delivery)
- `taxa_entrega` — calculada por bairro
- `motoboy` — atribuído manualmente
- `pagamento` — forma + status (pendente / confirmado)
- `timestamps` — created_at + cada transição de status

**Ciclo de status:**
```
Recebido → Em preparo → Pronto → [Saiu para entrega | Retirado] → Entregue
```
Qualquer status pode ir para `Cancelado` com motivo.

### 6.2 Interface de Fila (Balcão)
- Tela React em tempo real (WebSocket)
- Pedidos agrupados por status
- Botão de avançar status por pedido
- Exibe: número, canal, itens resumidos, modalidade, nome do cliente, tempo desde criação
- Ação de imprimir comanda manualmente (reimpressão)

### 6.3 Impressora de Comanda
- Protocolo ESC/POS (padrão para impressoras térmicas)
- Bridge local em Python que recebe webhooks do SGP cloud e envia para impressora
- Comanda contém: número do pedido, canal, itens + customizações + observações, modalidade, nome do cliente, endereço (se delivery), forma de pagamento

### 6.4 Cadastro de Clientes
- Identificado por telefone (chave primária)
- Campos: nome, telefone, endereços salvos, observações, histórico de pedidos
- Migração one-time do AnotaAí (não impacta arquitetura)

### 6.5 Cardápio
- Cadastro manual inicial (sincronização com iFood como referência)
- Itens: nome, descrição, preço, categoria, foto, disponível (boolean)
- Customizações por item: adicionais (com preço), remoções permitidas, observação livre
- Disponibilidade configurável por item (ex: item esgotado no dia)

### 6.6 Zonas de Entrega
- Tabela de bairros com taxa correspondente
- Configurável pelo admin
- Cardápio Digital e Cocoria consultam para calcular taxa ao confirmar pedido

### 6.7 Pagamentos

**Por pedido:**
- Forma: Pix | Cartão (maquininha) | Dinheiro | iFood
- Status: pendente | confirmado | estornado
- Comprovante Pix: registrado manualmente por Cocoria ou equipe

**Relatório financeiro diário:**
- Total por forma de pagamento
- Repasses iFood registrados separadamente (valor + data de crédito)
- Abertura e fechamento de caixa

### 6.8 Integração iFood
- Leitura de pedidos via API iFood (webhook preferencial)
- Pedidos iFood entram no SGP como qualquer outro pedido
- Pagamento marcado como "iFood" — acompanhamento de repasse separado

### 6.9 Relatórios
- Vendas: por dia / semana / mês, por canal, por produto
- Ticket médio por canal
- Tempo médio de preparo e de entrega
- Métricas de atendimento WhatsApp (ver 5.3)

---

## 7. Cardápio Digital — Especificação Funcional

Frontend React — cliente acessa via link/QR code.

**Fluxo:**
```
Cliente acessa CD
→ Vê cardápio com categorias e itens disponíveis
→ Monta pedido (itens + customizações)
→ Informa nome e telefone
→ Escolhe modalidade (delivery / retirada)
→ Se delivery: informa endereço → sistema exibe taxa de entrega
→ Escolhe pagamento: Pix (MVP) ou na entrega
→ Confirma pedido → recebe número e resumo
→ Pedido entra no SGP
→ Atualizações de status via WhatsApp (Cocoria)
```

---

## 8. Interação Equipe ↔ Cocoria

A equipe local interage com Cocoria via Claude Desktop. Exemplos naturais:

- "Cocoria, o cliente João já pagou o Pix, pode confirmar"
- "Estou assumindo a conversa da Maria, pode deixar"
- "O frango acabou — avisa quem perguntar no WhatsApp"
- "Qual foi o faturamento de hoje?"
- "Me manda o plano de produção de segunda"

Cocoria age com o mesmo julgamento que um atendente humano — sem comandos formais.

---

## 9. Fora do Escopo do MVP

- Dedução automática de inventário por pedido
- Gateway de pagamento online no CD (Pix manual primeiro)
- App mobile nativo
- Rastreamento de entrega em tempo real
- Sistema administrativo / financeiro completo
- Mídias sociais e conteúdo
- WhatsApp Pay (avaliar futuramente)

---

## 10. Questões Resolvidas

| Questão | Decisão |
|---|---|
| Infraestrutura | Cloud (VPS) + elementos locais (Baileys, Claude Desktop, impressora) |
| API iFood | Integração ampla disponível — usar webhook |
| Impressora | Padrão da loja — bridge ESC/POS local em Python |
| Pagamento CD MVP | Pix manual + na entrega. Gateway em fase 2 |
| Migração AnotaAí | One-time export/import — não impacta arquitetura |

---

## 11. Ordem de Desenvolvimento Sugerida

1. **SGP backend** — modelo de dados, API REST, gestão de pedidos, clientes, cardápio
2. **Bridge local** — Baileys (WhatsApp) + impressora ESC/POS
3. **Interface Balcão** — fila de pedidos em tempo real (React)
4. **Cocoria ↔ SGP** — Cocoria acessa SGP via MCP ou API para registrar e consultar pedidos
5. **Cardápio Digital** — frontend React para cliente
6. **Integração iFood** — leitura de pedidos via webhook
7. **Relatórios** — dashboards de vendas e atendimento

---

*Criado por Cocoria em 2026-04-23*
