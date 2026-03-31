
# Proposta Power BI Campanhas Supegasbras

> André Teixeira dos Santos
> tds.andre@gmail.com
> Rio de Janeiro
> 17/04/2025

___
## Contexto

A equipe da Mescla gerencia, acompanha e executa campanhas de marketing para a, e junto a, Supergasbras. As campanhas são realizadas e monitoradas astravés de 3 canais principais: e-mail, Whatsapp e Super Canal, que é um portal interno para uso dos franqueados. Atualmento as métricas e resultados das campanha são manualmente consolidadas em planilhas Excel e deseja-se criar relátórios/dashboards integrados a essas planilhas. Num segundo momento, deve-se avaliar a possibilida de automação e integração diretamente com os canais.

___
## Proposta Técnica

A propostá é da construção de uma solução de dashboards em Power BI tendo como fonte os arquivos Excel contendo o acompanhamento e resultados das campanhas.
- O desenho detalhado da solução e dos dashboards será feito durante o projeto.
- As fontes são dividias em 3 grupos principais, cada um representando um canal (Whatsapp, e-mail e Super Canal¹)
- Estima-se um total de 3 tabelas fato (uma por canal) e 3 tabelas dimensionais sejam usadas com fontes para os relatórios e dashboards

>  ¹ Os dados do Super Canal potencialmente podem ser obtidos diretamente através sistema (Super Canal) e essa possibilidade de integração direta será avaliada durante o projeto, e realizada caso viável e caso o esforço de integração for semelhante ao Excel, já que o projeto foi estimado com base nesse último.

### Características Inerentes da Solução em Power BI
- Automação de todo o processamento e integração dos dados, entre as fontes em Excel até ao dashboard no Power BI, podendo ser acionado sob-demanda ou programado.
- Acesso seguro via navegador (e/ou Teams), integrado aos sistemas de autenticação a autorização existentes.
- Filtros pa
- ra segmentação dos dados e vizualização de cohorts.
- Drill-down, drill-throught e filtro cruzado que permitem investigação interativa e localizada de segmentos dos dados.
- Zoom, tela-cheia e detalhamento numérico dos gráficos e dowload de tabelas parciais.
- Links, navegação e interativida fluída com se fosse uma aplicação web convencional.
- Mais de 50 tipos de gráficos, tabelas e mapas.

### Objetivos da Solução
- Permitir acompanhamento semanal/mensal dos resultados das campanhas de marketing nos canais de e-mail, Whatsapp e Super Canal, através de dashboards e relatórios automatizados alinhados a identidade visual corporativa da Supergasbras.

### Resultados Esperados
- **Desenvolvimento**: Um relatório de Power BI com até 4 telas/dashboards foi desenvolvido e entregue ao adquirente.
- **Implantação**: O relatórios é acessível, para usuários selecionados ou público a nível organizacional, através de canais corporativos convencionais (e.g., navegador, Teams, Sharepoint).
- **Atualização**: O relatório pode ser atualizado automaticamente, sob-demanda ou programaticamente.
- **Treinamento**: Pelo menos um usuário foi treinado no uso da solução.
- **Treinamento**: Pelo menos um usuário foi treinado na operação da solução.

### Plano de Trabalho
1) **Briefing** (1 semana). Período para entrevistas, imersão nas necessidades do negócio, e planejamento da abordagem técnica.
2) **Desenvolvimento e implantação**. Ciclos de desenvolvimento com base nos métodos ágeis e entregas incrementais.
	1) Desenvolvimento da primeira tela e implantação (3 semanas)
	2) Desenvolvimento da segunda e terceira tela (6 semanas)
	3) Desenvolvimento da última tela e ajustes finais (2 semanas)
3) **Wrap up** (2 semanas). Fechamento do projeto e atividades complementares - pequenos ajustes, treinamentos e operação assistida.
Prazo estimado total: 14 semanas
### Metodologia de Desenvolvimento
- O projeto será realizado remotamente. Em princípio, não será necessário acesso a recursos de infraestrutura corporativos pois as fontes de dados são arquivos - caso isso mude ou durante a implantação da solução, pode ser necessário criação de usuário e permissionamentos (e.g., VPN, Office 365, Teams).
- É esperado que a comunicação seja orgânica via email, telefone ou Teams, para realização das entregas, esclarecimento de dúvidas, solicitação de ajustes e agendamento de reuniões.
- A validação das entregas será realizada pelo solicitante incrementalmente durante o desenvolvimento.

### Limitações, Restrições e Não-Escopo
- Serão utilizadas até no máximo 5 tabelas como fontes de dados.
- Serão desenvolvidas até no máximo 4 telas/dashboards de Power BI.
- Não está incluso trabalho manual de conformação/normalização de planilhas em tabelas.
- Não está no escopo instanciação de ambientes ou fornecimento de infraestrutura de TI.
- Não está incluso aquisição ou fornecimento de licenças de software de qualquer tipo (e.g., Power BI Pro);

