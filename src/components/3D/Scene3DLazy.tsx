"use client";

import dynamic from "next/dynamic";
import { Scene3DErrorBoundary } from "@/components/ui/Scene3DErrorBoundary";
import type { SceneVariant } from "./Scene3DEnvironment";

const Scene3DEnvironment = dynamic(
  () => import("./Scene3DEnvironment").then((m) => ({ default: m.Scene3DEnvironment })),
  { ssr: false, loading: () => <div className="absolute inset-0 -z-10 bg-[#000000]" /> }
);

const GradientFallback = () => (
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0e17] via-[#0d1321] to-black" />
);

interface Scene3DLazyProps {
  variant: SceneVariant;
}

export function Scene3DLazy({ variant }: Scene3DLazyProps) {
  return (
    <Scene3DErrorBoundary fallback={<GradientFallback />}>
      <Scene3DEnvironment variant={variant} />
    </Scene3DErrorBoundary>
  );
}
