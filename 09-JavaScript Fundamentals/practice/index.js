/************************************************************
 ------------------------------------------------------------
 Problem 1: Count Numbers Greater Than 10

 Goal:
 Given an array of numbers, count how many values are greater than 10.

 Example:
 countGreaterThanTen([3, 12, 5, 20, 8]) → 2

 Hints:
 - start a counter at 0
 - loop through the array
 - use an if statement to check each number
 - increase the counter when the condition is true
 ------------------------------------------------------------
************************************************************/

function countGreaterThanTen(numbers) {
  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 10) {
      count++;
    }
  }

  return count;
}

// Test
console.log(countGreaterThanTen([3, 12, 5, 20, 8])); // 2


/************************************************************
 Problem 2: Count Words Longer Than 3 Letters

 Goal:
 Given an array of words, count how many words have more than 3 letters.

 Example:
 countLongWords(["cat", "tree", "sun", "apple"]) → 2

 Hints:
 - start a counter at 0
 - loop through the array
 - check the length of each word
 - increase the counter when the condition is true
************************************************************/

function countLongWords(words) {
  let count = 0;

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 3) {
      count++;
    }
  }

  return count;
}

// Test
console.log(countLongWords(["cat", "tree", "sun", "apple"])); // 2


/************************************************************
 Problem 3: Count Products In Stock

 Goal:
 Given an object where the keys are product names and the values
 are the number of items in stock, count how many products have
 at least 1 item available.

 Example:
 countInStock({
   apples: 5,
   bananas: 0,
   oranges: 3,
   pears: 0
 }) → 2

 Hints:
 - start a counter at 0
 - loop through the object
 - check the stock count for each product
 - increase the counter when the value is greater than 0
************************************************************/

function countInStock(inventory) {
  let count = 0;

  for (let product in inventory) {
    if (inventory[product] > 0) {
      count++;
    }
  }

  return count;
}

// Test
console.log(
  countInStock({
    apples: 5,
    bananas: 0,
    oranges: 3,
    pears: 0
  })
); // 2


/************************************************************
 Problem 4: Count Completed Tasks

 Goal:
 Given an object where each key is a task name and the value
 is another object describing the task, count how many tasks
 are marked as completed.

 Each task object looks like this:
 {
   completed: true or false,
   priority: "low" | "medium" | "high"
 }

 Example:
 countCompletedTasks({
   homework: { completed: true, priority: "high" },
   laundry: { completed: false, priority: "low" },
   shopping: { completed: true, priority: "medium" }
 }) → 2

 Hints:
 - start a counter at 0
 - loop through the outer object using for...in
 - access the inner object for each task
 - check the completed property
 - increase the counter when completed is true
************************************************************/

function countCompletedTasks(tasks) {
  let count = 0;

  for (let taskName in tasks) {
    if (tasks[taskName].completed === true) {
      count++;
    }
  }

  return count;
}

// Test
console.log(
  countCompletedTasks({
    homework: { completed: true, priority: "high" },
    laundry: { completed: false, priority: "low" },
    shopping: { completed: true, priority: "medium" }
  })
); // 2

/************************************************************
 Problem 5: Count Adults

 Goal:
 Given an array of person objects, count how many people
 are 18 years old or older.

 Each person object looks like this:
 {
   name: "Alice",
   age: 22
 }

 Example:
 countAdults([
   { name: "Alice", age: 22 },
   { name: "Bob", age: 16 },
   { name: "Carol", age: 30 }
 ]) → 2

 Hints:
 - start a counter at 0
 - loop through the array
 - access the age property on each object
 - increase the counter when age is 18 or higher
************************************************************/

function countAdults(people) {
  let count = 0;

  for (let i = 0; i < people.length; i++) {
    if (people[i].age >= 18) {
      count++;
    }
  }

  return count;
}

// Test
console.log(
  countAdults([
    { name: "Alice", age: 22 },
    { name: "Bob", age: 16 },
    { name: "Carol", age: 30 }
  ])
); // 2


/************************************************************
 Problem 6: Count Students With an Average Score of 70 or Higher

 Goal:
 Given an array of student objects, count how many students
 have an average score of 70 or higher.

 Each student object looks like this:
 {
   name: "Alice",
   scores: [80, 75, 90]
 }

 Steps to think through:
 - loop through the array of students
 - for each student, loop through their scores array
 - calculate the average score
 - check if the average is 70 or higher
 - count how many students pass

 Example:
 countPassingStudents([
   { name: "Alice", scores: [80, 75, 90] },
   { name: "Bob", scores: [60, 65, 70] },
   { name: "Carol", scores: [100, 90, 95] }
 ]) → 2
************************************************************/

