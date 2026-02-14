// ===============================
// 1. Synchronous vs Asynchronous
// ===============================
//
// ✅ When to use synchronous code:
// - For simple, quick operations that run one after another
// - When nothing depends on waiting (no network calls, no timers, no I/O)
// - Great for teaching basic execution order

// Synchronous code: runs top-to-bottom in order
console.log('Sync #1: Hello World');
console.log('Sync #2: Hello World');
console.log('Sync #3: Hello World');

// Asynchronous code: scheduled to run later
//
// ✅ When to use setTimeout (basic async pattern):
// - Simulating slow work (like a network request) in demos
// - Delaying something on purpose (e.g., show a message later)
// - Teaching the event loop and async behavior
setTimeout(() => {
  console.log('Async: Hello World (after 2 seconds)');
}, 2000); // runs ONCE after 2 seconds

// More synchronous code (these run BEFORE the timeout above fires)
console.log('Sync #4: Hello World');
console.log('Sync #5: Hello World');

// ===================================
// 2. Event loop ordering with setTimeout
// ===================================
//
// ✅ When to use this pattern:
// - To show students that callbacks run *after* the current call stack finishes
// - To debug “why did this log later?” questions
// - To explain why async code doesn’t block the rest of the script

function demoSetTimeoutOrder() {
  // This runs first (synchronous)
  console.log('Order Demo: I run at the beginning');

  // This is scheduled to run later (asynchronous)
  setTimeout(() => {
    console.log('Order Demo: I run inside the setTimeout callback');
  }, 500);

  // This runs second (still synchronous, runs BEFORE the timeout callback)
  console.log('Order Demo: I run at the end (before the timeout callback)');
}

demoSetTimeoutOrder();

// ===============================
// 3. Native Promise Example
// ===============================
//
// ✅ When to use "new Promise":
// - Wrapping older callback-based APIs into Promises
// - Building your own async abstractions (e.g., custom delay(), retry logic)
// - Teaching how Promises really work under the hood
//
// ❌ Usually NOT needed when using modern APIs like fetch()
//    (they already return Promises, so you don’t need `new Promise` there)

function createNativePromise() {
  // Promise: a built-in class that wraps asynchronous work
  const promise = new Promise((resolve, reject) => {
    // Some asynchronous code:
    setTimeout(() => {
      // After 2 seconds, either resolve OR reject:
      resolve('I am a resolved promise!!!');
      // If you want to test rejection instead, comment out resolve above and uncomment this:
      // reject('I am a rejected promise!!!');
    }, 2000);
  });

  // Basic .then usage (runs when the promise is resolved)
  promise.then((data) => {
    console.log('First then:', data);
  });

  // Chaining example:
  // ✅ When to use chaining:
  // - When you want to transform data step by step
  // - When each step depends on the previous result
  promise
    .then((data) => {
      console.log('Second then (chained):', data);
      // You could return something here to pass it down the chain
      return data.toUpperCase();
    })
    .then((uppercased) => {
      console.log('Chained value:', uppercased);
    })
    .catch((error) => {
      // This runs if the promise is rejected
      console.log('Promise error:', error);
    });
}

createNativePromise();

// ===============================
// 4. Using async/await with a Native Promise
// ===============================
//
// ✅ When to use async/await:
// - When you want async code that looks like “normal” synchronous code
// - When you want clean try/catch style error handling
// - When you want easier-to-read workflows instead of long .then chains
// - Awesome for most modern APIs: fetch(), DB calls, server requests, etc.

async function runAsyncExample() {
  // Define the simulated async task inside the same function
  function simulateAsyncTask() {
    return new Promise((resolve, reject) => {
      console.log('⏳ Starting async task...');

      setTimeout(() => {
        const success = true; // Change to false to test rejection

        if (success) {
          resolve('✅ Task completed after 2 seconds!');
        } else {
          reject('❌ Task failed after 2 seconds!');
        }
      }, 2000);
    });
  }

  // Use await to run the async task and handle the result
  try {
    const result = await simulateAsyncTask(); // Wait for promise to resolve
    console.log('🎉 Result:', result);

    const upper = result.toUpperCase(); // Transform the result
    console.log('🔠 Uppercased:', upper);
  } catch (error) {
    console.error('⚠️ Error:', error); // Catch any rejection
  }
}

runAsyncExample();

// ===============================
// 5. Using Promises (then/catch) with fetch()
// ===============================
//
// ✅ When to use .then/.catch with fetch():
// - When you’re working in older codebases that already use then/catch
// - When you want to demonstrate the "classic" Promise style
// - When you’re chaining multiple independent async tasks
//
// 🔁 Pattern: "do something, then do something with the result"

function createPromiseFetchNative() {
  // fetch() returns a Promise
  fetch('https://api.github.com/users/github')
    .then((response) => {
      // Step 1: Check if the response is OK (status 200–299 and 300-399)
      if (!response.ok) {
        // Manually trigger an error to be caught in .catch()
        throw new Error('Network response was not ok: ' + response.status);
      }
      // Step 2: Parse JSON body (also returns a Promise)
      return response.json();
    })
    .then((data) => {
      // Step 3: Work with the fetched data
      console.log('Promise fetch data:', data);
    })
    .catch((error) => {
      // Step 4: Catch and handle any errors
      console.log('Promise fetch error:', error.message);
    });
}

createPromiseFetchNative();


// ===============================
// 6. Using async/await with fetch()
// ===============================
//
// ✅ When to use async/await with fetch():
// - When you want cleaner, top-to-bottom readable code
// - When working with multiple fetches or steps that depend on each other
// - When you want try/catch error handling instead of .catch()
//
// 🔁 Pattern: "wait for the result, then work with it"

async function fetchWithAsyncAwait() {
  try {
    // Step 1: Wait for fetch to complete
    const response = await fetch('https://api.github.com/users/github');

    // Step 2: Check if response was successful (status 200-299 and 300-399)
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.status);
    }

    // Step 3: Parse the JSON body (also async)
    const data = await response.json();

    // Step 4: Do something with the result
    console.log('Async/await fetch data:', data);

  } catch (error) {
    // Step 5: Handle errors (network, parsing, etc.)
    console.error('Async/await fetch error:', error.message);
  }
}

// Run the function
fetchWithAsyncAwait();
