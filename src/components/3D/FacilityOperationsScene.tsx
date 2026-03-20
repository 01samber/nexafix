"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";

function FacilityGrid() {
  const points = Array.from({ length: 20 }, (_, i) => [
    (i - 10) * 0.5,
    Math.sin(i * 0.3) * 0.2,
    0,
  ]) as [number, number, number][];

  return (
    <group>
      {Array.from({ length: 5 }, (_, i) => (
        <Float key={i} speed={1 + i * 0.2} floatIntensity={0.1}>
          <Line
            points={[
              [-2, i * 0.5 - 1, 0],
              [2, i * 0.5 - 1, 0],
            ]}
            color="#00d4ff"
            lineWidth={0.5}
          />
        </Float>
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <Float key={`v${i}`} speed={1.2 + i * 0.1} floatIntensity={0.1}>
          <Line
            points={[
              [i * 0.5 - 1, -1, 0],
              [i * 0.5 - 1, 1, 0],
            ]}
            color="#00d4ff"
            lineWidth={0.5}
          />
        </Float>
      ))}
    </group>
  );
}

function StatusNodes() {
  const positions = [
    [-0.8, 0.6, 0],
    [0.8, 0.3, 0],
    [-0.5, -0.5, 0],
    [0.6, -0.6, 0],
  ] as [number, number, number][];

  return (
    <group>
      {positions.map((pos, i) => (
        <Float key={i} speed={2 + i} floatIntensity={0.2}>
          <mesh position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00d4ff" />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function FacilityOperationsScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 2]} intensity={1} color="#00d4ff" />
        <FacilityGrid />
        <StatusNodes />
      </Canvas>
    </div>
  );
}
