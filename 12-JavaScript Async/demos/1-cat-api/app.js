// Random Cat Fetch Demo 🐱
// ------------------------------------------
// This example shows:
// 1. Use fetch(), which returns a Promise
// 2. Use .then() to handle the response
// 3. Use .catch() to handle errors
// 4. Update the page (DOM) with the result

const loadCatBtn = document.querySelector('#load-cat-btn');
const statusEl = document.querySelector('#status');
const errorEl = document.querySelector('#error');
const catImageEl = document.querySelector('#cat-image');

// The Cat API endpoint for a random image
// Docs: https://thecatapi.com/
// Basic endpoint (no API key needed):
const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

// Click handler for the button
loadCatBtn.addEventListener('click', () => {
  // Clear any previous messages and image
  statusEl.textContent = 'Loading a random cat...';
  errorEl.textContent = '';
  catImageEl.style.display = 'none';
  catImageEl.src = '';

  // 1. Call fetch() – this returns a Promise
  fetch(CAT_API_URL)
    // 2. Handle the HTTP response
    .then((response) => {
      if (!response.ok) {
        // Non-2xx status codes end up here
        throw new Error('Network response was not ok: ' + response.status);
      }
      // Convert the response body to JSON (also returns a Promise)
      return response.json();
    })
    // 3. Use the JSON data
    .then((data) => {
      // The Cat API returns an array like: [{ url: "https://..." }]
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No cat image found in response');
      }

      const catObj = data[0];
      const imageUrl = catObj.url;

      statusEl.textContent = 'Here is your random cat! 🐱';
      catImageEl.src = imageUrl;
      catImageEl.style.display = 'block';
    })
    // 4. Handle any errors from above (network problems, thrown Error, etc.)
    .catch((error) => {
      statusEl.textContent = '';
      errorEl.textContent = 'Something went wrong: ' + error.message;
      console.error('Cat fetch error:', error);
    });
});
