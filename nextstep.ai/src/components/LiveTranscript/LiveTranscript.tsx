import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface LiveTranscriptProps {
  transcript: string;
  isRecording: boolean;
}

export const LiveTranscript = ({ transcript, isRecording }: LiveTranscriptProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900">Live Transcript</h3>
        </div>
        {isRecording && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500">Recording</span>
          </div>
        )}
      </div>
      <div className="relative min-h-[100px] max-h-[200px] overflow-y-auto bg-gray-50 rounded-lg p-4">
        {transcript ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-700 leading-relaxed"
          >
            {transcript}
          </motion.p>
        ) : (
          <p className="text-gray-400 italic">
            {isRecording ? "Start speaking..." : "Transcript will appear here..."}
          </p>
        )}
      </div>
    </div>
  );
};
