'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Building2, MapPin, DollarSign, Users, ChartBar } from 'lucide-react';
import { generateJobMarketAnalysis } from '../../utils/gemini';
import type { JobMarketAnalysis as JobMarketAnalysisType } from '../../utils/gemini';

export const JobMarketAnalysis = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<JobMarketAnalysisType | null>(null);

  const handleAnalyze = async () => {
    if (!jobTitle || !industry || !location) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await generateJobMarketAnalysis(
        jobTitle,
        industry,
        location
      );
      setAnalysis(result);
    } catch (error) {
      console.error('Error generating job market analysis:', error);
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
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Job Market Analysis</h2>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
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
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Technology"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York"
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
        {loading ? 'Analyzing Market...' : 'Analyze Job Market'}
      </button>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-6"
        >
          <div className="bg-primary-50 p-6 rounded-lg">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Demand Level</h4>
                  <ChartBar className="w-5 h-5 text-primary-500" />
                </div>
                <div className={`inline-flex px-2 py-1 rounded text-sm font-medium ${getDemandColor(analysis.overview.demandLevel)}`}>
                  {analysis.overview.demandLevel.toUpperCase()}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Growth Rate</h4>
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                </div>
                <p className="text-lg font-semibold text-gray-900">{analysis.overview.growthRate}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Average Salary</h4>
                  <DollarSign className="w-5 h-5 text-primary-500" />
                </div>
                <p className="text-lg font-semibold text-gray-900">{analysis.overview.averageSalary}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Competition</h4>
                  <Users className="w-5 h-5 text-primary-500" />
                </div>
                <div className={`inline-flex px-2 py-1 rounded text-sm font-medium ${getDemandColor(analysis.overview.competitionLevel)}`}>
                  {analysis.overview.competitionLevel.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Top Employers</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {analysis.topEmployers.map((employer, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">{employer.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{employer.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500">Open Positions</span>
                        <span className="font-medium text-primary-600">{employer.openPositions}</span>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Key Benefits:</h5>
                        <div className="flex flex-wrap gap-2">
                          {employer.benefits.map((benefit, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Market Trends</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {analysis.marketTrends.map((trend, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">{trend.trend}</h4>
                      <p className="text-sm text-gray-600 mb-3">{trend.impact}</p>
                      <div className="flex items-center text-sm text-primary-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {trend.timeframe}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Location Insights</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {analysis.locationInsights.map((insight, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex items-center mb-3">
                        <MapPin className="w-5 h-5 text-primary-500 mr-2" />
                        <h4 className="font-medium text-gray-900">{insight.location}</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Demand Level</span>
                          <span className={`text-sm font-medium ${getDemandColor(insight.demandLevel)}`}>
                            {insight.demandLevel.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Average Salary</span>
                          <span className="text-sm font-medium text-gray-900">{insight.averageSalary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cost of Living</span>
                          <span className="text-sm font-medium text-gray-900">{insight.costOfLiving}</span>
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
