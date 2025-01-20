'use client';

import { motion } from 'framer-motion';
import { BookOpen, Award, Clock, BarChart } from 'lucide-react';
import FloatingBoxesAnimation from '@/components/FloatingBoxesAnimation';

export default function SkillDevelopmentPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Personalized Learning Paths",
      description: "Get customized learning recommendations based on your career goals and current skill level."
    },
    {
      icon: Award,
      title: "Skill Certification",
      description: "Earn certificates and badges as you complete learning milestones."
    },
    {
      icon: Clock,
      title: "Progress Tracking",
      description: "Monitor your learning progress and stay on track with your development goals."
    },
    {
      icon: BarChart,
      title: "Skill Analytics",
      description: "Visualize your skill growth and identify areas for improvement."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary-500 to-secondary-600 text-white py-20">
        <FloatingBoxesAnimation />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Skill Development Platform
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Build the skills you need to advance your career with personalized learning paths and expert guidance.
            </p>
            <button className="bg-white text-secondary-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Start Learning
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
                  <div className="p-3 rounded-lg bg-secondary-50">
                    <feature.icon className="w-6 h-6 text-secondary-500" />
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

      {/* Popular Skills Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Data Science",
              "Cloud Computing",
              "AI & Machine Learning",
              "Digital Marketing",
              "UX Design",
              "Project Management",
              "Cybersecurity",
              "Business Analytics"
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary-50 rounded-lg p-4 text-center hover:bg-secondary-100 transition-colors cursor-pointer"
              >
                <span className="text-secondary-700 font-medium">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Your Learning Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Skill Assessment",
                  description: "Take our comprehensive skill assessment to identify your current level."
                },
                {
                  step: "2",
                  title: "Custom Learning Path",
                  description: "Get a personalized curriculum based on your goals and current skills."
                },
                {
                  step: "3",
                  title: "Learn & Practice",
                  description: "Access high-quality learning resources and hands-on projects."
                },
                {
                  step: "4",
                  title: "Track Progress",
                  description: "Monitor your progress and earn certificates as you advance."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary-500 text-white flex items-center justify-center font-bold">
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
            Start Your Learning Journey Today
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are advancing their careers through continuous learning.
          </p>
          <button className="bg-secondary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary-600 transition-colors">
            Begin Free Assessment
          </button>
        </div>
      </section>
    </div>
  );
}
