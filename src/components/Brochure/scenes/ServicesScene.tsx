"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";

const SERVICES = [
  {
    title: "Facility Maintenance",
    detail: "Electrical · HVAC · Plumbing",
  },
  {
    title: "Soft Services",
    detail: "Cleaning · Waste Management",
  },
  {
    title: "Smart Solutions",
    detail: "Preventive Maintenance · AI-Driven Tracking",
  },
  {
    title: "Specialized Services",
    detail: "Fit-Outs · Technical Inspections",
  },
];

export function ServicesScene() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    ).fromTo(
      cardsRef.current?.children ?? [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

  return (
    <div className="relative flex min-h-min w-full flex-col items-center justify-center gap-4 px-4 py-6 max-md:min-h-0 max-md:flex-1 sm:gap-6 sm:px-6 sm:py-10 md:min-h-dvh md:overflow-y-auto md:px-8 md:py-12">
      <Scene3DLazy variant="services" />
      <h2
        ref={titleRef}
        className="relative z-10 font-display mb-4 shrink-0 text-center text-xl font-bold text-white sm:mb-6 sm:text-2xl md:mb-8 md:text-3xl lg:text-4xl"
      >
        What We Do
      </h2>
      <div
        ref={cardsRef}
        className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2"
      >
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            className="group cursor-pointer py-4 text-center sm:py-5 sm:text-left"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-[#00d4ff]">
              {service.title}
            </h3>
            <p className="text-sm text-white/70">{service.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
