'use client';

import React from 'react';

interface WaveClipTextProps {
  text: string;
  className?: string;
}

export default function WaveClipText({ text, className = '' }: WaveClipTextProps) {
  return (
    <div className={`relative ${className}`}>
      <h2 className="text-8xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-transparent [-webkit-text-stroke:2px_#03a9f4]">
        {text}
      </h2>
      <h2 className="text-8xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#03a9f4] animate-wave-clip">
        {text}
      </h2>
    </div>
  );
}
