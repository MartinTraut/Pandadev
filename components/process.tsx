"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  MessageSquare,
  Lightbulb,
  Pen,
  Rocket,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps = [
  {
    number: "01", title: "Erstgespräch", subtitle: "Kennenlernen",
    icon: MessageSquare, accent: "#8b5cf6",
    description: "In einem kostenlosen 30-minütigen Gespräch lernen wir dich und deine Ziele kennen. Wir hören zu, stellen die richtigen Fragen und entwickeln ein erstes Verständnis.",
    visual: "cards" as const, visualData: ["30 min. Gespräch", "Ziele definieren", "100% kostenlos"],
    checks: ["Kostenlos & unverbindlich", "Ziele & Wünsche verstehen", "Transparentes Angebot"],
  },
  {
    number: "02", title: "Konzept & Strategie", subtitle: "Analyse",
    icon: Lightbulb, accent: "#6366f1",
    description: "Wir analysieren dein Marktumfeld, definieren die Zielgruppe und entwickeln eine maßgeschneiderte digitale Strategie, bevor eine Zeile Code geschrieben wird.",
    visual: "bars" as const, visualData: [{ label: "Marktanalyse", value: 90 }, { label: "Zielgruppenforschung", value: 85 }, { label: "Strategieentwicklung", value: 95 }],
    checks: ["Datenbasierte Analyse", "Klare Meilensteine", "Messbare KPIs"],
  },
  {
    number: "03", title: "Design & Umsetzung", subtitle: "Kreation",
    icon: Pen, accent: "#3b82f6",
    description: "Unser Team bringt die Strategie zum Leben. Pixel-perfektes Design, sauberer Code, regelmäßige Feedback-Runden, bis alles sitzt.",
    visual: "flow" as const, visualData: ["Entwurf", "Feedback", "Revision", "Final"],
    checks: ["Iteratives Design", "Regelmäßige Updates", "Deine Freigabe zählt"],
  },
  {
    number: "04", title: "Launch & Support", subtitle: "Go-Live",
    icon: Rocket, accent: "#10b981",
    description: "Wir launchen dein Projekt, überwachen die Performance und stehen dir langfristig als Partner zur Seite. Dein Erfolg ist unser Antrieb.",
    visual: "live" as const, visualData: ["Dein Projekt ist live!"],
    checks: ["Performance-Monitoring", "Langfristiger Support", "Kontinuierliche Optimierung"],
  },
];

const N = steps.length;
// Steps happen in the first 75% of scroll, last 25% is buffer for step 4
const SCROLL_END = 0.75;
const iconScrollPositions = steps.map((_, i) => (i / (N - 1)) * SCROLL_END);
// How much scroll distance the crossfade between two steps takes.
// 0.12 = 12% of total scroll = ~60vh of scrolling to complete the transition
const FADE = 0.12;

