"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "motion/react";
import type { MainGalleryItem } from "@/data/mainGallery";
import { MediaViewerCloseControl } from "@/components/Brochure/gallery/MediaViewerCloseControl";

/**
 * Animation when changing items in the viewer.
 * - "slideBlur" — directional slide with a quick blur (easy to compare feel vs. brochure page transitions).
 * - "fadeStack" — scale + vertical crossfade; calmer on small screens.
 */
export type GalleryLightboxTransition = "slideBlur" | "fadeStack";

export const GALLERY_LIGHTBOX_TRANSITION: GalleryLightboxTransition = "slideBlur";

type GalleryMediaLightboxProps = {
  items: MainGalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

const slideBlurVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "18%" : "-18%",
    opacity: 0,
    filter: "blur(10px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "-14%" : "14%",
    opacity: 0,
    filter: "blur(8px)",
  }),
};

const fadeStackVariants: Variants = {
  enter: { scale: 0.94, opacity: 0, y: 14 },
  center: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 1.03, opacity: 0, y: -10 },
};

export function GalleryMediaLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: GalleryMediaLightboxProps) {
  const open = index !== null && items.length > 0;
  const safeIndex = open ? Math.max(0, Math.min(index!, items.length - 1)) : 0;
  const active = open ? items[safeIndex] : null;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [direction, setDirection] = useState(0);

  const goPrev = useCallback(() => {
    if (index === null || index <= 0) return;
    setDirection(-1);
    onIndexChange(index - 1);
  }, [index, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null || index >= items.length - 1) return;
    setDirection(1);
    onIndexChange(index + 1);
  }, [index, items.length, onIndexChange]);

  const pick = useCallback(
    (i: number) => {
      if (index === null) return;
      setDirection(i > index ? 1 : -1);
      onIndexChange(i);
    },
    [index, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, [safeIndex, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goPrev, goNext]);

  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);

  const onMediaTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      t: Date.now(),
    };
  };

  const onMediaTouchEnd = (e: React.TouchEvent) => {
    const s = touchStart.current;
    touchStart.current = null;
    if (!s || index === null) return;
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    const dx = x - s.x;
    const dy = y - s.y;
    const dt = Date.now() - s.t;
    if (dt > 900) return;
    if (dy > 64 && dy > Math.abs(dx) * 1.15) {
      onClose();
      return;
    }
    if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.05) {
      if (dx > 0) goPrev();
      else goNext();
    }
  };

  const variants =
    GALLERY_LIGHTBOX_TRANSITION === "fadeStack" ? fadeStackVariants : slideBlurVariants;
  const useCustom = GALLERY_LIGHTBOX_TRANSITION === "slideBlur";

  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  useLayoutEffect(() => {
    setPortalEl(document.body);
  }, []);

  const overlay = (
    <AnimatePresence>
      {open && active && (
        <motion.div
          data-main-gallery-lightbox
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[600] flex min-h-0 flex-col bg-black/94 backdrop-blur-md"
          style={{
            paddingTop: "max(0.5rem, env(safe-area-inset-top, 0px))",
            paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))",
            paddingLeft: "max(0.5rem, env(safe-area-inset-left, 0px))",
            paddingRight: "max(0.5rem, env(safe-area-inset-right, 0px))",
          }}
        >
          <MediaViewerCloseControl
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="fixed z-[610] max-md:top-[max(0.75rem,env(safe-area-inset-top,0px))] max-md:right-[max(0.75rem,env(safe-area-inset-right,0px))] md:top-6 md:right-6"
          />

          <div
            className="relative flex min-h-0 flex-1 items-stretch justify-center px-2 pt-14 pb-2 md:px-10 md:pt-4 md:pb-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <div
              className="flex min-h-0 w-full max-w-[100vw] flex-1 flex-col items-center justify-center md:max-w-none"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onMediaTouchStart}
              onTouchEnd={onMediaTouchEnd}
            >
              {/* Mobile: scroll so caption + thumbs stay reachable; desktop: centered column */}
              <div className="relative flex h-full min-h-0 w-full max-md:max-h-full max-md:overflow-y-auto max-md:overflow-x-hidden max-md:overscroll-y-contain flex-col items-center justify-start max-md:pt-1 md:justify-center md:min-h-[240px]">
                <div className="relative flex w-full min-h-0 max-md:flex-none md:flex-1 md:items-center md:justify-center">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={`${safeIndex}-${active.src}`}
                      custom={useCustom ? direction : undefined}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: GALLERY_LIGHTBOX_TRANSITION === "fadeStack" ? 0.28 : 0.32,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="flex w-full items-center justify-center px-1 py-1 max-md:min-h-0 md:h-full md:px-14"
                    >
                      {active.kind === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element -- lightbox zoom / iOS
                        <img
                          src={active.src}
                          alt=""
                          className={`h-auto w-auto max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10 md:max-w-full ${
                            active.caption
                              ? "max-h-[min(82dvh,calc(100dvh-10rem))] max-md:max-h-[min(52dvh,calc(100dvh-11rem))]"
                              : "max-h-[82dvh] max-md:max-h-[min(78dvh,calc(100dvh-8rem))]"
                          } md:max-h-[min(76dvh,100%)]`}
                          draggable={false}
                        />
                      ) : (
                        <video
                          ref={videoRef}
                          src={active.src}
                          className={`h-auto w-full rounded-xl bg-black object-contain shadow-2xl ring-1 ring-white/10 md:max-w-[min(100%,96rem)] ${
                            active.caption
                              ? "max-h-[82dvh] max-md:max-h-[min(46dvh,calc(100dvh-12rem))]"
                              : "max-h-[82dvh] max-md:max-h-[min(70dvh,calc(100dvh-9rem))]"
                          } md:max-h-[min(68dvh,100%)]`}
                          controls
                          playsInline
                          autoPlay
                          preload="auto"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {items.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous"
                        onClick={(e) => {
                          e.stopPropagation();
                          goPrev();
                        }}
                        disabled={safeIndex <= 0}
                        className="absolute left-0 top-1/2 z-[605] flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-r-xl border border-white/15 bg-black/55 text-white backdrop-blur-sm transition enabled:active:scale-95 enabled:hover:bg-black/75 disabled:opacity-25 md:left-2 md:min-h-12 md:min-w-12"
                      >
                        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Next"
                        onClick={(e) => {
                          e.stopPropagation();
                          goNext();
                        }}
                        disabled={safeIndex >= items.length - 1}
                        className="absolute right-0 top-1/2 z-[605] flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-l-xl border border-white/15 bg-black/55 text-white backdrop-blur-sm transition enabled:active:scale-95 enabled:hover:bg-black/75 disabled:opacity-25 md:right-2 md:min-h-12 md:min-w-12"
                      >
                        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {active.caption ? (
                  <p
                    className="mt-2 max-w-[min(100%,36rem)] shrink-0 px-3 pb-2 text-center text-[11px] leading-relaxed tracking-wide text-white/82 max-md:mt-2.5 sm:text-xs md:mt-4 md:max-w-2xl md:pb-1 md:text-[15px] md:leading-snug md:tracking-normal md:text-white/88"
                  >
                    {active.caption}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {items.length > 1 && (
            <div
              className="scrollbar-thin max-h-24 shrink-0 overflow-x-auto overflow-y-hidden border-t border-white/10 bg-black/40 px-2 py-2"
              style={{ WebkitOverflowScrolling: "touch" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex w-max gap-2 pb-1">
                {items.map((item, i) => (
                  <button
                    key={`${item.src}-thumb`}
                    type="button"
                    onClick={() => pick(i)}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-16 ${
                      i === safeIndex
                        ? "border-[#00d4ff] ring-2 ring-[#00d4ff]/30"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Open item ${i + 1}`}
                  >
                    {item.kind === "image" ? (
                      <Image src={item.src} alt="" fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#0d1321] text-lg text-[#00d4ff]">
                        ▶
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!portalEl) return null;

  return createPortal(overlay, portalEl);
}
