import { useState } from "react";

/*
  TodoItem
  --------
  Single todo row
*/

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  function handleSave() {
    onEdit(todo.id, text);
    setIsEditing(false);
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
      />

      {isEditing ? (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span className={todo.completed ? "done" : ""}>
            {todo.text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
