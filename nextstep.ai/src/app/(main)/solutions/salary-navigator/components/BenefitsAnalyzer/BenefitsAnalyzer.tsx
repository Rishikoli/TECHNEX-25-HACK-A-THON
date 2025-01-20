'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, X } from 'lucide-react';
import { analyzeBenefitsPackage } from '../../utils/gemini';
import type { BenefitsAnalysis } from '../../utils/gemini';

export const BenefitsAnalyzer = () => {
  const [benefits, setBenefits] = useState<Array<{
    type: string;
    value: number;
    description: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<BenefitsAnalysis | null>(null);
  const [newBenefit, setNewBenefit] = useState({
    type: '',
    value: '',
    description: ''
  });

  const handleAddBenefit = () => {
    if (!newBenefit.type || !newBenefit.value) return;

    setBenefits([
      ...benefits,
      {
        type: newBenefit.type,
        value: parseFloat(newBenefit.value),
        description: newBenefit.description
      }
    ]);

    setNewBenefit({
      type: '',
      value: '',
      description: ''
    });
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (benefits.length === 0) {
      alert('Please add at least one benefit to analyze');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeBenefitsPackage(benefits);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing benefits:', error);
      alert('Error analyzing benefits. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Benefits Analyzer</h2>

      <div className="space-y-6">
        {/* Add New Benefit Form */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add Benefit</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefit Type
              </label>
              <input
                type="text"
                value={newBenefit.type}
                onChange={(e) => setNewBenefit({ ...newBenefit, type: e.target.value })}
                placeholder="e.g., Health Insurance"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Value ($)
              </label>
              <input
                type="number"
                value={newBenefit.value}
                onChange={(e) => setNewBenefit({ ...newBenefit, value: e.target.value })}
                placeholder="e.g., 5000"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newBenefit.description}
                onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                placeholder="Brief description"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <button
            onClick={handleAddBenefit}
            className="mt-4 inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Benefit
          </button>
        </div>

        {/* Benefits List */}
        {benefits.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Current Benefits</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 bg-white border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{benefit.type}</h4>
                    <p className="text-sm text-gray-500">{benefit.description}</p>
                    <p className="text-sm font-medium text-primary-600">
                      ${benefit.value.toLocaleString()}/year
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveBenefit(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || benefits.length === 0}
          className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Analyze Benefits Package'}
        </button>

        {/* Analysis Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-6"
          >
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Benefits Analysis</h3>
              
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">Total Package Value</div>
                <div className="text-3xl font-bold text-primary-700">
                  ${analysis.monetaryValue.toLocaleString()}/year
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Breakdown</h4>
                  <div className="space-y-3">
                    {analysis.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{item.component}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                        <div className="text-primary-600 font-medium">
                          ${item.value.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
