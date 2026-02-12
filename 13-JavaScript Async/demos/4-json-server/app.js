const API_URL = "http://localhost:3001/todos";

const todoList = document.querySelector("#todo-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");  

/* =====================
   FETCH TODOS
===================== */
async function fetchTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();
  renderTodos(todos);
}

/* =====================
   RENDER TODOS
===================== */
function renderTodos(todos) {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () =>
      toggleTodo(todo.id, checkbox.checked)
    );

    const span = document.createElement("span");
    span.textContent = todo.title;
    if (todo.completed) {
      span.classList.add("completed");
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    todoList.appendChild(li);
  });
}

/* =====================
   ADD TODO
===================== */
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodo = {
    title: todoInput.value,
    completed: false
  };

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTodo)
  });

  todoInput.value = "";
  fetchTodos();
});

/* =====================
   TOGGLE COMPLETED
===================== */
async function toggleTodo(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed })
  });

  fetchTodos();
}

/* =====================
   INIT
===================== */
fetchTodos();
