'use client';

import { motion } from 'framer-motion';
import { Video, Brain, MessageSquare, Target } from 'lucide-react';

export default function InterviewPrepPage() {
  const features = [
    {
      icon: Video,
      title: "AI Interview Simulation",
      description: "Practice with our AI interviewer that adapts to your responses and industry."
    },
    {
      icon: Brain,
      title: "Smart Question Prediction",
      description: "Get industry-specific questions based on your resume and target role."
    },
    {
      icon: MessageSquare,
      title: "Real-time Feedback",
      description: "Receive instant feedback on your answers, body language, and speaking pace."
    },
    {
      icon: Target,
      title: "Personalized Coaching",
      description: "Get tailored advice to improve your interview performance over time."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-500 to-accent-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Interview Preparation
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Practice interviews with our AI-powered system and get real-time feedback to improve your performance.
            </p>
            <button className="bg-white text-accent-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Start Practice Interview
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-accent-50">
                    <feature.icon className="w-6 h-6 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Select Your Industry",
                  description: "Choose your target industry and role for tailored interview questions."
                },
                {
                  step: "2",
                  title: "Start Practice Session",
                  description: "Begin your AI-powered interview simulation with video and audio."
                },
                {
                  step: "3",
                  title: "Get Feedback",
                  description: "Receive detailed feedback on your answers, delivery, and body language."
                },
                {
                  step: "4",
                  title: "Track Progress",
                  description: "Monitor your improvement over time with detailed analytics."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of candidates who have improved their interview skills with our AI-powered practice platform.
          </p>
          <button className="bg-accent-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors">
            Practice Now
          </button>
        </div>
      </section>
    </div>
  );
}
