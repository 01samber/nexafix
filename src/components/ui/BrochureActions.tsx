"use client";

import { useShare } from "@/hooks/useShare";

export function BrochureActions() {
  const share = useShare();

  const handleShare = async () => {
    const ok = await share();
    if (ok) return;
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="fixed right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white transition hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 max-md:bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] bottom-20"
      aria-label="Share"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    </button>
  );
}
