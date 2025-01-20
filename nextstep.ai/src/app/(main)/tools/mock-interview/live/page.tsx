'use client';

import { useState, useCallback, useEffect } from 'react';
import { VideoRecorder } from './components/VideoRecorder';
import { AIAvatar } from './components/AIAvatar';
import { QuestionPanel } from './components/QuestionPanel';
import { FeedbackPanel } from './components/FeedbackPanel';
import { TranscriptionPanel } from './components/TranscriptionPanel';
import { AnswerImprovement } from './components/AnswerImprovement';
import { analyzeInterview, generateFollowUpQuestion, provideLiveCoachingTips } from './lib/gemini';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

export default function LiveInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [aiMessage, setAIMessage] = useState('Hello! I\'m your AI interviewer. Let\'s begin with your introduction. Tell me about yourself and your background.');
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [bodyLanguageData, setBodyLanguageData] = useState<any>(null);
  const [coachingTip, setCoachingTip] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');

  // Handle real-time coaching tips
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isRecording && transcript && !error) {
      timeoutId = setTimeout(async () => {
        try {
          const tip = await provideLiveCoachingTips(transcript);
          setCoachingTip(tip);
          setError(null);
        } catch (error) {
          console.error('Error getting coaching tip:', error);
          setError('Failed to generate coaching tip. The interview will continue.');
        }
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isRecording, transcript, error]);

  const handleRecordingStart = useCallback(() => {
    setIsRecording(true);
    setFeedback(null);
    setCoachingTip(null);
    setError(null);
    if (!interviewStarted) {
      setInterviewStarted(true);
    }
  }, [interviewStarted]);

  const handleRecordingStop = useCallback(async (blob: Blob) => {
    setIsRecording(false);
    setIsAnalyzing(true);
    setError(null);

    try {
      // Analyze the interview response
      const analysis = await analyzeInterview(
        currentQuestion || 'Tell me about yourself',
        transcript,
        transcript,
        bodyLanguageData
      );

      setFeedback(analysis);

      // Generate follow-up question if score is good or if it's the first question
      if (analysis.score > 70 || previousQuestions.length === 0) {
        try {
          const followUp = await generateFollowUpQuestion(
            currentQuestion || 'Tell me about yourself',
            transcript,
            previousQuestions
          );
          
          setPreviousQuestions(prev => [...prev, currentQuestion || 'Tell me about yourself']);
          setCurrentQuestion(followUp);
          setAIMessage(followUp);
        } catch (error) {
          console.error('Error generating follow-up:', error);
          setError('Failed to generate follow-up question. You can select a new question from the panel.');
        }
      } else {
        setAIMessage('Consider trying another question. You can select one from the question panel.');
      }
    } catch (error) {
      console.error('Error analyzing interview:', error);
      setError('Failed to analyze response. Please try again or select a different question.');
      setFeedback({
        score: 0,
        strengths: ['Unable to analyze response'],
        improvements: ['Please try again'],
        technicalAccuracy: 0,
        communicationClarity: 0,
        confidence: 0,
        bodyLanguage: ['Analysis unavailable']
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [currentQuestion, transcript, bodyLanguageData, previousQuestions]);

  const handleQuestionSelect = useCallback((question: string) => {
    if (!isRecording) {
      setCurrentQuestion(question);
      setAIMessage(question);
      setPreviousQuestions(prev => [...prev, question]);
      setError(null);
    }
  }, [isRecording]);

  const handleTranscriptionUpdate = useCallback((text: string) => {
    setTranscript(text);
    setCurrentAnswer(text);
    setError(null);
  }, []);

  const handleBodyLanguageUpdate = useCallback((data: any) => {
    setBodyLanguageData(data);
  }, []);

  const handleMessageComplete = useCallback(() => {
    // Optional: Add any actions after AI finishes speaking
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center text-red-800">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                autoPlay={!interviewStarted}
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

            {coachingTip && !error && (
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

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
              <div className="min-h-[200px] bg-gray-50 rounded-lg p-4">
                <p className="whitespace-pre-wrap">{currentAnswer}</p>
              </div>
            </div>

            {feedback && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">AI Feedback</h3>
                <div className="space-y-4">
                  {Object.entries(feedback).map(([category, score], index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 capitalize">{category.replace('_', ' ')}</span>
                        <span className="text-sm font-medium text-gray-900">{score}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(score / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <AnswerImprovement
              currentQuestion={currentQuestion}
              currentAnswer={currentAnswer}
            />

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
