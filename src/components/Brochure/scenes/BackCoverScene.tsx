"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";
import { CONFIG, getTelHref } from "@/data/config";

const websiteDisplay = CONFIG.website.replace(/^https?:\/\//, "").replace(/\/$/, "");

function ContactRow({
  href,
  label,
  value,
  icon,
}: {
  href: string;
  label: string;
  value: string;
  icon: "phone" | "email" | "web";
}) {
  const ic =
    icon === "phone" ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.19 3.57a1 1 0 01-.45 1.12l-1.56.97a12 12 0 006.45 6.45l.97-1.56a1 1 0 011.12-.45l3.57 1.19a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.717 21 3 14.283 3 5V5z"
      />
    ) : icon === "email" ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    );

  return (
    <a
      href={href}
      target={icon === "web" ? "_blank" : undefined}
      rel={icon === "web" ? "noopener noreferrer" : undefined}
      className="group flex w-full max-w-md items-center gap-4 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#0f1729]/95 to-[#0a0e17]/98 px-4 py-3.5 text-left shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:border-[#00d4ff]/45 hover:shadow-[0_12px_40px_rgba(0,212,255,0.12)] active:scale-[0.99] sm:px-5 sm:py-4"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00d4ff]/25 bg-[#00d4ff]/10 text-[#7ee8ff] transition group-hover:border-[#00d4ff]/50 group-hover:bg-[#00d4ff]/15">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          {ic}
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#00d4ff]/75 sm:text-[11px]">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-sm font-medium text-white sm:text-base">{value}</span>
      </span>
      <span className="shrink-0 text-[#00d4ff]/50 transition group-hover:text-[#7ee8ff]" aria-hidden>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

export function BackCoverScene() {
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tel = getTelHref(CONFIG.phone);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" }
    ).fromTo(
      cardRef.current?.children ?? [],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
      "-=0.35"
    );
  }, []);

  return (
    <div className="relative flex min-h-full w-full flex-1 flex-col items-center justify-center px-4 pb-6 pt-10 max-md:min-h-0 sm:px-6 sm:pb-8 sm:pt-12 md:px-8 md:pb-10 md:pt-12">
      <Scene3DLazy variant="back" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#00d4ff]/[0.06] via-transparent to-transparent" />
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00d4ff]/80 sm:text-xs">
          {CONFIG.brandName}
        </p>
        <h1
          ref={taglineRef}
          className="font-display mb-2 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-tight"
        >
          Maintenance you can
          <br />
          <span className="bg-gradient-to-r from-[#5cecff] via-[#00d4ff] to-[#00a8d4] bg-clip-text text-transparent">
            finally trust.
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-sm text-sm text-white/60 sm:mb-10 sm:text-base">
          Tap a row below to call, email, or open our site.
        </p>

        <div ref={cardRef} className="flex w-full flex-col items-center gap-3 sm:gap-3.5">
          <ContactRow href={tel} label="Call" value={CONFIG.phone} icon="phone" />
          <ContactRow
            href={`mailto:${CONFIG.email}`}
            label="Email"
            value={CONFIG.email}
            icon="email"
          />
          <ContactRow
            href={CONFIG.website}
            label="Website"
            value={websiteDisplay}
            icon="web"
          />
        </div>

        <p className="font-display mt-10 text-xs font-semibold tracking-[0.18em] text-[#00d4ff]/90 sm:mt-12 sm:text-sm">
          {CONFIG.legalName}
        </p>
      </div>
    </div>
  );
}
