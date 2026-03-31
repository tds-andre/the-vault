# CBRS Analytics Widgets

  

This repository contains Javascript components (Widgets) that encapsulates chart+data access logic for CBRS data.

  

See [demo.html](demo.html) and [demo.js](demo.js) for usage.

  
  

## Widgets List

  

### High-Level Widgets (Fixed Chart & Data)

Charts tunned for a specific dataset
- Chart type is fixed
- The data/metric is fixed
- Data is fetched internally (async function)  

| Function Name         | Parameters             | Endpoint                      | Descriptions                                                                                                            |
| --------------------- | ---------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| CbsdOverTime          | divId, options         | count/cbsd/history            | Timeseries of number of CBSDs. Can be filtered throught options.query                                                   |
| CbsdChannelHeatmap    | divId, cbsdId, options | history/cbsd                  | Heatmap of channel utilization by a specific CBSD                                                                       |
| ChannelUtilization    |                        | count/grantPerChannel/history | WIP                                                                                                                     |
| PalCbsdActivity       | divId, palId, options  | history/pal                   | Number of active CBSDs over time for a specific PAL, with additions/removals as a bar sparkline                         |
| PalCbsdActivityShadow | divId, palId, options  | history/pal                   | Alternative to above. Number of active CBSDs over time for a specific PAL, with additions/removals as a confidence band |


### Mid-Level Widgets (Fixed Chart, Variable Metric)

Charts bound to a standard data format provided by the endpoint
- Chart type is fixed
- Variable data/metric
- Data is fetched internally (async function)

| Function Name              | Parameters                       | Endpoint               | Descriptions                                                                                                                     |
| -------------------------- | -------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| History_LineChart          | divId, metric, options           | count/{metric}/history | Timeseries of given metric as lines. Supports multiple series (multiple lines)                                                   |
| History_ScatterChart       | divId, metric, options           | count/{metric}/history | Same as LineChart but with points only.                                                                                          |
| History_StackedAreaChart   | divId, metric, options           | count/{metric}/history | Timeseries of given metric as a stacked area chart.                                                                              |
| History_StackedBarChart    | divId, metric, options           | count/{metric}/history | Timeseries of given metric as a stacked bar chart.                                                                               |
| History_WithPie            | function, divId, metric, options | count/{metric}/history | Adds a pie chart to the right to any of the History_* functions with the lastes value of the history.                            |
| History_StackedAreaWithPie | divId, metric, options           | count/{metric}/history | Same as History_StackedAreaChart but with an added pie chart to right with the lastest values. Syntax sugar for History_WithPie. |

| Function Name              | Parameters                       | Endpoint               | Descriptions                                                                                                                     |
| -------------------------- | -------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Latest_BarChart            | divId, metric, options           | count/{metric}/latest  | Simple bar chart with key-value pair. Single series with categories on X and values on Y                                         |
| Latest_PieChart            | divId, metric, options           | count/{metric}/latest  |                                                                                                                                  |


### Low-Level Widgets (Fixed Chart, Data as Parameter)
| Function Name  | Parameters     | Data Format                                         | Descriptions                                            |
| -------------- | -------------- | --------------------------------------------------- | ------------------------------------------------------- |
| Timeseries     | divid, dataset | key-value series with one of the keys being "dates" | Line timeseries chart. Supports multiple series/lines.  |
| PieChart       | divId, dataset | key-value pairs                                     | Pie chart representing key-value pairs                  |
| ScalarBarChart | divId, dataset | key-value pairs                                     | Bar chart representing key-value pairs                  |
| SeriesBarChart | divId, dataset | key-value series                                    | Bar chart with multiple series (colors)                 |
| BarChart       | divId, dataset | key-value pairs or series                           | Proxy/syntax sugar for ScalarBarChart or SeriesBarChart |
