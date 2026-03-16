import {useState} from 'react';


/*
  ✍️ TodoAdd.jsx
  --------------
  Controlled input component

  Responsibilities:
  - Manages input value
  - Validates user input
  - Calls addTodo from parent
*/

export default function TodoAdd({ addTodo }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      setError("Todo cannot be empty");
      return;
    }

    addTodo(value);
    setValue("");
    setError("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter a new todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button className="add-btn">Add</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}