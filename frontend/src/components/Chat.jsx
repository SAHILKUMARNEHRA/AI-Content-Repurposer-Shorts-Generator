import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Zap, Sparkles } from 'lucide-react';
import axios from 'axios';

const Chat = ({ selectedDoc }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState('groq');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, role: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/chat', {
        query: userMessage.text,
        provider: provider,
        document_id: selectedDoc?.id || null
      });

      const botMessage = { text: response.data.answer, role: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Failed to connect to AI server.", role: 'bot', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
