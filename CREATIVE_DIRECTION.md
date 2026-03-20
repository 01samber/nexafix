# Nexafix Expo Microsite — Creative Direction & Implementation Guide

> **ConnexFM Expo** • World-class interactive digital brochure • Fix It Before It Fails.

---

## 1. Creative Direction

### Brand Essence
- **Nexafix** = Next-generation facility maintenance partner
- **Core message:** *We don't just fix problems. We prevent them.*
- **Values:** Speed, reliability, prevention, operational control, scale

### Visual Language
| Element | Direction |
|--------|-----------|
| **Theme** | Dark luxury, deep navy/black (#0a0e17), electric blue (#00d4ff) |
| **Typography** | Syne (display/headlines), DM Sans (body) — bold, futuristic, readable |
| **Surfaces** | Glassmorphism panels, subtle metallic reflections, data-driven UI overlays |
| **Motion** | Ambient gradients, light streaks, particle accents, dashboard-inspired motion |
| **Mood** | Confidence, speed, control, precision, trust |

### 2.5D Cinematic Approach
- **3D hero** on cover: wireframe orbs, depth, subtle parallax
- **3D facility scene** on Solution: grid + status nodes for operations visualization
- **Rest:** 2D with parallax, layered depth, blur-to-focus transitions

---

## 2. UX Structure & Scene Map

| # | Scene | ID | Purpose |
|---|-------|-----|---------|
| 1 | **Cover** | `cover` | Cinematic hero, headline hook |
| 2 | **Problem** | `problem` | Tension, friction, "Sound familiar?" |
| 3 | **Solution** | `solution` | Meet Nexafix, 3D ops visualization |
| 4 | **Services** | `services` | Interactive service cards |
| 5 | **Why Nexafix** | `why` | Proof points, trust builders |
| 6 | **Process** | `process` | How It Works flow |
| 7 | **Results** | `results` | Real impact, metrics |
| 8 | **CTA** | `cta` | QR beacon, booth contact |
| 9 | **Back Cover** | `back` | Trust tagline, footer |

---

## 3. Visual Design System

### Color Palette
```css
--bg-deep: #0a0e17
--bg-navy: #0d1321
--bg-surface: #151c2c
--accent-primary: #00d4ff
--accent-glow: rgba(0, 212, 255, 0.4)
--text-primary: #ffffff
--text-secondary: rgba(255, 255, 255, 0.85)
--text-muted: rgba(255, 255, 255, 0.6)
```

### Typography
- **Display (Syne):** Headlines, hero, CTAs
- **Body (DM Sans):** Paragraphs, service details, proof points

### Glassmorphism
- `.glass-panel` — standard frosted panel
- `.glass-panel-elevated` — stronger border, inner highlight

---

## 4. Animation System

### Entrance
- Each scene: GSAP timeline — opacity, y-offset, optional blur
- Staggered children on lists/cards

### Transitions
- Scene swap: opacity + pointer-events
- Varied per scene type (slide, fade, scale)

### Ambient
- Gradient orbs (slow float)
- Grid overlay (low opacity)
- Light streaks (pulsing opacity)

---

## 5. Interaction System

| Element | Behavior |
|---------|----------|
| **Nav arrows** | Prev/next, scale on hover/tap |
| **Progress dots** | Click to jump, hover tooltip |
| **Service cards** | Hover scale + glow |
| **Proof points** | Hover slide-right |
| **Process steps** | Hover scale + glow |
| **CTA button** | Glow pulse, light sweep on hover |
| **QR area** | Pulsing glow beacon |

### Input Support
- **Keyboard:** ↑/↓, Space, Home, End
- **Wheel:** Scroll to next/prev
- **Touch:** Swipe up/down
- **Click/Tap:** Arrows, progress dots

---

## 6. Component Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── viewport.tsx
│   └── globals.css
├── components/
│   ├── Brochure/
│   │   ├── Brochure.tsx          # Main container
│   │   ├── BrochurePage.tsx      # Dynamic loader
│   │   ├── SceneWrapper.tsx      # Transition wrapper
│   │   └── scenes/
│   │       ├── CoverScene.tsx
│   │       ├── ProblemScene.tsx
│   │       ├── SolutionScene.tsx
│   │       ├── ServicesScene.tsx
│   │       ├── WhyNexafixScene.tsx
│   │       ├── ProcessScene.tsx
│   │       ├── ResultsScene.tsx
│   │       ├── CTAScene.tsx
│   │       └── BackCoverScene.tsx
│   ├── 3D/
│   │   ├── HeroEnvironment.tsx   # Cover 3D
│   │   └── FacilityOperationsScene.tsx
│   └── ui/
│       ├── AmbientMotion.tsx
│       ├── PremiumButton.tsx
│       └── ProgressIndicator.tsx
├── data/
│   └── scenes.ts
└── hooks/
    └── useBrochureNavigation.ts
```

---

## 7. Motion Storyboard (by Scene)

| Scene | Entrance | Ambient | CTA / Focus |
|-------|----------|---------|-------------|
| **Cover** | Headline blur→sharp, stagger subhead, brand | 3D orbs, light sweep | — |
| **Problem** | Title slide-left, lines stagger | Broken workflow bars | — |
| **Solution** | Title drop, text stagger | 3D facility grid | — |
| **Services** | Title, cards stagger | Card hover scale | — |
| **Why** | Title, list stagger | Proof point slide | — |
| **Process** | Flow steps bounce-in | Step hover glow | — |
| **Results** | Metrics cards stagger | Card hover | — |
| **CTA** | Title, text, QR | QR pulse glow | CTA button |
| **Back** | Tagline, footer stagger | — | — |

---

## 8. Copy Presentation (Elevated, Same Meaning)

| Original | Presentation |
|----------|--------------|
| Sound Familiar? | **Sound Familiar?** (bold, leading) |
| Delays. Poor follow-ups. | *Delays. Poor follow-ups. Unexpected breakdowns.* (accent color) |
| We don't just fix problems. We prevent them. | **We don't just fix problems. We prevent them.** (accent, tagline) |
| What We Do | **What We Do** + interactive cards |
| Why Nexafix? | **Why Nexafix?** + animated proof list |
| How It Works | **How It Works** + flow animation |
| Real Impact | **Real Impact** + metric cards |
| Let's Fix Your Facility | **Let's Fix Your Facility** + QR + CTA |
| Maintenance You Can Finally Trust. | **Maintenance You Can Finally Trust.** (accent on "Finally Trust") |

---

## 9. Expo-Ready Implementation Guidance

### Booth Setup
- **Screens:** 1920×1080 or higher, kiosk mode
- **Tablets:** Landscape preferred, min 768px width
- **QR visitors:** Mobile-first, touch swipe

### Performance
- 3D scenes use simplified geometry (wireframe, low poly)
- GSAP + Motion for smooth 60fps
- Dynamic import for Brochure (no SSR for R3F)

### Kiosk Mode
- `viewport.userScalable: false`
- Touch targets ≥ 44px
- Prevent overscroll (`overscroll-behavior: none`)

### Customization
- **QR URL:** Edit `ASSESSMENT_URL` in `CTAScene.tsx`
- **Contact info:** Edit `FOOTER` in `BackCoverScene.tsx`
- **Colors:** `globals.css` `:root` variables

### Deployment
```bash
npm run build
npm run start
```
Or deploy to Vercel/Netlify for HTTPS + QR scanning.

---

## 10. Build Status

✅ Next.js 16 + React 19  
✅ GSAP timeline animations  
✅ Motion (Framer Motion) microinteractions  
✅ React Three Fiber (selective 3D)  
✅ Dark luxury theme  
✅ Responsive, touch-friendly  
✅ QR code on CTA scene  
✅ Full 9-scene brochure flow  

---

*Nexafix — Fix It Before It Fails. ConnexFM Expo.*
