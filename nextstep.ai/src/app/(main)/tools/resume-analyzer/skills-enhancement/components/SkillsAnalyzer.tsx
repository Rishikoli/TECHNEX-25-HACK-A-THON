'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2, Upload, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkillsAnalysis {
  currentSkills: string[];
  recommendations: {
    skill: string;
    reason: string;
    resources: { name: string; url: string }[];
  }[];
  marketTrends: {
    trend: string;
    relevance: string;
  }[];
}

const MOCK_ANALYSIS: SkillsAnalysis = {
  currentSkills: [
    "JavaScript",
    "React",
    "Node.js",
    "HTML/CSS",
    "Git",
    "REST APIs"
  ],
  recommendations: [
    {
      skill: "TypeScript",
      reason: "Adding TypeScript to your JavaScript skills will improve code quality and maintainability. Many companies now prefer TypeScript for large-scale applications.",
      resources: [
        {
          name: "TypeScript Official Documentation",
          url: "https://www.typescriptlang.org/docs/"
        },
        {
          name: "TypeScript Course on Udemy",
          url: "https://www.udemy.com/course/understanding-typescript/"
        }
      ]
    },
    {
      skill: "Next.js",
      reason: "As a React developer, learning Next.js will enable you to build production-ready React applications with server-side rendering and static site generation.",
      resources: [
        {
          name: "Next.js Documentation",
          url: "https://nextjs.org/docs"
        },
        {
          name: "Next.js Tutorial on YouTube",
          url: "https://www.youtube.com/watch?v=mTz0GXj8NN0"
        }
      ]
    }
  ],
  marketTrends: [
    {
      trend: "Full-Stack Development",
      relevance: "Your current skills in both frontend (React) and backend (Node.js) position you well for full-stack roles, which are in high demand."
    },
    {
      trend: "Cloud Technologies",
      relevance: "Consider adding cloud platform knowledge (AWS/Azure/GCP) to complement your existing development skills."
    }
  ]
};

export function SkillsAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SkillsAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const analyzeSkills = async () => {
    if (!file) {
      setError('Please upload a resume file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `
        Analyze this resume content and provide a detailed skills analysis:
        "${text}"

        Provide the analysis in the following JSON format:
        {
          "currentSkills": ["list of current skills found in resume"],
          "recommendations": [
            {
              "skill": "recommended skill name",
              "reason": "why this skill would be valuable",
              "resources": [
                {
                  "name": "resource name",
                  "url": "learning resource URL"
                }
              ]
            }
          ],
          "marketTrends": [
            {
              "trend": "relevant market trend",
              "relevance": "how it relates to the candidate's profile"
            }
          ]
        }
      `;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysisResult = JSON.parse(response.text());
        setAnalysis(analysisResult);
      } catch (apiError: any) {
        console.error('API Error:', apiError);
        
        if (apiError.message?.includes('429') || apiError.message?.includes('quota')) {
          // If we hit API limits, use mock data
          setAnalysis(MOCK_ANALYSIS);
          setError('Note: Using sample analysis data due to API limitations. The actual analysis will be available soon.');
        } else {
          throw apiError; // Re-throw other errors
        }
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(
        'Error analyzing resume. Please try again later. ' +
        'If the error persists, contact support.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* File Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <span className="text-lg font-medium text-gray-700">
            {file ? file.name : 'Upload your resume'}
          </span>
          <span className="text-sm text-gray-500 mt-1">
            PDF, DOC, or DOCX (max 5MB)
          </span>
        </label>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center"
        >
          <XCircle className="w-5 h-5 mr-2" />
          {error}
        </motion.div>
      )}

      <Button
        onClick={analyzeSkills}
        disabled={!file || loading}
        className="w-full py-6 text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Analyzing Skills...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Analyze Skills
          </>
        )}
      </Button>

      {/* Analysis Results */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Current Skills */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Current Skills</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.currentSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Skill Recommendations</h3>
            <div className="space-y-6">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <h4 className="font-medium text-lg text-blue-600 mb-2">
                    {rec.skill}
                  </h4>
                  <p className="text-gray-600 mb-3">{rec.reason}</p>
                  <div className="space-y-2">
                    <h5 className="font-medium">Learning Resources:</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {rec.resources.map((resource, idx) => (
                        <li key={idx}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {resource.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Relevant Market Trends</h3>
            <div className="space-y-4">
              {analysis.marketTrends.map((trend, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-lg mb-2">{trend.trend}</h4>
                  <p className="text-gray-600">{trend.relevance}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
