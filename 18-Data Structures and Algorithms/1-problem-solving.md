# Problem Solving Fundamentals 

Before worrying about **data structures**, **patterns**, or **Big‑O optimizations**, you need to build one thing first:

> **The ability to read a problem, break it down, and write a working solution.**

Most beginners struggle with algorithms not because they are hard — but because they are asked to think about *too many things at once*.

Your only goal here is to **solve problems correctly**.

## Thinking Out Loud When Solving Problems

One of the most effective problem-solving tools you can develop is also one of the simplest:

> **Say what you’re thinking out loud.**

Talking through a problem forces you to slow down, clarify your thinking, and turn vague ideas into concrete steps. This is not a beginner trick — it’s a professional skill used daily by real engineers.

### Why Saying It Out Loud Works

When you explain your thinking verbally, you are:

- turning the problem from words into logic
- catching mistakes before you write code
- forcing yourself to be precise
- practicing the same skill used in technical interviews
- mimicking how engineers collaborate and debug in real teams

If you can’t explain what you're doing, that's a signal to pause and think — not a sign that you’re failing.


### Mental Model: From Words to Code

```text
Problem Statement
      ↓
Restate in Your Own Words
      ↓
Walk Through Example by Hand
      ↓
Describe Steps Out Loud
      ↓
Write Code
      ↓
Test & Explain
```

This flow is not linear guessing — it is **intentional reasoning**.


### Step 1: Say What the Problem Is Asking

Before touching code, say something like:

- "The input is …"
- "The output should be …"
- "I need to return …"

If you can't clearly say what goes in and what comes out, reread the prompt.

### Step 2: Restate the Problem in Your Own Words

Now explain the problem as if you were teaching it to someone else:

- "Basically, I’m given …"
- "What this function needs to do is …"

If you struggle here, you don't fully understand the problem yet — and that's normal.

### Step 3: Talk Through a Simple Example

Use the smallest meaningful input and describe each step:

- "If the input is …, then the first thing that happens is …"
- "After that, this value changes to …"

This step often reveals the solution before you write any code.

### Step 4: Describe the Strategy (No Code Yet)

Before writing code, explain your plan in plain English:

- "First, I’ll loop through …"
- "I’ll keep track of …"
- "This stops when …"

If you can describe the steps clearly, the code usually writes itself.

### Step 5: Narrate While You Code

As you write code, keep talking:

- "This variable keeps track of …"
- "This condition checks whether …"
- "This line updates the value when …"

If you get stuck, pause and explain what you *expected* to happen.

### Step 6: Explain Why the Solution Works

After your code runs, explain it out loud from top to bottom:

- Why does the loop stop?
- What values change each iteration?
- How does the function reach the return value?

If you can explain this, you understand the solution.

### Step 7: Discuss Edge Cases Out Loud

Ask yourself verbally:

- "What if the input is empty?"
- "What if there’s only one value?"
- "What if the input is already sorted / reversed / duplicated?"

This builds real-world problem-solving instincts.


### A Simple Rule to Remember

> **If you can explain your strategy out loud, you can usually code it.**  
> **If you can’t explain it, don’t start coding yet.**

### This Skill Scales With You

- Beginners use this to learn
- Mid-level developers use it to debug
- Senior engineers use it to design systems
- Interviewers expect it during problem solving

Thinking out loud is not a crutch — it’s how professionals think.

## Part 1: Loop‑Based Fundamentals

### 1. Get Sum (Starter Problem)

### Prompt
Write a function that takes two numbers and returns their sum.

### Constraints
- Inputs will always be numbers

### Example
```js
getSum(2, 3) → 5
```

### Solution
```js
function getSum(a, b) {
  return a + b;
}
```

### Walkthrough
- Take the two inputs
- Add them together
- Return the result

This problem exists only to warm up.

---

### 2. Count Occurrences

### Prompt
Write a function that takes a string and a character, and returns how many times that character appears in the string.

### Constraints
- Case sensitive
- Character is a single letter

### Example
```js
countOccurrences("hello", "l") → 2
```

### Solution
```js
function countOccurrences(str, char) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }

  return count;
}
```

### Walkthrough
- Start a counter at 0
- Loop through the string
- If the character matches, increment the counter
- Return the final count

---

### 3. Find Max Number

### Prompt
Write a function that takes an array of numbers and returns the largest number.

### Constraints
- Array will contain at least one number

### Example
```js
findMax([3, 7, 2, 9, 4]) → 9
```

