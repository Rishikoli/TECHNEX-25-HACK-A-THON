'use client';

import { useState, useEffect } from 'react';
import { SpeechToText } from '../SpeechRecognition/SpeechToText';
import { AlertCircle, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveTranscriptProps {
  isActive: boolean;
  onTranscriptUpdate: (transcript: string) => void;
}

export const LiveTranscript = ({ isActive, onTranscriptUpdate }: LiveTranscriptProps) => {
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (transcript) {
      onTranscriptUpdate(transcript.trim());
    }
  }, [transcript, onTranscriptUpdate]);

  const handleTranscriptUpdate = (newTranscript: string) => {
    setTranscript(prev => prev + ' ' + newTranscript);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    // Clear error after 5 seconds
    setTimeout(() => setError(null), 5000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Transcript</h3>
        <div className="flex items-center">
          <motion.div
            animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
            transition={{ repeat: isActive ? Infinity : 0, duration: 1.5 }}
          >
            <Mic className={`w-5 h-5 ${isActive ? 'text-red-500' : 'text-gray-400'}`} />
          </motion.div>
          {isActive && <span className="ml-2 text-sm text-gray-500">Recording...</span>}
        </div>
      </div>

      <div className="relative">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-0 left-0 right-0 bg-red-50 text-red-600 p-3 rounded-lg mb-3 flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`min-h-[100px] max-h-[200px] overflow-y-auto p-3 rounded-lg bg-gray-50 ${error ? 'mt-16' : ''}`}>
          {transcript || (
            <span className="text-gray-400">
              {isActive ? 'Listening... Start speaking' : 'Click "Start Recording" to begin'}
            </span>
          )}
        </div>
      </div>

      <SpeechToText
        isActive={isActive}
        onTranscriptUpdate={handleTranscriptUpdate}
        onError={handleError}
      />
    </div>
  );
};
