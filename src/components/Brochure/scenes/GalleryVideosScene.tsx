"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { ProjectGalleryShell } from "@/components/Brochure/gallery/ProjectGalleryShell";
import { GalleryMediaLightbox } from "@/components/Brochure/gallery/GalleryMediaLightbox";
import { MAIN_GALLERY_VIDEOS } from "@/data/mainGalleryDerived";

export function GalleryVideosScene() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const onIndexChange = useCallback((i: number) => {
    setLightbox(Math.max(0, Math.min(i, MAIN_GALLERY_VIDEOS.length - 1)));
  }, []);

  if (MAIN_GALLERY_VIDEOS.length === 0) {
    return (
      <ProjectGalleryShell wide>
        <p className="relative z-20 p-6 text-center text-white/60">No videos in gallery yet.</p>
      </ProjectGalleryShell>
    );
  }

  return (
    <ProjectGalleryShell wide>
      <div className="relative z-20 grid grid-cols-1 gap-5 px-3 pb-10 pt-3 sm:px-5 md:grid-cols-2 md:gap-6 md:px-6 md:pb-12 md:pt-4 lg:gap-8">
        {MAIN_GALLERY_VIDEOS.map((item, i) => (
          <motion.article
            key={item.src}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.06, 0.4) }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0a0e17] shadow-[0_12px_48px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.04]"
          >
            <div className="relative aspect-video w-full max-w-full bg-black">
              <video
                src={item.src}
                className="h-full w-full object-contain"
                controls
                playsInline
                preload="metadata"
              />
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="absolute right-2 top-2 z-10 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/35 bg-black/70 text-white shadow-md backdrop-blur-sm transition hover:bg-black/85 sm:right-3 sm:top-3"
                aria-label="Fullscreen video"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <GalleryMediaLightbox
        items={MAIN_GALLERY_VIDEOS}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={onIndexChange}
      />
    </ProjectGalleryShell>
  );
}