### Solution
```js
function findMax(nums) {
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }

  return max;
}
```

### Walkthrough
- Assume the first number is the largest
- Compare each number to the current max
- Replace max when a larger number is found

---

### 4. Title Case

### Prompt
Write a function that capitalizes the first letter of each word in a string.

### Example
```js
titleCase("hello world") → "Hello World"
```

### Solution
```js
function titleCase(str) {
  let result = "";
  let capitalizeNext = true;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      capitalizeNext = true;
      result += str[i];
    } else if (capitalizeNext) {
      result += str[i].toUpperCase();
      capitalizeNext = false;
    } else {
      result += str[i];
    }
  }

  return result;
}
```

### Walkthrough
- Track when a new word starts
- Capitalize the first letter
- Copy remaining letters as‑is

---

### 5. Reverse String (No Built‑ins)

### Prompt
Write a function that returns the reverse of a string.

### Example
```js
reverseString("hello") → "olleh"
```

### Solution
```js
function reverseString(str) {
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}
```

### Walkthrough
- Start from the end of the string
- Append characters one by one

---

### 6. Palindrome Check

### Prompt
Return `true` if a string is a palindrome, otherwise `false`.

### Example
```js
isPalindrome("racecar") → true
```

### Solution
```js
function isPalindrome(str) {
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return str === reversed;
}
```

---

### 7. Count Vowels

### Prompt
Return the number of vowels in a string.

### Example
```js
countVowels("hello") → 2
```

### Solution
```js
function countVowels(str) {
  let count = 0;
  const vowels = "aeiou";

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i].toLowerCase())) {
      count++;
    }
  }

  return count;
}
```

---

### 8. Remove Duplicates

### Prompt
Return a new array with duplicates removed.

### Example
```js
removeDuplicates([1, 2, 2, 3]) → [1, 2, 3]
```

### Solution
```js
function removeDuplicates(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }

  return result;
}
```

---

### 9. FizzBuzz Array

### Prompt
Return an array from 1 to n where:
- multiples of 3 → "Fizz"
- multiples of 5 → "Buzz"
- multiples of both → "FizzBuzz"

### Example
```js
fizzBuzz(5) → [1, 2, "Fizz", 4, "Buzz"]
```

### Solution
```js
function fizzBuzz(n) {
  const result = [];

  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(i);
    }
  }

  return result;
}
```

### Walkthrough
- Loop from 1 to n
- Check the most specific case first (both 3 and 5)
- Push the correct value into the result array

---

### 10. Array Intersection

### Prompt
Return an array containing values that appear in **both** input arrays.

### Example
```js
intersection([1, 2, 3], [2, 3, 4]) → [2, 3]
```

### Solution
```js
function intersection(arr1, arr2) {
  const result = [];

  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i]) && !result.includes(arr1[i])) {
      result.push(arr1[i]);
    }
  }

  return result;
}
```

### Walkthrough
- Loop through the first array
- Check if the value exists in the second array
- Avoid duplicates in the result

---

### 11. Find Missing Number

### Prompt
Given an array containing numbers from 1 to n (inclusive) with **one number missing**, return the missing number.

### Example
```js
findMissingNumber([1, 2, 4, 5]) → 3
```

### Solution
```js
function findMissingNumber(nums) {
  const n = nums.length + 1;
  let expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;

  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i];
  }

  return expectedSum - actualSum;
}
```

### Walkthrough
- Calculate the sum from 1 to n
- Subtract the sum of the given array
- The difference is the missing number

---

### 12. Find Missing Letter

### Prompt
Given an array of consecutive lowercase letters with one missing, return the missing letter.

### Example
```js
findMissingLetter(["a", "b", "d"]) → "c"
```

### Solution
```js
function findMissingLetter(letters) {
  for (let i = 0; i < letters.length - 1; i++) {
    const currentCode = letters[i].charCodeAt(0);
    const nextCode = letters[i + 1].charCodeAt(0);

    if (nextCode !== currentCode + 1) {
      return String.fromCharCode(currentCode + 1);
    }
  }
}
```

### Walkthrough
- Compare character codes
- Look for a gap of more than 1
- Return the missing letter

---

### 13. Are All Characters Unique

### Prompt
Return `true` if all characters in a string are unique, otherwise `false`.

### Example
```js
allUnique("abc") → true
allUnique("hello") → false
```

### Solution
```js
function allUnique(str) {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] === str[j]) {
        return false;
      }
    }
  }

  return true;
}
```

