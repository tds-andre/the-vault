# The Core Methodology — Socratic Analytics

*Draft content for integration into "AI-Assisted Analytics Workflow Methodology."*
*Written from the practitioner perspective — what an analyst agent should actually do.*

---

## Overview

This methodology governs how an AI analyst agent conducts data analysis in collaboration with a human partner. It is structured in three layers:

1. **The analytical scaffolding** — fixed-order structural moves that apply to any analysis
2. **The inquiry loop** — the Socratic cycle that drives each analytical question forward
3. **Principles and anti-patterns** — cross-cutting discipline that governs both layers

The layers are not sequential phases — the scaffolding provides the macro structure, and the inquiry loop operates within each step of the scaffolding. Principles apply everywhere.

---

## 1. The Analytical Scaffolding

These moves happen in a roughly fixed order. Skipping or reordering them leads to flawed analysis. The scaffolding is not Socratic — you don't debate whether to profile the data. You just do it.

### 1.1 Orient: Profile the data before asking questions about it

Before any analytical question, understand the material:

- **Volume**: row counts, unique entity counts, cardinality of key dimensions
- **Shape**: column inventory, data types, join keys, sparsity
- **Temporal range**: when does the data start and end? Are there gaps?
- **Distributions**: key dimension distributions (e.g., accounts per person, events per account). Look at the tails — outliers often reveal data quality issues or population substructures.
- **Health checks**: nulls, duplicates, impossible values, orphan keys

The profiling step has two outputs: (a) a factual understanding of the data, and (b) a list of anomalies or surprises to investigate before proceeding.

**Why this order matters:** Analytical questions formulated without profiling often target non-existent segments, assume unavailable columns, or misestimate feasible sample sizes.

### 1.2 Clean: Identify and remove noise, quantifying the cost

Noise comes in many forms: business entities in a person-level analysis, test accounts, data migration artifacts, extreme outliers that dominate aggregates.

For each candidate filter:

- **Identify** the noise: what is it, why is it not part of the target population?
- **Quantify the filter's cost**: how many records/entities are removed? What percentage of the target population?
- **Evaluate multiple signals**: explore different ways to identify the noise (flags, behavioral patterns, distributional outliers). Pick the most effective and cheapest.
- **Apply filters that are low-cost and high-clarity** — removing 2.5% of data to eliminate the most extreme outliers is almost always worth it. Removing 30% requires much stronger justification.

Document every filter applied, its rationale, and its cost. Filters are analytical decisions, not preprocessing.

### 1.3 Segment: Characterize the population before measuring anything

Before measuring the target effect, understand the population segments:

- **Define the segments** relevant to the analysis (e.g., by relationship type, by size, by tenure)
- **Compute baseline metrics** for each segment: rates, averages, distributions
- **Look for surprises**: segments that behave opposite to expectations often reframe the entire analysis

This step produces the baseline landscape. It is critical because it establishes what "normal" looks like before you introduce the variable of interest. Without it, you cannot distinguish signal from confound.

**Key principle:** Segmentation often reveals that the population you're studying is *not* the riskiest or most active — which makes any signal you later find more meaningful, not less.

### 1.4 Construct the scaffolding object

Most analyses need a structural object that defines the universe of observation:

- A **network** (nodes and edges, components, degree distribution)
- A **cohort** (entry criteria, observation window, exit criteria)
- A **index or mapping** (entity A linked to entity B through relation R)

Build this object explicitly. Compute its basic properties (size, density, component structure). This object is the denominator for all subsequent metrics — if it's wrong, everything downstream is wrong.

### 1.5 Measure coverage, then impact — in that order

**Coverage first:** "How much of the world does this apply to?" This gates the entire analysis. If the phenomenon affects 0.1% of the population, even a dramatic effect size may not matter practically. Compute coverage at multiple thresholds/parameters if applicable.

**Impact second:** "Among the cases it applies to, does it change outcomes?" This is where the dual baseline structure (see Principles below) becomes essential.

The ordering is deliberate: impact analysis is more expensive (more computation, more nuance). Coverage tells you whether the expense is justified.

### 1.6 Analyze outcomes with defined metrics

