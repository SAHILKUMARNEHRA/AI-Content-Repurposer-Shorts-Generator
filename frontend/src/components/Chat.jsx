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
          {selectedDoc ? `Chatting with: ${selectedDoc.filename}` : 'General Chat (No Document Selected)'}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setProvider('groq')} 
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${provider === 'groq' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
          >
            <Zap size={14} /> Groq (Llama3)
          </button>
          <button 
            onClick={() => setProvider('gemini')} 
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${provider === 'gemini' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
          >
            <Sparkles size={14} /> Gemini
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 space-y-4">
            <Bot size={48} className="opacity-50" />
            <p className="text-center">Ask anything about your documents.<br/> Powered by advanced RAG technology.</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 flex-shrink-0">
                <Bot size={18} />
              </div>
            )}
            <div className={`px-4 py-2 rounded-2xl max-w-[80%] shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : msg.isError 
                  ? 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800 rounded-bl-none'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
            {msg.role === 'user' && (
