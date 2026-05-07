# Hash Tables, Objects, and Time Complexity

Before diving deeper into optimization techniques, it’s important to understand **why hash tables exist** and how they directly impact performance.

In JavaScript, this concept shows up most often through **objects** (and later, `Map`). Understanding this connection is one of the biggest turning points for beginners learning algorithms.

### ⏱ What We Mean by Time Complexity

When we talk about **time complexity**, we are answering one simple question:

> **How much work does this solution do as the input gets bigger?**

At this stage, you do *not* need formulas or math-heavy notation. What matters is understanding how certain approaches scale and why some solutions slow down faster than others.

### 🔁 The Cost of Repeated Scanning

Many beginner solutions rely on:
- nested loops
- repeatedly scanning arrays or strings
- comparing each item to every other item

Conceptually, this looks like:

```text
For each item
  Check every other item
```

This works correctly, but as the input grows, the amount of work grows very quickly. The program ends up doing the **same checks over and over**, which is inefficient.

### ⚡ How Hash Tables Improve Performance

A **hash table** (also called a **hash map**) is designed for one main purpose:

> **Fast lookup by key.**

When you store data in a hash table:

```js
lookup[key] = value;
```

You can later retrieve it instantly:

```js
lookup[key];
```

In JavaScript, objects give you this behavior automatically.

###  Constant-Time Lookups 

Looking up a value in an object usually takes **constant time**, often written as **O(1)**.

This does *not* mean:
- zero time
- instant execution
- no work at all

It means:

> **The lookup time does not depend on how many items are stored.**

Whether an object has:
- 5 keys
- 5,000 keys
- 5 million keys

Accessing a value by its key takes roughly the same amount of time.

That’s why hash tables are so powerful.

## Comparing Two Approaches

### Without a Hash Table
- You scan through data repeatedly
- Each check takes longer as the data grows
- Nested loops become common

### With a Hash Table (Object)
- You loop once
- Store what you’ve already seen
- Lookups are immediate
- No repeated scanning

This often turns slow solutions into fast ones with very small changes.

### How Objects Change Time Complexity

Here’s the key mindset shift:

- **Before objects:**
  “I’ll keep checking until I find what I need.”

- **After objects:**
  “I’ll remember what I’ve seen and look it up instead.”

That single change can dramatically improve how a solution scales.

You are not changing the problem — only **how efficiently** you solve it.


## Mental Model to Remember

```text
If I’m checking the same thing more than once,
I should probably remember it.
```

This idea will show up everywhere:
- frequency counters
- string and array optimizations
- interview questions
- real-world application code

## Problem 1: Word Frequency Counter

### Prompt
Write a function that takes a string as input and returns an object representing the **frequency of each word** in the string.

### Constraints
- Words are separated by spaces
- Ignore punctuation
- Case-insensitive (treat "Word" and "word" as the same)

### Example
```js
wordFrequency("hello world hello")
// { hello: 2, world: 1 }
```

### Solution
```js
function wordFrequency(str) {
  const freq = {};
  const words = str.toLowerCase().split(" ");

  for (let word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  return freq;
}
```

### Walkthrough
- Convert the string to lowercase to normalize words
- Split the string into an array of words
- Loop through each word
- Use the object to remember how many times each word appears
- Increment the count when the word is seen again

This avoids repeatedly scanning the string for each word.

### Time & Space Complexity

- **Time Complexity:** O(n)
  - Each word is processed once
  - Object lookups and updates are constant time

- **Space Complexity:** O(k)
  - `k` is the number of unique words stored in the object


## Problem 2: Phone Number Directory

### Prompt
You are building a simple phone directory application.

Write a function that takes an array of contact objects and returns an object where:
- names are the keys
- phone numbers are the values

### Constraints
- Each contact has a unique name
- Input is an array of objects with `name` and `phone` properties

### Example
```js
const contacts = [
  { name: "Alice", phone: "555-1234" },
  { name: "Bob", phone: "555-5678" }
];

phoneDirectory(contacts);
// { Alice: "555-1234", Bob: "555-5678" }
```

### Solution
```js
function phoneDirectory(contacts) {
  const directory = {};

  for (let contact of contacts) {
    directory[contact.name] = contact.phone;
  }

  return directory;
}
```

### Walkthrough
- Create an empty object to store the directory
- Loop through each contact
- Use the contact's name as the key
- Store the phone number as the value

This allows instant lookup by name later.

### Time & Space Complexity

- **Time Complexity:** O(n)
  - Each contact is processed once

- **Space Complexity:** O(n)
  - One entry is stored for each contact


## Problem 3: Two Sum 

### Prompt
Given an array of integers and a target integer, return the indices of the two numbers that add up to the target.

### Constraints
- Exactly one valid solution exists
- You may not use the same element twice

### Example
```js
twoSum([2, 7, 11, 15], 9)
// [0, 1]
```

### Solution
```js
function twoSum(nums, target) {
  const seen = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen[complement] !== undefined) {
      return [seen[complement], i];
    }

    seen[nums[i]] = i;
  }
}
```

### Walkthrough
- Create an object to remember numbers you’ve seen
- Loop through the array once
- For each number, calculate the value needed to reach the target
- Check if that value already exists in the object
- If it does, return the stored index and current index
- Otherwise, store the current number and its index

This avoids nested loops and reduces the solution to one pass.

### Time & Space Complexity

- **Time Complexity:** O(n)
  - Each number is visited once
  - Lookups in the object are constant time

- **Space Complexity:** O(n)
  - The object may store up to `n` numbers


## Problem 4: Longest Consecutive Sequence

### Prompt
Given an array of integers, return the length of the longest sequence of **consecutive integers**.

The sequence does not need to be in order in the array.

### Constraints
- Time complexity should be better than O(n²)

### Example
```js
longestConsecutive([100, 4, 200, 1, 3, 2])
// 4  (sequence: 1, 2, 3, 4)
```

### Solution
```js
function longestConsecutive(nums) {
  const set = {};
  let longest = 0;

  for (let num of nums) {
    set[num] = true;
  }

  for (let num of nums) {
    if (!set[num - 1]) {
      let currentNum = num;
      let length = 1;

      while (set[currentNum + 1]) {
        currentNum++;
        length++;
      }

      longest = Math.max(longest, length);
    }
  }

  return longest;
}
```

### Walkthrough
- Store every number in an object for fast lookup
- Loop through the numbers again
- Only start counting when the current number is the **start** of a sequence
- Expand forward while consecutive numbers exist
- Track and update the longest sequence found

Using a hash-based lookup avoids sorting and repeated scanning.

### Time & Space Complexity

- **Time Complexity:** O(n)
  - First pass stores numbers
  - Second pass checks sequences, but each number is only visited once overall

- **Space Complexity:** O(n)
  - The object stores all numbers for fast lookup


## Key Takeaways

- Hashes (objects) let you remember information
- Remembering data avoids repeated work
- Many problems become one-pass solutions
- Better time complexity often comes from **simple structural changes**, not complex code

Once this pattern clicks, many "hard" problems become manageable.

