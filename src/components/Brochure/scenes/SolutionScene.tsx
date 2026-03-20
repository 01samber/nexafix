"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";

export function SolutionScene() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    )
      .fromTo(
        p1Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <Scene3DLazy variant="solution" />
      <div className="relative z-10 max-w-2xl text-center">
        <h2
          ref={titleRef}
          className="font-display mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Meet Nexafix
        </h2>
        <p
          ref={p1Ref}
          className="mb-4 text-base text-white/90 sm:mb-6 sm:text-lg md:text-xl"
        >
          Nexafix is your next-generation facility maintenance partner — built to
          deliver speed, reliability, and full operational control.
        </p>
        <p
          ref={taglineRef}
          className="text-lg font-semibold text-[#00d4ff] sm:text-xl md:text-2xl"
        >
          We don&apos;t just fix problems. We prevent them.
        </p>
      </div>
    </div>
  );
}
