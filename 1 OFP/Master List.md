# Master List
*Gaia's thread database. One file, all domains, all types.*
*Updated collaboratively by André and Gaia. Seeded: 2026-03-27. Last updated: 2026-03-29.*

---

## How This Works

Every item is a **thread** — an evolving unit of intent that may take one step or many.
Threads are never assumed to be single actions until they prove to be.

**Types** (evolves as threads reveal themselves):
- `action` — single step, closes when done
- `project` — multi-step, known shape, closes when complete
- `mission` — long endeavor requiring research, exploration and planning before steps are clear
- `decision` — needs deliberation before doing, closes once decided
- `system` — strategic and ongoing, never fully closed
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
`type:` `domain:` `status:` `due:` (optional) `asana:GID` (optional)
> Next: the single next action, or — if unknown
> Notes: optional context
> Subtasks:
>   - [ ] subtask name `due:YYYY-MM-DD`
> Financial: amount and due date if relevant
> Links: URLs if relevant
```

`asana:GID` links the thread to its Asana entity for UI sync.
Not all fields are required — only include what's present.

---

## Unqualified
*Raw captures — not yet typed, domained, or prioritized. Process during weekly review.*

---

## Professional

### Thread: Escalation Feature — Akuvo
`type:project` `domain:professional` `status:open`
> Next: wrap Phase 1 into a clean presentation for stakeholders; schedule Phase 2 (outcome analysis)
> Notes: prevalence proven — 37% accounts have escalation potential, 33% multi-account holders DQ in 2+, 1.3x likelihood multiplier. Phase 2 missing: outcome analysis (charge-offs, timing).

### Thread: Core Package Refactor — Akuvo
`type:project` `domain:professional` `status:open`
> Next: test refactored package in Synapse
> Notes: refactored but not tested locally or in Synapse yet

### Thread: Inter-client Activity Correlation Analysis — Akuvo
`type:project` `domain:professional` `status:open`
> Next: scope and start analysis
> Notes: desirable, not critical yet

### Thread: Capability Building / Shared Feature Store — Akuvo
`type:project` `domain:professional` `status:prioritized`
> Next: consolidate scattered work into a one-pager for Guarda/leadership this week
> Notes: Guarda approved — André to spearhead. Main vehicle for showcasing value at Akuvo.

### Thread: CBRS Studio Advancement — Key Bridge
`type:project` `domain:professional` `status:prioritized`
> Next: incorporate Jesse's feedbacks and show functional progress by Monday morning
> Notes: Jesse reframed goals as Forward/Reverse/Link/Network planners. See Key Bridge/0325 Jesse's Feedback.

### Thread: Key Bridge — back pay and wage
`type:decision` `domain:professional` `status:open`
> Next: clarify timeline with Jesse when appropriate
> Notes: currently on low wage due to company finances. Back pay expected. Need concrete plan or replacement job.

### Thread: Tornar-se autoridade reconhecida em ML
`type:system` `domain:professional` `status:open`
> Next: define first concrete step (publish, build in public, events?)
> Notes: mastery + visibility goal. From Vision.md.

### Thread: Aprimoramento em IA e Agentes
`type:skill` `domain:professional` `status:open`
> Next: define learning path and cadence

### Thread: Aprimoramento de Skills (geral)
`type:skill` `domain:professional` `status:registered`
> Next: — (lista no Asana)

### Thread: Dar aulas presencial
`type:project` `domain:professional` `status:someday`
> Next: —

### Thread: André Cursos (AI Master Fetus)
`type:mission` `domain:professional` `status:dormant` `asana:1213664193653984`
> Next: revisit H2 2026
> Notes: teaching business idea. AI for kids (science, history, physics, electronics, logic, OS, programming), AI for adults, Power Analyst (AI+Excel+Python+Claude+PowerBI), Math/Physics for ENEM. Small classes, recorded. Optional: involve Diego. Find physical spaces in RJ.
> Subtasks:
>   - [ ] involve Diego (optional)
>   - [ ] define courses and curricula
>   - [ ] find physical spaces in RJ

---

## Cocoroco

### Thread: Decisao sobre o Frango — Continuar ou Sair
`type:decision` `domain:cocoroco` `status:prioritized` `due:2026-06`
> Next: open Ben session — give him available financial data and ask for P&L baseline
> Notes: hard deadline June/July 2026. Currently ambivalent. Ben needs to start this week.

### Thread: Ouvir audios do time
`type:routine` `domain:cocoroco` `status:open`
> Next: hear today's audios
> Notes: recurs daily/as needed. Last done: —

### Thread: Henrique — gestao e limites
`type:system` `domain:cocoroco` `status:open`
> Next: define policy on salary anticipation requests
> Notes: pattern of disruptive morning messages — needs a boundary, not just a response

### Thread: Treinar substituto para Henrique
`type:project` `domain:cocoroco` `status:open`
> Next: identify candidate and start process

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
> Notes: business subthread — 3 Subthreads/MiniMarket/

### Thread: X In Rio
`type:project` `domain:building` `status:dormant`
> Next: —
> Notes: business subthread — 3 Subthreads/X In Rio/

### Thread: Negocio — setup de agentes para executivos
`type:project` `domain:building` `status:dormant`
> Next: revisit when personal agent system is more mature and proven
> Notes: service for executives — setup of virtual agents + optional dispatch via power of attorney. Setup fee + monthly maintenance. This system IS the proof of concept.

### Thread: Consolidar lista de ideias
`type:project` `domain:building` `status:registered`
> Next: — (tem coisa no Asana)

### Thread: Falar com o Rodrigo
`type:action` `domain:building` `status:registered`
> Next: —
> Notes: context unknown — qualify in next session

---

## Personal

### Thread: QOVES — upload surgical photos
`type:action` `domain:personal` `status:open`
> Next: upload additional photos for surgical recommendations report

### Thread: Eye improvement
`type:project` `domain:personal` `status:prioritized` `asana:1213664256329158`
> Next: buy caffeine eye cream this week
> Notes: no fillers for now. Full options at Personal/Aesthetics/action-plan.md. Progression: caffeine cream → Vit C serum → retinol → clinic.

### Thread: Skin improvement
`type:project` `domain:personal` `status:prioritized`
> Next: buy SPF50 + gentle cleanser this week (foundation of everything else)
> Notes: full routine at Personal/Aesthetics/action-plan.md

### Thread: Jaw improvement
`type:project` `domain:personal` `status:dormant`
> Next: wait for QOVES surgical report
> Notes: jaw filler + chin filler when ready. Fat reduction amplifies. Reactivate when surgical report arrives.

### Thread: Venvanse cycling plan
`type:system` `domain:personal` `status:open` `asana:1213728557494410`
> Next: —
> Notes: protocol in Asana — overdose if necessary next week, prepare packaged work to deliver, recover 10 days, repeat every 2 months.

### Thread: Concluir exames medicos
`type:project` `domain:personal` `status:open` `asana:1213664256329184`
> Next: check which exams are pending
> Subtasks:
>   - [ ] exams check

### Thread: Ir no ortomolecular
`type:action` `domain:personal` `status:registered`
> Next: agendar consulta

### Thread: Parar de fumar
`type:habit` `domain:personal` `status:open`
> Next: —

### Thread: Lentes de contato
`type:action` `domain:personal` `status:registered`
> Next: —

### Thread: Oculos escuro
`type:action` `domain:personal` `status:registered`
> Next: —

### Thread: Aprimoramento de abordagens com mulheres
`type:skill` `domain:personal` `status:registered`
> Next: —

### Thread: Leverage activities for popularity
`type:mission` `domain:personal` `status:open` `asana:1213664256329137`
> Next: identify which existing activities/content to leverage first
> Notes: post old trip content, identify social leverage points.
> Subtasks:
>   - [ ] define leverage strategy
>   - [ ] post old trip content

### Thread: Fazer inventario pessoal
`type:project` `domain:personal` `status:registered`
> Next: —

### Thread: Fazer curso de frances
`type:skill` `domain:personal` `status:someday`
> Next: —

### Thread: Become polyglot
`type:skill` `domain:personal` `status:someday` `asana:1213664256329180`
> Next: —
> Notes: languages in priority order TBD. French, Spanish, Japanese, German, Italian noted.

---

## Enzo

### Thread: Enzo — cursos e atividades extracurriculares
`type:project` `domain:enzo` `status:prioritized` `asana:1212674150092960`
> Next: follow up with father on English at CNA (talked already, follow-up pending)
> Notes: Priority activities: English at CNA, piano, martial arts (Taekwondo/Muay Thai/JiuJitsu), scouts, coding/computers. Ideas pool also includes: drone, airsoft, archery, sailing, scuba, karting, theater.
> Subtasks:
>   - [ ] follow up on English at CNA `asana:1213728557494393`
>   - [ ] enroll in martial arts
>   - [ ] enroll in piano

### Thread: Build Enzo's cavern
`type:project` `domain:enzo` `status:dormant` `asana:1213664256329164`
> Next: —
> Notes: a dedicated space for Enzo

### Thread: Build subcavern at mom's
`type:project` `domain:enzo` `status:dormant` `asana:1213664256329168`
> Next: —

### Thread: Get Enzo a bike
`type:action` `domain:enzo` `status:dormant` `asana:1213664256329166`
> Next: —

---

## Life and Freedom

### Thread: Moto — mobilidade e equipamentos
`type:system` `domain:life` `status:open`
> Next: colocar seguro na moto
> Notes: Capacete Noturno, Equipamento Enzo, Fazer uber moto, Havaianas umbrella

### Thread: Colocar seguro na Moto
`type:action` `domain:life` `status:prioritized`
> Next: research insurer options online

### Thread: Comprar passagens Bonaire (North Trip)
`type:action` `domain:life` `status:prioritized` `due:2026-04` `asana:1213664256329123`
> Next: buy tickets TODAY — departure 30 May, prices increasing
> Notes: overdue subtask since March 17 in Asana.

### Thread: North Trip — planning and gear
`type:project` `domain:life` `status:open` `asana:1213664256329116`
> Next: buy Bonaire tickets, then plan itinerary
> Subtasks:
>   - [ ] plan itinerary
>   - [ ] buy tickets `due:2026-04` — URGENT
>   - [ ] buy diving gear (mala de mergulho + bolsinha de mao)

### Thread: South Trip — Curitiba e arredores
`type:project` `domain:life` `status:prioritized` `due:2026-05` `asana:1213664256329118`
> Next: buy tickets Curitiba + pay second installment before April 22
> Notes: arrive Curitiba May 5 (Tuesday), course May 6 in Rio Negro-PR (120km), then Paraguay or Foz do Iguaçu. Buy electric bike in Paraguay.
> Subtasks:
>   - [ ] buy tickets + plan itinerary
>   - [ ] buy electric bike in Paraguay
>   - [ ] aula Rio Negro-PR, May 6
> Financial: R$2,650 second installment due 2026-04-22

### Thread: Sao Paulo Trip
`type:project` `domain:life` `status:someday` `asana:1213664256329131`
> Next: —

### Thread: Ipiratininga Trip
`type:project` `domain:life` `status:someday` `asana:1213664193653984`
> Next: —

### Thread: Planejar viagem Tailandia
`type:project` `domain:life` `status:open` `due:2026-06`
> Next: define dates and book

### Thread: Planejar viagem Australia e Europa
`type:project` `domain:life` `status:someday`
> Next: —

### Thread: Planejar viagem ao Norte (Brasil)
`type:project` `domain:life` `status:registered`
> Next: —

### Thread: Velejar e pilotar lancha
`type:skill` `domain:life` `status:someday` `asana:1213664256329178`
> Next: —

### Thread: Become a pilot
`type:skill` `domain:life` `status:someday` `asana:1213664256329176`
> Next: —

### Thread: Arco e flecha
`type:skill` `domain:life` `status:someday`
> Next: —

### Thread: Pilotar drone
`type:skill` `domain:life` `status:someday`
> Next: —

---

## Admin

### Thread: Limpar nome (credito)
`type:project` `domain:admin` `status:registered` `asana:1213664256329143`
> Next: plan name clearing process

### Thread: Trocar nome
`type:project` `domain:admin` `status:registered`
> Next: understand bureaucratic steps first

### Thread: Dupla cidadania
`type:project` `domain:admin` `status:registered`
> Next: —

### Thread: Declarar IR — encontrar contador
`type:project` `domain:admin` `status:prioritized`
> Next: find and contact one accountant this week
> Notes: time-sensitive, IR deadline approaching

### Thread: Ajustar CNPJ
`type:project` `domain:admin` `status:open`
> Next: understand current status and required changes

### Thread: Casa propria
`type:project` `domain:admin` `status:someday`
> Next: —
> Notes: own space eventually — Tijuca or Ipanema/Leblon. Depends on clearing name first.

### Thread: Quarto do meu irmao
`type:project` `domain:admin` `status:registered`
> Next: —

### Thread: Organizar coisas fisicas
`type:project` `domain:admin` `status:registered`
> Next: —
> Notes: physical + digital + notes + files + books + courses inventory

### Thread: Solve money issue with dad
`type:system` `domain:admin` `status:open` `asana:1213664256329224`
> Next: —
> Notes: talked to dad already. Thread still open — ongoing dynamic.

---

## System and Meta

### Thread: OFP Weekly Review ritual
`type:routine` `domain:meta` `status:prioritized`
> Next: next review Sunday 2026-04-05
> Notes: first review done 2026-03-29. Template at 1 OFP/Weekly Review.md. Recurs weekly.

### Thread: Toggl time accounting
`type:system` `domain:meta` `status:open`
> Next: review data after 2 weeks of tracking (started ~2026-03-20, review around 2026-04-03)

### Thread: Configurar Claude Projects (Gaia, Alex, Ben, Apollo, Keybridge, Janea)
`type:project` `domain:meta` `status:open`
> Next: set up each using 2 AI Exchange/project-prompt-template.md

### Thread: Asana — connect correct workspace
`type:action` `domain:meta` `status:closed`
> Next: —
> Notes: connected to Grieb Emmerich workspace 2026-03-29. Gaia can now read/write Asana.

### Thread: Microsoft ToDo integration com o Vault
`type:project` `domain:meta` `status:someday`
> Next: scope with Alex when ready
> Notes: ToDo = mobile capture inbox. Manual sync for now.

### Thread: How to set and update Mantras
`type:system` `domain:meta` `status:registered`
> Next: —
> Notes: Apollo territory

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

### Thread: Command-line MCP para automacao de git e scripts
`type:project` `domain:meta` `status:closed`
> Notes: vault-mcp built by Alex 2026-03-27. Git live. Server at C:\Users\tdsnit\Work26\agents\vault-mcp.

### Thread: Research and implement eye and skin routine
`type:routine` `domain:personal` `status:closed`
> Notes: superseded by QOVES action plan 2026-03-29.

---

## Archived
*Consciously dropped or superseded. Kept for reference.*

---
*Last updated: 2026-03-29 by Gaia*
*Asana workspace: Grieb Emmerich (connected 2026-03-29)*
*Gaia One project GID: 1213847489121972*
*Domain custom field GID: 1213847448665011*
*Sections: Prioritized=1213848089615369, Open=1213848053325711, Dormant=1213848120073607*
