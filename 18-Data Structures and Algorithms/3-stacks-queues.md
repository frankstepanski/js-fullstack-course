# Stacks and Queues in JavaScript

Stacks and queues are two of the most common ways to organize data when **order matters**.

They show up everywhere in real software:
- undo/redo in editors
- browser back/forward history
- task scheduling
- background job processing
- breadth-first search (BFS)
- parsing expressions and matching parentheses

The key idea is simple:

> You’re not just storing data — you’re controlling **the order in which data is processed**.

Arrays and objects store data well, but they don’t *force* a specific processing order.

Stacks and queues give you a clear rule:

- A **stack** processes the **most recent** item first
- A **queue** processes the **oldest** item first

That single difference changes how you solve many problems.

## What Is a Stack?

A **stack** follows **LIFO**:

> **Last In, First Out**

The last item added is the first item removed.

```text
      TOP
      ↓
┌───────────┐
│   C       │  ← pop()
├───────────┤
│   B       │
├───────────┤
│   A       │
└───────────┘
      ↑
    push()
```

### Common Stack Operations
- **push**: add to the top
- **pop**: remove from the top
- **peek**: look at the top without removing

## What Is a Queue?

A **queue** follows **FIFO**:

> **First In, First Out**

The first item added is the first item removed.

```text
FRONT (remove)                      BACK (add)
     ↓                                 ↓
┌───────────┬───────────┬───────────┐
│    A      │    B      │    C      │
└───────────┴───────────┴───────────┘
    shift()                          push()
```

### Common Queue Operations
- **enqueue**: add to the back
- **dequeue**: remove from the front
- **peek**: look at the front without removing

## Are Stacks and Queues ADTs?

Yes — **stack** and **queue** are classic **Abstract Data Types (ADTs)**.

That means:
- they describe **behavior** (how items are added/removed)
- not a specific implementation

In JavaScript, there is no built-in `Stack` or `Queue` type.

So we typically implement them using:
- arrays
- objects + pointers (more efficient queues)
- classes (for cleaner interfaces)

### Why They’re ADTs 

Think of an ADT like a rulebook:
- a stack must behave like LIFO
- a queue must behave like FIFO

How you implement that rulebook can vary.

## Creating a Stack in JavaScript

The easiest stack implementation uses an array.

```js
const stack = [];

stack.push("A");
stack.push("B");
stack.push("C");

console.log(stack.pop()); // "C"
console.log(stack[stack.length - 1]); // "B" (peek)
```

### Why This Works
- `push()` adds to the end
- `pop()` removes from the end

Those operations are fast in JavaScript arrays.

## Creating a Queue in JavaScript

### Simple Queue (Array-based)

```js
const queue = [];

queue.push("A"); // enqueue
queue.push("B");
queue.push("C");

console.log(queue.shift()); // "A" (dequeue)
console.log(queue[0]); // "B" (peek)
```

This works, but there’s a performance detail:
- `shift()` removes from the front
- removing from the front forces the array to re-index

So `shift()` can be slower for large queues.

---

### More Efficient Queue (Object + Pointers)

This version avoids re-indexing by tracking positions.

```js
class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(value) {
    this.items[this.tail] = value;
    this.tail++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const value = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return value;
  }

  peek() {
    return this.items[this.head];
  }

  isEmpty() {
    return this.tail === this.head;
  }

  size() {
    return this.tail - this.head;
  }
}
```

### Why This Is Better
- enqueue and dequeue stay fast even with large data
- no shifting or re-indexing

## Problem 1: Valid Parentheses (Stack)

### Prompt
Given a string containing only parentheses characters `()`, determine if the string is valid.

A string is valid if:
- every opening parenthesis has a closing one
- parentheses close in the correct order

### Constraints
- Input contains only `(` and `)`

### Example Test Cases
```js
isValid("()") → true
isValid("(()") → false
isValid(")(") → false
isValid("(())") → true
```

### Solution
```js
function isValid(str) {
  const stack = [];

  for (let ch of str) {
    if (ch === "(") {
      stack.push(ch);
    } else {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }

  return stack.length === 0;
}
```

### Detailed Walkthrough
Use `"(())"`:

- Read `(` → push to stack: [`(`]
- Read `(` → push: [`(`, `(`]
- Read `)` → pop: [`(`]
- Read `)` → pop: []

End: stack is empty → valid.

Why stack works:
- the most recent `(` must be closed first
- that is exactly LIFO behavior

## Problem 2: Reverse a String (Stack)

### Prompt
Return a reversed version of a string using a stack.

### Constraints
- Do not use built-in reverse methods

### Example Test Cases
```js
reverseWithStack("hello") → "olleh"
reverseWithStack("abc") → "cba"
```

