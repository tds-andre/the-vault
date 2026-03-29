# Master List
*Gaia's thread database. One file, all domains, all types.*
*Updated collaboratively by André and Gaia. Seeded: 2026-03-27.*

---

## How This Works

Every item is a **thread** — an evolving unit of intent that may take one step or many.
Threads are never assumed to be single actions until they prove to be.

**Types** (evolves as threads reveal themselves):
- `action` — single step, closes when done
- `project` — multi-step, known shape, closes when complete
- `decision` — needs deliberation before doing, closes once decided
- `system` — strategic and ongoing, never fully closed (e.g. OFP ritual, mastery goal)
- `skill` — growth toward a capability, has milestones but no close condition
- `routine` — repeating operational task, resets on cadence rather than closing
- `habit` — behavior change, closes when embedded

**States:**
- `registered` — captured, not yet examined
- `open` — acknowledged, in play but not active
- `prioritized` — actively being worked, has a defined next step
- `someday` — no current timeline, revisit eventually
- `dormant` — intentionally paused, will return
- `closed` — done (actions, projects, decisions)
- `archived` — consciously dropped or superseded

Note: `routine` threads don't close — they cycle. Mark last completion in Notes.

**Format per thread:**
```
### Thread: Name
`type:` `domain:` `status:` `due:` (optional)
> Next: the single next action, or — if unknown
> Notes: optional context
```

---

## Unqualified
*Raw captures — not yet typed, domained, or prioritized. Process during weekly review.*

---

## Professional

### Thread: Escalation Feature — Akuvo
`type:project` `domain:professional` `status:prioritized`
> Next: present Phase 1 evidence at 10am meeting today; schedule Phase 2 (outcome analysis: charge-offs, timing)
> Notes: prevalence proven — 37% accounts have escalation potential, 33% multi-account holders DQ in 2+, 1.3x likelihood multiplier. Missing: outcome analysis.

### Thread: Core Package Refactor — Akuvo
`type:project` `domain:professional` `status:open`
> Next: test refactored package in Synapse
> Notes: refactored but not tested locally or in Synapse yet

### Thread: Inter-client Activity Correlation Analysis — Akuvo
`type:project` `domain:professional` `status:open`
> Next: scope and start analysis
> Notes: not critical for today's meeting but desirable

### Thread: Capability Building / Shared Feature Store — Akuvo
`type:project` `domain:professional` `status:open`
> Next: consolidate scattered work into a coherent proposal
> Notes: Guarda accepted Andre's suggestion to spearhead this — work is scattered, needs organizing

### Thread: CBRS Studio Advancement — Key Bridge
`type:project` `domain:professional` `status:prioritized`
> Next: incorporate Jesse's feedbacks before 9:30am meeting today
> Notes: 4 functional goals documented in vault; pre-compute estimates for US-wide scenes also needed

### Thread: Intro video para recrutador
`type:action` `domain:professional` `status:prioritized` `due:2026-03-27`
> Next: record and send today — risk of being forgotten after morning meetings

### Thread: Tornar-se autoridade reconhecida em ML
`type:system` `domain:professional` `status:open`
> Next: define first concrete step (publish, build in public, events?)
> Notes: mastery + visibility goal — from Vision.md

### Thread: Aprimoramento em IA e Agentes
`type:skill` `domain:professional` `status:open`
> Next: define learning path and cadence
> Notes: originally "Definir sistema de aprimoramento em IA" — skill comes first, system wraps it later

### Thread: Aprimoramento de Skills (geral)
`type:skill` `domain:professional` `status:registered`
> Next: — (lista no Asana)

### Thread: Iniciar um curso presencial
`type:project` `domain:professional` `status:someday`
> Next: —

### Thread: Dar aulas presencial
`type:project` `domain:professional` `status:someday`
> Next: —

---

## Cocoroco

### Thread: Decisao sobre o Frango — Continuar ou Sair
`type:decision` `domain:cocoroco` `status:prioritized` `due:2026-06`
> Next: schedule Restaurant Decision Session with Ben to build financial baseline (P&L)
> Notes: hard deadline June/July 2026 — profitable or clean exit. Currently ambivalent.

### Thread: Comprar pacotes do restaurante
`type:routine` `domain:cocoroco` `status:prioritized` `due:2026-03-27`
> Next: place online order today
> Notes: recurs weekly or as needed. Last done: —

### Thread: Ouvir audios do time
`type:routine` `domain:cocoroco` `status:open`
> Next: hear today's audios
> Notes: recurs daily/as needed. Last done: —

### Thread: Henrique — gestao e limites
`type:system` `domain:cocoroco` `status:open`
> Next: define policy on salary anticipation requests so response is not reactive each time
> Notes: pattern of disruptive morning messages — needs a boundary, not just a response

