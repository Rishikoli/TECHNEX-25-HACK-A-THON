'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface JobDescriptionProps {
  onJobDescriptionChange: (text: string | null) => void;
}

export default function JobDescription({ onJobDescriptionChange }: JobDescriptionProps) {
  const [jobDescription, setJobDescription] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJobDescription(text);
    onJobDescriptionChange(text.trim() || null);
  };

  const handleClear = () => {
    setJobDescription('');
    onJobDescriptionChange(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Job Description (Optional)</h2>
        {jobDescription && (
          <button
            onClick={handleClear}
            className="flex items-center space-x-1 px-2 py-1 text-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-neutral-600">
          Paste the job description to optimize your resume specifically for this role.
        </p>
        <textarea
          value={jobDescription}
          onChange={handleChange}
          placeholder="Paste job description here..."
          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
        />
      </div>
    </motion.div>
  );
}
