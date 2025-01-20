'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WaveTextProps {
  text: string;
  className?: string;
}

export default function WaveText({ text, className = '' }: WaveTextProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -4, 0],
            color: ['#6366f1', '#8b5cf6', '#6366f1'],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: index * 0.1,
          }}
          className="inline-block transform-gpu"
          style={{
            textShadow: '0 0 8px rgba(99, 102, 241, 0.3)',
            willChange: 'transform'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}
