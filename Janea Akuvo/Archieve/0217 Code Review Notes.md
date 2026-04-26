
[Akuvo Max Days DQ Model](https://web.azuresynapse.net/en/authoring/analyze/notebooks/AKUVO_PDD_Training_Review?workspace=%2Fsubscriptions%2F97c8cfd2-ad71-4d63-9895-66b03e663bf6%2FresourceGroups%2Frg-prod-data-lake-eastus2%2Fproviders%2FMicrosoft.Synapse%2Fworkspaces%2Fsynw-akuvo-prod-data-lake)  
Code by Filip, review by André  
17 Feb 2026  

___


### Note 1 - DQ Data
![alt text](image.png)
- How many rows are being impacted?
- Why missing `dq_days` exists? Isn't this an indicator of a underlying data quality problem that could impact the model's performance?  

___

### Note 2 - Past Stats

![alt text](image-1.png)

- Why only DQs over 30? Is it for predicting better on higher bins?
___

### Note 3 - Code Style

- Good/usefull separation between functions vs "main"  
- Interesting practice of typed variables

___

### Note 4 - Code Style

![alt text](image-2.png)
- Why elifs and not separate methods? 
- Also, could standardize **id** columns, i.e., `client_id` -> `clientid` like in `accountid`  
- The context stuff and log on exception would be better on a decorator - seem to be too much defensive and management code versus actual data processing code (see also `load_delta_multiple_clients`)

___

### Note 5 - Assignment Order Optimization [minor issue]

![alt text](image-3.png)

Not sure if Spark will optimize that, but if not:
 ```
w_part = Window.partitionBy(*keys)
w_asc = w_part.orderBy(F.col("startdate").asc())
w_prior_rows = w_asc.rowsBetween(Window.unboundedPreceding, -1)
 ```
Also, why `keys` are a parameter? Isn't it constant?

 
___

### Note 6 - Train/Test/Val split

![alt text](image-4.png)

Potential leak between train and validation sets due to repeated examples

___

### Note 7 - Comments/Clarification [minor issue]

![alt text](image-5.png)

Does `VectorAssemble` scales numeric variables?

___

### Note 8 - Hyperparameters

![alt text](image-7.png)

- Number of leaves seems high. I've trained with 16, 32, 64 and 128, and, if remember correctly, 16 was too low (poor training set performance) and 128 was too high (poor validation set performance). I'll double check it and also try with 365.
- Bagging frequency seems too low and, as I understand it, it will slow down training a lot.

### Note 9 - Duplicates Sanity Check

- I will do a sanity check for duplicates in the tables account, accounttypes and delinquencies - I don't trust the source data too much.



### Nota 10 - Model Tracking [minor issue]

![alt text](image-8.png)

I think it would be usefull to also save the `ctx` variable, to give some lineage to the current model.

### Note 11 - Validation [important]

![alt text](image-9.png)

- With this split there is the theoritical issue of feeding the model information from the future thus making it overfit/memorize some instances based on the lags/history.
- Also, where is the test dataframe used? I.e., how/where evaluation happens?