import Game from './components/Game.jsx';
import './App.css' 

/*
  🏠 App.jsx
  ----------
  This is the ROOT component of the application.

  - App does NOT contain game logic
  - App does NOT manage state
  - App is responsible for deciding WHAT appears on the page

  In small apps like this, App often just renders one main feature.
*/

function App() {

  return (
     <div className="app">
      <Game />
    </div>
  )
}

export default App
