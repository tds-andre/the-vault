
Essa nota é um esboço da idéia geral; não é completa, nem final, nem prescritiva.


O Sistema de Atendimento (SA ou sistema somente) possuirá diversos componentes, entre agentes Claude, conectores MCP e sistemas convencionais, que habitarão um computador dedicado. O fluxo básico da operação é:
1. cliente manda mensagem 
2. agente Claude interage com o cliente até definir o pedido
3. o pedido é transacionado num sistema convencional
4. a cozinha monta o pedido
5. a cozinha marca o pedido como pronto
6. o entregador leva o pedido

Os elementos do sistema são:
1. Agente Claude de Atendimento (**ACA**); composto por Claude Desktop (via Chat e/ou Cowork), custom Whatsapp MCP, vault de notas/markdown, MCP para integração com Sistema de Gestão de Pedidos (SGP); importante ter métricas de atendimento (e.g., tempos, reclamações, satisfação). Tecnologias: Claude desktop, Markdown, Python
2. Sistema de Gestão de Pedidos (**SGP**): transacionamento de pedidos; integração com cardápio do iFood (cardápio canônico); conferência e atribuição de pagamentos; notificações para o ACA (e.g., pedido saiu para entrega); dedução de inventário; permitir ajustes e exceções (e.g., pagamento errado, extorno, cancelamento); backend Python + frontend React
3. Cardápio Digital (**CD**): uma espécie de segundo frontend do SGP, voltado para o Cliente
4. Sistema Administrativo: tbc
   
   
   
   
