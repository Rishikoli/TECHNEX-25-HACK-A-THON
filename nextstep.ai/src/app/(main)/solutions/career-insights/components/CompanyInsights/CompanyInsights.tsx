'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Star, Heart, Book, Users, DollarSign } from 'lucide-react';
import { generateCompanyInsight } from '../../utils/gemini';
import type { CompanyInsight } from '../../utils/gemini';

export const CompanyInsights = () => {
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<CompanyInsight | null>(null);

  const handleAnalyze = async () => {
    if (!companyName || !location) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await generateCompanyInsight(
        companyName,
        location
      );
      setInsight(result);
    } catch (error) {
      console.error('Error generating company insight:', error);
      alert('Error generating insight. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'average':
        return 'text-yellow-600 bg-yellow-100';
      case 'below average':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStarRating = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Company Insights</h2>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g., Google"
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
              placeholder="e.g., Mountain View, CA"
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
        {loading ? 'Analyzing Company...' : 'Analyze Company'}
      </button>

      {insight && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-6"
        >
          <div className="bg-primary-50 p-6 rounded-lg">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-primary-500" />
                  Company Overview
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-600">Industry</p>
                    <p className="font-medium text-gray-900">{insight.overview.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company Size</p>
                    <p className="font-medium text-gray-900">{insight.overview.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Founded</p>
                    <p className="font-medium text-gray-900">{insight.overview.founded}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Headquarters</p>
                    <p className="font-medium text-gray-900">{insight.overview.headquarters}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-primary-500" />
                  Company Culture
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Work-Life Balance</h4>
                    <p className="text-sm text-gray-600">{insight.culture.workLifeBalance}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Career Growth</h4>
                    <p className="text-sm text-gray-600">{insight.culture.careerGrowth}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Learning Opportunities</h4>
                    <p className="text-sm text-gray-600">{insight.culture.learningOpportunities}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Diversity & Inclusion</h4>
                    <p className="text-sm text-gray-600">{insight.culture.diversityInclusion}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-primary-500" />
                  Benefits & Perks
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {insight.benefits.map((benefit, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{benefit.category}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRatingColor(benefit.rating)}`}>
                          {benefit.rating.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-500" />
                  Employee Reviews
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {insight.reviews.map((review, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-900">{review.position}</h4>
                        <div className="flex">
                          {getStarRating(review.rating)}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-green-600 mb-1">Pros</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {review.pros.map((pro, idx) => (
                              <li key={idx}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-red-600 mb-1">Cons</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {review.cons.map((con, idx) => (
                              <li key={idx}>{con}</li>
                            ))}
                          </ul>
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
