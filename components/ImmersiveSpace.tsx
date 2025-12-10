import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text, Float, Sparkles, Stars } from '@react-three/drei';
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
      // Breathe effect linked to time
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  const getColor = () => {
    switch(mode) {
      case ProductivityMode.DEEP_WORK: return '#3b82f6'; // Blue
      case ProductivityMode.CREATIVE: return '#f97316'; // Orange
      case ProductivityMode.RELAX: return '#4ade80'; // Green
      case ProductivityMode.MEETING_PREP: return '#a855f7'; // Purple
      default: return '#14b8a6'; // Teal
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 1.6, -2.5]}>
        <icosahedronGeometry args={[0.25, 2]} />
        <meshPhysicalMaterial 
          color={getColor()}
          wireframe
          emissive={getColor()}
          emissiveIntensity={1.5}
          transparent
          opacity={0.4}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
      <pointLight position={[0, 1.6, -2.5]} color={getColor()} intensity={1.5} distance={8} />
    </Float>
  );
};

const AmbientEffects = ({ mode }: { mode: ProductivityMode }) => {
  const getColor = () => {
    switch(mode) {
      case ProductivityMode.DEEP_WORK: return '#60a5fa';
      case ProductivityMode.CREATIVE: return '#fb923c';
      case ProductivityMode.RELAX: return '#86efac';
      default: return '#ffffff';
    }
  };

  return (
    <>
       {mode === ProductivityMode.CREATIVE && (
          <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color={getColor()} />
       )}
       {mode === ProductivityMode.RELAX && (
          <Stars radius={10} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
       )}
       {mode === ProductivityMode.DEEP_WORK && (
         <Sparkles count={30} scale={5} size={2} speed={0.1} opacity={0.3} color="#3b82f6" noise={0.5} />
       )}
    </>
  );
}

const ImmersiveSpace: React.FC<ImmersiveSpaceProps> = ({ currentMode }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />
      
      {/* Dynamic Background Effects */}
      <AmbientEffects mode={currentMode} />

      {/* 3D Focus Artifact */}
      <FocusSphere mode={currentMode} />

      {/* Mode Indicator Text */}
      <Text
        position={[0, 2.1, -2.5]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        {currentMode}
      </Text>

      {/* Floating Timeline (Left Side, Angled In) */}
      <group position={[-1.2, 1.3, -1.5]} rotation={[0, 0.35, 0]}>
        <Html transform scale={0.3} distanceFactor={1.5}>
          <div className="w-[600px] pointer-events-auto select-none rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
             <div className="glass-panel p-1">
                <Timeline />
             </div>
          </div>
        </Html>
      </group>

      {/* Floating Notes (Right Side, Angled In) */}
      <group position={[1.1, 1.3, -1.4]} rotation={[0, -0.35, 0]}>
         <Html transform scale={0.3} distanceFactor={1.5}>
            <div className="w-[800px] h-[650px] pointer-events-auto rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
               <div className="bg-slate-900/95 border border-slate-700 w-full h-full">
                 <AINotes />
               </div>
            </div>
         </Html>
      </group>
    </>
  );
};

export default ImmersiveSpace;