import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (!todos.length) return <div className="small">No tasks — add one above.</div>;
  return (
    <div className="todo-list" role="list" aria-label="Todo list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
