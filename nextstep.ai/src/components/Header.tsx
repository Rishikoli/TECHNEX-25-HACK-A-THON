'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" }
  };

  const dropdownVariants = {
    open: { opacity: 1, y: 0, display: "block" },
    closed: { opacity: 0, y: -10, transitionEnd: { display: "none" } }
  };

  const featuresItems = [
    {
      title: "Resume Analyzer",
      description: "AI-powered resume analysis & optimization",
      features: ["Gemini AI Integration", "Layout Optimization", "Keyword Analysis"],
      href: "/tools/resume-analyzer"
    },
    {
      title: "Interview Preparation",
      description: "Comprehensive interview practice with AI-powered feedback",
      features: ["Mock Interviews", "Job Simulations", "Real-time Feedback", "Video Analysis"],
      href: "/tools/interview-prep"
    },
    {
      title: "Question Generator",
      description: "AI-powered interview question generator with personalized questions",
      features: ["Resume-based Questions", "Topic-based Questions", "Custom Questions", "AI Generation"],
      href: "/tools/question-generator"
    }
  ];

  const servicesItems = [
    {
      title: "AI Career Coach",
      description: "Personalized career guidance powered by AI",
      features: [
        "Career Path Planning",
        "Skill Gap Analysis",
        "Industry Insights",
        "Learning Paths"
      ],
      href: "/solutions/ai-career-coach"
    },
    {
      title: "Salary Navigator",
      description: "Comprehensive salary and compensation analysis",
      features: [
        "Salary Calculator",
        "Benefits Analysis",
        "Negotiation Tools",
        "Counter-offer Evaluator"
      ],
      href: "/solutions/salary-navigator"
    },
    {
      title: "Career Insights",
      description: "Data-driven career guidance & analytics",
      features: [
        "Job Market Analysis",
        "Industry Trends",
        "Skill Demand Tracking",
        "Growth Opportunities"
      ],
      href: "/solutions/career-insights"
    }
  ];

  const resourcesItems = [
    {
      title: "Career Blog",
      description: "Expert insights and career advice",
      href: "/resources/blog"
    },
    {
      title: "Success Stories",
      description: "Real stories from our users",
      href: "/resources/success-stories"
    },
    {
      title: "Help Center",
      description: "Guides and documentation",
      href: "/resources/help"
    }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2"
        >
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
              NextStep.AI
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center space-x-8"
        >
          {/* Features Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center space-x-1 text-neutral-600 hover:text-neutral-900 transition-colors"
              onClick={() => setActiveDropdown(activeDropdown === 'features' ? null : 'features')}
            >
              <span>Features</span>
              <ChevronDown size={16} />
            </button>
            <motion.div
              initial="closed"
              animate={activeDropdown === 'features' ? 'open' : 'closed'}
              variants={dropdownVariants}
              className="absolute top-full left-0 w-[480px] bg-white rounded-lg shadow-lg py-4 mt-2"
            >
              <div className="grid grid-cols-2 gap-4 p-4">
                {featuresItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="font-medium text-neutral-900">{item.title}</div>
                    <div className="text-sm text-neutral-500 mb-2">{item.description}</div>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center space-x-1 text-neutral-600 hover:text-neutral-900 transition-colors"
              onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
            >
              <span>Services</span>
              <ChevronDown size={16} />
            </button>
            <motion.div
              initial="closed"
              animate={activeDropdown === 'services' ? 'open' : 'closed'}
              variants={dropdownVariants}
              className="absolute top-full left-0 w-[480px] bg-white rounded-lg shadow-lg py-4 mt-2"
            >
              <div className="grid grid-cols-1 gap-4 p-4">
                {servicesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="font-medium text-neutral-900">{item.title}</div>
                    <div className="text-sm text-neutral-500 mb-2">{item.description}</div>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-secondary-700 bg-secondary-50 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Resources Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center space-x-1 text-neutral-600 hover:text-neutral-900 transition-colors"
              onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
            >
              <span>Resources</span>
              <ChevronDown size={16} />
            </button>
            <motion.div
              initial="closed"
              animate={activeDropdown === 'resources' ? 'open' : 'closed'}
              variants={dropdownVariants}
              className="absolute top-full right-0 w-64 bg-white rounded-lg shadow-lg py-2 mt-2"
            >
              {resourcesItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-neutral-50"
                >
                  <div className="font-medium text-neutral-900">{item.title}</div>
                  <div className="text-sm text-neutral-500">{item.description}</div>
                </Link>
              ))}
            </motion.div>
          </div>

          <Link href="/contact" className="text-neutral-600 hover:text-neutral-900 transition-colors">
            Contact
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center space-x-4"
        >
          <button className="px-4 py-2 text-neutral-700 hover:text-neutral-900">
            Sign In
          </button>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            Get Started
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <motion.div
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          className={`md:hidden fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-6 overflow-y-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col space-y-6">
            {/* Mobile Features Menu */}
            <div className="space-y-3">
              <div className="font-medium text-lg text-neutral-900">Features</div>
              <div className="space-y-2">
                {featuresItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg p-2 hover:bg-neutral-50"
                  >
                    <div className="font-medium text-neutral-800">{item.title}</div>
                    <div className="text-sm text-neutral-500">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Services Menu */}
            <div className="space-y-3">
              <div className="font-medium text-lg text-neutral-900">Services</div>
              <div className="space-y-2">
                {servicesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg p-2 hover:bg-neutral-50"
                  >
                    <div className="font-medium text-neutral-800">{item.title}</div>
                    <div className="text-sm text-neutral-500">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Resources Menu */}
            <div className="space-y-3">
              <div className="font-medium text-lg text-neutral-900">Resources</div>
              <div className="space-y-2">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg p-2 hover:bg-neutral-50"
                  >
                    <div className="font-medium text-neutral-800">{item.title}</div>
                    <div className="text-sm text-neutral-500">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact" className="text-neutral-600 hover:text-neutral-900">
              Contact
            </Link>
            
            <hr className="my-4" />
            
            <button className="w-full px-4 py-2 text-neutral-700 hover:text-neutral-900">
              Sign In
            </button>
            <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
              Get Started
            </button>
          </div>
        </motion.div>
      </nav>
    </header>
  );
};
