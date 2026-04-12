import { useEffect, useState } from "react";
import './App.css'

const API_URL = "http://localhost:3000/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      setError("");
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError("Could not load notes.");
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      setText("");
      fetchNotes();
    } catch (err) {
      setError("Could not add note.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>🗒️ React Notes App</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          className="input"
        />
        <button disabled={loading} className="button">
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="list">
        {notes.map(note => (
          <li key={note.id} className="list-item">
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
