"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";

/** Pinned ambient layer; height follows --app-vh from ViewportHeightFix for stable iOS/Android visible viewport. */
const AMBIENT_HEIGHT = "var(--app-vh, 100dvh)";

type AmbientVariant = "reduced" | "mobile" | "desktop";

function subscribeAmbientVariant(onChange: () => void) {
  const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mqMobile = window.matchMedia("(max-width: 767.98px)");
  const on = () => onChange();
  mqReduce.addEventListener("change", on);
  mqMobile.addEventListener("change", on);
  return () => {
    mqReduce.removeEventListener("change", on);
    mqMobile.removeEventListener("change", on);
  };
}

function getAmbientVariant(): AmbientVariant {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  if (window.matchMedia("(max-width: 767.98px)").matches) return "mobile";
  return "desktop";
}

function useAmbientVariant(): AmbientVariant {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      return subscribeAmbientVariant(onStoreChange);
    },
    getAmbientVariant,
    () => "desktop"
  );
}

/** Fully static: prefers-reduced-motion only. */
function AmbientMotionReduced() {
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-0 w-full overflow-x-hidden overflow-y-hidden bg-[#0a0e17]"
      style={{ height: AMBIENT_HEIGHT, minHeight: AMBIENT_HEIGHT }}
      aria-hidden
    >
      <div className="relative h-full min-h-full w-full">
        <div
          className="absolute inset-0 opacity-[0.06] max-md:opacity-[0.08] sm:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div
          className="absolute left-[-25%] right-[-25%] top-[12%] h-[min(56dvh,480px)] rounded-[45%] bg-gradient-to-b from-[#00d4ff]/0 via-[#00d4ff]/14 to-[#00a8d4]/0 blur-[40px] sm:blur-[56px]"
          aria-hidden
        />
        <div
          className="absolute -bottom-[15%] -right-[15%] h-[min(70vmin,520px)] w-[min(70vmin,520px)] rounded-full bg-[#0066aa]/12 blur-[56px]"
          aria-hidden
        />
      </div>
    </div>
  );
}

/** Phones / small tablets: rich look via CSS keyframes (compositor path). */
function AmbientMotionMobileCss() {
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-0 w-full overflow-x-hidden overflow-y-hidden bg-[#0a0e17] [transform:translateZ(0)]"
      style={{ height: AMBIENT_HEIGHT, minHeight: AMBIENT_HEIGHT }}
      aria-hidden
    >
      <div className="relative isolate h-full min-h-full w-full">
        <div className="nexafix-amb-m-grid absolute inset-0" aria-hidden />
        <div className="nexafix-amb-m-sheen1 absolute" aria-hidden />
        <div className="nexafix-amb-m-sheen2 absolute" aria-hidden />
        <div className="nexafix-amb-m-orb1 absolute" aria-hidden />
        <div className="nexafix-amb-m-orb2 absolute" aria-hidden />
        <div className="absolute inset-0">
          {[
            { top: 12, delay: 0 },
            { top: 32, delay: 0.7 },
            { top: 52, delay: 1.4 },
            { top: 72, delay: 2.1 },
            { top: 88, delay: 2.8 },
          ].map(({ top, delay }) => (
            <div
              key={top}
              className="nexafix-amb-m-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/32 to-transparent"
              style={{ top: `${top}%`, animationDelay: `${delay}s` }}
              aria-hidden
            />
          ))}
          <div
            className="nexafix-amb-m-line-v absolute top-0 left-[22%] h-full w-px bg-gradient-to-b from-[#00d4ff]/16 via-[#00d4ff]/8 to-[#00a8d4]/14"
            aria-hidden
          />
          <div
            className="nexafix-amb-m-line-b absolute bottom-[8%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00a8d4]/26 to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

function AmbientMotionDesktop() {
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-0 w-full overflow-x-hidden overflow-y-hidden bg-[#0a0e17]"
      style={{ height: AMBIENT_HEIGHT, minHeight: AMBIENT_HEIGHT }}
      aria-hidden
    >
      <div className="relative h-full min-h-full w-full">
        <motion.div
          className="absolute left-[-30%] right-[-30%] h-[min(70dvh,520px)] max-md:h-[min(75dvh,640px)] rounded-[45%] bg-gradient-to-b from-[#00d4ff]/0 via-[#00d4ff]/18 to-[#00a8d4]/0 blur-[72px] sm:blur-[100px]"
          initial={{ top: "-35%" }}
          animate={{ top: ["-35%", "92%", "-35%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />

        <motion.div
          className="absolute left-[-15%] right-[-15%] h-[min(55dvh,420px)] max-md:h-[min(60dvh,520px)] rounded-[50%] bg-gradient-to-b from-[#0066aa]/0 via-[#0066aa]/22 to-transparent blur-[64px] sm:blur-[88px]"
          initial={{ top: "95%" }}
          animate={{ top: ["95%", "-40%", "95%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />

        <motion.div
          className="absolute -left-[22%] -top-[18%] h-[min(98vmin,940px)] w-[min(98vmin,940px)] rounded-full bg-[#00d4ff]/10 blur-[100px] sm:-left-1/4 sm:-top-1/4 sm:h-[82vh] sm:w-[82vw] sm:blur-[120px]"
          animate={{
            x: [0, 18, 0],
            y: [0, 72, 0],
            scale: [1, 1.07, 1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.div
          className="absolute -bottom-[22%] -right-[18%] h-[min(88vmin,860px)] w-[min(88vmin,860px)] rounded-full bg-[#0066aa]/15 blur-[90px] sm:-bottom-1/4 sm:-right-1/4 sm:h-[62vh] sm:w-[62vw] sm:blur-[100px]"
          animate={{
            x: [0, -22, 0],
            y: [0, -68, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />

        <motion.div
          className="absolute inset-0 opacity-[0.042] max-md:opacity-[0.055] sm:opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "0px 44px"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />

        <div className="absolute inset-0">
          {[
            { top: 12, delay: 0 },
            { top: 32, delay: 0.7 },
            { top: 52, delay: 1.4 },
            { top: 72, delay: 2.1 },
            { top: 88, delay: 2.8 },
          ].map(({ top, delay }) => (
            <motion.div
              key={top}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/28 to-transparent max-md:via-[#00d4ff]/32 sm:via-[#00d4ff]/22"
              style={{ top: `${top}%` }}
              animate={{ opacity: [0.15, 0.72, 0.15] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
              aria-hidden
            />
          ))}

          <motion.div
            className="absolute top-0 h-full w-px max-md:left-[22%] left-[30%] bg-gradient-to-b from-[#00d4ff]/16 via-[#00d4ff]/8 to-[#00a8d4]/14"
            animate={{ opacity: [0.22, 0.55, 0.22] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          <motion.div
            className="absolute bottom-[8%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00a8d4]/20 to-transparent max-md:via-[#00a8d4]/26"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

export function AmbientMotion() {
  const variant = useAmbientVariant();
  if (variant === "reduced") return <AmbientMotionReduced />;
  if (variant === "mobile") return <AmbientMotionMobileCss />;
  return <AmbientMotionDesktop />;
}
