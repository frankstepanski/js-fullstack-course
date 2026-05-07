# Data Structures & Algorithms  

## What Are Data Structures?

**Data structures** are ways to organize, store, and manage data in your program so that it can be used effectively. They help you decide **how** and **where** data lives in your app — and how to access or modify it when needed.

Think of data structures like **different containers for different jobs**:
- A list of names → maybe an **array**  
- A lookup of users by ID → an **object (dictionary)**  
- A history of actions → maybe a **stack**  
- A queue of pending API requests → a **queue**  
- A tree of comments → a **tree structure**

Just like tools in a toolbox, different data structures solve different problems better.

### Why They Matter

- **Faster Processing**  
  The right structure makes your code run faster. Searching for a value in an unsorted list is slower than using a well-organized object or tree.

- **Scalable Architecture**  
  As your data grows (from 10 items to 10,000+), good data structures help your app stay fast and efficient.

- **Easier Data Management**  
  Adding, deleting, updating, and searching becomes easier and more predictable when you choose the right structure.

- **Real-World Relevance**  
  You already use data structures every day in JS:
  - Arrays: `.map()`, `.filter()`, `.reduce()`
  - Objects: JSON APIs
  - Sets & Maps: deduplication, fast lookup
  But there’s more beneath the surface—linked lists, trees, graphs, etc., all appear in real systems.

- **Essential for Interviews**  
  Most coding interviews focus on how you use data structures to solve problems (like finding duplicates, reversing a list, organizing relationships, etc.).

### Common Real-World Examples

| Use Case                          | Structure Used         | Why It Works Well                             |
|----------------------------------|------------------------|-----------------------------------------------|
| Storing a list of products       | Array                  | Easy to loop through, sort, and display       |
| Managing UI state in React       | Object / useState Hook | Key-value structure fits most component state |
| Finding a user by ID             | Object / Map           | Constant time lookup                          |
| Navigating nested comments       | Tree                   | Parent-child relationships                    |
| Undo/redo history                | Stack                  | Last-In-First-Out behavior                    |
| Background tasks or animations   | Queue                  | First-In-First-Out timing control             |
| Routing between pages or APIs    | Tree / Graph           | Branching paths and links between nodes       |

## What Are Algorithms?

An **algorithm** is a step-by-step set of instructions for solving a problem or completing a task.  
It’s like a recipe in a cookbook: it tells you what steps to follow, in what order, to get the desired result.

> ✅ You’ve been using algorithms without realizing it — every time you use a `for` loop, `.sort()`, or `.filter()` in JavaScript, you’re working with algorithms.

### Why Are Algorithms Important?

- **They solve problems efficiently**  
  Two people might solve the same problem differently — the one with the better algorithm will do it faster and with less memory.

- **They power everyday software**  
  Algorithms sort your emails, recommend your next YouTube video, power GPS routes, secure your passwords, and more.

- **They're everywhere in development**  
  Whether it's backend servers processing millions of records, or frontend apps rendering UIs faster — algorithms are behind the scenes.

- **They are central to coding interviews**  
  Almost all technical interviews use algorithmic questions to evaluate how you think, plan, and optimize.

### Examples of Common Algorithms

| Task                                | Algorithm Type            | JavaScript Example                          |
|-------------------------------------|----------------------------|---------------------------------------------|
| Sort a list of numbers              | Sorting                    | `array.sort()`                              |
| Search for an item in a list        | Searching                  | Linear Search / Binary Search               |
| Avoid duplicates                    | Set-based or frequency map | `new Set(arr)` or object counting           |
| Reverse a string                    | Two-pointer / built-in     | `str.split('').reverse().join('')`          |
| Find the max/min value              | Iteration + comparison     | Loop through, track largest/smallest        |
| Calculate a factorial               | Recursion or loop          | `function fact(n) { return n * fact(n-1); }`|

### Algorithms vs Data Structures

