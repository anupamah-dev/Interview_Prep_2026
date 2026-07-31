import React from 'react';
import QuestionList from './components/QuestionList';
import Timer from './components/Timer';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>React Samples</h1>
      <Timer initialSeconds={30} onExpire={() => alert('Time up!')} />
      <QuestionList />
    </div>
  );
}
export default App;
