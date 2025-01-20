'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SolutionsAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Connected Nodes */}
        {[...Array(6)].map((_, i) => (
          <React.Fragment key={i}>
            <motion.circle
              cx={200 + i * 100}
              cy={300}
              r="8"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                times: [0, 0.2, 0.8, 1],
              }}
            />
            {i < 5 && (
              <motion.line
                x1={208 + i * 100}
                y1={300}
                x2={292 + i * 100}
                y2={300}
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                }}
              />
            )}
          </React.Fragment>
        ))}

        {/* Rising Paths */}
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${150 + i * 250} 500 Q ${250 + i * 250} 300 ${350 + i * 250} 100`}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              delay: i * 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating Diamonds */}
        {[...Array(4)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${200 + i * 150},250 L${220 + i * 150},270 L${200 + i * 150},290 L${180 + i * 150},270 Z`}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ y: 0 }}
            animate={{
              y: [-20, 20],
              rotate: [0, 360]
            }}
            transition={{
              y: {
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              rotate: {
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
        ))}
      </svg>
    </div>
  );
}
