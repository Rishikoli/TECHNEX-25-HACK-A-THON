'use client';

import { motion } from 'framer-motion';
import { FileText, CheckCircle, Zap, LineChart } from 'lucide-react';
import NeuralAnimation from '@/components/NeuralAnimation';

export default function ResumeAnalyzerPage() {
  const features = [
    {
      icon: FileText,
      title: "Smart Resume Analysis",
      description: "Our Gemini AI analyzes your resume's content, structure, and formatting to provide comprehensive feedback."
    },
    {
      icon: CheckCircle,
      title: "Keyword Optimization",
      description: "Identify and optimize for industry-specific keywords that match your target job descriptions."
    },
    {
      icon: Zap,
      title: "Real-time Suggestions",
      description: "Get instant feedback on improvements as you make changes to your resume."
    },
    {
      icon: LineChart,
      title: "Performance Metrics",
      description: "Track your resume's improvement over time with detailed analytics and scoring."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-500 to-primary-600 text-white py-20 overflow-hidden">
        <NeuralAnimation />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI-Powered Resume Analysis
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Transform your resume with advanced AI analysis and get personalized recommendations to stand out from the competition.
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Analyze Your Resume
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary-50">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Upload Your Resume",
                  description: "Upload your existing resume in any common format (PDF, DOCX, etc.)."
                },
                {
                  step: "2",
                  title: "AI Analysis",
                  description: "Our Gemini AI analyzes your resume's content, structure, and formatting."
                },
                {
                  step: "3",
                  title: "Get Recommendations",
                  description: "Receive detailed feedback and suggestions for improvement."
                },
                {
                  step: "4",
                  title: "Make Improvements",
                  description: "Apply the suggestions and track your resume's improvement score."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their resumes and landed their dream jobs with NextStep.AI
          </p>
          <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
