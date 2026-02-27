"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FadeIn } from "./fade-in";

const projects = [
  {
    name: "Rockstroh GmbH",
    type: "Custom Application",
    description:
      "Individuelle Applikation für komplexe Geschäftsprozesse — von der Planung bis zum Rollout.",
    image: "/projects/rockstroh.png",
  },
  {
    name: "Monaco Beauty",
    type: "Premium Website",
    description:
      "Modernes Webdesign für einen Premium-Beauty-Salon mit Buchungssystem.",
    image: "/projects/monaco.png",
  },
  {
    name: "Kaufmann Heizung & Solar",
    type: "Website",
    description:
      "Professionelle Webpräsenz für ein Handwerksunternehmen mit SEO-Optimierung.",
    image: "/projects/kaufmann.png",
  },
  {
    name: "Fotostudio Inge Hermann",
    type: "Website",
    description:
      "Visuell ansprechendes Webdesign für ein professionelles Fotostudio.",
    image: "/projects/fotostudio.png",
  },
  {
    name: "Automobile Reinhardt",
    type: "Website",
    description:
      "Online-Auftritt für ein Autohaus — responsiv, schnell und conversion-optimiert.",
    image: "/projects/automobile.png",
  },
  {
    name: "Zum Lobmüller",
    type: "Custom App",
    description:
      "Zeiterfassungs-App für die Gastronomie — benutzerfreundlich und funktionsreich.",
    image: "/projects/lobmueller.png",
  },
];

export default function Projects() {
  return (
    <section id="projekte" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="mb-4 block text-sm uppercase tracking-widest text-[#8b5cf6]">
              Projekte
            </span>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Ausgewählte Arbeiten
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#94a3b8]">
              Echte Projekte. Echte Ergebnisse. Von individuellen Apps bis hin
              zu conversion-optimierten Websites.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.name} className="relative">
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/[0.04] p-2 md:rounded-[1.5rem] md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="group relative h-full overflow-hidden rounded-xl bg-[#13131d] transition-all duration-500 md:rounded-2xl">
                    <div className="relative h-52 overflow-hidden bg-[#0e0e16]">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#13131d] via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium uppercase tracking-widest text-[#8b5cf6]">
                        {project.type}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">
                        {project.description}
                      </p>
                    </div>
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
