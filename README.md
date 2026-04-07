# Nexafix Expo Microsite

**Fix It Before It Fails.**  
Interactive digital brochure for ConnexFM Expo.

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

- **Six-scene brochure** — Cover, Success Stories, Portfolio intro, Photography, Video, Contact (CTA)
- **Contact card route** — `/contact-card` opens from the QR on the last slide (not a seventh swipe)
- **3D accents** — R3F scenes per section
- **GSAP + Motion** — Animations and ambient motion
- **Navigation** — Swipe (mobile edge gesture), wheel, keyboard, progress indicator
- **Galleries** — Main gallery assets under `public/gallery/main`; regenerate data with `node scripts/gen-main-gallery.js`

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- GSAP, Motion
- React Three Fiber + Drei
- qrcode.react
- Vercel Analytics

## Deploying on Vercel

1. Import the Git repository in the [Vercel dashboard](https://vercel.com).
2. Framework preset: **Next.js** (default).
3. **Environment variables** (recommended for QR codes and server-side URL helpers):

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_SITE_URL` | Your live URL without a trailing slash, e.g. `https://www.nexa-fix.com` or `https://your-project.vercel.app` |

   Use the same value for Production; set Preview to your preview domain if QR scans from preview builds should stay on that host.

4. Deploy. Production builds run `next build` automatically.

See `.env.example` for the variable name.

## Customization

| Item | File |
|------|------|
| Contact / booth / QR path | `src/data/config.ts` (`contactCardPath`, `getContactCardUrl`, `getTelHref`) |
| Contact card UI | `src/components/Brochure/scenes/BackCoverScene.tsx` |
| CTA copy & QR | `src/components/Brochure/scenes/CTAScene.tsx` |
| Brochure scene order & titles | `src/data/scenes.ts` |
| Main gallery files | `public/gallery/main` then `node scripts/gen-main-gallery.js` (`caption` fields stay empty) |

## Creative direction

See **CREATIVE_DIRECTION.md** for creative notes and UX structure.

---

*Nexafix · Maintenance you can finally trust.*
