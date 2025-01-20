'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Clock, Tag, BarChart2 } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: string;
  type: string;
  difficulty: string;
  expectedDuration: number;
}

interface QuestionPanelProps {
  questions: Question[];
  currentQuestionId: number;
  onQuestionChange: (questionId: number) => void;
}

export const QuestionPanel = ({
  questions,
  currentQuestionId,
  onQuestionChange,
}: QuestionPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      onQuestionChange(questions[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onQuestionChange(questions[currentIndex - 1].id);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{
        width: isExpanded ? '400px' : '80px',
      }}
      className="fixed right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-l-lg overflow-hidden z-20"
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-l"
      >
        {isExpanded ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="h-full">
        {isExpanded ? (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>
            
            {/* Current question details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-900 mb-3">{currentQuestion.text}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Tag className="w-4 h-4 mr-1" />
                  {currentQuestion.category}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentQuestion.expectedDuration}s
                </div>
                <div className="flex items-center text-gray-600">
                  <BarChart2 className="w-4 h-4 mr-1" />
                  {currentQuestion.difficulty}
                </div>
              </div>
            </div>

            {/* Question list */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {questions.map((question, index) => (
                <motion.button
                  key={question.id}
                  onClick={() => onQuestionChange(question.id)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                    question.id === currentQuestionId
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs">
                      {index + 1}
                    </span>
                    <span className="line-clamp-2">{question.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center px-3 py-2 rounded ${
                  currentIndex === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className={`flex items-center px-3 py-2 rounded ${
                  currentIndex === questions.length - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center py-4 px-2">
            {questions.map((question, index) => (
              <motion.button
                key={question.id}
                onClick={() => onQuestionChange(question.id)}
                className={`w-8 h-8 rounded-full mb-2 text-xs flex items-center justify-center ${
                  question.id === currentQuestionId
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
