
A methodology and skill instruction for developing and progressing Analytics initiatives in paired human-AI/Claude settings.

___
## What is Analytics?

Analytics is the broad function of providing intelligence, decision support or automations for business or institutions in the most general sense. Analytical endeavors can be broadly classified in four levels that loosely encode complexity, maturity and intelligence:
- **descriptive** analytics: describe current and historical observations, e.g., what happened in the past and how it is now?
- **diagnostic** analytics: measures correlations, investigates potential causations, identify trends and provide insights, limited to factual observations and data
- **predictive** analytics: estimate projections for the future or maps known information to unknown information estimates
- **prescriptive** analytics: suggests or enacts best course of action to achieve desired outcomes, limited by pre-defined constraints

Analytics initiatives can be further characterized by level automation:
- **experimental**, e.g., one-off analysis, prototypes, data exploration, sanity and premises checks, feasibility or risk assessment.
- **integrated**, i.e., the decision support system is captured in canonical software in a parametrized, standardized and reproductible way.
- **automated**, i.e., the system enacts real-world actions, partially or otherwise.

It's important to note the difference between AI and Analytics, which commonly leverages Machine Learning techniques and tools. While both share a common substrate of knowledge, methods and technology, they can be differentiated informally by the *type* of intelligence they provide.
- **AI**: provides **human-like intelligence**, e.g., vision, natural language
- **Analytics**: provides **computer-like intelligence**, e.g., crunching large tables of data, identifying numerical patterns

Naturally, the same way a human with a computer can provide Analytics capabilities, an AI agent can also provide Analytics capabilities.

___
## What are the aspirational goals of this methodology?

- Set up an environment where Claude can work as an interactive and iterative powerful data analyst, which can
	- understand and assess the business context, available data and environment tooling
	- elaborate and update a tactical plan for scaling, in phases, data volumes, segments, sample size and analytical or runtime complexities
	- refine high level analytical goals, or formulate them
	- describe an initial plan for an analytical inquiry, given limited context on the data distributions and specificities 
	- analyse the data, interpret results, refine questions, highlight insights, advance to the next or new question, get feedback when available, and iterate
	- wrap up the analytical inquiry when satisfied (or deemed infeasible) and reevaluate the procedures and results, given the new understanding and context
	- suggest next steps and ideas, either as natural follow ups of the current analytical theme or linked to the broader set of business needs and technical challenges
- all this, while
	- keeping track and documenting the entire thought process, rationale, insights, key metrics and questions
	- updating its external context databases	
	- incrementally generating and storing code or instruction scripts or snippets, for potentially future reference or reuse
- and being able to output
	- detailed or synthetic reports of the analytical theme or inquiry
	- static or interactive dashboards or infographics
	- specific charts or data cubes/exports
	- headline-driven presentations, self-explanatory for audiences with rich context.

___
## The methodology 

Currently this document and methodology covers a partial subset of the aspirational goals, and is composed of 4 main sections
- **Operating environment setup** for AI assisted Analytics workflows
	- **System requirements**
	- **MCP tooling**
	- **System-wide instructions and configurations**
- **Context bootstrapping** for specific initial contextualization
- **The core methodology**, i.e., the Socratic approach to Analytics
- **Deliverables** of Analytics workflows
	- **Typical ontology**
	- **Specific instructions**


___
## Operating environment setup

### System requirements
- AI agent: Claude
- MCP: command line; filesystem
- runtime: Python
- (system-wise analyst agent instructions?)

> Instructions for Joane: this section is very embryonary still

## Context bootstraping


 - agents.md: entry point for any agent
 - claude.md: instructions for the analyst Claude agent
 - enviroment.md: information about the operating environment (e.g, paths)
 - business.md: context storage about the data, mainly updated by the agent
 - data.md: context storage about the data, mainly updated by the agent
 - analysis-[name].md: for storing analysis-specific context, mainly updated by the agent


> Instructions for Joane: this section is very embryonary still, help me elaborate and detail it. For example, should we include instructions similar to Gaia's agent blueprint, like memory and stuff?


## The core methodology of analysis


> Instructions for Joane: here goes the main approach has you described

## Deliverables

### Typical ontology

The conclusions of a data exploration/analysis session, can be presented in the following ways:
- a dashboard: mostly composed of charts without much explanatory text; usually interactive; can be multi-page; require prior context or training to be understandable
- a report: the opposed of a dashboard, as is mostly text supported by charts and tables; has a clear narrative structure; static; down-scroll; self-contained
- a data story: an in-between a dashboard and a report; has a narrative structure; static; might be self-explanatory given enough context of the reader, or it might require a live presentation; short texts, less paragraphs

## Specific instructions

### Default report generation instructions

1) Generate an **Detailed Report** as a self-contained Markdown file to serve as record/memory of the analytical process undertaken, including a brief context, the original set of goals/questions, the step-by-step methodology of questions, refinement, interpretation of results and highlight of  key metrics and insights supported by data, tables and numbers - followed by the next or new question. Make sure to include, distinctly, broken premises, course corrections and/or things we tried but didn't worked out and why. At the end include a section for key takeaways, and another for next steps and open questions. The audience is humans and limited context agents.

2) Generate an **Executive Report** intended for fast reading by humans, in a inquisitive narrative structure characterized by defined macro sections, interrogative (and potentially long) headlines, bullet lists, graphic elements, text highlights and short paragraphs. At the beginning give a very brief overall context and motivation, delineate the broad analytical goals and key questions, and list key additional context elements, limitations and premises. The core narrative structure should be similar to an iterative inquiry or dialogue, like the one we had when developing the analysis, having questions and resulting insights and key metrics as the first-class elements of the narrative structure, supported by visual elements like charts, tables and highlights. Paragraphs should be short and mostly be used to provided additional and optional context when necessary. Use bullet lists at will, they are a great cognitive vehicle for communication and thought. At the end, include a section for key takeaways,  learnings and challenged premisses, and finally next steps and questions. If necessary, include an Appendix for details omitted in the core narrative. The output should be a Markdown file that can have links to external assets, along with a Python script that generates all assets from source in immediate subdirectory named assets/, assuming all necessary dependencies are available in the active environment. The target audience are executives.

The files should be generated in the specific/current working directory derived from context and following the structure:
/MMDD Analysis Name/
/MMDD Analysis Name/MMDD Analysis Name - **Executive Report.md**
/MMDD Analysis Name/MMDD Analysis Name - **Analytical Report.md**
/MMDD Analysis Name/**assets**/ (for the assets and Python code)
/MMDD Analysis Name/**assets**/**build.py** 

If necessary, append a version number to the date prefix MMDD, e.g., MMDDv2

### Default file formats

- charts:  SVG directly or via Python and libs; or the default Chartjs/skill for inline display and attached data
- reports: Markdown or Jupyter Notebooks
- data cubes and exports: CSV (JSON or Excel secondarily)
- presentation and dashboards: Power Point or React

___
