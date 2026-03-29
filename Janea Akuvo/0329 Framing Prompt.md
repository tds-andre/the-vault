
## Prompt

I work as an outsourced IC engineer in the ML/Analytics team of Akuvo, which is a company that provides a SAS platform for money lenders (e.g., banks) to expedite receivables/payments from the borrowers when they become delinquent (don't pay on time). 

I have a framing or theory, not sure the best way to call it, which goes as follows.

Minimally, Akuvo's clients (lenders), have two core business goals/functions: 
1.Lend money 
2.Receive it back with interest/profit 

On the lending side, the bank can, in theory, manage it's exposure by controling how much it lends and at what risk, so assessment of it's current porfolio risk profile (e.g., what % of receivables can I expect to receive) would be a key intel in supporting adjustments in lending policies and overall financial strategy – but, for now, this intel bucket is out of scope since it's not Akuvo's main mission and also because it's, potentially, a by-product/aggregation of receiving side. 
 
On the receiving end, the operation can be reduced to a cash flow optimization problem, i.e.,
 
maximize: cash flow = payments inflow - debt collection costs 
 
The operational lever is the set of debt collection actions, i.e., actions that can be performed against a delinquent borrower to motivate its behaviour (e.g., contact via phone or message), which incur debt collection costs and change the expected present value (EPV) of the payments inflow (i.e., recovery).
 
In a scenario where the debt collection cost are mostly fixed (e.g., 90% is payroll), then the optimization can be further reduced to recovery maximization.

The bottom line of this theory/framing is that the entirety of the Akuvo platform features could be reduced to an utopian cash flow optimization model, that would perfectly prescribe which actions should be undertaken, against which accounts/borrowers and when. This perfect model might not be technically feasible, but it is conceptually simple: prescribe actions to maximize recovery. I'm calling this The Big Problem.

The reason I believe this theory/framing is important is because it would provide a long term guiding light to all ML/Analytics initiatives and the team as whole, as of right now I have a perception we are scrambling all in directions.

Bellow is a list of addional technical insights I perceived after working 3 months here:
- The Big Problem is a rabbit hole: trying to solve it now would entail an indefinite consumption of resources while at the same time making other initiaves redundant or with duplicate work at minimum.
- The Prediction Metamodel: the way I see it, a prediction model of sorts, or a set thereof, would be a key component in any attempt at solving The Big Problem. Regardless of predicted output, any model would, to an extent, use the same set of features, e.g., account/person information, payments history, deliquency episodes, activities/actions history
-  The data is the critical/strategical asset, not the models:  (tbc): poor export quality (how to quantify? relate it back to the LGM grid search experiment); inter-client variations; inter-client balancing; => build quality control system; => build feature store (shared datamarts really); => inter-client data variation assessment (client-specific treatments, normalizations or models)
- Capability Building (tbc): 4) capability building: neglected foundational work, shared data, shared apis, tools, conventions, standards, single source of truth
4) ontology/framework for Attributes (tbc):



My current challenge is to find a way to present this to the leadership and teammates in a sensible but influential manner. Bellow is some additional context:
- The ML/Analytics team is composed, including me, of 4 outsourced engineers from a consulting company called Janea 
- I was recently hired by Janea and assinged to Akuvo (3 months), as a Senior ML Enginner
- The team already has technical leader, that has a more pratical/operational drive and doesn't seem give much importance to more tactical or strategical contributions, and actually sees them as slight oversteps - the same hold for the other 2 engineers (senior level).
- On the Akuvo's side, the leadership/stakeholder team is composed of the Chief Data & Risk Officer (CDO), which has a more commercial and feature-driven mindset, and contributes mainly by broadly defining goals/features and priorities. Under him, there is the VP of Analytics and Intelligence (VP), which contributes in explaining and voicing the user's needs and use cases, and is a smart and tech-savvy guy.
- The leadership meetings follows no particular agenda, and my perception is that there is no particular strategy in place, much less a technically sound one, and the modus operandi is to work towards the product features most appealing at the moment, defined as we go.
- There are no ToDo applications, Sharepoint/Teams channels, emails or any type of formal controls
- Playbooks (tbc)



## Drafts and Random Notes


1) the big problem
2) metamodel
3) 

concerns
-overstepp
-fall short
-abstract, long

Score -> UI
	-> Dashboard
	-> Other Scores
	-> Playbook

capability building / shared assets

data quality / access /

driving features

on the limit, models are commodity, the asset is data

-----


Notes from Akuvo platform presentation 

ai data query (offline)
virtual collector voice
workspace assistant
?? assistant
account assistant

-----

issue with client balancing

--------
https://www.linkedin.com/in/andr%C3%A9-teixeira-dos-santos/

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



Priorities: Confidence, Support, Lift, 
For each metric:
	- what are we trying to convey?
	- how is it computed (in natural language, but also formally would be a plus)
	- sanity check: relate the metrics with its main components/columns


For Support:
	table with 

inter-channel distance

histogram per channel

predictive x descriptive

trending

bias in VC channels - maybe score-analysis just for VC

virtual collector data

click event

replies


usage: primary (ui and playbook); internal (feature store

ui is as important


value
dashboard
ui
playbook

hybrid playbooks

TRANSFER LEARNING
huge database of animals (MACU)
small database of insects 

approach 1: client balancing via sample weights
approach 2: transfer learning
it's like R&D

Operational Research/Analytics/Statistics/Data Science/ML/Business Intelligence
Data Mining, Metaheuristics, Information Theory, Control Systems


Typicall Human Intelligence not= Intelligence

Machine-Like Intelligence   / Human-Like Intelligence
Analytics                     Computer Vision, Language, Reasoning

composito attributes