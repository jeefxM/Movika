# Movika — Project Knowledge Graph

## Entity: Project
- **Name:** Movika (reelestate-landing)
- **Type:** Next.js 16 landing page
- **Purpose:** Marketing site for a social media content agency specializing in real estate
- **Stack:** Next.js 16.1.6, React 19, TypeScript, Tailwind CSS 4, GSAP, Framer Motion
- **Default Locale:** Georgian (ka), also supports English (en)
- **Currency:** Georgian Lari (₾)

---

## Entity: Brand
- **Logo:** `/public/movika_logo.png`
- **Primary Color:** `#c09cff` (light purple)
- **Primary Dim:** `#8f47ff` (deep violet)
- **Secondary:** `#00c1fd` (cyan)
- **Tertiary:** `#ff5dd7` (pink/magenta)
- **Surface:** `#0e0e13` (near-black)
- **Text:** `#f9f5fd` (off-white)
- **Headline Font:** Montserrat (Google Fonts)
- **Body Font:** Work Sans (Google Fonts)
- **Label Font:** DM Sans (Google Fonts)
- **Style:** Dark theme, glassmorphism, kinetic gradients, glow effects

---

## Entity: Pages

### Home Page (`/[locale]/`)
Renders these sections in order:
1. Navbar (fixed)
2. Hero (full-screen, split layout)
3. VideoShowcase (Portfolio)
4. Services (What We Do)
5. HowItWorks (3-step process)
6. Testimonials
7. Pricing
8. Blog (latest 3)
9. FAQ
10. Footer

### Blog Pages
- `/[locale]/blog` — listing of all posts
- `/[locale]/blog/[slug]` — individual post

---

## Entity: Components

### Navbar
- Fixed top, blurs on scroll
- Logo + nav links + language toggle (EN/KA) + CTA button
- Mobile hamburger menu

### Hero
- Split layout: text left, visual right
- Left: animated label → headline (word-by-word GSAP stagger) → subheadline → 2 CTAs
- Right: illustrated agent image (`hero-agent.png`)
- Background: WavyBackground canvas animation (simplex noise, 30% opacity)
- Gradient text on key words

### HeroVisual
- Renders `/public/hero-agent.png` with purple drop shadow
- Dynamically imported (no SSR)

### WavyBackground
- HTML Canvas with simplex-noise wave animation
- Props: colors, waveOpacity (0.25), blur (12), speed, backgroundFill
- Canvas opacity set to 0.3

### Services
- 3-column bento grid
- Services: Video Editing (Film icon), Property Reels (Play icon), Social Design (Palette icon)
- Framer Motion whileInView animations

### VideoShowcase (Portfolio)
- Tab toggle: Reels vs Designs
- 3 video reels (`/videos/1.mp4`, `2.mp4`, `3.mp4`)
- 3 design posters (`movika_posters-01.png`, `-02.png`, `-03.png`)
- Lightbox modal on click
- Video hover preview

### HowItWorks
- 3 steps with numbered icons and connecting lines
- Accent colors: primary, secondary, tertiary
- Motion staggered entrance

### Testimonials
- 3 cards with star ratings, quotes, names, roles
- People: Nino Kapanadze, Dato Gelashvili, Lika Tsereteli

### Pricing
- 3 tiers: Starter (500₾), Growth (900₾, featured), Premium (1500₾)
- Growth tier has glow effect border
- 4 features per tier with checkmarks

### Blog
- Renders latest 3 posts from `src/lib/blog.ts`
- 3 hardcoded posts about real estate social media marketing
- Locale-aware dates and content

### FAQ
- 6 accordion items
- Topics: turnaround time, revisions, content types, onboarding, pricing, results

### Footer
- Logo, nav columns, social links, copyright

---

## Entity: Animations

### GSAP
- **Hero entrance:** staggered word animations with rotateX perspective
- **Scroll sections:** fade-in + slide-up (y: 60→0) triggered at 85% viewport
- **ScrollTrigger:** registered globally in page.tsx

### Framer Motion (motion/react)
- **Section entrances:** opacity 0→1, y 30→0, whileInView
- **Stagger delays:** i * 0.1 per child
- **Lightbox:** scale + opacity enter/exit

### CSS
- Hover transitions (color, shadow, border)
- Bounce animation on scroll indicator
- Smooth scroll behavior

---

## Entity: i18n

### Config
- Locales: `["en", "ka"]`
- Default: `ka` (Georgian)
- Messages: `/messages/en.json`, `/messages/ka.json`
- Middleware handles locale routing

