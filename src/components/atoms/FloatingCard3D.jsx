'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

function GlassCard() {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    group.current.rotation.x = Math.cos(t * 0.3) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* Main Card Body */}
        <RoundedBox args={[3.2, 4.2, 0.08]} radius={0.15} smoothness={4}>
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.05}
            roughness={0.1}
            transparent
            opacity={0.92}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </RoundedBox>

        {/* Header Bar - saffron accent */}
        <RoundedBox args={[2.8, 0.7, 0.09]} radius={0.08} position={[0, 1.5, 0.02]}>
          <meshStandardMaterial color="#a04100" emissive="#a04100" emissiveIntensity={0.15} />
        </RoundedBox>

        {/* Data rows */}
        {[-0.1, -0.5, -0.9, -1.3].map((y, i) => (
          <RoundedBox key={i} args={[2.4 - i * 0.15, 0.08, 0.01]} radius={0.02} position={[-0.1, y, 0.05]}>
            <meshStandardMaterial color={i === 0 ? '#a04100' : '#515f74'} opacity={0.4 - i * 0.06} transparent />
          </RoundedBox>
        ))}

        {/* Small icon boxes on header */}
        <RoundedBox args={[0.35, 0.35, 0.1]} radius={0.06} position={[-1.0, 1.5, 0.04]}>
          <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
        </RoundedBox>

        {/* Progress bar */}
        <RoundedBox args={[2.4, 0.12, 0.01]} radius={0.03} position={[0, -1.7, 0.05]}>
          <meshStandardMaterial color="#e0e0e0" />
        </RoundedBox>
        <RoundedBox args={[1.8, 0.12, 0.015]} radius={0.03} position={[-0.3, -1.7, 0.06]}>
          <meshStandardMaterial color="#a04100" emissive="#a04100" emissiveIntensity={0.1} />
        </RoundedBox>
      </Float>
    </group>
  );
}

function generateParticles(count) {
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    p[i * 3] = (Math.random() - 0.5) * 8;
    p[i * 3 + 1] = (Math.random() - 0.5) * 8;
    p[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  return p;
}

function Particles({ count = 30 }) {
  const points = useMemo(() => {
    return generateParticles(count);
  }, [count]);

  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a04100" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export default function FloatingCard3DCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 380 }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 42 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[8, 8, 8]} intensity={1.2} />
        <spotLight position={[-6, 6, 6]} angle={0.2} penumbra={1} intensity={0.5} />
        <GlassCard />
        <Particles />
      </Canvas>
    </div>
  );
}
