'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ThumbsUp, MessageSquare, Lightbulb, RefreshCw } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AnswerImprovementProps {
  currentQuestion: string;
  currentAnswer: string;
}

export function AnswerImprovement({ currentQuestion, currentAnswer }: AnswerImprovementProps) {
  const [improvedAnswer, setImprovedAnswer] = useState<string | null>(null);
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'improved' | 'points'>('improved');

  const generateImprovedAnswer = async () => {
    if (!currentQuestion || !currentAnswer) return;

    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Generate improved answer
      const improvedPrompt = `As an expert interviewer, help improve this interview answer.

Question: "${currentQuestion}"
Original Answer: "${currentAnswer}"

Provide an improved version that:
1. Is more structured and concise
2. Includes relevant examples
3. Demonstrates technical expertise
4. Shows problem-solving ability
5. Maintains professionalism

Respond with ONLY the improved answer, no additional text.`;

      const improvedResult = await model.generateContent(improvedPrompt);
      const improvedText = improvedResult.response.text();
      setImprovedAnswer(improvedText);

      // Generate key points
      const pointsPrompt = `Analyze this interview answer and provide key points for improvement.

Question: "${currentQuestion}"
Answer: "${currentAnswer}"

List 5 specific, actionable points that would make this answer stronger. Format as a JSON array of strings.
Example: ["Add specific metrics", "Include a recent example", ...]`;

      const pointsResult = await model.generateContent(pointsPrompt);
      const pointsText = pointsResult.response.text();
      try {
        const points = JSON.parse(pointsText);
        setKeyPoints(Array.isArray(points) ? points : []);
      } catch {
        // If parsing fails, extract points from text
        const extractedPoints = pointsText
          .split(/\d+\.|\n/)
          .map(point => point.trim())
          .filter(point => point.length > 0);
        setKeyPoints(extractedPoints);
      }
    } catch (error) {
      console.error('Error generating improvements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-emerald-500" />
          Answer Improvement
        </h3>
        <button
          onClick={generateImprovedAnswer}
          disabled={isLoading || !currentAnswer}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            isLoading || !currentAnswer
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 mr-2" />
              Improve Answer
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('improved')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'improved'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Improved Version
        </button>
        <button
          onClick={() => setActiveTab('points')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'points'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          Key Points
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-lg p-4">
        {!currentAnswer ? (
          <p className="text-gray-500 text-center">
            Complete your answer to see improvements
          </p>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
          </div>
        ) : activeTab === 'improved' ? (
          improvedAnswer ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose prose-emerald max-w-none"
            >
              <p className="text-gray-700 whitespace-pre-wrap">{improvedAnswer}</p>
            </motion.div>
          ) : (
            <p className="text-gray-500 text-center">
              Click "Improve Answer" to see an enhanced version
            </p>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            {keyPoints.length > 0 ? (
              keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{point}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                Click "Improve Answer" to see key improvement points
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