### Thread: Treinar substituto para Henrique
`type:project` `domain:cocoroco` `status:open`
> Next: identify candidate and start process
> Notes: surfaced in weekly review 2026-03-29

### Thread: Estabelecer reuniao de rotina com Ana ou time
`type:system` `domain:cocoroco` `status:registered`
> Next: —

### Thread: Estabelecer processos financeiros e contabeis
`type:system` `domain:cocoroco` `status:registered`
> Next: —
> Notes: Ben's territory

### Thread: Fazer inventario do frango
`type:project` `domain:cocoroco` `status:registered`
> Next: —

---

## Building

### Thread: MiniMarket
`type:project` `domain:building` `status:dormant`
> Next: —
> Notes: business subthread in incubation — 3 Subthreads/MiniMarket/

### Thread: X In Rio
`type:project` `domain:building` `status:dormant`
> Next: —
> Notes: business subthread with 5 drafts — 3 Subthreads/X In Rio/

### Thread: Consolidar lista de ideias
`type:project` `domain:building` `status:registered`
> Next: — (tem coisa no Asana)

### Thread: Falar com o Rodrigo
`type:action` `domain:building` `status:registered`
> Next: —
> Notes: context unknown — qualify in next session

---

## Personal

### Thread: Tratamento facial
`type:system` `domain:personal` `status:registered`
> Next: iniciar tratamento
> Notes: also "Definir sistema de aprimoramento de Beleza"

### Thread: Research and implement eye and skin routine
`type:routine` `domain:personal` `status:closed`
> Next: —
> Notes: superseded by QOVES action plan 2026-03-29. See `Personal/Aesthetics/action-plan.md`

### Thread: Concluir exames medicos
`type:project` `domain:personal` `status:registered`
> Next: —

### Thread: Ir no ortomolecular
`type:action` `domain:personal` `status:registered`
> Next: agendar consulta

### Thread: Parar de fumar
`type:habit` `domain:personal` `status:open`
> Next: —

### Thread: Arrumar local para treino
`type:action` `domain:personal` `status:registered`
> Next: —

### Thread: Lentes de contato
`type:action` `domain:personal` `status:registered`
> Next: —

### Thread: Oculos escuro
`type:action` `domain:personal` `status:registered`
> Next: —

### Thread: Equipamento de mergulho
`type:project` `domain:personal` `status:someday`
> Next: —

### Thread: Definir sistema de aprimoramento de Popularidade
`type:system` `domain:personal` `status:registered`
> Next: —

### Thread: Aprimoramento de abordagens com mulheres
`type:skill` `domain:personal` `status:registered`
> Next: —
> Notes: originally "Definir sistema de aprimoramento de abordagens" — reframed as skill, system comes after

### Thread: Fazer inventario pessoal
`type:project` `domain:personal` `status:registered`
> Next: —

### Thread: QOVES — upload surgical photos
`type:action` `domain:personal` `status:open`
> Next: upload additional photos to QOVES for surgical recommendations report
> Notes: current report is non-surgical only. Surgical report requires more photo angles.

### Thread: Eye improvement
`type:project` `domain:personal` `status:prioritized`
> Next: **this week — start caffeine eye cream** (most targeted for dark circles + puffiness, low cost, no risk)
> Notes: no fillers for now. Full options list at `Personal/Aesthetics/action-plan.md`. Progression: caffeine eye cream → Vit C eye serum → retinol/tretinoin → clinic (polynucleotides, laser, PRP) when ready.

### Thread: Skin improvement
`type:project` `domain:personal` `status:prioritized`
> Next: **this week — buy and start SPF50 + gentle cleanser** (foundation of everything else, non-negotiable)
> Notes: full routine at `Personal/Aesthetics/action-plan.md`. Morning: cleanser → Vit C → moisturiser (HA/niacinamide) → SPF50. Night: cleanser → retinol 0.25% 3x/week → azelaic acid on red areas.

### Thread: Jaw improvement
`type:project` `domain:personal` `status:dormant`
> Next: wait for QOVES surgical report before deciding
> Notes: non-surgical option is jaw filler + chin filler. Fat reduction amplifies results. Report will clarify surgical options. Reactivate when surgical report arrives.

### Thread: Fazer curso de frances
`type:skill` `domain:personal` `status:someday`
> Next: —

---

## Life and Freedom

### Thread: Moto — mobilidade e equipamentos
`type:system` `domain:life` `status:open`
> Next: colocar seguro na moto
> Notes: umbrella thread — Capacete Noturno, Equipamento Enzo, Fazer uber moto, Havaianas

### Thread: Colocar seguro na Moto
`type:action` `domain:life` `status:prioritized`
> Next: contact insurer or research options online

