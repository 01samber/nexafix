"use client";

import Link from "next/link";
import { AmbientMotion } from "@/components/ui/AmbientMotion";
import { BackCoverScene } from "@/components/Brochure/scenes/BackCoverScene";

export default function ContactCardPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-[#0a0e17]">
      <AmbientMotion />
      <main className="relative flex flex-1 flex-col">
        <BackCoverScene />
      </main>
      <footer
        className="print:hidden sticky bottom-0 z-[100] shrink-0 border-t border-white/[0.08] bg-[#080c14]/90 px-4 py-4 backdrop-blur-md sm:px-6"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="mx-auto flex max-w-lg flex-col items-center gap-2">
          <Link
            href="/"
            className="inline-flex min-h-11 w-full max-w-sm items-center justify-center rounded-full border border-[#00d4ff]/35 bg-[#00d4ff]/10 px-6 py-2.5 text-sm font-medium text-[#b8f4ff] transition hover:border-[#00d4ff]/55 hover:bg-[#00d4ff]/18"
          >
            Back to brochure
          </Link>
          <p className="text-center text-[10px] text-white/35 sm:text-[11px]">
            Sends you back to page 1 of the brochure.
          </p>
        </div>
      </footer>
    </div>
  );
}
