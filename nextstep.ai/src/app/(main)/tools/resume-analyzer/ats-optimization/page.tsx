'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FileUpload from '../analysis/components/FileUpload';
import JobDescription from './components/JobDescription';

// Safe base64 encoding for Unicode strings
function safeEncode(str: string): string {
  return encodeURIComponent(str).replace(/%/g, '_');
}

export default function ATSOptimizationPage() {
  const router = useRouter();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState<string | null>(null);

  const handleFileSelect = async (text: string) => {
    try {
      setIsOptimizing(true);
      setError(null);
      
      // Encode resume and job description for URL
      const encodedResume = safeEncode(text);
      const encodedJob = jobDescription ? safeEncode(jobDescription) : null;
      
      // Redirect to results page
      const queryParams = new URLSearchParams({
        resume: encodedResume,
        ...(encodedJob && { job: encodedJob })
      });
      
      router.push(`/tools/resume-analyzer/ats-optimization/result?${queryParams.toString()}`);
    } catch (err: any) {
      console.error('Optimization error:', err);
      setError(err?.message || 'Failed to process resume. Please try again.');
      setIsOptimizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">ATS Resume Optimization</h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Optimize your resume for Applicant Tracking Systems (ATS). Our AI will enhance your resume's
              compatibility with ATS software and improve your chances of getting past automated screenings.
            </p>
          </div>

          {/* Job Description Input */}
          <JobDescription onJobDescriptionChange={setJobDescription} />

          {/* File Upload */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          {/* Loading State */}
          {isOptimizing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-neutral-600 mb-2">Processing your resume...</p>
              <p className="text-sm text-neutral-500">
                Please wait while we prepare your optimization results.
              </p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-100 rounded-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-red-700">Error</h3>
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-sm text-red-500">
                Please try again. If the problem persists, try uploading a different file format.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
