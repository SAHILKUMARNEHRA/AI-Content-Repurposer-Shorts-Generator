import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Zap, Sparkles } from 'lucide-react';
import axios from 'axios';

const Chat = ({ selectedDoc }) => {
  const [messages, setMessages] = useState([]);
