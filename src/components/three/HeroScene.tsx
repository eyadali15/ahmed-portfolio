import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

function CinematicShape({ position, rotation, scale, color, speed = 1 }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.001 * speed;
    meshRef.current.rotation.y += 0.002 * speed;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.001;
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

function FilmFrame({ position, scale }: {
  position: [number, number, number];
  scale: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <planeGeometry args={[1.6, 0.9]} />
        <meshStandardMaterial
          color="#c9a96e"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Frame border */}
      <lineSegments position={position} scale={scale}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 0.9)]} />
        <lineBasicMaterial color="#c9a96e" transparent opacity={0.15} />
      </lineSegments>
    </Float>
  );
}

export default function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const shapes = useMemo(() => [
    { position: [-3, 1.5, -2] as [number, number, number], rotation: [0.5, 0.3, 0] as [number, number, number], scale: 0.5, color: '#c9a96e', speed: 0.8 },
    { position: [3.5, -1, -3] as [number, number, number], rotation: [0.2, 0.8, 0.1] as [number, number, number], scale: 0.7, color: '#666666', speed: 0.6 },
    { position: [-2, -2, -4] as [number, number, number], rotation: [0.7, 0.2, 0.5] as [number, number, number], scale: 0.4, color: '#888888', speed: 1.2 },
    { position: [2, 2.5, -5] as [number, number, number], rotation: [0.1, 0.6, 0.3] as [number, number, number], scale: 0.6, color: '#c9a96e', speed: 0.5 },
    { position: [0, -3, -2] as [number, number, number], rotation: [0.4, 0.1, 0.8] as [number, number, number], scale: 0.3, color: '#ffffff', speed: 1 },
  ], []);

  const filmFrames = useMemo(() => [
    { position: [-4, 0, -6] as [number, number, number], scale: [1.5, 1.5, 1] as [number, number, number] },
    { position: [4, 1.5, -7] as [number, number, number], scale: [2, 2, 1] as [number, number, number] },
    { position: [0, -2, -8] as [number, number, number], scale: [2.5, 2.5, 1] as [number, number, number] },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth mouse follow
    const targetX = mouseRef.current.x * 0.15;
    const targetY = mouseRef.current.y * 0.1;

    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.02;
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.1;
  });

  // Track mouse globally
  if (typeof window !== 'undefined') {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handler, { passive: true });
  }

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#c9a96e" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#ffffff" />
      <directionalLight position={[0, 5, 5]} intensity={0.3} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 5, 20]} />

      {/* Cinematic shapes */}
      {shapes.map((shape, i) => (
        <CinematicShape key={i} {...shape} />
      ))}

      {/* Film frame planes */}
      {filmFrames.map((frame, i) => (
        <FilmFrame key={`frame-${i}`} {...frame} />
      ))}
    </group>
  );
}
