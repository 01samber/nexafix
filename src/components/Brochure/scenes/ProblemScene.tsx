"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";
import { SuccessStoryGalleryModal } from "@/components/Brochure/SuccessStoryGalleryModal";
import {
  SUCCESS_STORIES,
  SUCCESS_STORY_HEADER,
  type SuccessStory,
} from "@/data/successStories";

function storyOrderIndex(id: string): number {
  return SUCCESS_STORIES.findIndex((s) => s.id === id);
}

export function ProblemScene() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardElRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [galleryStory, setGalleryStory] = useState<SuccessStory | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayStories = useMemo(() => {
    if (!expandedId) return SUCCESS_STORIES;
    const expanded = SUCCESS_STORIES.find((s) => s.id === expandedId);
    if (!expanded) return SUCCESS_STORIES;
    const rest = SUCCESS_STORIES.filter((s) => s.id !== expandedId);
    return [expanded, ...rest];
  }, [expandedId]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }
    ).fromTo(
      cardsRef.current?.children ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
      "-=0.25"
    );
  }, []);

  useEffect(() => {
    if (!expandedId) return;
    const id = expandedId;
    const t = window.setTimeout(() => {
      cardElRefs.current.get(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
    return () => window.clearTimeout(t);
  }, [expandedId]);

  return (
    <div className="relative flex w-full flex-col max-md:min-h-0 max-md:flex-1 md:min-h-0 px-2 pb-5 pt-1.5 sm:px-6 sm:pb-12 sm:pt-3 md:px-8 md:pb-0 md:pt-0">
      <Scene3DLazy variant="problem" />
      <div className="relative z-20 mx-auto w-full max-w-3xl">
        <h2
          ref={headerRef}
          className="font-display text-balance px-0.5 text-center text-base font-bold leading-tight tracking-tight text-white sm:text-lg sm:leading-snug md:text-2xl lg:text-3xl"
        >
          <span className="bg-gradient-to-r from-[#5cecff] via-[#00d4ff] to-[#00a8d4] bg-clip-text text-transparent">
            {SUCCESS_STORY_HEADER}
          </span>
        </h2>

        <LayoutGroup>
          <div ref={cardsRef} className="mt-3 space-y-2.5 sm:mt-6 sm:space-y-4 md:space-y-5">
            {displayStories.map((story) => {
              const isOpen = expandedId === story.id;
              const orderIdx = storyOrderIndex(story.id);
              const labelNum = orderIdx >= 0 ? orderIdx + 1 : 1;
              return (
                <motion.article
                  key={story.id}
                  layout
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  ref={(el) => {
                    if (el) cardElRefs.current.set(story.id, el);
                    else cardElRefs.current.delete(story.id);
                  }}
                  className="scroll-mt-2 overflow-hidden rounded-lg border border-white/12 bg-[#0a0e17]/95 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:scroll-mt-4 sm:rounded-xl"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : story.id)}
                    className="flex w-full items-start gap-2 px-2.5 py-2.5 text-left transition hover:bg-white/[0.04] sm:gap-4 sm:px-4 sm:py-4 md:px-5 md:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#00d4ff]/15 text-[10px] font-bold leading-none text-[#00d4ff] sm:mt-0.5 sm:h-9 sm:w-9 sm:text-sm">
                      {String(labelNum).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1 break-words">
                      <h3 className="font-display text-xs font-semibold leading-snug text-white sm:text-sm md:text-base">
                        {story.subtitle}
                      </h3>
                      <p className="mt-0.5 text-[10px] leading-snug text-[#00d4ff]/80 sm:text-[11px] md:text-xs">
                        {isOpen ? "Tap to collapse" : "Tap to read full case study"}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs leading-none text-white/40 sm:text-base" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="border-t border-white/10"
                    >
                      <div className="space-y-2.5 px-2.5 py-2.5 sm:space-y-3.5 sm:px-4 sm:py-4 md:px-5 md:py-5">
                        {story.paragraphs.map((p, i) => (
                          <p
                            key={`${story.id}-p-${i}`}
                            className="hyphens-auto break-words text-[11px] leading-snug text-white/85 sm:text-xs sm:leading-relaxed md:text-[0.9375rem]"
                          >
                            {p}
                          </p>
                        ))}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setGalleryStory(story);
                          }}
                          className="w-full rounded-md border border-[#00d4ff]/45 bg-[#00d4ff]/10 px-2.5 py-2 text-center text-[10px] font-semibold leading-snug text-[#00d4ff] transition hover:border-[#00d4ff] hover:bg-[#00d4ff]/20 sm:w-auto sm:rounded-lg sm:px-5 sm:py-3 sm:text-xs md:text-sm"
                        >
                          View project photography ({story.images.length} images)
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <SuccessStoryGalleryModal story={galleryStory} onClose={() => setGalleryStory(null)} />
    </div>
  );
}
