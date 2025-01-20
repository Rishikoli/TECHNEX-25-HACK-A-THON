'use client';

import { motion } from 'framer-motion';
import { Mic, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TranscriptionPanelProps {
  isRecording: boolean;
  onTranscriptionUpdate: (text: string) => void;
}

export function TranscriptionPanel({ isRecording, onTranscriptionUpdate }: TranscriptionPanelProps) {
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = finalTranscript + interimTranscript;
        setTranscript(fullTranscript);
        onTranscriptionUpdate(fullTranscript);
      };

      recognition.onerror = (event: any) => {
        setError('Error occurred in speech recognition: ' + event.error);
      };

      setRecognition(recognition);
    } else {
      setError('Speech recognition is not supported in this browser');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onTranscriptionUpdate]);

  useEffect(() => {
    if (recognition) {
      if (isRecording) {
        recognition.start();
      } else {
        recognition.stop();
        setTranscript('');
      }
    }
  }, [isRecording, recognition]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center text-red-800">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Transcription</h3>
        {isRecording && (
          <div className="flex items-center text-emerald-500">
            <Mic className="w-5 h-5 mr-2" />
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Recording...
            </motion.div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 min-h-[100px] max-h-[200px] overflow-y-auto">
        {transcript ? (
          <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p>
        ) : (
          <p className="text-gray-500 italic">
            {isRecording
              ? 'Listening for speech...'
              : 'Start recording to see transcription'}
          </p>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>
          {isRecording
            ? 'Speak clearly and at a moderate pace for best results'
            : 'Press record to start the interview'}
        </p>
      </div>
    </motion.div>
  );
}
