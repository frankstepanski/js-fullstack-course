# JavaScript Objects & Classes

## Objects and Data Modeling in Applications

In real-world software development — whether you're using JavaScript, Python, Java, or any modern language — **objects are the building blocks of application data models**.

### Why Objects Matter

Objects let you **model real-world entities** (like users, posts, carts, or players) and **organize data** around behavior and responsibilities. They serve as the core **data structures** in both front-end and back-end systems.

- In a **to-do app**, each task is an object with properties (`title`, `completed`) and methods (`toggleDone()`).
- In a **shopping cart**, you model products, carts, discounts, and users with interrelated objects.
- In a **game**, players, enemies, weapons, and the game state are all modeled with objects and classes.

### Why Object Design Choices Matter

How you define and use objects affects:
- **Scalability**: Will your object structure support new features later?
- **Maintainability**: Are your objects organized cleanly, or tightly coupled?
- **Performance**: Are you creating unnecessary deep copies or mutating state accidentally?
- **Testability**: Can you isolate objects for unit tests?

### When Object Structure Really Matters

- **Data syncing in real-time apps**: Objects need to mirror database structure or API formats.
- **Forms with nested fields**: Modeling nested objects (like `user.address.city`) impacts reactivity and validation.
- **UI State Management**: Objects represent states of modals, toggles, or components (like in React).
- **Network payloads and serialization**: JSON and REST APIs rely on objects, and shape matters.


## Object Literals Review

JavaScript **object literals** are one of the simplest and most powerful tools in the language. They're used to group together **related data** and **functions that act on that data**.

```js
const cat = {
  name: "Mochi",
  age: 3,
  breed: "Tabby",
  meow() {
    console.log("Meow!");
  },
  birthday() {
    this.age++;
  }
};

cat.meow(); // Meow!
console.log(cat.name); // Mochi
cat.birthday();
console.log(cat.age); // 4
```

### Key Concepts

- Use **dot notation** (`cat.name`) or **bracket notation** (`cat["name"]`) to access properties.
- You can store **functions as methods** inside the object.
- You can use the keyword **`this`** inside methods to refer to the object itself.
- Objects can hold **nested data** like arrays or other objects.

```js
const player = {
  username: "Hero42",
  stats: {
    health: 100,
    mana: 50
  },
  inventory: ["sword", "potion", "shield"]
};

console.log(player.stats.health); // 100
console.log(player.inventory[1]); // potion
```

### Why Object Literals Are Useful

- Great for organizing settings, configurations, and entities
- Helps structure data without creating a formal class
- Flexible and dynamic — you can add or remove properties at runtime

```js
player.level = 5;
delete player.stats.mana;
```

### Use Cases

- UI components (like button states, modal visibility)
- Configuration objects (theme settings, API headers)
- Data fetched from APIs (typically returned as objects)
- Modeling game characters, blog posts, or users

**TL;DR:** Object literals are the most basic building block of JavaScript OOP — everything else builds on top of them.

## Why Copying Objects Matters

In JavaScript, objects are **reference types**. This means when you assign an object to a new variable, you're not copying it — you're **pointing to the same memory**.

### 🚨 What Happens Without Copying?
```js
const original = { name: "Luna" };
const alias = original;
alias.name = "Nova";

console.log(original.name); // Nova 😱 (also changed!)
```

- Mutating the alias mutates the original
- Can cause **bugs** if reused/shared across code
- Becomes especially dangerous when dealing with **state**, **props**, or **API data**

### When Should You Copy?
- To prevent **side effects**
- To preserve **original state**
- When returning a modified copy from a function
- When dealing with **immutable patterns** (like in React or Redux)

That’s where **shallow** and **deep cloning** comes in.

### Reference vs Copy

**Without Copying (Reference Shared)**

```
original --> { name: "Luna" }
   |
alias -----^ (same object)
```

**With Copying (Separate Objects)**

```
original --> { name: "Luna" }

copy     --> { name: "Luna" } (separate in memory)
```

### Shallow vs Deep Clone

**Shallow Clone:**

```
original --> { 
  name: "Luna", 
  traits: --> { cute: true } 
}

shallow --> { 
  name: "Nova", 
  traits: ---^ (shared reference!) 
}
```

**Deep Clone:**

```
original --> { 
  name: "Luna", 
  traits: --> { cute: true } 
}

deep     --> { 
  name: "Nova", 
  traits: --> { cute: true } (copied too!) 
}
```

## Shallow vs Deep Cloning

Copying an object seems easy — but references matter!

### ❗ Shallow Clone (copies top level only)
```js
const original = { name: "Luna", traits: { cute: true } };
const shallow = { ...original };

shallow.name = "Nova";
shallow.traits.cute = false;

console.log(original.traits.cute); // ❌ false (changed!)
```

