'use client';

import { motion } from 'framer-motion';
import { FileText, CheckCircle, LineChart } from 'lucide-react';
import NeuralAnimation from '@/components/NeuralAnimation';
import Link from 'next/link';

export default function ResumeAnalyzerPage() {
  const features = [
    {
      icon: FileText,
      title: "Resume Analysis",
      description: "Get comprehensive feedback on your resume's content, structure, and formatting with Gemini AI.",
      path: "/tools/resume-analyzer/analysis"
    },
    {
      icon: CheckCircle,
      title: "ATS Optimization",
      description: "Optimize your resume for Applicant Tracking Systems with keyword suggestions and formatting tips.",
      path: "/tools/resume-analyzer/ats-optimization"
    },
    {
      icon: LineChart,
      title: "Cover Letter Generator",
      description: "Generate customized cover letters that match your resume and target job descriptions.",
      path: "/tools/resume-analyzer/cover-letter"
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
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link href={feature.path} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 h-full cursor-pointer"
                >
                  <feature.icon className="w-12 h-12 text-primary-600 mb-6" />
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Why Use Our Resume Tools?
            </h2>
            <p className="text-xl text-gray-600">
              Our AI-powered tools help you create a professional, ATS-friendly resume that gets you noticed by employers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Analysis",
                description: "Get instant, detailed feedback on your resume from our advanced AI system."
              },
              {
                title: "ATS-Friendly Format",
                description: "Ensure your resume passes through Applicant Tracking Systems with optimized formatting."
              },
              {
                title: "Professional Templates",
                description: "Access modern, professionally designed resume templates that stand out."
              },
              {
                title: "Keyword Optimization",
                description: "Get suggestions for industry-specific keywords to improve visibility."
              },
              {
                title: "Custom Cover Letters",
                description: "Generate tailored cover letters that complement your resume."
              },
              {
                title: "Real-Time Updates",
                description: "Make changes and see improvements in real-time with instant feedback."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-50 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
