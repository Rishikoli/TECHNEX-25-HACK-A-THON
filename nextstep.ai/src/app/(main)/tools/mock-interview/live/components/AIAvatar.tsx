'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Volume2, VolumeX, Settings } from 'lucide-react';
import { generateSpeech, speakWithWebSpeech } from '../lib/voiceService';

interface AIAvatarProps {
  message: string;
  isActive: boolean;
  autoPlay?: boolean;
  onMessageComplete?: () => void;
}

export function AIAvatar({
  message,
  isActive,
  autoPlay = true,
  onMessageComplete
}: AIAvatarProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [useElevenLabs, setUseElevenLabs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isActive && audioEnabled && autoPlay) {
      speakMessage(message);
    }
  }, [message, isActive, audioEnabled, autoPlay]);

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => {
        setIsSpeaking(false);
        onMessageComplete?.();
      };
      audioRef.current.onerror = () => {
        setError('Failed to play audio');
        setIsSpeaking(false);
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onMessageComplete]);

  const speakMessage = async (text: string) => {
    if (!audioEnabled) return;

    try {
      setIsSpeaking(true);
      setError(null);

      if (useElevenLabs) {
        try {
          const { audioUrl } = await generateSpeech(text);
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            await audioRef.current.play();
          }
        } catch (error) {
          console.error('ElevenLabs error, falling back to Web Speech:', error);
          setUseElevenLabs(false);
          await speakWithWebSpeech(text);
          setIsSpeaking(false);
          onMessageComplete?.();
        }
      } else {
        await speakWithWebSpeech(text);
        setIsSpeaking(false);
        onMessageComplete?.();
      }
    } catch (error) {
      console.error('Speech error:', error);
      setError('Failed to generate speech');
      setIsSpeaking(false);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (isSpeaking) {
      if (useElevenLabs && audioRef.current) {
        audioRef.current.pause();
      } else {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  };

  const toggleVoiceService = () => {
    setUseElevenLabs(!useElevenLabs);
    if (isSpeaking) {
      if (useElevenLabs && audioRef.current) {
        audioRef.current.pause();
      } else {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="relative">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center"
              animate={{
                scale: isSpeaking ? [1, 1.1, 1] : 1
              }}
              transition={{
                duration: 1,
                repeat: isSpeaking ? Infinity : 0
              }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
            {isSpeaking && (
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="inline-flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                      animate={{
                        y: [0, -3, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </span>
              </motion.div>
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Interviewer</h3>
            <p className="text-sm text-gray-500">
              {isSpeaking ? 'Speaking...' : 'Ready to assist'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleVoiceService}
            className={`p-2 rounded-full transition-colors ${
              useElevenLabs
                ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={useElevenLabs ? 'Using ElevenLabs' : 'Using Web Speech'}
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full transition-colors ${
              audioEnabled
                ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {audioEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <p className="text-gray-700">{message}</p>
        </motion.div>
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-red-500 text-sm"
        >
          {error}
        </motion.div>
      )}

      {!isActive && !isSpeaking && (
        <div className="mt-4">
          <button
            onClick={() => speakMessage(message)}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Replay message
          </button>
        </div>
      )}
    </div>
  );
}
