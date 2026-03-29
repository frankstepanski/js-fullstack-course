import { useEffect, useState } from "react";
import './App.css'

const API_URL = "http://localhost:3000/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load notes when component mounts
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
      fetchNotes(); // refresh notes
    } catch (err) {
      setError("Could not add note.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1>🗒️ React Notes App</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          style={styles.input}
        />
        <button disabled={loading} style={styles.button}>
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      <ul style={styles.list}>
        {notes.map(note => (
          <li key={note.id} style={styles.listItem}>
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "16px"
  },
  button: {
    padding: "8px 12px",
    fontSize: "16px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    marginBottom: "10px"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  listItem: {
    padding: "8px",
    borderBottom: "1px solid #ddd"
  }
};

export default App;