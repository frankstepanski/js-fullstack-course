/************************************************************
 Friday JavaScript Practice Lab — Solutions

 You will solve 2 small JavaScript problems using ONLY:
 - variables
 - if statements
 - loops
 - arrays
 - functions

 You can run this file with:
 - the browser console
 - or Node.js using: node lab.js

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
