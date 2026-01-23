# Sliding Window Pattern

The Sliding Window pattern is one of the first techniques that helps you write faster algorithms without making your code harder to read.

It introduces a powerful idea that shows up again and again in real software:

> **Don’t redo work you’ve already done. Reuse it.**

This is not just a coding trick — it’s a way of thinking about problems.

## The Core Problem Sliding Window Solves

Many brute-force solutions follow this pattern:

- take a chunk of data
- calculate something
- move one step forward
- **start over from scratch**

This approach works, but it wastes effort because most of the data overlaps between steps.

Sliding Window exists to eliminate that waste.

Instead of recalculating everything again and again:

- keep track of a **window** (a range of elements)
- move the window forward **one step at a time**
- add what enters the window
- remove what leaves the window

```text
Recalculate everything ❌
Reuse previous work ✅
```

You are doing less work to get the same answer.

Imagine this array:

```text
[ 1, 2, 3, 4, 5 ]
```

And a window size of `3`.

### Without Sliding Window (Naive Thinking)

```text
[1, 2, 3]  → sum = 6
[2, 3, 4]  → sum = 9   ← recalculates 2 and 3 again
[3, 4, 5]  → sum = 12  ← recalculates 3 and 4 again
```

Notice how the same numbers are added over and over.

### With Sliding Window (Smarter Thinking)

```text
Start window:
[1, 2, 3] → sum = 6

Slide right:
remove 1, add 4 → [2, 3, 4] → sum = 9

Slide right:
remove 2, add 5 → [3, 4, 5] → sum = 12
```

Only the **changes** are processed.

###  What Changes Each Step

```text
Window moves →
+-----------+
| 2 | 3 | 4 |
+-----------+

Remove leftmost ❌
Add new rightmost ✅
```

No matter how large the array is, each move does a constant amount of work.

When you recalculate everything:
- nested loops appear
- work grows quickly as input grows
- performance degrades

That often leads to:
- **O(n²)** or **O(n × k)** time complexity

Sliding Window usually reduces this to:
- **O(n)** time

This means the algorithm scales much better as data gets larger.


### What Sliding Window Is *Not*

This is important for beginners:

- ❌ It is **not** a data structure
- ❌ It is **not** a JavaScript feature
- ❌ It is **not** magic

Sliding Window is a **problem-solving pattern**.

You still use:
- arrays
- strings
- loops
- objects (sometimes)

The difference is *how you structure your loop*.

## When Should You Think “Sliding Window”?

Sliding Window is a good fit when a problem involves:

- **contiguous** subarrays or substrings
- ranges of values
- finding a maximum or minimum over a range
- longest or shortest sequences with constraints

Keywords that often signal Sliding Window:

```text
subarray
substring
window
range
contiguous
```

### How Sliding Window Changes Your Thinking

Before:

> “For each position, I’ll start over and recalculate.”

After:

> “What did I already compute, and how can I update it?”

That question is the heart of efficient algorithms.

---

### Mental Model to Remember

```text
If most of my data stays the same,
I should not recalculate it.
```

This idea will appear again in:
- two pointers
- prefix sums
- dynamic programming
- real-world performance tuning

## Problem 1: Maximum Sum of Subarray (Fixed Size)

### Prompt
Given an array of numbers and a number `k`, return the **maximum sum of any contiguous subarray of size `k`**.

```js
maxSubarraySum([2, 1, 5, 1, 3, 2], 3) → 9
```

### Naive Solution

```js
function maxSubarraySum(nums, k) {
  let max = -Infinity;

  for (let i = 0; i <= nums.length - k; i++) {
    let sum = 0;
    for (let j = i; j < i + k; j++) {
      sum += nums[j];
    }
    max = Math.max(max, sum);
  }

  return max;
}
```

### Naive Walkthrough

- Start at index 0 → sum `[2, 1, 5]`
- Move to index 1 → sum `[1, 5, 1]`
- Move to index 2 → sum `[5, 1, 3]`

Most values are added multiple times.

### Sliding Window Solution

