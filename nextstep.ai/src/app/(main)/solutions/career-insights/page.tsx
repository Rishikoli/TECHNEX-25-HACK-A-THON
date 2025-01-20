'use client';

import { motion as m } from 'framer-motion';
import { LineChart, TrendingUp, Target, Lightbulb } from 'lucide-react';
import FloatingBoxesAnimation from '@/components/FloatingBoxesAnimation';

export default function CareerInsightsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <FloatingBoxesAnimation />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Career Insights
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-8"
            >
              Make data-driven career decisions with AI-powered insights and analytics
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Explore Insights
              </button>
            </m.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Market Trends Analysis */}
            <div className="mb-16">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <LineChart className="w-8 h-8 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                    Market Trends Analysis
                  </h2>
                  <p className="text-lg text-neutral-600">
                    Stay ahead with real-time insights into industry trends and job market demands.
                  </p>
                </div>
              </div>
            </div>

            {/* Salary Intelligence */}
            <div className="mb-16">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                    Salary Intelligence
                  </h2>
                  <p className="text-lg text-neutral-600">
                    Make informed decisions with comprehensive salary data and benchmarks.
                  </p>
                </div>
              </div>
            </div>

            {/* Career Path Mapping */}
            <div className="mb-16">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <Target className="w-8 h-8 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                    Career Path Mapping
                  </h2>
                  <p className="text-lg text-neutral-600">
                    Visualize and plan your career progression with AI-powered recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Skill Gap Analysis */}
            <div className="mb-16">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <Lightbulb className="w-8 h-8 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                    Skill Gap Analysis
                  </h2>
                  <p className="text-lg text-neutral-600">
                    Identify and bridge skill gaps to stay competitive in your industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
