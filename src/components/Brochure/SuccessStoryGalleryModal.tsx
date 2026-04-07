"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import type { SuccessStory } from "@/data/successStories";
import { storyImageSrc } from "@/data/successStories";
import { MediaViewerCloseControl } from "@/components/Brochure/gallery/MediaViewerCloseControl";

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
  const touchStart = useRef({ x: 0, y: 0 });

  const n = story.images.length;

  const goNext = useCallback(() => {
    setViewerIndex((cur) => {
      if (cur === null) return null;
      return Math.min(cur + 1, n - 1);
    });
  }, [n]);

  const goPrev = useCallback(() => {
    setViewerIndex((cur) => {
      if (cur === null) return null;
      return Math.max(cur - 1, 0);
    });
  }, [n]);

  const openViewer = useCallback((index: number) => {
    setViewerIndex(Math.max(0, Math.min(index, n - 1)));
  }, [n]);

  const closeViewer = useCallback(() => setViewerIndex(null), []);

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

  const onViewerTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onViewerTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation();
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) {
        if (dx < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo gallery: ${story.subtitle}`}
      data-success-gallery-modal
      className="fixed inset-0 z-[200] flex flex-col bg-[#050812]/95 backdrop-blur-md"
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
                Photo {viewerIndex + 1} of {n} · Swipe or use arrows · Close exits
              </>
            ) : (
              <>
                {n} images · Tap a photo to enlarge · Swipe between photos in viewer
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
              className="absolute inset-0 flex flex-col bg-[#060a14]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="relative flex min-h-0 flex-1 touch-manipulation items-center justify-center px-2 sm:px-4"
                onTouchStart={onViewerTouchStart}
                onTouchEnd={onViewerTouchEnd}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={storyImageSrc(story.imageFolder, story.images[viewerIndex])}
                  alt={`${story.subtitle}, photo ${viewerIndex + 1} of ${n}`}
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  disabled={viewerIndex <= 0}
                  className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/55 text-lg text-white backdrop-blur-sm touch-manipulation transition hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/15 disabled:cursor-not-allowed disabled:opacity-25 sm:left-3 sm:h-12 sm:w-12"
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  disabled={viewerIndex >= n - 1}
                  className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/55 text-lg text-white backdrop-blur-sm touch-manipulation transition hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/15 disabled:cursor-not-allowed disabled:opacity-25 sm:right-3 sm:h-12 sm:w-12"
                  aria-label="Next photo"
                >
                  ›
                </button>
              </div>

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
