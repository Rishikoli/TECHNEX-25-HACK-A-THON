'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedLogo() {
  return (
    <div className="relative h-8">
      <motion.div
        className="text-xl font-bold relative"
        initial={{ opacity: 1 }}
      >
        <span className="absolute text-transparent [-webkit-text-stroke:1px_#6366f1]">
          NextStep.ai
        </span>
        <motion.div
          className="text-[#6366f1] relative"
          animate={{
            clipPath: [
              'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
              'polygon(0 0, 0 0, 0 100%, 0% 100%)',
              'polygon(100% 0, 0 0, 0 100%, 100% 100%)',
              'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
              'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          NextStep.ai
        </motion.div>
      </motion.div>
    </div>
  );
}
