"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import Image from "next/image";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isDesktopRef = useRef(false);

  const initParticles = useCallback((width: number, height: number) => {
    const count = isDesktopRef.current ? 60 : 25;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.05,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      isDesktopRef.current = window.innerWidth >= 1024;
      initParticles(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();
      }

      if (isDesktopRef.current) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles]);

  return <canvas ref={canvasRef} className={className} />;
}

const stats = [
  { value: 50, suffix: "+", label: "Projekte", decimals: 0 },
  { value: 5.0, suffix: "", label: "Google Rating", decimals: 1 },
  { value: 100, suffix: "%", label: "Kundentreue", decimals: 0 },
  { value: 4217, suffix: "+", label: "Tassen Kaffee", decimals: 0, isCoffee: true },
];

function AnimatedNumber({
  value,
  suffix,
  decimals,
  trigger,
  delay,
}: {
  value: number;
  suffix: string;
  decimals: number;
  trigger: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [trigger, delay]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, value]);

  return (
    <span className="tabular-nums">
      {started ? display.toFixed(decimals) : (0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

function LiveCoffeeNumber({ initial, suffix, trigger, delay }: { initial: number; suffix: string; trigger: boolean; delay: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [trigger, delay]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * initial));
      if (progress < 1) requestAnimationFrame(tick);
      else setLive(true);
    };
    requestAnimationFrame(tick);
  }, [started, initial]);

  useEffect(() => {
    if (!live) return;
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [live]);

  return (
    <span className="tabular-nums">
      {started ? count.toLocaleString("de-DE") : "0"}
      {suffix}
    </span>
  );
}

function HeroStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-xs mx-auto sm:max-w-none sm:grid-cols-4 md:mx-0 md:gap-x-10">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 1.1 + i * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center md:text-left"
        >
          <div className="text-2xl md:text-2xl font-bold text-white">
            {(stat as any).isCoffee ? (
              <LiveCoffeeNumber initial={stat.value} suffix={stat.suffix} trigger={inView} delay={1.1 + i * 0.15} />
            ) : (
              <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                trigger={inView}
                delay={1.1 + i * 0.15}
              />
            )}
          </div>
          <div className="w-8 h-[2px] bg-[#8b5cf6]/40 mt-2 mb-1.5 rounded-full mx-auto md:mx-0" />
          <div className="text-xs text-white/60">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <ParticleField className="absolute inset-0 opacity-60" />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 pt-24 md:pt-28 lg:pt-20 pb-16 md:pb-28 w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div style={{ y: contentY }} className="text-center md:text-left">

            <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] font-bold leading-[0.95] tracking-[-0.03em] mb-7">
              <motion.span
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white"
              >
                Dein digitaler
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block gradient-text"
              >
                Wachstums
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white"
              >
                partner.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-white/40 leading-relaxed max-w-lg mx-auto md:mx-0 mb-10 text-center md:text-left"
            >
              Wir vereinen Strategie, Design und Technologie, damit dein
              Unternehmen online nicht nur sichtbar wird, sondern wächst.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center md:items-start gap-3 mb-10 md:mb-14"
            >
              <a
                href="#kontakt"
                className="group inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-semibold text-white bg-[#8b5cf6] rounded-xl hover:bg-[#7c3aed] transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              >
                Projekt starten
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-semibold text-white/50 border border-white/[0.08] rounded-xl hover:bg-white/[0.03] hover:text-white/70 hover:border-white/[0.12] transition-all duration-300"
              >
                Kostenloses Erstgespräch
              </a>
            </motion.div>

            <HeroStats />
          </motion.div>

          {/* Team Image */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.06]">
              <Image
                src="/hero-team.png"
                alt="Aaron Hermann und Philipp Stapf, Gründer von P&A Development"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 via-transparent to-transparent" />

              {/* Glow behind image */}
              <div
                className="absolute -inset-4 -z-10 rounded-3xl blur-3xl opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(139,92,246,0.4), transparent 70%)",
                }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -left-6 bottom-20 glass-strong rounded-xl px-4 py-3 shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm font-medium text-white/80">
                  Full-Service Partner
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute -right-4 top-16 glass-strong rounded-xl px-4 py-3 shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#8b5cf6]">5.0</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className="fill-[#facc15] text-[#facc15]" />
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-white/35 mt-0.5 block">Google Bewertung</span>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
          Entdecken
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
