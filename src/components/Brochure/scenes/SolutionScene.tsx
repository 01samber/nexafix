"use client";

import { useRef, useEffect } from "react";
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
    <div className="relative flex min-h-full w-full flex-col items-center justify-center px-4 max-md:min-h-0 max-md:flex-1 sm:px-6 md:min-h-screen md:px-8">
      <Scene3DLazy variant="solution" />
      <div className="relative z-10 mx-4 max-w-2xl px-4 py-6 text-center sm:px-6 sm:py-8 md:py-10">
        <h2
          ref={titleRef}
          className="font-display mb-5 text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] sm:mb-6 sm:text-3xl md:mb-7 md:text-4xl lg:text-5xl"
        >
          Meet{" "}
          <span className="bg-gradient-to-r from-[#5cecff] via-[#00d4ff] to-[#00a8d4] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,212,255,0.55)]">
            Nexafix
          </span>
        </h2>
        <p
          ref={p1Ref}
          className="mb-5 text-base leading-relaxed sm:mb-6 sm:text-lg md:text-xl"
        >
          <span className="font-semibold text-[#7df0ff] drop-shadow-[0_0_14px_rgba(0,212,255,0.35)]">
            Nexafix is your next-generation facility maintenance partner
          </span>
          <span className="text-white">
            {" "}
            — built to deliver speed, reliability, and full operational control.
          </span>
        </p>
        <p
          ref={taglineRef}
          className="text-lg font-bold tracking-tight text-[#00eeff] drop-shadow-[0_0_28px_rgba(0,228,255,0.5)] sm:text-xl md:text-2xl"
        >
          We don&apos;t just fix problems. We prevent them.
        </p>
      </div>
    </div>
  );
}
