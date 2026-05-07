# Two Pointer Patterns

Sliding Window and Two Pointers are closely related problem-solving patterns. They often solve similar performance issues, but they are used for **different kinds of problems**.

Both patterns are built around the same core idea:

> **Don’t redo work you’ve already done. Adjust instead.**

What differs is **how many pointers move** and **why they move**.

## Sliding Window Pattern (Recap)

Sliding Window works best when:

- the data is **contiguous**
- the window size is **fixed or controlled**
- you are calculating:
  - sums
  - averages
  - counts
  - max/min values over a range

Common keywords:
```text
subarray
substring
window
contiguous
fixed size
```

## Two Pointer Pattern

The **Two Pointer** pattern also uses pointers, but with a **different goal**.

Instead of moving a single window forward, Two Pointers focuses on:

> **Comparing or narrowing down a range from two ends.**

You typically use:
- one pointer at the **start**
- one pointer at the **end**
- and move them based on conditions

### The Core Problem Two Pointers Solves

Many brute-force solutions look like this:

- compare every element to every other element
- use nested loops
- repeat comparisons unnecessarily

Two Pointers exists to avoid that by:

- using **order** (often sorted data)
- making **intentional pointer movements**
- eliminating impossible cases early

### Visual Comparison

#### Sliding Window

```text
[ 2 | 3 | 4 ]  → window moves right
```

- both ends usually move together
- window size stays the same (or controlled)
- focus: **aggregation over a range**

#### Two Pointers

```text
[ 1, 2, 3, 4, 5 ]
  ↑           ↑
 left        right
```

- pointers move **independently**
- range shrinks or expands based on logic
- focus: **comparison and elimination**

## How Two Pointers Changes Your Thinking

Before:
> “I need to compare everything with everything.”

After:
> “Based on this comparison, I know which side can move.”

That shift turns many O(n²) problems into O(n).

### When Should You Think “Two Pointers”?

Two Pointers is a good fit when:

- data is **sorted** (or can be sorted)
- you are:
  - finding pairs
  - checking conditions between values
  - shrinking a search space
- order matters

Common keywords:
```text
pair
sorted
left / right
closest
target sum
remove duplicates
```

## Sliding Window vs Two Pointers 

| Concept | Sliding Window | Two Pointers |
|------|---------------|--------------|
| Pointers | Usually 2 (move together) | 2 (move independently) |
| Window size | Fixed or controlled | Variable |
| Primary goal | Aggregate over a range | Compare & eliminate |
| Common use | sums, averages, counts | pairs, constraints, ordering |
| Typical speedup | O(n²) → O(n) | O(n²) → O(n) |

## Mental Models to Remember

### Sliding Window
```text
Most of my data stays the same.
I should not recalculate it.
```

### Two Pointers
```text
Based on this comparison,
I know which pointer should move.
```

---

## How These Patterns Fit Together

Sliding Window and Two Pointers are **siblings**, not competitors.

They both teach you to:
- avoid restarting loops
- move intentionally through data
- reduce time complexity logically
- write efficient code without clever tricks

Once you understand Sliding Window, Two Pointers often feels like:

> "Sliding Window, but with more control."


## Problem 1: Pair Sum (Sorted)

### Prompt
Given a **sorted** array of numbers and a `target`, return `true` if there are **two numbers** that add up to the target. Otherwise return `false`.

### Constraints
- `nums` is sorted in non-decreasing order
- Array length is at least 2

### Example
```js
hasPairSum([1, 2, 4, 7, 11], 9) → true   // 2 + 7
hasPairSum([1, 2, 4, 7, 11], 10) → false
```

### Before Two Pointers (Brute Force)

#### Solution Code
```js
function hasPairSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return true;
    }
  }
  return false;
}
```

**Time Complexity:** O(n²)
**Space Complexity:** O(1)

#### Walkthrough 
Using:
```js
nums = [1, 2, 4, 7, 11]
target = 9
```

- Start `i = 0` (value 1)
  - Compare with 2 → 1+2=3
  - Compare with 4 → 1+4=5
  - Compare with 7 → 1+7=8
  - Compare with 11 → 1+11=12
- Move `i = 1` (value 2)
  - Compare with 4 → 2+4=6
  - Compare with 7 → 2+7=9 ✅ return true

This works, but it checks many pairs unnecessarily.

### Two Pointer Solution

