"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FadeIn } from "./fade-in";

const technologies = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Frontend" },
  { name: "React Native", category: "Mobile" },
  { name: "Node.js", category: "Backend" },
  { name: "TypeScript", category: "Sprache" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Spring Boot", category: "Backend" },
  { name: "n8n / Make", category: "Automation" },
  { name: "Cloud", category: "Infrastruktur" },
];

export default function TechStack() {
  return (
    <section id="tech" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="mb-4 block text-sm uppercase tracking-widest text-[#8b5cf6]">
              Technologie
            </span>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Moderner Tech Stack
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#94a3b8]">
              Wir setzen auf bewährte, skalierbare Technologien — keine
              Experimente auf Kosten deines Projekts.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
            {technologies.map((tech) => (
              <div key={tech.name} className="relative">
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/[0.04] p-2 md:rounded-[1.5rem] md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="group flex flex-col items-center gap-2 rounded-xl bg-[#13131d] px-6 py-5 text-center transition-all duration-500 md:rounded-2xl">
                    <span className="text-base font-semibold text-white">
                      {tech.name}
                    </span>
                    <span className="text-xs text-[#64748b]">
                      {tech.category}
                    </span>
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
