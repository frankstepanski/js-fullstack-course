

export default function About({ hours }) {
  return (
    <section id="about">
      <h2>1. About Moonlight Pizza Co.</h2>

      <p>
        Welcome to <strong>Moonlight Pizza Co.</strong>, a fictional
        neighborhood pizza spot created to help you learn React JSX.
      </p>

      <h3>Hours</h3>
      <ul>
        {hours.map((hour, index) => (
          <li key={index}>{hour}</li>
        ))}
      </ul>
    </section>
  )
}
