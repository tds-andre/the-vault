---
type: notes
---

# Cocorita — Learnings

Loaded at boot (ML). Append short observations. Promote to dedicated `notes/[topic].md` when a thread merits it.

---

## Interação com André

- **Não devolver lista de "loops abertos esperando você" depois de um resync.** Resync é pra eu absorver — não pra empurrar 5 perguntas de volta. André disse explicitamente (2026-05-03) que esse tipo de lista "none of it matters". Razão: ele já está time-poor; me listar coisas-que-precisam-dele-decidir só amplifica isso. Ele puxa o que quer puxar. Eu termino o resync, fecho a boca, e espero a próxima instrução. Se algo for genuinamente urgente e bloqueante, aí sim eu surfaço — mas como item específico, não como lista de "vale alinhar".

## Operacional

- **Henrique psychology > qualquer plano.** Se a recomendação requer Henrique mudar de personalidade, é uma recomendação ruim.
- **Score (Google / iFood) é leading indicator.** Cai antes do volume cair.
- **Marketing sem operação é amplificador de problema.** 4.7+ score gate antes de qualquer push.
- **Solução que requer André presente fisicamente não é solução.**
- **Prep de proteína é o gargalo.** Tudo que estabiliza o frango estabiliza a operação.

## Pessoas

- **Time é long-term.** Pequeno, dedicado, bem pago > rotatividade alta.
- **Família (Sofia/Anna/Camila/Rodrigo) é layer estável secundária.** Henrique é a primária e a frágil.
- **Rodrigo é a possível alavanca tática.** Background certo (consultoria + blue collar + tech) — falta clareza de papel.

## Vault Cocoricó

- **Frontmatter discipline.** `canon` exige validação operacional.
- **Nada se auto-promove.** Documento novo entra em `draft/unbound`; promoção é deliberada.

## CocoriPede / CocoriSuite (handed to Alex)

- **Architect handoff funcionou.** Alex assumiu Sprint 4-6 sem perda de contexto pesada — `CLAUDE.md` v1.7 + `tasks.md` carregam o necessário.
- **Decisões de arquitetura defendidas pagam dividendo.** SQLite, polling iFood, platform adapters — todas sobrevivem ao handoff sem revisão.
- **Mas escopo cresce sem voltar pra mim.** Em ~5 dias o CocoriPede standalone virou monorepo de 6 sub-sistemas (CocoriSuite). Sprint 4-5 (Cardápio Digital, iFood real) caíram do plano sem decisão registrada. Sprint 6 mudou de stack (Evolution API/Python → Baileys/Node + dispatcher Python). **Lição:** depois do handoff eu fico cego. Preciso de cadência fixa de resync com Alex (por exemplo, revisar `cocorisuite/tasks.md` toda segunda) — senão acordo num mundo arquiteturalmente diferente.
- **"Architect: Cocoria → Alex" continua escrito** nos CLAUDE.md dos subs. Pequeno mas confirma que a transferência foi feita e não houve walk-back.
- **Three-Way Workflow afrouxou:** o root `CLAUDE.md` diz "do not modify" mas o Sprint 7 inteiro foi appendado nele depois da linha de assinatura. Builder (Claude Code) tá escrevendo no que era pra ser do Architect. Não é catastrófico — pode ter sido o próprio Alex via Cowork — mas vale conferir o protocolo.
