/************************************************************
 Friday JavaScript Practice Lab — Solutions

 You will solve 3 small JavaScript problems using:
 - variables
 - if statements
 - loops
 - arrays
 - objects
 - functions

 You can run this file with:
 - the browser console
 - or Node.js using: node lab.js
 ------------------------------------------------------------
************************************************************/


/************************************************************
 Problem 1: Count Products In Stock

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
 Problem 2: Count Completed Tasks

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
 Problem 3: Count Adults

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
 Problem 4: Count Students With an Average Score of 70 or Higher

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

