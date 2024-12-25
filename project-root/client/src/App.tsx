import React from 'react';
import ChatWindow from './components/Chat/ChatWindow';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <ChatWindow />
    </div>
  );
};

export default App; 