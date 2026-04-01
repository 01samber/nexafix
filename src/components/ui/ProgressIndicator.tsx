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
      <div className="print:hidden relative z-[60] flex w-full shrink-0 items-center gap-1.5 border-b border-white/5 bg-[#0a0e17] pb-1.5 pl-[max(0.375rem,env(safe-area-inset-left,0px))] pr-[max(0.375rem,env(safe-area-inset-right,0px))] pt-[calc(0.375rem+env(safe-area-inset-top,0px))] backdrop-blur-md sm:gap-3 sm:pb-2 sm:pl-[max(0.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(0.5rem,env(safe-area-inset-right,0px))] sm:pt-[calc(0.5rem+env(safe-area-inset-top,0px))]">
        {/* Segmented bar — solid bar background so it never visually merges with page content */}
        <div className="flex min-h-5 min-w-0 flex-1 gap-px overflow-hidden rounded-full bg-black/40 p-1">
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
        <span className="shrink-0 pl-0.5 text-[10px] tabular-nums leading-none text-white/60 sm:text-xs">
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
