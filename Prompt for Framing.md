
I work as an outsourced engineer in the ML/Analytics team of Akuvo, which is a company that provides a SAS platform for money lenders (e.g., banks) to expedite receivables/payments from the borrowers when they become delinquent (don't pay on time). 

I have a framing or theory, not sure that's the best way to call it, which goes as follows.

Minimally, Akuvo's clients (lenders), have two core business goals/functions: 
1.Lend money 
2.Receive it back with interest/profit 

On the lending side, the bank can, in theory, manage it's exposure by controling how much it lends and at what risk, so assessment of it's current porfolio risk profile (e.g., what % of receivables can I expect to receive) would be a key intel in supporting adjustments in lending policies and overall financial strategy – but, for now, this intel bucket is out of scope since it's not Akuvo's main mission and also because it's, potentially, a by-product/aggregation of receiving side. 
 
On the receiving end, the operation can be reduced to a cash flow optimization problem, i.e.,
 
maximize: cash flow = payments inflow - debt collection costs 
 
The operational lever is the set of debt collection actions, i.e., actions that can be performed against a delinquent borrower to motivate its behaviour (e.g., contact via phone or message), which incur debt collection costs and change the expected present value (EPV) of the payments inflow (i.e., recovery).
 
In a scenario where the debt collection cost are mostly fixed (e.g., 90% is payroll), then the optimization can be further reduced to recovery maximization.

The bottom line of this theory/framing is that the entirety of the Akuvo platform features could be reduced to an utopian cash flow optimization model, that would perfectly prescribe which actions should be undertaken, against which accounts/borrowers and when. This perfect model might not be technically feasible, but it is conceptually simple: prescribe actions to maximize recovery. I'm calling this The Big Problem.

The reason I believe this theory/framing is important is because it would provide a long term single guiding light to all ML/Analytics initiatives and the team as whole.

Bellow is a list of additional technical insights I perceived after working 3 months here:
- The Big Problem is a rabbit hole: trying to solve it now would entail an indefinite consumption of resources while, at the same time, making other initiatives potentially redundant or with duplicate work at minimum.
- The Prediction Metamodel: the way I see it, a prediction model of sorts, or a set thereof, would be a key component in any attempt at solving The Big Problem. Regardless of what any model predicts, for an optimal solution, they would have to use the same set of features, e.g., account/person information, payments history, delinquency episodes, activities/actions history, calendar features, external features (e.g., economy indicators). Meaning, once we have a high quality complete set of features, and a model optimized for any particular output, then adding new outputs or models is close to trivial, and that approach is better than to have several initiatives working of different models/outputs with partial and low quality datasets. I.e., having one superb model for a particular prediction/output is much better than having several mediocre models doing several types of predictions.
- The data is the critical/strategical asset, not the models: 

any solution to the Big Problem

My current challenge is to find a way to present this to the leadership and teammates in a sensible but influential manner. Bellow is some additional context:
- The ML/Analytics team is composed, including me, of 4 outsourced engineers from a consulting company called Janea 
- I was recently hired by Janea and assinged to Akuvo (3 months), as a Senior ML Enginner
- The team already has technical leader, that has a more pratical/operational drive and doesn't seem give much importance to more tactical or strategical contributions, and actually sees them as slight oversteps - the same hold for the other 2 engineers (senior level).
- On the Akuvo's side, the leadership/stakeholder team is composed of the Chief Data & Risk Officer (CDO), which has a more commercial and feature-driven mindset, and contributes mainly by broadly defining goals/features and priorities. Under him, there is the VP of Analytics and Intelligence (VP), which contributes in explaining and voicing the user's needs and use cases, and is a smart and tech-savvy guy.
- The leadership meetings follows no particular agenda, and my perception is that there is no particular strategy in place, much less a technically sound one, and the modus operandi is to work towards the product features most appealing at the moment, defined as we go.
- There are no ToDo applications, Sharepoint/Teams channels, emails or any type of formal controls
- Playbooks


- The ML/Analytics team is outsourced to a consulting company called Janea, which is where me and th