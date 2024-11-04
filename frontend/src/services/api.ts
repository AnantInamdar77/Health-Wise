// frontend/src/components/Chatbot.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { getChatbotResponse } from '../services/api';

const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 20px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ChatWindow = styled.div`
  padding: 10px;
  height: 300px;
  overflow-y: auto;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-top: 1px solid #ddd;
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    const botResponse = await getChatbotResponse(input);
    setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
  };

  return (
    <ChatbotWrapper>
      <ChatWindow>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "bot" ? "left" : "right" }}>
            <p>{msg.text}</p>
          </div>
        ))}
      </ChatWindow>
      <ChatInput 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={(e) => e.key === "Enter" && handleSend()} 
        placeholder="Ask me anything..." 
      />
    </ChatbotWrapper>
  );
};

export default Chatbot;
import axios from 'axios';

export const getChatbotResponse = async (query: string) => {
  const response = await axios.post('/api/chatbot', { query });
  return response.data.response;
};
// backend/routes/chatbotRoutes.ts
import express from 'express';
import { getChatbotResponse } from '../controllers/chatbotController';

const router = express.Router();

router.post('/', getChatbotResponse);

export default router;
