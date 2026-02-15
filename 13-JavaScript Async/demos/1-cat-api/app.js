// ================================
// DOM ELEMENTS
// ================================
// These connect JavaScript to the HTML page

const loadCatBtn = document.querySelector('#load-cat-btn');
const statusEl = document.querySelector('#status');
const errorEl = document.querySelector('#error');
const catImageEl = document.querySelector('#cat-image');

// ================================
// API ENDPOINT
// ================================
// This URL returns a random cat image
// The response is an array with one object inside

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

// ================================
// EVENT LISTENER
// ================================
// Run this code when the button is clicked

loadCatBtn.addEventListener('click', () => {
  // ================================
  // RESET UI STATE
  // ================================
  // Give immediate feedback to the user

  statusEl.textContent = 'Loading a random cat...';
  errorEl.textContent = '';
  catImageEl.style.display = 'none';
  catImageEl.src = '';
// ================================
// ASYNCHRONOUS FETCH REQUEST
// ================================
//
// IMPORTANT FOR BEGINNERS:
//
// fetch() does NOT freeze the program.
// It starts a network request and returns a Promise.
//
// While the network request is in progress:
// - the browser stays responsive
// - click events can still fire
// - other JavaScript can still run
//
// This behaves the SAME way as async / await.
// The only difference is syntax, not behavior.
//

fetch(CAT_API_URL)
  .then((response) => {
    // This function runs LATER
    // when the server sends a response back.
    //
    // Until this runs, JavaScript is free
    // to handle clicks, UI updates, and other events.

    if (!response.ok) {
      // Handles HTTP errors (like 500 or 404)
      // Throwing an Error skips to the .catch() below
      throw new Error('Network response was not ok: ' + response.status);
    }

    // Convert the response into usable JSON.
    //
    // response.json() ALSO returns a Promise.
    // JavaScript waits asynchronously for it.
    //
    // Again: the program does NOT freeze here.
    return response.json();
  })
  .then((data) => {
    // This runs AFTER the JSON Promise resolves.
    //
    // While we were waiting:
    // - the page stayed interactive
    // - event listeners still worked
    // - nothing was blocked

    // The API returns an array like:
    // [{ url: "https://cat-image-url.jpg" }]
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No cat image found in response');
    }

    const catObj = data[0];
    const imageUrl = catObj.url;

    // Update the UI with the image
    statusEl.textContent = 'Here is your random cat! 🐱';
    catImageEl.src = imageUrl;
    catImageEl.style.display = 'block';
  })
  .catch((error) => {
    // This catches:
    // - network errors
    // - thrown Errors above
    // - JSON parsing issues
    //
    // Errors are also handled asynchronously.
    // Even errors do NOT freeze the app.

    statusEl.textContent = '';
    errorEl.textContent = 'Something went wrong: ' + error.message;
    console.error('Cat fetch error:', error);
  });
}); // closes addEventListener
