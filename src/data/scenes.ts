export type SceneId =
  | "cover"
  | "problem"
  | "solution"
  | "services"
  | "why"
  | "process"
  | "results"
  | "cta"
  | "back";

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
    id: "solution",
    title: "The Solution",
    headline: "Meet Nexafix",
    content:
      "Nexafix is your next-generation facility maintenance partner — built to deliver speed, reliability, and full operational control.\nWe don't just fix problems. We prevent them.",
    variant: "clarity",
  },
  {
    id: "services",
    title: "Services",
    headline: "What We Do",
    content: [
      "Facility Maintenance\nElectrical · HVAC · Plumbing",
      "Soft Services\nCleaning · Waste Management",
      "Smart Solutions\nPreventive Maintenance · AI-Driven Tracking",
      "Specialized Services\nFit-Outs · Technical Inspections",
    ],
    variant: "interactive",
  },
  {
    id: "why",
    title: "Why Nexafix",
    headline: "Why Nexafix?",
    content: [
      "Fast response. No delays.",
      "Reliable execution. No excuses.",
      "Data-driven maintenance decisions.",
      "Built to scale across multiple sites.",
      "Clear reporting. Full transparency.",
    ],
    variant: "proof",
  },
  {
    id: "process",
    title: "Process",
    headline: "How It Works",
    content: "Assess → Plan → Execute → Monitor → Optimize\n\nWe handle everything — so you don't have to.",
    variant: "flow",
  },
  {
    id: "results",
    title: "Results",
    headline: "Real Impact",
    content: [
      "Reduced downtime.",
      "Lower maintenance costs.",
      "Improved operational efficiency.",
    ],
    tagline: "Built for businesses that can't afford interruptions.",
    variant: "metrics",
  },
  {
    id: "cta",
    title: "CTA",
    headline: "Let's Fix Your Facility",
    content:
      "Scan to get a free facility assessment.\nOr speak to us today at our booth.",
    variant: "cta",
  },
  {
    id: "back",
    title: "Back Cover",
    tagline: "Maintenance You Can Finally Trust.",
    content: "",
    footer: ["Nexafix", "nexafix.com", "info@nexafix.com", "+1 (555) 123-4567"],
    variant: "finish",
  },
];
