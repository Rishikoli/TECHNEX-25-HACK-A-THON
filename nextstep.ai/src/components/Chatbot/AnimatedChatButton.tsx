'use client';

import { motion } from 'framer-motion';

export const AnimatedChatButton = ({ onClick }: { onClick: () => void }) => {
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

        {/* Robot Head */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ 
            y: [-2, 2, -2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Robot head base */}
          <motion.path
            d="M35 30C35 25 40 20 50 20C60 20 65 25 65 30V45C65 50 60 55 50 55C40 55 35 50 35 45V30Z"
            fill="white"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Robot eyes */}
          <motion.g
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Left eye */}
            <motion.circle
              cx="43"
              cy="35"
              r="3"
              fill="#3B82F6"
              animate={{
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Right eye */}
            <motion.circle
              cx="57"
              cy="35"
              r="3"
              fill="#3B82F6"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.g>

          {/* Robot antenna */}
          <motion.path
            d="M48 20L50 15L52 20"
            stroke="white"
            strokeWidth="2"
            fill="none"
            animate={{
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Robot mouth */}
          <motion.path
            d="M44 45C44 45 47 47 50 47C53 47 56 45 56 45"
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M44 45C44 45 47 47 50 47C53 47 56 45 56 45",
                "M44 46C44 46 47 44 50 44C53 44 56 46 56 46",
                "M44 45C44 45 47 47 50 47C53 47 56 45 56 45"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Robot ears/side panels */}
          <motion.g
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <rect x="32" y="32" width="3" height="10" fill="white" rx="1" />
            <rect x="65" y="32" width="3" height="10" fill="white" rx="1" />
          </motion.g>
        </motion.g>

        {/* Circuit lines */}
        <motion.g
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M20 50C25 45 30 42 35 40" fill="none" />
          <path d="M80 50C75 45 70 42 65 40" fill="none" />
          <path d="M50 60C45 65 42 70 40 75" fill="none" />
        </motion.g>

        {/* Energy particles */}
        <motion.g
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="25" cy="60" r="2" fill="white" />
          <circle cx="75" cy="60" r="2" fill="white" />
          <circle cx="50" cy="75" r="2" fill="white" />
        </motion.g>
      </svg>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-500 opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 1.5],
          opacity: [0.2, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
};
