import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Simple paged question list. Demonstrates async fetch, loading state, error handling.
 * This snippet assumes a backend at /api/questions; if you don't have one, it will error — mock or replace axios calls.
 */
export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPage();
  }, []);
  const fetchPage = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/questions?page=${page}&size=10`);
      // adapt to your backend shape; here we expect an array
      setQuestions(res.data || []);
    } catch (err) {
      console.error('Failed to fetch questions', err);
      // fallback example data
      setQuestions([{ id: 1, title: 'Sample question (local fallback)' }]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading questions…</div>;
  return (
    <div>
      <h3>Questions ({questions.length})</h3>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>{q.title || q.TITLE || 'Untitled'}</li>
        ))}
      </ul>
    </div>
  );
}
