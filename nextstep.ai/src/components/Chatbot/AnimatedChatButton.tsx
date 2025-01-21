'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AnimatedChatButton = ({ onClick }: { onClick: () => void }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side and first client render
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-16 h-16 relative cursor-pointer"
      onClick={onClick}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
      >
        {/* Definitions */}
        <defs>
          <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#buttonGradient)"
          filter="url(#glow)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: 1,
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        {/* Chat bubble shape */}
        <motion.path
          d="M35 40 L65 40 Q70 40 70 45 L70 60 Q70 65 65 65 L55 65 L50 70 L45 65 L35 65 Q30 65 30 60 L30 45 Q30 40 35 40"
          fill="white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Dots */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <circle cx="40" cy="52.5" r="2.5" fill="#3B82F6"/>
          <circle cx="50" cy="52.5" r="2.5" fill="#3B82F6"/>
          <circle cx="60" cy="52.5" r="2.5" fill="#3B82F6"/>
        </motion.g>

        {/* Ripple effect */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
};
