"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";
import { CONFIG } from "@/data/config";

const FOOTER = [
  "Nexafix",
  CONFIG.website.replace(/^https?:\/\//, ""),
  CONFIG.email,
  CONFIG.phone,
];

export function BackCoverScene() {
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      footerRef.current?.children ?? [],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
      },
      "-=0.4"
    );
  }, []);

  return (
    <div className="relative flex min-h-full w-full flex-col items-center justify-center px-4 max-md:min-h-0 max-md:flex-1 sm:px-6 md:min-h-screen md:px-8">
      <Scene3DLazy variant="back" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2
          ref={taglineRef}
          className="font-display mb-10 text-2xl font-bold text-white sm:mb-12 sm:text-3xl md:mb-16 md:text-4xl lg:text-5xl"
        >
          Maintenance You Can
          <br />
          <span className="text-[#00d4ff]">Finally Trust.</span>
        </h2>
        <div
          ref={footerRef}
          className="space-y-1.5 text-xs text-white/70 sm:space-y-2 sm:text-sm md:text-base"
        >
          {FOOTER.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <p
          className="font-display mt-8 text-lg font-bold tracking-[0.15em] text-[#00d4ff] sm:mt-10 sm:text-xl sm:tracking-[0.2em] md:mt-12"
        >
          NEXAFIX
        </p>
      </div>
    </div>
  );
}
