'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Award, Clock, DollarSign, Zap, Book } from 'lucide-react';
import { generateSkillDemandAnalysis } from '../../utils/gemini';
import type { SkillDemandAnalysis as SkillDemandAnalysisType } from '../../utils/gemini';

export const SkillDemandAnalysis = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SkillDemandAnalysisType | null>(null);

  const handleAnalyze = async () => {
    if (!jobTitle || !industry) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await generateSkillDemandAnalysis(
        jobTitle,
        industry
      );
      setAnalysis(result);
    } catch (error) {
      console.error('Error generating skill demand analysis:', error);
      alert('Error generating analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDemandColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skill Demand Analysis</h2>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Software Engineer"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <div className="relative">
            <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Technology"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
      >
        {loading ? 'Analyzing Skills...' : 'Analyze Skill Demand'}
      </button>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-6"
        >
          <div className="bg-primary-50 p-6 rounded-lg">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-primary-500" />
                  Core Skills in Demand
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {analysis.coreSkills.map((skill, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getDemandColor(skill.demandLevel)}`}>
                          {skill.demandLevel.toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {skill.growthRate}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {skill.averageSalaryImpact}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary-500" />
                  Emerging Skills
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {analysis.emergingSkills.map((skill, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">{skill.skill}</h4>
                      <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Adoption: {skill.adoptionRate}
                        </div>
                        <div className="flex items-center text-sm text-primary-600">
                          <Star className="w-4 h-4 mr-2" />
                          {skill.futureOutlook}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-primary-500" />
                  Recommended Certifications
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {analysis.certifications.map((cert, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-1">{cert.name}</h4>
                      <p className="text-sm text-gray-500 mb-3">by {cert.provider}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 mr-2" />
                          Value: {cert.value}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {cert.timeToComplete}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {cert.cost}
                        </div>
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
  );
};
