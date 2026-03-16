import { useState } from "react";

/*
  TodoAdd
  -------
  Adds new todos
*/

export default function TodoAdd({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="todo-add">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo..."
      />
      <button>Add</button>
    </form>
  );
}
