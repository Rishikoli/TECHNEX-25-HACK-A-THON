'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Mic, MessageSquare, Settings, Clock, Play, Pause, StopCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
  expectedDuration: number; // in seconds
}

interface MockInterviewProps {
  type: 'behavioral' | 'technical' | 'industry';
  questions: Question[];
}

export const MockInterview = ({ type, questions }: MockInterviewProps) => {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        // Here you would typically upload the blob to your server
        console.log('Recording stopped, blob created:', blob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      alert('Failed to access camera/microphone. Please ensure you have granted the necessary permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const startInterview = async () => {
    setIsInterviewStarted(true);
    setCurrentQuestion(questions[0]);
    await startRecording();
    
    // Start the overall interview timer
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const startAnswering = () => {
    setIsAnswering(true);
    // You could start a separate timer for the current question here
  };

  const nextQuestion = () => {
    if (!currentQuestion) return;
    
    const nextIndex = questions.findIndex(q => q.id === currentQuestion.id) + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestion(questions[nextIndex]);
      setIsAnswering(false);
      provideFeedback();
    } else {
      endInterview();
    }
  };

  const endInterview = () => {
    stopRecording();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsInterviewStarted(false);
    setFeedback('Interview completed! Check your performance analysis below.');
    // Here you would typically analyze the recording and provide detailed feedback
  };

  const provideFeedback = () => {
    // This would typically involve AI analysis of the recording
    const feedbackPoints = [
      "Good eye contact and body language",
      "Clear and concise answers",
      "Could improve on providing more specific examples",
      "Good use of the STAR method in responses"
    ];
    setFeedback(feedbackPoints.join('\n'));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Mock Interview Session</h2>
        
        {!isInterviewStarted ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div
                className={`p-6 border rounded-lg cursor-pointer transition-colors ${
                  type === 'behavioral' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
                }`}
              >
                <h3 className="font-semibold text-lg mb-2">Behavioral Interview</h3>
                <p className="text-gray-600 mb-2">Focus on past experiences and situations</p>
                <p className="text-sm text-gray-500">Duration: 20 minutes</p>
              </div>
              <div
                className={`p-6 border rounded-lg cursor-pointer transition-colors ${
                  type === 'technical' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
                }`}
              >
                <h3 className="font-semibold text-lg mb-2">Technical Interview</h3>
                <p className="text-gray-600 mb-2">Technical questions and problem-solving scenarios</p>
                <p className="text-sm text-gray-500">Duration: 30 minutes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <Video className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-2">Video Recording</h3>
                <p className="text-gray-600">Record your responses for analysis</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Clock className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-2">Timed Responses</h3>
                <p className="text-gray-600">Practice with realistic time constraints</p>
              </div>
              <div className="p-4 border rounded-lg">
                <MessageSquare className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-2">AI Feedback</h3>
                <p className="text-gray-600">Receive personalized improvement tips</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Settings className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-2">Customization</h3>
                <p className="text-gray-600">Tailor questions to your industry</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startInterview}
              className="w-full py-3 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700"
            >
              Start Mock Interview
            </motion.button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                {type === 'behavioral' ? 'Behavioral Interview' : 'Technical Interview'} - Question {currentQuestion?.id} of {questions.length}
              </div>
              <div className="text-lg font-mono">
                {formatTime(timer)}
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="text-sm text-gray-500">Category: {currentQuestion?.category}</span>
                <span className="text-sm text-gray-500">Difficulty: {currentQuestion?.difficulty}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{currentQuestion?.text}</h3>
              
              <div className="flex space-x-4">
                {!isAnswering ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startAnswering}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Start Answer
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextQuestion}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Next Question
                  </motion.button>
                )}
              </div>
            </div>

            {isRecording && (
              <div className="flex items-center space-x-2 text-red-600">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <span>Recording in progress...</span>
              </div>
            )}

            {feedback && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold mb-2">Feedback:</h4>
                <pre className="whitespace-pre-line text-green-800">{feedback}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
