
The takeaways is: having an optimize workflow is very impactful. Things should agile on the prototyping/experimentation phase, so it's important to have good IDE and readily available data, i.e., Synapse is not good for that and the Data Lake is too raw.

CONVENTIONAL SOFTWARE CODING -> PRESCRIPTVE
UNDERSTAND -> DESIGN -> IMPLEMENT -> TEST
Usually:
	The data model is arbitraly set and known a priori
	Transactional coding: handles 1 row at time
	Tests are done with handpicked cases
	Deterministic: predictable sequence of events


ML/ANALYTICS CODING -> ITERACTIVE/EXPLORATORY
UNDERSTAND -> HYPOTHESISE (DESIGN) -> EXPLORE (TEST) -> CONSOLIDATE (IMPLEMENT)
UNDERSTAND -> HYPOTHESISE (DESIGN) -> EXPLORATORY CODING -> DESIGN -> IMPLEMENT -> EVALUATE -> TEST
Usually:
	The data drives the design and it's unkown a priori
	It's unkown what needs to be build or if it's feasible
	Produces a LOT (~50%-80%) of code that will never see the light of day (i.e., go to prod)
	But that was crucial for the development of the remaining 20% of code
	Caothic: impossible to predic downstream events
	

HIGHLY HIGHLY ITERACTIVE

ANALYTICAL/EXPLORATORY WORKFLOW
INITIAL HYPOTHESIS, PREMISSES AND QUESTIONS
-> HAVE QUESTION 
-> WRITE EXPLORATORY CODE 
-> ANALYSE RESULTS 
-> WHICH RAISES ANOTHER QUESTION 
-> WRITE MORE EXPLORATY CODE
-> ANALYSE RESULTS
-> DOCUMENT FINDINGS
-> UPDATE ANALYTICAL GOALS
-> CONSOLIDATE CODE
-> RESTART


ML PREPING WORKFLOW
-> WRITE CODE TO SANITY CHECK THE DATA
-> WRITE CODE TO ANALYSE DISTRIBUTIONS
-> FOUND ISSUE
-> WRITE CODE TO INVESTIGATE RAW DATA
-> ...

