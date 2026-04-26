

1) get it working, 2) automate and integrating it
2) anushkhas report too big

Would make sense to have different models for different history sizes?


 normalcy_score            asdf
initialbalance_score       does the intra-DQ payments match ???
lastbalance_score          does the intra-DQ payments match ???
dqdays_score               asdf
dqamount_score             asdf
past_initialbalance_score  asdf
past_lastbalance_score     asdf
						   asdf


PRDOC COLLABORATION BRANCH - SCORES FOLDER

My Goals:
	- Build tools and data assets
		- Akuvo Analytics
			- Dataset lineage tracking
			- Experiment analytics
		- Scores Datamart
			- Approaches Sandbox
	- Set tone and processes
		- Special Ops and Ground Invasion Teams

Me: 
	I can't force people to use my stuff
		Also, it's not good to become a bottleneck
	However, the datamart is a must
	The data quality system is independent
	The software lib would be a byproduct, use if you want
	
Key Takeaways
	- Data is Trash => tool and assets
	- Cycle time expectations are to high => team split
	
Outline:
	Here is the best model
	Here is how I did it
	Here why is it better => data quality
	Here are my other finds about data quality
	Here is the size of the problem (primary drivers) => team split
	
	







model 1 => trained on all bins

model 2 => trained on 10+ bins

all bins testset => model 1

10+ bins testset => model 2




remove 10- days predictions, remove 10- days actuals





Regarding the feature report for the clients, here is the outline I thought off;

1) Predictive Features Introduction: Max Days DQ and Duration of Delinquency










last N dqdays could be a magnitude vector between (0, 0) and normalized (distance, value)

features:
	static account/loan features
	payments: last N and/or stats
	dqdays: last N and/or stats
	dqamount: last N and/or stats


example:
	peak dq days: static features ; calendar features ; dq index ; last N payments ; payment quality ; last N dqdays ; dqdays quality ; last N dqamount ; dqamount quality ; last N dq duration
	lags:
		distance
		index
		dqduration stats/quality within
		dqdays stats/quality within
		dqamount stats/quality with
		payments stats/quality within	


static features ; payment stats within; dqdays stats within ; dqamount 

canonical examples with tainted histories

dqamount_quality = iou * (1 - nofissues/n)
dqdays_quality   = iou * (1 - nofissues/n)
payments_quality
dq_quality
acc_quality



Rembember when I admired Arruda for getting into systems and just understanding everything. I feel I've reached that level now.


fact: everyone is fucking retarded
	they require repetition and oversight, like a child


it's like components with stocasthic behaviour
the goal is to reduce variability around a target value


what motivates human behaviour to do as told?
	fear/sticks
		lose bonus
		be fired => have more people
		
	reward/carrots




CANVAS
max dq days > duration

	

	





17197768730

special ops team x ground invasion team

Guarda:

We need a place to store files, that is all


congrats, 1000 lines, only 2 with error
show me your workflow with AI
commit then delete unused pieces of code, git is there for a reason
be organized, is really easy to mess up, makint it organized prevents it
sample data and test it

code organization: 
	it is fine to have dozens of notebooks
		there is an alternative but we not quite there yet
	cpy and past is fine, but import mature pieces of code

sanity check results of data processing steps
	it is important to keep dataset representative (5% is a problem)
	how many rows were read
	how many rows were removed

separate data processing from training


be mindfull on how you split your data
	test is not validation
	keep it fair and representative
	no need for huges volumes in validation
	cross validation is the gold standard

evaluation:
	1) first thing: always check train x validation loss
	2) have one main reductible statistic and complement it with acessories
	3) look for bias
	4) compare with other varibles
	


code organization - best practices
data preparation
features/training preparation
training
basic evaluation
extended evaluation



speed optimization
	CLI helper library overhead


















-code review code anushkha
-model & pipeline operationalization
-data quality
-data preparation

1) find the problem in nb 3

2) show data quality issue

3) show baseline model

4) present life cycle