Think of it like this:

- A **data structure** is the container (e.g. array, object, list)
- An **algorithm** is the process (e.g. sort, search, insert)

**They work together.**  
The choice of data structure often affects the performance of your algorithm.

Example:
- Searching in an array (O(n)) is slower than searching in a hash map/object (O(1))  
- Sorting an unsorted list of data before rendering improves UX

Different algorithms lead to different results and efficiencies.

## Big-O Notation

**Big-O Notation** is a way to describe how an algorithm’s performance changes as the size of the input grows. It helps us analyze two things:

- **Time Complexity** — How long it takes (number of operations)
- **Space Complexity** — How much memory it uses



It's not about **how fast** something runs in seconds — it's about **how the number of operations grows** as you feed in more data. It’s a way to think about **efficiency** and **scalability**.

### What Time Complexity Really Means

**Time complexity** is the amount of computational work your algorithm does, measured in terms of how many steps it takes as your input grows.

- It doesn’t measure “real time” (like milliseconds) — it measures how the work grows.
- It ignores machine speed or exact timing and focuses only on how *the number of steps* increases.
- It’s a rough estimate of “how expensive” an operation is.

### 🧮 How Is It Calculated?

Imagine this loop:
```js
for (let i = 0; i < n; i++) {
  console.log(i);
}
```
If `n = 10`, it runs 10 times.  
If `n = 1000`, it runs 1000 times.

We say it has **O(n)** time complexity — the number of operations grows linearly with `n`.

If we added a nested loop:
```js
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    console.log(i, j);
  }
}
```
This runs `n * n` times → that’s **O(n²)**.

### What Space Complexity Means

Space complexity describes how much **extra memory** is needed for the algorithm to run.

- Temporary arrays, objects, recursion stack — all count
- We usually measure **extra** space, not the input itself

Example:
```js
function countItems(arr) {
  let count = 0;        // O(1) space
  for (let i = 0; i < arr.length; i++) {
    count++;            // O(1) time per loop
  }
  return count;
}
```
This has:
- **Time complexity:** O(n)
- **Space complexity:** O(1) (just one variable)

But this version:
```js
function doubleItems(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2);
  }
  return result;
}
```
Has:
- **Time complexity:** O(n)
- **Space complexity:** O(n) — we're building a new array

### ⚖️ Time vs Space: A Balancing Act

Often, optimizing one means sacrificing the other:

- Faster algorithms may use more memory.
- Memory-efficient algorithms may take longer.

For example:
- Storing precomputed results can improve speed (time) but increases memory usage (space).
- Using recursion might be elegant and fast, but uses more stack space.

Big-O helps you understand this tradeoff and decide what's best for your use case.


### Common Complexities Overview

| Big-O     | Name               | Description                            | Typical Scenario                     |
|-----------|--------------------|----------------------------------------|--------------------------------------|
| **O(1)**  | Constant Time       | Always the same time                   | Direct access, hash lookups          |
| **O(n)**  | Linear Time         | Grows with input size                  | Loops, linear searches               |
| **O(n²)** | Quadratic Time      | Grows rapidly with input size²         | Nested loops                         |
| **O(log n)** | Logarithmic Time | Cuts input in half each step           | Binary search                        |
| **O(n log n)** | Linearithmic   | Efficient sorts                        | Merge sort, quicksort                |
| **O(2ⁿ)** | Exponential Time    | Doubles with each step                 | Recursive problems (like Fibonacci)  |

### Code Examples by Complexity

### ✅ O(1) – Constant Time
No matter how big the array gets, accessing the first item takes the same amount of work.
```js
const arr = [1, 2, 3, 4, 5];
const first = arr[0]; // Takes 1 step regardless of array length
```

