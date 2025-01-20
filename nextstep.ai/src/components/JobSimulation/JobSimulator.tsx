'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoFeedback } from './VideoFeedback';
import { LiveTranscript } from './LiveTranscript';
import { AIFeedback } from './AIFeedback';
import { PracticeNotes } from './PracticeNotes';
import { Play, Pause, StopCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
  expectedDuration: number;
}

interface JobSimulatorProps {
  questions: Question[];
  jobTitle: string;
}

export const JobSimulator = ({ questions, jobTitle }: JobSimulatorProps) => {
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulationActive) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSimulationActive]);

  const startSimulation = () => {
    setIsSimulationActive(true);
    setCurrentQuestion(questions[0]);
    setTimer(0);
  };

  const stopSimulation = () => {
    setIsSimulationActive(false);
    setCurrentQuestion(null);
    setTimer(0);
  };

  const nextQuestion = () => {
    if (!currentQuestion) return;
    
    const nextIndex = questions.findIndex(q => q.id === currentQuestion.id) + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestion(questions[nextIndex]);
      setTranscript('');
      setIsAnalyzing(false);
      setVideoBlob(null);
    } else {
      stopSimulation();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoData = (blob: Blob) => {
    setVideoBlob(blob);
    setIsAnalyzing(true);
    // Here you would typically upload the video for AI analysis
    setTimeout(() => setIsAnalyzing(false), 2000); // Simulated analysis time
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {jobTitle} Interview Simulation
        </h2>
        <p className="text-gray-600">Practice with real interview scenarios and get AI-powered feedback</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Video Feedback Section */}
          <VideoFeedback 
            isRecording={isSimulationActive} 
            onVideoData={handleVideoData}
          />

          {/* Question and Controls */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Current Question</h3>
              <div className="text-lg font-mono">{formatTime(timer)}</div>
            </div>

            {currentQuestion ? (
              <div className="mb-4">
                <p className="text-gray-900 mb-2">{currentQuestion.text}</p>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>Category: {currentQuestion.category}</span>
                  <span>Difficulty: {currentQuestion.difficulty}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">Click Start to begin the simulation</p>
            )}

            <div className="flex space-x-4">
              {!isSimulationActive ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startSimulation}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Simulation
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextQuestion}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Next Question
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopSimulation}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <StopCircle className="w-4 h-4 mr-2" />
                    End Simulation
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Live Transcript */}
          <LiveTranscript 
            isActive={isSimulationActive}
            onTranscriptUpdate={setTranscript}
          />

          {/* AI Feedback */}
          <AIFeedback 
            transcript={transcript}
            videoBlob={videoBlob || undefined}
            isAnalyzing={isAnalyzing}
          />

          {/* Practice Notes */}
          <PracticeNotes />
        </div>
      </div>
    </div>
  );
};
