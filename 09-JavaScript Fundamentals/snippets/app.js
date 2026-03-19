/****************************************************
 * How to run:
 * - With Node:
 *   1. Open a terminal in this folder
 *   2. Run: node app.js
 ****************************************************/


/****************************************************
 * 1. console.log — Printing Values
 *
 * console.log() prints to the console (not the page).
 ****************************************************/

console.log("👋 Hello from JavaScript!");
console.log("This shows up in the console, not on the webpage.");


/****************************************************
 * 2. Basic Values (Types)
 ****************************************************/

console.log("Text (string)");
console.log(42);              // number
console.log(true);            // boolean
console.log(false);           // boolean
console.log(null);            // intentional "no value"

let notSetYet;
console.log(notSetYet);       // undefined (declared but not assigned)


/****************************************************
 * 3. Variables: var vs let vs const
 *
 * var   = old way (function-scoped) – avoid in modern code.
 * let   = can be reassigned (block-scoped).
 * const = cannot be reassigned (block-scoped).
 ****************************************************/

// var – works, but we usually avoid using it in new code
var oldWay = "I am var (avoid in new code)";
console.log(oldWay);

// let – good for values that change
let counter = 0;
counter = counter + 1;
console.log("counter with let:", counter);

// const – good for values that do NOT change
const pi = 3.14;
// pi = 3.15; // ❌ This would cause an error
console.log("pi with const:", pi);


/****************************************************
 * 4. Equality: == vs === vs !==
 *
 * ==  (loose equality)  → compares values, does type coercion
 * === (strict equality) → compares value AND type (recommended)
 * !== (strict not equal)
 ****************************************************/

console.log("5 == '5' :", 5 == "5");     // true  (same value, JS converts types)
console.log("5 === '5':", 5 === "5");    // false (number vs string)
console.log("5 === 5  :", 5 === 5);      // true
console.log("5 != '5' :", 5 != "5");     // false
console.log("5 !== '5':", 5 !== "5");    // true (different types)

// For most modern JS, prefer === and !==


/****************************************************
 * 5. If Statements (and Nested Ifs)
 *
 * if (condition) { ... } else { ... }
 ****************************************************/

let hour = 22; // 10 PM

if (hour < 12) {
  console.log("Good morning!");
} else if (hour < 18) {
  console.log("Good afternoon!");
} else {
  console.log("Good evening!");
}

// Nested if: an if inside another if
let isOpen = true;
let isHoliday = false;

if (isOpen) {
  if (!isHoliday) {
    console.log("We are open today!");
  } else {
    console.log("We are closed for a holiday.");
  }
} else {
  console.log("We are closed right now.");
}


/****************************************************
 * 6. switch Statement
 *
 * switch is an alternative to many else-if checks.
 ****************************************************/

let day = "Friday";

