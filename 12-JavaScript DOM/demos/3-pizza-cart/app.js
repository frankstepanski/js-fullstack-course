const state = {
  builder: {
    size: "medium",
    basePrice: 12,
    glutenFree: false,
    toppings: []
  },
  cart: [],
  nextPizzaId: 1,
  nextToppingId: 1
};

// DOM
const sizeSelect = document.querySelector("#sizeSelect");
const glutenCheckbox = document.querySelector("#glutenCheckbox");
const toppingsContainer = document.querySelector("#toppingsCheckboxes");
const addToppingsBtn = document.querySelector("#addToppingsBtn");
const builderToppings = document.querySelector("#builderToppings");
const addPizzaBtn = document.querySelector("#addPizzaBtn");
const cartList = document.querySelector("#cartList");
const orderTotalEl = document.querySelector("#orderTotal");

// Size
sizeSelect.addEventListener("change", () => {
  const option = sizeSelect.selectedOptions[0];
  state.builder.size = option.value;
  state.builder.basePrice = Number(option.dataset.price);
  render();
});

// Gluten-free
glutenCheckbox.addEventListener("change", () => {
  state.builder.glutenFree = glutenCheckbox.checked;
  render();
});

// Add multiple toppings
addToppingsBtn.addEventListener("click", () => {
  const checked = toppingsContainer.querySelectorAll(
    "input[type='checkbox']:checked"
  );

  for (const checkbox of checked) {
    const name = checkbox.value;

    if (state.builder.toppings.some(t => t.name === name)) continue;

    state.builder.toppings.push({
      id: state.nextToppingId++,
      name,
      price: Number(checkbox.dataset.price)
    });
  }

  checked.forEach(cb => (cb.checked = false));
  render();
});

// Add pizza to cart
addPizzaBtn.addEventListener("click", () => {
  state.cart.push({
    id: state.nextPizzaId++,
    size: state.builder.size,
    basePrice: state.builder.basePrice,
    glutenFree: state.builder.glutenFree,
    toppings: [...state.builder.toppings]
  });

  resetBuilder();
  render();
});

// Remove pizza from cart
cartList.addEventListener("click", (e) => {
  if (!e.target.matches(".remove-btn")) return;

  const pizzaId = Number(e.target.dataset.id);
  state.cart = state.cart.filter(p => p.id !== pizzaId);
  render();
});

// Helpers
function resetBuilder() {
  state.builder = {
    size: "medium",
    basePrice: 12,
    glutenFree: false,
    toppings: []
  };
  sizeSelect.value = "medium";
  glutenCheckbox.checked = false;
}

function calculatePizzaTotal(pizza) {
  let total = pizza.basePrice;
  if (pizza.glutenFree) total += 2;
  for (const t of pizza.toppings) total += t.price;
  return total;
}

function calculateOrderTotal() {
  return state.cart.reduce(
    (sum, pizza) => sum + calculatePizzaTotal(pizza),
    0
  );
}

// Render
function render() {
  // Builder toppings
  builderToppings.innerHTML = "";
  for (const t of state.builder.toppings) {
    const li = document.createElement("li");
    li.textContent = `${t.name} ($${t.price.toFixed(2)})`;
    builderToppings.appendChild(li);
  }

  // Cart
  cartList.innerHTML = "";
  for (const pizza of state.cart) {
    const li = document.createElement("li");

    const toppingsText =
      pizza.toppings.length > 0
        ? pizza.toppings.map(t => t.name).join(", ")
        : "No toppings";

    li.innerHTML = `
      <div class="cart-item">
        <div>
          <strong>
            ${pizza.size} pizza${pizza.glutenFree ? " (gluten-free)" : ""}
          </strong>
          <div class="cart-toppings">
            Toppings: ${toppingsText}
          </div>
        </div>

        <div class="cart-actions">
          <span>
            $${calculatePizzaTotal(pizza).toFixed(2)}
          </span>
          <button class="remove-btn" data-id="${pizza.id}">
            Remove
          </button>
        </div>
      </div>
    `;

    cartList.appendChild(li);
  }

  orderTotalEl.textContent = calculateOrderTotal().toFixed(2);
}

// Initial render
render();