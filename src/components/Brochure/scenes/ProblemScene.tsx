"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";
import { SuccessStoryGalleryModal } from "@/components/Brochure/SuccessStoryGalleryModal";
import {
  SUCCESS_STORIES,
  SUCCESS_STORY_HEADER,
  type SuccessStory,
} from "@/data/successStories";

export function ProblemScene() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [galleryStory, setGalleryStory] = useState<SuccessStory | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(SUCCESS_STORIES[0]?.id ?? null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }
    )
      .fromTo(
        introRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.35"
      )
      .fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
        "-=0.25"
      );
  }, []);

  return (
    <div className="relative flex min-h-dvh w-full flex-col px-4 pb-28 pt-4 sm:px-6 sm:pb-32 sm:pt-6 md:px-8">
      <Scene3DLazy variant="problem" />
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <h2
          ref={headerRef}
          className="font-display text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
        >
          <span className="bg-gradient-to-r from-[#5cecff] via-[#00d4ff] to-[#00a8d4] bg-clip-text text-transparent">
            {SUCCESS_STORY_HEADER}
          </span>
        </h2>
        <p
          ref={introRef}
          className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base"
        >
          Documented outcomes from real facilities—safety, compliance, and minimal disruption
          while work is in progress.
        </p>

        <div ref={cardsRef} className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
          {SUCCESS_STORIES.map((story, index) => {
            const isOpen = expandedId === story.id;
            return (
              <motion.article
                key={story.id}
                layout
                className="overflow-hidden rounded-xl border border-white/12 bg-[#0a0e17]/85 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : story.id)}
                  className="flex w-full items-start gap-4 px-4 py-4 text-left transition hover:bg-white/[0.04] sm:px-5 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-display mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00d4ff]/15 text-sm font-bold text-[#00d4ff]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold leading-snug text-white sm:text-lg">
                      {story.subtitle}
                    </h3>
                    <p className="mt-1 text-xs text-[#00d4ff]/80 sm:text-sm">
                      {isOpen ? "Tap to collapse" : "Tap to read full case study"}
                    </p>
                  </div>
                  <span className="text-white/40" aria-hidden>
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
                      <div className="space-y-4 px-4 py-4 sm:space-y-4 sm:px-5 sm:py-5">
                        {story.paragraphs.map((p, i) => (
                          <p
                            key={`${story.id}-p-${i}`}
                            className="text-sm leading-relaxed text-white/85 sm:text-base"
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
                          className="w-full rounded-lg border border-[#00d4ff]/45 bg-[#00d4ff]/10 px-4 py-3 text-center text-sm font-semibold text-[#00d4ff] transition hover:border-[#00d4ff] hover:bg-[#00d4ff]/20 sm:w-auto sm:px-6"
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
      </div>

      <SuccessStoryGalleryModal story={galleryStory} onClose={() => setGalleryStory(null)} />
    </div>
  );
}
