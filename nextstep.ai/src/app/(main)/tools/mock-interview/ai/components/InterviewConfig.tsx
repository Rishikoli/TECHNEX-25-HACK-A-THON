'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Target,
  Settings,
  Lightbulb,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';

interface InterviewConfigProps {
  onComplete: (config: InterviewConfig) => void;
}

export interface InterviewConfig {
  duration: number;
  difficulty: string;
  focusAreas: string[];
  experienceLevel: string;
}

const durations = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '60 minutes' },
];

const difficulties = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

const focusAreas = [
  { value: 'technical', label: 'Technical Skills' },
  { value: 'system_design', label: 'System Design' },
  { value: 'problem_solving', label: 'Problem Solving' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'communication', label: 'Communication' },
];

const experienceLevels = [
  { value: 'junior', label: 'Junior (0-2 years)' },
  { value: 'mid', label: 'Mid-Level (3-5 years)' },
  { value: 'senior', label: 'Senior (5-8 years)' },
  { value: 'lead', label: 'Lead (8+ years)' },
];

export function InterviewConfig({ onComplete }: InterviewConfigProps) {
  const [config, setConfig] = useState<InterviewConfig>({
    duration: 30,
    difficulty: 'intermediate',
    focusAreas: [],
    experienceLevel: 'mid',
  });

  const handleComplete = () => {
    if (config.focusAreas.length > 0) {
      onComplete(config);
    }
  };

  return (
    <div className="space-y-8">
      {/* Duration Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-emerald-500" />
          Interview Duration
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {durations.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setConfig({ ...config, duration: value })}
              className={`p-3 rounded-lg border-2 transition-colors ${
                config.duration === value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-emerald-500" />
          Difficulty Level
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {difficulties.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setConfig({ ...config, difficulty: value })}
              className={`p-3 rounded-lg border-2 transition-colors ${
                config.difficulty === value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-emerald-500" />
          Experience Level
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {experienceLevels.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setConfig({ ...config, experienceLevel: value })}
              className={`p-3 rounded-lg border-2 transition-colors ${
                config.experienceLevel === value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Focus Areas */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-emerald-500" />
          Focus Areas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {focusAreas.map(({ value, label }) => (
            <button
              key={value}
              onClick={() =>
                setConfig({
                  ...config,
                  focusAreas: config.focusAreas.includes(value)
                    ? config.focusAreas.filter((area) => area !== value)
                    : [...config.focusAreas, value],
                })
              }
              className={`p-3 rounded-lg border-2 transition-colors ${
                config.focusAreas.includes(value)
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              <span className="flex items-center justify-between">
                {label}
                {config.focusAreas.includes(value) && (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="flex justify-end">
        <button
          onClick={handleComplete}
          disabled={config.focusAreas.length === 0}
          className={`px-6 py-2 rounded-lg transition-colors ${
            config.focusAreas.length > 0
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
