import { useState } from "react";
import { listoftodos } from "./data/STORE";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";
import styles from "./App.module.css";

export default function App() {
  /*
    🧠 SINGLE SOURCE OF TRUTH
    ------------------------
    App owns the todos because:
    - Multiple components need access
    - CRUD logic should live in one place
  */
  const [todos, setTodos] = useState(listoftodos);

  /* ➕ CREATE */
  const addTodo = (text) => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        text,
        isCompleted: false
      }
    ]);
  };

  /* ❌ DELETE */
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  /* ✏️ UPDATE TEXT */
  const editTodo = (id, newText) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  /* ✅ TOGGLE COMPLETED */
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  };

  return (
    <div className={styles.app}>
      <h2 className={styles.title}>Todo App</h2>
      <p className={styles.subtitle}>Full CRUD + React state</p>

      <TodoAdd onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}
