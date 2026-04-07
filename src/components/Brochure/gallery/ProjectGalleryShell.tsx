"use client";

import type { ReactNode } from "react";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";

type ProjectGalleryShellProps = {
  children: ReactNode;
  /** Wider layout on desktop for masonry / theater */
  wide?: boolean;
};

export function ProjectGalleryShell({ children, wide }: ProjectGalleryShellProps) {
  return (
    <div
      data-project-gallery-scene
      className={`relative flex w-full flex-col max-md:min-h-0 max-md:flex-1 md:mx-auto md:max-h-none md:min-h-0 ${
        wide ? "max-w-6xl md:max-w-[min(92vw,1280px)]" : "max-w-5xl"
      }`}
      style={{
        paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
        paddingLeft: "max(0.5rem, env(safe-area-inset-left, 0px))",
        paddingRight: "max(0.5rem, env(safe-area-inset-right, 0px))",
      }}
    >
      <Scene3DLazy variant="gallery" />
      {children}
    </div>
  );
}