#### Solution Code
```js
function hasPairSum(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) return true;
    if (sum < target) left++;      // need a bigger sum
    else right--;                  // need a smaller sum
  }

  return false;
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(1)

#### Walkthrough (Detailed)
Using:
```js
nums = [1, 2, 4, 7, 11]
target = 9
```

- Start:
  - `left = 0` → 1
  - `right = 4` → 11
  - sum = 12 (too big) → move `right` left

- Now:
  - `left = 0` → 1
  - `right = 3` → 7
  - sum = 8 (too small) → move `left` right

- Now:
  - `left = 1` → 2
  - `right = 3` → 7
  - sum = 9 ✅ return true

**Why this works:**
- Because the array is sorted, moving pointers changes the sum in a predictable way.

## Problem 2: Two Sum Indices (Unsorted)

### Prompt
Given an unsorted array and a target, return the **indices** of two numbers that add up to the target.

### Constraints
- Exactly one valid answer exists
- You cannot use the same element twice

### Example
```js
twoSum([3, 2, 4], 6) → [1, 2]
```

### Before Two Pointers (Brute Force)

#### Solution Code
```js
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
}
```

Time Complexity: O(n²) Space Complexity: O(1)


#### Walkthrough 
Using:
```js
nums = [3, 2, 4]
target = 6
```

- `i = 0` (3)
  - `j = 1` (2) → 3+2=5 (not 6)
  - `j = 2` (4) → 3+4=7 (not 6)
- `i = 1` (2)
  - `j = 2` (4) → 2+4=6 ✅ return [1,2]

### Two Pointer Solution (Sort + Track Indices)

#### Solution Code
```js
function twoSum(nums, target) {
  const paired = nums.map((value, index) => ({ value, index }));
  paired.sort((a, b) => a.value - b.value);

  let left = 0;
  let right = paired.length - 1;

  while (left < right) {
    const sum = paired[left].value + paired[right].value;

    if (sum === target) {
      return [paired[left].index, paired[right].index];
    }

    if (sum < target) left++;
    else right--;
  }
}
```

Time Complexity: O(n log n) (sorting dominates) Space Complexity: O(n) (for index tracking)

#### Walkthrough 
Using:
```js
nums = [3, 2, 4]
target = 6
```

1. Pair values with original indices:
```js
[{value:3,index:0},{value:2,index:1},{value:4,index:2}]
```

2. Sort by value:
```js
[{value:2,index:1},{value:3,index:0},{value:4,index:2}]
```

3. Two pointers:
- left=0 (2), right=2 (4) → sum=6 ✅
- return original indices `[1,2]`


## Problem 3: Remove Duplicates (Sorted)

### Prompt
Given a sorted array, return a **new array** with duplicates removed.

### Constraints
- Input is sorted

### Example
```js
uniqueSorted([1, 1, 2, 2, 3]) → [1, 2, 3]
```

### Before Two Pointers

#### Solution Code
```js
function uniqueSorted(nums) {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (!result.includes(nums[i])) result.push(nums[i]);
  }
  return result;
}
```

**Time Complexity:** O(n²)
**Space Complexity:** O(n)

#### Walkthrough 
- Scan left to right
- If result doesn’t already contain the value, push it
- `includes` causes repeated scanning of `result`

### Two Pointer Solution

#### Solution Code
```js
function uniqueSorted(nums) {
  if (nums.length === 0) return [];

  const result = [nums[0]];
  let left = 0;

  for (let right = 1; right < nums.length; right++) {
    if (nums[right] !== nums[left]) {
      result.push(nums[right]);
      left = right;
    }
  }

  return result;
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

#### Walkthrough
Using:
```js
nums = [1, 1, 2, 2, 3]
```

- Start:
  - result = [1]
  - left points to first unique (1)

- right=1 → nums[right]=1 equals nums[left]=1 → skip
- right=2 → nums[right]=2 differs → push 2, move left to 2
- right=3 → nums[right]=2 equals left → skip
- right=4 → nums[right]=3 differs → push 3

Result: `[1,2,3]`


## Problem 4: Reverse Array In Place

### Prompt
Reverse an array **in place** (modify the original array) using Two Pointers.

### Constraints
- Do not create a new array

### Example
```js
const arr = [1, 2, 3, 4];
reverseInPlace(arr);
// arr is now [4, 3, 2, 1]
```

### Before Two Pointers (Using a New Array)

#### Solution Code
```js
function reverseInPlace(arr) {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }

  // copy back into original array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = reversed[i];
  }
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

#### Walkthrough
- Build a reversed copy
- Then overwrite the original array
- This works, but uses extra memory

### Two Pointer Solution

#### Solution Code
```js
function reverseInPlace(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    left++;
    right--;
  }
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(1)

#### Walkthrough
Using:
```js
arr = [1, 2, 3, 4]
```

- left=0 (1), right=3 (4) → swap → `[4,2,3,1]`
- move pointers → left=1, right=2
- swap 2 and 3 → `[4,3,2,1]`
- pointers cross → stop

This reverses the array with constant extra memory.

## Key Takeaways

By learning Sliding Window and Two Pointers, you’ve moved beyond simply writing code that works and started learning how to control *how your algorithm moves through data*. Both patterns teach the same fundamental lesson: efficient solutions don’t restart from scratch — they **adjust based on what’s already known**. 

Sliding Window showed you how to reuse overlapping work when dealing with contiguous ranges, while Two Pointers showed you how to eliminate impossible cases by moving intentionally from both ends. 

Neither pattern introduced new syntax or special language features; instead, they changed the *structure of your thinking*. You still used arrays, strings, loops, and conditionals — what changed was how you decided to move forward. This mindset shift is the foundation of scalable problem solving and will continue to appear in more advanced topics.
