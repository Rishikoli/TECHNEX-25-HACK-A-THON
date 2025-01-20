'use client';

import { motion } from 'framer-motion';
import { HelpCircle, Book, Video, MessageSquare, Search } from 'lucide-react';

export default function HelpCenterPage() {
  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using NextStep.AI's tools and features.",
      articles: ["Platform Overview", "Account Setup", "Quick Start Guide"]
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for all our features.",
      articles: ["Resume Analysis", "ATS Optimization", "Interview Prep"]
    },
    {
      icon: MessageSquare,
      title: "FAQs",
      description: "Answers to commonly asked questions about our platform.",
      articles: ["Billing Questions", "Technical Support", "Feature Requests"]
    }
  ];

  const popularArticles = [
    "How to Upload Your Resume",
    "Understanding Your ATS Score",
    "Preparing for AI Interviews",
    "Tracking Your Progress",
    "Account Settings Guide"
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
              Help Center
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Find answers, tutorials, and guides to help you make the most of NextStep.AI
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-3 rounded-lg text-neutral-900"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <category.icon className="w-8 h-8 text-accent-500 mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.articles.map((article, i) => (
                    <li key={i}>
                      <a href="#" className="text-accent-600 hover:text-accent-700 flex items-center">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Articles</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-50 rounded-lg p-4 hover:bg-neutral-100 transition-colors"
                >
                  <a href="#" className="flex items-center justify-between text-neutral-900 hover:text-accent-600">
                    <span>{article}</span>
                    <HelpCircle className="w-5 h-5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Still Need Help?
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <button className="bg-accent-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
}
