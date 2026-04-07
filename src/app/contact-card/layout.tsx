import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexafix | Contact card",
  description: "Nexafix contact details: phone, email, and website.",
};

export default function ContactCardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
