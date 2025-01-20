'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Clock } from 'lucide-react';
import FileUpload from './components/FileUpload';
import AnalysisResult from './components/AnalysisResult';
import { analyzeResume, generateImprovementSuggestions, type ResumeAnalysisResult } from './utils/gemini';

export default function ResumeAnalysisPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [queuePosition, setQueuePosition] = useState<number>(0);

  const handleFileSelect = async (text: string) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      setQueuePosition(1); // Start at position 1
      
      // Analyze resume using Gemini
      const result = await analyzeResume(text);
      setQueuePosition(2); // Move to position 2 for suggestions
      
      // Get additional improvement suggestions
      const suggestions = await generateImprovementSuggestions(text);
      setQueuePosition(0); // Reset queue position
      
      // Combine the results
      setAnalysisResult({
        ...result,
        improvements: [...result.improvements, ...suggestions]
      });
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err?.message || 'Failed to analyze resume. Please try again.');
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
      setQueuePosition(0);
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
            <h1 className="text-3xl font-bold mb-4">Resume Analysis</h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Get detailed feedback on your resume using our advanced AI analysis. 
              Upload your resume to receive insights on content, structure, and areas for improvement.
            </p>
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-neutral-600 mb-2">
                {queuePosition === 1 ? 'Analyzing your resume...' : 'Generating improvement suggestions...'}
              </p>
              <div className="flex items-center justify-center text-sm text-neutral-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>Your request is being processed. This may take a minute...</span>
              </div>
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
                <h3 className="text-lg font-semibold text-red-700">Analysis Error</h3>
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-sm text-red-500">
                Please wait a moment before trying again. Our system processes requests in order to ensure the best results.
              </p>
            </motion.div>
          )}

          {/* Analysis Results */}
          {analysisResult && !isAnalyzing && (
            <AnalysisResult result={analysisResult} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
