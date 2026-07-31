import React, { useState, useRef } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");
  const ref = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
    ref.current.focus();
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <input
        ref={ref}
        aria-label="New todo"
        type="text"
        placeholder="Add a new task and press Enter"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn" type="submit" aria-label="Add todo">Add</button>
    </form>
  );
}
