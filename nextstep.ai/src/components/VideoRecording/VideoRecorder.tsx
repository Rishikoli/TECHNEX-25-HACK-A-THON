'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, StopCircle, Video, Save, X, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface VideoRecorderProps {
  onRecordingComplete?: (blob: Blob) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({
  onRecordingComplete = () => {},
  onRecordingStart = () => {},
  onRecordingStop = () => {}
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [savedRecordings, setSavedRecordings] = useState<{ blob: Blob; timestamp: Date }[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        if (onRecordingComplete) {
          onRecordingComplete(blob);
        }
        
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };

      setStream(mediaStream);
      mediaRecorder.start();
      setIsRecording(true);
      onRecordingStart();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [onRecordingStart, onRecordingComplete]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      onRecordingStop();
    }
  }, [onRecordingStop]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setRecordingTime(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadRecording = (blob: Blob, timestamp: Date) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-recording-${timestamp.toISOString()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div 
        className="relative rounded-lg overflow-hidden bg-gray-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full rounded-lg aspect-video"
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            >
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {isRecording ? (
                    <div className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
                    </div>
                  ) : (
                    <div className="text-white flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span className="text-sm font-medium">Ready to record</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-white" />
                  <span className="text-sm text-white font-medium">{formatTime(recordingTime)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              variant="default"
              size="icon"
              className="bg-red-500 hover:bg-red-600"
            >
              <Camera className="h-6 w-6" />
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="default"
              size="icon"
              className="bg-red-500 hover:bg-red-600 animate-pulse"
            >
              <StopCircle className="h-6 w-6" />
            </Button>
          )}
        </div>

        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">Recording</span>
          </div>
        )}
      </div>

      {savedRecordings.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Saved Recordings</h4>
          <div className="space-y-2">
            {savedRecordings.map(({ blob, timestamp }, index) => (
              <motion.div
                key={timestamp.toISOString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Camera className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Recording {index + 1}
                    </span>
                    <p className="text-xs text-gray-500">
                      {timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => downloadRecording(blob, timestamp)}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Download recording"
                  >
                    <Save className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setSavedRecordings(prev => 
                      prev.filter(r => r.timestamp !== timestamp)
                    )}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete recording"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
