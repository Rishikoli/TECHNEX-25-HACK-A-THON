import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, Lightbulb, AlertCircle } from 'lucide-react';
import { analyzeResponse } from '@/services/gemini';

interface AIFeedbackProps {
  transcript: string;
  question: string;
  type: 'behavioral' | 'technical';
  isRecording: boolean;
}

interface FeedbackData {
  positive: string[];
  suggestions: string[];
  warnings: string[];
}

export const AIFeedback = ({ transcript, question, type, isRecording }: AIFeedbackProps) => {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeFeedback = async () => {
      if (!transcript || isRecording) return;

      setIsAnalyzing(true);
      setError(null);

      try {
        const result = await analyzeResponse(transcript, question, type);
        setFeedback(result.feedback);
      } catch (err) {
        console.error('Error analyzing feedback:', err);
        setError('Failed to analyze response. Please try again.');
      } finally {
        setIsAnalyzing(false);
      }
    };

    const timeoutId = setTimeout(analyzeFeedback, 1000);
    return () => clearTimeout(timeoutId);
  }, [transcript, question, type, isRecording]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-medium text-gray-900">AI Coach Feedback</h3>
        </div>
        {isAnalyzing && (
          <span className="text-sm text-purple-600 animate-pulse">
            Analyzing...
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-50 text-red-700 rounded-lg"
          >
            {error}
          </motion.div>
        ) : feedback ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Positive Points */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-green-500" />
                What You Did Well
              </h4>
              <div className="space-y-2">
                {feedback.positive.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-2 bg-green-50 text-green-700 text-sm rounded-lg"
                  >
                    {point}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            {feedback.suggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-yellow-500" />
                  Suggestions for Improvement
                </h4>
                <div className="space-y-2">
                  {feedback.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-2 bg-yellow-50 text-yellow-700 text-sm rounded-lg"
                    >
                      {suggestion}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {feedback.warnings.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  Important Points to Address
                </h4>
                <div className="space-y-2">
                  {feedback.warnings.map((warning, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-2 bg-red-50 text-red-700 text-sm rounded-lg"
                    >
                      {warning}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : !isRecording && transcript ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4"
          >
            <p className="text-gray-400 italic">Waiting for you to finish speaking...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4"
          >
            <p className="text-gray-400 italic">
              {isRecording 
                ? "Recording in progress... Feedback will appear when you finish."
                : "Start speaking to get AI feedback"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
