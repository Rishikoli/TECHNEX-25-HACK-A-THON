'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, DollarSign, Target, ArrowRight, TrendingUp } from 'lucide-react';
import { generateNegotiationStrategy } from '../../utils/gemini';
import type { NegotiationStrategy, MarketData } from '../../utils/gemini';

export const NegotiationGuide = () => {
  const [currentSalary, setCurrentSalary] = useState('');
  const [offeredSalary, setOfferedSalary] = useState('');
  const [jobLevel, setJobLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<NegotiationStrategy | null>(null);

  const jobLevels = [
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Lead',
    'Manager',
    'Director',
    'Executive'
  ];

  const handleGenerate = async () => {
    if (!currentSalary || !offeredSalary || !jobLevel) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const currentSalaryNum = parseInt(currentSalary);
      const offeredSalaryNum = parseInt(offeredSalary);

      const marketData: MarketData = {
        industryAverage: Math.floor((currentSalaryNum + offeredSalaryNum) / 2),
        marketGrowth: 5,
        demandLevel: 'high'
      };

      const result = await generateNegotiationStrategy(
        currentSalaryNum,
        offeredSalaryNum,
        jobLevel,
        marketData
      );
      setStrategy(result);
    } catch (error) {
      console.error('Error generating negotiation strategy:', error);
      alert('Error generating strategy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: string | number) => {
    const value = typeof amount === 'string' ? parseInt(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateIncrease = (current: string, offered: string) => {
    const currentNum = parseInt(current);
    const offeredNum = parseInt(offered);
    if (currentNum && offeredNum) {
      return ((offeredNum - currentNum) / currentNum * 100).toFixed(1);
    }
    return '0.0';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Negotiation Guide</h2>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Salary
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
              placeholder="e.g., 80000"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Offered Salary
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              value={offeredSalary}
              onChange={(e) => setOfferedSalary(e.target.value)}
              placeholder="e.g., 95000"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Level
          </label>
          <select
            value={jobLevel}
            onChange={(e) => setJobLevel(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select Level</option>
            {jobLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
      >
        {loading ? 'Generating Strategy...' : 'Generate Negotiation Strategy'}
      </button>

      {strategy && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-6"
        >
          <div className="bg-primary-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-6">Negotiation Strategy</h3>

            {/* Salary Comparison */}
            <div className="mb-6 p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Salary Overview</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Current Salary</div>
                  <div className="text-lg font-semibold text-primary-600">
                    {formatCurrency(currentSalary)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Offered Salary</div>
                  <div className="text-lg font-semibold text-primary-600">
                    {formatCurrency(offeredSalary)}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Increase: {' '}
                <span className="font-semibold text-green-600">
                  {calculateIncrease(currentSalary, offeredSalary)}%
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-primary-500" />
                  Key Talking Points
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  {strategy.talkingPoints.map((point, index) => (
                    <li key={index} className="pl-2">
                      <span className="ml-[-1.5rem]">•</span> {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
                  Market Insights
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  {strategy.marketData.map((data, index) => (
                    <li key={index} className="pl-2">
                      <span className="ml-[-1.5rem]">•</span> {data}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary-500" />
                  Recommended Approach
                </h4>
                <p className="text-sm text-gray-600">{strategy.approach}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Counter Arguments</h4>
                <div className="space-y-3">
                  {strategy.counterPoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">{point}</p>
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
