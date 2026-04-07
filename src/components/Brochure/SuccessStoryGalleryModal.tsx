"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import type { SuccessStory } from "@/data/successStories";
import { storyImageSrc } from "@/data/successStories";
import { MediaViewerCloseControl } from "@/components/Brochure/gallery/MediaViewerCloseControl";
import {
  GALLERY_LIGHTBOX_TRANSITION,
  fadeStackVariants,
  lightboxSlideTransition,
  slideBlurVariants,
} from "@/components/Brochure/gallery/galleryLightboxMotion";

interface Props {
  story: SuccessStory | null;
  onClose: () => void;
}

export function SuccessStoryGalleryModal({ story, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {story ? (
        <GalleryModalInner key={story.id} story={story} onClose={onClose} />
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

function GalleryModalInner({ story, onClose }: { story: SuccessStory; onClose: () => void }) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);

  const n = story.images.length;

  const goNext = useCallback(() => {
    if (viewerIndex === null || viewerIndex >= n - 1) return;
    setDirection(1);
    setViewerIndex(viewerIndex + 1);
  }, [viewerIndex, n]);

  const goPrev = useCallback(() => {
    if (viewerIndex === null || viewerIndex <= 0) return;
    setDirection(-1);
    setViewerIndex(viewerIndex - 1);
  }, [viewerIndex]);

  /** Same gesture feel as main gallery lightbox: time limit, swipe down returns to grid */
  const onViewerTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      t: Date.now(),
    };
  }, []);

  const onViewerTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation();
      const s = touchStart.current;
      touchStart.current = null;
      if (s === null || viewerIndex === null) return;
      const x = e.changedTouches[0].clientX;
      const y = e.changedTouches[0].clientY;
      const dx = x - s.x;
      const dy = y - s.y;
      const dt = Date.now() - s.t;
      if (dt > 900) return;
      if (dy > 64 && dy > Math.abs(dx) * 1.15) {
        setViewerIndex(null);
        return;
      }
      if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.05) {
        if (dx > 0) {
          setDirection(-1);
          setViewerIndex((c) => (c === null || c <= 0 ? c : c - 1));
        } else {
          setDirection(1);
          setViewerIndex((c) => (c === null || c >= n - 1 ? c : c + 1));
        }
      }
    },
    [viewerIndex, n]
  );

  const openViewer = useCallback((index: number) => {
    setDirection(0);
    setViewerIndex(Math.max(0, Math.min(index, n - 1)));
  }, [n]);

  const closeViewer = useCallback(() => setViewerIndex(null), []);

  const pickThumb = useCallback(
    (i: number) => {
      if (viewerIndex === null) return;
      setDirection(i > viewerIndex ? 1 : -1);
      setViewerIndex(Math.max(0, Math.min(i, n - 1)));
    },
    [viewerIndex, n]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (viewerIndex !== null) {
          e.preventDefault();
          e.stopPropagation();
          closeViewer();
        } else {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }
        return;
      }
      if (viewerIndex === null) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        goPrev();
      }
    },
    [viewerIndex, closeViewer, onClose, goNext, goPrev]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey, true);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey, true);
    };
  }, [handleKey]);

  const blockBrochureBubble = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  const variants =
    GALLERY_LIGHTBOX_TRANSITION === "fadeStack" ? fadeStackVariants : slideBlurVariants;
  const useCustom = GALLERY_LIGHTBOX_TRANSITION === "slideBlur";

  const currentSrc =
    viewerIndex !== null ? storyImageSrc(story.imageFolder, story.images[viewerIndex]) : "";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo gallery: ${story.subtitle}`}
      data-success-gallery-modal
      className="fixed inset-0 z-[560] flex flex-col bg-black/94 backdrop-blur-md"
      style={{ touchAction: "auto" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onTouchStart={blockBrochureBubble}
      onTouchEnd={blockBrochureBubble}
      onTouchMove={blockBrochureBubble}
      onPointerDown={blockBrochureBubble}
    >
      <header
        className="flex shrink-0 items-start justify-between gap-2 border-b border-white/10 px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:gap-4 sm:px-6 sm:py-4"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="min-w-0 pr-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#00d4ff]/80 sm:text-xs sm:tracking-widest">
            Project photography
          </p>
          <h2 className="font-display mt-0.5 max-w-3xl text-sm font-semibold leading-snug text-white sm:mt-1 sm:text-lg">
            {story.subtitle}
          </h2>
          <p className="mt-0.5 text-[10px] leading-snug text-white/50 sm:mt-1 sm:text-sm">
            {viewerIndex !== null ? (
              <>
                Photo {viewerIndex + 1} of {n}. Swipe sideways for next or previous. Swipe down for
                grid.
              </>
            ) : (
              <>
                {n} photos. Tap one to enlarge. Same controls as the portfolio gallery.
              </>
            )}
          </p>
        </div>
        <MediaViewerCloseControl
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="shrink-0"
        />
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewerIndex !== null ? (
            <motion.div
              key="viewer"
              className="absolute inset-0 flex min-h-0 flex-col bg-[#050508]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="relative flex min-h-0 flex-1 touch-manipulation items-stretch justify-center px-2 pt-1 sm:px-4"
                onTouchStart={onViewerTouchStart}
                onTouchEnd={onViewerTouchEnd}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <div className="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center md:min-h-[200px]">
                  <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                      <motion.div
                        key={`${viewerIndex}-${currentSrc}`}
                        custom={useCustom ? direction : undefined}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={lightboxSlideTransition(GALLERY_LIGHTBOX_TRANSITION)}
                        className="flex h-full w-full items-center justify-center px-1 md:px-10"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={currentSrc}
                          alt={`${story.subtitle}, photo ${viewerIndex + 1} of ${n}`}
                          className="h-auto w-auto max-h-[min(82dvh,calc(100dvh-11rem))] max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10 sm:max-h-[min(78dvh,calc(100dvh-10rem))] md:max-h-[min(74dvh,100%)]"
                          draggable={false}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {n > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Previous"
                          onClick={(e) => {
                            e.stopPropagation();
                            goPrev();
                          }}
                          disabled={viewerIndex <= 0}
                          className="absolute left-0 top-1/2 z-[605] flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-r-xl border border-white/15 bg-black/55 text-white backdrop-blur-sm transition enabled:active:scale-95 enabled:hover:bg-black/75 disabled:opacity-25 sm:left-2 md:min-h-12 md:min-w-12"
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
                          disabled={viewerIndex >= n - 1}
                          className="absolute right-0 top-1/2 z-[605] flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-l-xl border border-white/15 bg-black/55 text-white backdrop-blur-sm transition enabled:active:scale-95 enabled:hover:bg-black/75 disabled:opacity-25 sm:right-2 md:min-h-12 md:min-w-12"
                        >
                          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {n > 1 && (
                <div
                  className="scrollbar-thin max-h-24 shrink-0 overflow-x-auto overflow-y-hidden border-t border-white/10 bg-black/40 px-2 py-2"
                  style={{ WebkitOverflowScrolling: "touch" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex w-max gap-2 pb-1">
                    {story.images.map((filename, i) => (
                      <button
                        key={`${filename}-thumb`}
                        type="button"
                        onClick={() => pickThumb(i)}
                        className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-16 ${
                          i === viewerIndex
                            ? "border-[#00d4ff] ring-2 ring-[#00d4ff]/30"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`Open photo ${i + 1}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={storyImageSrc(story.imageFolder, filename)}
                          alt=""
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex shrink-0 items-center justify-center gap-4 border-t border-white/10 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
                <p className="text-center text-xs tabular-nums text-white/80 sm:text-sm">
                  {viewerIndex + 1} / {n}
                </p>
                <button
                  type="button"
                  onClick={closeViewer}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white/90 hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/10 sm:text-sm"
                >
                  All thumbnails
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="absolute inset-0 overflow-y-auto overscroll-contain px-2 py-3 pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:px-6 sm:py-6"
              style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onTouchStart={blockBrochureBubble}
              onTouchMove={blockBrochureBubble}
              onTouchEnd={blockBrochureBubble}
              onWheel={blockBrochureBubble}
            >
              <div className="mx-auto grid max-w-6xl grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
                {story.images.map((filename, index) => (
                  <motion.button
                    key={filename}
                    type="button"
                    layout
                    onClick={() => openViewer(index)}
                    className="overflow-hidden rounded-lg border border-white/10 bg-[#0a0e17] text-left touch-manipulation transition hover:border-[#00d4ff]/40 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={storyImageSrc(story.imageFolder, filename)}
                      alt={`Thumbnail ${index + 1}`}
                      className="aspect-square w-full object-cover"
                      loading={index < 6 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
