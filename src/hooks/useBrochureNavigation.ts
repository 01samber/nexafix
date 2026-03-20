"use client";

import { useState, useCallback, useEffect } from "react";
import { SCENES } from "@/data/scenes";

export function useBrochureNavigation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalScenes = SCENES.length;

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalScenes - 1));
    setCurrentIndex(clamped);
  }, [totalScenes]);

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, totalScenes - 1));
  }, [totalScenes]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleWheel = useCallback(
    (e: Event) => {
      const we = e as WheelEvent;
      if (Math.abs(we.deltaY) > 30) {
        we.preventDefault();
        if (we.deltaY > 0) next();
        else prev();
      }
    },
    [next, prev]
  );

  const handleTouchStart = useCallback((e: Event) => {
    const te = e as TouchEvent;
    (window as unknown as { touchStartY?: number }).touchStartY =
      te.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: Event) => {
      const te = e as TouchEvent;
      const touchEndY = te.changedTouches[0].clientY;
      const touchStartY = (window as unknown as { touchStartY?: number }).touchStartY ?? touchEndY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
    },
    [next, prev]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(totalScenes - 1);
      }
    },
    [next, prev, goTo, totalScenes]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const container = document.querySelector("[data-brochure-container]");
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    const container = document.querySelector("[data-brochure-container]");
    if (!container) return;
    container.addEventListener("touchstart", handleTouchStart as EventListener, { passive: true });
    container.addEventListener("touchend", handleTouchEnd as EventListener, { passive: true });
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return {
    currentIndex,
    currentScene: SCENES[currentIndex],
    goTo,
    next,
    prev,
    hasNext: currentIndex < totalScenes - 1,
    hasPrev: currentIndex > 0,
    totalScenes,
  };
}
