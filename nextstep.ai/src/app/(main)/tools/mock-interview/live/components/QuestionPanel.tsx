'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, BookOpen, Code, Users, Brain, Briefcase, Lightbulb } from 'lucide-react';

interface QuestionPanelProps {
  isRecording: boolean;
  onQuestionSelect: (question: string) => void;
}

const defaultQuestions = [
  {
    category: 'Technical Skills',
    icon: Code,
    questions: [
      'Can you explain your experience with modern web frameworks like React and Next.js?',
      'How do you handle state management in large applications?',
      'Describe your approach to writing clean, maintainable code.',
      'How do you ensure your code is secure and follows best practices?',
      'What strategies do you use for optimizing application performance?'
    ]
  },
  {
    category: 'Problem Solving',
    icon: Brain,
    questions: [
      'Describe a challenging technical problem you\'ve solved recently.',
      'How do you approach debugging complex issues?',
      'Tell me about a time when you had to make a difficult technical decision.',
      'How do you stay updated with new technologies and industry trends?',
      'What\'s your process for learning and implementing new technologies?'
    ]
  },
  {
    category: 'Project Experience',
    icon: Briefcase,
    questions: [
      'Tell me about your most significant project and your role in it.',
      'How do you handle tight deadlines and competing priorities?',
      'Describe a time when you had to refactor a large codebase.',
      'What project management methodologies have you worked with?',
      'How do you ensure project requirements are met effectively?'
    ]
  },
  {
    category: 'Team Collaboration',
    icon: Users,
    questions: [
      'How do you handle disagreements with team members?',
      'Describe your experience with code reviews and pair programming.',
      'How do you communicate technical concepts to non-technical stakeholders?',
      'Tell me about a time you mentored another developer.',
      'How do you contribute to a positive team culture?'
    ]
  },
  {
    category: 'System Design',
    icon: Lightbulb,
    questions: [
      'How do you approach designing scalable systems?',
      'Describe your experience with microservices architecture.',
      'How do you handle data modeling and database design?',
      'What factors do you consider when choosing technologies for a new project?',
      'How do you ensure system reliability and fault tolerance?'
    ]
  },
  {
    category: 'Learning & Growth',
    icon: BookOpen,
    questions: [
      'What are your current learning goals in software development?',
      'How do you handle feedback and criticism?',
      'Tell me about a failure you\'ve experienced and what you learned.',
      'How do you balance technical debt with new feature development?',
      'What motivates you as a developer?'
    ]
  }
];

export function QuestionPanel({ isRecording, onQuestionSelect }: QuestionPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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
      setExpandedCategory(null);
    }
  };

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuestion.trim() && !isRecording) {
      onQuestionSelect(customQuestion);
      setCustomQuestion('');
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
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
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              !selectedCategory
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {defaultQuestions.map(({ category, icon: Icon }) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap flex items-center ${
                selectedCategory === category
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4 mr-1" />
              {category}
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
      <div className="space-y-4">
        {filteredQuestions.map((category) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-100 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleCategory(category.category)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <category.icon className="w-5 h-5 mr-2 text-gray-500" />
                <h4 className="font-medium text-gray-700">{category.category}</h4>
              </div>
              <span className="text-sm text-gray-500">{category.questions.length} questions</span>
            </button>

            {expandedCategory === category.category && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-100"
              >
                {category.questions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    disabled={isRecording}
                    className={`w-full text-left p-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                      isRecording
                        ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                    whileHover={!isRecording ? { x: 4 } : {}}
                  >
                    {question}
                  </motion.button>
                ))}
              </motion.div>
            )}
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
