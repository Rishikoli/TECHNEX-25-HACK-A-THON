'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

interface FeedbackPoint {
  type: 'positive' | 'negative' | 'suggestion';
  text: string;
}

interface AIFeedbackProps {
  transcript: string;
  videoBlob?: Blob;
  isAnalyzing?: boolean;
}

export const AIFeedback = ({ transcript, videoBlob, isAnalyzing }: AIFeedbackProps) => {
  const [feedback, setFeedback] = useState<FeedbackPoint[]>([]);

  useEffect(() => {
    if (transcript && !isAnalyzing) {
      analyzeFeedback();
    }
  }, [transcript, isAnalyzing]);

  const analyzeFeedback = async () => {
    // This would typically call your AI service
    // For now, we'll simulate feedback based on simple analysis
    const feedbackPoints: FeedbackPoint[] = [];

    // Example analysis based on transcript
    if (transcript.toLowerCase().includes('um') || transcript.toLowerCase().includes('uh')) {
      feedbackPoints.push({
        type: 'negative',
        text: 'Try to reduce filler words like "um" and "uh"'
      });
    }

    if (transcript.split(' ').length > 50) {
      feedbackPoints.push({
        type: 'positive',
        text: 'Good detailed response with sufficient elaboration'
      });
    }

    if (transcript.toLowerCase().includes('example') || transcript.toLowerCase().includes('instance')) {
      feedbackPoints.push({
        type: 'positive',
        text: 'Excellent use of specific examples to support your points'
      });
    }

    feedbackPoints.push({
      type: 'suggestion',
      text: 'Consider incorporating more quantifiable achievements in your responses'
    });

    setFeedback(feedbackPoints);
  };

  const getFeedbackIcon = (type: FeedbackPoint['type']) => {
    switch (type) {
      case 'positive':
        return <ThumbsUp className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <ThumbsDown className="w-5 h-5 text-red-500" />;
      case 'suggestion':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">AI Feedback</h3>
        {isAnalyzing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <Brain className="w-5 h-5 text-blue-600" />
          </motion.div>
        ) : null}
      </div>

      {feedback.length > 0 ? (
        <div className="space-y-4">
          {feedback.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start space-x-3 p-3 rounded ${
                point.type === 'positive' ? 'bg-green-50' :
                point.type === 'negative' ? 'bg-red-50' : 'bg-yellow-50'
              }`}
            >
              {getFeedbackIcon(point.type)}
              <p className={`text-sm ${
                point.type === 'positive' ? 'text-green-700' :
                point.type === 'negative' ? 'text-red-700' : 'text-yellow-700'
              }`}>
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">
            {isAnalyzing ? 'Analyzing your response...' : 'Waiting for your response...'}
          </p>
        </div>
      )}
    </div>
  );
};