### Thread: Velejar e pilotar lancha
`type:skill` `domain:life` `status:someday`
> Next: —

### Thread: Arco e flecha
`type:skill` `domain:life` `status:someday`
> Next: —

### Thread: Armas e softball
`type:skill` `domain:life` `status:someday`
> Next: —

### Thread: Pilotar drone
`type:skill` `domain:life` `status:someday`
> Next: —

### Thread: Pilotar aviao
`type:skill` `domain:life` `status:someday`
> Next: —

### Thread: Comprar passagens Bonaire
`type:action` `domain:life` `status:prioritized` `due:2026-04`
> Next: buy tickets — departure May, time-sensitive
> Notes: surfaced in weekly review 2026-03-29

### Thread: Planejar viagem Tailandia
`type:project` `domain:life` `status:open` `due:2026-06`
> Next: define dates and book

### Thread: Planejar viagem Australia e Europa
`type:project` `domain:life` `status:someday`
> Next: —

### Thread: Planejar viagem ao Norte (Brasil)
`type:project` `domain:life` `status:registered`
> Next: —

### Thread: Planejar viagem ao Sul (Brasil) — Curitiba
`type:project` `domain:life` `status:open`
> Next: buy tickets
> Notes: surfaced in weekly review 2026-03-29

### Thread: Curtir em Sao Paulo
`type:action` `domain:life` `status:someday`
> Next: —

---

## Admin

### Thread: Limpar nome (credito)
`type:project` `domain:admin` `status:registered`
> Next: —

### Thread: Trocar nome
`type:project` `domain:admin` `status:registered`
> Next: understand bureaucratic steps first

### Thread: Dupla cidadania
`type:project` `domain:admin` `status:registered`
> Next: —

### Thread: Declarar IR — encontrar contador
`type:project` `domain:admin` `status:prioritized`
> Next: find new accountant this week
> Notes: flagged multiple times — time-sensitive. Current priority per weekly review 2026-03-29.

### Thread: Ajustar CNPJ
`type:project` `domain:admin` `status:open`
> Next: understand current status and required changes

### Thread: Casa propria
`type:project` `domain:admin` `status:someday`
> Next: —
> Notes: own space eventually — Tijuca or Ipanema/Leblon area

### Thread: Quarto do meu irmao
`type:project` `domain:admin` `status:registered`
> Next: —

### Thread: Quarto de nit e casa da mae
`type:project` `domain:admin` `status:registered`
> Next: —

### Thread: Organizar coisas fisicas
`type:project` `domain:admin` `status:registered`
> Next: —

---

## System and Meta

### Thread: OFP Weekly Review ritual
`type:routine` `domain:meta` `status:prioritized`
> Next: first weekly review this Sunday night (2026-03-29)
> Notes: template ready at 1 OFP/Weekly Review.md. Recurs weekly.

### Thread: Toggl time accounting
`type:system` `domain:meta` `status:open`
> Next: review data after 2 weeks of tracking (started ~2026-03-20)

### Thread: Configurar Claude Projects (Gaia, Alex, Ben, Apollo)
`type:project` `domain:meta` `status:open`
> Next: set up Gaia first using 2 AI Exchange/project-prompt-template.md

### Thread: Command-line MCP para automacao de git e scripts
`type:project` `domain:meta` `status:closed`
> Next: —
> Notes: vault-mcp built by Alex 2026-03-27. Git automation live. Server at C:\Users\tdsnit\Work26\agents\vault-mcp. Subcommands: status, add, commit, push, pull, log, diff. Modular — new tools can be added to vault_mcp/tools/. Commit messages must use hyphens (no spaces in args).

### Thread: Microsoft ToDo integration com o Vault
`type:project` `domain:meta` `status:someday`
> Next: scope with Alex when ready — Microsoft Graph API + MCP server
> Notes: ToDo = mobile capture inbox; Vault = central source of truth. Integration goal: periodic import of ToDo items into Master List Unqualified section. Manual sync for now.

### Thread: How to set and update Mantras
`type:system` `domain:meta` `status:registered`
> Next: —
> Notes: Apollo territory — in 4 To Follow Up/

### Thread: How to structure learnings and cool links
`type:system` `domain:meta` `status:registered`
> Next: —
> Notes: Apollo territory

### Thread: How to structure courses and books
`type:system` `domain:meta` `status:registered`
> Next: —
> Notes: Apollo territory

---

## Closed
*Completed threads. Moved here when done, archived after 90 days.*

---

## Archived
*Consciously dropped or superseded. Kept for reference.*

---
*Last updated: 2026-03-27 by Gaia*
*Source: The List of Everything + session context*
*Next processing: weekly review 2026-03-30*