```js
function maxSubarraySum(nums, k) {
  let windowSum = 0;
  let maxSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  maxSum = windowSum;

  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i];
    windowSum -= nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

### Sliding Window Walkthrough

- Compute the first window once
- Slide right by removing one value and adding one value
- Update max without recalculating

**Time Complexity:** O(n)

## Problem 2: Average of Subarrays

### Prompt
Given an array of numbers and `k`, return an array of averages of all contiguous subarrays of size `k`.

```js
findAverages([1, 3, 2, 6, -1, 4, 1, 8, 2], 5)
// [2.2, 2.8, 2.4, 3.6, 2.8]
```

### Naive Solution

```js
function findAverages(nums, k) {
  const result = [];

  for (let i = 0; i <= nums.length - k; i++) {
    let sum = 0;
    for (let j = i; j < i + k; j++) {
      sum += nums[j];
    }
    result.push(sum / k);
  }

  return result;
}
```

### Naive Walkthrough

Using:
```js
nums = [1, 3, 2, 6, -1, 4, 1, 8, 2]
k = 5
```

- Start at index 0 → sum `[1, 3, 2, 6, -1]`
- Move to index 1 → recalculate `[3, 2, 6, -1, 4]`
- Repeat for each position

Repeated values are summed again and again.

### Sliding Window Solution

```js
function findAverages(nums, k) {
  const result = [];
  let windowSum = 0;

  for (let i = 0; i < nums.length; i++) {
    windowSum += nums[i];

    if (i >= k - 1) {
      result.push(windowSum / k);
      windowSum -= nums[i - k + 1];
    }
  }

  return result;
}
```

### Sliding Window Walkthrough

- Build first window sum
- Slide window by adding one number and removing one
- Update average without recalculating

**Time Complexity:** O(n)

### Naive Walkthrough

Using this input:

```js
nums = [1, 3, 2, 6, -1, 4, 1, 8, 2]
k = 5
```

1. Start at index `0`
   - Take `[1, 3, 2, 6, -1]`
   - Sum all 5 numbers
   - Divide by `k`

2. Move to index `1`
   - Take `[3, 2, 6, -1, 4]`
   - Recalculate the entire sum again

3. Repeat for each starting position

**Problem:** Most values overlap, but are recalculated each time.

### Sliding Window Walkthrough

#### Step 1: First Window

```text
Window: [1, 3, 2, 6, -1]
windowSum = 11
average = 11 / 5 = 2.2
```

#### Step 2: Slide the Window

```text
Add 4, remove 1
New window: [3, 2, 6, -1, 4]
```

- Only two operations per move
- No full recalculation

#### Step 3: Continue

Each step updates the sum incrementally.

## Problem 3: Maximum Number of Vowels in a Substring

### Prompt
Given a string `s` and an integer `k`, return the maximum number of vowels in any substring of length `k`.

```js
maxVowels("abciiidef", 3) → 3
```

### Naive Solution

```js
function maxVowels(s, k) {
  let max = 0;
  const vowels = "aeiou";

  for (let i = 0; i <= s.length - k; i++) {
    let count = 0;
    for (let j = i; j < i + k; j++) {
      if (vowels.includes(s[j])) count++;
    }
    max = Math.max(max, count);
  }

  return max;
}
```

### Naive Walkthrough

- For each substring, count vowels from scratch
- Characters are checked multiple times

### Sliding Window Solution

```js
function maxVowels(s, k) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let count = 0;
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    if (vowels.has(s[i])) count++;

    if (i >= k) {
      if (vowels.has(s[i - k])) count--;
    }

    max = Math.max(max, count);
  }

  return max;
}
```

### Sliding Window Walkthrough

- Count vowels entering window
- Remove vowels leaving window
- Track max without rescanning

**Time Complexity:** O(n)

### Naive Walkthrough

1. Start at index `0` → `"abc"`
   - Count vowels → `a` = 1

2. Start at index `1` → `"bci"`
   - Count vowels again

3. Repeat for each substring

**Problem:** Characters are checked multiple times.

### Sliding Window Walkthrough

#### Step 1: First Window

```text
Window: "abc"
Vowel count = 1
```

#### Step 2: Slide Right

```text
Remove 'a'
Add 'i'
Window: "bci"
```

- Update count based only on entering/leaving characters

#### Step 3: Continue

```text
"cii" → 2 vowels
"iii" → 3 vowels
```

## Problem 4: Longest Substring Without Repeating Characters

### Prompt
Given a string, return the length of the longest substring without repeating characters.

```js
lengthOfLongestSubstring("abcabcbb") → 3
```

### Naive Solution

```js
function lengthOfLongestSubstring(s) {
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    let seen = new Set();
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) break;
      seen.add(s[j]);
      max = Math.max(max, j - i + 1);
    }
  }

  return max;
}
```

### Naive Walkthrough

- Start fresh at every index
- Rebuild substring until repeat

### Sliding Window Solution

```js
function lengthOfLongestSubstring(s) {
  let left = 0;
  let max = 0;
  const seen = {};

  for (let right = 0; right < s.length; right++) {
    if (seen[s[right]] >= left) {
      left = seen[s[right]] + 1;
    }

    seen[s[right]] = right;
    max = Math.max(max, right - left + 1);
  }

  return max;
}
```

### Sliding Window Walkthrough

- Expand window with `right`
- Shrink window from `left` when repeat found
- Never restart scanning

**Time Complexity:** O(n)


## Key Takeaways

Before Sliding Window, most problem-solving looked like this:

You would start at a position, calculate everything from scratch, move forward, and repeat. That approach works, but it wastes effort because most of the data overlaps between steps.

Sliding Window introduced a better mindset:

Instead of restarting, you learned to **adjust**.

You kept track of what stayed the same, updated only what changed, and reused work you had already done. This small shift is the foundation of writing faster and more scalable algorithms.

The most important thing you practiced was not syntax — it was **decision-making**.

You learned to pause and ask:

- What part of this work did I already do?
- What actually changes when I move forward one step?
- Do I really need to recalculate everything?

Those questions separate brute-force solutions from efficient ones.

Sliding Window is often the first time students experience turning an O(n²) solution into O(n) **without making the code harder to read**. That’s a big deal.
