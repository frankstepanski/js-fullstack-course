import TodoItem from "./TodoItem";

/*
  📋 TodoList.jsx
  ---------------
  Receives todos array
  Renders a list of TodoItem components
*/

export default function TodoList({ todos, toggleTodo }) {
  if (todos.length === 0) {
    return <p className="empty">No todos yet 🎉</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
}