### Walkthrough
- Compare each character with every other
- If any match is found, return false

---

### 14. First Non-Repeating Character

### Prompt
Return the first character in a string that does not repeat.

### Example
```js
firstUniqueChar("swiss") → "w"
```

### Solution
```js
function firstUniqueChar(str) {
  for (let i = 0; i < str.length; i++) {
    let isUnique = true;

    for (let j = 0; j < str.length; j++) {
      if (i !== j && str[i] === str[j]) {
        isUnique = false;
        break;
      }
    }

    if (isUnique) return str[i];
  }
}
```

### Walkthrough
- For each character, check if it appears again
- Return the first one that does not

## Part 2: Higher-Order Array Methods

We shift **how** we solve problems, not **what** problems we solve.

Up to this point, you’ve primarily used:
- `for` loops
- counters
- conditionals

Higher-order array methods like **`map`**, **`filter`**, **`reduce`**, and **`forEach`** let you express the *intent* of your code more clearly.

Instead of saying:
> “Loop through this array and manually track everything myself”

You can say:
- **`filter`** → “Give me only the items that match this condition”
- **`map`** → “Transform each item into something new”
- **`reduce`** → “Combine all items into a single value”

### How These Problems Are Different

The problems in this section:
- focus on **data transformation and aggregation**
- often turn **many values into one** (totals, averages, validations)
- are very common in **real-world application code**

Examples you’ll see professionally:
- calculating totals and averages
- validating user input
- summarizing API data
- finding min/max values
- producing derived data for UI components

### Why These Methods Are Useful

- They make code **more readable** once you understand them
- They reduce boilerplate looping code
- They encourage thinking in **steps and pipelines**
- They align closely with how data flows in frontend and backend systems

> Important: These methods do **not** replace loops.
> They are built **on top of loops**.

Understanding the loop-based versions first (Part 1) makes this section much easier.

---

### 15. Sum of Squares of Even Numbers

### Prompt
Return the sum of the squares of even numbers in an array.

### Example
```js
sumEvenSquares([1, 2, 3, 4]) → 20
```

### Solution
```js
function sumEvenSquares(nums) {
  return nums
    .filter(num => num % 2 === 0)
    .map(num => num * num)
    .reduce((sum, num) => sum + num, 0);
}
```

### Walkthrough

Start with the array:
```js
[1, 2, 3, 4]
```

1. **filter** – keep only even numbers
```js
[2, 4]
```

2. **map** – square each remaining number
```js
[4, 16]
```

3. **reduce** – add them together
```js
4 + 16 = 20
```

Each step transforms the data and passes the result to the next step.

---

### 16. Valid Anagrams

### Prompt
Return true if two strings are anagrams of each other.

### Example
```js
areAnagrams("listen", "silent") → true
```

### Solution
```js
function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  return str1.split('').sort().join('') ===
         str2.split('').sort().join('');
}
```

### Walkthrough

1. If the strings are different lengths, they cannot be anagrams.

2. Convert each string into an array of characters:
```js
"listen" → ["l", "i", "s", "t", "e", "n"]
```

3. Sort the arrays alphabetically:
```js
["e", "i", "l", "n", "s", "t"]
```

4. Join them back into strings and compare.

If both sorted strings are identical, the originals are anagrams.

---

### 17. Car Mileage Analysis

### Prompt
Given an array of car objects, calculate:
- average mileage
- highest mileage
- lowest mileage
- total mileage


### Test Case

```js
const cars = [
  { make: "Toyota", model: "Camry", year: 2018, mileage: 30000 },
  { make: "Honda", model: "Civic", year: 2020, mileage: 12000 },
  { make: "Ford", model: "Fusion", year: 2016, mileage: 45000 }
];

analyzeMileage(cars);
```

**Expected Output:**
```js
{
  totalMileage: 87000,
  averageMileage: 29000,
  highestMileage: 45000,
  lowestMileage: 12000
}
```

### Walkthrough

1. **reduce** – calculate the total mileage
```js
total = sum of all car.mileage values
```

2. **average mileage** – divide total by number of cars

3. **map** – extract just the mileage values
```js
[12000, 45000, 30000]
```

4. Use **Math.max** and **Math.min** to find the extremes.

Each operation focuses on a single responsibility, making the logic easier to follow.

---

### 18. Password Validator

### Prompt
Validate a password based on these rules:
- at least 8 characters
- at least one uppercase letter
- at least one lowercase letter
- at least one digit

