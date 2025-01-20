'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroWaveAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="w-full h-full opacity-30"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background waves */}
        <motion.path
          d="M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 L1000,1000 L0,1000 Z"
          fill="currentColor"
          initial={{ y: 100 }}
          animate={{
            y: [100, -100, 100],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,600 C200,500 300,400 500,600 C700,800 800,700 1000,600 L1000,1000 L0,1000 Z"
          fill="currentColor"
          opacity="0.5"
          initial={{ y: 0 }}
          animate={{
            y: [-100, 100, -100],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating circles */}
        {[...Array(10)].map((_, i) => (
          <motion.circle
            key={i}
            r="8"
            fill="currentColor"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 500,
            }}
            animate={{
              y: [null, Math.random() * -500],
              x: [null, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Animated lines */}
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={200 * i}
            y1="0"
            x2={200 * i + 100}
            y2="1000"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
