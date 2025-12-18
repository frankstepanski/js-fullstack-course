#  JavaScript Fundamentals 

Learning to program is more than just learning a computer language — it’s learning a new way of **thinking about problems**.  
At its core, programming means breaking big, complex ideas into small, repeatable steps that a computer can understand.  
It’s part logic, part creativity, and part persistence.

When you’re just starting out, it can feel confusing or even frustrating — and that’s completely normal.  
Every programmer (even seasoned developers) spends a lot of time **making mistakes, debugging, and experimenting**.  
Programming is not about being perfect; it’s about being patient and curious.

💡 **Tips for learning effectively:**
- Practice a little bit every day instead of cramming once a week.  
- Don’t copy code blindly — **type it out yourself** and change small pieces to see what happens.  
- Use tools like the **browser console** or **Node.js** to test small code snippets.  
- Ask “why” and “what if” questions to explore how things work.  
- Remember: **understanding takes time** — be patient with yourself.

With that mindset, let’s begin exploring JavaScript — one of the most versatile and beginner-friendly languages in the world.

## What Is JavaScript?

JavaScript (JS) is a **high-level programming language** that brings interactivity to websites.

**HTML** gives a page structure.  
**CSS** adds style.  
**JavaScript** makes it *come alive* — with behavior and logic!

### Where JavaScript Runs
- **In the browser:** for frontend behavior (clicks, animations, popups)
- **On servers:** using **Node.js**
- **In apps:** mobile apps (React Native), desktop apps (Electron)

### Type of Language
- **Interpreted:** runs line-by-line (no need to compile)
- **Dynamic:** types can change at runtime
- **Multi-purpose:** frontend, backend, APIs, automation

```js
console.log("Hello, world!");
```
 **Illustration:** How JS fits in the web stack

```
[ HTML ] → Structure
[ CSS ] → Design / Presentation
[ JavaScript ] → Behavior / Interactivity
```

## Data Types in JavaScript

Everything in JavaScript has a type.

### Primitive Types (Immutable)
| Type | Example | Description |
|------|----------|-------------|
| String | `"Hello"` | Text data |
| Number | `42`, `3.14` | Numeric values |
| Boolean | `true`, `false` | True/false logic |
| Undefined | `let x;` | Declared but not assigned |
| Null | `let y = null;` | Explicit "no value" |
| Symbol | `Symbol("id")` | Unique identifier |
| BigInt | `12345678901234567890n` | Very large integers |

### Non-Primitive (Mutable)
- **Object:** `{ name: "Alice" }`
- **Array:** `[1, 2, 3]`

```js
let age = 25;             // Number
let name = "John";        // String
let active = true;        // Boolean
let user = { name, age }; // Object
let skills = ["HTML", "CSS", "JS"]; // Array
```

💡 **Try It Yourself**
```js
console.log(typeof 42);
console.log(typeof "hello");
console.log(typeof [1, 2, 3]);
console.log(typeof null); // what happens here?
```

⚠️ **Common Mistake**
`typeof null` returns `"object"` — it’s a historical bug!

🧰 **Pro Tip**
You can use `Array.isArray()` to check arrays correctly.

## Variables — let, const, and scope

Variables are like **containers** that hold data.

```js
let score = 100;
const player = "Alex";
```

### let vs const
- `let` → can be reassigned
- `const` → cannot be reassigned

```js
let lives = 3;
lives = 2; // ✅

const name = "Sam";
// name = "Alex"; ❌ Error
```

### Scope
Scope defines *where* a variable is accessible.

```
Global Scope
 └── Function Scope
      └── Block Scope (inside { })
```

```js
let x = 10;
{
  let x = 20; // only inside this block
  console.log(x); // 20
}
console.log(x); // 10
```

💡 **Try It Yourself**
```js
let fruit = "apple";
{
  let fruit = "orange";
  console.log(fruit);
}
console.log(fruit);
```

🧰 **Pro Tip**
Always use `const` by default, and only switch to `let` if you plan to reassign.

⚠️ **Common Mistake**
Avoid `var`. It ignores block scope and leads to confusing bugs.

## Strings and String Operations

Strings store text.

```js
let greeting = "Hello";
let name = "Taylor";
console.log(greeting + " " + name); // Concatenation
```

### Template Literals
```js
let message = `Welcome, ${name}!`;
console.log(message);
```

### String Methods
```js
let text = "JavaScript";
console.log(text.length);
console.log(text.toUpperCase());
console.log(text.slice(0, 4));
```

