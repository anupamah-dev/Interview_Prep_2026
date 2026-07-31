import React, { useState, useRef, useEffect } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);
  const inputRef = useRef();

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const save = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      onDelete(todo.id);
      return;
    }
    onUpdate(todo.id, trimmed);
    setEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`} role="listitem" aria-label={`Todo ${todo.text}`}>
      <input
        type="checkbox"
        aria-label={`Mark ${todo.text} complete`}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {editing ? (
        <input
          ref={inputRef}
          className="edit-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") { setValue(todo.text); setEditing(false); }
          }}
        />
      ) : (
        <div className="title" onDoubleClick={() => setEditing(true)} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") setEditing(true); }}>
          {todo.text}
          <div className="small"> {todo.createdAt ? new Date(todo.createdAt).toLocaleString() : ""}</div>
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn" onClick={() => setEditing(true)} aria-label="Edit">Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(todo.id)} aria-label="Delete">Delete</button>
      </div>
    </div>
  );
}