Before counting anything:

- **Inventory** all available outcome variables (event types, states, flags)
- **Categorize** them into meaningful tiers (e.g., severity levels, positive vs negative)
- **Exclude** irrelevant categories explicitly (and document why)
- **Define the metric** precisely: what counts as a "hit"? What's the denominator? What's the observation window?

A well-defined metric has:
- A clear **numerator** (what event, on which entity, in what window)
- A clear **denominator** (which population of episodes/entities)
- A clear **name** that a human can understand without reading the code

### 1.7 Wrap up: synthesize, document, output

At the end of an analytical cycle:

- **Synthesize** the findings into a coherent narrative — not just "here are the numbers" but "here is what they mean together"
- **Document** the full process, including dead ends, broken premises, and course corrections
- **Identify** what wasn't answered and what new questions emerged
- **Generate deliverables** according to the deliverable spec (see Deliverables section)
- **Update** persistent context (memory files, data documentation) with new understanding

---

## 2. The Inquiry Loop

The inquiry loop is the Socratic engine that operates within each step of the scaffolding. It is the core intellectual pattern of the methodology.

### The cycle

```
Question → Operationalize → Compute → Interpret → Resolve or Refine
```

**Question:** A specific, answerable analytical question. Can come from the human partner, from the previous cycle's results, or from the agent's own observations.

**Operationalize:** Translate the question into a concrete computation. This involves choosing:
- The metric (what to measure)
- The population (who to measure it on)
- The baseline (what to compare against)
- The method (how to compute it)

**Compute:** Execute the computation. This should produce numbers, tables, or visualizations — not prose.

**Interpret:** Read the results. What do they say? Are they surprising? Do they make sense given what we know? Are there potential confounds or artifacts?

**Resolve or Refine:** Two possible outcomes:
- **Resolve:** The question is answered. Record the finding, extract the key metric, advance to the next question.
- **Refine:** The question is not adequately answered — either because the operationalization was flawed, the baseline was inappropriate, or the results are ambiguous. Reformulate and re-enter the cycle.

### The critical move: challenging the question itself

The most important moment in the loop is when results are null, surprising, or contradictory. The default instinct is to accept the result ("there's no signal") or to tweak parameters ("let's try a wider window"). But the highest-value move is often to **challenge the operationalization**:

- Is the metric capturing what we think it captures?
- Is the baseline fair? Is it conditioned on something that biases it?
- Is the framing right? (symmetric vs directional, pair-level vs event-level, absolute vs relative)

A null result from a flawed metric is not a null finding — it's an incomplete inquiry. The agent should present the null result, then explicitly propose how the framing might be wrong, rather than accepting it silently.

### Pacing and human checkpoints

Not every cycle needs human input, but certain transitions do:

- **Before major direction changes:** When the agent proposes reformulating the question, it should present the reasoning and wait for confirmation.
- **After surprising results:** Especially nulls or sign reversals. These are moments where domain knowledge matters.
- **At phase transitions:** Moving from coverage to impact, or from one question to the next. A brief checkpoint aligns expectations.
- **Before generating final deliverables:** The human should confirm what to include and the framing.

Within a cycle (compute → interpret), the agent can operate autonomously. The Socratic quality comes from the transitions between cycles, not from asking permission at every step.

---

## 3. Principles

These cross-cut both the scaffolding and the inquiry loop. They are always in effect.

### 3.1 Dual baselines for every comparison

Every time you measure an effect, compare it against two baselines:

- **Chance baseline (random):** What would this metric look like if the grouping were random? This answers: "Is this more than coincidence?"
- **Confound-controlled baseline (intra-group):** What does this metric look like for the same entities when the condition is absent? This answers: "Holding the entity constant, does this condition make things worse?"

The chance baseline establishes existence of signal. The confound-controlled baseline establishes specificity — that the effect is attributable to the condition, not to the entities being inherently different.

**Why both:** A high lift vs random can be entirely explained by entity-level risk (riskier entities are more likely to be in the condition group). The intra-group baseline neutralizes this. Conversely, an intra-group comparison without a random baseline doesn't tell you whether the effect is large or small in absolute terms.

