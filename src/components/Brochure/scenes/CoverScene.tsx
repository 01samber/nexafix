"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";

const LOGO_SIZE = {
  cls: "h-[min(38vw,220px)] w-[min(85vw,320px)] sm:h-[min(32vw,260px)] sm:w-[min(72vw,340px)] md:h-[280px] md:w-[360px]",
};

export function CoverScene() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

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
        taglineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  return (
    <div className="relative flex min-h-full w-full flex-col items-center justify-center bg-transparent px-4 py-6 text-center max-md:min-h-0 max-md:flex-1 sm:px-6 md:min-h-dvh md:px-8">
      <Scene3DLazy variant="cover" />

      <motion.div
        className={`relative z-[11] mx-auto flex shrink-0 items-center justify-center ${LOGO_SIZE.cls}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 0.6 },
          rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-hidden
      >
        <Image
          src="/nexafix-logo.png"
          alt="Nexafix — NEXA LEVEL SERVICE"
          width={720}
          height={640}
          priority
          className="h-full w-full object-contain object-center drop-shadow-[0_0_28px_rgba(0,212,255,0.18)]"
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-4 pt-6 sm:gap-6 md:pt-10">
        <h1
          ref={headlineRef}
          className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_0_40px_rgba(0,212,255,0.3)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          Fix It Before
          <br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] bg-clip-text text-transparent">
            It Fails.
          </span>
        </h1>
        <p
          ref={subRef}
          className="font-body max-w-2xl text-lg leading-snug text-white/90 sm:text-lg md:text-xl lg:text-2xl"
        >
          Smart Facility Maintenance. Fast Response. Reliable Execution.
        </p>
        <p
          ref={taglineRef}
          className="font-display text-base font-semibold tracking-[0.32em] text-[#00d4ff]/80 sm:text-base sm:tracking-[0.4em]"
        >
          NEXA LEVEL SERVICE
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
