'use client';

import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Users, Clock } from 'lucide-react';

export default function BlogPage() {
  const featuredPosts = [
    {
      title: "Top 10 Tech Skills for 2025",
      category: "Career Tips",
      readTime: "5 min read",
      image: "/blog/tech-skills.jpg",
      description: "Discover the most in-demand technical skills that will shape the job market in 2025."
    },
    {
      title: "Mastering the Remote Job Interview",
      category: "Interview Tips",
      readTime: "4 min read",
      image: "/blog/remote-interview.jpg",
      description: "Essential tips and strategies for succeeding in virtual interviews."
    },
    {
      title: "AI in Recruitment: What You Need to Know",
      category: "Industry Trends",
      readTime: "6 min read",
      image: "/blog/ai-recruitment.jpg",
      description: "How AI is transforming the hiring process and what it means for job seekers."
    }
  ];

  const categories = [
    {
      icon: BookOpen,
      name: "Career Tips",
      count: 45
    },
    {
      icon: TrendingUp,
      name: "Industry Trends",
      count: 32
    },
    {
      icon: Users,
      name: "Interview Tips",
      count: 28
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Career Blog
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Expert insights, tips, and trends to help you navigate your career journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-48 bg-neutral-200"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm text-primary-600 font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-neutral-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    {post.description}
                  </p>
                  <button className="text-primary-600 font-medium hover:text-primary-700">
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-50 rounded-xl p-6 text-center hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <category.icon className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {category.name}
                </h3>
                <span className="text-neutral-600">
                  {category.count} articles
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest career insights and tips.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-neutral-900"
            />
            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
