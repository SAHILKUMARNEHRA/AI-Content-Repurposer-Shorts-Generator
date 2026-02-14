import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
