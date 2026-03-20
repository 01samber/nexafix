"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";

export function ProblemScene() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        line1Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        line2Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-8">
      <Scene3DLazy variant="problem" />
      <div className="relative z-10 glass-panel-elevated mx-4 max-w-2xl rounded-2xl p-6 sm:p-10 md:p-12 lg:p-16">
        <h2
          ref={titleRef}
          className="font-display mb-6 text-2xl font-bold text-white sm:mb-8 sm:text-3xl md:text-4xl"
        >
          Sound Familiar?
        </h2>
        <p
          ref={line1Ref}
          className="mb-3 text-lg font-medium text-[#00d4ff] sm:mb-4 sm:text-xl md:text-2xl"
        >
          Delays. Poor follow-ups. Unexpected breakdowns.
        </p>
        <p
          ref={line2Ref}
          className="text-base text-white/80 sm:text-lg md:text-xl"
        >
          Facility maintenance shouldn&apos;t slow your business down — but it often
          does.
        </p>
        {/* Broken workflow visual */}
        <motion.div
          className="mt-12 flex gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 0.4, scale: 1 },
              }}
              className="h-2 flex-1 rounded-full bg-white/30"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
