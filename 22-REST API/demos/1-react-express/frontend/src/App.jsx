import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
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

      if (editingId) {
        await updateNote();
      } else {
        await createNote();
      }

      setText("");
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      setError("Operation failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createNote() {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error("Failed to add note");
    }
  }

  async function updateNote() {
    const response = await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error("Failed to update note");
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      fetchNotes();
    } catch (err) {
      setError("Could not delete note.");
      console.error(err);
    }
  }

  function handleEdit(note) {
    setText(note.text);
    setEditingId(note.id);
  }

  function cancelEdit() {
    setEditingId(null);
    setText("");
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
          {editingId ? "Update Note" : "Add Note"}
        </button>

        {editingId && (
          <button type="button" onClick={cancelEdit} className="cancel-button">
            Cancel
          </button>
        )}
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="list">
        {notes.map((note) => (
          <li key={note.id} className="list-item">
            <span>{note.text}</span>

            <div className="actions">
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button
                onClick={() => handleDelete(note.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