### ✅ Deep Clone (copies all levels)

#### 1. JSON Method (Simple but Limited)
```js
const deep = JSON.parse(JSON.stringify(original));
```
- ❌ Loses functions, `undefined`, `Symbol`, `Date`, `Map`, `Set`
- ❌ Fails with circular references

#### 2. Structured Clone API (Modern & Reliable)
```js
const deepCopy = structuredClone(original);
```
- ✅ Handles circular refs, Dates, Maps, Sets, TypedArrays
- 🚫 Not supported in older browsers

#### 3. Manual Recursive Clone (Custom Logic)
```js
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const clone = {};
  for (const key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}
```

#### 4. Lodash `cloneDeep` (Production-Ready)
```js
import cloneDeep from 'lodash/cloneDeep';
const deep = cloneDeep(original);
```

### Summary Table

| Method                          | Handles Complex Types | Circular Refs | Keeps Functions | Notes                        |
|---------------------------------|------------------------|----------------|------------------|------------------------------|
| `JSON.stringify/parse`         | ❌                    | ❌             | ❌               | Fast, but lossy              |
| `structuredClone()`            | ✅                    | ✅             | ❌               | Modern browsers only         |
| Manual recursive function      | ⚠️ Partially          | ⚠️ Needs extra | ✅ if coded      | Great for learning           |
| `lodash.cloneDeep()`           | ✅                    | ✅             | ✅               | Best for real-world projects |

## Classes 

A **class** is a blueprint for creating multiple similar objects — it defines how an object should look and behave.

JavaScript’s class syntax is **inspired by other object-oriented languages** like Java, Python, or C#. But under the hood, JavaScript is **prototype-based**, not class-based. That means classes are mostly **syntactic sugar** for using constructor functions and prototypes.

### 📌 When to Use Classes in JavaScript

Use a class when:
- You want to create **many instances** of the same kind of object (like many players, cars, pets, etc.)
- You want to **encapsulate** data and behavior in one place
- You want to use **inheritance** or **polymorphism**
- You’re modeling real-world entities with reusable logic

### Class vs Object Literal vs Function

| Feature              | Class                         | Object Literal                 | Factory Function                  |
|----------------------|-------------------------------|-------------------------------|-----------------------------------|
| Reusable?            | ✅ Yes (many instances)        | ❌ No                          | ✅ Yes                            |
| Simple structure?    | ⚠️ More setup                 | ✅ Very simple                | ✅ Fairly simple                  |
| Best for             | Complex, reusable models       | One-off configs or small data  | Encapsulation, closures           |
| Syntax               | `class MyClass {}`             | `const obj = {}`              | `function makeObj() {}`           |

### Basic Class Example

```js
class Pet {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  speak() {
    console.log(`${this.name} the ${this.type} makes a noise.`);
  }
}

const pet1 = new Pet("Fido", "dog");
pet1.speak(); // Fido the dog makes a noise.
```

### What Is a Constructor?

- The `constructor()` method is a special function that automatically runs when a new instance is created with `new ClassName(...)`.
- It sets up the initial state of the object.
- Inside a constructor, `this` refers to the object being created.

### Behind the Scenes: What Happens

```js
const pet1 = new Pet("Fido", "dog");
```

Steps under the hood:
1. A new empty object is created: `{}`
2. The object’s internal `[[Prototype]]` is set to `Pet.prototype`
3. The constructor runs with `this` bound to the new object
4. The initialized object is returned

### Under the Hood

A class is syntactic sugar for this:

```js
function Pet(name, type) {
  this.name = name;
  this.type = type;
}
Pet.prototype.speak = function () {
  console.log(`${this.name} the ${this.type} makes a noise.`);
};
```

JavaScript still uses **prototypes** to link object behavior.

## What Is a Prototype in JavaScript?

In JavaScript, every object has a hidden internal property called `[[Prototype]]`, which refers to another object. This forms a **prototype chain**.

### Why It Matters

When you access a property or method on an object, JavaScript first looks at the object itself. If it doesn't find it, it checks the object's prototype, then the prototype's prototype, and so on.

This allows **inheritance of behavior**.

### Example

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound.`);
};

const dog = new Animal("Buddy");
dog.speak(); // Buddy makes a sound.
```

Even though `speak` is not defined directly on `dog`, it works because `dog.__proto__` (its prototype) points to `Animal.prototype`, which contains the method.

## Constructor Functions (Pre-ES6)

Before `class` syntax existed, JavaScript used **constructor functions** with `new`:

```js
function Pet(name, type) {
  this.name = name;
  this.type = type;
}

Pet.prototype.speak = function () {
  console.log(`${this.name} the ${this.type} makes a noise.`);
};

const pet2 = new Pet("Luna", "cat");
pet2.speak(); // Luna the cat makes a noise.
```

