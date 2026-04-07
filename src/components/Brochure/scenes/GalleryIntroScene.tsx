"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ProjectGalleryShell } from "@/components/Brochure/gallery/ProjectGalleryShell";
import { MAIN_GALLERY_ITEMS } from "@/data/mainGallery";
import { MAIN_GALLERY_PHOTOS, MAIN_GALLERY_VIDEOS } from "@/data/mainGalleryDerived";
import { SCENES } from "@/data/scenes";

const meta = SCENES.find((s) => s.id === "galleryIntro")!;

const HIGHLIGHTS = [
  "Retail, office & institutional sites",
  "Electrical, HVAC & build-out work",
  "Documented start-to-finish delivery",
];

export function GalleryIntroScene() {
  const previews = MAIN_GALLERY_ITEMS.slice(0, 12);

  return (
    <ProjectGalleryShell>
      <header className="relative z-20 px-4 pb-4 pt-4 text-center md:px-8 md:pb-6 md:pt-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 inline-flex items-center rounded-full border border-[#00d4ff]/40 bg-[#00d4ff]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8f4ff] sm:text-[11px]"
        >
          Project portfolio
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-balance text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl"
        >
          <span className="bg-gradient-to-r from-[#5cecff] via-[#00d4ff] to-[#00a8d4] bg-clip-text text-transparent">
            {meta.headline}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="mx-auto mt-3 max-w-lg text-pretty text-sm text-white/75 md:text-base"
        >
          {meta.content}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mx-auto mt-6 flex max-w-xl flex-col gap-2 sm:gap-3"
        >
          {HIGHLIGHTS.map((line, i) => (
            <li
              key={line}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d1321]/75 px-4 py-3 text-left text-sm text-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:text-[15px]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00d4ff]/15 text-xs font-bold text-[#00d4ff]">
                {i + 1}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
          className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-white/55 sm:text-sm"
        >
          <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-white/80">
            {MAIN_GALLERY_PHOTOS.length} photos
          </span>
          <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-white/80">
            {MAIN_GALLERY_VIDEOS.length} videos
          </span>
          <span className="text-white/40">Keep swiping for full photo and video galleries</span>
        </motion.div>
      </header>

      <section className="relative z-20 pb-8" aria-label="Preview strip">
        <div
          className="flex gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 pt-1 [scrollbar-width:thin] sm:gap-4 sm:px-6"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {previews.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 + i * 0.03 }}
              className="relative h-36 w-28 shrink-0 snap-center overflow-hidden rounded-xl border border-white/15 bg-[#0d1321] shadow-lg sm:h-40 sm:w-32"
              style={{ scrollSnapAlign: "center" }}
            >
              {item.kind === "image" ? (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="120px"
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.src}
                  className="h-full w-full object-cover opacity-90"
                  muted
                  playsInline
                  preload="metadata"
                />
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </ProjectGalleryShell>
  );
}
