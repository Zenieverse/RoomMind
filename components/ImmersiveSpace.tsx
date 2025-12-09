import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import Timeline from './Timeline';
import AINotes from './AINotes';
import { ProductivityMode } from '../types';

interface ImmersiveSpaceProps {
  currentMode: ProductivityMode;
}

const FocusSphere = ({ mode }: { mode: ProductivityMode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      // Breathe effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  const getColor = () => {
    switch(mode) {
      case ProductivityMode.DEEP_WORK: return '#3b82f6';
      case ProductivityMode.CREATIVE: return '#f97316';
      case ProductivityMode.RELAX: return '#4ade80';
      default: return '#14b8a6';
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 1.5, -2]}>
        <icosahedronGeometry args={[0.3, 2]} />
        <meshPhysicalMaterial 
          color={getColor()}
          wireframe
          emissive={getColor()}
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>
      <pointLight position={[0, 1.5, -2]} color={getColor()} intensity={2} distance={5} />
    </Float>
  );
};

const ImmersiveSpace: React.FC<ImmersiveSpaceProps> = ({ currentMode }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      {/* 3D Focus Artifact */}
      <FocusSphere mode={currentMode} />

      {/* Floating Timeline (Placed on a virtual desk or wall) */}
      <group position={[-0.8, 1.4, -1]} rotation={[0, 0.2, 0]}>
        <Html transform scale={0.4}>
          <div className="w-[600px] pointer-events-auto">
             <Timeline />
          </div>
        </Html>
      </group>

      {/* Floating Notes (Placed to the side) */}
      <group position={[0.8, 1.4, -1]} rotation={[0, -0.2, 0]}>
         <Html transform scale={0.4}>
            <div className="w-[800px] h-[600px] overflow-y-auto bg-slate-900/95 rounded-2xl border border-slate-700 pointer-events-auto">
               <AINotes />
            </div>
         </Html>
      </group>

      {/* Mode Indicator Text */}
      <Text
        position={[0, 2, -3]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {currentMode.toUpperCase()} MODE
      </Text>
    </>
  );
};

export default ImmersiveSpace;