This still works and is functionally equivalent to using `class`, but `class` syntax is more modern and readable.

### Big Picture

- JavaScript is **prototype-based**, not class-based at its core.
- Classes are just **syntactic sugar** over this prototype system.
- Understanding prototypes helps you debug and extend objects effectively.


## Factory Functions

An alternative to classes — just return an object.

```js
function createCar(make, model) {
  return {
    make,
    model,
    honk() {
      console.log("Beep beep!");
    }
  };
}

const myCar = createCar("Toyota", "Corolla");
myCar.honk();
```

- No `new` keyword needed
- Easier for simple objects or closures

## Inheritance in JavaScript

**Inheritance** is one of the core principles of **Object-Oriented Programming (OOP)**, alongside **Encapsulation**, **Abstraction**, and **Polymorphism**.

### What is Inheritance?

Inheritance allows one class (a **child** or **subclass**) to take on the properties and methods of another class (a **parent** or **superclass**). This promotes **code reuse**, **consistency**, and a clear **hierarchical structure**.

JavaScript uses **prototypal inheritance**, and with ES6 classes, this is abstracted into a familiar `class` / `extends` syntax.

- Avoids duplicating code across similar objects
- Makes code easier to maintain and extend
- Supports polymorphism — different classes can share the same interface

#### 💡 Real-Life Analogy

Imagine a base class `Vehicle`. Cars, trucks, and motorcycles are all types of vehicles and share common behavior like starting, stopping, and refueling — but may have their own special features.

#### Example: Basic Class Inheritance

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog("Buddy");
dog.speak(); // Buddy barks.
```

- `Dog` inherits from `Animal`
- `Dog` overrides the `speak()` method
- `super` keyword can be used to access the parent class

#### Example: Using `super()`

```js
class Bird extends Animal {
  constructor(name, canFly) {
    super(name); // call Animal constructor
    this.canFly = canFly;
  }

  speak() {
    super.speak(); // call Animal's speak
    console.log(this.canFly ? "It flies away!" : "It cannot fly.");
  }
}

const parrot = new Bird("Polly", true);
parrot.speak();
// Polly makes a noise.
// It flies away!
```

### When to Use Inheritance

Use inheritance when:
- You have **multiple similar types** that share behavior
- You want to create **base functionality** that can be extended
- You want to apply **polymorphism** (same method name, different behavior)

Avoid inheritance when:
- Objects don’t share meaningful behavior
- Composition (has-a) is a better fit than inheritance (is-a)


## Mini-Games Using Classes

### 1. Dice Roller

```js
class Dice {
  constructor(sides = 6) {
    this.sides = sides;
  }
  roll() {
    return Math.floor(Math.random() * this.sides) + 1;
  }
}

const d6 = new Dice();
console.log(d6.roll());
```

### 2. Simple Battle Game

```js
class Player {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
  }

  attack(target) {
    const dmg = Math.floor(Math.random() * 10) + 1;
    target.hp -= dmg;
    console.log(`${this.name} hits ${target.name} for ${dmg} damage!`);
  }
}

const p1 = new Player("Knight", 50);
const p2 = new Player("Orc", 50);

p1.attack(p2);
```

### 3. Virtual Pet

```js
class VirtualPet {
  constructor(name) {
    this.name = name;
    this.hunger = 5;
    this.happiness = 5;
  }

  feed() {
    this.hunger--;
    console.log(`${this.name} has been fed.`);
  }

  play() {
    this.happiness++;
    console.log(`${this.name} is happier!`);
  }

  status() {
    console.log(`${this.name}'s hunger: ${this.hunger}, happiness: ${this.happiness}`);
  }
}

const pet = new VirtualPet("Fluffy");
pet.feed();
pet.play();
pet.status();
```

### 4. Rock Paper Scissors

```js
class RPSGame {
  constructor() {
    this.choices = ["rock", "paper", "scissors"];
  }

  play(playerChoice) {
    const aiChoice = this.choices[Math.floor(Math.random() * 3)];
    console.log(`You: ${playerChoice}, AI: ${aiChoice}`);

    if (playerChoice === aiChoice) {
      console.log("It's a tie!");
    } else if (
      (playerChoice === "rock" && aiChoice === "scissors") ||
      (playerChoice === "paper" && aiChoice === "rock") ||
      (playerChoice === "scissors" && aiChoice === "paper")
    ) {
      console.log("You win!");
    } else {
      console.log("You lose!");
    }
  }
}

const game = new RPSGame();
game.play("rock");
```

## Wrap Up

JavaScript gives you many ways to work with data:
- Start with **objects and functions**
- Move to **classes** when building interactive, stateful systems (like games)
- Learn **OOP** concepts like inheritance, abstraction, and encapsulation to scale your code