// Change this if backend runs on a different port
const API_URL = "http://localhost:3000/notes";

const notesList = document.querySelector("#notesList");
const form = document.querySelector("#noteForm");
const input = document.querySelector("#noteInput");

/**
 * Load all notes from backend
 */
async function loadNotes() {
  try {
    const response = await fetch(API_URL);
    const notes = await response.json();

    notesList.innerHTML = "";

    notes.forEach(note => {
      const li = document.createElement("li");
      li.textContent = note.text;
      notesList.appendChild(li);
    });

  } catch (error) {
    console.error("Failed to load notes:", error);
  }
}

/**
 * Add new note
 */
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    input.value = "";
    loadNotes(); // Refresh list after adding

  } catch (error) {
    console.error("Failed to add note:", error);
  }
});

/**
 * Initial page load
 */
loadNotes();