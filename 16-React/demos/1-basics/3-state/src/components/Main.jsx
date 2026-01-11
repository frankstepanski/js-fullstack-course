import About from './About'
import Menu from './Menu'
import Specials from './Specials'
import OrderForm from './OrderForm'
import Contact from './Contact'

export default function Main(props) {

 
  const { hours, pizzas, specials } = props

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
