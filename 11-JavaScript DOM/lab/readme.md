# JavaScript DOM Practice Lab

:tada: Tonight’s Live DOM Manipulation Lab!

👉 **Every Friday live session will include a small hands-on lab exercise!**

You’ve already learned:
- what the DOM is  
- how browsers turn HTML into a DOM tree  
- how to access elements in JavaScript  
- how to use DOM node properties and methods  
- how to respond to user events  

Tonight we’ll take your existing Restaurant Menu or Personal Trading Card page and make it dynamic using JavaScript and the DOM API.

You should NOT rebuild everything — just add fun interactive pieces that prove you understand how the DOM works.

## 🎨 What We’re Doing

We'll take your existing page (Restaurant Menu or Personal Trading Card) and add small interactive behavior using real DOM properties and methods, including:

- document.querySelector()
- textContent
- innerHTML
- classList
- style
- setAttribute

Examples that match your project:

### Restaurant Menu
- highlight or reveal "Today's Special"
- change a menu item’s textContent
- show/hide a dessert section
- update a price using innerHTML
- add a “New Item!” badge using classList

### Personal Trading Card
- reveal a hidden "Fun Fact"
- change the character name using textContent
- toggle “rare card” styling with classList
- update a stat value (like +1 power)
- show a random ability using innerHTML

You’ll practice:
- selecting elements with querySelector
- updating DOM content dynamically
- changing styles and classes
- responding to user clicks
- showing/hiding elements
- inserting new content into the page

👉 Think: "my page actually reacts to the user!"

## 1️⃣ Add a script Tag

At the bottom of your '<body>' tag.

This ensures the DOM is fully loaded before your code runs.

### 2️⃣ Select at Least Two DOM Elements

Use document.querySelector or document.getElementById to grab:
- headings
- section titles
- menu items
- stats
- character name
- etc.

Store them in variables and console.log to confirm you selected correctly.

### 3️⃣ Change Something Dynamically

Use one of these:
- textContent
- innerHTML
- style
- classList

Examples:
- change a heading
- update a price
- increase a stat
- change a fun fact
- highlight a special item
- apply a “rare” class

### 4️⃣ Add a Button that Does Something

Create ONE new button and connect a click event listener.

When clicked, something should visibly change on the page.

Examples:
- show today’s special
- toggle dessert section
- show a fun fact
- reveal hidden stats
- increase power
- change background color

### 5️⃣ Show or Hide Something

Use a class, classList.toggle, or style.display to hide/show an element.

Examples:
- dessert section
- fun fact
- specials banner
- a featured item

### 6️⃣ Optional: Use an Array for Dynamic Content

Create a small array in JS that your click event uses:
- list of specials
- list of desserts
- list of abilities
- list of stats

Choose a random item and display it on the page using innerHTML or textContent.

## ✨ Optional Extra Flair

- toggle a dark/light theme
- highlight a rare item
- rotate through specials
- rotate through abilities
- add a “power up” button
- display random stats
- change image on click


## ❗ Keep This Small

You are not rebuilding your page — just adding ONE or TWO dynamic behaviors that prove you understand the DOM and events.

## ✅ Lab Requirements

To complete this lab, your project should include:

- a linked JavaScript file
- at least TWO queried DOM elements
- at least one DOM update (textContent, innerHTML, classList, or style)
- at least one button with a click event listener
- at least one show/hide or style change
- visible output on the page (not just console)

Optional but encouraged:
- an array for dynamic content

---

Same deal as before — build individually during class, and I’ll invite a few folks to share what their page does now using the DOM!