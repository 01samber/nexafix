"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ProjectGalleryShell } from "@/components/Brochure/gallery/ProjectGalleryShell";
import { GalleryMediaLightbox } from "@/components/Brochure/gallery/GalleryMediaLightbox";
import { MAIN_GALLERY_PHOTOS } from "@/data/mainGalleryDerived";
import type { MainGalleryItem } from "@/data/mainGallery";

function PhotoTile({
  item,
  i,
  layout,
  onOpen,
}: {
  item: MainGalleryItem;
  i: number;
  layout: "masonry" | "grid";
  onOpen: () => void;
}) {
  const imageArea =
    layout === "masonry" ? (
      <div
        className={`relative w-full ${
          i % 3 === 0
            ? "aspect-3/4"
            : i % 3 === 1
              ? "aspect-square sm:aspect-4/3"
              : "aspect-4/5 sm:aspect-3/4"
        }`}
      >
        <Image
          src={item.src}
          alt=""
          fill
          sizes="(max-width: 768px) 45vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          draggable={false}
        />
      </div>
    ) : (
      <div className="relative aspect-[3/2] w-full shrink-0 bg-black md:aspect-[4/3] md:max-h-[220px]">
        <Image
          src={item.src}
          alt=""
          fill
          sizes="(max-width: 1280px) 40vw, 400px"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          loading="lazy"
          draggable={false}
        />
      </div>
    );

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.35) }}
      onClick={onOpen}
      className={`group text-left outline-none ring-[#00d4ff]/0 transition focus-visible:ring-2 ${
        layout === "masonry"
          ? "mb-3 w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-[#0d1321]/80 shadow-[0_10px_40px_rgba(0,0,0,0.35)] active:scale-[0.99] sm:mb-4"
          : "flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1321]/80 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:border-[#00d4ff]/20"
      }`}
    >
      {imageArea}
      {item.caption ? (
        <p className="border-t border-white/10 bg-[#0a0e17]/95 p-2.5 text-[11px] leading-snug text-white/80 sm:p-3 sm:text-xs md:line-clamp-3">
          {item.caption}
        </p>
      ) : null}
    </motion.button>
  );
}

export function GalleryPhotosScene() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const onIndexChange = useCallback((i: number) => {
    setLightbox(Math.max(0, Math.min(i, MAIN_GALLERY_PHOTOS.length - 1)));
  }, []);

  if (MAIN_GALLERY_PHOTOS.length === 0) {
    return (
      <ProjectGalleryShell wide>
        <p className="relative z-20 p-6 text-center text-white/60">No photos in gallery yet.</p>
      </ProjectGalleryShell>
    );
  }

  return (
    <ProjectGalleryShell wide>
      <div className="relative z-20 px-3 pb-10 pt-3 sm:px-5 md:px-6 md:pb-12 md:pt-4">
        <div className="columns-2 gap-3 sm:gap-4 md:hidden">
          {MAIN_GALLERY_PHOTOS.map((item, i) => (
            <PhotoTile key={item.src} item={item} i={i} layout="masonry" onOpen={() => setLightbox(i)} />
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {MAIN_GALLERY_PHOTOS.map((item, i) => (
            <PhotoTile key={`grid-${item.src}`} item={item} i={i} layout="grid" onOpen={() => setLightbox(i)} />
          ))}
        </div>
      </div>

      <GalleryMediaLightbox
        items={MAIN_GALLERY_PHOTOS}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={onIndexChange}
      />
    </ProjectGalleryShell>
  );
}
