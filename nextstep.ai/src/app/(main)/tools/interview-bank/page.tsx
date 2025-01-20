'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionCategory } from './types';
import { questionBank } from './data/questions';
import QuestionCard from './components/QuestionCard';

const categories: { id: QuestionCategory; label: string }[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'experience', label: 'Experience' },
  { id: 'behavioral', label: 'Behavioral' },
  { id: 'technical', label: 'Technical' },
  { id: 'company', label: 'Company Knowledge' },
  { id: 'career', label: 'Career Goals' },
  { id: 'closing', label: 'Closing Questions' },
];

export default function InterviewBankPage() {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('introduction');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = questionBank[selectedCategory].filter(question =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.modelAnswer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview Question Bank
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive collection of common interview questions with model answers,
            tips, and preparation guidance for each stage of the interview process.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl mx-auto block px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Grid */}
        <div className="space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No questions found matching your search.
            </div>
          ) : (
            <motion.div layout className="space-y-6">
              {filteredQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