### ✅ O(n) – Linear Time
The number of operations grows directly with the size of the array. If the array has 10 items, we do 10 prints. If it has 1000, we do 1000.
```js
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

### ✅ O(n²) – Quadratic Time
Two nested loops = for every item, we compare it to every other item. If there are 10 items, this runs 100 times (10 × 10).
```js
const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    console.log(arr[i], arr[j]);
  }
}
```

### ✅ O(log n) – Logarithmic Time
Instead of checking every item, we eliminate half the list each time. Efficient for *sorted* data.
```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

### ✅ O(n log n) – Linearithmic Time
Used in most fast sorting algorithms. It's faster than O(n²) but still affected by input size.
```js
const arr = [5, 3, 1, 4, 2];
arr.sort(); // Internally uses an algorithm like quicksort or mergesort
```

### ✅ O(2ⁿ) – Exponential Time
Every time `n` increases, the number of operations **doubles**. This becomes unusable quickly as `n` grows.
```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

### TL;DR

- Big-O is about growth — not clock time.
- It helps you write smarter, scalable code.
- Focus on identifying patterns: single loop = O(n), nested = O(n²), divide-and-conquer = O(log n).
- Learn by experimenting: change `n` and use `console.time()` to see what happens.

## Common Data Structures

Data structures define **how data is stored in memory**, accessed, and manipulated. Understanding these is essential for writing efficient programs and solving real-world problems.

### Arrays
- **Structure:** Ordered collection with index-based access
- **Memory:** Stored in **contiguous memory locations**. Each element sits right next to the next one.

```
Index:   0        1         2
       ┌──────┬────────┬─────────┐
Array: │apple │banana  │cherry   │
       └──────┴────────┴─────────┘
Memory: [ contiguous block in memory ]
```

- **Pros:**
  - Fast lookup by index → O(1)
  - Easy to loop over
- **Cons:**
  - Fixed size (in lower-level languages)
  - Insertion/removal in the middle is slow → O(n)
- **Real-Life Uses:**
  - Storing a list of users
  - Rendering items in a UI
  - Filtering, mapping, and sorting datasets
```js
const fruits = ['apple', 'banana', 'cherry'];
console.log(fruits[1]); // banana
```

### Dictionaries / Objects / Hash Tables
- **Structure:** Key → Value mapping
- **Memory:** Hash function determines where to place values in memory
- **Pros:**
  - Very fast lookups → average O(1)
  - Flexible key naming
- **Cons:**
  - Keys must be unique
  - Hash collisions can affect performance
- **Real-Life Uses:**
  - Storing user settings
  - Caching
  - Mapping IDs to objects

```
Key        Hash        Storage Bucket
───        ────        ──────────────
"id"   ─▶  h1   ─▶    [ 1 ]
"name" ─▶  h7   ─▶    [ "Luna" ]
"age"  ─▶  h3   ─▶    [ 3 ]

```

```js
const user = { id: 1, name: "Luna" };
console.log(user["name"]); // Luna
```

### Queues
- **Structure:** First In, First Out (FIFO)
- **Memory:** Can be implemented using arrays or linked lists
- **Pros:**
  - Predictable order of execution
  - Useful for managing asynchronous tasks
- **Cons:**
  - Slower if implemented with arrays (shift is O(n))
- **Real-Life Uses:**
  - Job schedulers
  - Print queues
  - Async message queues like RabbitMQ

```
Front                         Back
  ↓                            ↓
┌───────┬────────┬────────┬────────┐
│ task1 │ task2  │ task3  │ task4  │
└───────┴────────┴────────┴────────┘
   OUT                        IN

```

```js
const queue = [];
queue.push("task1");
queue.push("task2");
const next = queue.shift(); // task1
```

### Stacks
- **Structure:** Last In, First Out (LIFO)
- **Memory:** Often implemented with arrays or linked lists
- **Pros:**
  - Very efficient → push/pop are O(1)
  - Matches how the call stack works
- **Cons:**
  - Limited access — only the top is accessible
- **Real-Life Uses:**
  - Undo functionality
  - Browser history
  - Function call stack

```
        ┌────────┐  ← Top (last in)
        │   b    │
        ├────────┤
        │   a    │
        └────────┘
          Bottom

