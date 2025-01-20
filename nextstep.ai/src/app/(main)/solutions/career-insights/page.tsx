'use client';

import { motion } from 'framer-motion';
import { LineChart, TrendingUp, Target, BookOpen } from 'lucide-react';

export default function CareerInsightsPage() {
  const features = [
    {
      icon: LineChart,
      title: "Market Analysis",
      description: "Get real-time insights into job market trends and salary data for your industry."
    },
    {
      icon: TrendingUp,
      title: "Skill Gap Analysis",
      description: "Identify key skills needed for your target role and get personalized learning recommendations."
    },
    {
      icon: Target,
      title: "Career Path Planning",
      description: "Map out your career progression with AI-powered recommendations and milestones."
    },
    {
      icon: BookOpen,
      title: "Industry Reports",
      description: "Access detailed reports on industry trends, emerging roles, and required qualifications."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Career Insights & Analytics
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Make data-driven career decisions with AI-powered market analysis and personalized recommendations.
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Explore Insights
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary-50">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Market Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                stat: "85%",
                label: "of jobs in 2025 haven't been invented yet",
                description: "Stay ahead with our future-focused insights"
              },
              {
                stat: "3x",
                label: "faster skill evolution in tech sectors",
                description: "Keep your skills current with our recommendations"
              },
              {
                stat: "60%",
                label: "higher salary with right skill combinations",
                description: "Optimize your skill portfolio for maximum value"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-500 mb-2">
                  {item.stat}
                </div>
                <div className="font-semibold text-neutral-900 mb-2">
                  {item.label}
                </div>
                <div className="text-neutral-600">
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Make Data-Driven Career Decisions
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Get access to real-time market insights and personalized career recommendations.
          </p>
          <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