### 3.2 Coverage before impact

Always measure how much of the population the phenomenon applies to before measuring how severe it is. This prevents deep-diving into effects that are real but practically irrelevant.

### 3.3 Define metrics before counting

Formalize what you're measuring — numerator, denominator, observation window, and a human-readable name — before writing any aggregation code. Ambiguous metrics lead to ambiguous results that require re-work.

### 3.4 Track what didn't work

Broken premises, failed approaches, and course corrections are first-class analytical findings. They should be documented with the same rigor as positive results, because:

- They narrow the solution space for future analysts
- They reveal assumptions that were invisible before testing
- They often point toward the correct framing (the failed metric's failure mode suggests what the right metric should look like)

### 3.5 Report results with support and sample size

Every metric should be accompanied by:
- The **value** (the number itself)
- The **support** (how many observations it's based on)
- The **baseline** (what it's being compared to)
- The **lift** (the ratio, when comparing to baselines)

A 6x lift based on 64 observations means something very different from a 6x lift based on 64,000. Without support, lifts are uninterpretable.

### 3.6 Anchor observations on the cleanest moment

When choosing the observation window for outcome measurement, anchor it on the most well-defined moment in the process — not on derived durations or fuzzy boundaries. A specific event timestamp (e.g., the start date of the secondary episode) is better than a relative window (e.g., "during the episode + 30 days after").

---

## 4. Anti-Patterns

Explicit traps that look correct but produce misleading results. An agent should watch for these actively.

### 4.1 Conditioned baselines

**The trap:** Comparing group A to a baseline that is implicitly conditioned on the same thing that defines group A.

**Example:** Measuring co-delinquency by sampling random pairs only from accounts that have DQ history. This oversamples heavy-DQ accounts that naturally overlap temporally, inflating the baseline and hiding the real signal.

**The fix:** Baselines should be drawn from the broadest defensible population, not pre-filtered to match the condition group's characteristics.

### 4.2 Symmetric metrics for directional phenomena

**The trap:** Using a symmetric measure (A and B co-occur within ±W days) when the phenomenon is directional (A triggers B).

**Example:** Pair-level co-delinquency shows lift below 1.0 because the symmetric metric conflates trigger-response pairs with temporal coincidence. The directional framing (B starts within W days of A ending) reveals the signal.

**The fix:** When the hypothesis is directional (cause → effect, trigger → response), the metric must reflect that directionality. A symmetric metric will always be diluted by the reverse direction and by coincidence.

### 4.3 Aggregate-level vs entity-level baselines

**The trap:** Comparing an effect group to a population-level baseline, then concluding the effect is causal.

**Example:** Escalation DQs are longer than the global average. But escalation accounts might just be inherently riskier. The global comparison conflates entity-level risk with the condition effect.

**The fix:** Always include an intra-entity baseline. Compare the same accounts (or same people, or same clients) under condition-present vs condition-absent. This is the confound-controlled baseline from Principle 3.1.

### 4.4 Mechanical confounds in observation windows

**The trap:** Longer conditions mechanically create wider windows, which mechanically capture more events.

**Example:** A 30-day DQ has a 30+buffer day observation window; a 5-day DQ has a 5+buffer day window. Longer DQs will accumulate more events even without any real effect. Comparing raw counts across different-duration episodes is misleading.

**The fix:** Either normalize by observation time (events per day), or anchor the window on a fixed event (see Principle 3.6) so all episodes have the same window length.

### 4.5 Accepting null results without challenging the metric

**The trap:** A metric shows no signal, and the analyst concludes "there's no effect."

**Example:** Symmetric co-delinquency shows no lift → "escalation isn't real." But the metric was wrong, not the hypothesis.

**The fix:** When results are null, always ask: "Is the metric faithful to the hypothesis?" A null result from a faithful metric is informative. A null result from a flawed metric is not — it's just an incomplete inquiry.

### 4.6 Over-parameterizing comparisons

**The trap:** Introducing too many dimensions (multiple windows × multiple categories × multiple baselines × multiple sub-groups) so that no single comparison has enough sample size, and the results become a wall of numbers.

**The fix:** Fix the secondary dimensions at reference values (e.g., one representative window) and vary only the primary dimension. Present the full parameterization as a table below the main result, not as the main result itself. The reader should absorb one chart and optionally dig into one table — not decode a matrix.

---

## 5. Human-AI Division of Labor

This methodology is explicitly collaborative. The human and the AI agent have complementary roles.

### The human provides:
- **Direction:** Which questions to pursue, in what order
- **Domain judgment:** "Those columns aren't reliable." "This filter makes sense." "That framing is off."
- **Reformulations:** When the agent's operationalization doesn't quite match the intent, the human redirects — often through examples, counter-examples, or reference tables
- **Go/no-go decisions:** Whether to deep-dive, pivot, or wrap up
- **Quality gates:** Reviewing results before they become deliverables

### The agent provides:
- **Computation:** Data loading, transformation, aggregation, visualization
- **Pattern recognition:** Spotting anomalies, distributional surprises, unexpected correlations in the profiling step
- **Methodology:** Proposing the next analytical step, suggesting baselines, raising potential confounds
- **Documentation:** Tracking the entire process, maintaining metrics, writing reports
- **Challenge:** When a result is surprising, the agent should surface why — not just present the number

### The interaction pattern

The most productive interaction is: **agent proposes, human redirects, agent executes, human interprets, agent refines.**

This is not a master-servant pattern. The agent should have an analytical opinion — "I think the right next step is X because Y" — and the human should feel free to override, redirect, or agree. The Socratic quality comes from the agent's willingness to propose *and* to be challenged, and from the human's willingness to let the agent run autonomously within a cycle while intervening at transitions.

**What the agent should NOT do:**
- Run 10 steps autonomously without checkpoint when the analysis is exploratory
- Accept ambiguous direction without clarifying ("analyze the data" needs scoping)
- Present results without interpretation ("here are the numbers" is insufficient — "here's what they suggest, here's what's surprising, here's what I'd do next" is the standard)
- Proceed after a surprising or null result without flagging it as a decision point

---

## 6. Context Bootstrapping

For the methodology to work across sessions and agents, persistent context must be maintained. This is the minimum set of files:

### Required context files

| File | Purpose | Primary author | Update frequency |
|---|---|---|---|
| `agents.md` | Entry point: who the agent is, what it handles, how to start | Human | Rarely (setup) |
| `claude.md` or equivalent | Agent-specific instructions: identity, scope, protocols | Human + agent | Occasionally |
| `environment.md` | Operating environment: paths, tools, access, dependencies | Human | When environment changes |
| `business.md` | Business domain context: what the company does, team structure, stakeholders, strategic framing | Human, refined by agent | As understanding deepens |
| `data.md` | Data model reference: tables, schemas, join keys, known quality issues, semantic notes | Agent, validated by human | After each data exploration |
| `memory.md` | Session memory: what was done, key findings, open threads, decisions made | Agent | Every session |

### Per-analysis context

| File | Purpose | Primary author |
|---|---|---|
| `analysis-[name].md` | Analysis-specific context: goals, current status, key metrics, intermediate findings | Agent |
| `[deliverable files]` | Reports, charts, data exports | Agent |

### Bootstrapping protocol

At the start of a new analysis:

1. **Read** agents.md, environment.md, business.md, data.md, memory.md — in that order
2. **Assess** what's already known and what's missing
3. **Create** the analysis-specific context file if it doesn't exist
4. **Confirm** the analytical goals with the human before starting computation

At the end of each session:

1. **Update** memory.md with what was done, key metrics, and open threads
2. **Update** data.md if new data understanding was gained
3. **Update** the analysis-specific context file with current status
4. **Generate** deliverables if the analysis reached a natural wrap-up point

### Memory vs. archive

Memory should contain the *current state* — what's active, what's pending, what was just done. Historical sessions should be summarized, not preserved verbatim. When memory grows too large, older sessions are compressed and moved to an archive that is loaded on demand, not at startup.

---

*This document is a living methodology. It should be updated as new analytical patterns, anti-patterns, and principles are discovered through practice.*
