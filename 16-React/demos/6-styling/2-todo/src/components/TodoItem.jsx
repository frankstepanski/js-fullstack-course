import { useState } from "react";
import styled from "styled-components";
import styles from "./TodoItem.module.css";

/*
  🎨 CSS-IN-JS (styled-components)
  --------------------------------
  These buttons are styled directly in JavaScript.

  Why?
  - Small, reusable UI pieces
  - Styles live WITH the component logic
  - No extra CSS file needed
*/

/* Base button style */
const IconButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.35rem 0.55rem;
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1;
  transition: transform 120ms ease, background 120ms ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid rgba(0, 0, 0, 0.25);
    outline-offset: 2px;
  }
`;

/* Variations of the base button */
const DeleteButton = styled(IconButton)`
  background: #fff1f2;
  &:hover {
    background: #ffe4e6;
  }
`;

const SaveButton = styled(IconButton)`
  background: #ecfdf5;
  &:hover {
    background: #d1fae5;
  }
`;

const CancelButton = styled(IconButton)`
  background: #f3f4f6;
  &:hover {
    background: #e5e7eb;
  }
`;

/*
  🧩 TodoItem Component
  --------------------
  Receives data and actions from the parent via props.
*/

export default function TodoItem({ todo, onDelete, onEdit, onToggle }) {

  /*
    🧠 LOCAL STATE
    -------------
    These states ONLY affect this TodoItem.
  */

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  /*
    🎨 INLINE STYLES
    ---------------
    Simple visual changes based on todo state.
  */

  const textStyle = {
    textDecoration: todo.isCompleted ? "line-through" : "none",
    opacity: todo.isCompleted ? 0.6 : 1,
  };

   /*
    ✏️ START EDITING
    ----------------
    - Resets text to current todo text
    - Switches UI into edit mode
  */

  const startEditing = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

   /*
    💾 SAVE EDIT
    ------------
    - Trims whitespace
    - Prevents empty todos
    - Calls parent to update state
  */

  const saveEdit = () => {
    const next = editText.trim();

    // If blank, treat it like cancel (don’t allow empty todos)
    if (!next) {
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }

    if (next !== todo.text) {
      onEdit(todo.id, next);
    }
    setIsEditing(false);
  };

   /*
    ↩️ CANCEL EDIT
    --------------
    - Restores original text
    - Exits edit mode
  */
 
  const cancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <input
          className={styles.editInput}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") cancelEdit();
          }}
          autoFocus
        />
      ) : (
        <span
          className={styles.text}
          style={textStyle}
          onDoubleClick={startEditing}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <SaveButton type="button" onClick={saveEdit} aria-label="Save todo">
              ✅
            </SaveButton>

            <CancelButton
              type="button"
              onClick={cancelEdit}
              aria-label="Cancel edit"
            >
              ↩️
            </CancelButton>
          </>
        ) : (
          <IconButton type="button" onClick={startEditing} aria-label="Edit todo">
            ✏️
          </IconButton>
        )}

        <DeleteButton
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
        >
          ❌
        </DeleteButton>
      </div>
    </li>
  );
}