💡 **Try It Yourself**
Write a string and use `.toLowerCase()` and `.includes()` to check if it contains a word.

⚠️ **Common Mistake**
Forgetting backticks (`` ` ``) in template literals causes syntax errors.

## Null vs Undefined

| Type | Meaning |
|------|----------|
| `undefined` | Variable declared but not assigned |
| `null` | Intentionally set to “no value” |

```js
let a;
let b = null;
console.log(a); // undefined
console.log(b); // null
```

🧰 **Pro Tip**
Use `===` instead of `==` to avoid confusion with type coercion.

## Operators

| Type | Example | Description |
|------|----------|-------------|
| Arithmetic | `+ - * / % **` | Math operations |
| Comparison | `=== !== > <` | Compare values |
| Logical | `&& || !` | Combine conditions |
| Assignment | `= += -=` | Assign values |
| Ternary | `condition ? a : b` | Short if-else |

💡 **Try It Yourself**
```js
let age = 18;
let message = age >= 18 ? "Adult" : "Minor";
console.log(message);
```

⚠️ **Common Mistake**
Using `==` instead of `===` — `==` allows type coercion.

## Running JavaScript

### A) Using Node.js
```bash
node app.js
```

### B) In HTML
```html
<!DOCTYPE html>
<html>
<head><title>JS Example</title></head>
<body>
  <h1>Hello JavaScript!</h1>
  <script src="app.js"></script>
</body>
</html>
```

**Illustration: File setup**

```
project/
 ├── index.html
 ├── app.js
 └── css/
     └── style.css
```

💡 **Try It Yourself**
Run `console.log("Hello from JS!")` both in Node and in your browser console — notice the difference.

🧰 **Pro Tip**
Always place `<script>` tags **before `</body>`** to ensure the DOM is loaded.

## Arrays

 Arrays are special data structures that store **ordered lists of items** — imagine a row of boxes, each with its own label (numbered starting from zero). Each box can hold anything: numbers, strings, or even other arrays and objects. This makes arrays extremely powerful because they can organize multiple related pieces of data in a single, easy-to-manage variable.

For example, instead of having separate variables like `student1`, `student2`, and `student3`, you can store all your student names in one array:  
`const students = ["Ava", "Ben", "Carla"];`.  

This simplifies both storage and retrieval — you can loop through the list, update values, and even sort or filter them with built-in methods. Arrays are used constantly in programming for everything from lists of users, products, and search results to configuration options and game levels.

It’s also important to understand how arrays work *under the hood*. JavaScript arrays are dynamic — meaning you can add or remove items at any time — and they automatically resize themselves. Every element in an array has an **index**, starting at **0**, which represents its position. Learning how to access, iterate, and manipulate these indexes is one of the first big steps toward writing more advanced code.

---

```js
const colors = ["red", "green", "blue"];
console.log(colors[1]); // green
```

### Methods
```js
colors.push("yellow");
colors.pop();
console.log(colors.length);
```

💡 **Try It Yourself**
Create an array of your favorite foods and log each one using a `for` loop.

 **Visual**
```
[ 0:"red" | 1:"green" | 2:"blue" ]
```

⚠️ **Common Mistake**
Arrays start at index **0**, not 1.

## Objects

Before learning how to use objects in JavaScript, it’s helpful to think about how data works in real life. You might describe a person with information like their name, age, or hobbies — each of those pieces of information has a label and a value. That’s exactly what objects do in programming: they hold related data together in a single structure, using **key–value pairs**. Each key (like `name`) is a label, and its corresponding value (like `"Liam"`) is the actual piece of information.

Objects make your code more organized and readable because you can group related values into one variable instead of keeping track of several separate ones. For example, rather than having individual variables like `userName`, `userAge`, and `userEmail`, you can combine them into a single `user` object. This approach makes managing data easier — especially when passing information between functions or displaying it on a webpage.

It’s also important to understand how objects differ from arrays. Arrays store *lists of items* in order, while objects store *named pieces of information*. With arrays, you access data by index numbers (`myArray[0]`), but with objects, you access it by keys (`myObject.name`). This distinction helps you decide which one to use: arrays are best for ordered data, and objects are best for describing entities or records with properties.

---

```js
const user = {
  name: "Liam",
  age: 30,
  hobbies: ["reading", "biking"]
};
console.log(user.name);
console.log(user.hobbies[0]);
```

 **Visual**
```
user
 ├── name → "Liam"
 ├── age → 30
 └── hobbies → ["reading", "biking"]
```

💡 **Try It Yourself**
Add a new property `email` to your object and log it.

⚠️ **Common Mistake**
Confusing arrays and objects — arrays use index numbers, objects use keys.

🧰 **Pro Tip**
Use dot notation for readability (`user.name`) instead of brackets (`user["name"]`).

## Functions

When writing code, you’ll often find yourself repeating the same steps over and over again — like displaying messages, performing calculations, or validating user input. Functions solve this problem by allowing you to group code into **reusable blocks**. You define a function once, and then you can “call” it whenever you need it. This helps keep your code cleaner, more organized, and easier to understand. Think of a function as a small machine: you feed it input, it performs a task, and then it gives you output.

Functions are also important because they create boundaries in your code. Each function can handle a specific job — like a mini program inside your main program. This makes debugging easier and allows you to reuse logic in different parts of your application without copying and pasting code. For example, you could create a `calculateTotal()` function for a shopping cart and call it every time a user adds a new item.

In JavaScript, there are **three main ways** to create functions:  
1. **Function Declarations** – the traditional way to define a function.  
2. **Function Expressions** – store a function inside a variable.  
3. **Arrow Functions** – a modern, shorter syntax introduced in ES6.  

Although all three work similarly, they behave slightly differently in how they handle scope and the `this` keyword (a more advanced topic you’ll learn later).

---

### Parameters, Arguments, and Return Values

Before you can fully master functions, you need to understand **parameters**, **arguments**, and **return values** — they control how data moves in and out of a function. These concepts are at the core of how functions communicate and share data in your programs.

**Parameters** are placeholders that you define in a function’s parentheses. They act as variables that hold the data your function will use. Think of them as *input slots* — they don’t have real values yet until you call the function.

**Arguments** are the actual values you provide when you call the function. They fill in the placeholders (parameters) so the function can do its work. If a function expects two parameters, you’ll need to pass two arguments when you call it.

**Return values** are what your function sends back after it’s done running. You can think of this as the *output* of a function — the result that can be stored in a variable, displayed on the page, or used in another function.

---

### Example
```js
function add(x, y) {      // x and y are parameters
  return x + y;           // return value
}

console.log(add(3, 4));   // 3 and 4 are arguments
// Output: 7
```

- `x` and `y` are the **parameters**.  
- `3` and `4` are the **arguments**.  
- `7` is the **return value**.

If you forget to use the `return` keyword, your function will return `undefined`.

---

💡 **Try It Yourself**
1. Write a function `multiply(a, b)` that returns their product.  
2. Write another function `greetFullName(firstName, lastName)` that returns `"Hello, <firstName> <lastName>!"`.

---

### Function Declaration
A **function declaration** starts with the `function` keyword, followed by a name and parentheses.

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Ava"));
// Output: Hello, Ava!
```

**Why use it:**  
- Easy to read and understand.  
- Functions are *hoisted*, meaning you can call them before they’re defined.

---

### Function Expression
A **function expression** stores a function inside a variable.  
This is useful when you want to pass a function as data or define it dynamically.

```js
const greet = function(name) {
  return `Hi, ${name}!`;
};

console.log(greet("Ben"));
// Output: Hi, Ben!
```

**Why use it:**  
- Great for event listeners and callback functions.  
- The function only exists after it’s defined (not hoisted).

---

### Arrow Function
Arrow functions are a **modern, shorthand syntax** introduced in ES6.  
They’re often used for short or inline functions.

```js
const greet = (name) => {
  return `Hey, ${name}!`;
};

console.log(greet("Carla"));
// Output: Hey, Carla!
```

If your arrow function has **only one line**, you can skip `{}` and `return`:

```js
const square = (n) => n * n;
console.log(square(5)); // Output: 25
```

**Why use it:**  
- Shorter and cleaner.  
- Automatically binds `this` from its surrounding context (advanced topic).


## Comparison Table

| Type | Common Use | Example | Notes |
|------|-------------|---------|-------|
| Declaration | General-purpose functions | `function sayHi(){}` | Can be called before definition (hoisted) |
| Expression | Storing or passing as a variable | `const sayHi = function(){}` | Must be defined before use |
| Arrow | Short, modern syntax | `const sayHi = () => {}` | Cannot be used with `this` in some contexts |

---

### 🧰 Pro Tips
- Always name your functions clearly (`calculateTotal`, `getUserData`).  
- Keep each function focused on **one job**.  
- Test small functions in the console before adding them to a larger project.  
- Combine parameters, arguments, and return values to make your code flexible and reusable.

---

**Key Takeaways**
- A **function** is a reusable block of code that performs a task.  
- **Parameters** are placeholders for input; **arguments** are actual data passed in.  
- A **return value** sends results back to the code that called the function.  
- Understanding functions is essential — they’re the building blocks for everything from user interaction to data processing in JavaScript.


##  Callbacks (Functions as Arguments)

At this point, you already know that functions can take **parameters** and **return values**, but in JavaScript, functions are also considered **first-class citizens** — meaning you can treat them like any other value. You can store them in variables, return them from other functions, or even **pass them as arguments** into other functions. When a function is passed as an argument to another function, it’s called a **callback**.

Think of callbacks like delegating a task to another person. You tell someone (the main function) to do something, and once they’re done, they “call back” to another person (the callback function) to continue the process. This pattern is one of the most powerful features of JavaScript, especially because JavaScript often works with **asynchronous code** — like loading data, responding to user input, or handling timers — where tasks happen at different times.

In simple terms:  
A **callback** is a function you hand over to another function to be executed later — either immediately, after a delay, or when some condition is met. This makes your programs more flexible and modular, allowing you to separate *what* needs to be done from *when* it should happen.

---

### Example 1 — Basic Callback
```js
function logMessage(callback) {
  console.log("About to run callback...");
  callback(); // Execute the function passed in
}

logMessage(() => console.log("Callback executed!"));
```

**What’s happening here:**
1. The `logMessage` function expects one parameter — a function called `callback`.
2. Inside `logMessage`, we print a message, then *call* the callback using `callback()`.
3. When `logMessage()` is called, we pass in another function as the argument — an arrow function that prints `"Callback executed!"`.

 **In plain English:**  
“Run this message first, and then run whatever function I give you next.”

---

### Example 2 — Callbacks with Parameters
You can also pass data into your callback function.

```js
function greetUser(name, callback) {
  console.log("Preparing to greet...");
  callback(name);
}

function sayHello(user) {
  console.log(`Hello, ${user}!`);
}

greetUser("Ava", sayHello);
```

**How it works:**
- `sayHello` is passed as a callback into `greetUser`.
- When `greetUser` runs, it calls `callback(name)`, which runs `sayHello("Ava")`.

 **Visual**
```
Main Function → greetUser("Ava", sayHello)
Callback → sayHello("Ava")
Output:
Preparing to greet...
Hello, Ava!
```

---

### 💡 Real-Life Analogy

Imagine you’re ordering a pizza. You place your order (the main function), and the restaurant says they’ll call you when it’s ready. That “call back” from the restaurant when the pizza is done is just like how callback functions work — something happens *later* after a task finishes.

Callbacks let your code **react** to things happening — like loading data from a server, waiting for a button click, or finishing an animation.

---

### 🧰 Pro Tips
- Always name your callback clearly if it has a specific purpose (`onSuccess`, `onError`, `onComplete`).  
- Use arrow functions for quick, inline callbacks:  
  ```js
  setTimeout(() => console.log("Time’s up!"), 2000);
  ```
- Callbacks are foundational — understanding them prepares you for **Promises** and **async/await**, which are advanced tools built on top of this same concept.

### ✅ Key Takeaway
Callbacks let you **pass behavior** into functions, giving your code flexibility and control over *what happens next*. They’re one of the first steps toward mastering JavaScript’s event-driven and asynchronous nature.

## Loops

When writing code, you’ll often need to perform the same action multiple times — for example, printing numbers, checking items in a list, or processing user input. Rather than writing the same line of code again and again, you can use **loops** to repeat a task automatically.  

Loops are one of the most fundamental building blocks in programming. They allow you to **iterate** (go through) collections like arrays or strings and perform the same operation on each element. Once you understand how loops work, you’ll be able to process data more efficiently and automate repetitive tasks in your programs.

JavaScript has several types of loops, but we’ll start with the three most common:  
- **For Loop** — best for running a fixed number of times.  
- **While Loop** — best when the number of repetitions isn’t known ahead of time.  
- **For...of Loop** — best for looping through arrays or lists.

### For Loop

The **for loop** is the most traditional and commonly used loop. It has three parts:
1. **Initialization:** set a starting point (e.g., `let i = 0`)  
2. **Condition:** keep looping while this is true (e.g., `i < 5`)  
3. **Increment:** update the loop variable after each iteration (e.g., `i++`)

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

**Output:**
```
0
1
2
3
4
```

 **Explanation:**  
- The loop starts with `i = 0`.  
- It checks if `i < 5`. If true, it runs the block and prints `i`.  
- After each iteration, `i` increases by 1.  
- When `i` becomes 5, the condition is false and the loop stops.

**Visual Representation:**
```
Start → Check Condition → Run Code → Increment → Repeat → Stop
```

💡 **Try It Yourself**
Write a `for` loop that prints all even numbers between 2 and 10.

---

### While Loop

A **while loop** runs *as long as* its condition is true. It’s useful when you don’t know how many times you’ll need to loop beforehand.

```js
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
```

**Output:**
```
0
1
2
```

 **Explanation:**  
The loop checks the condition `i < 3` before each run.  
If it’s true, it runs the block, prints `i`, and increments `i`.  
If it becomes false, the loop stops.

⚠️ **Common Mistake:**  
Forgetting to update your counter (like `i++`) will cause an **infinite loop**, meaning it never stops running!

💡 **Try It Yourself**
Use a `while` loop to count down from 5 to 1.

---

### For...of Loop

The **for...of loop** is a simpler, modern way to loop through elements in an array or iterable (like strings).

```js
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
  console.log(fruit);
}
```

**Output:**
```
apple
banana
orange
```

 **Explanation:**  
- `for...of` goes through each element *in order* from the array.  
- On every loop, the variable (`fruit`) stores the current element’s value.  
- You don’t need to worry about index numbers.

💡 **Try It Yourself**
Loop through an array of numbers and log their **squares** (e.g., `num * num`).

---

### 🧰 Pro Tips

- Use **`for...of`** for arrays and lists (e.g., looping over fruits, scores, names).  
- Use **`for...in`** for objects (it loops through keys, not values).  
  ```js
  const user = { name: "Ava", age: 25 };
  for (const key in user) {
    console.log(`${key}: ${user[key]}`);
  }
  ```
- Use **`break`** to stop a loop early and **`continue`** to skip one iteration.

---

### ✅ Key Takeaways

- **For loops** repeat actions a fixed number of times.  
- **While loops** repeat until a condition becomes false.  
- **For...of loops** simplify working with arrays or strings.  
- Always ensure your loop will **eventually stop**, or you’ll create an infinite loop.  

Once you get comfortable with loops, you’ll see them everywhere — processing data, running animations, validating input, and more!

## Conditional Statements

When your program needs to **make a decision**, conditional statements choose which path to follow. They let your code react to different inputs and situations — the same way you decide what to wear based on the weather, or whether to take an umbrella if it looks cloudy. Mastering conditionals is essential because most real apps behave differently depending on user actions, data from servers, or the current state of the UI.

At a high level, you’ll use conditionals to check **boolean expressions** (true/false questions) and then run the matching block of code. JavaScript gives you several tools for this: `if / else if / else`, **nested** `if` statements for multi-level checks, the **ternary operator** for short, inline choices, and `switch` for clean branching when you have a set of discrete options (like days of the week or menu choices).

---

### ✅ If / Else: The Basics

```js
let age = 20;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

**How it works**  
- The condition `age >= 18` is evaluated.  
- If it’s `true`, the **if block** runs; otherwise, the **else block** runs.

**Else If (ladder)**  
Use `else if` to check additional, mutually exclusive conditions.

```js
const temp = 55;

if (temp >= 85) {
  console.log("Hot");
} else if (temp >= 60) {
  console.log("Mild");
} else {
  console.log("Chilly");
}
```

**Pro Tip — Order Matters:** Put the **most specific** or **highest priority** checks first. Once a condition matches, the rest are skipped.

---

### Nested If Statements

Nested `if` statements are useful when a decision depends on a **previous decision** (multi-step logic). Use sparingly and format clearly so it’s easy to read.

```js
const age2 = 17;

if (age2 > 0) {
  if (age2 >= 18) {
    console.log("Adult");
  } else if (age2 >= 13) {
    console.log("Teenager");
  } else {
    console.log("Child");
  }
} else {
  console.log("Invalid age");
}
```

**Another Nested Example — Role + Status**

```js
const role = "editor"; // "admin" | "editor" | "viewer"
const isActive = true;

if (isActive) {
  if (role === "admin") {
    console.log("Full access");
  } else if (role === "editor") {
    console.log("Edit access");
  } else {
    console.log("Read-only");
  }
} else {
  console.log("Account disabled");
}
```

**Readability Tip:** If nesting gets deep, consider **early returns / guard clauses** (in functions) or combine conditions with logical operators:

```js
if (!isActive) {
  console.log("Account disabled");
} else if (role === "admin") {
  console.log("Full access");
} else if (role === "editor") {
  console.log("Edit access");
} else {
  console.log("Read-only");
}
```

---

### Ternary Operator (Inline If)

Use the **ternary** for tiny, single-expression decisions (especially inside `console.log` or JSX):

```js
const score = 92;
const grade = score >= 90 ? "A" : "Not A";
console.log(grade);
```

Avoid chaining multiple ternaries — it becomes hard to read. Prefer `if / else` for complex logic.

---

### Switch: Clean Branching by Value

`switch` is perfect when you’re matching the **same variable** against a list of **known, discrete cases**.

```js
let color = "blue";
switch (color) {
  case "red":
    console.log("Stop");
    break;
  case "green":
    console.log("Go");
    break;
  case "blue":
    console.log("Chill");
    break;
  default:
    console.log("Unknown color");
}
```

**Why `break`?**  
Without `break`, execution **falls through** to the next case. Fall-through can be useful intentionally, but beginners usually want to stop at the first match.

**Grouped Cases (Intentional Fall-Through)**

```js
const day = "sat";
switch (day) {
  case "sat":
  case "sun":
    console.log("Weekend");
    break;
  case "mon":
  case "tue":
  case "wed":
  case "thu":
  case "fri":
    console.log("Weekday");
    break;
  default:
    console.log("Unknown day");
}
```

---

### Truthy, Falsy, and Comparisons

JavaScript will sometimes **coerce** values to `true` or `false` in conditions. These values are **falsy**: `false`, `0`, `""` (empty string), `null`, `undefined`, and `NaN`. Everything else is **truthy**.

```js
const name = "";
if (name) {
  console.log("Has a name");
} else {
  console.log("Empty string is falsy");
}
```

**Use strict equality** (`===`) to avoid type coercion surprises:

```js
console.log(5 == "5");   // true  (coerces string to number)
console.log(5 === "5");  // false (different types)
```

---

### 🧰 Common Mistakes & Pro Tips

**Mistakes**
- Using `=` (assignment) instead of `===` (comparison) in conditions.  
- Forgetting `break` in `switch` and accidentally falling through.  
- Overusing nested `if`s instead of combining conditions.  
- Comparing different types without realizing (e.g., number vs string).

**Pro Tips**
- Prefer **`===`** and **`!==`** over `==` and `!=`.  
- Order conditions from **most specific** to **least specific**.  
- Keep conditions small and readable; extract to functions when needed.  
- Use ternaries only for short expressions.

---

### ✅ Key Takeaways

- Use **`if / else if / else`** for general branching.  
- Use **nested `if`s** for multi-step logic, but keep it readable.  
- Use **ternaries** for short, inline choices.  
- Use **`switch`** when matching one value against **many discrete cases**.  
- Prefer **strict equality** (`===`) to avoid coercion surprises, and remember truthy vs falsy.

## Debugging in JavaScript 🪲

Debugging means **finding and fixing errors**.

### 1. Console Logs
```js
let total = 10 + 5;
console.log("Total:", total);
```

### 2. Read Error Messages
They show *what* went wrong and *where*.

### 3. Browser DevTools
- Open Chrome → F12 → **Sources Tab**
- Add breakpoints
- Step through code

### 4. `debugger` Keyword
```js
function add(a, b) {
  debugger;
  return a + b;
}
add(2, 3);
```

### 5. Common Errors
| Type | Example | Meaning |
|------|----------|---------|
| SyntaxError | `missing )` | Typo |
| ReferenceError | `x is not defined` | Missing variable |
| TypeError | `"abc" is not a function` | Wrong data type |

🧰 **Pro Tip**
Use `console.table()` for cleaner array/object logs.

⚠️ **Common Mistake**
Ignoring the console! It’s your best friend for debugging.

## Summary

You’ve learned:
- Variables, types, strings, arrays, objects
- Functions, loops, conditionals
- Running JS in Node & browsers
- Basic debugging skills

🎯 You now have the foundation to explore the **DOM**, **events**, and **modern JavaScript** next.
