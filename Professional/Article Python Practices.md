I few weird practices I have after breathing Python for the last 7 years:



1. I avoid creating Classes and use functions that returns functions instead


Functions that returns functions - this probably has a cooler name in the Java folklore, but let's call it meta-functions for now. It's not a Pythonic practice, more likely a Javascript taint that rubbed off on me (on that planet, everything is a thing, the same thing, more like a thing-oriented language).

But there is a imperative for this to make sense: never change the state of the parent scope - if you really need to change the state, then just use Classes. Why is this advantageous?

1) Functions are easier to test and understand. If you stumble upon legacy code, yours or someone else's, and it's function, then it's easy to understand: just follow the code along to the end and that is it. But if it's a Class, now you have to search the entire codebase to see where that object was called from, which methods, and track how the state changed between calls - add reflections or dependency injection to the mix and you are in Hell. As for unit testing, it's much more direct and simple - hopefully that's self-evident.


2) Of course, the disavange is that functions can't hold state between calls




It's not that I never create Classes, is just that I avoid if possible.


2. Typehints + good code > docstrings/documentation

I rather read code than natural language - it's unambiguous - especially when the text is just a proxy for the code. Plus, code is never get outdated or out of sync like docs, by definition. 



3) Operational scripts instead of CLIs and configuration files


4) Everything is a package


5) Directory structure


6) Notebook aren't a canonical part of the codebase: Workbenches and Reports