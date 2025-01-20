'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ToolsAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gear Animation */}
        <motion.g
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path
            d="M400 300m-80 0a80 80 0 1 0 160 0a80 80 0 1 0 -160 0"
            stroke="currentColor"
            strokeWidth="4"
          />
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={i}
              x1="400"
              y1="300"
              x2={400 + Math.cos((i * Math.PI) / 6) * 120}
              y2={300 + Math.sin((i * Math.PI) / 6) * 120}
              stroke="currentColor"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.g>

        {/* Floating Squares */}
        {[...Array(5)].map((_, i) => (
          <motion.rect
            key={i}
            width="20"
            height="20"
            x={150 + i * 120}
            initial={{ y: -50 }}
            animate={{
              y: [550, -50],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        ))}

        {/* Pulsing Circles */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={200 + i * 200}
            cy="300"
            r="40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 2],
              opacity: [1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}
