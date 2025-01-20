'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, HelpCircle } from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    {
      title: "Career Blog",
      description: "Expert insights and advice to help you navigate your career journey",
      icon: BookOpen,
      categories: ["Career Tips", "Industry Trends", "Expert Interviews"],
      href: "/resources/blog",
      color: "primary"
    },
    {
      title: "Success Stories",
      description: "Real stories from users who transformed their careers with NextStep.AI",
      icon: Users,
      categories: ["Career Transitions", "Job Search Success", "Personal Growth"],
      href: "/resources/success-stories",
      color: "secondary"
    },
    {
      title: "Help Center",
      description: "Comprehensive guides and documentation to help you get the most out of NextStep.AI",
      icon: HelpCircle,
      categories: ["User Guides", "FAQs", "Video Tutorials"],
      href: "/resources/help",
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Career Resources
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            Access valuable insights, success stories, and expert guidance to accelerate your career growth.
          </p>
        </motion.div>
      </section>

      {/* Resources Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={resource.href}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 h-full">
                  <div className="space-y-4">
                    <div className={`p-3 inline-flex rounded-lg bg-${resource.color}-50`}>
                      <resource.icon className={`w-6 h-6 text-${resource.color}-500`} />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {resource.title}
                    </h3>
                    <p className="text-neutral-600">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {resource.categories.map((category, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${resource.color}-50 text-${resource.color}-700`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-primary-600 font-medium pt-4">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
