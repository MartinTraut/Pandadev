# PANDADEV — Projektzusammenfassung

## Unternehmen

**Firma:** P&A Development GmbH (Marke: PANDADEV)
**Gründer:** Aaron Hermann & Philipp Stapf
**Standort:** Schloßstraße 8, 74388 Talheim, Baden-Württemberg
**Handelsregister:** HRB 802054 · AG Stuttgart
**USt-IdNr.:** DE457959329
**Telefon:** +49 15679 297000
**E-Mail:** info@pandadev.de
**Website:** https://www.pandadev.de
**Instagram:** @padevde
**LinkedIn:** p-a-development
**Branche:** Full-Service Digital Agentur (Strategie, Design, Entwicklung, Automatisierung)
**Region:** Heilbronn, Neckarsulm, Talheim und Umgebung
**Google-Bewertung:** 5.0

## Tech-Stack

- **Framework:** Next.js 16.1.6 (App Router, TypeScript)
- **Styling:** Tailwind CSS 4 + PostCSS
- **Animationen:** Framer Motion 12.34.3
- **UI:** Radix UI + shadcn/ui (dark theme)
- **Icons:** Lucide React
- **3D:** Three.js (Shader-Background im Kontakt-Bereich)
- **Fonts:** Geist + Geist Mono (Google Fonts via next/font)
- **Utilities:** clsx + tailwind-merge (cn() Helper)
- **Package Name:** cvfdvfdvfdg (irrelevant, historisch)

## Farbsystem

```
Primary:          #8b5cf6 (Purple)
Primary Light:    #a78bfa
Primary Dark:     #7c3aed
Hintergrund:      #050505 (fast schwarz)
Card BG:          #0d0d0d / #12121e
Text Primary:     #f5f5f5
Text Secondary:   #999999 / white/40-50
Muted:            #1a1a1a
Border:           rgba(255,255,255,0.06-0.08)

Accent-Farben pro Service:
- Automatisierung: #8b5cf6 (purple)
- SEO:             #10b981 (emerald)
- Branding:        #f59e0b (amber)
- Webdesign:       #3b82f6 (blue)
- App:             #6366f1 (indigo)
- Software:        #06b6d4 (cyan)
- AR/XR:           #ec4899 (pink)
- Online Shops:    #10b981 (emerald)

Prozess-Sektion Farbverlauf (Strahl):
Step 1: #8b5cf6 → Step 2: #6366f1 → Step 3: #3b82f6 → Step 4: #10b981
```

## Design-Prinzipien

- **Dark-first** mit Glassmorphism (bg-white/[0.02-0.04], border-white/[0.05-0.08], backdrop-blur)
- **GlowingEffect** Komponente (reaktiver Spotlight) auf Service-Cards, Blog-Cards, Testimonial-Cards
- **Doppelter Rahmen:** Outer rounded-3xl + Inner rounded-2xl mit GlowingEffect dazwischen
- **Animationen:** Framer Motion mit ease [0.16, 1, 0.3, 1] oder [0.22, 1, 0.36, 1]
- **Blur-Reveal:** Elemente faden mit filter: blur(6-10px) → blur(0px) ein
- **Scroll-driven:** Prozess-Sektion nutzt useScroll/useTransform für Beam + Card-Opacity
- **Endlos-Animationen:** Service-Visuals laufen dauerhaft (außer SEO-Bars = einmalig)

## Dateistruktur

```
app/
├── layout.tsx           (Root Layout, Metadata, Schema.org JSON-LD, Geist Fonts)
├── page.tsx             (Importiert alle Sections)
├── globals.css          (Design Tokens, Keyframes, Glassmorphism, Utilities)
├── impressum/page.tsx
└── datenschutz/page.tsx

components/
├── navigation.tsx       (Desktop Pill-Nav + Mobile Bottom-Nav + Fullscreen-Menü)
├── hero.tsx             (Particle Canvas + Team-Bild + Animated Stats Counter)
├── marquee.tsx          (Endlos-Scroll Keywords)
├── clients.tsx          (Endlos-Scroll Kundenlogos, Grayscale)
├── services.tsx         (Bento Grid, GlowingEffect, Endlos-Animationen)
├── portfolio.tsx        (3D Scroll Perspective + Modals)
├── about.tsx            (Team-Foto + Werte)
├── stats.tsx            (Counter-Animation)
├── process.tsx          (Sticky Scroll + Beam Timeline + Scroll-driven Cards)
├── testimonials.tsx     (GlowingEffect Cards + Star-Animation)
├── faq.tsx              (Accordion mit Plus→X Animation)
├── blog.tsx             (GlowingEffect Cards)
├── cta.tsx              (Kontaktformular + Aurora Shader Background)
├── footer.tsx           (4-Spalten Grid)
└── ui/
    ├── glowing-effect.tsx           (Reaktiver Spotlight-Border)
    ├── animated-shader-background.tsx (Three.js Aurora Shader)
    ├── timeline.tsx                 (Aceternity Timeline, aktuell nicht genutzt)
    ├── tubelight-navbar.tsx         (Alt, nicht mehr genutzt)
    ├── display-cards.tsx            (Alt, nicht mehr genutzt)
    └── background-gradient-animation.tsx (Alt, nicht mehr genutzt)

public/
├── logo.png
├── team.png              (Gründerfoto für About-Sektion)
├── hero-team.png         (Gründerfoto für Hero)
├── clients/              (7 Kundenlogos: rockstroh, sevend, kaufmann, dynaamiq, tinka, td, lobmueller)
├── projects/             (6 Projekt-Screenshots: rockstroh, monaco, kaufmann, fotostudio, automobile, lobmueller)
└── blog/                 (3 Blog-Bilder: software.png, digitalisierung.png, app-entwicklung.png)
```

