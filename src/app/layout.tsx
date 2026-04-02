import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export { viewport } from "./viewport";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nexafix | Fix It Before It Fails | ConnexFM Expo",
  description:
    "Smart Facility Maintenance. Fast Response. Reliable Execution. Nexafix doesn't just fix problems — we prevent them.",
  openGraph: {
    title: "Nexafix | Fix It Before It Fails",
    description: "Smart Facility Maintenance. Fast Response. Reliable Execution.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexafix | Fix It Before It Fails",
    description: "Smart Facility Maintenance. Fast Response. Reliable Execution.",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full min-h-dvh min-h-[100lvh] antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body min-h-dvh min-h-[100lvh] w-full overflow-x-hidden bg-[#0a0e17] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
