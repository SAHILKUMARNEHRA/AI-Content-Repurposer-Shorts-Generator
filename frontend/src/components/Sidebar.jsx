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
