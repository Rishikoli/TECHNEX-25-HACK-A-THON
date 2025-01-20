'use client';

import { MockInterview } from '@/components/MockInterview';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function IndustryInterviewPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/tools/mock-interview"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Interview Types
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Industry-Specific Interview Practice
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice with questions tailored to your industry and role, focusing on domain expertise and industry knowledge.
          </p>
        </div>

        <MockInterview 
          type="industry"
          questions={[
            {
              id: 1,
              text: "How do you stay current with industry trends and developments in your field?",
              category: "Industry Knowledge",
              difficulty: "Medium",
              expectedDuration: 180
            },
            {
              id: 2,
              text: "Describe a significant challenge facing our industry and how you would address it.",
              category: "Industry Analysis",
              difficulty: "Hard",
              expectedDuration: 240
            },
            {
              id: 3,
              text: "What do you think will be the most important developments in our industry over the next 5 years?",
              category: "Industry Trends",
              difficulty: "Medium",
              expectedDuration: 240
            },
            {
              id: 4,
              text: "How has your previous experience prepared you for the specific challenges of this role?",
              category: "Role Specific",
              difficulty: "Medium",
              expectedDuration: 180
            },
            {
              id: 5,
              text: "What strategies would you implement to improve our market position in the current competitive landscape?",
              category: "Strategy",
              difficulty: "Hard",
              expectedDuration: 300
            }
          ]}
        />
      </div>
    </div>
  );
}
