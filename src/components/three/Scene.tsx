import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { ReactNode } from 'react';

interface SceneProps {
  children: ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
}

export default function Scene({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 50 },
}: SceneProps) {
  return (
    <Canvas
      className={className}
      camera={{
        position: camera.position,
        fov: camera.fov,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
