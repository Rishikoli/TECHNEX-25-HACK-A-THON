'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { VideoRecorder } from './VideoRecording/VideoRecorder';
import { InterviewAnalytics } from './Analytics/InterviewAnalytics';
import { LiveTranscript } from './LiveTranscript/LiveTranscript';
import { AITips } from './AITips/AITips';
import { AIFeedback } from './AIFeedback/AIFeedback';
import { SavedRecordings } from './SavedRecordings/SavedRecordings';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  MicOff,
  MessageSquare,
  Brain,
  Timer,
  ChevronRight,
  Sparkles,
  Target
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
  expectedDuration: number;
}

interface Recording {
  id: string;
  blob: Blob;
  timestamp: Date;
  duration: number;
  questionId: number;
  transcript: string;
}

interface MockInterviewProps {
  questions: Question[];
  type: 'behavioral' | 'technical';
}

export const MockInterview = ({ questions, type }: MockInterviewProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [savedRecordings, setSavedRecordings] = useState<Recording[]>([]);
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
  
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        recognition.current.lang = 'en-US';

        recognition.current.onresult = (event) => {
          let interim = '';
          let final = '';

          for (let i = 0; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript + ' ';
            } else {
              interim += event.results[i][0].transcript + ' ';
            }
          }

          setCurrentTranscript(interim);
          if (final) {
            setFinalTranscript(prev => prev + final);
          }
        };

        recognition.current.onerror = (event) => {
          console.error('Speech Recognition Error:', event.error);
          setIsSpeechRecognitionActive(false);
        };

        recognition.current.onend = () => {
          setIsSpeechRecognitionActive(false);
        };
      }
    }

    return () => {
      if (recognition.current) {
        try {
          recognition.current.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
    };
  }, []);

  const startSpeechRecognition = () => {
    if (!recognition.current || isSpeechRecognitionActive) return;

    try {
      recognition.current.start();
      setIsSpeechRecognitionActive(true);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopSpeechRecognition = () => {
    if (!recognition.current || !isSpeechRecognitionActive) return;

    try {
      recognition.current.stop();
      setIsSpeechRecognitionActive(false);
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };

  const resetTranscript = () => {
    setCurrentTranscript('');
    setFinalTranscript('');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetTranscript();
      stopSpeechRecognition();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      resetTranscript();
      stopSpeechRecognition();
    }
  };

  const displayTranscript = useMemo(() => {
    return (finalTranscript + ' ' + currentTranscript).trim();
  }, [finalTranscript, currentTranscript]);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaChunksRef = useRef<Blob[]>([]);
  const transcriptTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          mediaChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(mediaChunksRef.current, { type: 'audio/webm' });
        handleSaveRecording(blob);
        mediaChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setInterviewStarted(true);
      setIsPaused(false);

      // Start speech recognition
      startSpeechRecognition();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(true);
      
      stopSpeechRecognition();
    }
  };

  const resumeRecording = () => {
    startRecording();
  };

  const resetInterview = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    stopSpeechRecognition();
    setIsRecording(false);
    setIsPaused(false);
    resetTranscript();
    setCurrentQuestionIndex(0);
    setElapsedTime(0);
    setInterviewStarted(false);
    mediaChunksRef.current = [];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveRecording = (blob: Blob) => {
    const newRecording: Recording = {
      id: Date.now().toString(),
      blob,
      timestamp: new Date(),
      duration: elapsedTime,
      questionId: questions[currentQuestionIndex].id,
      transcript: displayTranscript
    };
    setSavedRecordings(prev => [...prev, newRecording]);
  };

  const handlePlayRecording = (recording: Recording) => {
    const url = URL.createObjectURL(recording.blob);
    const audio = new Audio(url);
    audio.play();
  };

  const handleDownloadRecording = (recording: Recording) => {
    const url = URL.createObjectURL(recording.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-recording-${recording.timestamp.toISOString()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDeleteRecording = (id: string) => {
    setSavedRecordings(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section with Gradient Background */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-8 text-white">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-6 h-6" />
                  <h1 className="text-3xl font-bold">
                    {type === 'behavioral' ? 'Behavioral' : 'Technical'} Interview
                  </h1>
                </div>
                <p className="text-white/80">
                  Master your interview skills with AI-powered feedback and real-time analytics
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <motion.div
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Timer className="w-4 h-4" />
                  <span className="font-medium">
                    {formatTime(elapsedTime)}
                  </span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetInterview}
                    className="hover:bg-white/20 text-white border border-white/20"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content - Left Side (3 columns) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Question Card with Enhanced Design */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="relative overflow-hidden bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-bl-full opacity-50 pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="text-sm font-medium text-gray-500">
                              Question {currentQuestionIndex + 1} of {questions.length}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full">
                                {questions[currentQuestionIndex]?.category || type}
                              </span>
                              <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
                                {questions[currentQuestionIndex]?.difficulty || 'Medium'}
                              </span>
                              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                                {Math.ceil(questions[currentQuestionIndex]?.expectedDuration / 60) || 2} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xl font-medium text-gray-900 leading-relaxed">
                          {questions[currentQuestionIndex]?.text || 'Loading question...'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Video Recorder */}
            <VideoRecorder
              onRecordingComplete={(blob) => {
                setSavedRecordings(prev => [...prev, { 
                  blob,
                  timestamp: new Date(),
                  question: questions[currentQuestionIndex]?.text || ''
                }]);
              }}
              onRecordingStart={() => {
                setIsRecording(true);
                resetTranscript();
                startSpeechRecognition();
              }}
              onRecordingStop={() => {
                setIsRecording(false);
                stopSpeechRecognition();
              }}
            />

            {/* Controls with Enhanced Design */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {interviewStarted ? 'Resume' : 'Start'} Recording
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseRecording}
                      variant="outline"
                      className="border-2"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  )}
                </motion.div>
                {isRecording && (
                  <span className="text-sm text-gray-500">
                    Capturing your response...
                  </span>
                )}
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                >
                  Next Question
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Live Transcript */}
            <LiveTranscript 
              transcript={displayTranscript}
              isRecording={isRecording}
            />

            {/* Saved Recordings */}
            <SavedRecordings
              recordings={savedRecordings}
              onPlay={handlePlayRecording}
              onDelete={handleDeleteRecording}
              onDownload={handleDownloadRecording}
            />
          </div>

          {/* Right Side - Analytics and Feedback (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="sticky top-6 space-y-6">
              {/* Real-time Metrics */}
              <AITips
                transcript={displayTranscript}
                isRecording={isRecording}
                question={questions[currentQuestionIndex]?.text || ''}
                type={type}
              />

              {/* AI Feedback and Improvements */}
              <AIFeedback
                transcript={displayTranscript}
                question={questions[currentQuestionIndex]?.text || ''}
                type={type}
                isRecording={isRecording}
              />

              {/* Performance Analytics */}
              <InterviewAnalytics 
                transcript={displayTranscript}
                isRecording={isRecording}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
