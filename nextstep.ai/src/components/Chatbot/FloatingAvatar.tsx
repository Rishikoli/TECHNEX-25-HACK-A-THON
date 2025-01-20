'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface FloatingAvatarProps {
  modelPath: string;
  onClick: () => void;
}

export const FloatingAvatar = ({ modelPath, onClick }: FloatingAvatarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const modelRef = useRef<THREE.Object3D | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // We'll maintain a 1:1 aspect ratio for the floating button
      0.1,
      1000
    );
    camera.position.z = 2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      canvas: document.createElement('canvas')
    });
    renderer.setSize(120, 120); // Fixed size for the floating button
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, -0.5, 0);
        scene.add(model);
        modelRef.current = model;

        // Setup animations
        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;
          const idleAction = mixer.clipAction(gltf.animations[0]);
          idleAction.play();
        }
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model:', error);
      }
    );

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (mixerRef.current) {
        mixerRef.current.update(clock.getDelta());
      }

      if (modelRef.current) {
        // Floating animation
        modelRef.current.position.y = -0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
        
        // Slow rotation
        modelRef.current.rotation.y += 0.01;

        // Hover effect
        if (isHoveredRef.current) {
          modelRef.current.scale.x = THREE.MathUtils.lerp(modelRef.current.scale.x, 0.6, 0.1);
          modelRef.current.scale.y = THREE.MathUtils.lerp(modelRef.current.scale.y, 0.6, 0.1);
          modelRef.current.scale.z = THREE.MathUtils.lerp(modelRef.current.scale.z, 0.6, 0.1);
        } else {
          modelRef.current.scale.x = THREE.MathUtils.lerp(modelRef.current.scale.x, 0.5, 0.1);
          modelRef.current.scale.y = THREE.MathUtils.lerp(modelRef.current.scale.y, 0.5, 0.1);
          modelRef.current.scale.z = THREE.MathUtils.lerp(modelRef.current.scale.z, 0.5, 0.1);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle hover events
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      if (containerRef.current) {
        containerRef.current.style.cursor = 'pointer';
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      if (containerRef.current) {
        containerRef.current.style.cursor = 'default';
      }
    };

    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
        if (renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, [modelPath]);

  return (
    <div 
      ref={containerRef}
      onClick={onClick}
      className="w-[120px] h-[120px] rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg cursor-pointer overflow-hidden"
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      }}
    />
  );
};