### Premissas
- Os dados necessários estão disponíveis, acessíveis e corretos;
- Os dados são estruturados e em forma de tabela¹ 
- A equipe do solicitante irá validar as entregas em tempo adequado (até 5 dias úteis)
- A infraestrutura, acessos e credenciais necessárias para o desenvolvimento e/ou implantação da solução serão fornecidas pelo solicitante.

> ¹Definição formal de **tabela**
> Organização de dados de maneira estrutura em linhas e colunas ordenadas, onde cada linha representa um evento ou entidade do mesmo tipo, caracterizada por atributos representados nas colunas, sendo que todas as linhas possuem os mesmo atributos (colunas) e cada atributo representa somente uma característica. Opcionalmente a primeira linha informa metadados da cada atributo/coluna (e.g., nome das colunas). O número de atributos/colunas para um determinado tipo de evento ou entidade é fixo, porém o número de linhas tende a crescer com o tempo. 

## Riscos
- Pode ser necessário alterar o formato das planilha de acompanhamento utilizadas atualmente.
- Reestruturação histórica/retroativa das planinhas existentes para formato estrito de tabela pode inviabilizar ou atrasar o projeto.
- Erros na inserção/modificação manual dos dados podem inviabilizar/atrasar atualização dos dashboards.

___
## Proposta Comercial
##### Cenário 1: Escopo Integral (4 Telas)

| #   | Entrega                                                                                     | Prazo          | Valor         |
| --- | ------------------------------------------------------------------------------------------- | -------------- | ------------- |
| 1   | Estruturação do projeto, desenvolvimento da <br>primeira tela e implantação (escopo mínimo) | 4 semanas      | R$ 18.802     |
| 2   | Desenvolvimento da segunda e terceira telas                                                 | 6 semanas      | R$ 7,880      |
| 3   | Desenvolvimento da última tela                                                              | 2 semanas      | R$ 4,436      |
| 4   | Atividades complementares (treinamentos, <br>operação assistida e pequenos ajustes)         | 2 semanas      | R$ 3.442      |
|     | **Total**                                                                                   | **14 semanas** | **R$ 34,560** |
##### Cenário 2: Escopo Parcial (3 Telas)

| #   | Entrega                                                                                     | Prazo          | Valor         |
| --- | ------------------------------------------------------------------------------------------- | -------------- | ------------- |
| 1   | Estruturação do projeto, desenvolvimento da <br>primeira tela e implantação (escopo mínimo) | 4 semanas      | R$ 18.802     |
| 2   | Desenvolvimento da segunda e terceira telas                                                 | 6 semanas      | R$ 7,880      |
| 4   | Atividades complementares (treinamentos, <br>operação assistida e pequenos ajustes)         | 2 semanas      | R$ 3.442      |
|     | **Total**                                                                                   | **12 semanas** | **R$ 30,124** |
##### Cenário 3: Escopo Mínimo (1 Tela)

| #   | Entrega                                                                                     | Prazo         | Valor         |
| --- | ------------------------------------------------------------------------------------------- | ------------- | ------------- |
| 1   | Estruturação do projeto, desenvolvimento da <br>primeira tela e implantação (escopo mínimo) | 4 semanas     | R$ 18.802     |
| 4   | Atividades complementares (treinamentos, <br>operação assistida e pequenos ajustes)         | 2 semanas     | R$ 3.442<br>  |
|     | **Total**                                                                                   | **6 semanas** | **R$ 22,244** |

### Fluxo Físico Financeiro

| #   | Parcela                                            | Percentual |
| --- | -------------------------------------------------- | ---------- |
| 1   | Pagamento único até 50 dias após início do projeto | 100%       |

### Termos

- Essa proposta não configura uma relação de trabalho em nenhuma hipótese e sim, uma prestação de serviço entre pessoas jurídicas.
- Toda propriedade intelectual produzida durante o engajamento é de direto exclusiva do adquirente.
- Todos os documentos entregues a SIBILA são confidenciais entre as partes e não devem ser compartilhados ou distribuídos.
- Este é uma proposta de escopo fechado, e não de alocação de profissional.

### Dados da Proposta

###### Nome do Projeto
PBI Canais Supergasbraz
###### Duração Estimada
16 semanas
###### Valor Total
R$ 34.560
###### Validade da Proposta
Até 31 de Julho de 2025
###### Fornecedor
SIBILA
35.950.367/0001-50
###### Responsável
André Teixeira dos Santos
andre.santos@sibila.ai
+55 21 96830 7073
###### Cliente
Studio Mescla
XX.XXX.XXX/XXXX-XX
###### Solicitante
Bianca Azeredo
bianca@estudiomescla.com.br