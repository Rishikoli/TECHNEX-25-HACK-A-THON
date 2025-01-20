'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

interface LiveTranscriptProps {
  isActive: boolean;
  onTranscriptUpdate: (transcript: string) => void;
}

export const LiveTranscript = ({ isActive, onTranscriptUpdate }: LiveTranscriptProps) => {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!isActive) {
      setTranscript('');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const transcriptText = result[0].transcript;
      
      setTranscript(prev => {
        const newTranscript = prev + ' ' + transcriptText;
        onTranscriptUpdate(newTranscript.trim());
        return newTranscript;
      });
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isActive, onTranscriptUpdate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        <Mic className={`w-5 h-5 ${isActive ? 'text-green-500' : 'text-gray-400'} mr-2`} />
        <h3 className="text-lg font-semibold">Live Transcript</h3>
      </div>
      <div className="min-h-[100px] max-h-[200px] overflow-y-auto bg-gray-50 rounded-lg p-4">
        {transcript ? (
          <p className="text-gray-700">{transcript}</p>
        ) : (
          <p className="text-gray-400 italic">
            {isActive ? 'Listening... Start speaking' : 'Click Start Recording to begin'}
          </p>
        )}
      </div>
    </motion.div>
  );
};
