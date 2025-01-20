'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, X, Plus, Award, Target, Book } from 'lucide-react';
import { generateCareerAssessment } from '../../utils/gemini';
import type { CareerAssessment as CareerAssessmentType } from '../../utils/gemini';

export const CareerAssessment = () => {
  const [background, setBackground] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<CareerAssessmentType | null>(null);
  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleAddInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAssess = async () => {
    if (!background || interests.length === 0 || skills.length === 0 || !experience) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await generateCareerAssessment(
        background,
        interests,
        skills,
        experience
      );
      setAssessment(result);
    } catch (error) {
      console.error('Error generating career assessment:', error);
      alert('Error generating assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Career Assessment</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Background
          </label>
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="Briefly describe your educational background and work history..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interests & Passions
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                {interest}
                <button
                  onClick={() => handleRemoveInterest(interest)}
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
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddInterest();
                }
              }}
              placeholder="Add an interest and press Enter"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleAddInterest}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((skill) => (
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
            Years of Experience
          </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g., 5 years in software development"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={handleAssess}
          disabled={loading}
          className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Generate Career Assessment'}
        </button>

        {assessment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-6">Career Assessment Results</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-primary-500" />
                    Key Strengths
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                    {assessment.strengths.map((strength, index) => (
                      <li key={index} className="pl-2">
                        <span className="ml-[-1.5rem]">•</span> {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary-500" />
                    Areas for Improvement
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                    {assessment.weaknesses.map((weakness, index) => (
                      <li key={index} className="pl-2">
                        <span className="ml-[-1.5rem]">•</span> {weakness}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary-500" />
                    Recommended Roles
                  </h4>
                  <div className="space-y-4">
                    {assessment.recommendedRoles.map((role, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{role.title}</h5>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {role.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Book className="w-5 h-5 mr-2 text-primary-500" />
                    Skill Gaps & Resources
                  </h4>
                  <div className="space-y-4">
                    {assessment.skillGaps.map((gap, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{gap.skill}</h5>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              gap.importance === 'high'
                                ? 'bg-red-100 text-red-800'
                                : gap.importance === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {gap.importance.charAt(0).toUpperCase() + gap.importance.slice(1)} Priority
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <h6 className="font-medium mb-1">Recommended Resources:</h6>
                          <ul className="list-disc list-inside space-y-1">
                            {gap.resources.map((resource, idx) => (
                              <li key={idx} className="pl-2">
                                <span className="ml-[-1.5rem]">•</span> {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
