"use client";

import { motion } from "motion/react";
import { SCENES } from "@/data/scenes";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ProgressIndicatorProps {
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function ProgressIndicator({ currentIndex, onNavigate }: ProgressIndicatorProps) {
  const isMobile = useIsMobile();

  const dot = (i: number, compact?: boolean) => (
    <motion.button
      key={SCENES[i].id}
      onClick={() => onNavigate(i)}
      className={`relative flex items-center justify-center touch-manipulation ${compact ? "min-h-[36px] min-w-[28px]" : "min-h-[44px] min-w-[44px]"}`}
      initial={false}
      whileTap={{ scale: 0.9 }}
      aria-label={`Go to ${SCENES[i].title}`}
    >
      <motion.span
        className={`block rounded-full transition-colors ${
          compact ? "h-1.5 w-1.5" : "h-2 w-2"
        } ${i === currentIndex ? "bg-[#00d4ff] shadow-[0_0_8px_rgba(0,212,255,0.6)]" : "bg-white/30"}`}
        animate={{
          scale: i === currentIndex ? 1.3 : 1,
          opacity: i === currentIndex ? 1 : 0.6,
        }}
      />
      {i === currentIndex && !compact && (
        <motion.span
          layoutId="progress-pill"
          className="absolute inset-0 rounded-full border border-[#00d4ff]/50 bg-[#00d4ff]/10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );

  if (isMobile) {
    return (
      <div
        className="print:hidden fixed left-0 right-0 top-0 z-50 flex items-center gap-3 px-3 pb-2 pt-[calc(0.5rem+env(safe-area-inset-top,0px))]"
      >
        {/* Slim segmented bar at top — out of the way of brochure content */}
        <div className="flex flex-1 gap-px overflow-hidden rounded-full bg-black/30 p-1 backdrop-blur-md">
          {SCENES.map((_, i) => (
            <motion.button
              key={SCENES[i].id}
              onClick={() => onNavigate(i)}
              className="relative h-1.5 min-w-0 flex-1 touch-manipulation"
              initial={false}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to ${SCENES[i].title}`}
            >
              <div
                className={`absolute inset-0 rounded-sm transition-colors ${
                  i <= currentIndex ? "bg-[#00d4ff]/90" : "bg-white/15"
                } ${i === currentIndex ? "shadow-[0_0_8px_rgba(0,212,255,0.4)]" : ""}`}
              />
            </motion.button>
          ))}
        </div>
        <span className="shrink-0 text-[11px] tabular-nums text-white/50">
          {currentIndex + 1}/{SCENES.length}
        </span>
      </div>
    );
  }

  return (
    <div className="print:hidden fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 sm:right-6 sm:flex sm:gap-3">
      {SCENES.map((_, i) => (
        <div key={SCENES[i].id} className="group relative flex items-center justify-end">
          {dot(i)}
          <span className="absolute right-8 mr-2 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 pointer-events-none">
            {SCENES[i].title}
          </span>
        </div>
      ))}
    </div>
  );
}
