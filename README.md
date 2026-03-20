# Nexafix Expo Microsite

**Fix It Before It Fails.**  
World-class interactive digital brochure for ConnexFM Expo.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm run start
```

## Features

- **9-scene cinematic flow** — Cover → Problem → Solution → Services → Why → Process → Results → CTA → Back
- **2.5D experience** — 3D hero on cover, 3D facility operations on Solution
- **GSAP + Motion** — Premium animations, microinteractions, ambient motion
- **Touch & kiosk ready** — Swipe, tap, keyboard, wheel navigation
- **QR code** — CTA scene with scannable QR for free facility assessment

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- GSAP
- Motion (Framer Motion)
- React Three Fiber + Drei
- qrcode.react

## Customization

| Item | File |
|------|------|
| QR assessment URL | `src/components/Brochure/scenes/CTAScene.tsx` → `ASSESSMENT_URL` |
| Contact footer | `src/components/Brochure/scenes/BackCoverScene.tsx` → `FOOTER` |
| Design tokens | `src/app/globals.css` → `:root` |

## Creative Direction

See **[CREATIVE_DIRECTION.md](./CREATIVE_DIRECTION.md)** for full creative direction, UX structure, design system, motion storyboard, and expo implementation guidance.

---

*Nexafix — Maintenance You Can Finally Trust.*