### Solution
```js
function validatePassword(password) {
  let hasUpper = false;
  let hasLower = false;
  let hasDigit = false;

  if (password.length < 8) return false;

  for (let char of password) {
    if (char >= 'A' && char <= 'Z') hasUpper = true;
    if (char >= 'a' && char <= 'z') hasLower = true;
    if (char >= '0' && char <= '9') hasDigit = true;
  }

  return hasUpper && hasLower && hasDigit;
}
```

### Walkthrough

1. Check length first. If it’s too short, fail early.

2. Loop through each character and track:
- uppercase letters
- lowercase letters
- digits

3. If all three conditions are met, return true.

This problem reinforces **validation logic** and **early exits**, which are extremely common in real applications.

## Part 3: Recursion

**Recursion** is a technique where a function **calls itself** to solve a smaller version of the same problem.

Instead of repeating work using a loop, recursion:
- breaks a problem into **smaller subproblems**
- solves the smallest case directly
- builds the final answer as the calls return

Every recursive function has two required parts:
1. **Base case** – when to stop
2. **Recursive case** – how the problem gets smaller

### Why Use Recursion?

Recursion is especially useful when dealing with:
- problems that naturally nest or repeat
- structures that contain smaller versions of themselves
- problems where “do this, then do the rest” is a natural description

Examples in real applications:
- navigating folder structures
- rendering nested UI components
- walking trees or graphs
- breaking down mathematical problems

### Recursion vs Loops

Loops and recursion can often solve the **same problems**, but they differ in how they express the solution.

#### Loops
- repeat instructions step by step
- use counters and state variables
- are usually easier for beginners to trace

#### Recursion
- expresses the problem in terms of itself
- avoids manual loop bookkeeping
- can be more readable for nested or hierarchical problems

> Important: Recursion is not “better” than loops.
> It is a **different way of thinking**.

---

### 19. Countdown

### Prompt
Print numbers from `n` down to `1` using recursion.

### Solution
```js
function countdown(n) {
  if (n === 0) return;

  console.log(n);
  countdown(n - 1);
}
```

### Walkthrough

```js
countdown(3)
```

#### Step 1: First Call

- `n` is `3`
- Is `n === 0`? ❌ No
- Print `3`
- Call `countdown(2)`

```text
3
```

#### Step 2: Second Call

- `n` is `2`
- Is `n === 0`? ❌ No
- Print `2`
- Call `countdown(1)`

```text
3
2
```

#### Step 3: Third Call

- `n` is `1`
- Is `n === 0`? ❌ No
- Print `1`
- Call `countdown(0)`

```text
3
2
1
```

#### Step 4: Base Case

- `n` is `0`
- Base case reached
- Function returns
- No more recursive calls

The recursion stops.

### Key Takeaway

- Each call prints **one number**
- Each call moves closer to `0`
- The base case prevents infinite recursion

---

### 20. Sum of an Array

### Prompt
Return the sum of all numbers in an array using recursion.

### Solution
```js
function sumArray(arr) {
  if (arr.length === 0) return 0;

  return arr[0] + sumArray(arr.slice(1));
}
```

###  Walkthrough

```js
sumArray([1, 2, 3])
```

#### Step 1: First Call

- Array is `[1, 2, 3]`
- Base case? ❌ (not empty)
- Return:

```js
1 + sumArray([2, 3])
```

#### Step 2: Second Call

- Array is `[2, 3]`
- Base case? ❌
- Return:

```js
2 + sumArray([3])
```

#### Step 3: Third Call

- Array is `[3]`
- Base case? ❌
- Return:

```js
3 + sumArray([])
```

#### Step 4: Base Case

- Array is `[]`
- Base case reached
- Return `0`

### Unwinding the Stack

Now the function calls resolve **backward**:

```text
sumArray([]) → 0
sumArray([3]) → 3 + 0 = 3
sumArray([2,3]) → 2 + 3 = 5
sumArray([1,2,3]) → 1 + 5 = 6
```

Final result:

```js
6
```

### Key Takeaway

- Each call handles **one element**
- The problem gets smaller each time
- Results are combined as the stack unwinds

---

### 21. Factorial

### Prompt
Return the factorial of a number `n`.

### Example
```js
factorial(5) → 120
```

### Solution
```js
function factorial(n) {
  if (n === 1) return 1;

  return n * factorial(n - 1);
}
```

### Walkthrough

Factorial means:

```text
5! = 5 × 4 × 3 × 2 × 1
```

Let’s trace the calls:

#### Step 1
```js
factorial(5)
→ 5 * factorial(4)
```

#### Step 2
```js
factorial(4)
→ 4 * factorial(3)
```

#### Step 3
```js
factorial(3)
→ 3 * factorial(2)
```

#### Step 4
```js
factorial(2)
→ 2 * factorial(1)
```

#### Step 5: Base Case
```js
factorial(1) → 1
```

### Unwinding the Stack

Now the results resolve backward:

```text
factorial(1) → 1
factorial(2) → 2 × 1 = 2
factorial(3) → 3 × 2 = 6
factorial(4) → 4 × 6 = 24
factorial(5) → 5 × 24 = 120
```

### 22. Number Range

### Prompt
Write a function that takes a `startNum` and an `endNum` and returns an array containing **all numbers from `startNum` to `endNum` (inclusive)** using recursion.

### Example
```js
numberRange(3, 7) → [3, 4, 5, 6, 7]
```

### Solution
```js
function numberRange(startNum, endNum) {
  if (startNum > endNum) return [];

  return [startNum, ...numberRange(startNum + 1, endNum)];
}
```

### Walkthrough

Let’s trace this call:

```js
numberRange(3, 5)
```

#### Step 1: First Call

- `startNum` is `3`
- `endNum` is `5`
- Base case? ❌ (`startNum` is not greater than `endNum`)

Return:
```js
[3, ...numberRange(4, 5)]
```

#### Step 2: Second Call

- `startNum` is `4`
- Base case? ❌

Return:
```js
[4, ...numberRange(5, 5)]
```

#### Step 3: Third Call

- `startNum` is `5`
- Base case? ❌

Return:
```js
[5, ...numberRange(6, 5)]
```

#### Step 4: Base Case

- `startNum` is `6`
- `startNum > endNum` → ✅

Return:
```js
[]
```

#### Unwinding the Stack

Now the calls resolve backward:

```text
numberRange(6,5) → []
numberRange(5,5) → [5]
numberRange(4,5) → [4, 5]
numberRange(3,5) → [3, 4, 5]
```

Final result:
```js
[3, 4, 5]
```

### Key Takeaways

- The base case returns an empty array
- Each recursive call adds **one number** to the front of the array
- The array is built **as the stack unwinds**, not as it goes down

## Wrapping It All Together

If you look back at where you started, something important has changed. At the beginning of this journey, the goal was never to be fast, clever, or optimal. The goal was much simpler and much more important:

> **Read a problem, break it down, and write a correct solution.**

Over the course of these problems, you weren't just learning syntax. You were building the habit of slowing down and thinking clearly. In practice, that means you learned how to:

- identify inputs and expected outputs
- translate problem statements into concrete steps
- reason through examples before writing code
- trace your own code line by line to understand what it’s doing

The specific solutions matter far less than **the process you used to arrive at them**. That process is the muscle memory every strong developer relies on.


### Solving First, Optimizing Later

It’s also important to notice what you were *not* asked to focus on yet. You intentionally did **not** worry about:

- performance
- efficiency
- writing the most optimal solution

Every problem emphasized clarity and correctness first. This was deliberate. You can’t optimize a solution you don’t fully understand, and trying to do both at the same time is where many beginners get stuck.

### What Comes Next

Now that you can:

- solve problems correctly
- explain your reasoning
- recognize at least one core pattern

You’re ready for the next shift in thinking.

The next question to ask is no longer just:

> *“Does this work?”*

but:

> *“How does this scale?”*

This is where **time complexity** comes in.

### Looking Ahead to Optimization

In the next phase, you’ll learn how to:

- analyze how fast your solutions run as inputs grow
- recognize when a solution does unnecessary repeated work
- make small structural changes that significantly improve performance

At first, this won’t involve complex new tools. Most optimizations will come from very simple ideas, such as:

- using objects for fast lookups
- avoiding repeated scans of the same data
- choosing better approaches for common problem shapes

Same problems. Same logic. Better performance.


### The Big Picture

Your learning path looks like this:

1. Solve the problem
2. Understand the steps
3. Recognize the pattern
4. Improve the efficiency

You’ve already completed parts **1–3**. That's a significant milestone. Many people try to jump straight to step 4 and end up confused or frustrated.

---

### Final Thought

> Good problem solvers don’t start by optimizing.
> They start by understanding.

You’re building that foundation now. Next, you’ll learn how to **measure**, **compare**, and **improve** your solutions without losing the clarity you’ve worked hard to develop. That’s how real engineers grow.


