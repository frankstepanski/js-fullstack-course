// GIPHY GIF Search (no trending)
// ------------------------------
// - Uses GIPHY Search API with an API key
// - Text input + quick topic dropdown + result limit
// - async/await + fetch + basic error handling

const searchInput = document.querySelector('#search-input');
const topicSelect = document.querySelector('#topic-select');
const limitSelect = document.querySelector('#limit-select');
const searchBtn = document.querySelector('#search-btn');

const statusEl = document.querySelector('#status');
const errorEl = document.querySelector('#error');
const gifGrid = document.querySelector('#gif-grid');

// ⭐ Replace with your real GIPHY API key:
// Get one at: https://developers.giphy.com/
const API_KEY = 'StGEROY7n963OaOR3Cn3JMMHPbNnEXwo';

// GIPHY Search endpoint
const SEARCH_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';

// When a quick topic is chosen, fill the search input
topicSelect.addEventListener('change', () => {
  const topic = topicSelect.value;
  if (topic) {
    searchInput.value = topic;
  }
});

// Clear the grid
function clearGrid() {
  gifGrid.innerHTML = '';
}

// Render GIFs into the grid
function renderGifs(gifs) {
  clearGrid();

  if (!gifs || gifs.length === 0) {
    statusEl.textContent = 'No GIFs found. Try a different search.';
    return;
  }

  gifs.forEach((gif) => {
    const title = gif.title || 'Untitled GIF';
    const imageUrl = gif.images?.fixed_width?.url || gif.images?.downsized?.url;

    if (!imageUrl) return;

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
  });

  statusEl.textContent = `Showing ${gifs.length} GIF(s).`;
}

// Generic fetch helper
async function fetchGifs(url) {
  try {
    statusEl.textContent = 'Loading GIFs...';
    errorEl.textContent = '';
    clearGrid();
    searchBtn.disabled = true;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.status);
    }

    const data = await response.json();
    renderGifs(data.data);
  } catch (error) {
    statusEl.textContent = '';
    errorEl.textContent = error.message || 'Something went wrong.';
    console.error('GIPHY fetch error:', error);
  } finally {
    searchBtn.disabled = false;
  }
}

// Build URL for search
function buildSearchUrl(query, limit) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    q: query,
    limit: String(limit),
    rating: 'g', // G-rated for classroom safety
    lang: 'en',
  });

  return `${SEARCH_ENDPOINT}?${params.toString()}`;
}

// Handle search button click
async function handleSearchClick() {
  const rawQuery = searchInput.value.trim();
  const limit = Number(limitSelect.value);

  if (!rawQuery) {
    errorEl.textContent = 'Please type a search term or choose a quick topic.';
    statusEl.textContent = '';
    clearGrid();
    return;
  }

  const url = buildSearchUrl(rawQuery, limit);
  await fetchGifs(url);
}

// Wire up events
searchBtn.addEventListener('click', handleSearchClick);

// Optional: Enter key in the search box → search
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearchClick();
  }
});
