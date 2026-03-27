// ================================
// DOM ELEMENTS
// ================================
// We grab elements from the HTML so JavaScript can read and update the page

const searchBtn = document.querySelector("#search-btn");
const pokemonSelect = document.querySelector("#pokemon-select");
const statusEl = document.querySelector("#status");
const errorEl = document.querySelector("#error");

const cardEl = document.querySelector("#pokemon-card");
const imageEl = document.querySelector("#pokemon-image");
const nameEl = document.querySelector("#pokemon-name");
const idEl = document.querySelector("#pokemon-id");
const typesEl = document.querySelector("#pokemon-types");

// ================================
// API BASE URL
// ================================
// This is the base address for the Pokémon API
// We will add the Pokémon name to the end of this URL

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

// ================================
// EVENT LISTENER
// ================================
// When the user clicks the button, run searchPokemon()

searchBtn.addEventListener("click", searchPokemon);

// ================================
// MAIN SEARCH FUNCTION
// ================================

function searchPokemon() {
  // Get the selected Pokémon name from the dropdown
  const pokemonName = pokemonSelect.value;

  // If nothing is selected, stop and show an error
  if (!pokemonName) {
    errorEl.textContent = "Please select a Pokémon.";
    return;
  }

  // Clear old data and show loading state
  resetUI();
  statusEl.textContent = "Loading...";

  // ================================
  // ASYNCHRONOUS FETCH REQUEST
  // ================================
  // fetch() starts a network request and returns a Promise

  fetch(API_URL + pokemonName)
    .then(response => {
      // This runs when the server responds (not when data is ready yet)

      if (!response.ok) {
        // If the HTTP response failed (like 404)
        throw new Error("Pokémon not found");
      }

      // Convert the response body into JSON
      // This ALSO returns a Promise
      return response.json();
    })
    .then(data => {
      // This runs AFTER the JSON data is fully ready

      showPokemon(data);
      statusEl.textContent = "Success!";
    })
    .catch(error => {
      // This runs if ANY error happens above

      errorEl.textContent = error.message;
    });
}

// ================================
// DISPLAY POKÉMON DATA
// ================================
// This function only handles updating the page

function showPokemon(pokemon) {
  imageEl.src = pokemon.sprites.front_default;
  nameEl.textContent = pokemon.name;
  idEl.textContent = "ID: " + pokemon.id;

  // Clear previous types
  typesEl.innerHTML = "";

  // Create a "pill" for each Pokémon type
  pokemon.types.forEach(type => {
    const span = document.createElement("span");
    span.textContent = type.type.name;
    span.classList.add("type-pill");
    typesEl.appendChild(span);
  });

  // Show the card
  cardEl.style.display = "block";
}

// ================================
// RESET UI STATE
// ================================
// Clears old messages and hides the Pokémon card

function resetUI() {
  statusEl.textContent = "";
  errorEl.textContent = "";
  cardEl.style.display = "none";
  typesEl.innerHTML = "";
}

