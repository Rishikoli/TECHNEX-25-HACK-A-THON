'use client';

import { motion } from 'framer-motion';
import { Download, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import type { ATSOptimizationResult } from '../utils/gemini';

interface OptimizedResumeProps {
  result: ATSOptimizationResult;
}

export default function OptimizedResume({ result }: OptimizedResumeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.optimizedResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result.optimizedResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Optimized Resume</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-neutral-50 font-mono text-sm whitespace-pre-wrap">
        {result.optimizedResume}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Improvements */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Improvements Made</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-2">Keywords Added</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {result.improvements.keywords.map((keyword, i) => (
                  <li key={i} className="text-neutral-700">{keyword}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-2">Formatting Improvements</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {result.improvements.formatting.map((improvement, i) => (
                  <li key={i} className="text-neutral-700">{improvement}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-2">Content Enhancements</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {result.improvements.content.map((enhancement, i) => (
                  <li key={i} className="text-neutral-700">{enhancement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Compatibility Score */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">ATS Compatibility</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Compatibility Score</span>
                <span className="text-lg font-semibold text-primary-600">
                  {result.compatibility.score}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2.5">
                <div
                  className="bg-primary-600 h-2.5 rounded-full"
                  style={{ width: `${result.compatibility.score}%` }}
                />
              </div>
            </div>
            
            {result.jobMatch && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-600">Job Match Score</span>
                  <span className="text-lg font-semibold text-primary-600">
                    {result.jobMatch.score}%
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2.5">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full"
                    style={{ width: `${result.jobMatch.score}%` }}
                  />
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-2">Issues to Address</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {result.compatibility.issues.map((issue, i) => (
                  <li key={i} className="text-neutral-700">{issue}</li>
                ))}
              </ul>
            </div>

            {result.jobMatch && (
              <>
                <div>
                  <h4 className="text-sm font-medium text-neutral-600 mb-2">Matched Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.jobMatch.matchedKeywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-600 mb-2">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.jobMatch.missingKeywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
