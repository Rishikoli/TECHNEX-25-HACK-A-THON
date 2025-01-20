'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { JobSimulator } from '@/components/JobSimulation/JobSimulator';
import { Briefcase } from 'lucide-react';

const jobTypes = [
  {
    title: "Software Engineer",
    questions: [
      {
        id: 1,
        text: "Can you explain a challenging technical problem you've solved recently?",
        category: "Problem Solving",
        difficulty: "Hard",
        expectedDuration: 300
      },
      {
        id: 2,
        text: "How do you approach learning new technologies and keeping your skills current?",
        category: "Professional Development",
        difficulty: "Medium",
        expectedDuration: 240
      },
      {
        id: 3,
        text: "Describe a time when you had to optimize code performance. What was your approach?",
        category: "Technical Skills",
        difficulty: "Hard",
        expectedDuration: 300
      }
    ]
  },
  {
    title: "Product Manager",
    questions: [
      {
        id: 1,
        text: "How do you prioritize features in your product roadmap?",
        category: "Product Strategy",
        difficulty: "Hard",
        expectedDuration: 300
      },
      {
        id: 2,
        text: "Tell me about a time when you had to make a difficult product decision with limited data.",
        category: "Decision Making",
        difficulty: "Hard",
        expectedDuration: 300
      },
      {
        id: 3,
        text: "How do you gather and incorporate user feedback into your product development process?",
        category: "User Research",
        difficulty: "Medium",
        expectedDuration: 240
      }
    ]
  },
  {
    title: "Data Scientist",
    questions: [
      {
        id: 1,
        text: "Explain a complex data analysis project you've worked on. What was your methodology?",
        category: "Technical Skills",
        difficulty: "Hard",
        expectedDuration: 300
      },
      {
        id: 2,
        text: "How do you ensure the accuracy and reliability of your data models?",
        category: "Quality Assurance",
        difficulty: "Medium",
        expectedDuration: 240
      },
      {
        id: 3,
        text: "Describe a situation where you had to communicate complex findings to non-technical stakeholders.",
        category: "Communication",
        difficulty: "Medium",
        expectedDuration: 240
      }
    ]
  }
];

export default function JobSimulationPage() {
  const [selectedJob, setSelectedJob] = useState<typeof jobTypes[0] | null>(null);

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Job Interview Simulation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice real job interviews with AI-powered feedback, live transcription, and video analysis.
          </p>
        </div>

        {!selectedJob ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {jobTypes.map((job) => (
              <motion.div
                key={job.title}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Practice a realistic interview for the {job.title} position with tailored questions and feedback.
                </p>
                <div className="text-sm text-gray-500">
                  {job.questions.length} interview questions
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedJob(null)}
              className="mb-8 text-blue-600 hover:text-blue-700 transition-colors"
            >
              ← Back to Job Selection
            </button>
            <JobSimulator 
              questions={selectedJob.questions}
              jobTitle={selectedJob.title}
            />
          </div>
        )}
      </div>
    </div>
  );
}
