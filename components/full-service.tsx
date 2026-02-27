"use client";

import { Compass, Rocket, TrendingUp } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FadeIn } from "./fade-in";

const pillars = [
  {
    icon: Compass,
    title: "Strategie",
    description:
      "Wir analysieren, beraten und entwickeln eine digitale Roadmap — bevor eine Zeile Code geschrieben wird.",
  },
  {
    icon: Rocket,
    title: "Umsetzung",
    description:
      "Design, Entwicklung und Automatisierung aus einer Hand. Kein Absprachenchaos zwischen Dienstleistern.",
  },
  {
    icon: TrendingUp,
    title: "Skalierung",
    description:
      "Wir wachsen mit dir. Performance-Optimierung, Weiterentwicklung und langfristige Betreuung.",
  },
];

export default function FullService() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <FadeIn>
            <div>
              <span className="mb-4 block text-sm uppercase tracking-widest text-[#8b5cf6]">
                Full-Service Ansatz
              </span>
              <h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
                Kein Flickenteppich.
                <br />
                Ein Partner. Ein Prozess.
              </h2>
              <p className="max-w-lg text-lg leading-relaxed text-[#94a3b8]">
                Strategie, Design, Entwicklung und Automatisierung — alles unter
                einem Dach. Keine Abstimmung zwischen fünf Dienstleistern. Keine
                verlorene Zeit. Ein Team, das dein Projekt von der Idee bis zum
                Wachstum begleitet.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.12} direction="left">
                <div className="relative">
                  <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/[0.04] p-2 md:rounded-[1.5rem] md:p-3">
                    <GlowingEffect
                      spread={40}
                      glow
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <div className="flex gap-5 rounded-xl bg-[#13131d] p-6 md:rounded-2xl">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8b5cf6]/10 text-[#8b5cf6]">
                        <pillar.icon size={22} />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-white">
                          {pillar.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#94a3b8]">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
