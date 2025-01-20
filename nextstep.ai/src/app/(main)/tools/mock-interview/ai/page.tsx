'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Mic, MicOff, ArrowLeft } from 'lucide-react';
import { RoleSelector } from './components/RoleSelector';
import { InterviewConfig } from './components/InterviewConfig';

type InterviewStage = 'role_selection' | 'configuration' | 'interview';

interface InterviewState {
  role: any;
  config: any;
  messages: Array<{ role: 'user' | 'ai' | 'system'; content: string }>;
}

export default function AIInterviewPage() {
  const [stage, setStage] = useState<InterviewStage>('role_selection');
  const [state, setState] = useState<InterviewState>({
    role: null,
    config: null,
    messages: [
      {
        role: 'system',
        content: 'Welcome to your personalized AI interview session. Let\'s start by selecting your target role.',
      },
    ],
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleRoleSelect = (role: any) => {
    setState((prev) => ({
      ...prev,
      role,
      messages: [
        ...prev.messages,
        {
          role: 'system',
          content: `Great! You've selected ${role.title}. Let's configure your interview session.`,
        },
      ],
    }));
    setStage('configuration');
  };

  const handleConfigComplete = (config: any) => {
    setState((prev) => ({
      ...prev,
      config,
      messages: [
        ...prev.messages,
        {
          role: 'ai',
          content: `Perfect! I'll be your interviewer for this ${config.duration}-minute ${
            prev.role.title
          } interview. I'll focus on ${config.focusAreas.join(
            ', '
          )} at a ${config.difficulty} level. Let's begin with your first question.`,
        },
        {
          role: 'ai',
          content: generateFirstQuestion(prev.role, config),
        },
      ],
    }));
    setStage('interview');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, { role: 'user', content: inputMessage }],
    }));
    setInputMessage('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            role: 'ai',
            content: generateResponse(inputMessage, prev.role, prev.config),
          },
        ],
      }));
      setIsThinking(false);
    }, 2000);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic here
  };

  const goBack = () => {
    if (stage === 'configuration') {
      setStage('role_selection');
    }
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
              {stage !== 'role_selection' && (
                <button
                  onClick={goBack}
                  className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
              <Bot className="w-12 h-12 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">AI Interview Session</h1>
                <p className="text-white/90">
                  {stage === 'role_selection'
                    ? 'Select your target role'
                    : stage === 'configuration'
                    ? `Configuring ${state.role?.title} interview`
                    : `${state.role?.title} Interview`}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {stage === 'role_selection' && (
                <motion.div
                  key="role-selection"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <RoleSelector onSelect={handleRoleSelect} />
                </motion.div>
              )}

              {stage === 'configuration' && (
                <motion.div
                  key="configuration"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <InterviewConfig onComplete={handleConfigComplete} />
                </motion.div>
              )}

              {stage === 'interview' && (
                <motion.div
                  key="interview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Chat Messages */}
                  <div className="h-[500px] overflow-y-auto space-y-4">
                    {state.messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex ${
                          message.role === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === 'user'
                              ? 'bg-emerald-500 text-white'
                              : message.role === 'system'
                              ? 'bg-gray-200 text-gray-800'
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
                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          />
                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.4s' }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={toggleVoiceInput}
                        className={`p-2 rounded-full transition-colors ${
                          isListening
                            ? 'bg-red-100 text-red-500 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {isListening ? (
                          <MicOff className="w-5 h-5" />
                        ) : (
                          <Mic className="w-5 h-5" />
                        )}
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
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Interview Tips */}
        {stage === 'interview' && (
          <motion.div
            className="mt-8 bg-white rounded-lg shadow p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Interview Tips for {state.role?.title}
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Focus on specific examples from your experience</li>
              <li>• Demonstrate your knowledge of {state.role?.skills.join(', ')}</li>
              <li>• Structure your answers using the STAR method</li>
              <li>• Ask clarifying questions when needed</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Helper functions for generating responses
function generateFirstQuestion(role: any, config: any): string {
  const questions = {
    'frontend-dev': "Can you explain your experience with modern frontend frameworks, particularly React and TypeScript?",
    'backend-dev': "What's your approach to designing and implementing RESTful APIs?",
    'fullstack-dev': "How do you handle the integration between frontend and backend systems?",
    'devops-eng': "Can you describe your experience with CI/CD pipelines and container orchestration?",
    'data-scientist': "What's your process for approaching a new data analysis problem?",
    'ml-engineer': "How do you handle the full lifecycle of deploying machine learning models to production?",
    'product-manager': "How do you prioritize features in your product roadmap?",
    'ui-designer': "What's your design process for creating user interfaces?",
  };

  return questions[role.id] || "Tell me about your relevant experience for this role.";
}

function generateResponse(message: string, role: any, config: any): string {
  // This would be replaced with actual AI response generation
  return "Thank you for your response. Let's dive deeper into that. Can you provide a specific example of a challenging situation where you applied these skills?";
}
