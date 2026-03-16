export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className={`nav ${darkMode ? "dark" : ""}`}>
      <div className="nav--left">
        <img
          src="./images/react-icon-small.png"
          alt="React logo"
          className="nav--logo"
        />
        <h3 className="nav--title">ReactFacts</h3>
      </div>

      <div className="toggler">
        <span className={!darkMode ? "active" : ""}>Light</span>

        <button 
          className={`toggler--slider ${darkMode ? "dark" : ""}`}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <div className="toggler--circle" />
        </button>

        <span className={darkMode ? "active" : ""}>Dark</span>
      </div>
    </nav>
  )
}
