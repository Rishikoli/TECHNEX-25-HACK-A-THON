'use client';

import { MockInterview } from '@/components/MockInterview';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TechnicalInterviewPage() {
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
            Technical Interview Practice
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice technical questions and system design problems with real-time feedback.
          </p>
        </div>

        <MockInterview 
          type="technical"
          questions={[
            {
              id: 1,
              text: "Explain how you would design a scalable web application. Consider aspects like load balancing, caching, and database design.",
              category: "System Design",
              difficulty: "Hard",
              expectedDuration: 300
            },
            {
              id: 2,
              text: "How would you optimize a slow-performing database query? Walk through your approach and considerations.",
              category: "Database",
              difficulty: "Medium",
              expectedDuration: 240
            },
            {
              id: 3,
              text: "Describe your experience with CI/CD pipelines and how you would set one up for a new project.",
              category: "DevOps",
              difficulty: "Medium",
              expectedDuration: 180
            },
            {
              id: 4,
              text: "How would you implement a rate limiting system for an API? Discuss the algorithm and implementation details.",
              category: "System Design",
              difficulty: "Hard",
              expectedDuration: 300
            },
            {
              id: 5,
              text: "Explain how you would implement authentication and authorization in a microservices architecture.",
              category: "Security",
              difficulty: "Hard",
              expectedDuration: 300
            }
          ]}
        />
      </div>
    </div>
  );
}
