"use client";

import { motion } from "motion/react";
import { useIsMobile } from "@/hooks/useIsMobile";

export function AmbientMotion() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Gradient orbs — reduced on mobile so they don't cover text */}
      <motion.div
        className={`absolute rounded-full bg-[#00d4ff]/10 blur-[120px] ${isMobile ? "-left-1/2 -top-1/2 h-[50vh] w-[50vh]" : "-left-1/4 -top-1/4 h-[80vh] w-[80vw]"}`}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute rounded-full bg-[#0066aa]/15 blur-[100px] ${isMobile ? "-bottom-1/2 -right-1/2 h-[40vh] w-[40vh]" : "-bottom-1/4 -right-1/4 h-[60vh] w-[60vw]"}`}
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Light streaks — hidden on mobile to avoid covering words */}
      {!isMobile && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00d4ff]/10 to-transparent"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
}
