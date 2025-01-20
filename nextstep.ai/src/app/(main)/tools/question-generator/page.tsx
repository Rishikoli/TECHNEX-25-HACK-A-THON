'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Book, Settings, Clock, Award, Plus, X } from 'lucide-react';
import { generateQuestionsFromSkills, generateQuestionsByTopic, generateCustomQuestions } from './utils/questionGenerator';
import type { QuestionSet } from './utils/questionGenerator';

export default function QuestionGeneratorPage() {
  const [activeTab, setActiveTab] = useState<'skills' | 'topic' | 'custom'>('skills');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionSet | null>(null);

  // Skills-based state
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<string>('intermediate');
  const [skillsQuestionCount, setSkillsQuestionCount] = useState(10);

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

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillsSubmit = async () => {
    if (skills.length === 0) {
      alert('Please add at least one skill');
      return;
    }
    setLoading(true);
    try {
      const result = await generateQuestionsFromSkills(skills, experienceLevel, skillsQuestionCount);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Interview Question Generator</h1>
      
      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'skills' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <Code className="w-5 h-5 mr-2" />
            Skills Based
          </button>
          <button
            onClick={() => setActiveTab('topic')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'topic' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <Book className="w-5 h-5 mr-2" />
            Topic Based
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5 mr-2" />
            Custom
          </button>
        </div>

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Your Skills
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Enter a skill (e.g., Python, React, SQL)"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                </label>
                <input
                  type="number"
                  value={skillsQuestionCount}
                  onChange={(e) => setSkillsQuestionCount(Number(e.target.value))}
                  min="1"
                  max="20"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              </div>

              <button
                onClick={handleSkillsSubmit}
                disabled={loading || skills.length === 0}
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 disabled:bg-gray-300"
              >
                {loading ? 'Generating...' : 'Generate Questions'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'topic' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., React.js, Data Structures, System Design"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={topicDifficulty}
                  onChange={(e) => setTopicDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                </label>
                <input
                  type="number"
                  value={topicQuestionCount}
                  onChange={(e) => setTopicQuestionCount(Number(e.target.value))}
                  min="1"
                  max="20"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              </div>
              <button
                onClick={handleTopicSubmit}
                disabled={loading || !topic}
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 disabled:bg-gray-300"
              >
                {loading ? 'Generating...' : 'Generate Questions'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topics
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTopic()}
                    placeholder="Enter a topic"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                  />
                  <button
                    onClick={handleAddCustomTopic}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {customTopics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {customTopics.map((topic) => (
                    <span
                      key={topic}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {topic}
                      <button
                        onClick={() => handleRemoveCustomTopic(topic)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={customDifficulty}
                  onChange={(e) => setCustomDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Type
                </label>
                <select
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value as 'technical' | 'behavioral' | 'both')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                >
                  <option value="technical">Technical</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                </label>
                <input
                  type="number"
                  value={customQuestionCount}
                  onChange={(e) => setCustomQuestionCount(Number(e.target.value))}
                  min="1"
                  max="20"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              </div>
              <button
                onClick={handleCustomSubmit}
                disabled={loading || customTopics.length === 0}
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 disabled:bg-gray-300"
              >
                {loading ? 'Generating...' : 'Generate Questions'}
              </button>
            </div>
          </div>
        )}
      </div>

      {questions && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Generated Questions</h2>
          <div className="grid grid-cols-1 gap-4">
            {questions.questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">Question {index + 1}</span>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {question.difficulty}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {question.expectedDuration}
                    </span>
                  </div>
                </div>
                <p className="mb-2">{question.question}</p>
                <div className="flex flex-wrap gap-2">
                  {question.skillsTested.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-gray-600">
            <p>Total Questions: {questions.totalQuestions}</p>
            <p>Estimated Duration: {questions.estimatedDuration}</p>
          </div>
        </div>
      )}
    </div>
  );
}
