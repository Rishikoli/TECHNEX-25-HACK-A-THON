'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { VideoRecorder } from './VideoRecording/VideoRecorder';
import { InterviewAnalytics } from './Analytics/InterviewAnalytics';
import { LiveTranscript } from './LiveTranscript/LiveTranscript';
import { AITips } from './AITips/AITips';
import { AIFeedback } from './AIFeedback/AIFeedback';
import { SavedRecordings } from './SavedRecordings/SavedRecordings';
import { ImprovementPanel } from '@/app/(main)/tools/mock-interview/components/ImprovementPanel';
import { ModelAnswer } from '@/app/(main)/tools/mock-interview/components/ModelAnswer';
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

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Interview Area - Takes up 2/3 of the space on large screens */}
      <div className="lg:col-span-2 space-y-6">
        {/* Question Card */}
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Question {currentQuestionIndex + 1}</h3>
              <p className="text-gray-600 mb-4">{currentQuestion.text}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  {currentQuestion.category}
                </span>
                <span className="flex items-center">
                  <Timer className="w-4 h-4 mr-1" />
                  {Math.floor(currentQuestion.expectedDuration / 60)} min
                </span>
              </div>
            </div>
          </div>
          
          {/* Video Recording Section */}
          <div className="mt-6">
            <VideoRecorder
              isRecording={isRecording}
              onRecordingComplete={handleSaveRecording}
            />
          </div>
        </Card>

        {/* Controls and Transcript */}
        <div className="space-y-6">
          <div className="flex gap-4 justify-center">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Recording
              </Button>
            ) : (
              <Button
                onClick={pauseRecording}
                variant="destructive"
              >
                <Pause className="w-4 h-4 mr-2" />
                Stop Recording
              </Button>
            )}
            <Button
              onClick={resetInterview}
              variant="outline"
              disabled={isRecording}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <LiveTranscript
            isActive={isRecording}
            onTranscriptUpdate={(transcript) => {
              setCurrentTranscript(transcript);
            }}
          />
        </div>

        {/* Analytics and Feedback */}
        <div className="space-y-6">
          <InterviewAnalytics />
          <AIFeedback />
          <SavedRecordings recordings={savedRecordings} onPlayRecording={handlePlayRecording} onDelete={handleDeleteRecording} onDownload={handleDownloadRecording} />
        </div>
      </div>

      {/* Right Sidebar - Takes up 1/3 of the space on large screens */}
      <div className="space-y-6">
        <ImprovementPanel transcript={displayTranscript} />
        <ModelAnswer question={currentQuestion.text} />
        <AITips />
      </div>
    </div>
  );
};
