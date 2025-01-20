'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Star, FileText, Award } from 'lucide-react';
import type { ResumeAnalysisResult } from '../utils/gemini';

interface AnalysisResultProps {
  result: ResumeAnalysisResult;
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Overall Score */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Overall Score</h3>
          <div className="text-3xl font-bold text-primary-600">
            {result.overallScore}/100
          </div>
        </div>
        <p className="text-neutral-600">{result.summary}</p>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-semibold">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((strength, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                <span className="text-neutral-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <XCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-semibold">Areas for Improvement</h3>
          </div>
          <ul className="space-y-2">
            {result.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Award className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-neutral-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Skills Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2 text-neutral-900">Technical Skills</h4>
            <ul className="space-y-1">
              {result.skillsAnalysis.technical.map((skill, index) => (
                <li key={index} className="text-neutral-700">{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-neutral-900">Soft Skills</h4>
            <ul className="space-y-1">
              {result.skillsAnalysis.soft.map((skill, index) => (
                <li key={index} className="text-neutral-700">{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-neutral-900">Recommended Skills</h4>
            <ul className="space-y-1">
              {result.skillsAnalysis.missing.map((skill, index) => (
                <li key={index} className="text-neutral-700">{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Format Analysis */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold">Format Analysis</h3>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2 text-neutral-900">Structure</h4>
            <p className="text-neutral-700">{result.formatAnalysis.structure}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-neutral-900">Clarity</h4>
            <p className="text-neutral-700">{result.formatAnalysis.clarity}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-neutral-900">Suggestions</h4>
            <ul className="space-y-1">
              {result.formatAnalysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-neutral-700">• {suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
