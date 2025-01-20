'use client';

import { useEffect, useRef, useState } from 'react';

interface SpeechToTextProps {
  isActive: boolean;
  onTranscriptUpdate: (transcript: string) => void;
  onError?: (error: string) => void;
}

export const SpeechToText = ({ isActive, onTranscriptUpdate, onError }: SpeechToTextProps) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [errorCount, setErrorCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      onError?.('Speech recognition is not supported in this browser');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    // Configure recognition
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Event handlers
    recognition.onstart = () => {
      setIsListening(true);
      setErrorCount(0);
      console.log('Speech recognition started');
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Speech recognition ended');
      
      // Restart if still active and within retry limit
      if (isActive && errorCount < maxRetries) {
        try {
          recognition.start();
        } catch (error) {
          console.error('Error restarting recognition:', error);
        }
      }
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        onTranscriptUpdate(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setErrorCount(prev => prev + 1);

      switch (event.error) {
        case 'no-speech':
          onError?.('No speech detected. Please speak more clearly.');
          break;
        case 'audio-capture':
          onError?.('No microphone detected. Please check your microphone settings.');
          break;
        case 'not-allowed':
          onError?.('Microphone access denied. Please allow microphone access.');
          break;
        case 'network':
          onError?.('Network error occurred. Please check your internet connection.');
          break;
        default:
          onError?.(`Error: ${event.error}`);
      }

      // Attempt to restart recognition if within retry limit
      if (errorCount < maxRetries) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.error('Error restarting recognition after error:', error);
          }
        }, 1000);
      }
    };

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isActive && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    } else if (!isActive && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  }, [isActive, isListening]);

  return null;
};
