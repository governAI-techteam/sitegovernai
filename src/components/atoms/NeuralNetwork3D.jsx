'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Generate points outside of render to avoid purity issues
function generatePoints(count) {
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    p[i * 3] = (Math.random() - 0.5) * 10;
    p[i * 3 + 1] = (Math.random() - 0.5) * 10;
    p[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  return p;
}

function generateLines(points, count) {
  const l = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = points[i * 3] - points[j * 3];
      const dy = points[i * 3 + 1] - points[j * 3 + 1];
      const dz = points[i * 3 + 2] - points[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 3.5) {
        l.push({
          start: [points[i * 3], points[i * 3 + 1], points[i * 3 + 2]],
          end: [points[j * 3], points[j * 3 + 1], points[j * 3 + 2]],
        });
      }
    }
  }
  return l;
}

function NetworkNodes({ count = 40 }) {
  const data = useMemo(() => {
    const pts = generatePoints(count);
    const lns = generateLines(pts, count);
    return { points: pts, lines: lns };
  }, [count]);

  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.z = t * 0.05;
  });

  if (!data) return null;

  const { points, lines } = data;

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...line.start),
          new THREE.Vector3(...line.end),
        ]);
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#a04100" transparent opacity={0.15} />
          </line>
        );
      })}

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#a04100" size={0.12} transparent opacity={0.6} sizeAttenuation />
      </points>

      {Array.from({ length: Math.min(12, count) }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
          <Sphere
            args={[0.08, 12, 12]}
            position={[points[i * 3], points[i * 3 + 1], points[i * 3 + 2]]}
          >
            <meshStandardMaterial color="#a04100" emissive="#a04100" emissiveIntensity={0.5} />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

export default function NeuralNetwork3DCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 380 }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <NetworkNodes />
      </Canvas>
    </div>
  );
}
