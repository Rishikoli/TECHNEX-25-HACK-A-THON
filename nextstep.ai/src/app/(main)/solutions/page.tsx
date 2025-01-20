'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, LineChart, BookOpen, Globe } from 'lucide-react';
import FloatingBoxesAnimation from '@/components/FloatingBoxesAnimation';
import SolutionsAnimation from '@/components/SolutionsAnimation';
import HeroWaveAnimation from '@/components/HeroWaveAnimation';

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Career Insights",
      description: "Make data-driven career decisions with AI-powered analytics and guidance",
      icon: LineChart,
      features: ["Job Market Analysis", "Skill Gap Assessment", "Career Path Planning"],
      href: "/solutions/career-insights",
      color: "primary"
    },
    {
      title: "Skill Development",
      description: "Get personalized learning recommendations to stay competitive",
      icon: BookOpen,
      features: ["Skill Trend Analysis", "Learning Path Creation", "Progress Tracking"],
      href: "/solutions/skill-development",
      color: "secondary"
    },
    {
      title: "Global Opportunities",
      description: "Explore international career options and remote work possibilities",
      icon: Globe,
      features: ["Remote Job Matching", "Regional Market Analysis", "Cultural Insights"],
      href: "/solutions/global-opportunities",
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <FloatingBoxesAnimation />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Career Growth Solutions
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Unlock your career potential with our comprehensive solutions designed to help you navigate the modern job market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/20 transition-colors"
            >
              <div className="text-white mb-4">{solution.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {solution.title}
              </h3>
              <p className="text-white/80 mb-4">{solution.description}</p>
              <Link
                href={solution.href}
                className="inline-flex items-center text-white hover:text-white/80 transition-colors"
              >
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
