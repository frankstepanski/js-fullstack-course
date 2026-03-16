

export default function Menu({ pizzas }) {
  return (
    <section id="menu">
      <h2>2. Our Pizzas</h2>

      {pizzas.map((pizza) => (
        <article key={pizza.id}>
          <h3>{pizza.name}</h3>

          <figure>
            <img src={pizza.image} width="150" alt={pizza.alt} />
            <figcaption>{pizza.caption}</figcaption>
          </figure>

          <p>{pizza.description}</p>
          <p><strong>Price:</strong> {pizza.price}</p>
        </article>
      ))}
    </section>
  )
}
