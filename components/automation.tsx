"use client";

import { motion } from "framer-motion";
import { Users, Target, CalendarCheck, Link2, Bot } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FadeIn, StaggerContainer, staggerItem } from "./fade-in";

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
    <section id="automation" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="section-label">Automatisierung</span>
            <h2 className="section-heading md:text-5xl">
              20+ Stunden pro Woche einsparen
              <br />
              — automatisch
            </h2>
            <p className="section-body mx-auto max-w-2xl">
              Deine Mitarbeiter verbringen Stunden mit Copy-Paste,
              Datenübertragung und Erinnerungs-Mails? Wir bauen Systeme, die
              das für euch übernehmen — zuverlässig, 24/7.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {useCases.map((useCase) => (
            <motion.div key={useCase.title} className="relative" variants={staggerItem}>
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
                  <h3 className="card-title mb-1.5 text-sm">
                    {useCase.title}
                  </h3>
                  <p className="card-body text-xs">{useCase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
