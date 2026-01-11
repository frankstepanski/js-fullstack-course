import './App.css'

/*
  App.jsx
  📦 This file contains ONE React component: App

  Think of this file as:
  - An HTML page
  - Written using JSX (HTML inside JavaScript)
  - Powered by plain JavaScript data
    ----------------------------------------
  🧠 A React component is just a JavaScript function

  - The function name (App) becomes a UI element
  - Whatever this function RETURNS is what shows on the page

  ✅ Key Takeaways

  - React components are functions
  - JSX is HTML written inside JavaScript
  - Arrays + .map() generate repeated UI
  - Data drives the UI (not copy-pasted HTML)
*/

export default function App() {

  /*
    📊 Plain JavaScript data

    These arrays hold the content for the page.
    Later, JSX will turn this data into HTML.
  */

  const hours = [
    "Monday - Thursday: 11:00 AM - 9:00 PM",
    "Friday - Saturday: 11:00 AM - 11:00 PM",
    "Sunday: 12:00 PM - 8:00 PM"
  ];

  const pizzas = [
    {
      id: "margherita",
      name: "The Classic Margherita",
      image: "images/pizza-margherita.png",
      alt: "Classic margherita pizza with tomato, mozzarella, and basil",
      caption: "Simple, fresh, and delicious.",
      description: "Tomato sauce, fresh mozzarella, basil, and a drizzle of olive oil.",
      price: "$12.00 (Medium) / $15.00 (Large)"
    },
    {
      id: "supreme",
      name: "Moonlight Supreme",
      image: "images/pizza-supreme.png",
      alt: "Supreme pizza with pepperoni, sausage, mushrooms, and peppers",
      caption: "Loaded with toppings for big appetites.",
      description:
        "Pepperoni, sausage, mushrooms, onions, and bell peppers on our signature crust.",
      price: "$16.00 (Medium) / $19.00 (Large)"
    },
    {
      id: "veggie",
      name: "Stargazer Veggie",
      image: "images/pizza-veggie.png",
      alt: "Vegetarian pizza with spinach, olives, mushrooms, and peppers",
      caption: "Colorful veggies on a crispy base.",
      description:
        "Spinach, olives, roasted red peppers, mushrooms, and feta cheese.",
      price: "$14.00 (Medium) / $17.00 (Large)"
    },
    {
      id: "bbq",
      name: "Comet BBQ Chicken",
      image: "images/pizza-bbq.png",
      alt: "BBQ chicken pizza with red onions and cilantro",
      caption: "Smoky, tangy, and cheesy.",
      description:
        "BBQ sauce, grilled chicken, red onions, and cilantro, topped with mozzarella and cheddar.",
      price: "$15.00 (Medium) / $18.00 (Large)"
    }
  ];

  const specials = [
    "Monday: Buy one medium pizza, get a second one 50% off.",
    "Wednesday: Free drink with any large pizza.",
    "Friday Night: Family combo - 2 large pizzas + breadsticks."
  ];

  /*
    🧩 JSX starts here

    JSX looks like HTML, but it is actually JavaScript.
    You can insert JavaScript expressions using { }
  */

  return (
    <>
      {/* PAGE HEADER */}
      <header>
        <h1>Moonlight Pizza Co.</h1>
        <p>Fresh, handmade pizza baked under a midnight sky.</p>

        <nav aria-label="Main site navigation">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#specials">Specials</a></li>
            <li><a href="#order">Order Online</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main id="main-content">
        {/* ABOUT SECTION */}
        <section id="about" aria-labelledby="about-heading">
          <h2 id="about-heading">1. About Moonlight Pizza Co.</h2>

          <p>
            Welcome to <strong>Moonlight Pizza Co.</strong>, a fictional
            neighborhood pizza spot created to help you learn React JSX.
          </p>

          <p>
            This section mirrors plain HTML, but it is now written in JSX —
            React’s HTML-like syntax that lives inside JavaScript.
          </p>

         <h3>Hours</h3>

          <ul>
          {
            /*
              🔁 RENDERING LISTS IN REACT
              --------------------------
              `hours` is a JavaScript array, for example:

                [
                  "Monday - Thursday: 11:00 AM - 9:00 PM",
                  "Friday - Saturday: 11:00 AM - 11:00 PM",
                  "Sunday: 12:00 PM - 8:00 PM"
                ]

              In React, we CANNOT write a normal `for` loop directly inside JSX.

              Instead, we use JavaScript expressions inside `{}`.

              `.map()` is a JavaScript array method that:
              - loops over each item in the array
              - returns a NEW array
              - in React, that new array is usually JSX elements
            */
          }
          {hours.map((hour, index) => (
            /*
              🧠 WHAT THIS FUNCTION DOES
              --------------------------
              For EACH item in the `hours` array:

                1️⃣ `hour` = the current string
                2️⃣ `index` = the position in the array (0, 1, 2, ...)

              The map callback function RETURNS JSX.
              React collects all returned <li> elements
              and renders them into the <ul>.
            */

            /*
              🧷 WHY THE `key` EXISTS
              ----------------------
              React needs a `key` to:
              - track each list item
              - efficiently update the DOM
              - know which items changed, were added, or removed

              For beginners:
              ✔ using `index` is OK

              In real apps:
              ✔ use a unique ID when possible
            */
            <li key={index}>
              {hour}
              {
                /*
                  `{hour}` is a JavaScript variable.
                  Curly braces tell JSX:
                  "Insert the JavaScript value here."
                */
              }
            </li>
          ))}
        </ul>

        </section>

        <hr />

        {/* MENU SECTION */}
        <section id="menu" aria-labelledby="menu-heading">
          <h2 id="menu-heading">2. Our Pizzas</h2>
          <p>
            Each pizza below is rendered using JavaScript arrays and JSX.
          </p>

          {pizzas.map((pizza) => (
            /*
              🧱 Each pizza object controls its own content
            */
            <article key={pizza.id} aria-labelledby={`${pizza.id}-heading`}>
              <h3 id={`${pizza.id}-heading`}>{pizza.name}</h3>

              <figure>
                <img
                  src={pizza.image}
                  width="150"
                  alt={pizza.alt}
                />
                <figcaption>{pizza.caption}</figcaption>
              </figure>

              <p>{pizza.description}</p>
              <p><strong>Price:</strong> {pizza.price}</p>
            </article>
          ))}
        </section>

        <hr />

        {/* DAILY SPECIALS */}
        <section id="specials" aria-labelledby="specials-heading">
          <h2 id="specials-heading">3. Daily Specials</h2>
          <p>This section demonstrates list rendering in JSX.</p>

          <ul>
            {specials.map((special, index) => (
              <li key={index}>
                <strong>{special.split(":")[0]}:</strong>
                {special.split(":")[1]}
              </li>
            ))}
          </ul>
        </section>

        <hr />

        {/* ORDER FORM */}
      <section id="order" aria-labelledby="order-heading">
        <h2 id="order-heading">4. Order Online (Demo Form)</h2>

        <p id="order-description">
          This form doesn’t actually place an order, but it shows how a basic order
          form might look. In a real app, the <code>action</code> would send data to a backend.
        </p>

        <form aria-describedby="order-description">
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

          <fieldset>
            <legend>Your Pizza</legend>

            <div>
              <label htmlFor="pizza-type">Choose a pizza:</label><br />
              <select id="pizza-type" name="pizza_type">
                <option value="margherita">The Classic Margherita</option>
                <option value="supreme">Moonlight Supreme</option>
                <option value="veggie">Stargazer Veggie</option>
                <option value="bbq-chicken">Comet BBQ Chicken</option>
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

          <button type="submit">Place Order (Demo)</button>
        </form>
      </section>

      <hr />

        {/* CONTACT SECTION */}
        <section id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading">5. Contact &amp; Location</h2>

          <address>
            <p><strong>Address:</strong> 123 Moonlight Lane, Fictional City</p>
            <p><strong>Phone:</strong> (555) 987-6543</p>
            <p><strong>Email:</strong> hello@moonlightpizza.example</p>
          </address>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <p>
          © 2025 Moonlight Pizza Co. | Built with React JSX (no state, no hooks)
        </p>
      </footer>
    </>
  );

}
