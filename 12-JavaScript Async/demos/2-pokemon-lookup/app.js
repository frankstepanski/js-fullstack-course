// Pokémon Lookup using fetch + Promises (Dropdown Version)
// --------------------------------------------------------
// This example shows how to:
// - Read selected value from a <select>
// - Build a dynamic URL
// - Use fetch() and .then() / .catch()
// - Handle good responses and errors
// - Update the DOM with JSON data

const searchBtn = document.querySelector('#search-btn');
const pokemonSelect = document.querySelector('#pokemon-select');
const statusEl = document.querySelector('#status');
const errorEl = document.querySelector('#error');

const cardEl = document.querySelector('#pokemon-card');
const imageEl = document.querySelector('#pokemon-image');
const nameEl = document.querySelector('#pokemon-name');
const idEl = document.querySelector('#pokemon-id');
const typesEl = document.querySelector('#pokemon-types');

// Base URL for the PokéAPI
// Docs: https://pokeapi.co/
const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Helper to clear the current card
function clearPokemonCard() {
  cardEl.style.display = 'none';
  imageEl.src = '';
  nameEl.textContent = '';
  idEl.textContent = '';
  typesEl.innerHTML = '';
}

// Main function to search for a Pokémon
function searchPokemon() {
  const name = pokemonSelect.value; // value comes from <option value="...">

  // Basic validation
  if (!name) {
    statusEl.textContent = '';
    errorEl.textContent = 'Please choose a Pokémon from the list.';
    clearPokemonCard();
    return;
  }

  // Reset UI
  statusEl.textContent = 'Searching...';
  errorEl.textContent = '';
  clearPokemonCard();

  // Build the dynamic URL
  const url = POKE_API_BASE_URL + name.toLowerCase();

  // Call fetch() which returns a Promise
  fetch(url)
    .then((response) => {
      // HTTP-level error handling (e.g., 404 if Pokémon not found)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pokémon not found. Try a different one.');
        } else {
          throw new Error('Network response was not ok: ' + response.status);
        }
      }

      // Parse JSON body, which also returns a Promise
      return response.json();
    })
    .then((data) => {
      // data is the Pokémon object
      // console.log(data); // uncomment to explore in DevTools

      // Pull out some fields
      const spriteUrl = data.sprites?.front_default;
      const displayName = data.name;
      const id = data.id;
      const types = data.types.map((t) => t.type.name);

      // Update UI
      statusEl.textContent = 'Success!';

      if (spriteUrl) {
        imageEl.src = spriteUrl;
        imageEl.alt = displayName + ' sprite';
      } else {
        imageEl.src = '';
        imageEl.alt = '';
      }

      nameEl.textContent = displayName;
      idEl.textContent = 'ID: ' + id;

      // Create type "pills"
      typesEl.innerHTML = '';
      types.forEach((typeName) => {
        const span = document.createElement('span');
        span.classList.add('type-pill');
        span.textContent = typeName;
        typesEl.appendChild(span);
      });

      cardEl.style.display = 'block';
    })
    .catch((error) => {
      // This catches:
      // - thrown Errors above
      // - network errors
      statusEl.textContent = '';
      errorEl.textContent = error.message || 'Something went wrong.';
      clearPokemonCard();
      console.error('Pokémon fetch error:', error);
    });
}

// Wire up the button click
searchBtn.addEventListener('click', searchPokemon);
