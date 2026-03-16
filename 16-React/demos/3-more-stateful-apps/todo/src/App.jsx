import {useState} from 'react';
import { listoftodos } from './data/STORE';
import TodoList from './components/TodoList';
import TodoAdd from './components/TodoAdd';
import './App.css';

import { v4 as uuidv4 } from 'uuid';

/*
  🧠 App.jsx
  ----------
  This is the ROOT component.

  Responsibilities:
  - Owns todo state
  - Adds todos
  - Updates todo completion
  - Passes data DOWN to child components
*/

export default function App() {
  const [todos, setTodos] = useState(listoftodos);

  /*
    ➕ ADD TODO
    -----------
    Creates a new todo and updates state immutably
  */
  const addTodo = text => {
    const newTodos = [
         ...todos,
         {
           id: uuidv4(),
           text: text,
           isCompleted: false
          }
    ];
    setTodos(newTodos);
  };

    /*
    ✅ TOGGLE COMPLETE
    ------------------
    Updates ONE todo by id
  */
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  };
  
  return (
    <div className="app">
      <h1 className="title">📝 Todo App</h1>
      <p className="subtitle">
        A simple React app demonstrating state, props, and list rendering.
      </p>

      <TodoAdd addTodo={addTodo} />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
      />
    </div>
  );
}