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
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    title: 'Mock Interview',
    description: 'Practice with live and AI-powered mock interviews',
    icon: MessageSquare,
    path: '/tools/mock-interview',
    gradient: 'from-secondary-500 to-secondary-600',
  },
  {
    title: 'AI Career Coach',
    description: 'Personalized career guidance powered by AI',
    icon: Brain,
    path: '/solutions/ai-career-coach',
    gradient: 'from-accent-500 to-accent-600',
  },
  {
    title: 'Salary Navigator',
    description: 'Comprehensive salary insights',
    icon: DollarSign,
    path: '/solutions/salary-navigator',
    gradient: 'from-success-500 to-success-700',
  },
  {
    title: 'Career Insights',
    description: 'Data-driven career guidance & analytics',
    icon: BarChart4,
    path: '/solutions/career-insights',
    gradient: 'from-primary-600 to-primary-700',
  },
  {
    title: 'Question Generator',
    description: 'AI-powered interview question generator',
    icon: HelpCircle,
    path: '/tools/question-generator',
    gradient: 'from-secondary-600 to-secondary-700',
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

const PARTICLE_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 5) % 100}%`,
  top: `${(i * 7) % 100}%`,
}));

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
    {/* AI Core Hexagon */}
    <motion.path
      d="M400 200 L500 250 L500 350 L400 400 L300 350 L300 250 Z"
      className="stroke-primary-500"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
    />

    {/* Inner Hexagon */}
    <motion.path
      d="M400 250 L450 275 L450 325 L400 350 L350 325 L350 275 Z"
      className="stroke-primary-400"
      strokeWidth="1.5"
      fill="none"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />

    {/* Neural Network Nodes */}
    {[...Array(12)].map((_, i) => (
      <motion.circle
        key={`node-${i}`}
        cx={400 + Math.cos((i * Math.PI) / 6) * 180}
        cy={300 + Math.sin((i * Math.PI) / 6) * 180}
        r="6"
        className="fill-primary-500"
        initial={{ scale: 0 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.15,
        }}
      />
    ))}

    {/* Connection Lines */}
    {[...Array(12)].map((_, i) => (
      <motion.line
        key={`line-${i}`}
        x1={400}
        y1={300}
        x2={400 + Math.cos((i * Math.PI) / 6) * 180}
        y2={300 + Math.sin((i * Math.PI) / 6) * 180}
        className="stroke-primary-300"
        strokeWidth="1"
        strokeDasharray="4,4"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 2,
          delay: i * 0.1,
          repeat: Infinity,
        }}
      />
    ))}

    {/* Pulse Rings */}
    {[50, 100, 150].map((radius, i) => (
      <motion.circle
        key={`pulse-${i}`}
        cx="400"
        cy="300"
        r={radius}
        className="stroke-secondary-400"
        strokeWidth="1"
        fill="none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: i * 0.8,
        }}
      />
    ))}

    {/* Career Growth Path */}
    <motion.path
      d="M100 500 C 200 480, 300 450, 400 400 S 600 300, 700 250"
      className="stroke-accent-500"
      strokeWidth="2"
      fill="none"
      strokeDasharray="8,8"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    {/* Success Markers */}
    {[0.2, 0.5, 0.8].map((position, i) => (
      <motion.g key={`success-${i}`}>
        <motion.circle
          cx={100 + position * 600}
          cy={500 - position * 250}
          r="10"
          className="fill-success-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.5 }}
        />
        <motion.circle
          cx={100 + position * 600}
          cy={500 - position * 250}
          r="16"
          className="stroke-success-500"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      </motion.g>
    ))}

    {/* Data Flow Lines */}
    {[...Array(6)].map((_, i) => (
      <motion.line
        key={`flow-${i}`}
        x1={150 + i * 100}
        y1={100}
        x2={150 + i * 100}
        y2={500}
        className="stroke-primary-200"
        strokeWidth="1"
        strokeDasharray="6,6"
        initial={{ pathLength: 0 }}
        animate={{ 
          pathLength: 1,
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          delay: i * 0.3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}

    {/* Floating Tech Icons */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {/* AI Symbol */}
      <motion.path
        d="M350 150 L450 150 M400 120 L400 180"
        className="stroke-primary-600"
        strokeWidth="3"
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Career Symbol */}
      <motion.path
        d="M600 400 L650 400 M625 375 L625 425"
        className="stroke-secondary-600"
        strokeWidth="3"
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [1.05, 0.95, 1.05]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </motion.g>
  </motion.svg>
);

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
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
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Career Growth</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl"
              >
                Accelerate Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                  Tech Career
                </span>{' '}
                with AI
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl text-neutral-600 max-w-2xl"
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
                    className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-200 space-y-3 overflow-hidden"
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${link.gradient}`}>
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {link.description}
                    </p>
                    <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-50/5 to-primary-50/20 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-[-100%] transition-all duration-1000" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl overflow-hidden">
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
                <Brain className="w-12 h-12 text-primary-500" />
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
                <HelpCircle className="w-12 h-12 text-secondary-500" />
              </motion.div>

              {/* Particle Effect */}
              <div className="absolute inset-0">
                {PARTICLE_POSITIONS.map((position, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-400 rounded-full"
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
