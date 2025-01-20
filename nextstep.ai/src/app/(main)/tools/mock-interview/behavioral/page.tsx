'use client';

import { MockInterview } from '@/components/MockInterview';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BehavioralInterviewPage() {
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
            Behavioral Interview Practice
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice answering questions about your past experiences and behavior using the STAR method.
          </p>
        </div>

        <MockInterview 
          type="behavioral"
          questions={[
            {
              id: 1,
              text: "Tell me about a time when you had to handle a challenging situation at work.",
              category: "Problem Solving",
              difficulty: "Medium",
              expectedDuration: 180
            },
            {
              id: 2,
              text: "Describe a situation where you had to work with a difficult team member.",
              category: "Teamwork",
              difficulty: "Medium",
              expectedDuration: 180
            },
            {
              id: 3,
              text: "Give an example of a goal you reached and how you achieved it.",
              category: "Achievement",
              difficulty: "Medium",
              expectedDuration: 180
            },
            {
              id: 4,
              text: "Tell me about a time when you had to manage multiple priorities.",
              category: "Time Management",
              difficulty: "Hard",
              expectedDuration: 240
            },
            {
              id: 5,
              text: "Describe a situation where you had to make a difficult decision.",
              category: "Decision Making",
              difficulty: "Hard",
              expectedDuration: 240
            }
          ]}
        />
      </div>
    </div>
  );
}
