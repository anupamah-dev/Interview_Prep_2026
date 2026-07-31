import React, { useMemo } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";

/**
 * Simple Todo app with localStorage persistence.
 * Features: add, edit, delete, toggle complete, filter, clear completed.
 */
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos_v1", []);
  const [filter, setFilter] = useLocalStorage("todos_filter_v1", "All");

  const addTodo = (text) => {
    const t = { id: uid(), text, completed: false, createdAt: Date.now() };
    setTodos([t, ...todos]);
  };

  const toggle = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const del = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const update = (id, text) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  const filtered = useMemo(() => {
    if (filter === "Active") return todos.filter((t) => !t.completed);
    if (filter === "Completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <h1>To‑Do (localStorage)</h1>
          <div className="small">{remaining} left</div>
        </div>

        <TodoInput onAdd={addTodo} />

        <TodoList todos={filtered} onToggle={toggle} onDelete={del} onUpdate={update} />

        <div className="footer">
          <Filters current={filter} onChange={setFilter} />
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={() => { setTodos([]); }} aria-label="Clear all">Clear all</button>
            <button className="btn" onClick={clearCompleted} aria-label="Clear completed">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}
