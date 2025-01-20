'use client';

import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, AlertCircle, CheckCircle, BarChart2 } from 'lucide-react';

interface FeedbackPanelProps {
  feedback: {
    score: number;
    strengths: string[];
    improvements: string[];
    technicalAccuracy: number;
    communicationClarity: number;
    confidence: number;
    bodyLanguage: string[];
  } | null;
  isLoading: boolean;
}

export function FeedbackPanel({ feedback, isLoading }: FeedbackPanelProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>Complete your interview to receive AI feedback</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 space-y-6"
    >
      {/* Overall Score */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
          <span className="text-2xl font-bold text-white">{feedback.score}%</span>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
        <div className="grid gap-4">
          {/* Technical Accuracy */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Technical Accuracy</span>
              <span className="text-sm font-medium">{feedback.technicalAccuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 rounded-full h-2"
                style={{ width: `${feedback.technicalAccuracy}%` }}
              />
            </div>
          </div>

          {/* Communication Clarity */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Communication Clarity</span>
              <span className="text-sm font-medium">{feedback.communicationClarity}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-500 rounded-full h-2"
                style={{ width: `${feedback.communicationClarity}%` }}
              />
            </div>
          </div>

          {/* Confidence */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Confidence</span>
              <span className="text-sm font-medium">{feedback.confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 rounded-full h-2"
                style={{ width: `${feedback.confidence}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div>
        <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
          <ThumbsUp className="w-5 h-5 mr-2 text-emerald-500" />
          Strengths
        </h3>
        <ul className="space-y-2">
          {feedback.strengths.map((strength, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start"
            >
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{strength}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Areas for Improvement */}
      <div>
        <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
          <ThumbsDown className="w-5 h-5 mr-2 text-red-500" />
          Areas for Improvement
        </h3>
        <ul className="space-y-2">
          {feedback.improvements.map((improvement, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start"
            >
              <AlertCircle className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{improvement}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Body Language Analysis */}
      <div>
        <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
          <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
          Body Language Analysis
        </h3>
        <ul className="space-y-2">
          {feedback.bodyLanguage.map((observation, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2 mt-2" />
              <span className="text-gray-700">{observation}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
