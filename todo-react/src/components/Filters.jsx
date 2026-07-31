import React from "react";

const FILTERS = ["All", "Active", "Completed"];

export default function Filters({ current, onChange }) {
  return (
    <div className="filters" role="tablist" aria-label="Filter todos">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={`filter-btn ${current === f ? "active" : ""}`}
          onClick={() => onChange(f)}
          aria-pressed={current === f}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
