"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import {
  Zap,
  Layout,
  PenTool,
  Search,
  Smartphone,
  Code,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useRef } from "react";

/* ─── Stagger animation variants ─────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/* ─── Automation Flow Visual ─────────────────────────────────── */
function AutomationVisual() {
  const nodes = [
    { label: "Trigger", x: 10, y: 15, color: "#8b5cf6" },
    { label: "Filter", x: 42, y: 55, color: "#6366f1" },
    { label: "Action", x: 75, y: 15, color: "#3b82f6" },
  ];

  return (
    <div className="absolute top-4 right-4 bottom-4 hidden w-[52%] overflow-hidden rounded-2xl border border-white/[0.03] bg-[#0a0a12]/90 backdrop-blur-sm md:block">
      {/* Toolbar */}
      <div className="flex h-8 items-center justify-between border-b border-white/[0.04] px-3.5">
        <div className="flex items-center gap-1.5">
          <div className="h-[7px] w-[7px] rounded-full bg-[#ff5f57]/50" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#febc2e]/50" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#28c840]/50" />
        </div>
        <span className="text-[9px] tracking-wider text-white/20 uppercase">
          Workflow
        </span>
      </div>

      {/* Flow canvas */}
      <div className="relative min-h-[140px] h-[calc(100%-2rem)] p-4">
        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 70">
          <motion.path
            d="M 20 20 C 30 20, 32 58, 42 58"
            fill="none"
            stroke="url(#flow-grad)"
            strokeWidth="0.6"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d="M 52 58 C 62 58, 65 20, 75 20"
            fill="none"
            stroke="url(#flow-grad)"
            strokeWidth="0.6"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.label}
            className="absolute flex flex-col items-center gap-1.5"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4 + i * 0.2,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06]"
              style={{ backgroundColor: `${node.color}15` }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: node.color }}
              />
            </div>
            <span className="text-[8px] tracking-wide text-white/30">
              {node.label}
            </span>
          </motion.div>
        ))}

        {/* Floating data particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-[#8b5cf6]/40"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + (i % 2) * 10}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              x: [0, 15, 30],
              y: [0, i % 2 ? -4 : 4, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── SEO Analytics Visual ───────────────────────────────────── */
function SeoVisual() {
  const bars = [35, 52, 44, 68, 58, 78, 65, 90];

  return (
    <div className="mt-auto pt-6">
      <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-[#0a0a12]/80">
        <div className="flex items-center justify-between border-b border-white/[0.04] px-3.5 py-2">
          <span className="text-[9px] font-medium tracking-wider text-white/25 uppercase">
            Rankings
          </span>
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded-full bg-emerald-500/60" />
            <span className="text-[8px] text-emerald-400/50">+42%</span>
          </div>
        </div>
        <div className="flex h-24 items-end gap-[3px] px-3 pt-3 pb-3">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                background:
                  i >= bars.length - 2
                    ? "linear-gradient(to top, #8b5cf6, #a78bfa)"
                    : "rgba(139, 92, 246, 0.15)",
              }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.06,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Branding Visual ────────────────────────────────────────── */
function BrandVisual() {
  const colors = [
    { from: "#8b5cf6", to: "#6366f1" },
    { from: "#3b82f6", to: "#06b6d4" },
    { from: "#f59e0b", to: "#ef4444" },
  ];

  return (
    <div className="mt-auto pt-6">
      <div className="flex items-end gap-3">
        <div className="flex-1 rounded-xl border border-white/[0.04] bg-[#0a0a12]/70 px-3 py-3">
          <div className="mb-2 text-[8px] tracking-wider text-white/20 uppercase">
            Typeface
          </div>
          <div className="text-[22px] leading-none font-light tracking-tight text-white/70">
            Aa
          </div>
          <div className="mt-1.5 text-[8px] leading-relaxed tracking-wide text-white/20">
            ABCDEFGHIJ
            <br />
            abcdefghij
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {colors.map((c, i) => (
            <motion.div
              key={i}
              className="h-7 w-7 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.7, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3 + i * 0.1,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Web Design Visual ──────────────────────────────────────── */
function WebPreviewVisual() {
  return (
    <div className="mt-auto pt-6">
      <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-[#0a0a12]/80">
        <div className="flex h-6 items-center gap-1.5 border-b border-white/[0.04] px-3">
          <div className="h-[6px] w-[6px] rounded-full bg-[#ff5f57]/30" />
          <div className="h-[6px] w-[6px] rounded-full bg-[#febc2e]/30" />
          <div className="h-[6px] w-[6px] rounded-full bg-[#28c840]/30" />
          <div className="ml-3 h-[10px] flex-1 rounded bg-white/[0.03]" />
        </div>
        <div className="space-y-2 p-3">
          <div className="h-8 w-full rounded-lg bg-gradient-to-r from-[#8b5cf6]/[0.08] to-transparent" />
          <div className="flex gap-2">
            <div className="h-3 flex-[3] rounded bg-white/[0.04]" />
            <div className="h-3 flex-[1] rounded bg-white/[0.03]" />
          </div>
          <div className="h-2.5 w-3/5 rounded bg-white/[0.03]" />
          <div className="mt-1 flex gap-1.5">
            <div className="h-10 flex-1 rounded-lg bg-white/[0.025]" />
            <div className="h-10 flex-1 rounded-lg bg-white/[0.025]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Visual ──────────────────────────────────────────── */
function MobileVisual() {
  return (
    <div className="mt-auto flex justify-center pt-6">
      <div className="relative h-[160px] w-[78px] rounded-2xl border border-white/[0.06] bg-[#0a0a12]/80 shadow-[0_0_40px_rgba(139,92,246,0.04)]">
        <div className="absolute top-1.5 left-1/2 h-[5px] w-10 -translate-x-1/2 rounded-full bg-white/[0.05]" />
        <div className="mt-5 space-y-1.5 px-2">
          <motion.div
            className="h-2.5 rounded bg-[#8b5cf6]/12"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          />
          <div className="h-2 w-4/5 rounded bg-white/[0.04]" />
          <div className="h-2 w-3/5 rounded bg-white/[0.03]" />
          <div className="mt-2 h-12 rounded-lg bg-white/[0.025]" />
          <div className="flex gap-1">
            <div className="h-5 flex-1 rounded bg-white/[0.03]" />
            <div className="h-5 flex-1 rounded bg-white/[0.03]" />
          </div>
        </div>
        <div className="absolute bottom-1.5 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-white/[0.08]" />
      </div>
    </div>
  );
}

/* ─── Software Terminal Visual (stagger-based) ───────────────── */
const terminalContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
};
const terminalLineVariant = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function TerminalVisual() {
  const lines = [
    { prompt: true, text: "npm run build" },
    { prompt: false, text: "✓ Compiled successfully", color: "text-emerald-400/50" },
    { prompt: false, text: "✓ Types validated", color: "text-emerald-400/50" },
    { prompt: false, text: "✓ 12 routes generated", color: "text-emerald-400/50" },
    { prompt: true, text: "deploying to production..." },
    { prompt: false, text: "● Live at app.client.de", color: "text-[#8b5cf6]/60" },
  ];

  return (
    <div className="absolute top-4 right-4 bottom-4 hidden w-[50%] overflow-hidden rounded-2xl border border-white/[0.03] bg-[#0a0a12]/90 backdrop-blur-sm md:block">
      <div className="flex h-8 items-center justify-between border-b border-white/[0.04] px-3.5">
        <div className="flex items-center gap-1.5">
          <div className="h-[7px] w-[7px] rounded-full bg-[#ff5f57]/50" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#febc2e]/50" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#28c840]/50" />
        </div>
        <span className="text-[9px] tracking-wider text-white/20 uppercase">
          Terminal
        </span>
      </div>
      <motion.div
        className="space-y-1.5 p-3.5 font-mono text-[10px] leading-relaxed"
        variants={terminalContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2"
            variants={terminalLineVariant}
          >
            {line.prompt && (
              <span className="text-[#8b5cf6]/40 select-none">$</span>
            )}
            <span className={line.color || "text-white/30"}>{line.text}</span>
          </motion.div>
        ))}
        <motion.span
          className="inline-block h-3 w-[5px] bg-[#8b5cf6]/50"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Everything Card (center) ───────────────────────────────── */
function EverythingCard() {
  return (
    <motion.div
      className="relative min-h-[280px] md:min-h-0"
      variants={cardVariants}
    >
      <div className="relative h-full rounded-2xl border-[0.75px] border-white/[0.04] p-2 md:rounded-3xl md:p-2.5">
        <GlowingEffect
          spread={40}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-[#111122] p-10 md:rounded-2xl">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/[0.07] blur-[80px]" />
            <div className="absolute top-1/4 left-1/3 h-32 w-32 rounded-full bg-[#3b82f6]/[0.08] blur-[60px]" />
            <div className="absolute right-1/4 bottom-1/3 h-24 w-24 rounded-full bg-[#6366f1]/[0.06] blur-[40px]" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10 text-center">
            <motion.h3
              className="text-3xl leading-[1.15] font-bold tracking-tight text-white/90 md:text-[2.75rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <span className="italic">Alles</span> aus
              <br />
              einer{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
                Hand
              </span>
            </motion.h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Service Card with reactive spotlight ───────────────────── */
function ServiceCard({
  icon: Icon,
  title,
  description,
  colSpan,
  children,
  accentColor = "#8b5cf6",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  colSpan: number;
  children?: React.ReactNode;
  accentColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const spotlightX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), {
    stiffness: 200,
    damping: 30,
  });
  const spotlightY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), {
    stiffness: 200,
    damping: 30,
  });

  // Reactive motion template — updates as mouse moves without React re-renders
  const spotlightBg = useMotionTemplate`radial-gradient(400px circle at ${spotlightX}% ${spotlightY}%, ${accentColor}08, transparent 60%)`;

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      className={`relative ${colSpan === 2 ? "md:min-h-0 md:col-span-2" : "min-h-[280px] md:min-h-0"}`}
      variants={cardVariants}
    >
      <div className="relative h-full rounded-2xl border-[0.75px] border-white/[0.04] p-2 md:rounded-3xl md:p-2.5">
        <GlowingEffect
          spread={40}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="group relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] border-white/[0.04] bg-[#12121e] shadow-sm md:rounded-2xl"
        >
          {/* Reactive spotlight follow effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlightBg }}
          />

          {/* Content */}
          <div className="relative z-10 p-7 pb-2">
            <div
              className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-500"
              style={{
                backgroundColor: `${accentColor}10`,
                border: `1px solid ${accentColor}15`,
              }}
            >
              <Icon
                size={18}
                style={{ color: accentColor }}
                className="opacity-70"
              />
            </div>

            <h3 className="card-title mb-3">{title}</h3>

            <p className="card-body max-w-xs">{description}</p>

            <div className="mt-5 flex items-center gap-2 text-[0.8rem] text-white/25 transition-all duration-500 group-hover:gap-3 group-hover:text-white/50">
              <span>Mehr erfahren</span>
              <ArrowRight
                size={13}
                className="transition-transform duration-500 group-hover:translate-x-0.5"
              />
            </div>
          </div>

          {/* Visual area */}
          {children && colSpan !== 2 ? (
            <div className="relative z-10 flex flex-1 flex-col px-7 pb-5">
              {children}
            </div>
          ) : null}
          {children && colSpan === 2 ? children : null}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Grid ──────────────────────────────────────────────── */
export default function ServicesGrid() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 backdrop-blur-sm">
            <div className="relative h-1.5 w-1.5">
              <div className="absolute inset-0 rounded-full bg-[#8b5cf6]" />
              <div className="absolute inset-0 animate-ping rounded-full bg-[#8b5cf6] opacity-75" />
            </div>
            <span className="text-[0.8rem] tracking-wide text-white/40">
              Services
            </span>
          </div>
          <h2 className="section-heading text-[2.5rem] tracking-[-0.03em] md:text-[3.5rem] lg:text-[4rem]">
            Was wir für dich
            <br />
            <span className="bg-gradient-to-r from-white/90 via-white/60 to-white/40 bg-clip-text text-transparent">
              umsetzen
            </span>
          </h2>
          <p className="section-body mx-auto mt-4 max-w-2xl">
            Von der ersten Idee bis zum laufenden System — alles aus einer Hand,
            ohne Reibungsverluste.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 gap-3 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <ServiceCard
            icon={Zap}
            title="Automatisierungen"
            description="Prozesse digitalisieren, Workflows automatisieren und Ressourcen freisetzen."
            colSpan={2}
            accentColor="#8b5cf6"
          >
            <AutomationVisual />
          </ServiceCard>

          <ServiceCard
            icon={Search}
            title="SEO & GEO"
            description="Organische Sichtbarkeit und nachhaltiges Wachstum."
            colSpan={1}
            accentColor="#10b981"
          >
            <SeoVisual />
          </ServiceCard>

          <ServiceCard
            icon={PenTool}
            title="Branding"
            description="Markenidentität mit Wiedererkennungswert und strategischer Tiefe."
            colSpan={1}
            accentColor="#f59e0b"
          >
            <BrandVisual />
          </ServiceCard>

          <EverythingCard />

          <ServiceCard
            icon={Layout}
            title="Webdesign"
            description="Conversion-optimierte Websites, die Besucher zu Kunden machen."
            colSpan={1}
            accentColor="#3b82f6"
          >
            <WebPreviewVisual />
          </ServiceCard>

          <ServiceCard
            icon={Smartphone}
            title="App Entwicklung"
            description="Native und Cross-Platform Apps für iOS und Android."
            colSpan={1}
            accentColor="#6366f1"
          >
            <MobileVisual />
          </ServiceCard>

          <ServiceCard
            icon={Code}
            title="Software Entwicklung"
            description="Individuelle Web-Applikationen und Backend-Systeme."
            colSpan={2}
            accentColor="#06b6d4"
          >
            <TerminalVisual />
          </ServiceCard>
        </motion.div>
      </div>
    </section>
  );
}
