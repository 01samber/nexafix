export type SceneId =
  | "cover"
  | "problem"
  | "galleryIntro"
  | "galleryPhotos"
  | "galleryVideos"
  | "cta";

export interface SceneData {
  id: SceneId;
  title: string;
  headline?: string;
  subheadline?: string;
  content: string | string[];
  tagline?: string;
  footer?: string[];
  variant?: "hero" | "tension" | "clarity" | "interactive" | "proof" | "flow" | "metrics" | "cta" | "finish";
}

export const SCENES: SceneData[] = [
  {
    id: "cover",
    title: "Cover",
    headline: "Fix It Before It Fails.",
    subheadline: "Smart Facility Maintenance. Fast Response. Reliable Execution.",
    content: "Nexafix",
    variant: "hero",
  },
  {
    id: "problem",
    title: "Success Stories",
    headline: "Nexa Fix Success Stories",
    content: "Case studies and project photography from real facility work.",
    variant: "tension",
  },
  {
    id: "galleryIntro",
    title: "Portfolio",
    headline: "Our work in the field",
    content:
      "Real Nexa Fix jobs in the field: installs, turnovers, and busy sites. Then open the photo and video galleries.",
    variant: "proof",
  },
  {
    id: "galleryPhotos",
    title: "Photography",
    headline: "Project photography",
    content: "Masonry layout: tap any still for fullscreen. Swipe or use arrows inside the viewer to browse.",
    variant: "proof",
  },
  {
    id: "galleryVideos",
    title: "Video",
    headline: "On-site video",
    content: "Field clips with normal video controls. Tap a clip for fullscreen and the thumbnail strip.",
    variant: "proof",
  },
  {
    id: "cta",
    title: "Contact",
    headline: "Get our full details",
    content:
      "Scan the code on your phone for our contact card (site, email, phone) in your browser. You can also talk with us at the booth.",
    variant: "cta",
  },
];
