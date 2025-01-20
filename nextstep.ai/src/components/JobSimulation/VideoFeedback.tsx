'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mic, Video, AlertCircle } from 'lucide-react';

interface VideoFeedbackProps {
  isRecording: boolean;
  onVideoData?: (data: Blob) => void;
}

export const VideoFeedback = ({ isRecording, onVideoData }: VideoFeedbackProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isRecording && !mediaRecorderRef.current) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isRecording]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        if (onVideoData) {
          onVideoData(blob);
        }
      };
      
      mediaRecorder.start();
      setCameraActive(true);
      setError('');
    } catch (err) {
      setError('Failed to access camera. Please ensure you have granted the necessary permissions.');
      console.error('Error accessing media devices:', err);
    }
  };

  const stopCamera = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  return (
    <div className="relative">
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {!cameraActive && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50">
            <div className="text-center p-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}
      </div>

      {cameraActive && (
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <motion.div
            animate={{ scale: isRecording ? [1, 1.2, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-3 h-3 rounded-full bg-red-500"
          />
          <span className="text-sm text-white">Recording</span>
        </div>
      )}
    </div>
  );
};
