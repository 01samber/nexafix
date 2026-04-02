"use client";

import dynamic from "next/dynamic";

const Brochure = dynamic(() => import("./Brochure").then((m) => ({ default: m.Brochure })), {
  ssr: false,
  loading: () => (
    <div className="brochure-loading-shell flex items-center justify-center bg-[#0a0e17]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#00d4ff] border-t-transparent motion-reduce:animate-none" />
        <p className="text-white/80">Loading Nexafix...</p>
      </div>
    </div>
  ),
});

export function BrochurePage() {
  return <Brochure />;
}
