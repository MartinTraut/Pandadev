"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Layout,
  PenTool,
  Search,
  Smartphone,
  Code,
  ShoppingCart,
  Glasses,
  type LucideIcon,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ═══ VISUALS ═══ */

function AutomationVisual() {
  const nodes = [
    { label: "Trigger", x: 10, y: 12, color: "#8b5cf6" },
    { label: "Filter", x: 42, y: 52, color: "#6366f1" },
    { label: "Action", x: 75, y: 12, color: "#3b82f6" },
  ];
  return (
    <div className="hidden w-full flex-1 overflow-hidden rounded-2xl border border-white/[0.03] bg-[#0a0a12]/90 md:block">
      <div className="flex h-8 items-center justify-between border-b border-white/[0.04] px-3.5">
        <div className="flex items-center gap-1.5">
          <div className="h-[7px] w-[7px] rounded-full bg-[#ff5f57]/50" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#febc2e]/50" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#28c840]/50" />
        </div>
        <span className="text-[9px] tracking-wider text-white/20 uppercase">Workflow</span>
      </div>
      <div className="relative h-[calc(100%-2rem)] min-h-[160px] p-4">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 70">
          <motion.path d="M 20 18 C 30 18, 32 55, 42 55" fill="none" stroke="url(#fg)" strokeWidth="0.6" strokeDasharray="2 2" animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d="M 52 55 C 62 55, 65 18, 75 18" fill="none" stroke="url(#fg)" strokeWidth="0.6" strokeDasharray="2 2" animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
          <defs><linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" /></linearGradient></defs>
        </svg>
        {nodes.map((n, i) => (
          <motion.div key={n.label} className="absolute flex flex-col items-center gap-1.5" style={{ left: `${n.x}%`, top: `${n.y}%` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06]" style={{ backgroundColor: `${n.color}15` }}>
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: n.color }} />
            </div>
            <span className="text-[9px] tracking-wide text-white/30">{n.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SeoVisual() {
  const bars = [35, 52, 44, 68, 58, 78, 65, 90];
  return (
    <div className="mt-auto pt-6">
      <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-[#0a0a12]/80">
        <div className="flex items-center justify-between border-b border-white/[0.04] px-3.5 py-2">
          <span className="text-[9px] font-medium tracking-wider text-white/25 uppercase">Rankings</span>
          <div className="flex items-center gap-1"><div className="h-1 w-1 rounded-full bg-emerald-500/60" /><span className="text-[8px] text-emerald-400/50">+42%</span></div>
        </div>
        <div className="flex h-24 items-end gap-[3px] px-3 pt-3 pb-3">
          {bars.map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-sm"
              style={{ background: i >= bars.length - 2 ? "linear-gradient(to top, #8b5cf6, #a78bfa)" : "rgba(139, 92, 246, 0.15)" }}
              initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] as const }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandVisual() {
  const colors = [{ from: "#8b5cf6", to: "#6366f1" }, { from: "#3b82f6", to: "#06b6d4" }, { from: "#f59e0b", to: "#ef4444" }];
  return (
    <div className="mt-auto pt-6">
      <div className="flex items-end gap-3">
        <div className="flex-1 rounded-xl border border-white/[0.04] bg-[#0a0a12]/70 px-3 py-3">
          <div className="mb-2 text-[8px] tracking-wider text-white/20 uppercase">Typeface</div>
          <div className="text-[22px] leading-none font-light tracking-tight text-white/70">Aa</div>
          <div className="mt-1.5 text-[8px] leading-relaxed tracking-wide text-white/20">ABCDEFGHIJ<br />abcdefghij</div>
        </div>
        <div className="flex flex-col gap-2">
          {colors.map((c, i) => (
            <motion.div key={i} className="h-7 w-7 rounded-full" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
              animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.6, 0.85, 0.6] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WebPreviewVisual() {
  return (
    <div className="mt-auto pt-6">
      <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-[#0a0a12]/80">
        <div className="flex h-6 items-center gap-1.5 border-b border-white/[0.04] px-3">
          <div className="h-[6px] w-[6px] rounded-full bg-[#ff5f57]/30" /><div className="h-[6px] w-[6px] rounded-full bg-[#febc2e]/30" /><div className="h-[6px] w-[6px] rounded-full bg-[#28c840]/30" />
          <div className="ml-3 h-[10px] flex-1 rounded bg-white/[0.03]" />
        </div>
        <div className="space-y-2 p-3">
          <motion.div className="h-8 w-full rounded-lg bg-gradient-to-r from-[#8b5cf6]/[0.08] to-transparent" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
          <div className="flex gap-2"><div className="h-3 flex-[3] rounded bg-white/[0.04]" /><div className="h-3 flex-[1] rounded bg-white/[0.03]" /></div>
          <div className="h-2.5 w-3/5 rounded bg-white/[0.03]" />
          <div className="mt-1 flex gap-1.5"><div className="h-10 flex-1 rounded-lg bg-white/[0.025]" /><div className="h-10 flex-1 rounded-lg bg-white/[0.025]" /></div>
        </div>
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="flex flex-1 items-center justify-center py-2">
      <div className="relative h-[280px] w-[136px] rounded-[1.75rem] border border-white/[0.06] bg-[#0a0a12]/80 shadow-[0_0_40px_rgba(99,102,241,0.06)]">
        <div className="absolute top-2.5 left-1/2 h-[5px] w-14 -translate-x-1/2 rounded-full bg-white/[0.05]" />
        <div className="mt-7 space-y-2.5 px-3">
          <motion.div className="h-3.5 rounded-md bg-[#6366f1]/15"
            animate={{ width: ["60%", "85%", "70%", "95%", "75%", "60%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
          <div className="h-2.5 w-4/5 rounded bg-white/[0.04]" />
          <div className="h-2.5 w-3/5 rounded bg-white/[0.03]" />
          <div className="mt-3 h-20 rounded-lg bg-white/[0.025]" />
          <div className="flex gap-1.5">
            <div className="h-8 flex-1 rounded-md bg-white/[0.03]" />
            <div className="h-8 flex-1 rounded-md bg-white/[0.03]" />
          </div>
          <div className="h-2.5 w-2/3 rounded bg-white/[0.03]" />
          <div className="flex gap-1.5">
            <motion.div className="h-6 flex-1 rounded-md bg-[#6366f1]/10"
              animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="h-6 flex-1 rounded-md bg-[#6366f1]/10"
              animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
          </div>
        </div>
        <div className="absolute bottom-2.5 left-1/2 h-[4px] w-12 -translate-x-1/2 rounded-full bg-white/[0.08]" />
      </div>
    </div>
  );
}

function ShopVisual() {
  return (
    <div className="mt-auto pt-6">
      <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-[#0a0a12]/80 p-3">
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div key={i} className="rounded-lg bg-white/[0.025] p-2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}>
              <div className="h-8 w-full rounded bg-white/[0.03] mb-1.5" /><div className="h-1.5 w-3/4 rounded bg-white/[0.04]" /><div className="h-1.5 w-1/2 rounded bg-emerald-500/20 mt-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArVisual() {
  return (
    <div className="mt-auto pt-6">
      <div className="relative overflow-hidden rounded-xl border border-white/[0.04] bg-[#0a0a12]/80 p-4 h-[120px] flex items-center justify-center">
        <motion.div className="relative w-16 h-16" animate={{ rotateY: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", perspective: "200px" }}>
          <div className="absolute inset-0 border-2 border-[#ec4899]/30 rounded-lg" />
          <div className="absolute inset-2 border border-[#ec4899]/20 rounded-md" style={{ transform: "rotateY(20deg)" }} />
          <div className="absolute inset-4 border border-[#ec4899]/10 rounded-sm" style={{ transform: "rotateY(40deg)" }} />
        </motion.div>
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <motion.div className="h-1 w-1 rounded-full bg-[#ec4899]/60" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[8px] text-[#ec4899]/50">AR</span>
        </div>
      </div>
    </div>
  );
}

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
    <div className="hidden w-full flex-1 overflow-hidden rounded-2xl border border-white/[0.03] bg-[#0a0a12]/90 md:block">
      <div className="flex h-8 items-center justify-between border-b border-white/[0.04] px-3.5">
        <div className="flex items-center gap-1.5"><div className="h-[7px] w-[7px] rounded-full bg-[#ff5f57]/50" /><div className="h-[7px] w-[7px] rounded-full bg-[#febc2e]/50" /><div className="h-[7px] w-[7px] rounded-full bg-[#28c840]/50" /></div>
        <span className="text-[9px] tracking-wider text-white/20 uppercase">Terminal</span>
      </div>
      <div className="space-y-2 p-4 font-mono text-[11px] leading-relaxed">
        {lines.map((l, i) => (
          <motion.div key={i} className="flex items-center gap-2" animate={{ opacity: [0.3, 1, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, times: [0, 0.1, 0.8, 1] }}>
            {l.prompt && <span className="text-[#8b5cf6]/40 select-none">$</span>}<span className={l.color || "text-white/35"}>{l.text}</span>
          </motion.div>
        ))}
        <motion.span className="inline-block h-3.5 w-[5px] bg-[#8b5cf6]/50" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      </div>
    </div>
  );
}

/* ═══ CARDS ═══ */

const rotatingWords = ["Hand", "Quelle", "Stelle", "Vision", "Strategie"];

function EverythingCard({ className }: { className?: string }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className={`relative ${className || ""}`} variants={cardVariants}>
      <div className="relative h-full rounded-2xl border-[0.75px] border-white/[0.04] p-2 md:rounded-3xl md:p-2.5">
        <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
        <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-[#111122] p-8 md:rounded-2xl">
          <div className="pointer-events-none absolute inset-0">
            <motion.div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/[0.07] blur-[60px]"
              animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} />
            <div className="absolute top-1/4 left-1/3 h-24 w-24 rounded-full bg-[#3b82f6]/[0.08] blur-[40px]" />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <h3 className="relative z-10 text-2xl md:text-3xl leading-[1.15] font-bold tracking-tight text-white/90 text-center">
            <span className="italic">Alles</span> aus<br />einer{" "}
            <span className="inline-block relative overflow-hidden align-bottom" style={{ minWidth: "5ch" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  className="inline-block bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent"
                  initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(8px)", y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({
  icon: Icon, title, description, children, accentColor = "#8b5cf6", className = "",
}: {
  icon: LucideIcon; title: string; description: string;
  children?: React.ReactNode; accentColor?: string; className?: string;
}) {
  const isWide = className.includes("col-span-2");
  const isTall = className.includes("row-span-2");
  return (
    <motion.div className={`relative ${className}`} variants={cardVariants}>
      <div className="relative h-full rounded-2xl border-[0.75px] border-white/[0.04] p-2 md:rounded-3xl md:p-2.5">
        <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
        <div className={`group relative flex h-full overflow-hidden rounded-xl border-[0.75px] border-white/[0.04] bg-[#12121e] shadow-sm md:rounded-2xl ${isWide ? "md:flex-row" : "flex-col"}`}>
          <div className={`relative z-10 p-6 ${isWide ? "flex flex-col justify-start md:w-[48%] md:shrink-0 pb-6" : isTall ? "pb-2" : "pb-3"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${accentColor}10`, border: `1px solid ${accentColor}15` }}>
                <Icon size={17} style={{ color: accentColor }} className="opacity-80" />
              </div>
              <h3 className="text-base font-semibold text-white leading-tight">{title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/50">{description}</p>
          </div>
          {children && isWide ? (
            <div className="relative z-10 flex flex-1 flex-col p-4 md:py-4 md:pr-4 md:pl-0">{children}</div>
          ) : children ? (
            <div className="relative z-10 flex flex-1 flex-col px-6 pb-5">{children}</div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══ MAIN — Tetris Bento Grid ═══ */
export default function Services() {
  return (
    <section id="leistungen" className="relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03),transparent_70%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <motion.div className="mb-20 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}>
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5">
            <div className="relative h-1.5 w-1.5"><div className="absolute inset-0 rounded-full bg-[#8b5cf6]" /><div className="absolute inset-0 animate-ping rounded-full bg-[#8b5cf6] opacity-75" /></div>
            <span className="text-[0.8rem] tracking-wide text-white/40">Services</span>
          </div>
          <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.1] tracking-[-0.03em]">
            Was wir für dich<br /><span className="bg-gradient-to-r from-white/90 via-white/60 to-white/40 bg-clip-text text-transparent">umsetzen</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/40">Von der ersten Idee bis zum laufenden System. Alles aus einer Hand, ohne Reibungsverluste.</p>
        </motion.div>

        {/*
          Tetris Bento Grid — md:grid-cols-3, row spans for puzzle fit
          Layout map (desktop):
          [Automation  ][Automation  ][App         ]
          [Branding    ][Everything  ][App         ] ← row-span-2
          [Webdesign   ][SEO         ][Shops       ]
          [Software    ][Software    ][AR/XR       ]
        */}
        <motion.div
          className="grid grid-cols-1 gap-3 md:grid-cols-3 md:auto-rows-[minmax(220px,auto)]"
          variants={containerVariants} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}>

          {/* Row 1-2 col 1-2: Automation */}
          <ServiceCard icon={Zap} title="KI & Automatisierung"
            description="Prozesse digitalisieren, Workflows automatisieren und 20+ Stunden pro Woche Ressourcen freisetzen."
            className="md:col-span-2" accentColor="#8b5cf6">
            <AutomationVisual />
          </ServiceCard>

          {/* Row 1-2 col 3: App spans 2 rows (big phone visual) */}
          <ServiceCard icon={Smartphone} title="App Entwicklung"
            description="Native und Cross-Platform Apps für iOS und Android."
            className="md:row-span-2" accentColor="#6366f1">
            <MobileVisual />
          </ServiceCard>

          {/* Row 2 col 1: Branding */}
          <ServiceCard icon={PenTool} title="Branding & Design"
            description="Markenidentität mit Wiedererkennungswert und strategischer Tiefe."
            accentColor="#f59e0b">
            <BrandVisual />
          </ServiceCard>

          {/* Row 2 col 2: Everything */}
          <EverythingCard />

          {/* Row 3: Webdesign + SEO + Shops (3x 1col) */}
          <ServiceCard icon={Layout} title="Webdesign"
            description="Conversion-optimierte Websites, die Besucher zu Kunden machen."
            accentColor="#3b82f6">
            <WebPreviewVisual />
          </ServiceCard>

          <ServiceCard icon={Search} title="SEO & Online Marketing"
            description="Organische Sichtbarkeit, Google Ads und Meta Ads für nachhaltiges Wachstum."
            accentColor="#10b981">
            <SeoVisual />
          </ServiceCard>

          <ServiceCard icon={ShoppingCart} title="Online Shops"
            description="Ansprechende E-Commerce-Lösungen für deinen Online-Handel."
            accentColor="#10b981">
            <ShopVisual />
          </ServiceCard>

          {/* Row 4: Software (2col) + AR/XR (1col) */}
          <ServiceCard icon={Code} title="Software Entwicklung"
            description="Individuelle Web-Applikationen und Backend-Systeme."
            className="md:col-span-2" accentColor="#06b6d4">
            <TerminalVisual />
          </ServiceCard>

          <ServiceCard icon={Glasses} title="AR / XR"
            description="Immersive Augmented und Extended Reality Erlebnisse."
            accentColor="#ec4899">
            <ArVisual />
          </ServiceCard>
        </motion.div>
      </div>
    </section>
  );
}
