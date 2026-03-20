"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";

const STEPS = ["Assess", "Plan", "Execute", "Monitor", "Optimize"];

export function ProcessScene() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        flowRef.current?.children ?? [],
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <Scene3DLazy variant="process" />
      <div className="relative z-10 max-w-3xl px-2 text-center">
        <h2
          ref={titleRef}
          className="font-display mb-12 text-3xl font-bold text-white sm:text-4xl"
        >
          How It Works
        </h2>
        <div
          ref={flowRef}
          className="mb-8 flex flex-wrap items-center justify-center gap-1.5 sm:mb-10 sm:gap-2 md:mb-12 md:gap-4"
        >
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center">
              <motion.span
                className="glass-panel rounded-lg px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:text-base"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
              >
                {step}
              </motion.span>
              {i < STEPS.length - 1 && (
                <span className="mx-1 text-[#00d4ff] sm:mx-2">→</span>
              )}
            </div>
          ))}
        </div>
        <p
          ref={taglineRef}
          className="text-base text-white/80 sm:text-lg md:text-xl"
        >
          We handle everything — so you don&apos;t have to.
        </p>
      </div>
    </div>
  );
}
