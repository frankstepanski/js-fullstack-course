/************************************************************
 Friday JavaScript Practice Lab — Continued (Problems 5–7)

 You will solve 3 increasingly complex JavaScript problems using:
 - variables
 - if statements
 - loops
 - arrays
 - objects
 - functions

 These problems build toward real algorithm thinking:
 - tracking values
 - frequency counting
 - validating all conditions

 You can run this file with:
 - the browser console
 - or Node.js using: node lab.js
 ------------------------------------------------------------
************************************************************/


/************************************************************
 Problem 5: Find the Most Expensive Item In Stock

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
 Problem 6: Count Word Frequencies

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
 Problem 7: Find Students Who Passed All Subjects

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
