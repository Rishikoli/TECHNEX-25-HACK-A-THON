'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, StopCircle, AlertCircle } from 'lucide-react';

interface VideoRecorderProps {
  onRecordingStart: () => void;
  onRecordingStop: (blob: Blob) => void;
  onBodyLanguageUpdate: (data: any) => void;
}

export function VideoRecorder({
  onRecordingStart,
  onRecordingStop,
  onBodyLanguageUpdate
}: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize camera
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Set up MediaRecorder
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.onstop = handleStop;

        // Start body language analysis
        startBodyLanguageAnalysis(stream);
      } catch (err) {
        setError('Failed to access camera: Please ensure camera permissions are granted');
        console.error('Error accessing media devices:', err);
      }
    }

    setupCamera();

    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startBodyLanguageAnalysis = async (stream: MediaStream) => {
    // Simulated body language analysis
    // In a real implementation, this would use a computer vision model
    setInterval(() => {
      const mockBodyLanguageData = {
        posture: Math.random() > 0.5 ? 'good' : 'needs_improvement',
        eyeContact: Math.random() * 100,
        gestures: Math.random() > 0.5 ? 'natural' : 'stiff',
        confidence: Math.random() * 100
      };
      onBodyLanguageUpdate(mockBodyLanguageData);
    }, 2000);
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  const handleStop = () => {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    onRecordingStop(blob);
    chunksRef.current = [];
  };

  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      setIsRecording(true);
      mediaRecorderRef.current.start();
      onRecordingStart();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center text-red-800 mb-4">
          <AlertCircle className="w-6 h-6 mr-2" />
          <h3 className="font-semibold">Camera Error</h3>
        </div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <motion.video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full aspect-video object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {isRecording && (
          <motion.div
            className="absolute top-4 right-4 flex items-center bg-red-500 text-white px-3 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-2 h-2 bg-white rounded-full mr-2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            Recording
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <Camera className="w-5 h-5 mr-2" />
            <span className="text-sm">
              {isRecording ? 'Recording in progress...' : 'Ready to record'}
            </span>
          </div>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {isRecording ? (
              <>
                <StopCircle className="w-5 h-5 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Video className="w-5 h-5 mr-2" />
                Start Interview
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
