"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function BlackHoleCube() {
  const groupRef = useRef<THREE.Group>(null);
  const boxGeo = useMemo(() => new THREE.BoxGeometry(1.8, 1.8, 1.8), []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.15} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[boxGeo]} />
        <lineBasicMaterial color="#00d4ff" />
      </lineSegments>
      {/* Inner glow */}
      <mesh>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
    </group>
  );
}

function BlackHoleParticles() {
  const count = 800;
  const ref = useRef<THREE.Points>(null);
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      velocities.push([
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
      ]);
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const v = velocities[i];
      pos[ix] -= pos[ix] * 0.008 + v[0];
      pos[ix + 1] -= pos[ix + 1] * 0.008 + v[1];
      pos[ix + 2] -= pos[ix + 2] * 0.008 + v[2];
      const r = Math.sqrt(pos[ix] ** 2 + pos[ix + 1] ** 2 + pos[ix + 2] ** 2);
      if (r < 0.5) {
        pos[ix] = (Math.random() - 0.5) * 20;
        pos[ix + 1] = (Math.random() - 0.5) * 20;
        pos[ix + 2] = (Math.random() - 0.5) * 20;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00d4ff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitingCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.12;
    const radius = 5.5;
    const x = Math.sin(t) * radius;
    const z = Math.cos(t) * radius;
    const y = Math.sin(t * 0.7) * 1.2;
    state.camera.position.set(x, y, z);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });
  return null;
}

function AccretionRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.x += delta * 0.3;
    if (ring2.current) ring2.current.rotation.z += delta * 0.2;
  });

  return (
    <group>
      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[4, 0.04, 16, 80]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={ring2} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[3.2, 0.02, 8, 64]} />
        <meshBasicMaterial
          color="#0099cc"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function HeroEnvironment() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#000000]">
      <Canvas
        camera={{ position: [5, 0, 0], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 25]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#00d4ff" distance={15} decay={2} />
        <pointLight position={[3, 2, 2]} intensity={0.3} color="#0099cc" />
        <OrbitingCamera />
        <BlackHoleCube />
        <BlackHoleParticles />
        <AccretionRings />
      </Canvas>
    </div>
  );
}
