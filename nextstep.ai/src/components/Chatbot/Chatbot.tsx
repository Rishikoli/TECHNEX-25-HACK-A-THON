'use client';

import React from 'react';
import { ChatbotWindow } from './ChatbotWindow';
import { FloatingAvatar } from './FloatingAvatar';

export const Chatbot: React.FC = () => {
  return (
    <>
      <FloatingAvatar />
      <ChatbotWindow />
    </>
  );
};

export default Chatbot;
