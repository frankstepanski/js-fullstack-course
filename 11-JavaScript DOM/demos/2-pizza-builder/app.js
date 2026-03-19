const state = {
  size: "medium",
  basePrice: 12,
  glutenFree: false,
  toppings: [],
  nextToppingId: 1
};

// DOM elements
const sizeSelect = document.querySelector("#sizeSelect");
const glutenCheckbox = document.querySelector("#glutenCheckbox");
const toppingSelect = document.querySelector("#toppingSelect");
const addToppingBtn = document.querySelector("#addToppingBtn");
const toppingsList = document.querySelector("#toppingsList");
const summaryText = document.querySelector("#summaryText");
const totalPriceEl = document.querySelector("#totalPrice");
const resetBtn = document.querySelector("#resetBtn");

// Events
sizeSelect.addEventListener("change", () => {
  const option = sizeSelect.selectedOptions[0];
  state.size = option.value;
  state.basePrice = Number(option.dataset.price);
  render();
});

glutenCheckbox.addEventListener("change", () => {
  state.glutenFree = glutenCheckbox.checked;
  render();
});

addToppingBtn.addEventListener("click", () => {
  const option = toppingSelect.selectedOptions[0];
  const name = option.value;
  const price = Number(option.dataset.price);

  // ❗ Prevent duplicate toppings
  const alreadyAdded = state.toppings.some(
    topping => topping.name === name
  );

  if (alreadyAdded) {
    return; // do nothing if topping already exists
  }

  state.toppings.push({
    id: state.nextToppingId++,
    name,
    price
  });

  render();
});

toppingsList.addEventListener("click", (e) => {
  if (!e.target.matches(".remove-btn")) return;

  const id = Number(e.target.dataset.id);
  state.toppings = state.toppings.filter(t => t.id !== id);
  render();
});

resetBtn.addEventListener("click", () => {
  state.size = "medium";
  state.basePrice = 12;
  state.glutenFree = false;
  state.toppings = [];
  state.nextToppingId = 1;

  sizeSelect.value = "medium";
  glutenCheckbox.checked = false;

  render();
});

// Helpers
function calculateTotal() {
  let total = state.basePrice;

  if (state.glutenFree) {
    total += 2;
  }

  for (const topping of state.toppings) {
    total += topping.price;
  }

  return total;
}

function buildSummary() {
  let text = `${capitalize(state.size)} pizza`;

  if (state.glutenFree) {
    text += ", gluten-free crust";
  }

  if (state.toppings.length > 0) {
    const names = state.toppings.map(t => t.name);
    text += `, with: ${names.join(", ")}`;
  }

  return text + ".";
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

// Render
function render() {
  summaryText.textContent = buildSummary();

  toppingsList.innerHTML = "";
  for (const topping of state.toppings) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${topping.name} ($${topping.price.toFixed(2)})</span>
      <button class="remove-btn" data-id="${topping.id}">
        Remove
      </button>
    `;
    toppingsList.appendChild(li);
  }

  totalPriceEl.textContent = calculateTotal().toFixed(2);
}

// Initial render
render();