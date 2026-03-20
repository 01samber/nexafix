"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";

export function CoverScene() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        brandRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center px-4 py-6 text-center sm:px-6 md:px-8">
      <Scene3DLazy variant="cover" />
      {/* On mobile: extra top padding so text sits below 3D zone; desktop: centered */}
      <div className="relative z-10 flex flex-col items-center gap-4 pt-[28vh] sm:pt-0 sm:gap-6">
        <h1
          ref={headlineRef}
          className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_0_40px_rgba(0,212,255,0.3)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          Fix It Before
          <br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] bg-clip-text text-transparent">
            It Fails.
          </span>
        </h1>
        <p
          ref={subRef}
          className="font-body max-w-2xl text-base text-white/90 sm:text-lg md:text-xl lg:text-2xl"
        >
          Smart Facility Maintenance. Fast Response. Reliable Execution.
        </p>
        <p
          ref={brandRef}
          className="font-display mt-6 text-xl font-bold tracking-[0.2em] text-[#00d4ff] sm:mt-8 sm:text-2xl sm:tracking-[0.3em] md:text-3xl"
        >
          NEXAFIX
        </p>
      </div>
      <motion.div
        className="absolute bottom-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
        aria-hidden
      />
    </div>
  );
}
