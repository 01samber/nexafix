"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type SceneVariant =
  | "cover"
  | "problem"
  | "solution"
  | "services"
  | "why"
  | "process"
  | "results"
  | "cta"
  | "back";

// —— Shared: particles being pulled into void ——
function VoidParticles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const velocities = useRef<[number, number, number][] | null>(null);
  if (!velocities.current || velocities.current.length !== count) {
    velocities.current = Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 0.015,
      (Math.random() - 0.5) * 0.015,
      (Math.random() - 0.5) * 0.015,
    ]);
  }
  const vel = velocities.current;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const v = vel[i];
      pos[ix] -= pos[ix] * 0.007 + v[0];
      pos[ix + 1] -= pos[ix + 1] * 0.007 + v[1];
      pos[ix + 2] -= pos[ix + 2] * 0.007 + v[2];
      const r = Math.sqrt(pos[ix] ** 2 + pos[ix + 1] ** 2 + pos[ix + 2] ** 2);
      if (r < 0.6) {
        pos[ix] = (Math.random() - 0.5) * 18;
        pos[ix + 1] = (Math.random() - 0.5) * 18;
        pos[ix + 2] = (Math.random() - 0.5) * 18;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points key={count} ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00d4ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// —— Shared: accretion rings ——
function AccretionRings({ scale = 1 }: { scale?: number }) {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (r1.current) r1.current.rotation.x += d * 0.25;
    if (r2.current) r2.current.rotation.z += d * 0.18;
  });
  return (
    <group scale={scale}>
      <mesh ref={r1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[4, 0.04, 16, 80]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={r2} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[3.2, 0.02, 8, 64]} />
        <meshBasicMaterial color="#0099cc" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// —— Shared: orbiting camera (responsive — mobile sees full scene like desktop) ——
function OrbitingCamera({ mobile }: { mobile: boolean }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.11;
    // Mobile: larger orbit radius so shapes fit fully in narrow viewport
    const r = mobile ? 7 : 5.5;
    const x = Math.sin(t) * r;
    const z = Math.cos(t) * r;
    const y = Math.sin(t * 0.65) * (mobile ? 1.5 : 1.2);
    state.camera.position.set(x, y, z);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });
  return null;
}

// —— Shared material helper ——
const lineMat = <lineBasicMaterial color="#00d4ff" />;

// —— 1. COVER: Cube ——
function ShapeCover() {
  const groupRef = useRef<THREE.Group>(null);
  const boxGeo = useMemo(() => new THREE.BoxGeometry(1.8, 1.8, 1.8), []);
  useFrame((_, d) => {
    if (groupRef.current) groupRef.current.rotation.y += d * 0.4;
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.15} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[boxGeo]} />
        {lineMat}
      </lineSegments>
      <mesh>
        <boxGeometry args={[1.55, 1.55, 1.55]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.06} wireframe />
      </mesh>
    </group>
  );
}

// —— 2. PROBLEM: Shattered fragments (broken octahedrons drifting) ——
function ShapeProblem() {
  const fragments = useRef<THREE.Group>(null);
  const offsets = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        pos: [(Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5] as [number, number, number],
        rot: [Math.random() * 2, Math.random() * 2, Math.random() * 2] as [number, number, number],
        speed: 0.3 + Math.random() * 0.4,
      })),
    []
  );
  useFrame((_, d) => {
    if (fragments.current) {
      fragments.current.children.forEach((c, i) => {
        c.rotation.x += offsets[i].speed * d * 0.5;
        c.rotation.y += offsets[i].speed * d * 0.7;
        c.position.x -= c.position.x * 0.003;
        c.position.y -= c.position.y * 0.003;
        c.position.z -= c.position.z * 0.003;
      });
    }
  });
  return (
    <group ref={fragments}>
      {offsets.map((o, i) => (
        <mesh key={i} position={o.pos} rotation={o.rot}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// —— 3. SOLUTION: Sphere (wholeness) ——
function ShapeSolution() {
  const ref = useRef<THREE.Mesh>(null);
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1.2, 32, 24), []);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.35;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.2, 32, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[sphereGeo]} />
        {lineMat}
      </lineSegments>
    </group>
  );
}

