/* =====================================================
   1️⃣ Grab Elements From the Page
   =====================================================

   querySelector() finds elements in our HTML so
   JavaScript can interact with them.
*/

const topicSelect = document.querySelector('#topic-select');
const limitSelect = document.querySelector('#limit-select');
const searchBtn = document.querySelector('#search-btn');

const statusEl = document.querySelector('#status');
const errorEl = document.querySelector('#error');
const gifGrid = document.querySelector('#gif-grid');


/* =====================================================
   2️⃣ API Configuration
   ===================================================== */

const API_KEY = 'StGEROY7n963OaOR3Cn3JMMHPbNnEXwo';
const SEARCH_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';


/* =====================================================
   3️⃣ Helper: Clear the Grid
   ===================================================== */

function clearGrid() {
  gifGrid.innerHTML = '';
}


/* =====================================================
   4️⃣ Render GIFs to the Page
   =====================================================

   The API returns an array of GIF objects.
   We loop through them and create HTML elements.
*/

function renderGifs(gifs) {
  clearGrid();

  if (gifs.length === 0) {
    statusEl.textContent = 'No GIFs found.';
    return;
  }

  for (let i = 0; i < gifs.length; i++) {
    const gif = gifs[i];

    const title = gif.title ? gif.title : 'Untitled GIF';
    const imageUrl = gif.images.fixed_width.url;

    const card = document.createElement('div');
    card.classList.add('gif-card');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;

    const caption = document.createElement('div');
    caption.classList.add('gif-caption');
    caption.textContent = title;

    card.appendChild(img);
    card.appendChild(caption);

    gifGrid.appendChild(card);
  }

  statusEl.textContent = `Showing ${gifs.length} GIF(s).`;
}


/* =====================================================
   5️⃣ Understanding URLSearchParams
   =====================================================

   WHAT ARE QUERY PARAMETERS?

   When calling an API, extra information is added
   after a question mark (?) in the URL.

   Example:

   https://api.giphy.com/v1/gifs/search?api_key=ABC&q=cats&limit=10

   Everything after the ? is called "query parameters".

   Manually building that string can cause bugs:

   ❌ Forgetting ?
   ❌ Forgetting &
   ❌ Breaking spaces
   ❌ Not encoding special characters

   -----------------------------------------------------

   WHAT DOES URLSearchParams DO?

   It safely builds the query string for us.

   Think of it as:

   "A translator that turns a JavaScript object
    into a properly formatted URL query string."

   It:
   ✔ Adds = signs
   ✔ Adds & between parameters
   ✔ Encodes spaces automatically
   ✔ Prevents subtle URL bugs

   Example:

   const params = new URLSearchParams({
     api_key: 'ABC',
     q: 'funny cats',
     limit: 10
   });

   params.toString()

   Output:
   api_key=ABC&q=funny%20cats&limit=10

   Notice:
   The space becomes %20 automatically.

   That is URL encoding.
*/


function buildSearchUrl(topic, limit) {

  const params = new URLSearchParams({
    api_key: API_KEY,
    q: topic,
    limit: String(limit),
    rating: 'g',
    lang: 'en'
  });

  // Combine endpoint + query string
  return `${SEARCH_ENDPOINT}?${params.toString()}`;
}


/* =====================================================
   6️⃣ Asynchronous Programming (async / await)
   =====================================================

   WHAT IS HAPPENING HERE?

   fetch() sends a request over the internet.

   The internet takes time.

   JavaScript does NOT stop the entire program
   while waiting.

   Instead:

   - fetch() returns a Promise
   - await pauses THIS function only
   - The rest of JavaScript can still run

   async means:
   "This function contains asynchronous code."

   await means:
   "Wait for this Promise to finish before continuing."
*/


async function fetchGifs(url) {

  try {
    statusEl.textContent = 'Loading GIFs...';
    errorEl.textContent = '';
    clearGrid();
    searchBtn.disabled = true;

    // STEP 1: Send request
    const response = await fetch(url);

    // STEP 2: Check if request worked
    if (!response.ok) {
      throw new Error('Network error: ' + response.status);
    }

    /*
      STEP 3:
      Convert response into usable JavaScript data.

      response.json() ALSO returns a Promise.
      So we must await it.
    */
    const data = await response.json();

    /*
      Now data is real JavaScript.

      The GIPHY API puts GIFs inside:
      data.data
    */
    renderGifs(data.data);

  } catch (error) {

    /*
      If anything fails:
      - No internet
      - Invalid API key
      - Bad response
      - Server issue

      This block runs.
    */

    statusEl.textContent = '';
    errorEl.textContent = error.message;
    console.error(error);

  } finally {

    /*
      finally runs no matter what.
      Success or failure.
    */
    searchBtn.disabled = false;
  }
}


/* =====================================================
   7️⃣ When Button Is Clicked
   ===================================================== */

async function handleSearchClick() {

  const topic = topicSelect.value;
  const limit = Number(limitSelect.value);

  const url = buildSearchUrl(topic, limit);

  await fetchGifs(url);
}


/* =====================================================
   8️⃣ Connect Button to Function
   ===================================================== */

searchBtn.addEventListener('click', handleSearchClick);


/*
=========================================================
MENTAL MODEL 
=========================================================

1️⃣ User selects topic + limit
2️⃣ We build a safe API URL using URLSearchParams
3️⃣ fetch() sends request
4️⃣ await waits for response
5️⃣ await waits for JSON conversion
6️⃣ We render GIFs
7️⃣ If something fails, catch handles it

IMPORTANT:

JavaScript is single-threaded.
It does not freeze while waiting for the internet.
That is why async / await exists.

=========================================================
*/
