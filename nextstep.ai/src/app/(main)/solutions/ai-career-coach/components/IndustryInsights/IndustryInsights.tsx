'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Target, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import { generateIndustryInsights } from '../../utils/gemini';
import type { IndustryInsight } from '../../utils/gemini';

export const IndustryInsights = () => {
  const [industry, setIndustry] = useState('');
  const [role, setRole] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<IndustryInsight | null>(null);

  const handleGenerate = async () => {
    if (!industry || !role || !region) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await generateIndustryInsights(
        industry,
        role,
        region
      );
      setInsights(result);
    } catch (error) {
      console.error('Error generating industry insights:', error);
      alert('Error generating insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDemandIcon = (demand: string) => {
    switch (demand) {
      case 'increasing':
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'stable':
        return <ArrowRight className="w-4 h-4 text-yellow-500" />;
      case 'decreasing':
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Industry Insights</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g., Technology"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="e.g., North America"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Generate Industry Insights'}
        </button>

        {insights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <div className="bg-primary-50 p-6 rounded-lg">
              <div className="space-y-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
                    Industry Trends
                  </h4>
                  <div className="grid gap-4">
                    {insights.trends.map((trend, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{trend.name}</h5>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              trend.impact === 'high'
                                ? 'bg-red-100 text-red-800'
                                : trend.impact === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {trend.impact.charAt(0).toUpperCase() + trend.impact.slice(1)} Impact
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{trend.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-primary-500" />
                    In-Demand Skills
                  </h4>
                  <div className="grid gap-4">
                    {insights.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <h5 className="font-medium text-gray-900 mr-2">{skill.name}</h5>
                            {getDemandIcon(skill.demand)}
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {skill.timeToMaster} to master
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Demand: {skill.demand.charAt(0).toUpperCase() + skill.demand.slice(1)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary-500" />
                    Career Opportunities
                  </h4>
                  <div className="grid gap-4">
                    {insights.opportunities.map((opportunity, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <h5 className="font-medium text-gray-900 mb-2">{opportunity.role}</h5>
                        <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-900">Growth Potential:</span>
                          <p className="text-sm text-gray-600">{opportunity.growthPotential}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">Required Skills:</span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {opportunity.requiredSkills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                              >
                                {skill}
                              </span>
                            ))}
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
    </div>
  );
};
