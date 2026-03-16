import { useState, useEffect } from "react";

/*
  FetchTodoList
  -------------
  This example shows:
  - Fetching an array
  - Rendering lists with `.map`
  - Empty dependency array
*/

export default function FetchTodoList() {
  const [todos, setTodos] = useState([]);

  /*
    Empty dependency array []
    -------------------------
    Runs ONCE when component mounts
  */
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=8")
      .then((response) => {
        
        if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section>
      <h2>2. Fetch a Todo List</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
