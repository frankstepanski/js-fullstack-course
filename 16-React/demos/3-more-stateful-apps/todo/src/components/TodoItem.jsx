/*
  ✅ TodoItem.jsx
  ----------------
  Pure presentational component

  Props:
  - todo (object)
  - toggleTodo (function)
*/

export default function TodoItem({ todo, toggleTodo }) {
  return (
    <li className={`todo-item ${todo.isCompleted ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
      />

      <span>{todo.text}</span>
    </li>
  );
}