"use client";

import { motion } from "motion/react";

export function AmbientMotion() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 min-h-dvh w-full overflow-hidden">
      {/* Gradient orbs — large on all breakpoints so motion reads across the full viewport */}
      <motion.div
        className="absolute -left-[20%] -top-[15%] h-[min(95vmin,900px)] w-[min(95vmin,900px)] rounded-full bg-[#00d4ff]/12 blur-[100px] sm:-left-1/4 sm:-top-1/4 sm:h-[80vh] sm:w-[80vw] sm:blur-[120px]"
        animate={{
          x: [0, 40, 0],
          y: [0, 28, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-[20%] -right-[15%] h-[min(85vmin,820px)] w-[min(85vmin,820px)] rounded-full bg-[#0066aa]/18 blur-[90px] sm:-bottom-1/4 sm:-right-1/4 sm:h-[60vh] sm:w-[60vw] sm:blur-[100px]"
        animate={{
          x: [0, -36, 0],
          y: [0, -24, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Subtle grid — full bleed */}
      <div
        className="absolute inset-0 opacity-[0.035] sm:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />
      {/* Light streaks — all viewports; slightly softer on small screens */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-[#00d4ff]/25 to-transparent sm:via-[#00d4ff]/20"
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/3 top-0 h-full w-px max-md:left-[28%] bg-gradient-to-b from-transparent via-[#00d4ff]/12 to-transparent sm:via-[#00d4ff]/10"
          animate={{ opacity: [0.18, 0.4, 0.18] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[22%] right-0 h-px w-full bg-gradient-to-r from-transparent via-[#00a8d4]/15 to-transparent md:via-[#00a8d4]/12"
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
