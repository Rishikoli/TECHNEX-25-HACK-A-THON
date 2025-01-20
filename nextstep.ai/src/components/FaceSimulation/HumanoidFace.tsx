'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as faceapi from 'face-api.js';

interface HumanoidFaceProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isActive: boolean;
}

export const HumanoidFace = ({ videoRef, isActive }: HumanoidFaceProps) => {
  const [facePosition, setFacePosition] = useState({ x: 0, y: 0, angle: 0 });
  const [expressions, setExpressions] = useState({
    happy: 0,
    sad: 0,
    surprised: 0,
    neutral: 1,
  });
  const [eyesClosed, setEyesClosed] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const requestRef = useRef<number>();
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error loading face-api models:', error);
      }
    };

    loadModels();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isActive || !modelsLoaded || !videoRef.current) return;

    const detectFace = async () => {
      if (!videoRef.current) return;

      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections) {
        // Update face position
        const { x, y } = detections.detection.box;
        const landmarks = detections.landmarks;
        const jawline = landmarks.getJawOutline();
        const angle = Math.atan2(
          jawline[jawline.length - 1].y - jawline[0].y,
          jawline[jawline.length - 1].x - jawline[0].x
        );

        setFacePosition({
          x: x / videoRef.current.videoWidth,
          y: y / videoRef.current.videoHeight,
          angle: angle * (180 / Math.PI),
        });

        // Update expressions
        setExpressions(detections.expressions);

        // Check if eyes are closed
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        const eyesClosed = 
          Math.abs(leftEye[1].y - leftEye[5].y) < 5 &&
          Math.abs(rightEye[1].y - rightEye[5].y) < 5;
        setEyesClosed(eyesClosed);

        // Check if mouth is open
        const mouth = landmarks.getMouth();
        const mouthOpen = Math.abs(mouth[13].y - mouth[19].y) > 10;
        setMouthOpen(mouthOpen);
      }

      requestRef.current = requestAnimationFrame(detectFace);
    };

    detectFace();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive, modelsLoaded, videoRef]);

  return (
    <div className="relative w-64 h-64">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{
          transform: `rotate(${facePosition.angle}deg)`,
        }}
      >
        {/* Head */}
        <motion.path
          d="M50 10 C 20 10, 10 30, 10 50 C 10 70, 20 90, 50 90 C 80 90, 90 70, 90 50 C 90 30, 80 10, 50 10"
          fill="#FFD3B6"
          stroke="#000"
          strokeWidth="1"
          animate={{
            x: facePosition.x * 10,
            y: facePosition.y * 10,
          }}
        />

        {/* Eyes */}
        <motion.g
          animate={{
            scaleY: eyesClosed ? 0.1 : 1,
          }}
        >
          {/* Left Eye */}
          <circle cx="35" cy="40" r="5" fill="#000" />
          {/* Right Eye */}
          <circle cx="65" cy="40" r="5" fill="#000" />
        </motion.g>

        {/* Eyebrows */}
        <motion.g
          animate={{
            y: expressions.surprised ? -5 : 0,
          }}
        >
          {/* Left Eyebrow */}
          <path
            d="M30 35 Q 35 32, 40 35"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          {/* Right Eyebrow */}
          <path
            d="M60 35 Q 65 32, 70 35"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
        </motion.g>

        {/* Mouth */}
        <motion.path
          d={mouthOpen ? "M35 65 Q 50 80, 65 65" : "M35 65 Q 50 70, 65 65"}
          fill="none"
          stroke="#000"
          strokeWidth="2"
          animate={{
            d: expressions.happy > 0.5
              ? "M35 65 Q 50 55, 65 65"
              : expressions.sad > 0.5
              ? "M35 70 Q 50 80, 65 70"
              : mouthOpen
              ? "M35 65 Q 50 80, 65 65"
              : "M35 65 Q 50 70, 65 65",
          }}
        />
      </svg>
    </div>
  );
};
