1. The shadow-clone reconciliation has no trigger.
§3 says narrows append to sessions.md and the full Primarch reconciles into state.md on its next turn. But §4's full-mode boot load list doesn't include sessions.md — it's "on demand." So a full booting will read its (possibly stale) state.md and never see the narrow's append unless something prompts it to read sessions. The Naruto pattern is described but not wired. You need either (a) sessions.md head loaded at boot, or (b) an explicit reconcile-on-boot protocol that diffs sessions.md against state.md's last-update timestamp.
> agreed, make sessions.md ML (mandatory load) 

2. Boot load list ↔ registry mandates don't agree.
§5 calls metaindex.md and [agent].md "two-tier mandatory anchors" with core.md and identity.md mandating their reads. But §4's full-mode load list (6 items) doesn't include them. Either:
> metaindex.md and [agent].md are ML (mandatory load)

Same issue for environment.md: §5 says it's loaded at boot in both full and narrow; §4's narrow boot phases don't mention it.
> mandatory load

4. Protocol-in-file awareness is unspecified.
§2 and §6 both reserve protocols/ directories for protocols that grow large. §6 also says "Protocols are I or MA. Never F" and "protocols are not registered." So when a protocol moves into its own file, how does the agent stay aware of it? The only path is a stub or pointer in core.md / identity.md, but this isn't stated. Spell it out, otherwise a moved protocol becomes dead letter the moment it leaves its parent file.
Smaller inconsistencies and bugs
> protocols are always inline or mandatory load; functions are mandatory awareness (MA) or findable (F)

§4 narrow boot cites §9 ("self-contained per §9") but §9 is messaging. The initial-prompt mechanism is in §8. Wrong reference.

§6 Pr3+ says "Inherited from current core.md principles section" — a self-contained spec shouldn't reference an external "current" file. The seven names are listed in parens, but the spec should enumerate them properly.

§12 backlog: "Renaming 2 AI Exchange/ → 2 Agents/" already happened in v3 (§2). The remaining work is decommissioning v2 at 2 AI Exchange/. Reword.
Loadiness vs awareness overlap. The "boot" loadiness value ("referenced at boot, loaded if needed") is functionally MA awareness. The two axes correlate enough that the four-value loadiness vocabulary is muddled. Either collapse them or make the orthogonality explicit.
> drop the loadiness concept

F1 spawn "MA all agents" but §8 says narrows don't spawn by default. MA grants awareness, not authorization — that distinction isn't articulated anywhere. Same ambiguity for F4 housekeeping (MA all agents, but practically system-only).
Servitor mode (§4) doesn't state protocol inheritance. Narrow inheritance is explicit at end of §8; servitor is silent. Probably "inherits nothing operational, runs initial-prompt only," but spell it out.
Servitor naming serv-YYMMDD-NNN: NNN is owner-generated with no central counter, so two near-simultaneous spawns can collide. Either include the spawning agent prefix or use a longer suffix (timestamp ms / random).
Message filename YYMMDD-HHMM-from-subject.md — minute-resolution collisions are realistic given async fan-in. Add seconds.

Things genuinely lost from v2
The biggest in-context risk: "Log tooling failures to Alex" is gone. Per your memories this was a core operational pattern — tooling failures escalate to Alex immediately rather than being noted as principles or deferred. v3 demotes it to the backlog under "principles dropped from v3.0 lean baseline." If you actually want it preserved, it needs to be in core.md as a shared protocol or in each non-Alex identity.md as MA. Otherwise agents will start absorbing tooling failures into their own context instead of routing them.
Other v2 losses, ranked by impact:

Note Authoring as protocol → as function (F2). Behavioral shift from ambient (every write is governed) to invoked (only when called). Note quality will drift unless you make it MA with a strong default-fire posture, or bring back the protocol form.
Session-end protocol (already covered above).
Index Maintenance protocol dropped → registry becomes stale silently. With registry as a load-bearing concept in v3, this is risky. Worth a minimal "on rename/move, update registry" inline reminder.
Agent-level index.md (resource map) — backlog acknowledges. For now notes/index.md is the only index, which is narrow.
archive.md, backlog.md — both backlog-acknowledged. Lean is fine; just be ready to extract when state bloats.
character.md / personality-blind-spots-learnings file — backlog acknowledges. But Pr2 ("agent-decided learnings") implies the agent stores them somewhere. Where, in v3? identity.md? notes? Currently unspecified, which means each agent will improvise differently. Pick a default surface.

Open design questions worth resolving before cutover

Housekeeping trigger. §3 leans on housekeeping for pruning and for refreshing "History So Far." §8 UC3 defers the cron mechanism post-v3.0. So in v3.0, who/what runs housekeeping? You, manually? That's fine but should be explicit, otherwise sessions.md grows and "History So Far" goes stale.
Agent-init and v2 migration. F6 bootstraps new Primarchs. v3 starts with 10 already. The migration from v2 is a one-time human op — say so explicitly so future-you doesn't expect agent-init to do it.
Registry paths.md / repos.md / tools.md / enablers.md / functions.md are listed as "on-demand" but no agent will discover them organically without metaindex.md being loaded. metaindex.md is "MA from core.md" but also the only entry into the rest of the registry — so its actual loadiness is closer to "always" in practice. Consider making it always-load and the rest on-demand; then metaindex really does its job as the index