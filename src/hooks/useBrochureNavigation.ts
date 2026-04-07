"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { SCENES } from "@/data/scenes";
import { playTapSound } from "@/utils/playTapSound";

function eventFromInteractiveOverlay(target: EventTarget | null): boolean {
  if (typeof document === "undefined" || !(target instanceof Element)) return false;
  return Boolean(
    target.closest("[data-success-gallery-modal]") ||
      target.closest("[data-main-gallery-lightbox]")
  );
}

function eventFromProjectGalleryPage(target: EventTarget | null): boolean {
  if (typeof document === "undefined" || !(target instanceof Element)) return false;
  return Boolean(target.closest("[data-project-gallery-scene]"));
}

/** Touch must begin in this inset from the left or right edge to count as a brochure page swipe (avoids fighting gallery / scroll). */
function brochureSwipeEdgeInsetPx(): number {
  if (typeof window === "undefined") return 56;
  const w = window.innerWidth;
  return Math.min(64, Math.max(40, Math.round(w * 0.11)));
}

function touchStartedInBrochureEdge(clientX: number): boolean {
  const inset = brochureSwipeEdgeInsetPx();
  const w = window.innerWidth;
  return clientX <= inset || clientX >= w - inset;
}

type BrochureTouchGesture = {
  startX: number;
  startY: number;
  edgeEligible: boolean;
};

/** Defer URL updates so we never call history.replaceState during React render (Next.js Router sync). */
function schedulePageParam(page1Based: number) {
  queueMicrotask(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(page1Based));
    window.history.replaceState({}, "", url.toString());
  });
}

export function useBrochureNavigation() {
  const totalScenes = SCENES.length;

  const [currentIndex, setCurrentIndexState] = useState(0);

  const setCurrentIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalScenes - 1));
    setCurrentIndexState(clamped);
    schedulePageParam(clamped + 1);
  }, [totalScenes]);

  const goTo = useCallback((index: number) => setCurrentIndex(index), [setCurrentIndex]);

  const next = useCallback(() => {
    setCurrentIndexState((i) => {
      const nextIdx = Math.min(i + 1, totalScenes - 1);
      schedulePageParam(nextIdx + 1);
      return nextIdx;
    });
  }, [totalScenes]);

  const prev = useCallback(() => {
    setCurrentIndexState((i) => {
      const prevIdx = Math.max(i - 1, 0);
      schedulePageParam(prevIdx + 1);
      return prevIdx;
    });
  }, []);

  const handleWheel = useCallback(
    (e: Event) => {
      if (
        eventFromInteractiveOverlay((e as WheelEvent).target) ||
        eventFromProjectGalleryPage((e as WheelEvent).target)
      )
        return;
      const we = e as WheelEvent;
      if (Math.abs(we.deltaY) > 30) {
        we.preventDefault();
        if (we.deltaY > 0) next();
        else prev();
      }
    },
    [next, prev]
  );

  /**
   * Mobile brochure pages: only edge-started horizontal swipes change the page.
   * Center horizontal drags stay with the content (e.g. photo grid, scrolling) / lightbox (portaled).
   */
  const touchGesture = useRef<BrochureTouchGesture | null>(null);

  const handleTouchStart = useCallback((e: Event) => {
    const te = e as TouchEvent;
    if (eventFromInteractiveOverlay(te.target)) {
      touchGesture.current = null;
      return;
    }
    const t0 = te.touches[0];
    const x = t0.clientX;
    const y = t0.clientY;
    touchGesture.current = {
      startX: x,
      startY: y,
      edgeEligible: touchStartedInBrochureEdge(x),
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: Event) => {
      const te = e as TouchEvent;
      if (eventFromInteractiveOverlay(te.target)) {
        touchGesture.current = null;
        return;
      }
      const g = touchGesture.current;
      touchGesture.current = null;
      if (!g?.edgeEligible) return;

      const end = te.changedTouches[0];
      const dx = g.startX - end.clientX;
      const dy = g.startY - end.clientY;
      const minHoriz = 52;
      if (Math.abs(dx) < minHoriz) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.15) return;

      playTapSound();
      if (dx > 0) next();
      else prev();
    },
    [next, prev]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        typeof document !== "undefined" &&
        (document.querySelector("[data-success-gallery-modal]") ||
          document.querySelector("[data-main-gallery-lightbox]"))
      ) {
        return;
      }
      const t = e.target;
      if (typeof document !== "undefined" && t instanceof Node && eventFromProjectGalleryPage(t)) {
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
    const raw = parseInt(params.get("page") ?? "1", 10);
    const page = Number.isFinite(raw) ? raw : 1;
    const clamped = Math.min(Math.max(page, 1), totalScenes);
    setCurrentIndexState(clamped - 1);
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
    const onTouchCancel = () => {
      touchGesture.current = null;
    };
    container.addEventListener("touchstart", handleTouchStart as EventListener, { passive: true });
    container.addEventListener("touchend", handleTouchEnd as EventListener, { passive: true });
    container.addEventListener("touchcancel", onTouchCancel, { passive: true });
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", onTouchCancel);
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
