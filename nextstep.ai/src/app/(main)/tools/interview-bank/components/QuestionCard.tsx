'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Question } from '../types';

interface Props {
  question: Question;
}

export default function QuestionCard({ question }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${getImportanceColor(question.importance)}`}>
                {question.importance}
              </span>
              {question.importance === 'high' && (
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              {question.question}
            </h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 text-gray-400 hover:text-gray-500"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t space-y-4"
            >
              {/* Model Answer */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Model Answer</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{question.modelAnswer}</p>
              </div>

              {/* Tips */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Tips</h4>
                <ul className="list-disc list-inside space-y-1">
                  {question.tips.map((tip, index) => (
                    <li key={index} className="text-gray-600">{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Common Follow-ups */}
              {question.commonFollowUps && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Common Follow-up Questions</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {question.commonFollowUps.map((followUp, index) => (
                      <li key={index} className="text-gray-600">{followUp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Things to Avoid */}
              {question.thingsToAvoid && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Things to Avoid</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {question.thingsToAvoid.map((item, index) => (
                      <li key={index} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preparation Points */}
              {question.preparationPoints && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">How to Prepare</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {question.preparationPoints.map((point, index) => (
                      <li key={index} className="text-gray-600">{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
