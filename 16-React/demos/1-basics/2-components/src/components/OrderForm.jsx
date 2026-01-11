


export default function OrderForm({ pizzas }) {
  return (
    <>
      {/* ORDER FORM SECTION */}
      <section id="order" aria-labelledby="order-heading">
        <h2 id="order-heading">4. Order Online (Demo Form)</h2>

        <p id="order-description">
          This form doesn't actually place an order. 
        </p>

        {/* 
          🧠 NOTE
          -------------------
          In real apps:
          - This form would use state
          - Inputs would be controlled
          - A submit handler would send data to a backend

        */}

        <form aria-describedby="order-description">
          {/* CUSTOMER INFO */}
          <fieldset>
            <legend>Your Information</legend>

            <div>
              <label htmlFor="name">Full Name:</label><br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Taylor Swift"
                required
                autoComplete="name"
              />
            </div>

            <br />

            <div>
              <label htmlFor="phone">Phone Number:</label><br />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="555-123-4567"
                required
                autoComplete="tel"
              />
            </div>

            <br />

            <div>
              <label htmlFor="pickup-delivery">Pickup or Delivery?</label><br />
              <select id="pickup-delivery" name="order_type">
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
          </fieldset>

          <br />

          {/* PIZZA SELECTION */}
          <fieldset>
            <legend>Your Pizza</legend>

            <div>
              <label htmlFor="pizza-type">Choose a pizza:</label><br />

              {/*
                🍕 DYNAMIC SELECT OPTIONS
                -------------------------
                Instead of hard-coding options,
                we loop over the `pizzas` array.

                This is:
                - Data-driven UI
                - Reusable
                - Easier to maintain
              */}
              <select id="pizza-type" name="pizza_type">
                {pizzas.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>

            <br />

            {/* SIZE SELECTION */}
            <fieldset>
              <legend>Size</legend>

              <div>
                <input
                  type="radio"
                  id="size-medium"
                  name="size"
                  value="medium"
                  defaultChecked
                />
                <label htmlFor="size-medium">Medium</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="size-large"
                  name="size"
                  value="large"
                />
                <label htmlFor="size-large">Large</label>
              </div>
            </fieldset>

            <br />

            {/* EXTRA NOTES */}
            <div>
              <label htmlFor="extra-notes">Extra notes (optional):</label><br />
              <textarea
                id="extra-notes"
                name="notes"
                rows="3"
                cols="30"
                placeholder="No onions, extra cheese, etc."
              />
            </div>
          </fieldset>

          <br />

          {/* SUBMIT BUTTON */}
          <button type="submit">Place Order (Demo)</button>
        </form>
      </section>

      <hr />
    </>
  )
}
