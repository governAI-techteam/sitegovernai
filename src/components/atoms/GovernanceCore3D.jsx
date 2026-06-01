'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Core() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.2, 64, 64]} ref={meshRef}>
          <MeshDistortMaterial
            color="#a04100"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#ff6b00"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>
      
      {/* Inner Glow */}
      <Sphere args={[0.8, 32, 32]}>
        <meshBasicMaterial color="#ff9d52" transparent opacity={0.3} />
      </Sphere>
    </group>
  );
}

function GovernanceRings() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = t * (0.1 + i * 0.05);
      child.rotation.x = Math.sin(t * 0.2 + i) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {[2, 2.8, 3.6].map((radius, i) => (
        <Torus key={i} args={[radius, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#a04100"
            transparent
            opacity={0.3 - i * 0.05}
            emissive="#a04100"
            emissiveIntensity={0.5}
          />
        </Torus>
      ))}
    </group>
  );
}

function generateDataPoints(count) {
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 3 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    p[i * 3 + 2] = r * Math.cos(phi);
  }
  return p;
}

function DataPoints({ count = 40 }) {
  const points = useMemo(() => {
    return generateDataPoints(count);
  }, [count]);

  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.05;
    meshRef.current.rotation.z = t * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#a04100"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitingNodes() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const angle = t * 0.5 + (i * Math.PI * 2) / 3;
      const radius = 2.8;
      child.position.x = Math.cos(angle) * radius;
      child.position.z = Math.sin(angle) * radius;
      child.position.y = Math.sin(t * 0.8 + i) * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <Sphere key={i} args={[0.15, 16, 16]}>
          <MeshWobbleMaterial
            color="#ff6b00"
            speed={2}
            factor={0.4}
            emissive="#ff6b00"
            emissiveIntensity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
}

export default function GovernanceCore3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 400 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#a04100" intensity={1} />
        <Core />
        <GovernanceRings />
        <DataPoints count={60} />
        <OrbitingNodes />
      </Canvas>
    </div>
  );
}
