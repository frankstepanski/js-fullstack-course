import Header from './Header';
import Footer  from './Footer'; 

import './App.css'

/*
  WHAT IS A COMPONENT?

  A component is just a JavaScript function that returns JSX.
  That's it. Nothing magic.

  React apps are built by combining components together —
  like lego bricks. Each component is responsible for one
  piece of the page.

  Rules:
    - the function name MUST start with a capital letter
    - it MUST return JSX (or null if you want to render nothing)
    - each component lives in its own little world — it only
      knows about what's inside it

  In this file we have three components:
    Header    — the top of the page
    Footer    — the bottom of the page
    App       — the main component that puts them together

  App.jsx

  App is always the top-level component. React starts there
  and works its way down through whatever you've placed inside.

  IMPORTING COMPONENTS

  Before you can use Header or Footer here, you have to import them.
  An import tells JavaScript: "go and fetch this from that file."

  The syntax:
    import ComponentName from './filename'

  Rules:
    - the name after "import" must match the export default name
    - the path starts with ./ which means "same folder as this file"
    - you do NOT need to add .jsx at the end — React understands it
    - if the file is in a subfolder: './components/Header'
*/

function App() {
 

  return (
      <div>

      <Header />  {/* renders everything inside the Header function */}

      <main>
        <p>This is the main content of the page.</p>
      </main>

      <Footer />  {/* renders everything inside the Footer function */}

    </div>
  )
}

export default App
