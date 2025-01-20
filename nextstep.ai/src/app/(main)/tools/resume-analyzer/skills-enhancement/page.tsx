'use client';

import { motion } from 'framer-motion';
import { Sparkles, Book, ArrowLeft } from 'lucide-react';
import { SkillsAnalyzer } from './components/SkillsAnalyzer';
import Link from 'next/link';

export default function SkillsEnhancementPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/tools/resume-analyzer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resume Tools
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Skills Enhancement
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized recommendations to improve your skills and make your professional profile stronger.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <Sparkles className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Skills Assessment</h3>
            <p className="text-gray-600">
              Our AI analyzes your current skills and suggests improvements based on industry standards and market demands.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <Book className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Learning Recommendations</h3>
            <p className="text-gray-600">
              Get personalized recommendations for courses, certifications, and resources to enhance your skill set.
            </p>
          </motion.div>
        </div>

        {/* Skills Analyzer Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <SkillsAnalyzer />
        </motion.div>
      </div>
    </div>
  );
}
