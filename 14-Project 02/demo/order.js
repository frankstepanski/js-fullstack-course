// order.js
// Moonlight Pizza Co. – Order page logic
// - Loads pizzas from json-server API (/pizzas)
// - Loads cart from API on every page load (/cart/1)
// - Saves cart back to API on every change (PUT /cart/1)
// - Saves final orders to json-server (/orders)

const API_BASE_URL = "http://localhost:3000";

const state = {
  pizzas: [],
  // Map key: `${pizzaId}-${size}`, value: cart item object
  cart: new Map(),
};

document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM references that MATCH YOUR HTML
  const menuStatusEl  = document.querySelector("#menu-status");
  const pizzasListEl  = document.querySelector("#menu-list");
  const cartItemsEl   = document.querySelector("#cart-list");
  const cartTotalEl   = document.querySelector("#cart-total");
  const clearBtnEl    = document.querySelector("#cart-clear");
  const orderButtonEl = document.querySelector("#cart-checkout");
  const orderStatusEl = document.querySelector("#order-status");

  init();

  async function init() {
    try {
      if (menuStatusEl) menuStatusEl.textContent = "Loading menu…";

      await loadPizzas();        // 1) Fetch pizzas from json-server
      await loadCartFromApi();   // 2) Hydrate in-memory cart from API

      renderCart();              // 3) Render cart UI

      if (menuStatusEl) menuStatusEl.textContent = "Select a pizza to add to your cart.";
    } catch (err) {
      console.error(err);
      if (menuStatusEl) {
        menuStatusEl.textContent =
          "There was a problem loading the menu. Please check the API and try again.";
      }
      if (orderStatusEl) {
        orderStatusEl.textContent =
          "There was a problem loading pizzas or cart. Please try again.";
      }
    }
  }

  /* ============================
     Fetch pizzas from json-server
  ============================= */

  async function loadPizzas() {
    const res = await fetch(`${API_BASE_URL}/pizzas`);

    if (!res.ok) {
      throw new Error("Failed to load pizzas");
    }

    state.pizzas = await res.json();
    renderPizzas();
  }

  /* ============================
     Render pizzas list
  ============================= */

  function renderPizzas() {
    if (!pizzasListEl) return;

    pizzasListEl.innerHTML = "";

    if (!state.pizzas.length) {
      pizzasListEl.innerHTML = `<li>No pizzas found. Check your db.json.</li>`;
      return;
    }

    state.pizzas.forEach((pizza) => {
      console.log("Rendering pizza:", pizza);
      const li = document.createElement("li");
      li.className = "pizza-card";

      li.innerHTML = `
        <div class="pizza-card__body">
          <h3 class="pizza-card__title">${pizza.name}</h3>
          <p class="pizza-card__description">${pizza.description}</p>
          <p class="pizza-card__prices">
            <strong>Price:</strong>
            $${pizza.prices.medium.toFixed(2)} (Medium) /
            $${pizza.prices.large.toFixed(2)} (Large)
          </p>
        </div>

        <div class="pizza-card__actions">
          <label>
            Size:
            <select data-size-select>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>

          <button type="button" class="btn btn-primary" data-add-to-cart>
            Add to cart
          </button>
        </div>
      `;

      const sizeSelect = li.querySelector("[data-size-select]");
      const addBtn = li.querySelector("[data-add-to-cart]");

      addBtn.addEventListener("click", () => {
        const size = sizeSelect.value;
        addToCart(pizza, size);
      });

      pizzasListEl.appendChild(li);
    });
  }

  /* ============================
     Cart helpers (in-memory)
  ============================= */

  function cartKey(pizzaId, size) {
    return `${pizzaId}-${size}`;
  }

  async function addToCart(pizza, size) {
    const key = cartKey(pizza.id, size);
    const existing = state.cart.get(key);
    const unitPrice = pizza.prices[size];

    if (existing) {
      existing.quantity += 1;
      existing.subtotal = existing.quantity * existing.unitPrice;
      state.cart.set(key, existing);
    } else {
      state.cart.set(key, {
        key,
        pizzaId: pizza.id,
        name: pizza.name,
        size,
        quantity: 1,
        unitPrice,
        subtotal: unitPrice,
      });
    }

    renderCart();
    if (orderStatusEl) orderStatusEl.textContent = "Pizza added to cart.";

    await saveCartToApi();
  }

  async function removeFromCart(key) {
    state.cart.delete(key);
    renderCart();
    await saveCartToApi();
  }

  async function updateQuantity(key, newQty) {
    const item = state.cart.get(key);
    if (!item) return;

    const safeQty = Math.max(1, Number(newQty) || 1);
    item.quantity = safeQty;
    item.subtotal = safeQty * item.unitPrice;
    state.cart.set(key, item);

    renderCart();
    await saveCartToApi();
  }

  async function clearCart() {
    state.cart.clear();
    renderCart();
    await saveCartToApi();
  }

  function getCartTotal() {
    let total = 0;
    for (const item of state.cart.values()) {
      total += item.subtotal;
    }
    return total;
  }

  /* ============================
     Render cart UI
  ============================= */

  function renderCart() {
    if (!cartItemsEl || !cartTotalEl) return;

    if (state.cart.size === 0) {
      cartItemsEl.innerHTML = `<li class="cart-empty">Your cart is empty.</li>`;
      cartTotalEl.textContent = "Total: $0.00";
      return;
    }

    cartItemsEl.innerHTML = "";

    for (const item of state.cart.values()) {
      const li = document.createElement("li");
      li.className = "cart-item";

      li.innerHTML = `
        <div class="cart-item__info">
          <strong>${item.name}</strong>
          <span class="cart-item__size">(${item.size})</span>
        </div>

        <div class="cart-item__controls">
          <label>
            Qty:
            <input
              type="number"
              min="1"
              value="${item.quantity}"
              data-qty-input
            />
          </label>

          <span class="cart-item__subtotal">
            $${item.subtotal.toFixed(2)}
          </span>

          <button type="button" class="cart-item__remove" data-remove>
            Remove
          </button>
        </div>
      `;

      const qtyInput = li.querySelector("[data-qty-input]");
      const removeBtn = li.querySelector("[data-remove]");

      qtyInput.addEventListener("change", (e) => {
        updateQuantity(item.key, e.target.value);
      });

      removeBtn.addEventListener("click", () => {
        removeFromCart(item.key);
      });

      cartItemsEl.appendChild(li);
    }

    cartTotalEl.textContent = `Total: $${getCartTotal().toFixed(2)}`;
  }

  /* ============================
     Place order → save to /orders
  ============================= */

  async function placeOrder() {
    if (state.cart.size === 0) {
      if (orderStatusEl) {
        orderStatusEl.textContent = "Your cart is empty. Add something first.";
      }
      return;
    }

    const items = Array.from(state.cart.values()).map((item) => ({
      pizzaId: item.pizzaId,
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
    }));

    const total = getCartTotal();

    const order = {
      items,
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        throw new Error("Failed to save order");
      }

      if (orderStatusEl) {
        orderStatusEl.textContent =
          "Order saved to API (demo only). Cart has been cleared.";
      }

      await clearCart(); // also saves empty cart back to API
    } catch (err) {
      console.error(err);
      if (orderStatusEl) {
        orderStatusEl.textContent =
          "There was a problem saving your order. Please try again.";
      }
    }
  }

  if (orderButtonEl) {
    orderButtonEl.addEventListener("click", (e) => {
      e.preventDefault();
      placeOrder();
    });
  }

  if (clearBtnEl) {
    clearBtnEl.addEventListener("click", (e) => {
      e.preventDefault();
      clearCart();
      if (orderStatusEl) orderStatusEl.textContent = "Cart cleared.";
    });
  }

  /* ============================
     Cart persistence via json-server
  ============================= */

  // Load the current cart from API when page loads
  async function loadCartFromApi() {
    try {
      const res = await fetch(`${API_BASE_URL}/cart/1`);

      if (!res.ok) {
        console.warn("No existing cart found, starting empty.");
        return;
      }

      const cartDoc = await res.json();
      const items = Array.isArray(cartDoc.items) ? cartDoc.items : [];

      state.cart.clear();

      items.forEach((item) => {
        const key = item.key || cartKey(item.pizzaId, item.size);
        state.cart.set(key, {
          key,
          pizzaId: item.pizzaId,
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal,
        });
      });
    } catch (err) {
      console.warn("Could not load cart from API:", err);
    }
  }

  // Save the current cart to API after any change
  async function saveCartToApi() {
    const items = Array.from(state.cart.values()).map((item) => ({
      key: item.key,
      pizzaId: item.pizzaId,
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
    }));

    const payload = {
      id: 1, // we always use a single cart with id 1
      items,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/cart/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save cart to API");
      }
    } catch (err) {
      console.error("Could not save cart to API:", err);
      if (orderStatusEl) {
        orderStatusEl.textContent =
          "Warning: could not save cart to server. Changes may not persist.";
      }
    }
  }
});
