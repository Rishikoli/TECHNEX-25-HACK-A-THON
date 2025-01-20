'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BookOpen, TrendingUp } from 'lucide-react';
import { CareerAssessment } from './components/CareerAssessment/CareerAssessment';
import { LearningPath } from './components/LearningPath/LearningPath';
import { IndustryInsights } from './components/IndustryInsights/IndustryInsights';

export default function AICareerCoach() {
  const [activeTab, setActiveTab] = useState('assessment');

  const features = [
    {
      id: 'assessment',
      title: 'Career Assessment',
      icon: Briefcase,
      description: 'Get a personalized career assessment based on your profile'
    },
    {
      id: 'learning',
      title: 'Learning Path',
      icon: BookOpen,
      description: 'Generate a customized learning roadmap'
    },
    {
      id: 'insights',
      title: 'Industry Insights',
      icon: TrendingUp,
      description: 'Explore industry trends and opportunities'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Career Coach</h1>
        <p className="text-xl text-gray-600">
          Your AI-powered career guidance companion for personalized career development
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveTab(feature.id)}
            className={`p-6 rounded-xl transition-all ${
              activeTab === feature.id
                ? 'bg-primary-500 text-white shadow-lg scale-[1.02]'
                : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-[1.01]'
            }`}
          >
            <feature.icon className="w-8 h-8 mb-3 mx-auto" />
            <div className="font-medium text-lg mb-2">{feature.title}</div>
            <p className={`text-sm ${
              activeTab === feature.id ? 'text-primary-100' : 'text-gray-500'
            }`}>
              {feature.description}
            </p>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'assessment' && <CareerAssessment />}
        {activeTab === 'learning' && <LearningPath />}
        {activeTab === 'insights' && <IndustryInsights />}
      </motion.div>
    </div>
  );
};
