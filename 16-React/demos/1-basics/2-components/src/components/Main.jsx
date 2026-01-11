import About from './About'
import Menu from './Menu'
import Specials from './Specials'
import OrderForm from './OrderForm'
import Contact from './Contact'

/*
  Main.jsx
  --------
  This component is a CHILD of App.jsx.

  App is the PARENT.
  App owns the data.
  Main RECEIVES the data via props.

  Main's job:
  - Take data
  - Render UI
  - NOT modify data
*/

export default function Main(props) {

 /*
    📦 WHAT ARE PROPS?
    -----------------
    `props` is an OBJECT automatically created by React.

    App passes data like this:
      <Main hours={hours} pizzas={pizzas} specials={specials} />

    React bundles that data into ONE object:
      props = {
        hours: [...],
        pizzas: [...],
        specials: [...]
      }
  */

  /*
    ✂️ PROPS DESTRUCTURING
    ---------------------
    Instead of writing:
      props.hours
      props.pizzas
      props.specials

    We "destructure" the object:

      const { hours, pizzas, specials } = props

    This is plain JavaScript — not React-specific.
  */
  const { hours, pizzas, specials } = props

  /*
    🧠 WHY DESTRUCTURING MATTERS
    ----------------------------
    - Cleaner JSX
    - Less repetition
    - Easier to read
    - Very common in real React code
  */

  return (
    <main id="main-content">
      <About hours={hours} />
      <hr />
      <Menu pizzas={pizzas} />
      <hr />
      <Specials specials={specials} />
      <hr />
      <OrderForm pizzas={pizzas} />
      <hr />
      <Contact />
    </main>
  )
}
