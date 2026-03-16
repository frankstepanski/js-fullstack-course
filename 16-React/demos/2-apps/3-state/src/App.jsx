import './App.css'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'


/*
  📦 COMPONENT IMPORTS
  -------------------
  App.jsx is the ROOT of the application.

  In React:
  - App is the top-level component
  - Everything else lives *inside* App
  - App controls WHAT appears on the page
*/

export default function App() {

  /*
    🧠 DATA OWNERSHIP (VERY IMPORTANT CONCEPT)
    -----------------------------------------
    In React, data usually "lives" in ONE place.

    That place is often:
    - The highest component that needs the data
    - The component responsible for page structure

    Here, App is the OWNER of the data.
    Child components do NOT create this data.
  */

  const hours = [
    "Monday - Thursday: 11:00 AM - 9:00 PM",
    "Friday - Saturday: 11:00 AM - 11:00 PM",
    "Sunday: 12:00 PM - 8:00 PM"
  ]

/*
    🍕 REAL-WORLD DATA SHAPE
    -----------------------
    Arrays of objects like this are EXTREMELY common.

    This is exactly what data from:
    - APIs
    - Databases
    - CMS systems

    looks like in real applications.
  */

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
  ]

  const specials = [
    "Monday: Buy one medium pizza, get a second one 50% off.",
    "Wednesday: Free drink with any large pizza.",
    "Friday Night: Family combo - 2 large pizzas + breadsticks."
  ]

/*
    🧱 COMPONENT COMPOSITION
    -----------------------
    Instead of one massive JSX file,
    we split the UI into smaller components.

    App (parent)
      ├── Header (child)
      ├── Main (child)
      └── Footer (child)

    This is called "component composition".
  */

  return (
    <>
     {/* 
        👪 PARENT → CHILD RELATIONSHIP
        -----------------------------
        Header is a child of App.

        It does NOT receive any data.
        It only renders static JSX.
      */}

      <Header />

      {/*
        📦 PROPS 
        ------------------------------------------

        PROPS = properties
        Think of props like:
        - Function arguments
        - Inputs to a component
        - Data passed DOWN the component tree

        App is the PARENT.
        Main is the CHILD.

        App sends data TO Main using props.
      */}
      
      <Main
        hours={hours}
        pizzas={pizzas}
        specials={specials}
      />
      
     {/*
        🔍 WHAT IS ACTUALLY HAPPENING HERE?

        This line:
          <Main hours={hours} />

        Means:
          "Hey Main component,
           here is some data called 'hours'.
           Use it however you want."

        Inside Main.jsx, React receives:
          props.hours
          props.pizzas
          props.specials
      */}

      {/*
        🔽 WHY DATA FLOWS DOWNWARD
        --------------------------
        React enforces ONE-WAY DATA FLOW:

        Parent → Child

        This prevents:
        - Confusing side effects
        - Random components changing data
        - Hard-to-debug behavior

        This is one of React’s biggest strengths.
      */}

      {/*
        🚫 WHY CHILD COMPONENTS SHOULD NOT CREATE THIS DATA

        If Main created its own data:
        - App would not know about it
        - Other components could not reuse it
        - The app would be harder to scale

        Centralizing data in the parent makes:
        - Sharing easier
        - Debugging easier
        - Scaling possible
      */}

      {/*
        🌍 REAL-WORLD FRONTEND DEVELOPMENT

        In real apps:
        - Data often comes from APIs
        - The parent fetches the data
        - The parent passes it to children
        - Children focus ONLY on rendering

        This separation of responsibilities is critical.
      */}

      <Footer />
    </>
  )
}
