import { useState } from "react";
import styles from "./TodoAdd.module.css";

export default function TodoAdd({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Todo cannot be empty");
      return;
    }

    onAdd(text);
    setText("");
    setError("");
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={text}                 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Add a todo..."
        />
        <button className={styles.button}>Add</button>
      </form>

      {error && <div className={styles.error}>{error}</div>}
    </>
  );
}

