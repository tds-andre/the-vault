# Building Akuvo's Capability in Analytics - Essay
André Teixeira dos Santos - Niterói, RJ, Brazil - April 7, 2026

## What is this document about?
This is an all-encompassing and extensive essay about my vision for maturing and increasing Akuvo's capability to deliver intelligence on the short and long term.

## Who am I and who is Akuvo?
I work as an outsourced IC engineer in the ML/Analytics team of Akuvo, which is a company that provides a SAS platform for money lenders (e.g., banks) to expedite receivables/payments from the borrowers when they become delinquent (don't pay on time).

## The Core Idea
I have a framing, or theory, not sure the best way to call it, which goes as follows.

Minimally, Akuvo's clients (lenders), have two core business goals/functions: 
1.Lend money 
2.Receive it back with interest/profit 

On the lending side, the bank can, in theory, manage it's exposure by controling how much it lends and at what risk, so assessment of it's current porfolio risk profile (e.g., what % of receivables can I expect to receive) would be a key intel in supporting adjustments in lending policies and overall financial strategy – but, for now, this intel bucket is out of scope since it's not Akuvo's main mission and also because it's, potentially, a by-product/aggregation of receiving side. 
 
On the receiving end, the operation can be reduced to a cash flow optimization problem, i.e.,
 
maximize: cash flow = payments inflow - debt collection costs 
 
The operational lever is the set of debt collection actions, i.e., actions that can be performed against a delinquent borrower to motivate its behaviour (e.g., contact via phone or message), which incur debt collection costs and change the expected present value (EPV) of the payments inflow (i.e., recovery).
 
In a scenario where the debt collection cost are mostly fixed (e.g., 90% is payroll), then the optimization can be further reduced to recovery maximization.

The bottom line of this theory/framing is that the entirety of the Akuvo's platform features could be reduced to an utopian cash flow optimization model, that would perfectly prescribe which actions should be undertaken, against which accounts/borrowers and when. This perfect model might not be technically feasible, but it is conceptually simple: **prescribe actions to maximize recovery**. I'm calling this **The Big Problem**.

## Why does it matters?

The reason I believe this theory/framing is important is because it would provide a long term guiding light to all ML/Analytics initiatives and the team as whole, as of right now I have a perception we are scrambling all in directions trying to deliver intelligence and prove the platforms/teams worth, but without much value-add.

Bellow is a list of additional technical insights I perceived after working 3 months here.
- **The Big Problem is a rabbit hole**: trying to solve it now would entail an indefinite consumption of resources while at the same time making other initiatives redundant or with duplicate work at minimum; it's not really "solvable", we can only get closer to it; it's really hard to tell how much time and effort it would take; the path forward is highly exploratory and trial-and-error based, more like and R&D initiative; there is not guarantee on the outcome;
- **Solving for a generic predictive metamodel would solve The Big Problem**: the way I see it, a prediction model of sorts, or a set thereof, would be a major component (80%) in any attempt at solving The Big Problem. Regardless of predicted output, any model would, to an extent, use the same set of features, e.g., account/person information, payments history, deliquency episodes, activities/actions history; so we could further simplify the Core Idea and The Big Problem to be a super predictive meta model; i.e., encodes everything, predicts anything; with cavets of course as this is a simplification; but the corollary is that now we just need to solve the prediction metamodel;
-  **Akuvo's data is the critical/strategical asset, not the models**: currently the dominant logus is platform, product and feature driven, i.e., how many more bullets points can we add the the product/pricing page, what can we charge an extra for; if Akuvo is to position itself properly against the massive upcoming waves of AI competitors, it needs to shift it's prioritization to building a rich data ecosystem - that is the strategic differentiator on the long run, not shinny AI-labeled features and models
- **The Playbook: a feature or a liability?** The core component of the Akuvo plataform and key selling point is The Playbook: a prescriptive and customizable set of rules that steers each delinquency episode through its life cycle until curing or otherwise, by enacting automated actions (e.g., voicemail) or dispatching to human collectors (e.g, outbound call); if we had the perfect AI, would that still be a component? For example, a perfect AI could steer each episode individually with no prior set of rules (except maybe a few enforced guardrails or policies). The Playbook centrality might obscure the vision for what a real AI-driven/AI-first product would look like

___ 

## Instructions and Questions for Joane
- The lines above are mostly canonical, i.e., complete narratives that, of course, could use improvements and better structure
- The next sections however are mixed, can be topical (things I would like to address and integrate), drafts (thoughts or things for later, that we might integrate or not) or something else; but are relevant context
- Overall I would like your help to:
	- ingest and understand the context
	- review and criticize elements
	- elaborate and expand on topical elements
	- propose an integrated view and structure of the document
	- ask clarifying questions if needed
- Anything I missed? What are your thoughts?

___

## Key Topics
*Things I would like to cover; main components*

- **The Core Idea**
	- The Framing and Reductions
	- The Big Problem
	- The Meta Model (better name?)
	- Data is the Asset (not models, features or The Playbook)
- **Current Issues**
	- **Impractical data ecosystem (very slow development)** for analytical workflows, professional or otherwise; 
		- Development interface equivalent of punch-cards (Synapse)
		- Heretic code duplication
		- No single source of truth; no lineage tracking
		- Unnecessarily voluminous and detailed (wide)
		- IDE/VSCode unfriendly
		- Attritive transition from research/development to production
		- Slow research/development workflows
	- **Poor quality data**; overall; missing value; irregular presence; varying onboarding dates; bulk loads data distort dates
		- **Case study: The LGBM Grid Search for Max DQ Days Prediction** 
	- **Heterogeneous data**; currently most data comes from exports controlled by the client and not from internal transactional systems; which means the same tables/columns can have different data patterns, distributions and meaning; and lot's of evidenced of that have been observed informally, by accident; if models are to be trained using the integral data, the data needs to be normalized for better or even feasible model
		- **Client balancing**; clients have wildly different data volumes and training model on the integral dataset will produced unbalanced results
	- **Non-existent power-user data access**; relies on team manual exports
	- **Erratic development cycles**, poor management, poor quality deliverables and poor value-add
- **How to address** -> Capability Building Plan: Data is King
	- **Feature Store**: design, develop, build and document analytical data assets;  initiated: designed, implemented and leveraged by me; non-mandatory
	- **Analytical Toolkit**: design, develop and publish Python packages with common patterns and tools useful in analytical workflows in order to promote reusability, speed, standardization and quality; non-mandatory
	- **Data Quality Control System**: design, develop and operationalize a rules-based system to evaluate data quality, integrity and normality; tag it accordingly; fix, discard or dispatch bad data for human review; potentially could be turned into a learning system in a future version
	- **Data Heterogeneity Analysis**: (client-specific treatments, normalizations or models) conduct a deliberate analysis to assess the data heterogeneity across clients, e.g., unbalances, variance in distributions, missing values, correlations, homoscedasticity; in order to objectively evaluate how much the data differs, where; what is normal; are there clusters; the results would inform the development (or not) of:
		- **Data Balancing and Normalization System**: system to segment/qualify/classify and homogenize the data
	- **Data Access: Showcase of Claude-empowered Data Analytics**
	
		

## The Rhetorical Challenge: How to present a plan for the stakeholders?
*Social dynamics context*

My current challenge is to find a way to present this to the leadership and teammates in a sensible but influential manner. Bellow is some additional context:
- The ML/Analytics team is composed, including me, of 4 outsourced engineers from a consulting company called Janea 
- I was recently hired by Janea and assinged to Akuvo (3 months), as a Senior ML Enginner
- The team already has technical leader, that has a more pratical/operational drive and doesn't seem give much importance to more tactical or strategical contributions, and actually sees them as slight oversteps - the same hold for the other 2 engineers (senior level).
- On the Akuvo's side, the leadership/stakeholder team is composed of the Chief Data & Risk Officer (CDO), which has a more commercial and feature-driven mindset, and contributes mainly by broadly defining goals/features and priorities. Under him, there is the VP of Analytics and Intelligence (VP), which contributes in explaining and voicing the user's needs and use cases, and is a smart and tech-savvy guy.
- The leadership meetings follows no particular agenda, and my perception is that there is no particular strategy in place, much less a technically sound one, and the modus operandi is to work towards the product features most appealing at the moment, defined as we go.
- There are no ToDo applications, Sharepoint/Teams channels, emails or any type of formal controls
- Good news is: recently, I've asked Guarda to spearhead this front and he accepted and appreciated it.

My concerns/fears are:
- To not be understood
- To be disqualified or meet with skepticism
- To be seen as arrogant, pompous or abstract
- For the presentation(s) fall flat/short
- To not spin-off concrete actions


___
## Ideas and Drafts
*For extra context, no need to integrate those*

### Scores Ontology
*(tbc, placeholder)*
[0325 Random Notes, Attributes Ontology](0325%20Random%20Notes,%20Attributes%20Ontology.md)
### Analytics Workflow
*(tbc, placeholder)*
[0329 ML x Conventional Software workflows](0329%20ML%20x%20Conventional%20Software%20workflows.md)
### The Score Feature Package: what a Score fully-fledge deliverable could look like?
- A **metric**, or set thereof, made available internally (e.g., features store, datamarts, ADSs) and/or as Playbook variable
- How is it incorporated (or not) in the UI
- With formal **technical documentation** of concepts, formulas and lineage (and associated commercial docs, but that would be another team)
- Dashboard(s) in the platform
- One-time or regular reports (e.g., via email), possibly to market its value
- Playbook recommendations or examples

### Embedded AI vs AI-friendly (dangerous argument)
comments about the embedded assistants: it's a stupid idea, most AI's don't need specific instructions to do that - the questions is: how to make the platform AI friendly, and not how to embedded our own AI into it (dangerous idea)

### Draft of Presentation Script

lend money
receive it back

everything else is acessory
2 feed into 1, e.g., risk exposure
focus on 2

inflow cashflow lines / receivables = exposure
for the client: what actions can I take to maximize capture (discounted at present value)
now we could take costs into account as they relate to action
if fixed >> variable then is just a matter of capture optimization

so Akuvo the Platform success can be reduced to a single scalar number that ties all the way down to operation: receivables captured
other business keymetric would be profit, which isn't really true, too generic and hard to relate to operations

