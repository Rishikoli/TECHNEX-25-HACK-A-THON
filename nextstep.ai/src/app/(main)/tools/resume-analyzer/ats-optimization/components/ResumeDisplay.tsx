'use client';

import { motion } from 'framer-motion';

interface ResumeDisplayProps {
  content: string;
}

export default function ResumeDisplay({ content }: ResumeDisplayProps) {
  // Split content into sections based on line breaks and empty lines
  const sections = content.split(/\n\s*\n/).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm p-8 font-[system-ui] leading-relaxed print:shadow-none print:p-0"
    >
      {sections.map((section, index) => {
        const lines = section.split('\n');
        const isHeader = lines[0].toUpperCase() === lines[0];
        const isContact = index === 0; // Assuming first section is contact info

        if (isContact) {
          return (
            <div key={index} className="text-center mb-8 space-y-2 print:mb-6">
              <h1 className="text-2xl font-bold text-gray-800">{lines[0]}</h1>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-gray-600">
                {lines.slice(1).map((line, i) => (
                  <span key={i} className="whitespace-nowrap">{line}</span>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div key={index} className="mb-6 last:mb-0 print:mb-4">
            {lines.map((line, lineIndex) => {
              // Check if line is a section header
              if (lineIndex === 0 && isHeader) {
                return (
                  <h2 key={lineIndex} className="text-lg font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">
                    {line}
                  </h2>
                );
              }

              // Check if line contains a company name and date
              if (line.match(/\([0-9]{2}\/[0-9]{4}/)) {
                const [title, date] = line.split('(').map(s => s.trim());
                return (
                  <div key={lineIndex} className="text-gray-800 font-medium mb-2">
                    <span>{title}</span>
                    <span className="text-gray-500 ml-2">({date}</span>
                  </div>
                );
              }
              
              // Check if line is a bullet point
              if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                return (
                  <div key={lineIndex} className="flex items-start gap-3 mb-2 last:mb-0 pl-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    <span className="text-gray-700 flex-grow">
                      {line.replace(/^[•-]\s*/, '')}
                    </span>
                  </div>
                );
              }

              // Check if line might be a company name or institution
              if (line.match(/^[A-Z][a-zA-Z\s&,.]+$/)) {
                return (
                  <div key={lineIndex} className="text-gray-800 font-medium mb-1">
                    {line}
                  </div>
                );
              }

              // Regular text
              return (
                <div key={lineIndex} className="text-gray-700 mb-1 last:mb-0">
                  {line}
                </div>
              );
            })}
          </div>
        );
      })}
    </motion.div>
  );
}