```

```js
const stack = [];
stack.push("a");
stack.push("b");
const last = stack.pop(); // b
```

### Linked Lists
- **Structure:** A sequence of nodes where each node points to the next
- **Memory:** Nodes are scattered in memory — each node contains data and a pointer
- **Pros:**
  - Dynamic size
  - Fast insertions/deletions at head/tail → O(1)
- **Cons:**
  - No direct access to elements → must traverse
  - Slower lookup → O(n)
- **Real-Life Uses:**
  - Undo/redo history
  - Music playlist queue
  - Browser navigation history

```
┌───────┐    ┌───────┐    ┌───────┐
│  1    │───▶│  2    │───▶│  3    │───▶ null
└───────┘    └───────┘    └───────┘
   node        node         node

Each node contains:
[data | pointer to next node]
```

```js
// Conceptual node
const node = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null
    }
  }
};
```

## Trees (Binary Trees, Binary Search Trees)

Trees are hierarchical data structures commonly used to represent parent–child relationships and efficiently organize data.

### Structure
- A hierarchical collection of **nodes**
- One **root** node at the top
- Each node may have child nodes
- **Binary Tree:** Each node has at most two children (left and right)
- **Binary Search Tree (BST):**
  - Left child < parent
  - Right child > parent

### Memory
- Nodes are scattered throughout memory
- Each node contains data and references (pointers) to its children
- Similar memory behavior to linked lists

### Pros
- Efficient searching, insertion, and deletion → **O(log n)** when balanced
- Naturally models hierarchical data
- Enables ordered traversal (especially BSTs)

### Cons
- Can degrade to **O(n)** if unbalanced
- More complex to implement and reason about
- Requires careful handling to stay balanced

### Real-Life Uses
- File systems and directory structures
- Browser DOM tree
- Database indexes
- Decision trees
- Organization charts


```text
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
```

## Abstract vs Real Data Structures

Abstract Data Structures (or ADTs) are **conceptual models** — they describe *what a structure does* (its behavior), **not how it's built**.

They are not actual data types in your programming language. Instead, they are **blueprints** for solving specific types of problems.

> Think of an ADT like a recipe. It tells you what it should do (mix, bake, cool), but not what specific ingredients you’ll use. That depends on the context.

#### Why ADTs Matter:
- They give a **shared vocabulary** for developers and interviewers.
- They help you **choose the right pattern** to store, manage, and retrieve data.
- They **focus on functionality**, not language-specific details.

### What Are Real Data Structures?

Real data structures are **actual code implementations** of those abstract models using the tools available in your language.

You might use:
- Arrays
- Objects
- Classes
- Linked nodes

Depending on performance, readability, or your use case, you choose how to implement the abstract idea.

## What’s Next: Applying Data Structures & Algorithms

Understanding what data structures and algorithms are is only the starting point.
The real skill is knowing when to use them and why.

The resources below focus on practical problem-solving patterns — the mental tools developers use to reason through real applications, technical interviews, and everyday engineering trade-offs. Each section helps you recognize common scenarios and apply the right approach with confidence.

- [Problem Solving Fundamentals](1-problem-solving.md) – structured thinking before coding
- [Hashmaps](2-hash-maps.md) – fast lookup by key
- [Stacks and Queues](3-stacks-queues.md) – ordered data access (LIFO / FIFO)  
- [Sliding Window](4-sliding-window.md) – moving range over data
- [Two Pointer](5-two-pointer.md) – coordinated index movement  
- [Prefix Sum](6-prefix-sum.md) – cumulative totals for ranges  
- [Dynamic Programming](7-dynamic-programming.md) – reuse solved subproblems  
- [Search Patterns](8-search-patterns.md) – efficiently finding answers
