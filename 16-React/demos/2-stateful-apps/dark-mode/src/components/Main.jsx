

export default function Main({ darkMode }) {
  return (
    <main className={`main ${darkMode ? "dark" : ""}`}>
      <h1 className="main--title">
        Fun facts about React ⚛️
      </h1>

      <ul className="main--facts">
        <li>React was first released in 2013</li>
        <li>It was created by Jordan Walke at Facebook</li>
        <li>React uses a component-based architecture</li>
        <li>It allows developers to build reusable UI pieces</li>
        <li>React powers apps used by millions of people daily</li>
      </ul>
    </main>
  )
}
