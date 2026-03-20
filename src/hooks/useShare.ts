"use client";

import { useCallback } from "react";

export function useShare() {
  return useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.share) return false;
    try {
      await navigator.share({
        title: "Nexafix | Fix It Before It Fails",
        text: "Smart Facility Maintenance. Fast Response. Reliable Execution.",
        url: window.location.href,
      });
      return true;
    } catch {
      return false;
    }
  }, []);
}