### Solution
```js
function reverseWithStack(str) {
  const stack = [];

  for (let ch of str) {
    stack.push(ch);
  }

  let result = "";
  while (stack.length > 0) {
    result += stack.pop();
  }

  return result;
}
```

### Detailed Walkthrough
For `"abc"`:
- Push: stack becomes [`a`, `b`, `c`]
- Pop and build result:
  - pop `c` → "c"
  - pop `b` → "cb"
  - pop `a` → "cba"

Why stack works:
- the last character pushed is the first removed

## Problem 3: Recent Requests (Queue)

### Prompt
You are tracking the most recent requests to an API.

Write a function that takes:
- an array of request IDs in order
- a number `k`

Return the **last k request IDs** in the order they arrived.

This is a queue-like problem: keep the most recent items, remove the oldest.

### Constraints
- If `k` is greater than the number of requests, return all requests

### Example Test Cases
```js
recentRequests(["r1", "r2", "r3", "r4"], 2) → ["r3", "r4"]
recentRequests(["a"], 3) → ["a"]
```

### Solution
```js
function recentRequests(requests, k) {
  const queue = [];

  for (let id of requests) {
    queue.push(id);

    if (queue.length > k) {
      queue.shift();
    }
  }

  return queue;
}
```

### Detailed Walkthrough
For `["r1", "r2", "r3", "r4"], k=2`:

- enqueue r1 → [r1]
- enqueue r2 → [r1, r2]
- enqueue r3 → [r1, r2, r3] → too big → dequeue oldest → [r2, r3]
- enqueue r4 → [r2, r3, r4] → too big → dequeue oldest → [r3, r4]

Return [r3, r4].

Why queue works:
- you remove the oldest item first (FIFO)

## Problem 4: Hot Potato (Queue)

### Prompt
Given an array of names and a number `num`, simulate the "hot potato" game.

Rules:
- Start at the front of the queue
- Pass the potato `num` times:
  - take the front person and move them to the back
- After `num` passes, remove the person holding the potato
- Repeat until one person remains

Return the winner.

### Constraints
- `num` will be a positive integer

### Example Test Cases
```js
hotPotato(["A", "B", "C", "D"], 2) → "C"
```

### Solution
```js
function hotPotato(names, num) {
  const queue = [...names];

  while (queue.length > 1) {
    for (let i = 0; i < num; i++) {
      queue.push(queue.shift());
    }

    queue.shift();
  }

  return queue[0];
}
```

### Detailed Walkthrough
For `[A, B, C, D], num=2`:

Queue starts: [A, B, C, D]

Round 1 passes:
- pass 1: move A to back → [B, C, D, A]
- pass 2: move B to back → [C, D, A, B]
Remove holder (front): remove C → [D, A, B]

Round 2 passes:
- pass 1: move D to back → [A, B, D]
- pass 2: move A to back → [B, D, A]
Remove holder: remove B → [D, A]

Round 3 passes:
- pass 1: move D to back → [A, D]
- pass 2: move A to back → [D, A]
Remove holder: remove D → [A]

Winner: A

Why queue works:
- passing is moving front → back
- elimination is removing from front


## Problem 5: Task Scheduling (Queue)

### Prompt
You are given an array of tasks in the order they arrive. Each task takes exactly **one unit of time** to complete.

Write a function that processes the tasks **in order** and returns an array showing the order in which tasks were completed.

This models a basic **task scheduler**, where tasks are handled one at a time in the order they were received.

### Constraints
- Tasks must be processed in arrival order
- No task can be skipped or reordered

### Example Test Cases
```js
processTasks(["task1", "task2", "task3"])
// ["task1", "task2", "task3"]
```

### Solution
```js
function processTasks(tasks) {
  const queue = [...tasks];
  const completed = [];

  while (queue.length > 0) {
    const currentTask = queue.shift();
    completed.push(currentTask);
  }

  return completed;
}
```

### Detailed Walkthrough

For `["task1", "task2", "task3"]`:

- Enqueue all tasks → queue = [task1, task2, task3]
- Dequeue task1 → completed = [task1]
- Dequeue task2 → completed = [task1, task2]
- Dequeue task3 → completed = [task1, task2, task3]

The tasks are processed in **first-in, first-out** order.

Why a queue works:
- The oldest task should always run next
- FIFO behavior matches real-world schedulers


## Key Takeaways

- A **stack** is LIFO (last in, first out)
- A **queue** is FIFO (first in, first out)
- Stack and queue are **ADTs**: behavior rules, not a built-in type
- In JavaScript, stacks are easy with arrays (`push`/`pop`)
- Queues can use arrays (`push`/`shift`), but objects + pointers scale better

Once these click, you’ll start noticing stack/queue behavior everywhere in real systems.

