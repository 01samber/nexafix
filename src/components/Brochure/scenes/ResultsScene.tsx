"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";
import { CONFIG } from "@/data/config";

const METRICS = [
  "Reduced downtime.",
  "Lower maintenance costs.",
  "Improved operational efficiency.",
];

export function ResultsScene() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        metricsRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
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
    <div className="relative flex min-h-full w-full flex-col items-center justify-center px-4 max-md:min-h-0 max-md:flex-1 sm:px-6 md:min-h-screen md:px-8">
      <Scene3DLazy variant="results" />
      <div className="relative z-10 max-w-3xl px-2 text-center">
        <h2
          ref={titleRef}
          className="font-display mb-8 text-2xl font-bold text-white sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl"
        >
          Real Impact
        </h2>
        <div ref={metricsRef} className="mb-8 space-y-4 sm:mb-10 sm:space-y-5 md:mb-12 md:space-y-6">
          {METRICS.map((metric) => (
            <motion.div key={metric} whileHover={{ scale: 1.02 }}>
              <span className="text-base font-medium text-white sm:text-lg md:text-xl lg:text-2xl">
                {metric}
              </span>
            </motion.div>
          ))}
        </div>
        <p
          ref={taglineRef}
          className="text-base font-medium text-[#00d4ff] sm:text-lg md:text-xl"
        >
          Built for businesses that can&apos;t afford interruptions.
        </p>
        <p className="mt-4 text-sm text-white/50">
          {CONFIG.facilitiesServed}+ facilities served
        </p>
        <blockquote className="mt-6 max-w-md text-sm italic text-white/60">
          &ldquo;{CONFIG.testimonial}&rdquo;
          <span className="block mt-1 not-italic text-white/40">{CONFIG.testimonialAttribution}</span>
        </blockquote>
      </div>
    </div>
  );
}
