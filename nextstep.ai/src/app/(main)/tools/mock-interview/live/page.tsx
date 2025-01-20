'use client';

import { useState, useCallback, useEffect } from 'react';
import { VideoRecorder } from './components/VideoRecorder';
import { AIAvatar } from './components/AIAvatar';
import { QuestionPanel } from './components/QuestionPanel';
import { FeedbackPanel } from './components/FeedbackPanel';
import { TranscriptionPanel } from './components/TranscriptionPanel';
import { analyzeInterview, generateFollowUpQuestion, provideLiveCoachingTips } from './lib/gemini';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LiveInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [aiMessage, setAIMessage] = useState('Hello! I\'m your AI interviewer. Ready to begin?');
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [bodyLanguageData, setBodyLanguageData] = useState<any>(null);
  const [coachingTip, setCoachingTip] = useState<string | null>(null);

  // Handle real-time coaching tips
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isRecording && transcript) {
      timeoutId = setTimeout(async () => {
        try {
          const tip = await provideLiveCoachingTips(transcript);
          setCoachingTip(tip);
        } catch (error) {
          console.error('Error getting coaching tip:', error);
        }
      }, 5000); // Update coaching tip every 5 seconds
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isRecording, transcript]);

  const handleRecordingStart = useCallback(() => {
    setIsRecording(true);
    setFeedback(null);
    setCoachingTip(null);
  }, []);

  const handleRecordingStop = useCallback(async (blob: Blob) => {
    setIsRecording(false);
    setIsAnalyzing(true);

    try {
      // Analyze the interview response
      const analysis = await analyzeInterview(
        currentQuestion,
        transcript,
        transcript, // Using transcript for both since we have speech-to-text
        bodyLanguageData
      );

      setFeedback(analysis);

      // Generate follow-up question if score is good
      if (analysis.score > 70) {
        const followUp = await generateFollowUpQuestion(
          currentQuestion,
          transcript,
          previousQuestions
        );
        
        setPreviousQuestions(prev => [...prev, currentQuestion]);
        setCurrentQuestion(followUp);
        setAIMessage(followUp);
      }
    } catch (error) {
      console.error('Error analyzing interview:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [currentQuestion, transcript, bodyLanguageData, previousQuestions]);

  const handleQuestionSelect = useCallback((question: string) => {
    setCurrentQuestion(question);
    setAIMessage(question);
    setPreviousQuestions(prev => [...prev, question]);
  }, []);

  const handleTranscriptionUpdate = useCallback((text: string) => {
    setTranscript(text);
  }, []);

  const handleBodyLanguageUpdate = useCallback((data: any) => {
    setBodyLanguageData(data);
  }, []);

  const handleMessageComplete = () => {
    // Handle when AI finishes speaking
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <VideoRecorder
                onRecordingStart={handleRecordingStart}
                onRecordingStop={handleRecordingStop}
                onBodyLanguageUpdate={handleBodyLanguageUpdate}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AIAvatar
                isActive={!isRecording}
                message={aiMessage}
                onMessageComplete={handleMessageComplete}
                autoPlay={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TranscriptionPanel
                isRecording={isRecording}
                onTranscriptionUpdate={handleTranscriptionUpdate}
              />
            </motion.div>

            {coachingTip && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <p className="text-blue-800">
                  <strong>Coaching Tip:</strong> {coachingTip}
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <QuestionPanel
                isRecording={isRecording}
                onQuestionSelect={handleQuestionSelect}
              />
            </motion.div>

            {isAnalyzing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600">Analyzing your interview response...</p>
              </motion.div>
            ) : (
              <FeedbackPanel feedback={feedback} isLoading={isAnalyzing} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