/* ═══════════════════════════════════════════ */
function StepVisual({ step }: { step: (typeof steps)[0] }) {
  if (step.visual === "cards") {
    return (
      <div className="grid grid-cols-3 gap-3">
        {(step.visualData as string[]).map((t) => (
          <div key={t} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <span className="text-xs text-white/50">{t}</span>
          </div>
        ))}
      </div>
    );
  }
  if (step.visual === "bars") {
    return (
      <div className="space-y-4">
        {(step.visualData as { label: string; value: number }[]).map((b) => (
          <div key={b.label}>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/40">{b.label}</span>
              <span style={{ color: step.accent }} className="tabular-nums font-medium">{b.value}%</span>
            </div>
            <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${b.value}%`, background: step.accent }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (step.visual === "flow") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {(step.visualData as string[]).map((t, i) => (
          <div key={t} className="flex items-center gap-2">
            <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/50">{t}</div>
            {i < (step.visualData as string[]).length - 1 && <span style={{ color: `${step.accent}50` }} className="text-xs">→</span>}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
      </span>
      <span className="text-sm text-emerald-400 font-medium">{(step.visualData as string[])[0]}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Scroll-driven card — opacity bound to same
   scroll positions as icons. Zero timing offset.
   ═══════════════════════════════════════════ */
function ScrollCard({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof steps)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const Icon = step.icon;
  const isFirst = index === 0;
  const isLast = index === N - 1;
  const [isActive, setIsActive] = useState(isFirst);

  const pos = iconScrollPositions[index];
  const nextPos = isLast ? SCROLL_END + 0.1 : iconScrollPositions[index + 1];

  // Long crossfade zones — user scrolls through the blur transition
  const fadeIn = pos;           // starts becoming visible here
  const fadeInEnd = pos + FADE; // fully sharp here
  const fadeOut = nextPos - FADE; // starts getting blurry here
  const fadeOutEnd = nextPos;     // fully invisible here

  const cardOpacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, fadeOut, fadeOutEnd]
      : isLast
        ? [fadeIn - FADE, fadeIn, SCROLL_END + 0.5]
        : [fadeIn - FADE, fadeIn, fadeOut, fadeOutEnd],
    isFirst
      ? [1, 1, 0]
      : isLast
        ? [0, 1, 1]
        : [0, 1, 1, 0]
  );

  const blur = useTransform(
    scrollYProgress,
    isFirst
      ? [0, fadeOut, fadeOutEnd]
      : isLast
        ? [fadeIn - FADE, fadeIn, SCROLL_END + 0.5]
        : [fadeIn - FADE, fadeIn, fadeOut, fadeOutEnd],
    isFirst
      ? [0, 0, 12]
      : isLast
        ? [12, 0, 0]
        : [12, 0, 0, 12]
  );

  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  // Trigger internal animations midway through the fade-in
  const activateAt = isFirst ? 0 : pos - FADE * 0.3;
  const deactivateAt = isLast ? SCROLL_END + 1 : nextPos - FADE * 0.3;
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const shouldBeActive = v >= activateAt && v < deactivateAt;
      if (shouldBeActive && !isActive) setIsActive(true);
      if (!shouldBeActive && isActive) setIsActive(false);
    });
    return unsub;
  }, [scrollYProgress, activateAt, deactivateAt, isActive]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-7 md:p-8 overflow-hidden"
      style={{ opacity: cardOpacity, filter: filterBlur, zIndex: index }}
    >
      <span className="absolute top-4 right-6 text-8xl md:text-9xl font-bold text-white/[0.02] pointer-events-none select-none leading-none">{step.number}</span>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={isActive ? { scale: 1, rotate: 0 } : { scale: 0.85, rotate: -10 }}
            transition={{ duration: 0.5, ease }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: `${step.accent}15`, border: `1px solid ${step.accent}25` }}
          >
            <Icon size={22} style={{ color: step.accent }} />
          </motion.div>
          <div>
            <motion.span
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.4, ease }}
              className="text-[10px] uppercase tracking-[0.15em] font-semibold block" style={{ color: step.accent }}
            >{step.subtitle}</motion.span>
            <h3 className="text-xl md:text-2xl font-bold text-white">{step.title}</h3>
          </div>
        </div>

        {/* Accent line */}
        <motion.div
          animate={isActive ? { width: 48 } : { width: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease }}
          className="h-[2px] rounded-full mt-4 mb-5" style={{ background: step.accent }}
        />

        {/* Description */}
        <motion.p
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease }}
          className="text-sm md:text-[15px] text-white/45 leading-relaxed mb-7 max-w-xl"
        >{step.description}</motion.p>

        {/* Visual */}
        <motion.div
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="mb-7"
        ><StepVisual step={step} /></motion.div>

        {/* Checks */}
        <div className="space-y-2.5">
          {step.checks.map((c, ci) => (
            <motion.div key={c}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ delay: isActive ? 0.12 + ci * 0.04 : 0, duration: 0.4, ease }}
              className="flex items-center gap-3 text-sm text-white/40">
              <Check size={14} className="shrink-0" style={{ color: step.accent }} />{c}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Timeline icon — smooth reveal when beam arrives
   ═══════════════════════════════════════════ */
function TimelineIcon({
  icon: Icon, accent, index, scrollYProgress, label, title,
}: {
  icon: LucideIcon; accent: string; index: number;
  scrollYProgress: MotionValue<number>; label: string; title: string;
}) {
  const pos = iconScrollPositions[index];
  // Icon sharpens over the same FADE distance as the card
  const visibility = useTransform(
    scrollYProgress,
    [Math.max(0, pos - FADE), pos],
    [0, 1]
  );

  return (
    <motion.div
      className="relative flex items-center gap-5 z-10"
      style={{
        opacity: visibility,
        filter: useTransform(visibility, [0, 0.5, 1], ["blur(6px)", "blur(2px)", "blur(0px)"]),
      }}
    >
      <div className="relative">
        <div className="absolute -inset-3 rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent}35, transparent 70%)`,
            boxShadow: `0 0 25px ${accent}40, 0 0 50px ${accent}12`,
          }} />
        <div className="relative w-11 h-11 rounded-full flex items-center justify-center border-2"
          style={{
            background: accent, borderColor: accent,
            boxShadow: `0 0 18px ${accent}55, 0 0 35px ${accent}20, inset 0 0 8px ${accent}15`,
          }}>
          <Icon size={18} className="text-white" style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.4))" }} />
        </div>
      </div>
      <div className="text-left min-w-[120px]">
        <span className="text-[10px] uppercase tracking-[0.15em] font-semibold block" style={{ color: accent }}>STEP {label}</span>
        <span className="text-[13px] font-semibold block leading-tight mt-0.5 text-white">{title}</span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════ */
export default function Process() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const beamHeight = useTransform(scrollYProgress, [0, SCROLL_END], ["0%", "100%"]);

  // Card switches at the exact same scroll position as icon reveal
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      let next = 0;
      for (let i = N - 1; i >= 0; i--) {
        if (v >= iconScrollPositions[i]) { next = i; break; }
      }
      if (next !== prevRef.current) {
        prevRef.current = next;
        setActiveIndex(next);
      }
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section id="prozess" className="relative">
      <div className="px-5 md:px-6 pt-20 md:pt-32 pb-8 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5">
            <div className="relative h-1.5 w-1.5">
              <div className="absolute inset-0 rounded-full bg-[#8b5cf6]" />
              <div className="absolute inset-0 animate-ping rounded-full bg-[#8b5cf6] opacity-75" />
            </div>
            <span className="text-[0.8rem] tracking-wide text-white/40">Prozess</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] text-white mb-4">
            Von der Idee zum{" "}
            <span className="bg-gradient-to-r from-white/90 via-white/60 to-white/40 bg-clip-text text-transparent">Ergebnis.</span>
          </h2>
          <p className="text-base text-white/35 leading-relaxed">
            Unser bewährter 4-Schritte-Prozess sorgt für Klarheit, Qualität und Ergebnisse.
          </p>
        </motion.div>
      </div>

      {/* Scroll runway */}
      <div ref={scrollRef} className="relative" style={{ height: `${(N + 1) * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center">
          <div className="w-full max-w-6xl mx-auto px-5 md:px-6">
            <div className="flex gap-8 lg:gap-16 h-[min(520px,70vh)]">

              {/* Timeline (md+) */}
              <div className="hidden md:block shrink-0 relative w-[180px] lg:w-[200px] h-full">
                <div className="absolute left-[21px] w-[3px] rounded-full" style={{ top: 22, height: 3 * (44 + 64) }}>
                  <motion.div
                    className="absolute top-0 left-0 w-full rounded-full origin-top"
                    style={{
                      height: beamHeight,
                      maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                    }}
                  >
                    <div className="absolute -inset-x-[5px] inset-y-0 rounded-full blur-[6px]"
                      style={{ background: "linear-gradient(to bottom, #8b5cf640, #6366f130, #3b82f625, #10b98120)" }} />
                    <div className="h-full w-full rounded-full relative z-10"
                      style={{
                        background: "linear-gradient(to bottom, #8b5cf6 0%, #8b5cf6 18%, #6366f1 33%, #6366f1 48%, #3b82f6 65%, #3b82f6 78%, #10b981 100%)",
                      }} />
                  </motion.div>
                </div>
                <div className="absolute top-0 left-0 z-20">
                  {steps.map((step, i) => (
                    <div key={step.number} className="absolute left-0" style={{ top: i * (44 + 64) }}>
                      <TimelineIcon icon={step.icon} accent={step.accent}
                        index={i} scrollYProgress={scrollYProgress} label={step.number} title={step.title} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card area */}
              <div className="flex-1 min-w-0 relative h-full">
                {/* Mobile progress */}
                <div className="md:hidden absolute -top-10 left-0 right-0 flex items-center gap-3 z-10">
                  <div className="flex-1 flex gap-1.5">
                    {steps.map((s, i) => (
                      <div key={i} className="h-1 flex-1 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500 ease-out"
                          style={{ width: i <= activeIndex ? "100%" : "0%", background: s.accent }} />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-white/25 tabular-nums shrink-0">{activeIndex + 1}/{N}</span>
                </div>

                {steps.map((step, i) => (
                  <ScrollCard key={step.number} step={step} index={i} scrollYProgress={scrollYProgress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
