'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Video, Bot } from 'lucide-react';

export default function MockInterviewPage() {
  const options = [
    {
      title: 'Live Interview',
      description: 'Practice with real-time video recording and instant AI feedback',
      icon: Video,
      features: [
        'Real-time video recording',
        'Instant feedback on responses',
        'Body language analysis',
        'Speech clarity assessment'
      ],
      href: '/tools/mock-interview/live',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Personalized AI Interview',
      description: 'One-on-one interview practice with our advanced AI interviewer',
      icon: Bot,
      features: [
        'Adaptive questioning',
        'Detailed response analysis',
        'Custom interview scenarios',
        'Comprehensive feedback'
      ],
      href: '/tools/mock-interview/ai',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Mock Interview Practice
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose your preferred interview practice mode
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link href={option.href}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className={`bg-gradient-to-r ${option.color} p-6`}>
                    <option.icon className="w-12 h-12 text-white mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">{option.title}</h2>
                    <p className="text-white/90">{option.description}</p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Features:</h3>
                    <ul className="space-y-3">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        Start Practice
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-gray-600">
            Not sure which to choose? Start with AI Interview for guided practice, then move to Live Interview for a more realistic experience.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
