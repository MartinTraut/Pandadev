"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FadeIn, StaggerContainer, staggerItem } from "./fade-in";

const projects = [
  {
    name: "Rockstroh GmbH",
    type: "Custom Application",
    description:
      "Individuelle Applikation für komplexe Geschäftsprozesse — von der Planung bis zum Rollout.",
    image: "/projects/rockstroh.png",
    featured: true,
  },
  {
    name: "Monaco Beauty",
    type: "Premium Website",
    description:
      "Modernes Webdesign für einen Premium-Beauty-Salon mit Buchungssystem.",
    image: "/projects/monaco.png",
    featured: true,
  },
  {
    name: "Kaufmann Heizung & Solar",
    type: "Website & SEO",
    description:
      "Professionelle Webpräsenz für ein Handwerksunternehmen mit SEO-Optimierung.",
    image: "/projects/kaufmann.png",
    featured: false,
  },
  {
    name: "Fotostudio Inge Hermann",
    type: "Website",
    description:
      "Visuell ansprechendes Webdesign für ein professionelles Fotostudio.",
    image: "/projects/fotostudio.png",
    featured: false,
  },
  {
    name: "Automobile Reinhardt",
    type: "Website",
    description:
      "Online-Auftritt für ein Autohaus — responsiv, schnell und conversion-optimiert.",
    image: "/projects/automobile.png",
    featured: false,
  },
  {
    name: "Zum Lobmüller",
    type: "Custom App",
    description:
      "Zeiterfassungs-App für die Gastronomie — benutzerfreundlich und funktionsreich.",
    image: "/projects/lobmueller.png",
    featured: false,
  },
];

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: (typeof projects)[0];
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      className={`relative ${large ? "md:col-span-2 lg:col-span-1" : ""}`}
      variants={staggerItem}
    >
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/[0.04] p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-[#13131d] transition-all duration-500 md:rounded-2xl">
          {/* Image */}
          <div
            className={`relative overflow-hidden bg-[#0e0e16] ${large ? "h-64 md:h-72" : "h-48 md:h-56"}`}
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-top transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#13131d] via-[#13131d]/20 to-transparent" />

            {/* Project number */}
            <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md">
              <span className="text-xs font-medium tabular-nums text-white/50">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Arrow on hover */}
            <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06] text-white/70 backdrop-blur-md transition-all duration-500 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-[#8b5cf6]/20 group-hover:border-[#8b5cf6]/30">
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.06] px-3 py-1 text-[0.7rem] font-medium tracking-wide text-[#a78bfa]">
                  {project.type}
                </span>
              </div>
              <h3 className="card-title mb-2 tracking-[-0.01em]">
                {project.name}
              </h3>
              <p className="card-body text-[0.82rem] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Bottom link */}
            <div className="mt-5 flex items-center gap-2 text-[0.8rem] text-white/25 transition-all duration-500 group-hover:gap-3 group-hover:text-[#a78bfa]/70">
              <span>Case Study ansehen</span>
              <ArrowUpRight
                size={13}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projekte" className="relative py-28 md:py-36">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 h-[400px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.04),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <FadeIn>
          <div className="mb-20 text-center">
            <span className="section-label">Projekte</span>
            <h2 className="section-heading md:text-5xl">
              Ausgewählte Arbeiten
            </h2>
            <p className="section-body mx-auto max-w-2xl">
              Echte Projekte. Echte Ergebnisse. Von individuellen Apps bis hin
              zu conversion-optimierten Websites.
            </p>
          </div>
        </FadeIn>

        {/* Featured row — 2 large cards */}
        <StaggerContainer className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              large
            />
          ))}
        </StaggerContainer>

        {/* Remaining projects — 4 cards */}
        <StaggerContainer className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {otherProjects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i + featuredProjects.length}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