switch (day) {
  case "Monday":
    console.log("Start of the week.");
    break;
  case "Friday":
    console.log("Almost the weekend!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("It's the weekend!");
    break;
  default:
    console.log("Just another day.");
}


/****************************************************
 * 7. Loops: for and do...while
 *
 * Loops repeat code.
 * Most common modern loop for counting is: for
 ****************************************************/

// for loop (most common for basic counting)
for (let i = 1; i <= 3; i++) {
  console.log("for loop i:", i);
}

// do...while loop
// Runs AT LEAST once, then checks the condition.
let x = 1;
do {
  console.log("do...while x:", x);
  x++;
} while (x <= 3);

// Using if inside loops + breaking (exiting) a loop early
for (let n = 1; n <= 10; n++) {
  if (n === 5) {
    console.log("Stopping the loop at n =", n);
    break; // exit the loop completely
  }
  console.log("n is:", n);
}

// Why break? 
// To stop once you’ve found something or to avoid unnecessary work.


/****************************************************
 * 8. Arrays — Lists of Values
 *
 * Why use arrays?
 * - To store multiple related values in one variable.
 * - Example: list of toppings, menu items, customers, etc.
 ****************************************************/

let toppings = ["pepperoni", "mushrooms", "onions"];

// Index:
// - Arrays are zero-based: first item is index 0
console.log("First topping:", toppings[0]);  // pepperoni
console.log("Second topping:", toppings[1]); // mushrooms
console.log("Number of toppings:", toppings.length);


/****************************************************
 * 9. Basic Array Methods
 *
 * push()    → add to the end
 * pop()     → remove from the end
 * unshift() → add to the beginning
 * shift()   → remove from the beginning
 * indexOf() → find an item’s index
 * includes()→ check if item exists
 ****************************************************/

console.log("Original toppings:", toppings);

toppings.push("olives"); // add to end
console.log("After push:", toppings);

let last = toppings.pop(); // remove last item
console.log("Popped item:", last);
console.log("After pop:", toppings);

toppings.unshift("extra cheese"); // add to beginning
console.log("After unshift:", toppings);

let first = toppings.shift(); // remove first item
console.log("Shifted item:", first);
console.log("After shift:", toppings);

console.log("Index of 'onions':", toppings.indexOf("onions"));
console.log("Includes 'pepperoni'?:", toppings.includes("pepperoni"));


/****************************************************
 * 10. Objects — Grouping Related Data
 *
 * Object literal = using { } to define an object.
 ****************************************************/

// Basic object literal
let customer = {
  name: "Jordan",
  phone: "555-1234",
  isVIP: true,
};

console.log("Customer object:", customer);
console.log("Customer name:", customer.name);
console.log("Customer phone:", customer["phone"]);

// Nested object literal (object inside object)
let order = {
  id: 1,
  customer: {
    name: "Alex",
    phone: "555-9876",
  },
  items: ["Margherita", "Garlic Bread"],
  total: 19.99,
};

console.log("Order object:", order);
console.log("Order customer name:", order.customer.name);
console.log("First order item:", order.items[0]);


/********************************************
 *  10.1 DOT NOTATION vs BRACKET NOTATION
 ********************************************/

// DOT NOTATION
// - Most common
// - Must use valid JS identifier (no spaces, no dashes)

console.log(person.age);      // OK
// console.log(person.favorite-food); // ❌ won't work (dash breaks it)

// BRACKET NOTATION
// - Allows strings, variables, dynamic keys
// - Useful when property names come from user input, APIs, or contain spaces

console.log(person["favoriteFood"]); // OK

const key = "name";
console.log(person[key]); // dynamic! useful when key is unknown until runtime

/****************************************************
 * 11. Looping Through Arrays
 *
 * Why loop through arrays?
 * - Arrays often hold LISTS of things:
 *     - menu items
 *     - users
 *     - scores
 * - A loop lets you do something with EACH item:
 *     - print it
 *     - check a condition
 *     - calculate a total
 *
 * Two very common ways to loop over arrays:
 *  1) Classic for loop  → you control the index (i)
 *  2) for...of loop     → you work with the value directly
 ****************************************************/

let menuItems = ["Margherita", "Pepperoni", "Veggie", "BBQ Chicken"];

/****************************************************
 * 11.1 Classic for loop
 *
 * Pattern:
 *  for (start; condition; step) {
 *    // code
 *  }
 *
 * In arrays, we usually:
 *  - start at 0  (first index)
 *  - loop while i < array.length
 *  - increase i by 1 each time
 ****************************************************/

for (let i = 0; i < menuItems.length; i++) {
  // i = current index (0, 1, 2, …)
  // menuItems[i] = item at that index
  console.log("Menu item (for): index =", i, "| value =", menuItems[i]);
}

/****************************************************
 * Why use the classic for loop?
 * - You need the index (position in the array)
 * - You want to skip specific positions using if
 * - You want to loop backwards or in custom steps
 ****************************************************/

// Example: print only items at even indexes (0, 2, …)
for (let i = 0; i < menuItems.length; i++) {
  if (i % 2 === 0) {
    console.log("Even index item:", i, menuItems[i]);
  }
}

// Example: loop backwards (from last item to first)
for (let i = menuItems.length - 1; i >= 0; i--) {
  console.log("Backward loop item:", i, menuItems[i]);
}


/****************************************************
 * 11.2 for...of loop (cleaner for arrays)
 *
 * Pattern:
 *  for (let value of array) {
 *    // use value
 *  }
 *
 * You don’t manually work with indexes here.
 * You just get each value in order.
 ****************************************************/

for (let item of menuItems) {
  console.log("Menu item (for...of):", item);
}

/****************************************************
 * When to use for...of?
 * - When you only care about the values
 * - When you don’t need the index
 * - When you want simpler, cleaner code
 ****************************************************/


/****************************************************
 * 11.3 Using if statements inside loops
 *
 * Very common pattern:
 * - Loop through an array
 * - Check a condition
 * - Do something when the condition is true
 ****************************************************/

// Example: check if a specific pizza is on the menu
let searchFor = "Veggie";
let found = false;

for (let item of menuItems) {
  if (item === searchFor) {
    found = true;
    console.log(searchFor, "is on the menu!");
    break; // stop loop early when we find it
  }
}

if (!found) {
  console.log(searchFor, "is NOT on the menu.");
}


/****************************************************
 * 11.4 Using a loop to build up a string or number
 *
 * Another common pattern:
 * - Start with something simple (like 0 or "")
 * - Loop through items
 * - Add to that value each time
 ****************************************************/

// Example: create a single string listing all menu items
let menuSummary = "Tonight's pizzas: ";

for (let i = 0; i < menuItems.length; i++) {
  menuSummary += menuItems[i];

  // Add a comma after each item except the last one
  if (i < menuItems.length - 1) {
    menuSummary += ", ";
  }
}

console.log(menuSummary);


/****************************************************
 * 12. Looping Through Objects
 *
 * Arrays = lists of values (ordered, index-based)
 * Objects = collections of key/value pairs (unordered)
 *
 * Example:
 *  {
 *    name: "Moonlight Pizza Co.",
 *    city: "Raleigh",
 *    isOpen: true
 *  }
 *
 * Why loop over objects?
 * - To inspect all properties
 * - To log or display info
 * - To transform data (e.g., building strings, sending to APIs)
 *
 * Common ways to loop over an object:
 *  1) for...in           → loops over keys
 *  2) Object.keys()      → gets an array of keys, then you loop that
 *  3) Object.entries()   → gets array of [key, value] pairs (optional intro)
 ****************************************************/

let restaurant = {
  name: "Moonlight Pizza Co.",
  address: "123 Moonlight Ave",
  city: "Raleigh",
  isOpen: true,
};


/****************************************************
 * 12.1 for...in — Looping Over Keys
 *
 * Pattern:
 *  for (let key in object) {
 *    // use key
 *    // use object[key] to get the value
 *  }
 *
 * Notes:
 *  - key is a string (e.g., "name", "city")
 *  - restaurant[key] gives you the value
 ****************************************************/

for (let key in restaurant) {
  const value = restaurant[key]; // bracket notation needed here
  console.log("Key:", key, "| Value:", value);
}

/****************************************************
 * When to use for...in?
 * - When you just want to see all properties
 * - When you don’t care about the order
 * - When you want a quick way to inspect an object
 ****************************************************/


/****************************************************
 * 12.2 Object.keys() — Get an Array of Keys
 *
 * Object.keys(object) returns an ARRAY of the object’s keys.
 *
 * Example:
 *  Object.keys(restaurant)
 *  → ["name", "address", "city", "isOpen"]
 *
 * Once you have an array of keys, you can:
 *  - use a classic for loop
 *  - use for...of
 *  - use array methods later (map, filter, etc.)
 ****************************************************/

let keys = Object.keys(restaurant);
console.log("Restaurant keys array:", keys);

// Loop with for...of over the keys array
for (let k of keys) {
  const value = restaurant[k];
  console.log(`Key: ${k} | Value: ${value}`);
}


/****************************************************
 * 12.3 Object.entries() — Keys and Values Together
 *
 * Object.entries(object) returns an ARRAY of [key, value] pairs:
 *
 *  Object.entries(restaurant)
 *  → [
 *       ["name", "Moonlight Pizza Co."],
 *       ["address", "123 Moonlight Ave"],
 *       ["city", "Raleigh"],
 *       ["isOpen", true]
 *     ]
 *
 * This is super handy when you want both the key and the value
 * at the same time in a loop.
 ****************************************************/

let entries = Object.entries(restaurant);
console.log("Restaurant entries:", entries);

for (let [key, value] of entries) {
  console.log(`(entries) Key: ${key} | Value: ${value}`);
}


/****************************************************
 * 12.4 Using if + loops with objects
 *
 * Very common pattern:
 *  - Loop through keys
 *  - Check for specific key or value
 ****************************************************/

// Example: Check if the restaurant object has a "city" property
let hasCity = false;

for (let key in restaurant) {
  if (key === "city") {
    hasCity = true;
    break; // we can stop once we find it
  }
}

if (hasCity) {
  console.log("This restaurant has a city property:", restaurant.city);
} else {
  console.log("No city property found.");
}


/****************************************************
 * 12.5 Combining Objects with Strings
 *
 * Build a human-readable description from an object.
 ****************************************************/

let description = `${restaurant.name} is located at ${restaurant.address} in ${restaurant.city}.`;

if (restaurant.isOpen) {
  description += " We are currently open!";
} else {
  description += " We are currently closed.";
}

console.log(description);


/****************************************************
 * 13. Functions
 *
 * A function is a reusable piece of code.
 * You can "call" it (or "invoke" it) whenever you need it.
 *
 * Three common ways to define functions:
 *  1) Function declaration
 *  2) Function expression
 *  3) Arrow function
 *
 * Also important:
 *  - Parameters: the names in the function definition
 *  - Arguments:  the actual values you pass in
 ****************************************************/

// 13.1 Function Declaration
// - Can be used (called) before or after it's defined (due to "hoisting").

function greet(name) { // `name` is a parameter
  console.log("Hello, " + name + "!");
}

// "Alex" is an argument
greet("Alex");
greet("Jordan");

// 13.2 Function Expression
// - Function is stored in a variable
// - Not hoisted the same way; must be defined before you use it.

const sayGoodbye = function (name) {
  console.log("Goodbye, " + name + "!");
};

sayGoodbye("Sam");


// 13.3 Arrow Function (ES6+)
// - Shorter syntax, very common in modern JS.
// - Especially used with array methods and callbacks.

const add = (a, b) => {
  // if ..
  // loops ..
  // lots of code ..
  return a + b;
};

console.log("add(2, 3):", add(2, 3));

// Arrow function with ONE parameter can omit parentheses:
const double = x => {
  return x * 2;
};

console.log("double(5):", double(5));

// Arrow function with a single expression can omit `return` and { }:
// This is called an "implicit return".
const triple = x => x * 3;
console.log("triple(4):", triple(4));


// 13.4 Parameters vs Arguments (more explicit)

// Function with two parameters
function makePizza(size, topping) {
  console.log(`Making a ${size} pizza with ${topping}.`);
}

// Values we pass in are arguments
makePizza("large", "pepperoni");    // size = "large", topping = "pepperoni"
makePizza("medium", "mushrooms");   // size = "medium", topping = "mushrooms"


/********************************************
 *  14. NUMBERS & MATH IN JAVASCRIPT 
 ********************************************
 *
 * JavaScript has only ONE number type.
 * That means:
 *   - Whole numbers → 10
 *   - Decimals → 3.14
 *   - Negative numbers → -5
 *   - Very large numbers → 1_000_000
 *   - Scientific notation → 1e6
 *
 * JS uses a system called “floating-point numbers.”
 * This is why you sometimes see weird results like:
 *   0.1 + 0.2 === 0.3   → false 😅
 *
 * But for beginners, the important thing is:
 *   → Numbers in JS all behave the same way.
 *
 * You will use numbers constantly for:
 *   - Counting things (like cart totals)
 *   - Tracking score in games
 *   - Measuring time or animation frames
 *   - Loops (for i = 0; i < 10; i++)
 *   - Math for layouts, grids, randomness
 *
 * JavaScript also has a built-in "Math" object
 * that provides useful tools:
 *   - Math.round()   → round to nearest integer
 *   - Math.floor()   → round down
 *   - Math.ceil()    → round up
 *   - Math.random()  → generate randomness
 *   - Math.max()     → find highest number
 *   - Math.min()     → find lowest number
 *
 * Random numbers are VERY common:
 *   - choosing a random item from an array
 *   - dice rolls, card games, guessing games
 *   - generating random colors
 *   - creating test data
 *
 * You'll also frequently convert between
 * strings ↔ numbers:
 *   Number("42")     → converts to number
 *   parseInt("10px") → reads from the start
 *   parseFloat("3.14") → gets decimals too
 *
 * Most common math mistakes beginners make:
 *  - Forgetting to convert input (inputs are STRINGS)
 *  - Confusing addition (+) with string concatenation
 *      "5" + 1 → "51" (string!)
 *      Number("5") + 1 → 6 (correct)
 *
 ********************************************/

// Basic examples
const score = 42;        // integer
const price = 19.99;     // decimal
const temperature = -5;  // negative number

console.log(score, price, temperature);


// Converting strings to numbers
const age = Number("25");       // preferred modern method
const count = parseInt("10");   // stops at the first non-number
const percentage = parseFloat("99.5"); // handles decimals

console.log(age, count, percentage);


// Common Math functions
console.log(Math.round(4.7));  // 5 (nearest)
console.log(Math.floor(4.7));  // 4 (down)
console.log(Math.ceil(4.2));   // 5 (up)
console.log(Math.max(5, 10, 3)); // 10
console.log(Math.min(5, 10, 3)); // 3


// Random numbers
console.log(Math.random()); // random number 0–1 which is 0.1 to 0.9999...

// Random integer between 1–10
const randomOneToTen = Math.floor(Math.random() * 10) + 1;
console.log(randomOneToTen);


// Using numbers in loops
for (let i = 0; i < 5; i++) {
  console.log("Loop count:", i);
}


// Using numbers for conditions
const pizzasOrdered = 3;

if (pizzasOrdered > 2) {
  console.log("You qualify for a discount!");
}


// Common scenario:
const inputValue = "5";
console.log(inputValue + 1);           // "51" (string!)
console.log(Number(inputValue) + 1);   // 6 (correct)


/****************************************************
 * 15. Callbacks
 *
 * A callback is a function that you pass INTO another
 * function as an argument, so it can be called later.
 *
 * In JavaScript, functions are "first-class citizens":
 *  - You can store them in variables
 *  - You can pass them to other functions
 *  - You can return them from functions
 *
 * Where are callbacks used?
 *  - Array methods (forEach, map, filter)
 *  - Timers (setTimeout, setInterval)
 *  - Fetching data (async code)
 *  - Event handlers (click, submit, etc.)
 *
 * Below is a VERY simple example (no DOM, no events).
 ****************************************************/


// 15.1 Basic callback example
// A function that performs some math using a callback

function doMath(a, b, operationCallback) {
  // `operationCallback` is EXPECTED to be a function
  // .. other code
  // other code ..

  const result = operationCallback(a, b);
  console.log("Result of operation:", result);
}

// We create some simple operation functions:
function addNumbers(x, y) {
  return x + y;
}

function multiplyNumbers(x, y) {
  return x * y;
}

// Now we pass these functions AS ARGUMENTS (callbacks):
doMath(2, 3, addNumbers);       // operationCallback = addNumbers
doMath(4, 5, multiplyNumbers);  // operationCallback = multiplyNumbers


// 15.2 Using an arrow function as a callback (inline)
// Instead of defining a named function, we can pass an arrow function directly:

doMath(10, 3, (x, y) => x - y);   // subtract
doMath(9, 2, (x, y) => x / y);   // divide


// 15.3 Callback pattern with a "process and then log" style

function processOrder(orderId, callback) {
  console.log("Processing order:", orderId);

  // Imagine some work happens here (like talking to a server)
  // After the "work" is done, we call the callback:
  callback(orderId);
}

// A callback function that runs AFTER processing
function notifyCustomer(orderId) {
  console.log(`Order ${orderId} is ready! Notifying customer...`);
}

processOrder(101, notifyCustomer);

// Again, we can also pass an inline arrow function:
processOrder(102, id => {
  console.log(`Order ${id} completed. Sending confirmation email...`);
});


/****************************************************
 * 16. Variable Scope
 *
 * "Scope" = where a variable is visible / can be used.
 *
 * In JavaScript (modern usage with let/const), the main
 * types of scope you’ll see are:
 *
 *  - Global scope   → available everywhere
 *  - Function scope → available only inside that function
 *  - Block scope    → available only inside { } (if, for, etc.)
 *
 * var   → function-scoped (ignores block scope)
 * let   → block-scoped
 * const → block-scoped
 ****************************************************/


/****************************************************
 * 16.1 Global Scope
 *
 * A variable declared OUTSIDE of any function or block
 * is in the global scope. It can be read inside functions.
 ****************************************************/

let restaurantName = "Moonlight Pizza Co."; // global

function printRestaurantName() {
  // can “see” the global variable
  console.log("Restaurant (from function):", restaurantName);
}

printRestaurantName();
console.log("Restaurant (from global):", restaurantName);


/****************************************************
 * 16.2 Function Scope
 *
 * Variables declared INSIDE a function are only visible
 * inside that function.
 ****************************************************/

function createGreeting() {
  let message = "Welcome to Moonlight Pizza!"; // function-scoped
  console.log("Inside function:", message);
}

createGreeting();

// console.log("Outside function:", message); 
// ❌ This would cause an error: message is not defined outside


/****************************************************
 * 16.3 Block Scope (let / const)
 *
 * A block is anything inside { }:
 * - if ( ... ) { ... }
 * - for ( ... ) { ... }
 * - while ( ... ) { ... }
 *
 * let and const respect block scope.
 ****************************************************/

if (true) {
  let blockMessage = "Hello from inside an if-block!";
  console.log(blockMessage); // ✅ works here
}

// console.log(blockMessage); 
// ❌ Error: blockMessage is not defined (outside the block)


/****************************************************
 * 16.4 var vs let in Blocks
 *
 * var does NOT respect block scope, only function scope.
 * This is one of the reasons we avoid var in modern JS.
 ****************************************************/

if (true) {
  var usingVar = "I ignore block scope 😅";
  let usingLet = "I am block-scoped";
}

console.log("usingVar outside if:", usingVar); // ✅ works (function/global scoped)
// console.log("usingLet outside if:", usingLet); 
// ❌ Error: usingLet is not defined (block-scoped)


/****************************************************
 * 16.5 Scope Inside Loops
 ****************************************************/

for (let i = 0; i < 3; i++) {
  console.log("Inside loop, i =", i);
}
// console.log("Outside loop, i =", i); 
// ❌ Error: i is not defined (block-scoped with let)

for (var j = 0; j < 3; j++) {
  console.log("Inside loop, j =", j);
}
console.log("Outside loop, j =", j); // ✅ works (var is function/global scoped)


/****************************************************
 * 16.6 Nested Functions and Scope Chain
 *
 * Inner functions can “see” variables from outer functions,
 * but outer functions CANNOT see inside inner functions.
 ****************************************************/

function outerFunction() {
  let outerMessage = "I am from outerFunction";

  function innerFunction() {
    let innerMessage = "I am from innerFunction";
    console.log(outerMessage); // ✅ can see outer
    console.log(innerMessage); // ✅ can see inner
  }

  innerFunction();

  // console.log(innerMessage); 
  // ❌ Error: innerMessage is not defined here
}

outerFunction();

/****************************************************
 * 17. Mini Algorithms 
 *
 *
 * These are small “algorithms”:
 *  1) Check if a value is inside an array
 *  2) Count the number of characters in a string
 *  3) Sum all numbers in an array
 *  4) Find the largest number in an array
 ****************************************************/


/****************************************************
 * 17.1 Check if a value is inside an array
 *
 * Problem:
 *  - Given an array and a value, return true if the
 *    value is found in the array, otherwise false.
 *
 * Steps:
 *  1. Loop through each item in the array
 *  2. Compare the current item with the value
 *  3. If they match → return true
 *  4. After the loop finishes with no match → return false
 ****************************************************/

function containsValue(array, valueToFind) {
  // Loop over every element in the array
  for (let i = 0; i < array.length; i++) {
    // If current element matches, we found it
    if (array[i] === valueToFind) {
      return true; // exit the function early
    }
  }

  // If we get here, the value was not found
  return false;
}

// Example usage:
const toppingsList = ["pepperoni", "mushrooms", "onions"];

console.log("Contains 'pepperoni'?", containsValue(toppingsList, "pepperoni")); // true
console.log("Contains 'olives'?", containsValue(toppingsList, "olives"));       // false


/****************************************************
 * 17.2 Count the number of characters in a string
 *
 * Problem:
 *  - Given a string, count how many characters it has.
 *
 * Note:
 *  - We could just use str.length
 *  - But we'll use a loop to see how it works manually.
 ****************************************************/

function countCharacters(str) {
  let count = 0;

  // Loop over string characters by index
  for (let i = 0; i < str.length; i++) {
    // We could add if-checks here to skip spaces, etc.
    count = count + 1;
  }

  return count;
}

// Example usage:
console.log("Characters in 'pizza':", countCharacters("pizza"));
console.log("Characters in 'Moonlight Pizza Co.':", countCharacters("Moonlight Pizza Co."));


/****************************************************
 * 17.3 Sum all numbers in an array
 *
 * Problem:
 *  - Given an array of numbers, return the total sum.
 *
 * Steps:
 *  1. Start with total = 0
 *  2. Loop through each number
 *  3. Add each number to total
 *  4. Return total
 ****************************************************/

function sumArray(numbers) {
  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    total = total + numbers[i];
  }

  return total;
}

// Example usage:
const orderTotals = [12.99, 8.5, 5.0]; // maybe pizzas + drink
console.log("Sum of orderTotals:", sumArray(orderTotals)); // 26.49


/****************************************************
 * 17.4 Find the largest number in an array
 *
 * Problem:
 *  - Given an array of numbers, return the largest one.
 *
 * Steps:
 *  1. Assume the first element is the largest
 *  2. Loop through the rest of the array
 *  3. If we find a bigger number, update "currentMax"
 *  4. Return "currentMax" at the end
 ****************************************************/

function findMax(numbers) {
  if (numbers.length === 0) {
    // Edge case: empty array
    return undefined;
  }

  let currentMax = numbers[0]; // start with first number

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > currentMax) {
      currentMax = numbers[i];
    }
  }

  return currentMax;
}

// Example usage:
const ratings = [4.2, 4.8, 3.9, 5.0, 4.5];

console.log("Max rating:", findMax(ratings)); // 5.0
