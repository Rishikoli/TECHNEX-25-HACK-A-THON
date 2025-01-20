'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle, PenTool, Video } from 'lucide-react';
import NeuralAnimation from '@/components/NeuralAnimation';
import ToolsAnimation from '@/components/ToolsAnimation';
import HeroWaveAnimation from '@/components/HeroWaveAnimation';

export default function ToolsPage() {
  const tools = [
    {
      title: "Resume Analyzer",
      description: "Get AI-powered insights and recommendations to optimize your resume",
      icon: FileText,
      features: ["Gemini AI Integration", "Layout Optimization", "Keyword Analysis"],
      href: "/tools/resume-analyzer",
      color: "primary"
    },
    {
      title: "ATS Optimizer",
      description: "Ensure your resume passes Applicant Tracking Systems with confidence",
      icon: CheckCircle,
      features: ["ATS Compatibility Score", "Format Validation", "Keyword Optimization"],
      href: "/tools/ats-optimizer",
      color: "secondary"
    },
    {
      title: "Cover Letter AI",
      description: "Generate tailored cover letters that match job descriptions perfectly",
      icon: PenTool,
      features: ["Context-Aware Generation", "Multiple Templates", "Job Description Matching"],
      href: "/tools/cover-letter",
      color: "accent"
    },
    {
      title: "Interview Preparation",
      description: "Practice interviews with AI and get real-time feedback",
      icon: Video,
      features: ["Question Prediction", "Role-Specific Scenarios", "Real-time Feedback"],
      href: "/tools/interview-prep",
      color: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-neutral-900 to-neutral-800 text-white py-20 overflow-hidden">
        <NeuralAnimation />
        <ToolsAnimation />
        <HeroWaveAnimation />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI-Powered Career Tools
            </h1>
            <p className="text-xl text-neutral-300 mb-8">
              Transform your job search with our suite of advanced AI tools designed to optimize every aspect of your career journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={tool.href}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-${tool.color}-50`}>
                      <tool.icon className={`w-6 h-6 text-${tool.color}-500`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-neutral-600 mb-4">
                        {tool.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.features.map((feature, i) => (
                          <span
                            key={i}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${tool.color}-50 text-${tool.color}-700`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-primary-600 font-medium">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
