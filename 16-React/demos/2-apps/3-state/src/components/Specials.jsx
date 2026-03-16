

export default function Specials({ specials }) {
  return (
    <section id="specials">
      <h2>3. Daily Specials</h2>

      <ul>
        {specials.map((special, index) => (
          <li key={index}>{special}</li>
        ))}
      </ul>
    </section>
  )
}