// —— 4. SERVICES: Four orbiting shapes ——
function ShapeServices() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (groupRef.current) groupRef.current.rotation.y += d * 0.2;
  });
  const shapes = [
    { Geo: () => <boxGeometry args={[0.65, 0.65, 0.65]} /> },
    { Geo: () => <sphereGeometry args={[0.45, 20, 16]} /> },
    { Geo: () => <torusGeometry args={[0.4, 0.12, 12, 32]} /> },
    { Geo: () => <cylinderGeometry args={[0.35, 0.35, 0.9, 24]} /> },
  ];
  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const r = 2;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        return (
          <mesh key={i} position={[x, 0, z]}>
            {s.Geo()}
            <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

// —— 5. WHY: Pyramid / octahedron (foundation) ——
function ShapeWhy() {
  const ref = useRef<THREE.Group>(null);
  const octGeo = useMemo(() => new THREE.OctahedronGeometry(1.4, 0), []);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.25;
  });
  return (
    <group ref={ref}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.18} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[octGeo]} />
        {lineMat}
      </lineSegments>
    </group>
  );
}

// —— 6. PROCESS: Pentagon ring (5 steps) ——
const sphereSmallGeo = new THREE.SphereGeometry(0.35, 12, 8);

function ShapeProcess() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (groupRef.current) groupRef.current.rotation.y += d * 0.22;
  });
  return (
    <group ref={groupRef}>
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const r = 1.8;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh>
              <sphereGeometry args={[0.35, 12, 8]} />
              <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[sphereSmallGeo]} />
              {lineMat}
            </lineSegments>
          </group>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2, 5]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// —— 7. RESULTS: Diamond / octahedron upright (value, precision) ——
function ShapeResults() {
  const ref = useRef<THREE.Group>(null);
  const octGeo = useMemo(() => new THREE.OctahedronGeometry(1.3, 0), []);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.3;
  });
  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <octahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.15} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[octGeo]} />
        {lineMat}
      </lineSegments>
    </group>
  );
}

// —— 8. CTA: Beacon / vertical cylinder (drawing you in) ——
function ShapeCTA() {
  const ref = useRef<THREE.Group>(null);
  const cylGeo = useMemo(() => new THREE.CylinderGeometry(0.5, 0.6, 2.2, 24), []);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.4;
  });
  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.6, 2.2, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[cylGeo]} />
        {lineMat}
      </lineSegments>
      <mesh>
        <cylinderGeometry args={[0.45, 0.55, 2, 20]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.05} wireframe />
      </mesh>
    </group>
  );
}

// —— 9. BACK: Torus (complete loop, closure) ——
function ShapeBack() {
  const ref = useRef<THREE.Mesh>(null);
  const torusGeo = useMemo(() => new THREE.TorusGeometry(1.2, 0.2, 24, 48), []);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.2;
      ref.current.rotation.y += d * 0.3;
    }
  });
  return (
    <group>
      <mesh ref={ref}>
        <torusGeometry args={[1.2, 0.2, 24, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.15} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[torusGeo]} />
        {lineMat}
      </lineSegments>
    </group>
  );
}

// —— Central shape switch ——
function CentralShape({ variant }: { variant: SceneVariant }) {
  switch (variant) {
    case "cover":
      return <ShapeCover />;
    case "problem":
      return <ShapeProblem />;
    case "solution":
      return <ShapeSolution />;
    case "services":
      return <ShapeServices />;
    case "why":
      return <ShapeWhy />;
    case "process":
      return <ShapeProcess />;
    case "results":
      return <ShapeResults />;
    case "cta":
      return <ShapeCTA />;
    case "back":
      return <ShapeBack />;
    default:
      return <ShapeCover />;
  }
}

interface Scene3DEnvironmentProps {
  variant: SceneVariant;
}

export function Scene3DEnvironment({ variant }: Scene3DEnvironmentProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [mobile, setMobile] = useState(isMobile);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-[#000000]">
      <Canvas
        camera={{
          position: [5, 0, 0],
          fov: mobile ? 65 : 55, // Wider FOV on mobile to show full shapes
        }}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", mobile ? 6 : 5, 30]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#00d4ff" distance={15} decay={2} />
        <pointLight position={[3, 2, 2]} intensity={0.3} color="#0099cc" />
        <OrbitingCamera mobile={mobile} />
        {/* On mobile: offset central shape upward to clear center for text */}
        <group position={[0, mobile ? 1.8 : 0, 0]}>
          <CentralShape variant={variant} />
        </group>
        <VoidParticles count={mobile ? 320 : 600} />
        <AccretionRings />
      </Canvas>
    </div>
  );
}
