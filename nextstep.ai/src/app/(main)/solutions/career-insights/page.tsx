'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Building2, Star } from 'lucide-react';
import { JobMarketAnalysis } from './components/JobMarketAnalysis/JobMarketAnalysis';
import { SkillDemandAnalysis } from './components/SkillDemandAnalysis/SkillDemandAnalysis';
import { CompanyInsights } from './components/CompanyInsights/CompanyInsights';
import FloatingBoxesAnimation from '@/components/FloatingBoxesAnimation';

export default function CareerInsightsPage() {
  const [activeTab, setActiveTab] = useState('market');
  const [showContent, setShowContent] = useState(false);

  const features = [
    {
      id: 'market',
      title: 'Job Market Analysis',
      icon: LineChart,
      description: 'Analyze job market trends, demand, and opportunities'
    },
    {
      id: 'skills',
      title: 'Skill Demand Analysis',
      icon: Star,
      description: 'Track in-demand skills and identify growth opportunities'
    },
    {
      id: 'company',
      title: 'Company Insights',
      icon: Building2,
      description: 'Get detailed insights into companies and their culture'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <FloatingBoxesAnimation />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Career Insights
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-8"
            >
              Make data-driven career decisions with AI-powered insights and analytics
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => setShowContent(true)}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Explore Insights
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {showContent && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 bg-gray-50"
        >
          <div className="container mx-auto px-4">
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
              {activeTab === 'market' && <JobMarketAnalysis />}
              {activeTab === 'skills' && <SkillDemandAnalysis />}
              {activeTab === 'company' && <CompanyInsights />}
            </motion.div>
          </div>
        </motion.section>
      )}
    </div>
  );
};
