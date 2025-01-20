'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Activity, MessageSquare, Volume2, AlertCircle, ThumbsUp, Zap } from 'lucide-react';

interface AIFeedbackProps {
  transcript: string;
  isAnalyzing: boolean;
  emotion?: string;
}

interface FeedbackMetrics {
  answerQuality: number;
  speakingPace: number;
  bodyLanguage: number;
  confidence: number;
}

interface Tip {
  id: number;
  type: 'improvement' | 'positive';
  message: string;
  category: 'answer' | 'pace' | 'body' | 'confidence';
}

export const AIFeedback = ({ transcript, isAnalyzing, emotion = 'neutral' }: AIFeedbackProps) => {
  const [metrics, setMetrics] = useState<FeedbackMetrics>({
    answerQuality: 0,
    speakingPace: 0,
    bodyLanguage: 0,
    confidence: 0,
  });

  const [tips, setTips] = useState<Tip[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (transcript && !startTime) {
      setStartTime(Date.now());
    }
  }, [transcript]);

  useEffect(() => {
    if (transcript) {
      const words = transcript.trim().split(/\s+/).length;
      setWordCount(words);

      if (startTime) {
        const minutes = (Date.now() - startTime) / 60000;
        const wpm = Math.round(words / minutes);
        setWordsPerMinute(wpm);

        // Update speaking pace metric
        const optimalWPM = 150; // Ideal speaking pace
        const paceScore = Math.max(0, Math.min(1, 1 - Math.abs(wpm - optimalWPM) / optimalWPM));
        
        // Update metrics based on various factors
        setMetrics(prev => ({
          ...prev,
          speakingPace: paceScore,
          answerQuality: calculateAnswerQuality(transcript),
          bodyLanguage: calculateBodyLanguageScore(emotion),
          confidence: calculateConfidenceScore(emotion, wpm)
        }));

        // Generate real-time tips
        generateTips(transcript, wpm, emotion);
      }
    }
  }, [transcript, emotion]);

  const calculateAnswerQuality = (text: string): number => {
    // Simple metrics for answer quality
    const words = text.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words).size;
    const wordVariety = uniqueWords / words.length;
    
    // Check for filler words
    const fillerWords = ['um', 'uh', 'like', 'you know', 'sort of'];
    const fillerCount = fillerWords.reduce((count, filler) => 
      count + (text.toLowerCase().match(new RegExp(filler, 'g')) || []).length, 0);
    
    const fillerPenalty = Math.max(0, 1 - (fillerCount / words.length) * 5);
    
    return Math.min(1, (wordVariety + fillerPenalty) / 2);
  };

  const calculateBodyLanguageScore = (emotion: string): number => {
    const positiveEmotions = ['happy', 'neutral', 'surprised'];
    const negativeEmotions = ['angry', 'sad', 'fearful', 'disgusted'];
    
    if (positiveEmotions.includes(emotion)) {
      return 0.8;
    } else if (negativeEmotions.includes(emotion)) {
      return 0.4;
    }
    return 0.6;
  };

  const calculateConfidenceScore = (emotion: string, wpm: number): number => {
    const emotionScore = emotion === 'neutral' || emotion === 'happy' ? 0.8 : 0.5;
    const paceScore = wpm > 120 && wpm < 180 ? 0.8 : 0.5;
    return (emotionScore + paceScore) / 2;
  };

  const generateTips = (text: string, wpm: number, emotion: string) => {
    const newTips: Tip[] = [];

    // Speaking pace tips
    if (wpm < 120) {
      newTips.push({
        id: Date.now(),
        type: 'improvement',
        message: 'Try speaking a bit faster to maintain engagement',
        category: 'pace'
      });
    } else if (wpm > 180) {
      newTips.push({
        id: Date.now() + 1,
        type: 'improvement',
        message: 'Slow down slightly to improve clarity',
        category: 'pace'
      });
    } else {
      newTips.push({
        id: Date.now() + 2,
        type: 'positive',
        message: 'Great speaking pace!',
        category: 'pace'
      });
    }

    // Answer quality tips
    if (text.toLowerCase().includes('um') || text.toLowerCase().includes('uh')) {
      newTips.push({
        id: Date.now() + 3,
        type: 'improvement',
        message: 'Try to reduce filler words like "um" and "uh"',
        category: 'answer'
      });
    }

    // Body language tips based on emotion
    if (emotion === 'neutral' || emotion === 'happy') {
      newTips.push({
        id: Date.now() + 4,
        type: 'positive',
        message: 'Your facial expressions show good engagement',
        category: 'body'
      });
    } else {
      newTips.push({
        id: Date.now() + 5,
        type: 'improvement',
        message: 'Try to maintain a more positive facial expression',
        category: 'body'
      });
    }

    setTips(prev => [...prev.slice(-4), ...newTips]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Real-time Analysis</h3>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center text-blue-600 mb-2">
            <Brain className="w-4 h-4 mr-2" />
            Answer Quality
          </div>
          <div className="h-2 bg-blue-100 rounded-full">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${metrics.answerQuality * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center text-green-600 mb-2">
            <Volume2 className="w-4 h-4 mr-2" />
            Speaking Pace
          </div>
          <div className="h-2 bg-green-100 rounded-full">
            <motion.div
              className="h-full bg-green-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${metrics.speakingPace * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-sm text-green-600 mt-1">
            {wordsPerMinute} words/min
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-3">
          <div className="flex items-center text-purple-600 mb-2">
            <Activity className="w-4 h-4 mr-2" />
            Body Language
          </div>
          <div className="h-2 bg-purple-100 rounded-full">
            <motion.div
              className="h-full bg-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${metrics.bodyLanguage * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-3">
          <div className="flex items-center text-orange-600 mb-2">
            <MessageSquare className="w-4 h-4 mr-2" />
            Confidence
          </div>
          <div className="h-2 bg-orange-100 rounded-full">
            <motion.div
              className="h-full bg-orange-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${metrics.confidence * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Real-time Tips */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">Real-time Tips</h4>
        <AnimatePresence mode="popLayout">
          {tips.map((tip) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`flex items-start space-x-2 p-2 rounded ${
                tip.type === 'improvement' 
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {tip.type === 'improvement' ? (
                <AlertCircle className="w-4 h-4 mt-0.5" />
              ) : (
                <ThumbsUp className="w-4 h-4 mt-0.5" />
              )}
              <span className="text-sm">{tip.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="flex items-center justify-center py-4">
          <Zap className="w-5 h-5 text-blue-600 animate-pulse mr-2" />
          <span className="text-blue-600">Analyzing response...</span>
        </div>
      )}
    </div>
  );
};
