'use client';

import { motion } from 'framer-motion';
import { Sparkles, Book } from 'lucide-react';

export default function SkillsEnhancementPage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <h1 className="text-3xl font-bold mb-6">Skills Enhancement</h1>
          <p className="text-neutral-600 mb-8">
            Get personalized recommendations to improve your skills presentation and make your professional profile stronger.
          </p>

          <div className="space-y-6">
            <div className="bg-neutral-50 rounded-lg p-6">
              <Sparkles className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Skills Assessment</h3>
              <p className="text-neutral-600">
                Our AI will analyze your current skills and suggest improvements based on industry standards.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6">
              <Book className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Learning Recommendations</h3>
              <p className="text-neutral-600">
                Get personalized recommendations for courses and certifications to enhance your skill set.
              </p>
            </div>
          </div>

          <button className="mt-8 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Start Skills Analysis
          </button>
        </motion.div>
      </div>
    </div>
  );
}
