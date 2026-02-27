"use client";

import { FadeIn } from "./fade-in";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const AnimatedShaderBackground = dynamic(
  () => import("@/components/ui/animated-shader-background"),
  { ssr: false }
);

export default function CtaSection() {
  return (
    <section
      id="kontakt"
      className="relative overflow-hidden py-32"
    >
      {/* Aurora shader background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AnimatedShaderBackground className="h-full w-full" />
      </div>

      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0b0b0f]/50" />

      <FadeIn>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Bereit, digital
            <br />
            zu skalieren?
          </h2>
          <p className="mb-10 text-lg text-[#94a3b8] md:text-xl">
            Starte mit einem unverbindlichen Strategiegespräch.
            <br className="hidden sm:block" />
            Wir analysieren dein Projekt und zeigen dir den besten Weg.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@pandadev.de"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#8b5cf6] px-8 py-4 font-medium text-white transition-all hover:bg-[#7c3aed] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
            >
              Strategiegespräch buchen
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="tel:+4915679297000"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] px-8 py-4 font-medium text-white transition-all hover:bg-white/[0.05]"
            >
              +49 15679 297000
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
