"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";

const PROOF_POINTS = [
  "Fast response. No delays.",
  "Reliable execution. No excuses.",
  "Data-driven maintenance decisions.",
  "Built to scale across multiple sites.",
  "Clear reporting. Full transparency.",
];

export function WhyNexafixScene() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6 }
    ).fromTo(
      listRef.current?.children ?? [],
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

  return (
    <div className="relative flex min-h-full w-full flex-col items-center justify-center px-4 sm:px-6 md:min-h-screen md:px-8">
      <Scene3DLazy variant="why" />
      <div className="relative z-10 max-w-2xl px-2">
        <h2
          ref={titleRef}
          className="font-display mb-8 text-2xl font-bold text-white sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl"
        >
          Why Nexafix?
        </h2>
        <div ref={listRef} className="space-y-5">
          {PROOF_POINTS.map((point) => (
            <motion.div
              key={point}
              className="flex items-center gap-4"
              whileHover={{ x: 8 }}
            >
              <span className="h-1 w-8 shrink-0 rounded-full bg-[#00d4ff]" />
              <span className="text-base text-white/90 sm:text-lg md:text-xl">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
