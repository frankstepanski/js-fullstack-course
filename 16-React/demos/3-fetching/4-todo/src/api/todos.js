const BASE_URL = "http://localhost:3001/todos";

/*
  API helpers
  -----------
  Keeps fetch logic OUT of components
*/

export async function getTodos() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(text) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      completed: false
    })
  });

  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function updateTodo(id, updates) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });

  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed to delete todo");
}
