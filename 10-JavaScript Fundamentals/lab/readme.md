# JavaScript Practice Lab 

:tada: Tonight’s Live JavaScript Lab Activity!

👉 **Every Friday live session will include a small hands-on lab exercise!**

You’ve already built a small project:
- a **Restaurant Menu**, or  
- a **Personal Trading Card**  

You’ve just learned JavaScript fundamentals:
- variables  
- if statements and loops  
- arrays and objects  
- functions  

Tonight, you’ll imagine a **real need** for JavaScript based on your project and build a tiny “logic engine” in a single `.js` file that you run with **Node**.

No HTML needed. You’re just modeling your idea with JavaScript.

## 🎨 What We’re Doing

You’ll choose one path:

- **Restaurant Mode** → simulate a menu + order logic  
- **Trading Card Mode** → simulate card stats + random events  

In both paths, you will:
- create a JavaScript file  
- model data with arrays and objects  
- use loops to process that data  
- write functions to perform real tasks  
- use if statements to make decisions  
- write at least one callback function  
- run everything with the `node` command  

👉 Think: “I’m coding the brain behind my page.”

### 1️⃣ Create Your JavaScript File

Create a new file for this lab, for example:

- `restaurant-lab.js` if you choose Restaurant Mode  
- `trading-card-lab.js` if you choose Trading Card Mode  

This will be the only file you run with `node`.

### 2️⃣ Pick Your Mode and Story

Choose **one**:

### Restaurant Mode – “Order Helper”
Imagine your restaurant wants a tiny program to:
- keep track of menu items and prices  
- calculate the total cost of an order  
- apply a discount for large orders or specials  

### Trading Card Mode – “Card Stats Engine”
Imagine your trading card game needs a tiny program to:
- store character stats and abilities  
- calculate an overall “power score”  
- randomly choose an ability for an attack  

Pick the one that matches the page you built, or the one that sounds more fun.

### 3️⃣ Model Your Data (Arrays + Objects)

Create **at least one array** and **one object** that make sense for your chosen mode.

### Restaurant Mode examples:
- an array of menu item objects (each with name, price, isSpecial)  
- an object representing one customer order (items chosen, maybe a name)  

### Trading Card Mode examples:
- an array of stats or abilities (like “strength”, “speed”, “magic”)  
- an object representing your main card (name, level, isLegendary, stats)  

This should feel like a JavaScript version of the information you showed on your web page.

### 4️⃣ Use a Loop to Process Data

Write **at least one loop** that goes through your array and logs useful information.

### Restaurant Mode:
- loop through all menu items and log “name – price”  
- or loop through the items in an order and show each item  

### Trading Card Mode:
- loop through all stats and log their names and values  
- or loop through abilities and log each one in a “card stats” style  

When you run your file with `node`, you should see a list of meaningful lines in the console.

### 5️⃣ Use If Statements for Logic

Create **at least one if statement** that reacts to your data.

### Restaurant Mode ideas:
- if the total price is above a certain amount, log “You get a discount!”  
- if an item is marked as special, log “Today’s Special: [name]”  
- if there are no items in the order, log a message instead of a total  

### Trading Card Mode ideas:
- if level is high enough, log “This card is powerful!”  
- if isLegendary is true, log a special message  
- if a stat is above a threshold, log “Maxed-out stat: [name]”  

Keep it simple, but make it feel like a real check your system would do.

### 6️⃣ Write Functions That Do Real Work

Create **at least one function** that uses your arrays/objects to perform a specific task.

### Restaurant Mode function ideas:
- a function that calculates the total price of an order  
- a function that prints the full menu nicely  
- a function that filters only items marked as specials  

### Trading Card Mode function ideas:
- a function that calculates a “power score” based on stats  
- a function that prints a formatted card description  
- a function that filters abilities by type or power level  

Call your function near the bottom of the file so it actually runs when you use `node`.
### 7️⃣  Run Your Program with Node

From your project folder, run:

- `node restaurant-lab.js`  
  or  
- `node trading-card-lab.js`  

Check the console output:
- Do the loops show what you expect?  
- Are the if statements triggering correctly?  
- Are your functions being called?  
- Is the callback doing something visible (like logging each item or ability)?  

Make a small change and run it again. Repeat a few times until it feels comfortable.

## ✨ Optional Extra Flair

If you finish early, try one or two of these:

- calculate and log a “discounted total” in Restaurant Mode  
- generate a random “battle result” in Trading Card Mode  
- create a function that returns a value (not just logs) and use the result in another function  
- build a small “menu of actions” (like “calculateTotal”, “showSpecials”, “showPowerScore”) and call them one after another  

Focus on keeping everything readable and well-named.

## ✅ Lab Requirements

To complete this lab, your JavaScript file should include:

- chosen **mode**: Restaurant or Trading Card  
- at least **one array** and **one object** that model your data  
- at least **one loop**  
- at least **one if statement**  
- at least **one function** that does something meaningful  
- at least **one callback function**  
- and it should run with `node` and produce useful console output that matches your story  

---

Same deal as before — build individually during class, and I’ll invite a few folks to share their program output and explain what their JavaScript is doing!
