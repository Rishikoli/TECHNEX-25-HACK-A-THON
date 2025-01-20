'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';

interface QuestionPanelProps {
  isRecording: boolean;
  onQuestionSelect: (question: string) => void;
}

const defaultQuestions = [
  {
    category: 'Technical Skills',
    questions: [
      'Can you explain your experience with React and Next.js?',
      'What are the key differences between useEffect and useLayoutEffect?',
      'How do you handle state management in large applications?'
    ]
  },
  {
    category: 'Problem Solving',
    questions: [
      'Describe a challenging technical problem you\'ve solved recently.',
      'How do you approach debugging complex issues?',
      'What\'s your process for learning new technologies?'
    ]
  },
  {
    category: 'Work Experience',
    questions: [
      'Tell me about your most recent project.',
      'How do you handle tight deadlines and competing priorities?',
      'Describe a time when you had to lead a team through a difficult situation.'
    ]
  },
  {
    category: 'Behavioral',
    questions: [
      'How do you handle disagreements with team members?',
      'Tell me about a time you failed and what you learned from it.',
      'How do you stay updated with industry trends?'
    ]
  }
];

export function QuestionPanel({ isRecording, onQuestionSelect }: QuestionPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');

  const filteredQuestions = defaultQuestions
    .filter(category => 
      !selectedCategory || category.category === selectedCategory
    )
    .map(category => ({
      ...category,
      questions: category.questions.filter(question =>
        question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.questions.length > 0);

  const handleQuestionClick = (question: string) => {
    if (!isRecording) {
      onQuestionSelect(question);
    }
  };

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuestion.trim() && !isRecording) {
      onQuestionSelect(customQuestion);
      setCustomQuestion('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Questions</h3>

      {/* Search and Filter */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-sm ${
              !selectedCategory
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {defaultQuestions.map((category) => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category.category
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Question Input */}
      <form onSubmit={handleCustomQuestionSubmit} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add a custom question..."
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!customQuestion.trim() || isRecording}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((category) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              {category.category}
            </h4>
            <div className="space-y-2">
              {category.questions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  disabled={isRecording}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                  whileHover={!isRecording ? { scale: 1.01 } : {}}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No questions found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
