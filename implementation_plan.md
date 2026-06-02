# GovernAI Website — Premium Revamp Plan (Updated)

Complete overhaul to top 1% quality. Preserves structure, color palette (`#ea6926`, black, white, peach), light theme.

---

## User Review Required

> [!IMPORTANT]
> **PDF Extraction**: I could not extract text from the PDF (it's compressed binary). I've analyzed all 41 images visually and will write descriptions based on what I can see in each image (workshop names, venue details, visible slide titles, etc.). **Please review the descriptions in the final code and correct any inaccuracies.**

> [!IMPORTANT]
> **Nav Items**: Removing "Solutions" and "Products" from nav since those sections don't exist. Final nav: `Domains → Clients → Insights → Founder → Team`

> [!IMPORTANT]
> **Insights Section**: Replacing the LinkedIn iframe carousel with a **Lovable-style wide-card image carousel** (reference UI pattern: 70%-width cards, dark gradient left overlay, title + description text, prev/next + dots, smooth 800ms slide transitions). Images sourced from the LinkedIn Posts folder, copied to `public/insights/`.

---

## Proposed Changes

### Phase 1 — Bug Fixes + Asset Setup

#### [MODIFY] [page.js](file:///c:/governAI/bc-final-website/src/app/page.js)
- Wrap app with `ScrollProvider` to fix null `useScroll()`
- Update section IDs: change `linkedin` → `insights`

#### [MODIFY] [content.js](file:///c:/governAI/bc-final-website/src/config/content.js)
- Fix `NAV_ITEMS`: remove Solutions/Products, rename LinkedIn → Insights

#### [MODIFY] [layout.js](file:///c:/governAI/bc-final-website/src/app/layout.js)
- Fix null OG/Twitter image URLs

#### [DELETE] [styles/linkdin-carousel.css](file:///c:/governAI/bc-final-website/src/styles/linkdin-carousel.css)
#### [DELETE] [page.module.css](file:///c:/governAI/bc-final-website/src/app/page.module.css)

#### Copy LinkedIn post images to `public/insights/` (~15 best images selected from the 41)

---

### Phase 2 — Design System Enhancement

#### [MODIFY] [tokens.js](file:///c:/governAI/bc-final-website/src/theme/tokens.js)
- Add peach palette, neutral scale, spacing, radius, shadows, transitions

#### [MODIFY] [globals.css](file:///c:/governAI/bc-final-website/src/app/globals.css)
- Premium resets, scrollbar, focus states, responsive utilities cleanup

---

### Phase 3 — NavBar & Footer Revamp

#### [MODIFY] [NavBar.jsx](file:///c:/governAI/bc-final-website/src/components/organisms/NavBar.jsx)
- Ultra-refined glassmorphism, pill-style active indicator, scroll-aware shrink, premium mobile drawer, CTA shine effect

#### [MODIFY] [Footer.jsx](file:///c:/governAI/bc-final-website/src/components/organisms/Footer.jsx)
- Premium layout, animated gradient top border, logo image, social icon buttons, refined FAB, fix dead links

---

### Phase 4 — Insights Carousel (Replaces LinkedIn Section)

#### [NEW] [InsightsCarouselSection.jsx](file:///c:/governAI/bc-final-website/src/components/organisms/InsightsCarouselSection.jsx)
**Lovable-style wide-card carousel** replacing `LinkedInCarouselSection`:
- **Card design**: 70% viewport width, `aspect-ratio: 2/1`, `rounded-3xl`, full-bleed image with dark gradient overlay (left-to-right: 92% → 5% opacity)
- **Text overlay**: Title (institution/event name) + description on the left 58%
- **Transitions**: `transform 800ms cubic-bezier(0.65, 0, 0.35, 1)`, inactive cards at 60% opacity + `scale(0.94)`
- **Navigation**: Minimal prev/next arrow buttons + dot indicators
- **Click on inactive card** to navigate to it
- **Data**: ~15 curated entries with image path + title + description (from visible content in images)
- **Responsive**: Full-width on mobile with swipe support

#### [NEW] [insightsData.js](file:///c:/governAI/bc-final-website/src/config/insightsData.js)
Data file with ~15 entries, each containing:
```js
{ id, image: '/insights/XX.jpeg', title: 'Institution Name', description: 'Short description of event/workshop' }
```

#### [DELETE] [LinkedInCarouselSection.jsx](file:///c:/governAI/bc-final-website/src/components/organisms/LinkedInCarouselSection.jsx)
#### [DELETE] [organisms/linkdin-carousel.css](file:///c:/governAI/bc-final-website/src/components/organisms/linkdin-carousel.css)

---

### Phase 5 — Section-by-Section Premium Revamp

#### [MODIFY] [Preloader.jsx](file:///c:/governAI/bc-final-website/src/components/molecules/Preloader.jsx)
- Premium load animation with spring physics + clipPath exit

#### [MODIFY] [LandingSection.jsx](file:///c:/governAI/bc-final-website/src/components/organisms/LandingSection.jsx)
- Refined typography, gradient text, premium CTA buttons, floating badges

#### [MODIFY] [DomainsSection.jsx](file:///c:/governAI/bc-final-website/src/components/organisms/DomainsSection.jsx)
- Clean up injected CSS, staggered card animations, refined cards

#### [MODIFY] [ClientsMarqueeSection.jsx](file:///c:/governAI/bc-final-website/src/components/organisms/ClientsMarqueeSection.jsx)
- Frosted-glass logo cards, animated count-up stats, smoother marquee

#### [MODIFY] [FounderProfile.jsx](file:///c:/governAI/bc-final-website/src/components/organisms/FounderProfile.jsx)
- Premium timeline, glassmorphism cards, LinkedIn icon SVG

#### [MODIFY] [ImageCard.jsx](file:///c:/governAI/bc-final-website/src/components/molecules/ImageCard.jsx)
- Gradient border rings, refined hover effects, better grid layout

---

### Phase 6 — Animation Polish

#### [MODIFY] [FadeIn.jsx](file:///c:/governAI/bc-final-website/src/components/atoms/FadeIn.jsx)
- Add blur-fade variant, refined easings

#### [MODIFY] [Blob.jsx](file:///c:/governAI/bc-final-website/src/components/atoms/Blob.jsx)
- Slow pulse animation

#### [MODIFY] [GovernanceCore3D.jsx](file:///c:/governAI/bc-final-website/src/components/atoms/GovernanceCore3D.jsx)
- Performance optimization, cursor tracking

---

## Verification Plan

1. `npm run build` — zero build errors
2. `npm run dev` — all sections render, nav works, insights carousel slides
3. Verify at 1440px / 1024px / 768px / 375px breakpoints
4. Check all scroll navigation, hover effects, animations
