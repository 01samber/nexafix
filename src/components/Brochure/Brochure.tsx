"use client";

import { useBrochureNavigation } from "@/hooks/useBrochureNavigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SceneWrapper } from "./SceneWrapper";
import { CoverScene } from "./scenes/CoverScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { ServicesScene } from "./scenes/ServicesScene";
import { WhyNexafixScene } from "./scenes/WhyNexafixScene";
import { ProcessScene } from "./scenes/ProcessScene";
import { ResultsScene } from "./scenes/ResultsScene";
import { CTAScene } from "./scenes/CTAScene";
import { BackCoverScene } from "./scenes/BackCoverScene";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { AmbientMotion } from "@/components/ui/AmbientMotion";
import { motion } from "motion/react";

const SCENE_COMPONENTS = [
  CoverScene,
  ProblemScene,
  SolutionScene,
  ServicesScene,
  WhyNexafixScene,
  ProcessScene,
  ResultsScene,
  CTAScene,
  BackCoverScene,
];

export function Brochure() {
  const {
    currentIndex,
    goTo,
    next,
    prev,
    hasNext,
    hasPrev,
  } = useBrochureNavigation();
  const isMobile = useIsMobile();

  return (
    <div
      data-brochure-container
      className="relative min-h-dvh w-full overflow-x-hidden touch-pan-y"
    >
      <AmbientMotion />

      {/* Scene stack */}
      <div className="relative min-h-screen w-full">
        {SCENE_COMPONENTS.map((SceneComponent, i) => (
          <SceneWrapper key={i} isActive={i === currentIndex}>
            <SceneComponent />
          </SceneWrapper>
        ))}
      </div>

      {/* Progress indicator */}
      <ProgressIndicator currentIndex={currentIndex} onNavigate={goTo} />

      {/* Nav arrows - 44px min touch target, safe-area for notched phones */}
      {hasPrev && (
        <motion.button
          onClick={prev}
          className="fixed top-1/2 z-50 flex min-h-[40px] min-w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/25 p-1.5 backdrop-blur-sm transition-all hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 active:scale-95 sm:min-h-[44px] sm:min-w-[44px] sm:p-3 sm:border-white/20 sm:bg-black/40 left-[max(0.5rem,env(safe-area-inset-left))] sm:left-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous"
        >
          <svg
            className="h-5 w-5 text-white sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}
      {hasNext && (
        <motion.button
          onClick={next}
          className="fixed top-1/2 z-50 flex min-h-[40px] min-w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/25 p-1.5 backdrop-blur-sm transition-all hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 active:scale-95 sm:min-h-[44px] sm:min-w-[44px] sm:p-3 sm:border-white/20 sm:bg-black/40 right-[max(0.5rem,env(safe-area-inset-right))] sm:right-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next"
        >
          <svg
            className="h-5 w-5 text-white sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}

      {/* Page counter - desktop only; mobile has it in ProgressIndicator */}
      {!isMobile && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm text-white/80">
            {currentIndex + 1} / 9
          </span>
        </div>
      )}
    </div>
  );
}
