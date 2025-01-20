'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Package, MessageSquare, Scale, Calculator, ChevronRight, Briefcase, MapPin } from 'lucide-react';

interface SalaryData {
  min: number;
  max: number;
  median: number;
  marketTrend: 'up' | 'down' | 'stable';
  percentile: {
    p25: number;
    p50: number;
    p75: number;
  };
}

interface BenefitsPackage {
  type: string;
  value: number;
  description: string;
}

export default function SalaryNavigator() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [currentSalary, setCurrentSalary] = useState('');
  const [offeredSalary, setOfferedSalary] = useState('');
  const [benefits, setBenefits] = useState<BenefitsPackage[]>([]);

  const features = [
    {
      id: 'calculator',
      title: 'Salary Calculator',
      icon: Calculator,
      description: 'Calculate market-competitive salary ranges'
    },
    {
      id: 'benefits',
      title: 'Benefits Analyzer',
      icon: Package,
      description: 'Analyze complete benefits package'
    },
    {
      id: 'negotiation',
      title: 'Negotiation Scripts',
      icon: MessageSquare,
      description: 'Get negotiation talking points'
    },
    {
      id: 'counter-offer',
      title: 'Counter Offer',
      icon: Scale,
      description: 'Evaluate and create counter offers'
    }
  ];

  const calculateSalary = async () => {
    setLoading(true);
    // Here you would integrate with a salary data API
    // For now, using mock data
    const mockSalaryData: SalaryData = {
      min: 80000,
      max: 150000,
      median: 115000,
      marketTrend: 'up',
      percentile: {
        p25: 95000,
        p50: 115000,
        p75: 135000
      }
    };
    setSalaryData(mockSalaryData);
    setLoading(false);
  };

  const analyzeBenefits = async () => {
    setLoading(true);
    // Here you would integrate with a benefits analysis API
    // For now, using mock data
    const mockBenefits: BenefitsPackage[] = [
      {
        type: 'Health Insurance',
        value: 12000,
        description: 'Comprehensive health, dental, and vision coverage'
      },
      {
        type: '401(k) Match',
        value: 6000,
        description: '100% match up to 6% of salary'
      },
      {
        type: 'Stock Options',
        value: 15000,
        description: 'Annual stock grant vesting over 4 years'
      }
    ];
    setBenefits(mockBenefits);
    setLoading(false);
  };

  const generateNegotiationScript = () => {
    if (!salaryData) return '';
    
    return `
Thank you for the offer. I'm excited about the opportunity to join the team.

Based on my research and experience:
- The market range for this role is $${salaryData.min.toLocaleString()} to $${salaryData.max.toLocaleString()}
- My experience in [specific skills] brings additional value
- I've successfully [mention achievements] in my current role

Would you be open to discussing a salary of $${salaryData.p75.toLocaleString()}?
    `.trim();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Salary Navigator</h1>
        <p className="text-xl text-gray-600">Make informed decisions about your compensation</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveTab(feature.id)}
            className={`p-4 rounded-lg transition-all ${
              activeTab === feature.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <feature.icon className="w-6 h-6 mb-2 mx-auto" />
            <div className="font-medium">{feature.title}</div>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Salary Calculator</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Software Engineer"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
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
                    placeholder="e.g., San Francisco, CA"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g., 5"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <button
              onClick={calculateSalary}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calculate Salary Range
            </button>

            {salaryData && (
              <div className="mt-8 space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Salary Range</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Minimum</div>
                      <div className="text-xl font-semibold text-blue-700">
                        ${salaryData.min.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Median</div>
                      <div className="text-xl font-semibold text-blue-700">
                        ${salaryData.median.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Maximum</div>
                      <div className="text-xl font-semibold text-blue-700">
                        ${salaryData.max.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Benefits Analyzer</h2>
            <button
              onClick={analyzeBenefits}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Analyze Benefits Package
            </button>

            {benefits.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">{benefit.type}</h3>
                    <p className="text-gray-600 mb-2">{benefit.description}</p>
                    <p className="text-xl font-semibold text-blue-600">
                      ${benefit.value.toLocaleString()}/year
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'negotiation' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Negotiation Script Generator</h2>
            {salaryData ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {generateNegotiationScript()}
                </pre>
              </div>
            ) : (
              <p className="text-gray-600">
                Please use the Salary Calculator first to generate a negotiation script.
              </p>
            )}
          </div>
        )}

        {activeTab === 'counter-offer' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Counter Offer Evaluator</h2>
            <div className="grid gap-6 md:grid-cols-2">
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
                    placeholder="e.g., 100000"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
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
                    placeholder="e.g., 120000"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
            {currentSalary && offeredSalary && (
              <div className="bg-gray-50 p-6 rounded-lg mt-6">
                <h3 className="text-lg font-semibold mb-4">Analysis</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    The offered salary is a{' '}
                    <span className="font-semibold text-blue-600">
                      {(((Number(offeredSalary) - Number(currentSalary)) / Number(currentSalary)) * 100).toFixed(1)}%
                    </span>{' '}
                    increase from your current salary.
                  </p>
                  {salaryData && (
                    <p className="text-gray-600">
                      This offer is in the{' '}
                      <span className="font-semibold text-blue-600">
                        {Number(offeredSalary) < salaryData.p25
                          ? 'bottom'
                          : Number(offeredSalary) < salaryData.p50
                          ? 'lower middle'
                          : Number(offeredSalary) < salaryData.p75
                          ? 'upper middle'
                          : 'top'}{' '}
                      </span>
                      range for your role and location.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
