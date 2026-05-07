# Common Search Patterns 

When most hear the word *search*, they think of questions like:

> "Find this number in the array."

That *is* search — but it's only one type.

More generally, a **search pattern** is any structured way of exploring a problem space to find something you care about:
- a value
- a position
- a range
- a pair
- a state that satisfies constraints

From that perspective:

- **Linear Search** searches individual values
- **Binary Search** searches positions in a sorted space
- **Sliding Window** searches contiguous ranges
- **Two Pointers** search over pairs or moving boundaries

So yes — **sliding window and two pointers *are* search patterns**.

They just search over *ranges and relationships*, not single values.

What all of these patterns have in common is the same core goal:

> **Explore possibilities efficiently without repeating work.**

This is why it makes sense to study search patterns *after* covering:
- Big-O (so you care about efficiency)
- Sliding Window & Two Pointers (searching ranges and pairs)
- Prefix Sum & DP (reducing repeated work even further)

Classic search patterns like linear and binary search build directly on that foundation.

Instead of optimizing *how* you process data, search patterns teach you:

> **How to reduce how much data you even need to look at.**

This is why search patterns belong **right here** in the learning journey.


## Why Search Patterns Matter 

Most beginner solutions look like this:

```text
Check everything until I find the answer.
```

That’s not wrong — it’s often the **correct first solution**.

But as inputs grow:
- loops get slower
- nested loops appear
- performance breaks down

Search patterns exist to answer one key question:

> “What information do I already have that lets me skip work?”

If you can safely skip work, your algorithm gets faster **without becoming harder to read**.

## Pattern 1: Linear Search (The Baseline)

Linear search is the simplest search pattern.

You look at each item one by one until:
- you find the target
- or you run out of data

### Visual

```text
Target = 7

[ 3, 5, 6, 7, 9 ]
  ↑  ↑  ↑  ↑
 check one by one
```

### Big‑O
- **Time:** O(n)
- **Space:** O(1)

### When Linear Search Is Used
- unsorted data
- small datasets
- baseline solution before optimization

---

### Problem: Find a Value in an Array

#### Prompt
Given an array of numbers and a target value, return `true` if the target exists.

#### Constraints
- array may be unsorted
- values may repeat

#### Test Cases
```js
findValue([4, 2, 7, 1], 7) → true
findValue([4, 2, 7, 1], 3) → false
```

#### Solution (Linear Search)
```js
function findValue(nums, target) {
  for (let num of nums) {
    if (num === target) return true;
  }
  return false;
}
```

#### Walkthrough
- start at the first element
- compare each value to the target
- stop early if found
- otherwise finish the loop


## Pattern 2: Binary Search (Divide and Conquer)

Binary search is one of the most important algorithmic ideas.

Instead of checking everything, binary search:
- **requires sorted data**
- repeatedly cuts the search space in half

### Visual

```text
Target = 7

[ 1, 3, 5, 7, 9, 11 ]
        ↑
       mid
```

Each step removes **half** of the remaining data.

### Big‑O
- **Time:** O(log n)
- **Space:** O(1)

---

### Problem: Binary Search for a Number

#### Prompt
Given a sorted array and a target value, return `true` if the value exists.

#### Constraints
- array is sorted in ascending order

#### Test Cases
```js
binarySearch([1,3,5,7,9], 7) → true
binarySearch([1,3,5,7,9], 4) → false
```

#### Brute Force Solution
```js
function binarySearch(nums, target) {
  for (let num of nums) {
    if (num === target) return true;
  }
  return false;
}
```

**Time:** O(n)

---

#### Binary Search Solution
```js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return true;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}
```

#### Walkthrough
- compare the middle value to the target
- eliminate the half that cannot contain the target
- repeat until found or exhausted

## Pattern 3: First / Last Occurrence (Binary Search Variant)

Sometimes finding *any* match is not enough.

You may need:
- the **first** occurrence
- the **last** occurrence

This pattern modifies binary search slightly.

### Visual

```text
[1, 2, 2, 2, 3]
      ↑  ↑  ↑
      all matches
```

---

### Problem: First Occurrence

#### Prompt
Return the index of the first occurrence of a target in a sorted array.

#### Test Cases
```js
firstOccurrence([1,2,2,2,3], 2) → 1
firstOccurrence([1,2,3], 4) → -1
```

#### Solution
```js
function firstOccurrence(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      right = mid - 1; // keep searching left
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
```

#### Walkthrough
- when a match is found, store it
- do NOT stop
- continue searching left

**Time:** O(log n)

## Key Takeaways

Search patterns are not just about “finding a value in an array.”  
They are about systematically exploring a problem space while skipping unnecessary work.

Patterns like linear search, binary search, sliding window, and two pointers all apply to **arrays and sequential data**. They differ only in *what* they are searching over:
- individual values
- positions in a sorted space
- contiguous ranges
- moving boundaries or relationships

There *are* other search patterns — especially for **linked lists, trees, and graphs** — but those belong to different data structures and require different mental models. Mixing them in here would blur the core idea.

Mastering these foundational patterns first makes learning tree and graph searches later feel like a **natural extension**, not a brand-new topic.

If you understand *what information lets you skip work*, you’re already thinking like a strong problem solver.