function countPassingStudents(students) {
  let count = 0;

  for (let i = 0; i < students.length; i++) {
    let total = 0;

    for (let j = 0; j < students[i].scores.length; j++) {
      total += students[i].scores[j];
    }

    let average = total / students[i].scores.length;

    if (average >= 70) {
      count++;
    }
  }

  return count;
}

// Test
console.log(
  countPassingStudents([
    { name: "Alice", scores: [80, 75, 90] },
    { name: "Bob", scores: [60, 65, 70] },
    { name: "Carol", scores: [100, 90, 95] }
  ])
); // 2


/************************************************************
 Problem 7: Find the Most Expensive Item In Stock

 Goal:
 Given an array of product objects, return the name of the
 most expensive product that is currently in stock.

 Ignore products that have a stock of 0.

 Each product object looks like this:
 {
   name: "Laptop",
   price: 1200,
   stock: 3
 }

 Example:
 findMostExpensiveInStock([
   { name: "Laptop", price: 1200, stock: 3 },
   { name: "Phone", price: 800, stock: 0 },
   { name: "Tablet", price: 600, stock: 5 }
 ]) → "Laptop"

 Steps to think through:
 - keep track of the highest price found so far
 - keep track of the corresponding product name
 - loop through the array
 - only consider products that are in stock
************************************************************/

function findMostExpensiveInStock(products) {
  const best = {
    price: -1,
    name: null
  };

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (product.stock > 0 && product.price > best.price) {
      best.price = product.price;
      best.name = product.name;
    }
  }

  return best.name;
}

// Test
console.log(
  findMostExpensiveInStock([
    { name: "Laptop", price: 1200, stock: 3 },
    { name: "Phone", price: 800, stock: 0 },
    { name: "Tablet", price: 600, stock: 5 }
  ])
); // "Laptop"



/************************************************************
 Problem 8: Count Word Frequencies

 Goal:
 Given a string, return an object that counts how many times
 each word appears.

 The string will contain words separated by spaces.
 Ignore case (treat "Hello" and "hello" as the same word).

 Example:
 countWords("hello world hello") →
 {
   hello: 2,
   world: 1
 }

 Steps to think through:
 - convert the string to lowercase
 - split the string into an array of words
 - create an empty object
 - loop through the words
 - increase the count for each word
************************************************************/

function countWords(text) {
  let words = text.toLowerCase().split(" ");
  let counts = {};

  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    if (counts[word]) {
      counts[word]++;
    } else {
      counts[word] = 1;
    }
  }

  return counts;
}

// Test
console.log(countWords("hello world hello"));
// { hello: 2, world: 1 }

/************************************************************
 Problem 9: Find Students Who Passed All Subjects

 Goal:
 Given an array of student objects, return a new array
 containing the names of students who passed ALL subjects.

 A passing score is 70 or higher.

 Each student object looks like this:
 {
   name: "Alice",
   scores: {
     math: 80,
     english: 75,
     science: 90
   }
 }

 Example:
 findPassingStudents([
   {
     name: "Alice",
     scores: { math: 80, english: 75, science: 90 }
   },
   {
     name: "Bob",
     scores: { math: 60, english: 72, science: 68 }
   }
 ]) → ["Alice"]

 Steps to think through:
 - create an empty array for passing students
 - loop through each student
 - assume the student is passing
 - loop through their scores
 - if any score is below 70, mark them as failing
 - only add students who pass everything
************************************************************/

function findPassingStudents(students) {
  let passingStudents = [];

  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    let passedAll = true;

    for (let subject in student.scores) {
      if (student.scores[subject] < 70) {
        passedAll = false;
        break;
      }
    }

    if (passedAll) {
      passingStudents.push(student.name);
    }
  }

  return passingStudents;
}

// Test
console.log(
  findPassingStudents([
    {
      name: "Alice",
      scores: { math: 80, english: 75, science: 90 }
    },
    {
      name: "Bob",
      scores: { math: 60, english: 72, science: 68 }
    },
    {
      name: "Carol",
      scores: { math: 90, english: 88, science: 92 }
    }
  ])
); // ["Alice", "Carol"]
