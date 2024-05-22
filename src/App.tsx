import React from 'react';
import CodeEditor from './components/CodeEditor';
import ErrorBoundary from './ErrorBoundary';

const App: React.FC = () => {
  return (
    <div>
      <h1>Python Code Runner</h1>
      <ErrorBoundary>
      <CodeEditor />
      </ErrorBoundary>
    </div>
  );
};

export default App;
