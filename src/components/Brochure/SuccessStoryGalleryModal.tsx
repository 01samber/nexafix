"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { SuccessStory } from "@/data/successStories";
import { storyImageSrc } from "@/data/successStories";

interface Props {
  story: SuccessStory | null;
  onClose: () => void;
}

export function SuccessStoryGalleryModal({ story, onClose }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!story) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [story, handleKey]);

  return (
    <AnimatePresence>
      {story && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo gallery: ${story.subtitle}`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050812]/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#00d4ff]/80">
                Project photography
              </p>
              <h2 className="font-display mt-1 max-w-3xl text-base font-semibold text-white sm:text-lg">
                {story.subtitle}
              </h2>
              <p className="mt-1 text-xs text-white/50 sm:text-sm">
                {story.images.length} images · Tap outside or use Close to exit
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10"
            >
              Close
            </button>
          </header>
          <div className="relative flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
              {story.images.map((filename) => (
                <motion.figure
                  key={filename}
                  layout
                  className="overflow-hidden rounded-lg border border-white/10 bg-[#0a0e17]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={storyImageSrc(story.imageFolder, filename)}
                    alt=""
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
