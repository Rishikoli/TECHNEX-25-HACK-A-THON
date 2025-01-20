'use client';

import { motion } from 'framer-motion';
import { Target, Check } from 'lucide-react';

export default function ATSOptimizationPage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <h1 className="text-3xl font-bold mb-6">ATS Optimization</h1>
          <p className="text-neutral-600 mb-8">
            Optimize your resume for Applicant Tracking Systems and increase your chances of getting noticed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-50 rounded-lg p-6">
              <Target className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Keyword Analysis</h3>
              <p className="text-neutral-600">
                Upload your resume and target job description to get keyword optimization suggestions.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6">
              <Check className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Format Check</h3>
              <p className="text-neutral-600">
                Ensure your resume format is ATS-friendly with our automated checks.
              </p>
            </div>
          </div>

          <button className="mt-8 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Start Optimization
          </button>
        </motion.div>
      </div>
    </div>
  );
}
