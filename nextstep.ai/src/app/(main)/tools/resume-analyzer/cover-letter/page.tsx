'use client';

import { motion } from 'framer-motion';
import { FileText, Target, Sparkles, Send } from 'lucide-react';

export default function CoverLetterGeneratorPage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <h1 className="text-3xl font-bold mb-6">Cover Letter Generator</h1>
          <p className="text-neutral-600 mb-8">
            Create personalized cover letters that perfectly match your experience and the job requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-neutral-50 rounded-lg p-6">
              <FileText className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Resume Import</h3>
              <p className="text-neutral-600">
                Import your resume to automatically extract key experiences and skills
              </p>
              <button className="mt-4 bg-white border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                Import Resume
              </button>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6">
              <Target className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Job Description</h3>
              <p className="text-neutral-600">
                Paste the job description to tailor your cover letter
              </p>
              <button className="mt-4 bg-white border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                Add Job Details
              </button>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-neutral-50 rounded-lg p-6">
              <Sparkles className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI Customization</h3>
              <p className="text-neutral-600">
                Our AI will generate a customized cover letter highlighting your relevant experiences and skills
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="formal" className="rounded text-primary-600" />
                  <label htmlFor="formal">Formal Tone</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="creative" className="rounded text-primary-600" />
                  <label htmlFor="creative">Creative Style</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="achievements" className="rounded text-primary-600" />
                  <label htmlFor="achievements">Emphasize Achievements</label>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6">
              <Send className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Export Options</h3>
              <p className="text-neutral-600">
                Export your cover letter in multiple formats
              </p>
              <div className="mt-4 flex space-x-4">
                <button className="bg-white border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                  Download as PDF
                </button>
                <button className="bg-white border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                  Download as DOCX
                </button>
              </div>
            </div>
          </div>

          <button className="w-full bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Generate Cover Letter
          </button>
        </motion.div>
      </div>
    </div>
  );
}
