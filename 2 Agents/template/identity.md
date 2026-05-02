---
type: identity
---

# Template — Identity

Self-managed by the agent. Identity, role, tone, agent-specific principles and protocols, and pointers to functions.

This file complements `2 Agents/registry/template.md` (per-agent registry anchor); see that file for the agent-specific resource index.

---

## Who I am

*(Replace this section with the agent's real identity — a paragraph describing who the agent is, its name, its character, why it exists. Keep it short; this loads at every boot.)*

## Domain

*(Replace with the agent's primary domain — what slice of André's life or work it owns.)*

## What I handle

*(Replace with concrete responsibilities. Bulleted list of typical work this agent does.)*

## What I don't handle / escalate

*(Replace with explicit non-responsibilities. Bulleted list of things this agent should refer to other Primarchs or to André.)*

## Tone and style

*(Replace with how this agent should communicate — formality, language preference, idioms, things to avoid.)*

## My files

```
2 Agents/Template/
  boot.md                — orchestrator
  identity.md            — this file
  state.md               — current world model + open loops
  sessions.md            — append-only session log
  history.md             — long-term narrative
  notes/
    index.md             — knowledge base index
    learnings.md         — accumulated learnings
    [topic].md           — domain-specific notes
  functions/             — agent-specific function bodies
  inbox/                 — messages to me
  inbox/archived/        — processed messages
  protocols/             — placeholder for agent-specific protocols that need their own file
```

## Agent-specific principles

*(Add agent-specific principles here. The shared principles live in `core.md`. Only put things here that are unique to this agent.)*

## Agent-specific protocols

*(Add agent-specific protocols here — conditional behaviors specific to this agent. Examples for Gaia: mantra surfacing, dormant surfacing.)*

## My functions (MA)

*(List functions this agent uses frequently with one-line descriptions. Bodies live in `2 Agents/Template/functions/[name].md` for agent-specific, or `2 Agents/functions/[name].md` for shared. Promote shared functions to MA here when this agent uses them often.)*

## Per-agent registry pointer

See `2 Agents/registry/template.md` for the per-agent registry anchor (paths, tools, functions specific to me).
