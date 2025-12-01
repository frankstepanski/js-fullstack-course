/********************************************
 *  JSON 
 ********************************************/

// JSON = “JavaScript Object Notation”
// It is the MOST common format for storing and sending data on the internet.
//
// Think of JSON as:
// → A simple, universal language for data
// → Something that looks like a JavaScript object
// → But is actually just TEXT when sent between computers
//
// Why JSON exists:
// - Websites, servers, and apps need a way to send information to each other
// - Different programming languages (Python, Java, Ruby, JavaScript, etc.) 
//   all understand JSON
// - JSON is easy for humans to read AND easy for machines to parse
//
// JSON is used everywhere:
// - APIs (fetching data from servers)
// - Saving user preferences
// - Sending form data
// - Config files (like package.json)
// - Storing simple data in databases or localStorage
//
// The key idea:
// → JSON **looks like** a JavaScript object, but it’s actually a STRING.
// → To use JSON in JS, you must *convert* it to a real object.


/********************************************
 *  JSON RULES 
 ********************************************/

// JSON has strict rules compared to JavaScript objects:
// 1. Keys MUST be wrapped in double quotes:
//       { "name": "Luna" }
//
// 2. Strings MUST use double quotes, not single quotes
//
// 3. JSON cannot contain functions (only data)
//       no: { "sayHi": function(){} }
//
// 4. JSON does NOT support comments
//
// 5. JSON is typically transmitted as a STRING

// Example JSON string (like something you'd get from an API):
const jsonString = `
{
  "name": "Luna",
  "age": 5,
  "favoriteFood": "Pizza",
  "isFriendly": true
}
`;

console.log(jsonString); 
// -> This is a STRING, not an object!


/********************************************
 *  Converting JSON to JavaScript 
 ********************************************/

// Use JSON.parse() to turn the JSON string into a real object:
const jsonObject = JSON.parse(jsonString);

console.log(jsonObject.name); // "Luna"
console.log(typeof jsonObject); // "object"


/********************************************
 *  Converting JavaScript to JSON 
 ********************************************/

// Use JSON.stringify():
const backToJSON = JSON.stringify(jsonObject);

console.log(backToJSON);  // now it's a JSON string again


/********************************************
 *  When Developers Use JSON
 ********************************************/

// ✔ Getting data from APIs (like weather info or movie data)
// ✔ Sending data from your app to a server
// ✔ Saving data in localStorage
// ✔ Config files (package.json, tsconfig.json)
// ✔ Anytime two systems need to exchange structured info

// JSON is ESSENTIAL for web development because it lets
// browsers and servers communicate in a language they both understand.
