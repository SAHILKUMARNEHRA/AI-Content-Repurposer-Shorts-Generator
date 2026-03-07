import React from 'react';
import { Upload, FileText, Sun, Moon } from 'lucide-react';
import Uploader from './Uploader';

const Sidebar = ({ documents, setDocuments, selectedDoc, setSelectedDoc, toggleDarkMode, isDarkMode }) => {
  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full transition-colors">
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">AI Content Repurposer</h1>
        <button onClick={toggleDarkMode} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="p-4">
        <Uploader setDocuments={setDocuments} setSelectedDoc={setSelectedDoc} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Your Documents</h2>
        {documents.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No documents uploaded yet.</p>
        ) : (
          documents.map(doc => (
            <div 
              key={doc.id} 
              onClick={() => setSelectedDoc(doc)}
              className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${selectedDoc?.id === doc.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
            >
              <FileText size={16} />
              <span className="text-sm truncate">{doc.filename}</span>
            </div>
