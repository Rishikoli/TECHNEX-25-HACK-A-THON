'use client';

import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { motion } from 'framer-motion';

interface FaceRadarProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isActive: boolean;
}

interface FaceMetrics {
  emotion: string;
  confidence: number;
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const FaceRadar = ({ videoRef, isActive }: FaceRadarProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState<FaceMetrics>({
    emotion: 'neutral',
    confidence: 0,
    box: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  });
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [lastConfidence, setLastConfidence] = useState(0);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models/face-api'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models/face-api')
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error loading face-api models:', error);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!isActive || !modelsLoaded || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    let animationFrame: number;

    const detectFace = async () => {
      if (!video || !canvas) return;

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections && detections.length > 0) {
        const detection = detections[0];
        const expressions = detection.expressions;
        
        // Calculate metrics
        const newMetrics = {
          emotion: getTopEmotion(expressions),
          confidence: calculateConfidence(expressions),
          box: detection.box,
        };
        setMetrics(newMetrics);
      }

      animationFrame = requestAnimationFrame(detectFace);
    };

    detectFace();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isActive, modelsLoaded, videoRef]);

  const getTopEmotion = (expressions: any) => {
    return Object.entries(expressions).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  const calculateConfidence = (expressions: any) => {
    // Get the top two expressions and their values
    const sortedExpressions = Object.entries(expressions)
      .sort(([, a], [, b]) => b - a);
    
    const [topEmotion, topValue] = sortedExpressions[0];
    const [secondEmotion, secondValue] = sortedExpressions[1];

    // Calculate confidence based on how dominant the top emotion is
    const emotionDominance = topValue / (topValue + secondValue);
    
    // Add smooth transition using previous confidence
    const smoothedConfidence = lastConfidence * 0.7 + (emotionDominance * 0.8) * 0.3;
    setLastConfidence(smoothedConfidence);

    return smoothedConfidence;
  };

  const drawRadar = (ctx: CanvasRenderingContext2D, metrics: FaceMetrics) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Only draw the face detection box
    if (metrics.box) {
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        metrics.box.x,
        metrics.box.y,
        metrics.box.width,
        metrics.box.height
      );

      // Add subtle highlight effect
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.fillRect(
        metrics.box.x,
        metrics.box.y,
        metrics.box.width,
        metrics.box.height
      );
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      drawRadar(ctx, metrics);
    }
  }, [metrics]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};
