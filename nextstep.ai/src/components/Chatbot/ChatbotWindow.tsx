'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, Maximize2, Loader } from 'lucide-react';
import { AnimatedChatButton } from './AnimatedChatButton';
import { chatModel, INITIAL_PROMPT, DEFAULT_GREETING, type ChatMessage } from '@/config/gemini';

export const ChatbotWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [chatContext, setChatContext] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0 && isMounted) {
      initializeChat();
    }
  }, [isOpen, isMounted]);

  const initializeChat = async () => {
    try {
      if (!chatModel) {
        throw new Error('Chat model not initialized. Please check your API key in .env.local file.');
      }

      const chat = chatModel.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: INITIAL_PROMPT }],
          },
          {
            role: "model",
            parts: [{ text: DEFAULT_GREETING }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });
      setChatContext(chat);
      
      // Use a stable timestamp for the initial message
      const timestamp = new Date();
      const botMessage: ChatMessage = {
        id: '1',
        text: DEFAULT_GREETING,
        sender: 'bot',
        timestamp,
      };
      setMessages([botMessage]);
    } catch (error) {
      console.error('Error initializing chat:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to AI service';
      // Use a stable timestamp for the error message
      const timestamp = new Date();
      setMessages([{
        id: '0',
        text: `${errorMessage}\n\nPlease make sure you have:\n1. Created a .env.local file in your project root\n2. Added your Gemini API key as NEXT_PUBLIC_GEMINI_API_KEY\n3. Restarted your Next.js development server`,
        sender: 'bot',
        timestamp,
      }]);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !chatContext || isBotSpeaking) return;

    const timestamp = new Date();
    const messageId = timestamp.getTime().toString();

    const userMessage: ChatMessage = {
      id: messageId,
      text: inputText,
      sender: 'user',
      timestamp,
    };

    const tempBotMessage: ChatMessage = {
      id: (parseInt(messageId) + 1).toString(),
      text: '',
      sender: 'bot',
      timestamp,
      loading: true,
    };

    setMessages(prev => [...prev, userMessage, tempBotMessage]);
    setInputText('');
    setIsBotSpeaking(true);

    try {
      const result = await chatContext.sendMessage([{ text: inputText }]);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempBotMessage.id 
            ? {
                ...msg,
                text,
                loading: false,
              }
            : msg
        )
      );
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempBotMessage.id 
            ? {
                ...msg,
                text: "I apologize, but I encountered an error. Please check your API key and try again.",
                loading: false,
              }
            : msg
        )
      );
    } finally {
      setIsBotSpeaking(false);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    if (!isMounted) return ''; // Return empty string during SSR
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isMounted) {
    return null; // Return null during SSR
  }

  return (
    <>
      {/* Animated Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <AnimatedChatButton onClick={toggleChat} />
        </div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50"
            style={{ height: isMinimized ? 'auto' : '600px' }}
          >
            {/* Header */}
            <div className="bg-primary-600 p-4 flex items-center justify-between text-white">
              <h3 className="font-semibold">Interview Assistant</h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMinimize}
                  className="p-1 hover:bg-primary-500 rounded-lg transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-5 h-5" />
                  ) : (
                    <Minimize2 className="w-5 h-5" />
                  )}
                </button>
                <button 
                  onClick={toggleChat}
                  className="p-1 hover:bg-primary-500 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${
                        message.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-block max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-gray-800'
                        } shadow-sm`}
                      >
                        {message.loading ? (
                          <div className="flex items-center space-x-2">
                            <Loader className="w-4 h-4 animate-spin" />
                            <span>Thinking...</span>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">{message.text}</div>
                        )}
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === 'user'
                              ? 'text-primary-100'
                              : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex items-center space-x-2">
                    <textarea
                      ref={textareaRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={1}
                      disabled={isBotSpeaking}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isBotSpeaking}
                      className="p-2 bg-primary-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
