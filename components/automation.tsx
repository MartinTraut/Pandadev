"use client";

import { Users, Target, CalendarCheck, Link2, Bot } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FadeIn } from "./fade-in";

const useCases = [
  {
    icon: Users,
    title: "CRM Automatisierung",
    description: "Kundendaten automatisch erfassen und pflegen",
  },
  {
    icon: Target,
    title: "Lead Funnels",
    description: "Leads generieren, qualifizieren und konvertieren",
  },
  {
    icon: CalendarCheck,
    title: "Terminbuchung",
    description: "Automatische Terminvergabe und Erinnerungen",
  },
  {
    icon: Link2,
    title: "API-Verknüpfungen",
    description: "Systeme nahtlos miteinander verbinden",
  },
  {
    icon: Bot,
    title: "KI-Agenten",
    description: "Intelligente Assistenten für repetitive Aufgaben",
  },
];

export default function Automation() {
  return (
    <section id="automation" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="mb-4 block text-sm uppercase tracking-widest text-[#8b5cf6]">
              Automatisierung
            </span>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Digitale Prozesse statt
              <br />
              manueller Arbeit
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#94a3b8]">
              Automatisierung ist kein Luxus — es ist die Grundlage für
              skalierbares Wachstum. Wir implementieren Systeme, die für dich
              arbeiten.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="relative">
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/[0.04] p-2 md:rounded-[1.5rem] md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="group flex h-full flex-col items-center rounded-xl bg-[#13131d] p-6 text-center transition-all duration-500 md:rounded-2xl">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8b5cf6]/10 text-[#8b5cf6]">
                      <useCase.icon size={22} />
                    </div>
                    <h3 className="mb-1.5 text-sm font-semibold text-white">
                      {useCase.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#64748b]">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
