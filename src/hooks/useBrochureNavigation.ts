"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { SCENES } from "@/data/scenes";
import { playTapSound } from "@/utils/playTapSound";

function eventFromSuccessGallery(target: EventTarget | null): boolean {
  if (typeof document === "undefined" || !(target instanceof Element)) return false;
  return Boolean(target.closest("[data-success-gallery-modal]"));
}

export function useBrochureNavigation() {
  const totalScenes = SCENES.length;

  const [currentIndex, setCurrentIndexState] = useState(0);

  const setCurrentIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalScenes - 1));
    setCurrentIndexState(clamped);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", String(clamped + 1));
      window.history.replaceState({}, "", url.toString());
    }
  }, [totalScenes]);

  const goTo = useCallback((index: number) => setCurrentIndex(index), [setCurrentIndex]);

  const next = useCallback(() => {
    setCurrentIndexState((i) => {
      const nextIdx = Math.min(i + 1, totalScenes - 1);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("page", String(nextIdx + 1));
        window.history.replaceState({}, "", url.toString());
      }
      return nextIdx;
    });
  }, [totalScenes]);

  const prev = useCallback(() => {
    setCurrentIndexState((i) => {
      const prevIdx = Math.max(i - 1, 0);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("page", String(prevIdx + 1));
        window.history.replaceState({}, "", url.toString());
      }
      return prevIdx;
    });
  }, []);

  const handleWheel = useCallback(
    (e: Event) => {
      if (eventFromSuccessGallery((e as WheelEvent).target)) return;
      const we = e as WheelEvent;
      if (Math.abs(we.deltaY) > 30) {
        we.preventDefault();
        if (we.deltaY > 0) next();
        else prev();
      }
    },
    [next, prev]
  );

  const touchStartX = useRef<number>(0);
  const handleTouchStart = useCallback((e: Event) => {
    const te = e as TouchEvent;
    if (eventFromSuccessGallery(te.target)) return;
    touchStartX.current = te.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: Event) => {
      const te = e as TouchEvent;
      if (eventFromSuccessGallery(te.target)) return;
      const touchEndX = te.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;
      if (Math.abs(diff) > 50) {
        playTapSound();
        if (diff > 0) next();
        else prev();
      }
    },
    [next, prev]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (typeof document !== "undefined" && document.querySelector("[data-success-gallery-modal]")) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
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
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page") ?? "1", 10);
    if (page >= 1 && page <= totalScenes) setCurrentIndexState(page - 1);
  }, [totalScenes]);

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
