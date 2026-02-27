"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Zap, Code, Sparkles } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const heroCards = [
  {
    icon: <Sparkles className="size-4 text-violet-300" />,
    title: "Automatisierung",
    description: "Prozesse digitalisieren & skalieren",
    date: "Kernkompetenz",
    iconClassName: "text-violet-500",
    titleClassName: "text-violet-400",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Code className="size-4 text-blue-300" />,
    title: "Entwicklung",
    description: "Web, Mobile & Backend-Systeme",
    date: "Full-Stack",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Zap className="size-4 text-amber-300" />,
    title: "Strategie",
    description: "Digitale Roadmaps & Beratung",
    date: "Partner",
    iconClassName: "text-amber-500",
    titleClassName: "text-amber-400",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.5 + i * 0.04,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.5 + i * 0.08,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

function AnimatedHeadline() {
  const line1 = "A Full-Service";
  const line2words = ["Digital", "Partner"];

  return (
    <h1 className="mb-8 text-5xl leading-[1.05] font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
      <span className="block overflow-hidden">
        {line1.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char}
          </motion.span>
        ))}
      </span>
      <span className="block overflow-hidden">
        {line2words.map((word, i) => (
          <motion.span
            key={word}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className={`inline-block ${i > 0 ? "ml-[0.3em]" : ""} ${
              word === "Partner"
                ? "bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#3b82f6] bg-clip-text text-transparent"
                : ""
            }`}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(6, 6, 12)"
          gradientBackgroundEnd="rgb(11, 11, 15)"
          firstColor="139, 92, 246"
          secondColor="59, 130, 246"
          thirdColor="99, 102, 241"
          fourthColor="109, 40, 217"
          fifthColor="37, 99, 235"
          pointerColor="139, 92, 246"
          size="60%"
          blendingValue="hard-light"
          interactive={true}
          containerClassName="!h-full !w-full absolute inset-0"
          className="absolute inset-0 z-[1]"
        />
      </div>

      {/* Dark overlay to keep text readable */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[#0b0b0f]/40" />

      {/* Grid overlay */}
      <div className="grid-bg pointer-events-none absolute inset-0 z-[3] opacity-30" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left: Text */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-sm"
          >
            <div className="relative h-2 w-2">
              <div className="absolute inset-0 rounded-full bg-[#8b5cf6]" />
              <div className="absolute inset-0 animate-ping rounded-full bg-[#8b5cf6] opacity-75" />
            </div>
            <span className="text-sm text-[#94a3b8]">
              Full-Service Digital Partner
            </span>
          </motion.div>

          {/* Animated Headline */}
          <AnimatedHeadline />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-12 max-w-lg text-lg leading-relaxed text-[#94a3b8] md:text-xl lg:mx-0"
          >
            Strategie, Design, Automatisierung und Entwicklung aus einer Hand.
            Dein strategischer Internet-Partner für digitales Wachstum.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#8b5cf6] px-8 py-4 font-medium text-white transition-all hover:bg-[#7c3aed] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
            >
              Projekt starten
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] px-8 py-4 font-medium text-white transition-all hover:bg-white/[0.05]"
            >
              <Calendar size={18} />
              Strategiegespräch buchen
            </a>
          </motion.div>
        </div>

        {/* Right: Display Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex lg:items-center lg:justify-center"
        >
          <DisplayCards cards={heroCards} />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-40 bg-gradient-to-t from-[#0b0b0f] to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/[0.15] p-1.5"
        >
          <motion.div className="h-2 w-1 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