## Sektionen-Reihenfolge (page.tsx)

1. **Navigation** (fixed, sticky)
2. **Hero** (Particle Canvas + Team-Bild + Stats)
3. **Marquee** (Keywords Endlos-Scroll)
4. **Clients** (Kundenlogos Endlos-Scroll)
5. **Services** (Bento Grid, id="leistungen")
6. **Portfolio** (3D Scroll, id="projekte")
7. **About** (Team-Foto, id="ueber-uns")
8. **Stats** (Counter)
9. **Process** (Sticky Scroll + Beam, id="prozess")
10. **Testimonials** (Bewertungen, id="bewertungen")
11. **FAQ** (Accordion, id="faq")
12. **Blog** (3 Artikel, id="blog")
13. **CTA** (Kontaktformular + Shader, id="kontakt")
14. **Footer**

## Navigation (Desktop Pill)

Reihenfolge: Leistungen → Projekte → Über uns → Prozess → Bewertungen → FAQ → Blog
CTA-Button rechts: "Projekt starten" → #kontakt
Mobile Bottom-Bar: Leistungen, Projekte, Bewertungen, Kontakt
Scroll-Erkennung: requestAnimationFrame + getBoundingClientRect (40% viewport trigger)

## Prozess-Sektion (Sticky Scroll) — Details

- **Scroll-Runway:** (N+1) * 100vh = 500vh (4 Steps + 1 Buffer)
- **Sticky Frame:** h-screen, flex items-center
- **Beam:** Ein durchgehender Farbverlauf-Balken (purple→indigo→blue→green), scroll-driven height via useTransform
- **Kein Tip-Dot** am Ende, stattdessen CSS mask fade-out
- **Kein grauer Track** im Hintergrund
- **Icons:** Komplett unsichtbar bis der Beam sie erreicht (opacity + blur via useTransform)
- **Cards:** Alle 4 gleichzeitig im DOM, absolut positioniert, scroll-driven opacity/blur
- **FADE = 0.12** (12% Scroll = ~60vh pro Übergang) — langer, genießbarer Crossfade
- **isActive State** triggert Card-interne Animationen (Icon-Spring, Accent-Linie, Check-Stagger)
- **Feste Höhen:** Container h-[min(520px,70vh)], Timeline fixed width/height, absolute Icon-Positionen
- **WICHTIG:** `overflow-x: clip` (nicht `hidden`) auf <main> damit sticky funktioniert

## Services-Sektion (Bento Grid) — Details

Layout (Desktop, 3 Spalten):
```
[KI & Automatisierung (2col) ][App Entwicklung ]
[Branding    ][Alles aus    ][App Entwicklung ] ← row-span-2
[Webdesign   ][SEO          ][Online Shops    ]
[Software Entwicklung (2col) ][AR / XR        ]
```

- Icon + Titel stehen nebeneinander (horizontal, flex row)
- "Mehr erfahren" wurde entfernt
- Animationen laufen dauerhaft (repeat: Infinity) AUSSER SEO-Bars (einmalig whileInView)
- Handy-Animation groß (220x108px) weil row-span-2

## Testimonials — 6 echte Bewertungen

1. Alexander Herrling, Rockstroh GmbH
2. Inge Hermann, Fotostudio Inge Hermann
3. Herr Kaufmann, Kaufmann Heizungsbau
4. Sina, Monaco Beauty
5. Projektleiter, The Good Miles
6. Restaurant Manager, Zum Lobmüller

Alle 5 Sterne, GlowingEffect auf allen Cards.

## Portfolio — 6 Projekte

1. Rockstroh GmbH (Custom Application)
2. Monaco Beauty (Premium Website)
3. Kaufmann Heizung & Solar (Website & SEO)
4. Fotostudio Inge Hermann (Website)
5. Automobile Reinhardt (Website)
6. Zum Lobmüller (Custom App)

Modal: Bottom-Sheet mobile, zentriert desktop.

## Bekannte Probleme / Offene Punkte

- Leistungs-Sektion könnte noch kompakter/tetris-mäßiger sein — Quadratgrößen weiter optimieren
- Prozess-Sektion: Card-Animationen (isActive) könnten noch smoother mit den Icon-Reveals synchronisiert werden
- Mobile: Prozess-Sektion hat keinen Beam (nur Progress-Bars), könnte schöner sein
- Blog-Sektion: Links führen nirgendwo hin (keine Blog-Detail-Seiten)
- Kontaktformular: Sendet aktuell nicht (nur console.log / setSubmitted)
- Impressum/Datenschutz: Platzhalter-Texte, müssen rechtlich geprüft werden

## Nutzer-Präferenzen (Martin)

- Will Apple/Awwwards-Level Design
- Mag Endlos-Animationen die leben (nicht einmalig)
- Will Sticky-Scroll-Erlebnisse (Prozess)
- Hasst Flickern, Ruckeln, Layout-Shifts
- Will exakte Synchronisation von Timeline-Beam und Cards
- Bevorzugt blur-Reveals statt slide-in
- Will dass nichts vorab sichtbar ist was noch nicht "erreicht" wurde
- SEO-Bars sollen NICHT endlos animieren (einmalig)
- Emojis im Code sind OK wenn der User sie will, aber Icons bevorzugt
- "Mehr erfahren" Links auf Service-Cards nicht gewünscht
- Farbverläufe im Beam-Strahl: purple → indigo → blue → green
