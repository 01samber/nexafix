"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { QRCodeSVG } from "qrcode.react";
import { Scene3DLazy } from "@/components/3D/Scene3DLazy";
import { useIsMobile } from "@/hooks/useIsMobile";
import { CONFIG, getContactCardUrl } from "@/data/config";

export function CTAScene() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7 }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(
        qrRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
        },
        "-=0.3"
      );
  }, []);

  return (
    <div className="relative flex min-h-full w-full flex-col items-center justify-center px-4 py-8 max-md:min-h-0 max-md:flex-1 sm:px-6 md:min-h-screen md:px-8">
      <Scene3DLazy variant="cta" />
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <h2
          ref={titleRef}
          className="font-display mb-6 text-4xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          Get our full details
        </h2>
        <p ref={textRef} className="mb-8 text-lg leading-relaxed text-white/90 sm:mb-10 sm:text-lg md:mb-12 md:text-xl">
          Scan the QR code with your phone. It opens our contact card on its own page: name, site,
          email, and phone. It is not another slide in this brochure.
          {CONFIG.boothNumber !== "TBD" && (
            <>
              <br />
              <span className="text-white/80">
                ConnexFM {CONFIG.eventYear}, Booth {CONFIG.boothNumber}.
              </span>
            </>
          )}
        </p>
        {/* QR opens /contact-card in the visitor&apos;s browser */}
        <motion.div
          ref={qrRef}
          className="relative mb-8"
          animate={{
            boxShadow: [
              "0 0 30px rgba(0,212,255,0.3)",
              "0 0 50px rgba(0,212,255,0.5)",
              "0 0 30px rgba(0,212,255,0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-[#00d4ff]/50 bg-white p-3 sm:p-4">
            <QRCodeSVG
              value={getContactCardUrl()}
              size={isMobile ? 128 : 160}
              level="H"
              includeMargin={false}
              className="rounded"
            />
            <span className="mt-2 max-w-[14rem] text-center text-xs font-medium leading-snug text-[#0a0e17] sm:text-sm">
              Scan for Nexafix contact card
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
