import type { Variants } from "motion/react";

export type GalleryLightboxTransition = "slideBlur" | "fadeStack";

export const GALLERY_LIGHTBOX_TRANSITION: GalleryLightboxTransition = "slideBlur";

export const slideBlurVariants: Variants = {
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

export const fadeStackVariants: Variants = {
  enter: { scale: 0.94, opacity: 0, y: 14 },
  center: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 1.03, opacity: 0, y: -10 },
};

export function lightboxSlideTransition(transition: GalleryLightboxTransition) {
  return {
    duration: transition === "fadeStack" ? 0.28 : 0.32,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  };
}
