## Tips
- Implement the data structures![](Pasted%20image%2020251119090031.png)
- <img src="Pasted%20image%2020251119090814.png" width="400"/>
- 

**Trees**
- Traversal
	- In order: left, root, right
	- Pre order: root, left, right
	- Post order: left, right: root
	- Level order: root, left, right, left.left, left.right, right.left, right.right

**Hash Map/Tables**
- Typical implementation
	- Hash -> mod -> linked list
	- Read at O(1) if no collisions, O(N) if full collisions
	- Good if good hash
- Balanced binary search tree impl
	- Read at O(log n)
	- Smaller/fragmented overhead table
	- ?Sorted by insertion by nature

**ArrayList**
- Resizeble
- O(1) append (amortized) and lookup
- In Python:
	- Roughly doubles on overflow
	- O(1) append (amortized)
	- O(n) insertion

**LinkedLists**
- Typically no wrapper, but can have
- Double or single
- O(1) insertions anywhere
- O(n) lookup
- "runner" technique (whatever)
	- keep many pointers
- head means the last element

**Stacks and Queues**
- push, pop, is_empty, peek
- Queue = FIFO/LILO
- Stack = LIFO/FILO
- Stupid

**Tree**
- May or may not point to parent
- Does not need a root, in theory
- May have a wrapper, but typically not
- Binary tree: up to 2 children
- Binary search tree: first children < second children (for all levels and all nodes)
	- Clarify about repetitions
	- ![](Pasted%20image%2020251123110102.png)
- balanced" tree really means something more like "not terribly imbalanced:' It's balanced enough to ensure 0( log n) times for insert and find, but it's not necessarily as balanced as it could be.
- recursive fib = 2^n

**Recursion & Dynamic**
-  "Design an algorithm to compute the nth ..:; "Write code to list the first n ..:; "Implement a method to compute all..:; 
- Divide in subproblems
	- Bottom up: reduction
	- Top down: complex but can be easier to think - beware of overlaps
	- Half and half: sorting
- All recursion can be a iteration, thou It may be complex
- Memoization: cache results of repeated computations
- 








