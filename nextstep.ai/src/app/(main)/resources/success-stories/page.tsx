'use client';

import { motion } from 'framer-motion';
import { Star, Briefcase, Award, ArrowRight } from 'lucide-react';

export default function SuccessStoriesPage() {
  const stories = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      image: "/success-stories/sarah.jpg",
      quote: "NextStep.AI's resume analyzer helped me optimize my application, and the interview prep tool gave me the confidence I needed.",
      improvement: "Landed dream job in 2 months"
    },
    {
      name: "James Wilson",
      role: "Product Manager at Microsoft",
      image: "/success-stories/james.jpg",
      quote: "The career insights helped me identify the perfect role, and the skill development platform prepared me for the transition.",
      improvement: "40% salary increase"
    },
    {
      name: "Maria Garcia",
      role: "Data Scientist at Amazon",
      image: "/success-stories/maria.jpg",
      quote: "The ATS optimizer was a game-changer. My application success rate improved dramatically after using NextStep.AI.",
      improvement: "8 interview calls in 2 weeks"
    }
  ];

  const stats = [
    {
      icon: Star,
      value: "94%",
      label: "Success Rate",
      description: "of users land interviews within 30 days"
    },
    {
      icon: Briefcase,
      value: "10k+",
      label: "Job Offers",
      description: "secured by our users in 2024"
    },
    {
      icon: Award,
      value: "35%",
      label: "Salary Increase",
      description: "average salary boost after using our platform"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary-500 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Real stories from professionals who transformed their careers with NextStep.AI
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <stat.icon className="w-8 h-8 text-secondary-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-neutral-900 mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-neutral-700 mb-2">
                  {stat.label}
                </div>
                <div className="text-neutral-600 text-sm">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-50 rounded-xl p-6"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-neutral-200"></div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {story.name}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {story.role}
                    </p>
                  </div>
                </div>
                <blockquote className="text-neutral-700 mb-6">
                  "{story.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600 font-medium">
                    {story.improvement}
                  </span>
                  <button className="text-secondary-600 hover:text-secondary-700">
                    Read More <ArrowRight className="w-4 h-4 inline-block ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Your Success Story
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with NextStep.AI
          </p>
          <button className="bg-secondary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary-600 transition-colors">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
