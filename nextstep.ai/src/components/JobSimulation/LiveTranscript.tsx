'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

interface LiveTranscriptProps {
  isActive: boolean;
  onTranscriptUpdate?: (transcript: string) => void;
}

export const LiveTranscript = ({ isActive, onTranscriptUpdate }: LiveTranscriptProps) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
          if (onTranscriptUpdate) {
            onTranscriptUpdate(currentTranscript);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscriptUpdate]);

  useEffect(() => {
    if (isActive && !isListening && recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    } else if (!isActive && isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isActive, isListening]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Transcript</h3>
        <div className="flex items-center space-x-2">
          {isListening ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Mic className="w-5 h-5 text-blue-600" />
            </motion.div>
          ) : (
            <MicOff className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      
      <div className="h-48 overflow-y-auto bg-gray-50 rounded p-3">
        {transcript ? (
          <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p>
        ) : (
          <p className="text-gray-400 italic">Start speaking to see the transcript...</p>
        )}
      </div>
    </div>
  );
};
