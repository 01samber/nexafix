"use client";

/**
 * Dismiss control: pill “handle” + chevron down — reads as “put this away” / close viewer
 * without another X-in-a-box variant. Cyan accent on hover matches the brochure.
 */
export function MediaViewerCloseControl({
  onClick,
  className = "",
  "aria-label": ariaLabel = "Close",
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "group relative flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center md:h-12 md:w-12",
        "rounded-full border border-white/18 bg-[#0a1018]/65 text-[#e8f4fc]",
        "shadow-[0_2px_18px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md",
        "transition-[color,transform,border-color,box-shadow] duration-200 ease-out",
        "hover:border-[#00d4ff]/45 hover:text-[#7ee8ff] hover:shadow-[0_0_22px_rgba(0,212,255,0.22),0_2px_18px_rgba(0,0,0,0.45)]",
        "active:scale-[0.94] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#00d4ff]/45",
        className,
      ].join(" ")}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[1.45rem] w-[1.45rem] md:h-7 md:w-7"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 5.5h8"
          className="stroke-current opacity-45 transition-[stroke,opacity] duration-200 group-hover:stroke-[#7ee8ff] group-hover:opacity-90"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M7.25 11.75L12 16.5l4.75-4.75"
          className="stroke-current transition-[stroke] duration-200 group-hover:stroke-[#b8f4ff]"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