### Translation Keys
```
Navbar: logo, cta
Hero: label, line1, line2pre, line2gradient, subheadline, cta, cta2, proof
Services: label, title, subtitle, service1-3Title, service1-3Desc
VideoShowcase: label, title, subtitle, reelsLabel, designsLabel
HowItWorks: label, title, subtitle, step1-3Title, step1-3Desc
Testimonials: label, title, t1-3Quote, t1-3Name, t1-3Role
Pricing: title, subtitle, tier1-3Name/Price/Period/Desc/Feature1-4, currency, cta
Blog: title, subtitle, pageTitle, pageSubtitle, readMore, viewAll, minRead, backHome, backToBlog, notFound
FAQ: title, q1-6, a1-6
Footer: tagline, product, services, portfolio, pricing, faq, company, about, contact, terms, connect, rights
```

---

## Entity: Assets

### Images
| File | Usage |
|------|-------|
| `movika_logo.png` | Navbar & footer |
| `movika_logo_original.png` | Original version |
| `hero-agent.png` | Hero right side (illustrated agent) |
| `movika_posters-01.png` | Portfolio design 1 |
| `movika_posters-03.png` | Portfolio design 3 |

### Videos
| File | Usage |
|------|-------|
| `videos/1.mp4` | Property reel 1 |
| `videos/2.mp4` | Property reel 2 |
| `videos/3.mp4` | Property reel 3 |

### Fonts
| File | Usage |
|------|-------|
| `fonts/bpg_nino_mtavruli_bold.ttf` | Georgian font (not active in CSS) |

---

## Entity: Blog Posts
1. **why-real-estate-needs-social-media** (2026-02-28, 5 min) — Why 70% of buyers discover properties online
2. **tiktok-tips-for-realtors** (2026-02-20, 4 min) — 7 TikTok strategies
3. **animated-reels-vs-static-photos** (2026-02-12, 3 min) — Reels get 3.2x more engagement

---

## Entity: Dependencies
```
next@16.1.6          react@19.2.4         typescript@5.9.3
tailwindcss@4.2.1    gsap@3.14.2          motion@12.34.5
next-intl@4.8.3      next-themes@0.4.6    lucide-react@0.576.0
three@0.183.2        @react-three/fiber@9.5.0  @react-three/drei@10.7.7
simplex-noise@4.0.3
```

---

## Entity: File Structure
```
src/
├── app/
│   ├── layout.tsx              # Root metadata
│   ├── globals.css             # Theme, fonts, utilities
│   └── [locale]/
│       ├── layout.tsx          # Providers (intl, theme)
│       ├── page.tsx            # Home (all sections + scroll animations)
│       └── blog/
│           ├── page.tsx        # Blog listing
│           └── [slug]/page.tsx # Blog detail
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── HeroVisual.tsx
│   ├── WavyBackground.tsx
│   ├── Services.tsx
│   ├── VideoShowcase.tsx
│   ├── HowItWorks.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── Blog.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   └── ThreeBackground.tsx     # Unused 3D background
├── i18n/
│   ├── routing.ts              # Locale config
│   ├── request.ts              # Message loading
│   └── navigation.ts           # Localized Link/router
├── lib/
│   └── blog.ts                 # Blog post data
└── middleware.ts                # i18n routing middleware
messages/
├── en.json                     # English translations
└── ka.json                     # Georgian translations
public/
├── movika_logo.png
├── hero-agent.png
├── movika_posters-*.png
├── videos/1-3.mp4
└── fonts/bpg_nino_mtavruli_bold.ttf
```

---

## Relationships
- **Hero** → uses **WavyBackground** (canvas animation)
- **Hero** → uses **HeroVisual** (dynamic import, no SSR)
- **Page** → wraps sections in `.scroll-section` → **GSAP ScrollTrigger**
- **All sections** → use **next-intl** `useTranslations()` for text
- **Navbar** → uses **next-intl navigation** for locale switching
- **VideoShowcase** → references videos in `/public/videos/`
- **Blog component** → calls `getLatestPosts()` from **blog.ts**
- **Blog pages** → call `getPostBySlug()` and `getAllPosts()`
- **Pricing** → currency from translations (₾)

---

## Status
- **Done:** Hero redesign, typography, animations, section ordering, scroll animations
- **Remaining:** Complete Georgian translations, launch Facebook page, set up ad campaigns
- **Known Issue:** TypeScript error in HowItWorks.tsx (accentMap string index)
