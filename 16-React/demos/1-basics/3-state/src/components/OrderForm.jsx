
import { useState } from "react"

export default function OrderForm({ pizzas }) {
  /*
    🧠 STATE: ORDER
    --------------
    - null = no order has been placed yet
    - object = order has been submitted

    State controls WHAT is rendered on the screen.
  */
  const [order, setOrder] = useState(null)

  /*
    📝 FORM SUBMIT HANDLER
    --------------------
    - Prevents page refresh
    - Collects form values
    - Stores them in state
  */
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    const newOrder = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      orderType: formData.get("order_type"),
      pizzaId: formData.get("pizza_type"),
      size: formData.get("size"),
      notes: formData.get("notes")
    }

    const selectedPizza = pizzas.find(
      (pizza) => pizza.id === newOrder.pizzaId
    )

    setOrder({
      ...newOrder,
      pizzaName: selectedPizza.name
    })
  }

  return (
    <section id="order" aria-labelledby="order-heading">
      <h2 id="order-heading">4. Order Online</h2>

      {/*
        🔀 CONDITIONAL RENDERING
        -----------------------
        - If order exists → show confirmation
        - If not → show form
      */}

      {order ? (
        /*
          🍕 ORDER CONFIRMATION VIEW
          --------------------------
          This replaces the form AFTER submission
        */
        <div>
          <h3>🎉 Order Received!</h3>

          <p>
            Thanks, <strong>{order.name}</strong>! Your pizza is on the way.
          </p>

          <ul>
            <li><strong>Pizza:</strong> {order.pizzaName}</li>
            <li><strong>Size:</strong> {order.size}</li>
            <li><strong>Order Type:</strong> {order.orderType}</li>
            <li><strong>Phone:</strong> {order.phone}</li>
          </ul>

          {order.notes && (
            <p>
              <strong>Extra Notes:</strong> {order.notes}
            </p>
          )}

          <button onClick={() => setOrder(null)}>
            Place Another Order
          </button>
        </div>
      ) : (
        /*
          📝 ORDER FORM VIEW
          -----------------
          This is shown BEFORE submission
        */
        <>
        <p id="order-description">
          This form doesn't actually place an order. 
        </p>

          <form onSubmit={handleSubmit} aria-describedby="order-description">
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
                />
              </div>

              <br />

              <div>
                <label htmlFor="pickup-delivery">
                  Pickup or Delivery?
                </label><br />
                <select id="pickup-delivery" name="order_type">
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
            </fieldset>

            <br />

            <fieldset>
              <legend>Your Pizza</legend>

              <div>
                <label htmlFor="pizza-type">Choose a pizza:</label><br />
                <select id="pizza-type" name="pizza_type">
                  {pizzas.map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>
                      {pizza.name}
                    </option>
                  ))}
                </select>
              </div>

              <br />

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

              <div>
                <label htmlFor="extra-notes">
                  Extra notes (optional):
                </label><br />
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

            <button type="submit">Place Order</button>
          </form>
        </>
      )}
    </section>
  )
}
