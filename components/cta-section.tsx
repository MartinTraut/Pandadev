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
    <section id="kontakt" className="relative overflow-hidden py-28 md:py-36">
      {/* Aurora shader background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AnimatedShaderBackground className="h-full w-full" />
      </div>

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0b0b0f]/50" />

      <FadeIn>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-heading text-4xl tracking-[-0.03em] md:text-5xl lg:text-6xl">
            Dein nächster Schritt
            <br />
            zum digitalen Wachstum
          </h2>
          <p className="section-body mb-10 md:text-xl">
            In 30 Minuten analysieren wir dein Projekt und zeigen dir konkret,
            wie wir dein Wachstum beschleunigen. Kostenlos und unverbindlich.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@pandadev.de"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#8b5cf6] px-8 py-4 font-medium text-white transition-all hover:bg-[#7c3aed] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
            >
              Kostenloses Strategiegespräch sichern
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
