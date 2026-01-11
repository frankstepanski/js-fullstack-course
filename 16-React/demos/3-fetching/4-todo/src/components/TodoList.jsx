import TodoItem from "./TodoItem";

/*
  TodoList
  --------
  Renders a list of todos
*/

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit
}) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
