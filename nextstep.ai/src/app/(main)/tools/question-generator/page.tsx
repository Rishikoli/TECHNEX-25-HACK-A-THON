'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Book, Settings, Clock, Award, FileText } from 'lucide-react';
import { generateQuestionsFromResume, generateQuestionsByTopic, generateCustomQuestions } from './utils/questionGenerator';
import type { QuestionSet, Question } from './utils/questionGenerator';

export default function QuestionGeneratorPage() {
  const [activeTab, setActiveTab] = useState<'resume' | 'topic' | 'custom'>('resume');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionSet | null>(null);

  // Resume upload state
  const [resumeText, setResumeText] = useState('');
  const [resumeQuestionCount, setResumeQuestionCount] = useState(10);

  // Topic-based state
  const [topic, setTopic] = useState('');
  const [topicDifficulty, setTopicDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [topicQuestionCount, setTopicQuestionCount] = useState(10);

  // Custom questions state
  const [customTopics, setCustomTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState('');
  const [customDifficulty, setCustomDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [customType, setCustomType] = useState<'technical' | 'behavioral' | 'both'>('both');
  const [customQuestionCount, setCustomQuestionCount] = useState(10);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResumeText(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleResumeSubmit = async () => {
    if (!resumeText) {
      alert('Please upload a resume first');
      return;
    }
    setLoading(true);
    try {
      const result = await generateQuestionsFromResume(resumeText, resumeQuestionCount);
      setQuestions(result);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Error generating questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSubmit = async () => {
    if (!topic) {
      alert('Please enter a topic');
      return;
    }
    setLoading(true);
    try {
      const result = await generateQuestionsByTopic(topic, topicDifficulty, topicQuestionCount);
      setQuestions(result);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Error generating questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomTopic = () => {
    if (customTopic && !customTopics.includes(customTopic)) {
      setCustomTopics([...customTopics, customTopic]);
      setCustomTopic('');
    }
  };

  const handleRemoveCustomTopic = (topic: string) => {
    setCustomTopics(customTopics.filter(t => t !== topic));
  };

  const handleCustomSubmit = async () => {
    if (customTopics.length === 0) {
      alert('Please add at least one topic');
      return;
    }
    setLoading(true);
    try {
      const result = await generateCustomQuestions({
        topics: customTopics,
        difficulty: customDifficulty,
        type: customType,
        numberOfQuestions: customQuestionCount
      });
      setQuestions(result);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Error generating questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Interview Question Generator</h1>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('resume')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'resume'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5 mr-2" />
              Resume Upload
            </button>
            <button
              onClick={() => setActiveTab('topic')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'topic'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Book className="w-5 h-5 mr-2" />
              Topic-Based
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'custom'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5 mr-2" />
              Custom
            </button>
          </div>

          {/* Input Forms */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {activeTab === 'resume' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Resume
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".txt,.pdf,.doc,.docx"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">TXT, PDF, DOC up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={resumeQuestionCount}
                    onChange={(e) => setResumeQuestionCount(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button
                  onClick={handleResumeSubmit}
                  disabled={loading || !resumeText}
                  className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Generating Questions...' : 'Generate Questions'}
                </button>
              </div>
            )}

            {activeTab === 'topic' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., React.js, Data Structures, System Design"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={topicDifficulty}
                    onChange={(e) => setTopicDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={topicQuestionCount}
                    onChange={(e) => setTopicQuestionCount(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button
                  onClick={handleTopicSubmit}
                  disabled={loading || !topic}
                  className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Generating Questions...' : 'Generate Questions'}
                </button>
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topics
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="Add a topic"
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={handleAddCustomTopic}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {customTopics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                      >
                        {topic}
                        <button
                          onClick={() => handleRemoveCustomTopic(topic)}
                          className="ml-2 text-primary-600 hover:text-primary-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={customDifficulty}
                    onChange={(e) => setCustomDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Type
                  </label>
                  <select
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as 'technical' | 'behavioral' | 'both')}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="technical">Technical</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={customQuestionCount}
                    onChange={(e) => setCustomQuestionCount(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button
                  onClick={handleCustomSubmit}
                  disabled={loading || customTopics.length === 0}
                  className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Generating Questions...' : 'Generate Questions'}
                </button>
              </div>
            )}
          </div>

          {/* Generated Questions */}
          {questions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Generated Questions</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {questions.estimatedDuration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-1" />
                      {questions.totalQuestions} Questions
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {questions.questions.map((question: Question, index: number) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {index + 1}. {question.question}
                        </h3>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          Expected Duration: {question.expectedDuration}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Category:</span>
                          <span className="ml-2 text-sm text-gray-600">{question.category}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Skills Tested:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {question.skillsTested.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
