

She is left joining Deliquency <- Account on `accountid` and date ranges - this could lead to several duplicated examples (some on train, some on test/val)
- It is ok, fixed by the groupBy
![](Pasted%20image%2020260113131449.png)


And some weird filtering - I'd be interested in knowing the % of each filtered out cohort and understand why they happen ()
- 151: in what scenario would `max`
- 152: she is using `event_duration_days` as labels some of the times


![](Pasted%20image%2020260113135512.png)

- left joins labels/Dq <- Account history
	- on Dq start date/time >= Account CDC start date/time
		- creates duplicates (solved later)
		- couldn't dqdays leak future information due to CDC imperfect timestamps?
	- 

Split with random accounts