import { useState } from "react";
import CatCard from "./components/CatCard";
import NavButton from "./components/NavButton";
import CATS from "./assets/cats";
import './App.css'

function App() {

 /*
    🐱 STATE

    catIdx is the "source of truth" for:
    - Which cat is currently visible
    - Which navigation buttons should appear

    useState returns:
    - current value (catIdx)
    - function to update it (setCatIdx)
  */

  const [catIdx, setCatIdx] = useState(0);

  return (
    <div className="app-container">
      <NavButton
        icon="fa-square-caret-left"
        show={catIdx > 0}
        onClick={() => setCatIdx(catIdx - 1)}
      />

      <CatCard cat={CATS[catIdx]} />

      <NavButton
        icon="fa-square-caret-right"
        show={catIdx < CATS.length - 1}
        onClick={() => setCatIdx(catIdx + 1)}
      />
    </div>
  );
}

export default App
