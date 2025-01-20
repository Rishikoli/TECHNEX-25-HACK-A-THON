'use client';

import { motion } from 'framer-motion';
import { Video, Users, Code, Briefcase } from 'lucide-react';
import Link from 'next/link';

const interviewTypes = [
  {
    title: "Behavioral Interview",
    description: "Practice answering questions about your past experiences and behavior",
    icon: Users,
    features: ["STAR Method Practice", "Situational Scenarios", "Leadership Examples"],
    href: "/tools/mock-interview/behavioral",
    color: "primary"
  },
  {
    title: "Technical Interview",
    description: "Prepare for technical questions and coding challenges",
    icon: Code,
    features: ["System Design", "Algorithm Practice", "Code Review"],
    href: "/tools/mock-interview/technical",
    color: "secondary"
  },
  {
    title: "Industry Specific",
    description: "Tailored interviews for your industry and role",
    icon: Briefcase,
    features: ["Role-Based Questions", "Industry Knowledge", "Domain Expertise"],
    href: "/tools/mock-interview/industry",
    color: "accent"
  }
];

export function InterviewTypes() {
  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {interviewTypes.map((type, index) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-blue-600 mb-4">
              <type.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {type.title}
            </h3>
            <p className="text-gray-600 mb-4">{type.description}</p>
            <ul className="space-y-2 mb-4">
              {type.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm text-gray-500">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={type.href}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors font-semibold"
            >
              Start Practice
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
