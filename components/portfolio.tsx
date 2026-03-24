"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Rockstroh GmbH",
    category: "Custom Application",
    description:
      "Individuelle Enterprise-Applikation für komplexe Geschäftsprozesse, von der Anforderungsanalyse bis zum erfolgreichen Rollout.",
    image: "/projects/rockstroh.png",
    results: ["Prozesse digitalisiert", "Effizienz +60%", "Vollautomatisiert"],
    services: ["Software", "Backend", "Cloud"],
  },
  {
    title: "Monaco Beauty",
    category: "Premium Website",
    description:
      "Modernes Webdesign für einen Premium-Beauty-Salon mit integriertem Buchungssystem und SEO-Optimierung.",
    image: "/projects/monaco.png",
    results: ["+200% Anfragen", "Top 3 Google", "Conversion +45%"],
    services: ["Webdesign", "SEO", "Buchungssystem"],
  },
  {
    title: "Kaufmann Heizung & Solar",
    category: "Website & SEO",
    description:
      "Professionelle Webpräsenz für ein etabliertes Handwerksunternehmen mit lokaler SEO-Optimierung.",
    image: "/projects/kaufmann.png",
    results: ["+150% Traffic", "Seite 1 Google", "+80% Anfragen"],
    services: ["Webdesign", "SEO", "Content"],
  },
  {
    title: "Fotostudio Inge Hermann",
    category: "Website",
    description:
      "Visuell ansprechendes Webdesign, das die Arbeit des Fotostudios perfekt in Szene setzt.",
    image: "/projects/fotostudio.png",
    results: ["Portfolio Showcase", "Schnelle Ladezeit", "Mobile First"],
    services: ["Webdesign", "Fotografie", "Content"],
  },
  {
    title: "Automobile Reinhardt",
    category: "Website",
    description:
      "Online-Auftritt für ein Autohaus, responsiv, schnell und auf Conversion optimiert.",
    image: "/projects/automobile.png",
    results: ["+120% Online-Anfragen", "Mobile optimiert", "SEO Top 5"],
    services: ["Webdesign", "SEO", "Performance"],
  },
  {
    title: "Zum Lobmüller",
    category: "Custom App",
    description:
      "Maßgeschneiderte Zeiterfassungs-App für die Gastronomie, intuitiv, zuverlässig und funktionsreich.",
    image: "/projects/lobmueller.png",
    results: ["20h/Woche gespart", "Papierfrei", "Echtzeit-Tracking"],
    services: ["App", "Backend", "UI/UX"],
  },
];

interface ProjectModalProps {
  project: (typeof projects)[0] | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/[0.08] rounded-t-3xl md:rounded-3xl max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/60 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="relative aspect-video overflow-hidden rounded-t-3xl md:rounded-t-3xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent" />
        </div>

        <div className="p-6 md:p-8 -mt-16 relative z-10">
          <span className="text-xs uppercase tracking-widest text-[#8b5cf6]">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-white mt-2 mb-3">
            {project.title}
          </h3>
          <p className="text-white/50 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {project.results.map((result) => (
              <div
                key={result}
                className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
              >
                <span className="text-sm font-medium text-white/70">
                  {result}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.services.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.3], isMobile ? [0, 0] : [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], isMobile ? [1, 1] : [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="projekte" className="relative py-20 md:py-32 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs uppercase tracking-widest text-[#8b5cf6] mb-4 block">
            Projekte
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] text-white mb-4">
            Ausgewählte Arbeiten.
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-gradient-to-r from-[#8b5cf6] to-transparent mb-6"
          />
          <p className="text-lg text-white/50 leading-relaxed">
            Echte Projekte. Echte Ergebnisse. Von individuellen Apps bis hin zu
            conversion-optimierten Websites.
          </p>
        </motion.div>

        {/* Grid */}
        <div ref={containerRef} className="md:[perspective:1200px]">
          <motion.div
            style={isMobile ? { opacity } : { rotateX, scale, opacity }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {projects.map((project, i) => (
              <motion.button
                key={project.title}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl text-left",
                  "bg-white/[0.02] border border-white/[0.05]",
                  "hover:border-[#8b5cf6]/20 transition-all duration-500",
                  i < 2 && "lg:col-span-1"
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent" />

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-xs text-[#8b5cf6] uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-1">
                    {project.title}
                  </h3>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
