'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Mic, MicOff } from 'lucide-react';

export default function AIInterviewPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    { role: 'ai', content: 'Hello! I\'m your AI interviewer. I\'ll adapt my questions based on your responses. Ready to begin?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
    setInputMessage('');
    setIsThinking(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Thank you for your response. Let me analyze that and prepare my next question...' 
      }]);
      setIsThinking(false);
    }, 2000);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
            <div className="flex items-center space-x-4">
              <Bot className="w-12 h-12 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">AI Interview Session</h1>
                <p className="text-white/90">Personalized practice with adaptive questioning</p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 rounded-lg p-4 flex space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-full transition-colors ${
                  isListening
                    ? 'bg-red-100 text-red-500 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your response..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="mt-8 bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Tips</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Speak clearly and confidently</li>
            <li>• Take a moment to think before responding</li>
            <li>• Provide specific examples in your answers</li>
            <li>• Ask clarifying questions if needed</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
