# Dynamic Programming

Dynamic Programming (DP) is one of the most misunderstood topics — mostly because it’s often explained as if it's a mysterious "advanced technique."

In reality, DP is just a **problem-solving habit**:

> **If you keep solving the same smaller problem again and again, stop and remember the answer.**

That’s it.

DP is not a special data structure.
DP is not magic.
DP is **organized reuse**.

## The Big Picture

A lot of algorithm problems have this pattern:

1. You can break the problem into **smaller versions of the same problem**.
2. While doing that, you accidentally recompute the same results many times.

DP fixes this by doing either of the following:

- **Memoization (Top-Down):** recursion + caching
- **Tabulation (Bottom-Up):** build answers iteratively from small to large

Both approaches aim for the same outcome:

> **Compute each subproblem once.**


## When Do You Need DP?

DP is a good fit when you notice these two properties:

### 1) Overlapping Subproblems
You solve the same “small” problem repeatedly.

Example:
- computing `fib(5)` requires `fib(4)` and `fib(3)`
- computing `fib(4)` also requires `fib(3)` and `fib(2)`

Notice `fib(3)` appears multiple times.

### 2) Optimal Substructure
The best solution to the big problem is made from the best solutions to smaller problems.

Example:
- “best total cost up to step i” depends on “best total cost up to step i-1 / i-2”

### Without DP (repeating work)

```text
fib(5)
├─ fib(4)
│  ├─ fib(3)
│  │  ├─ fib(2)
│  │  └─ fib(1)
│  └─ fib(2)
└─ fib(3)
   ├─ fib(2)
   └─ fib(1)

fib(3) and fib(2) are computed multiple times ❌
```

### With DP (remember the answer)

```text
Compute fib(3) once ✅
Store it ✅
Reuse it whenever needed ✅
```

## Problem 1: Fibonacci (The Classic DP Starter)

### Prompt
Return the `n`th Fibonacci number.

Fibonacci is defined as:
- `fib(0) = 0`
- `fib(1) = 1`
- `fib(n) = fib(n-1) + fib(n-2)`

### Constraints
- `0 <= n <= 40` (small enough to demonstrate the difference)

### Test Cases
```js
fib(0) → 0
fib(1) → 1
fib(6) → 8
fib(10) → 55
```

### Brute Force Solution (Plain Recursion)

```js
function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
}
```

#### Walkthrough (Why this is slow)
- `fib(n)` calls `fib(n-1)` and `fib(n-2)`
- those calls branch again
- the tree grows exponentially
- many values (like `fib(3)`, `fib(4)`) are recomputed repeatedly

**Time Complexity:** O(2^n)
**Space Complexity:** O(n) (call stack depth)


### DP Solution 1: Memoization (Top-Down)

```js
function fib(n, memo = {}) {
  if (n in memo) return memo[n];

  if (n === 0) return 0;
  if (n === 1) return 1;

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
```

#### Walkthrough
- We still use recursion (same definition)
- But before calculating, we ask: **"Did I already solve this n?"**
- If yes, return immediately
- If no, compute once, store in `memo`, and reuse later

A trace for `fib(6)` looks like:
- compute `fib(6)` → needs `fib(5)` and `fib(4)`
- compute `fib(5)` → needs `fib(4)` and `fib(3)`
- once `fib(4)` is computed, it’s stored
- the next time we need `fib(4)`, we instantly reuse it

**Time Complexity:** O(n)
**Space Complexity:** O(n) (memo + recursion depth)

---

### DP Solution 2: Tabulation (Bottom-Up)

```js
function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

#### Walkthrough
- Instead of recursion, we build answers in order
- Start with the base cases: `dp[0]`, `dp[1]`
- Each new `dp[i]` depends only on the two previous answers

**Time Complexity:** O(n)
**Space Complexity:** O(n)

---

### Space-Optimized Version (Same DP, Less Memory)

```js
function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev2 = 0; // fib(0)
  let prev1 = 1; // fib(1)

  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
