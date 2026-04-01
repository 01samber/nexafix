"use client";

import { useCallback } from "react";
import { useBrochureNavigation } from "@/hooks/useBrochureNavigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { playTapSound } from "@/utils/playTapSound";
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
import { BrochureActions } from "@/components/ui/BrochureActions";
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

  const handleNavigate = useCallback(
    (index: number) => {
      if (isMobile) playTapSound();
      goTo(index);
    },
    [goTo, isMobile]
  );

  return (
    <div
      data-brochure-container
      className="relative flex min-h-dvh w-full max-w-[100%] touch-pan-y overflow-x-clip max-md:h-dvh max-md:max-h-dvh max-md:flex-col max-md:overflow-hidden md:block md:max-h-none"
    >
      <AmbientMotion />

      {/* Mobile: progress is in document flow so scenes scroll underneath nothing */}
      <ProgressIndicator currentIndex={currentIndex} onNavigate={handleNavigate} />

      {/* Scene stack — mobile: this region is the only vertical scroll container */}
      <div className="relative max-md:min-h-0 max-md:flex-1 max-md:overflow-x-hidden max-md:overflow-y-auto max-md:overscroll-y-contain max-md:pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:min-h-screen">
        <div className="relative min-h-full w-full md:min-h-screen">
          {SCENE_COMPONENTS.map((SceneComponent, i) => (
            <SceneWrapper key={i} isActive={i === currentIndex}>
              <SceneComponent />
            </SceneWrapper>
          ))}
        </div>
      </div>

      {/* Share - mobile only */}
      <div className="print:hidden">{isMobile && <BrochureActions />}</div>

      {/* Nav arrows - desktop only; mobile uses swipe */}
      {!isMobile && hasPrev && (
        <motion.button
          onClick={prev}
          className="fixed top-1/2 z-50 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 p-3 backdrop-blur-sm transition-all hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 left-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous"
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}
      {!isMobile && hasNext && (
        <motion.button
          onClick={next}
          className="fixed top-1/2 z-50 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 p-3 backdrop-blur-sm transition-all hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 right-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next"
        >
          <svg
            className="h-6 w-6 text-white"
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
        <div className="print:hidden fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm text-white/80">
            {currentIndex + 1} / 9
          </span>
        </div>
      )}
    </div>
  );
}
