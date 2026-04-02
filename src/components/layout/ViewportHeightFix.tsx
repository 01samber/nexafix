"use client";

import { useEffect } from "react";

/**
 * Sets --app-vh on :root to the real visible height (visualViewport + fallbacks).
 * Fixes iOS Safari clipping where 100dvh/100lvh stacks disagree with the chrome UI.
 */
export function ViewportHeightFix() {
  useEffect(() => {
    const set = () => {
      const h =
        typeof window !== "undefined"
          ? window.visualViewport?.height ?? window.innerHeight
          : 0;
      if (h > 0) {
        document.documentElement.style.setProperty("--app-vh", `${h}px`);
      }
    };

    set();
    requestAnimationFrame(set);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", set);
    vv?.addEventListener("scroll", set);
    window.addEventListener("resize", set);
    window.addEventListener("orientationchange", set);
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) set();
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      vv?.removeEventListener("resize", set);
      vv?.removeEventListener("scroll", set);
      window.removeEventListener("resize", set);
      window.removeEventListener("orientationchange", set);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
