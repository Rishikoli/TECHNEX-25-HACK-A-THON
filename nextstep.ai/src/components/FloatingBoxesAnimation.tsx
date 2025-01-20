'use client';

import React from 'react';
import { motion } from 'framer-motion';

const boxes = [
  { top: '12%', left: '42%', duration: 10 },
  { top: '70%', left: '50%', duration: 7 },
  { top: '17%', left: '6%', duration: 9 },
  { top: '20%', left: '60%', duration: 10 },
  { top: '67%', left: '10%', duration: 6 },
  { top: '80%', left: '70%', duration: 12 },
  { top: '60%', left: '80%', duration: 15 },
  { top: '32%', left: '25%', duration: 16 },
  { top: '90%', left: '25%', duration: 9 },
  { top: '20%', left: '80%', duration: 5 },
];

export default function FloatingBoxesAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#514A9D] to-[#24C6DC]">
      <div className="relative w-full h-full">
        {boxes.map((box, index) => (
          <motion.div
            key={index}
            className="absolute w-[60px] h-[60px] border-[6px] border-white/80 bg-transparent"
            style={{
              top: box.top,
              left: box.left,
            }}
            initial={{
              scale: 0,
              y: -90,
              rotate: 360,
              opacity: 1,
              borderRadius: '0%'
            }}
            animate={{
              scale: 1.3,
              y: -90,
              rotate: -180,
              opacity: 0,
              borderRadius: '50%'
            }}
            transition={{
              duration: box.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
}
