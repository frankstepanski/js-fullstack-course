import { useState } from "react";
import words from "./assets/words";
import WordItem from "./components/WordItem";
import "./App.css";

/*
  🧠 App.jsx
  ----------
  Root component that:
  - Tracks user input
  - Filters a list in real time
  - Still supports form submission
*/

export default function App() {
  /*
    ✍️ STATE: inputText
    ------------------
    Tracks what the user is typing
  */
  const [inputText, setInputText] = useState("");

  /*
    🔍 STATE: filterText
    -------------------
    Value actually used to filter words
  */
  const [filterText, setFilterText] = useState("");

  /*
    🧹 FILTER + MAP
    --------------
    Filters words as filterText changes
  */
  const wordItems = words
    .filter((word) =>
      word.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((word, index) => (
      <WordItem key={index} word={word} />
    ));

  /*
    ⌨️ REAL-TIME INPUT HANDLER
    -------------------------
    Runs on every keystroke.
    Updates BOTH inputText and filterText.
  */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    setFilterText(value);
  };

  return (
    <div className="app">
      <h1 className="title">🔍 Word Filter</h1>

      {/* SEARCH FORM */}
      <form className="search-form">
        <input
          type="text"
          value={inputText}
          placeholder="Enter a word..."
          onChange={handleInputChange}
          className="search-input"
        />

      </form>

      {/* RESULTS */}
      <div className="results">
        {wordItems.length > 0 ? (
          wordItems
        ) : (
          <p className="empty">No matching words found</p>
        )}
      </div>
    </div>
  );
}


