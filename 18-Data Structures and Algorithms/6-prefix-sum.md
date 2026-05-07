# Prefix Sum Pattern

Prefix Sum is one of the most important **thinking upgrades** after learning recursion, hash maps, sliding window, and two pointers.

Up until now, most optimizations you’ve learned focused on this idea:

> “As I move forward, how can I avoid redoing work?”

Prefix Sum introduces a *slightly different* but equally powerful idea:

> **Do a small amount of work up front so future work becomes extremely cheap.**

This is a big shift in how you think about problems.

Instead of optimizing *inside* a loop (like sliding window), prefix sum asks:

> “What information will I need later — and can I precompute it once?”

This pattern shows up everywhere in real software:
- dashboards and analytics
- reporting systems
- financial calculations
- performance-critical APIs
- game engines and simulations

It’s also a stepping stone toward **dynamic programming**.

## Why Prefix Sum Exists 

Consider this kind of question:

> “What’s the sum of numbers between index `i` and index `j`?”

A beginner solution usually looks like:
- loop from `i` to `j`
- add everything up
- repeat for every query

That works… but notice the problem:
- the same numbers get added again and again
- performance gets worse as the array grows
- nested loops start appearing

Prefix Sum exists to solve *exactly* this kind of repeated work.

Instead of recalculating the same partial sums:
- calculate them **once**
- store them
- reuse them instantly

You trade:
- a little extra memory  
for  
- dramatically faster queries

This is a very common real-world tradeoff.

## What Is a Prefix Sum?

A **prefix sum array** stores cumulative totals as you move through an array.

Think of it as a running total.

### Example

```text
nums    = [2, 4, 1, 3, 5]
```

Build the prefix sum step by step:

```text
index 0 → 2
index 1 → 2 + 4 = 6
index 2 → 6 + 1 = 7
index 3 → 7 + 3 = 10
index 4 → 10 + 5 = 15
```

Result:

```text
prefix = [2, 6, 7, 10, 15]
```

Each position answers this question:

> “What is the sum of everything from the start up to here?”

Once you have this array, you never need to re-sum those values again.

Think of prefix sum like a **bank balance over time**:

```text
Day deposits:     [2, 4, 1, 3, 5]
Running balance:  [2, 6, 7, 10, 15]
```

If someone asks:

> “How much money was added between Day 2 and Day 4?”

You don’t recount every deposit.

You do:

```text
balance at Day 4 − balance before Day 2
```

That’s exactly how prefix sums work.

## The Core Formula 

To get the sum from index `start` to index `end`:

```text
sum(start, end) = prefix[end] - prefix[start - 1]
```

Why does this work?

- `prefix[end]` includes everything from `0 → end`
- `prefix[start - 1]` includes everything before `start`
- subtracting removes the extra values

### Example

```text
nums    = [2, 4, 1, 3, 5]
prefix  = [2, 6, 7, 10, 15]
```

Find the sum from index `1` to `3`:

```text
prefix[3] = 10
prefix[0] = 2

10 - 2 = 8
```

Check manually:

```text
4 + 1 + 3 = 8 ✅
```

### Edge Case (Start at 0)

If `start === 0`, there’s nothing to subtract:

```text
sum(0, end) = prefix[end]
```

## How Prefix Sum Fits With What You Already Know

Prefix Sum doesn’t replace earlier patterns — it **builds on them**:

- **Sliding Window**  
  Optimizes repeated work *while moving forward*

- **Two Pointers**  
  Controls a moving range efficiently

- **Hash Maps**  
  Trade memory for speed

- **Prefix Sum**  
  Precompute information so future work disappears

You’ll often see these patterns **combined** in harder problems.

## Beginner Rule of Thumb

Think about prefix sum when you see problems involving:

- repeated range queries
- cumulative totals
- "sum from `i` to `j`"
- analytics over time
- performance issues caused by nested loops

Ask yourself:

> "Am I recalculating the same partial sums again and again?"

If yes — prefix sum is probably the answer.

## Problem 1: Range Sum Query

### Prompt
Given an array of numbers and multiple range queries, return the sum for each range.

### Constraints
- The array does not change
- There may be many queries

### Test Case
```js
nums = [1, 2, 3, 4, 5]
rangeSum(nums, 1, 3) → 9  // 2 + 3 + 4
```

### Brute Force Solution

```js
function rangeSum(nums, start, end) {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += nums[i];
  }
  return sum;
}
```

### Brute Force Walkthrough

- Start at `start`
- Add each value up to `end`
- Repeat this loop for every query

**Problem:**
- Same values are added over and over
- Time complexity is O(n) per query

### Prefix Sum Solution

```js
function buildPrefix(nums) {
  const prefix = [];
  let runningSum = 0;

  for (let num of nums) {
    runningSum += num;
    prefix.push(runningSum);
  }

  return prefix;
}

function rangeSum(prefix, start, end) {
  if (start === 0) return prefix[end];
  return prefix[end] - prefix[start - 1];
}
```

### Prefix Sum Walkthrough

1. Build prefix array once
2. Store cumulative totals
3. Each query becomes simple subtraction

**Time Complexity:**
- Build: O(n)
- Query: O(1)

## Problem 2: Find Pivot Index

### Prompt
Return the index where the sum of numbers on the left equals the sum on the right.

### Test Case
```js
pivotIndex([1, 7, 3, 6, 5, 6]) → 3
```

### Brute Force Solution

```js
function pivotIndex(nums) {
  for (let i = 0; i < nums.length; i++) {
    let leftSum = 0;
    let rightSum = 0;

    for (let j = 0; j < i; j++) leftSum += nums[j];
    for (let j = i + 1; j < nums.length; j++) rightSum += nums[j];

    if (leftSum === rightSum) return i;
  }
  return -1;
}
```

### Brute Force Walkthrough

- For each index, calculate left and right sums from scratch
- Nested loops cause repeated work

**Time Complexity:** O(n²)

### Prefix Sum Solution

```js
function pivotIndex(nums) {
  const prefix = buildPrefix(nums);
  const total = prefix[prefix.length - 1];

  for (let i = 0; i < nums.length; i++) {
    const left = i === 0 ? 0 : prefix[i - 1];
    const right = total - prefix[i];

    if (left === right) return i;
  }

  return -1;
}
```

### Prefix Sum Walkthrough

- Total sum is known
- Left sum comes from prefix
- Right sum is total minus prefix
- No nested loops

**Time Complexity:** O(n)

## Problem 3: Running Sum of Array

### Prompt
Return an array where each element is the sum of all previous elements.

### Test Case
```js
runningSum([1, 2, 3, 4]) → [1, 3, 6, 10]
```

### Brute Force Solution

```js
function runningSum(nums) {
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = 0; j <= i; j++) sum += nums[j];
    result.push(sum);
  }

  return result;
}
```

### Brute Force Walkthrough

- For each index, recalculate sum from 0
- Lots of repeated addition

### Prefix Sum Solution

```js
function runningSum(nums) {
  const result = [];
  let sum = 0;

  for (let num of nums) {
    sum += num;
    result.push(sum);
  }

  return result;
}
```

### Prefix Sum Walkthrough

- Carry forward the running total
- Each value is added once

**Time Complexity:** O(n)

## Key Takeaways

- Prefix sums turn repeated work into constant-time lookups
- They trade a small amount of memory for big performance gains
- They are a natural extension of sliding window and hashing
- They unlock more advanced algorithmic thinking

### Mental Model to Remember

```text
If I keep asking the same question,
I should store the answer.
```