"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, Lightbulb, Handshake, Star } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FadeIn, StaggerContainer, staggerItem } from "./fade-in";

const trustPoints = [
  {
    icon: Shield,
    title: "Transparenz",
    description:
      "Keine versteckten Kosten. Klare Kommunikation. Ehrliche Timelines.",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description:
      "Messbare Ergebnisse statt leere Versprechen. Wir optimieren, was zählt.",
  },
  {
    icon: Lightbulb,
    title: "Strategie",
    description:
      "Jedes Projekt beginnt mit einem Plan — nicht mit einem Angebot.",
  },
  {
    icon: Handshake,
    title: "Partnerschaft",
    description:
      "Langfristige Zusammenarbeit statt Einmal-Projekte. Wir wachsen mit dir.",
  },
];

const testimonials = [
  {
    quote:
      "Wir haben mit Aaron Hermann und Phillip Stapf zwei sehr kreative Köpfe gefunden, die unsere komplexen Anwendungen nach kurzer Zeit zu unserer vollsten Zufriedenheit umgesetzt haben.",
    client: "Rockstroh GmbH",
    type: "Custom Application",
    initial: "R",
  },
  {
    quote:
      "Super Leistung, meine Wünsche wurden alle sehr kreativ und professionell umgesetzt. Preis und Leistung unschlagbar, kann ich nur weiterempfehlen.",
    client: "Fotostudio Inge Hermann",
    type: "Website",
    initial: "F",
  },
  {
    quote:
      "Ich kann nur Positives über die Zusammenarbeit mit Aaron und Philipp sagen. Beide sind super motiviert, liefern schnell und zuverlässig ab.",
    client: "The Good Miles",
    type: "Website",
    initial: "T",
  },
];

export default function Trust() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Trust Points */}
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="section-label">Warum PANDADEV</span>
            <h2 className="section-heading md:text-5xl">
              Dein Vorteil mit uns
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="mb-24 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <motion.div key={point.title} className="relative" variants={staggerItem}>
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/[0.04] p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="h-full rounded-xl bg-[#13131d] p-6 md:rounded-2xl">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6]">
                    <point.icon size={20} />
                  </div>
                  <h3 className="card-title mb-2">{point.title}</h3>
                  <p className="card-body">{point.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Testimonials */}
        <FadeIn>
          <div className="mb-12 text-center">
            <h3 className="section-heading md:text-4xl">
              Was unsere Kunden sagen
            </h3>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.client} className="relative" variants={staggerItem}>
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/[0.04] p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="h-full rounded-xl bg-[#13131d] p-8 md:rounded-2xl">
                  <div className="mb-5 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className="fill-[#8b5cf6] text-[#8b5cf6]"
                      />
                    ))}
                  </div>
                  <p className="card-body mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b5cf6]/10 text-sm font-bold text-[#8b5cf6]">
                      {testimonial.initial}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {testimonial.client}
                      </p>
                      <p className="text-xs text-[#94a3b8]/60">
                        {testimonial.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
