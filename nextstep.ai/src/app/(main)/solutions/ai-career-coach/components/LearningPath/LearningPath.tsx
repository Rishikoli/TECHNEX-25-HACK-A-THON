'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, Target, Link, Plus, X } from 'lucide-react';
import { generateLearningPath } from '../../utils/gemini';
import type { LearningPath as LearningPathType } from '../../utils/gemini';

export const LearningPath = () => {
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [targetRole, setTargetRole] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [loading, setLoading] = useState(false);
  const [learningPath, setLearningPath] = useState<LearningPathType | null>(null);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill && !currentSkills.includes(newSkill)) {
      setCurrentSkills([...currentSkills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setCurrentSkills(currentSkills.filter(s => s !== skill));
  };

  const handleGenerate = async () => {
    if (currentSkills.length === 0 || !targetRole || !timeframe) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await generateLearningPath(
        currentSkills,
        targetRole,
        timeframe
      );
      setLearningPath(result);
    } catch (error) {
      console.error('Error generating learning path:', error);
      alert('Error generating learning path. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Learning Path Generator</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {currentSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddSkill();
                }
              }}
              placeholder="Add a skill and press Enter"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Role
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Desired Timeframe
          </label>
          <input
            type="text"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            placeholder="e.g., 6 months"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Learning Path'}
        </button>

        {learningPath && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <div className="bg-primary-50 p-6 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{learningPath.title}</h3>
                <p className="text-gray-600">{learningPath.description}</p>
                <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  <Clock className="w-4 h-4 mr-2" />
                  {learningPath.duration}
                </div>
              </div>

              <div className="space-y-6">
                {learningPath.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-4 before:w-px before:h-full before:bg-primary-200"
                  >
                    <div className="absolute left-0 top-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm">
                      {index + 1}
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">{milestone.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Clock className="w-4 h-4 mr-2" />
                        {milestone.timeframe}
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-sm font-medium text-gray-900">Resources:</h5>
                        <div className="grid gap-2">
                          {milestone.resources.map((resource, idx) => (
                            <div
                              key={idx}
                              className="flex items-start bg-gray-50 p-3 rounded-lg"
                            >
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mr-2">
                                    {resource.type}
                                  </span>
                                  <span className="text-sm font-medium text-gray-900">
                                    {resource.name}
                                  </span>
                                </div>
                                {resource.url && (
                                  <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-flex items-center text-sm text-primary-600 hover:text-primary-800"
                                  >
                                    <Link className="w-4 h-4 mr-1" />
                                    View Resource
                                  </a>
                                )}
                              </div>
                            </div>
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
  );
};
