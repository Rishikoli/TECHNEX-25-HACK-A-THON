'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Download, Copy, ArrowLeft, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { optimizeResume, type ATSOptimizationResult } from '../utils/gemini';
import ResumeDisplay from '../components/ResumeDisplay';

// Safe decode function to match the encoding in page.tsx
function safeDecode(str: string): string {
  return decodeURIComponent(str.replace(/_/g, '%'));
}

export default function OptimizationResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ATSOptimizationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const resumeParam = searchParams.get('resume');
    const jobParam = searchParams.get('job');

    if (!resumeParam) {
      setError('No resume content found');
      setLoading(false);
      return;
    }

    const fetchOptimization = async () => {
      try {
        const resumeText = safeDecode(resumeParam);
        const jobDescription = jobParam ? safeDecode(jobParam) : undefined;

        const optimizationResult = await optimizeResume(resumeText, jobDescription);
        setResult(optimizationResult);
      } catch (err: any) {
        setError(err?.message || 'Failed to optimize resume');
      } finally {
        setLoading(false);
      }
    };

    fetchOptimization();
  }, [searchParams]);

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.optimizedResume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result.optimizedResume], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'optimized-resume.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-neutral-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Optimization</span>
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-4 py-2 text-sm bg-white border rounded-lg hover:bg-neutral-50 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Resume</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Optimized Resume */}
          <div className="lg:col-span-2">
            <ResumeDisplay content={result.optimizedResume} />
          </div>

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* ATS Score */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">ATS Compatibility</h3>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Score</span>
                  <span className="text-lg font-semibold text-primary-600">
                    {result.compatibility.score}%
                  </span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-500"
                    style={{ width: `${result.compatibility.score}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Job Match */}
            {result.jobMatch && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Job Match</h3>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Match Score</span>
                    <span className="text-lg font-semibold text-primary-600">
                      {result.jobMatch.score}%
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full transition-all duration-500"
                      style={{ width: `${result.jobMatch.score}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Keywords */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Keywords</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Added Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.improvements.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-sm bg-green-50 text-green-700 rounded-lg border border-green-100"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                {result.jobMatch && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.jobMatch.missingKeywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-sm bg-red-50 text-red-700 rounded-lg border border-red-100"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
              <div className="space-y-3">
                {result.compatibility.suggestions.map((suggestion, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2" />
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
