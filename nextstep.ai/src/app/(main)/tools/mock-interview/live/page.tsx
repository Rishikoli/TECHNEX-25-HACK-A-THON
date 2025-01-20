'use client';

import { useState } from 'react';
import { VideoRecorder } from './components/VideoRecorder';
import { AIAvatar } from './components/AIAvatar';
import { QuestionPanel } from './components/QuestionPanel';
import { motion } from 'framer-motion';

export default function LiveInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [aiMessage, setAIMessage] = useState('Hello! I\'m your AI interviewer. Ready to begin?');

  const handleRecordingStart = () => {
    setIsRecording(true);
  };

  const handleRecordingStop = async (blob: Blob) => {
    setIsRecording(false);
    // Process recording and get AI feedback
  };

  const handleQuestionSelect = (question: string) => {
    setCurrentQuestion(question);
    setAIMessage(question);
  };

  const handleMessageComplete = () => {
    // Handle when AI finishes speaking
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Column - Video and AI Avatar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <VideoRecorder
                onRecordingStart={handleRecordingStart}
                onRecordingStop={handleRecordingStop}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AIAvatar
                isActive={!isRecording}
                message={aiMessage}
                onMessageComplete={handleMessageComplete}
                autoPlay={false}
              />
            </motion.div>
          </div>

          {/* Right Column - Question Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <QuestionPanel
              isRecording={isRecording}
              onQuestionSelect={handleQuestionSelect}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