```

#### Walkthrough
- Notice we only ever use the last two values
- So we keep two variables instead of an entire array

**Time Complexity:** O(n)
**Space Complexity:** O(1)

## Problem 2: Climbing Stairs

### Prompt
You are climbing a staircase with `n` steps.
You can climb either **1 step** or **2 steps** at a time.

Return the number of distinct ways to reach the top.

### Constraints
- `1 <= n <= 45`

### Test Cases
```js
climbStairs(1) → 1
climbStairs(2) → 2
climbStairs(3) → 3
climbStairs(5) → 8
```

### Brute Force Solution (Recursive)

```js
function climbStairs(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return climbStairs(n - 1) + climbStairs(n - 2);
}
```

#### Walkthrough
- To reach step `n`, you must come from:
  - step `n-1` (a 1-step move)
  - step `n-2` (a 2-step move)
- So ways(n) = ways(n-1) + ways(n-2)
- This repeats work like Fibonacci

**Time Complexity:** O(2^n)
**Space Complexity:** O(n)

---

### DP Solution (Bottom-Up)

```js
function climbStairs(n) {
  if (n === 1) return 1;

  let prev2 = 1; // ways to reach step 1
  let prev1 = 2; // ways to reach step 2

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return n === 2 ? 2 : prev1;
}
```

#### Walkthrough (Detailed)
Think of `prev2` and `prev1` as “answers we already know.”

- For step 1: 1 way → `[1]`
- For step 2: 2 ways → `[1+1]`, `[2]`

Now build forward:

```text
step 3 = ways(2) + ways(1) = 2 + 1 = 3
step 4 = ways(3) + ways(2) = 3 + 2 = 5
step 5 = ways(4) + ways(3) = 5 + 3 = 8
```

We never recompute old steps — we only move forward.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

## Problem 3: Minimum Cost Climbing Stairs

### Prompt
You are given an array `cost` where `cost[i]` is the cost of step `i`.

Once you pay the cost, you can climb 1 or 2 steps.
You can start at step 0 or step 1.

Return the minimum cost to reach the top.

### Constraints
- `2 <= cost.length <= 1000`
- `0 <= cost[i] <= 999`

### Test Cases
```js
minCostClimbingStairs([10, 15, 20]) → 15
minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1]) → 6
```

---

### DP Solution (Bottom-Up)

```js
function minCostClimbingStairs(cost) {
  let prev2 = 0; // min cost to reach step 0 (starting point)
  let prev1 = 0; // min cost to reach step 1 (starting point)

  for (let i = 2; i <= cost.length; i++) {
    const take1 = prev1 + cost[i - 1];
    const take2 = prev2 + cost[i - 2];
    const curr = Math.min(take1, take2);

    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
```

#### Walkthrough (Slow + Detailed)
We define:
- `prev1` = min cost to reach the previous “top”
- `prev2` = min cost to reach two steps behind

At each `i` (a position *above* the steps):
- If we came from one step below: pay `cost[i-1]`
- If we came from two steps below: pay `cost[i-2]`
- Choose the cheaper option

This is DP because we:
- build the answer from smaller answers
- reuse previous results
- never re-solve the same step

**Time Complexity:** O(n)
**Space Complexity:** O(1)

## Problem 4: House Robber (No Adjacent Picks)

### Prompt
You are a robber with a row of houses.
Each house has some money.

You cannot rob two adjacent houses.

Return the maximum amount you can rob.

### Constraints
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

### Test Cases
```js
rob([1,2,3,1]) → 4
rob([2,7,9,3,1]) → 12
```

---

### DP Solution (Bottom-Up)

```js
function rob(nums) {
  let prev2 = 0; // best up to i-2
  let prev1 = 0; // best up to i-1

  for (let i = 0; i < nums.length; i++) {
    const take = prev2 + nums[i];
    const skip = prev1;
    const curr = Math.max(take, skip);

    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
```

#### Walkthrough (Detailed)
At each house, you have two choices:

1) **Take this house**
- If you take it, you must add it to `prev2` (best up to i-2)

2) **Skip this house**
- If you skip it, your best stays `prev1` (best up to i-1)

So each step:

```text
curr = max(
  prev2 + nums[i],  // take
  prev1             // skip
)
```

Example: `nums = [2, 7, 9, 3, 1]`

- house 0: curr = max(0+2, 0)=2
- house 1: curr = max(0+7, 2)=7
- house 2: curr = max(2+9, 7)=11
- house 3: curr = max(7+3, 11)=11
- house 4: curr = max(11+1, 11)=12

Answer: 12

**Time Complexity:** O(n)
**Space Complexity:** O(1)



## Takeaway

Dynamic Programming is not about memorizing solutions.
It’s about noticing repeated work and making a simple decision:

- **Do I keep recomputing this?**
- **Or do I store the answer and reuse it?**

### How to Recognize DP

Ask these questions:

- Can I define the problem using smaller versions of itself?
- Am I recomputing the same values repeatedly?
- Can I write a recurrence like “answer(i) depends on answer(i-1), answer(i-2)…”?

If yes, DP is likely involved.

### Your Mental Model

```text
DP = recursion + memory
or
DP = build answers from small to big
```

Once that clicks, DP becomes less scary — and starts feeling like the next natural step after prefix sums.

