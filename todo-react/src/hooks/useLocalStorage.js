import { useState, useEffect } from "react";

/**
 * useLocalStorage hook
 * key - localStorage key
 * initialValue - initial value or function that returns it
 */
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : (typeof initialValue === "function" ? initialValue() : initialValue);
    } catch (e) {
      console.warn("useLocalStorage read error", e);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn("useLocalStorage write error", e);
    }
  }, [key, state]);

  return [state, setState];
}
