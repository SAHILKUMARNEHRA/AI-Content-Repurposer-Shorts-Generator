import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        documents={documents} 
        setDocuments={setDocuments} 
        selectedDoc={selectedDoc} 
        setSelectedDoc={setSelectedDoc}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <main className="flex-1 flex flex-col bg-white dark:bg-gray-800">
        <Chat selectedDoc={selectedDoc} />
      </main>
    </div>
  );
}

export default App;