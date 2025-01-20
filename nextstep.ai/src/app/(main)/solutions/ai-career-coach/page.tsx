'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BookOpen, TrendingUp, LineChart, Map, ChevronRight } from 'lucide-react';

interface CareerPathStep {
  title: string;
  skills: string[];
  timeframe: string;
  resources: string[];
}

interface CareerInsight {
  trend: string;
  impact: string;
  recommendation: string;
}

export default function AICareerCoach() {
  const [activeTab, setActiveTab] = useState('guidance');
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [careerGoal, setCareerGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [careerPath, setCareerPath] = useState<CareerPathStep[]>([]);
  const [insights, setInsights] = useState<CareerInsight[]>([]);

  const features = [
    {
      id: 'guidance',
      title: 'Career Guidance',
      icon: Briefcase,
      description: 'Get personalized career advice based on your goals'
    },
    {
      id: 'learning',
      title: 'Learning Path',
      icon: BookOpen,
      description: 'Custom learning roadmap for your career goals'
    },
    {
      id: 'skills',
      title: 'Skill Analysis',
      icon: LineChart,
      description: 'Identify and bridge skill gaps'
    },
    {
      id: 'trends',
      title: 'Industry Insights',
      icon: TrendingUp,
      description: 'Stay updated with industry trends'
    },
    {
      id: 'transition',
      title: 'Career Transition',
      icon: Map,
      description: 'Plan your career transition effectively'
    }
  ];

  const handleSkillAdd = (skill: string) => {
    if (skill && !userSkills.includes(skill)) {
      setUserSkills([...userSkills, skill]);
    }
  };

  const handleSkillRemove = (skill: string) => {
    setUserSkills(userSkills.filter(s => s !== skill));
  };

  const generateCareerPath = async () => {
    setLoading(true);
    // Here you would integrate with an AI API to generate the career path
    // For now, using mock data
    const mockPath: CareerPathStep[] = [
      {
        title: 'Foundation Building',
        skills: ['JavaScript', 'React', 'Node.js'],
        timeframe: '3-6 months',
        resources: ['Udemy Web Dev Course', 'FreeCodeCamp']
      },
      {
        title: 'Advanced Development',
        skills: ['TypeScript', 'Next.js', 'AWS'],
        timeframe: '6-12 months',
        resources: ['TypeScript Documentation', 'AWS Certification']
      }
    ];
    setCareerPath(mockPath);
    setLoading(false);
  };

  const analyzeIndustryTrends = async () => {
    setLoading(true);
    // Here you would integrate with an API to get real industry trends
    // For now, using mock data
    const mockInsights: CareerInsight[] = [
      {
        trend: 'AI and Machine Learning',
        impact: 'High demand for AI engineers and data scientists',
        recommendation: 'Focus on Python and ML frameworks'
      },
      {
        trend: 'Cloud Computing',
        impact: 'Growing need for cloud architects',
        recommendation: 'Get certified in major cloud platforms'
      }
    ];
    setInsights(mockInsights);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Career Coach</h1>
        <p className="text-xl text-gray-600">Your personal AI-powered career guidance system</p>
      </div>

      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveTab(feature.id)}
            className={`p-4 rounded-lg transition-all ${
              activeTab === feature.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <feature.icon className="w-6 h-6 mb-2 mx-auto" />
            <div className="font-medium">{feature.title}</div>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        {activeTab === 'guidance' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Career Guidance</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {userSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                      <button
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a skill"
                  className="w-full px-4 py-2 border rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSkillAdd((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Career Goal
                </label>
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <button
              onClick={generateCareerPath}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Career Path
            </button>
          </div>
        )}

        {activeTab === 'learning' && careerPath.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Learning Path</h2>
            <div className="space-y-8">
              {careerPath.map((step, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-2">Timeframe: {step.timeframe}</p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Skills to Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recommended Resources:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {step.resources.map((resource) => (
                        <li key={resource}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Industry Trends</h2>
            <button
              onClick={analyzeIndustryTrends}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Analyze Trends
            </button>
            {insights.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                {insights.map((insight, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">{insight.trend}</h3>
                    <p className="text-gray-600 mb-4">{insight.impact}</p>
                    <p className="text-sm font-medium text-blue-600">
                      Recommendation: {insight.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
