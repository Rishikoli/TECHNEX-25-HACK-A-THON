'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { VideoFeedback } from '@/components/JobSimulation/VideoFeedback';
import { LiveTranscript } from '@/components/JobSimulation/LiveTranscript';
import { AIFeedback } from '@/components/JobSimulation/AIFeedback';
import { PracticeNotes } from '@/components/JobSimulation/PracticeNotes';
import { Briefcase, Video, MessageSquare, Brain } from 'lucide-react';
import { FaceRadar } from '@/components/FaceDetection/FaceRadar';
import { QuestionPanel } from '@/components/QuestionPanel/QuestionPanel';
import { VideoRecorder } from '@/components/VideoRecording/VideoRecorder';
import { AnswerFeedback } from '@/components/JobSimulation/AnswerFeedback';
import { InterviewAnalytics } from '@/components/Analytics/InterviewAnalytics';

interface InterviewQuestion {
  id: number;
  text: string;
  category: string;
  type: string;
  difficulty: string;
  expectedDuration: number;
}

interface InterviewType {
  id: string;
  title: string;
  description: string;
  icon: any;
  questions: InterviewQuestion[];
}

const interviewTypes: InterviewType[] = [
  {
    id: 'behavioral',
    title: 'Behavioral Interview',
    description: 'Practice answering questions about your past experiences and behavior in professional situations',
    icon: MessageSquare,
    questions: [
      {
        id: 1,
        text: "Tell me about a time when you had to deal with a difficult team member.",
        category: "Teamwork",
        type: "behavioral",
        difficulty: "Medium",
        expectedDuration: 180
      },
      {
        id: 2,
        text: "Describe a situation where you had to meet a tight deadline.",
        category: "Time Management",
        type: "behavioral",
        difficulty: "Medium",
        expectedDuration: 180
      },
      {
        id: 3,
        text: "Tell me about a project that failed and what you learned from it.",
        category: "Problem Solving",
        type: "behavioral",
        difficulty: "Hard",
        expectedDuration: 240
      },
      {
        id: 4,
        text: "How do you handle conflicts in the workplace?",
        category: "Conflict Resolution",
        type: "behavioral",
        difficulty: "Medium",
        expectedDuration: 180
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Interview',
    description: 'Practice technical questions, coding problems, and system design discussions',
    icon: Brain,
    questions: [
      {
        id: 1,
        text: "Explain how you would design a scalable web application.",
        category: "System Design",
        type: "technical",
        difficulty: "Hard",
        expectedDuration: 300
      },
      {
        id: 2,
        text: "How would you optimize a slow-performing database query?",
        category: "Database",
        type: "technical",
        difficulty: "Hard",
        expectedDuration: 240
      },
      {
        id: 3,
        text: "Explain the concept of microservices and their advantages.",
        category: "Architecture",
        type: "technical",
        difficulty: "Medium",
        expectedDuration: 240
      },
      {
        id: 4,
        text: "How would you implement authentication in a RESTful API?",
        category: "Security",
        type: "technical",
        difficulty: "Medium",
        expectedDuration: 180
      }
    ]
  },
  {
    id: 'simulation',
    title: 'Job Simulation',
    description: 'Complete real-world job scenarios and tasks with live feedback',
    icon: Briefcase,
    questions: [
      {
        id: 1,
        text: "You're leading a project that's behind schedule. How do you handle this situation?",
        category: "Project Management",
        type: "simulation",
        difficulty: "Hard",
        expectedDuration: 300
      },
      {
        id: 2,
        text: "Present your solution for improving our product's user engagement.",
        category: "Product Management",
        type: "simulation",
        difficulty: "Hard",
        expectedDuration: 300
      },
      {
        id: 3,
        text: "A critical production system has gone down. Walk us through your incident response.",
        category: "Crisis Management",
        type: "simulation",
        difficulty: "Hard",
        expectedDuration: 240
      },
      {
        id: 4,
        text: "Review this code and explain potential improvements and security concerns.",
        category: "Code Review",
        type: "simulation",
        difficulty: "Medium",
        expectedDuration: 180
      }
    ]
  }
];

export default function InterviewPrepPage() {
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startInterview = (type: InterviewType) => {
    setSelectedType(type);
    setCurrentQuestion(type.questions[0]);
  };

  const handleNextQuestion = () => {
    if (!selectedType || !currentQuestion) return;
    
    const currentIndex = selectedType.questions.findIndex(q => q.id === currentQuestion.id);
    if (currentIndex < selectedType.questions.length - 1) {
      setCurrentQuestion(selectedType.questions[currentIndex + 1]);
    } else {
      setSelectedType(null);
      setCurrentQuestion(null);
      setIsRecording(false);
    }
  };

  const handleVideoData = (blob: Blob) => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview Preparation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice interviews with AI-powered feedback, emotion analysis, and real-time transcription.
          </p>
        </div>

        {!selectedType ? (
          <div className="space-y-12">
            {interviewTypes.map((type) => (
              <div key={type.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <type.icon className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold">{type.title}</h3>
                      <p className="text-gray-600 mt-1">{type.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => startInterview(type)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Practice
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {type.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-gray-900 mb-2">{question.text}</p>
                          <div className="flex flex-wrap gap-2 text-sm">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
                              {question.category}
                            </span>
                            <span className={`px-2 py-1 rounded ${
                              question.difficulty === 'Hard'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {question.difficulty}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              {question.expectedDuration}s
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <button
              onClick={() => setSelectedType(null)}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              ← Back to Interview Types
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="relative">
                  <VideoRecorder
                    isRecording={isRecording}
                    onRecordingComplete={(blob) => handleVideoData(blob)}
                  />
                  <FaceRadar
                    videoRef={videoRef}
                    isActive={isRecording}
                  />
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Current Question</h3>
                    {currentQuestion && (
                      <>
                        <p className="text-gray-900 mb-2">{currentQuestion.text}</p>
                        <div className="flex space-x-4 text-sm text-gray-500">
                          <span>Category: {currentQuestion.category}</span>
                          <span>Difficulty: {currentQuestion.difficulty}</span>
                          <span>Time: {currentQuestion.expectedDuration}s</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        isRecording
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next Question
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <LiveTranscript
                  isActive={isRecording}
                  onTranscriptUpdate={setTranscript}
                />

                <InterviewAnalytics
                  transcript={transcript}
                  emotion={currentEmotion}
                  isRecording={isRecording}
                  duration={recordingTime}
                  expectedDuration={currentQuestion?.expectedDuration || 180}
                />

                <AIFeedback
                  transcript={transcript}
                  isAnalyzing={isAnalyzing}
                  emotion={currentEmotion}
                />

                {transcript && currentQuestion && (
                  <AnswerFeedback
                    transcript={transcript}
                    questionType={currentQuestion.type}
                    category={currentQuestion.category}
                  />
                )}

                <PracticeNotes />
              </div>
            </div>

            {selectedType && (
              <QuestionPanel
                questions={selectedType.questions}
                currentQuestionId={currentQuestion?.id || 0}
                onQuestionChange={(id) => {
                  const question = selectedType.questions.find(q => q.id === id);
                  if (question) {
                    setCurrentQuestion(question);
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
