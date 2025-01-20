'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, LineChart, BookOpen, Globe } from 'lucide-react';

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
    <div className="min-h-screen bg-neutral-50 py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Career Growth Solutions
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            Unlock your career potential with our comprehensive solutions designed to help you navigate the modern job market.
          </p>
        </motion.div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={solution.href}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 h-full">
                  <div className="space-y-4">
                    <div className={`p-3 inline-flex rounded-lg bg-${solution.color}-50`}>
                      <solution.icon className={`w-6 h-6 text-${solution.color}-500`} />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {solution.title}
                    </h3>
                    <p className="text-neutral-600">
                      {solution.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {solution.features.map((feature, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${solution.color}-50 text-${solution.color}-700`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-primary-600 font-medium pt-4">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2" />
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
