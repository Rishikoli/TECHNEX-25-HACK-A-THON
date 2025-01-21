'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  FileText, 
  MessageSquare, 
  Brain, 
  DollarSign, 
  BarChart4, 
  HelpCircle,
  Sparkles 
} from 'lucide-react';

const navigationLinks = [
  {
    title: 'Resume Analyzer',
    description: 'AI-powered resume analysis & optimization',
    icon: FileText,
    path: '/tools/resume-analyzer',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Mock Interview',
    description: 'Practice with live and AI-powered mock interviews',
    icon: MessageSquare,
    path: '/tools/mock-interview',
    color: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'AI Career Coach',
    description: 'Personalized career guidance powered by AI',
    icon: Brain,
    path: '/solutions/ai-career-coach',
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Salary Navigator',
    description: 'Comprehensive salary insights',
    icon: DollarSign,
    path: '/solutions/salary-navigator',
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    title: 'Career Insights',
    description: 'Data-driven career guidance & analytics',
    icon: BarChart4,
    path: '/solutions/career-insights',
    color: 'bg-teal-500',
    gradient: 'from-teal-500 to-teal-600',
  },
  {
    title: 'Question Generator',
    description: 'AI-powered interview question generator',
    icon: HelpCircle,
    path: '/tools/question-generator',
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600',
  }
];

const features = [
  {
    icon: HelpCircle,
    title: 'Expert Interviews',
    description: 'Practice with industry-specific questions',
  },
  {
    icon: Sparkles,
    title: 'Real-time Feedback',
    description: 'Get instant analysis of your responses',
  },
  {
    icon: FileText,
    title: 'Learning Resources',
    description: 'Access curated materials for improvement',
  },
];

const HeroSVG = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="w-full h-full"
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      cx="400"
      cy="300"
      r="150"
      className="fill-emerald-500/20"
    />
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      cx="400"
      cy="300"
      r="100"
      className="fill-emerald-500/40"
    />
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      d="M 300 300 Q 400 200 500 300 T 700 300"
      stroke="currentColor"
      strokeWidth="4"
      className="stroke-emerald-500"
      fill="none"
    />
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          cx={400 + Math.cos(i * Math.PI / 4) * 200}
          cy={300 + Math.sin(i * Math.PI / 4) * 200}
          r="8"
          className="fill-emerald-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.g>
  </motion.svg>
);

const PARTICLE_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 5) % 100}%`,
  top: `${(i * 7) % 100}%`,
}));

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Career Growth</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Accelerate Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                  Tech Career
                </span>{' '}
                with AI
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl text-gray-600 max-w-2xl"
              >
                Unlock your potential with AI-powered tools for resume analysis, mock interviews, 
                career coaching, and comprehensive salary insights.
              </motion.p>
            </div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {navigationLinks.map((link, index) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group relative"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 space-y-3 overflow-hidden"
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${link.gradient}`}>
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {link.description}
                    </p>
                    <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-[-100%] transition-all duration-1000" />
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-full h-full"
              >
                <HeroSVG />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute top-1/4 left-1/4"
              >
                <Brain className="w-12 h-12 text-emerald-500" />
              </motion.div>
              
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute bottom-1/4 right-1/4"
              >
                <HelpCircle className="w-12 h-12 text-emerald-500" />
              </motion.div>

              {/* Particle Effect */}
              <div className="absolute inset-0">
                {PARTICLE_POSITIONS.map((position, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-emerald-500 rounded-full"
                    style={{
                      left: position.left,
                      top: position.top,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
