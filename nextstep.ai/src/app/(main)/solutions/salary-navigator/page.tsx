'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Package, MessageSquare } from 'lucide-react';
import { SalaryCalculator } from './components/SalaryCalculator/SalaryCalculator';
import { BenefitsAnalyzer } from './components/BenefitsAnalyzer/BenefitsAnalyzer';
import { NegotiationGuide } from './components/NegotiationGuide/NegotiationGuide';

export default function SalaryNavigatorPage() {
  const [activeTab, setActiveTab] = useState('calculator');

  const tabs = [
    {
      id: 'calculator',
      title: 'Salary Calculator',
      icon: Calculator,
      description: 'Get accurate salary ranges based on your role and experience'
    },
    {
      id: 'benefits',
      title: 'Benefits Analyzer',
      icon: Package,
      description: 'Analyze and optimize your total compensation package'
    },
    {
      id: 'negotiation',
      title: 'Negotiation Guide',
      icon: MessageSquare,
      description: 'Get personalized negotiation strategies and scripts'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Salary Navigator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-8"
            >
              Make informed decisions about your compensation with AI-powered insights
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-white shadow-lg border-2 border-primary-500'
                    : 'bg-white shadow hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <tab.icon className={`w-6 h-6 ${
                    activeTab === tab.id ? 'text-primary-500' : 'text-gray-400'
                  }`} />
                  <div className="text-left">
                    <h3 className={`font-semibold ${
                      activeTab === tab.id ? 'text-primary-600' : 'text-gray-900'
                    }`}>
                      {tab.title}
                    </h3>
                    <p className="text-sm text-gray-500">{tab.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Component */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'calculator' && <SalaryCalculator />}
            {activeTab === 'benefits' && <BenefitsAnalyzer />}
            {activeTab === 'negotiation' && <NegotiationGuide />}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
