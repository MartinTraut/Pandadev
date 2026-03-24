"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const testimonials = [
  {
    name: "Alexander Herrling",
    role: "Geschäftsführer",
    company: "Rockstroh GmbH",
    initial: "A",
    quote:
      "Wir haben mit Aaron Hermann und Phillip Stapf zwei sehr kreative Köpfe gefunden, die unsere komplexen Anwendungen nach kurzer Zeit zu unserer vollsten Zufriedenheit umgesetzt haben.",
    stars: 5,
  },
  {
    name: "Inge Hermann",
    role: "Inhaberin",
    company: "Fotostudio Inge Hermann",
    initial: "I",
    quote:
      "Super Leistung, meine Wünsche wurden alle sehr kreativ und professionell umgesetzt. Preis und Leistung unschlagbar, kann ich nur weiterempfehlen.",
    stars: 5,
  },
  {
    name: "Herr Kaufmann",
    role: "Inhaber",
    company: "Kaufmann Heizungsbau",
    initial: "K",
    quote:
      "Tolles Team, exzellente Ergebnisse! Die Website wurde genau nach meinen Wünschen entwickelt. Die Zusammenarbeit war professionell und unkompliziert.",
    stars: 5,
  },
  {
    name: "Sina",
    role: "Inhaberin",
    company: "Monaco Beauty",
    initial: "S",
    quote:
      "Ich habe meine Website bei den Jungs machen lassen und bin mehr als zufrieden. Modern, schnell und genau so, wie ich es mir vorgestellt habe.",
    stars: 5,
  },
  {
    name: "Projektleiter",
    role: "Projektleitung",
    company: "The Good Miles",
    initial: "T",
    quote:
      "Ich kann nur Positives über die Zusammenarbeit mit Aaron und Philipp sagen. Beide sind super motiviert, liefern schnell und zuverlässig ab.",
    stars: 5,
  },
  {
    name: "Restaurant Manager",
    role: "Geschäftsleitung",
    company: "Zum Lobmüller",
    initial: "L",
    quote:
      "P&A Development hat eine Zeiterfassungs-App speziell für unser Restaurant entwickelt, und ich bin absolut begeistert. Perfekt auf unsere Bedürfnisse zugeschnitten.",
    stars: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      className="relative"
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
        <div className="group relative h-full flex flex-col overflow-hidden rounded-xl border-[0.75px] border-white/[0.04] bg-[#0d0d14] p-6 md:rounded-2xl">
          {/* Hover glow */}
          <div
            className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background:
                "radial-gradient(600px circle at 50% 0%, rgba(139,92,246,0.06), transparent 60%)",
            }}
          />

          {/* Quote watermark — animated rotation */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ rotate: 0, opacity: 0 }}
            whileInView={{ rotate: [0, -8, 0], opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
          >
            <Quote size={36} className="text-[#8b5cf6]/10" />
          </motion.div>

          {/* Stars with cascade pop */}
          <div className="flex gap-1 mb-5 relative z-10">
            {Array.from({ length: t.stars }).map((_, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 12,
                  delay: 0.5 + index * 0.08 + si * 0.06,
                }}
              >
                <Star size={14} className="fill-[#facc15] text-[#facc15]" />
              </motion.div>
            ))}
          </div>

          {/* Quote text with typewriter-ish reveal */}
          <motion.p
            className="text-sm text-white/50 leading-relaxed mb-6 relative z-10 flex-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 + index * 0.08 }}
          >
            <span className="text-white/20">&ldquo;</span>
            {t.quote}
            <span className="text-white/20">&rdquo;</span>
          </motion.p>

          {/* Divider line — draws in */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 + index * 0.08 }}
            className="h-px bg-gradient-to-r from-[#8b5cf6]/10 via-[#8b5cf6]/20 to-[#8b5cf6]/10 mb-5 origin-left"
          />

          {/* Author — slides in from left */}
          <motion.div
            className="flex items-center gap-3 relative z-10"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.8 + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-sm font-bold text-[#8b5cf6] shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {t.initial}
            </motion.div>
            <div>
              <div className="text-sm font-semibold text-white">
                {t.name}
              </div>
              <div className="text-xs text-white/35">
                {t.role}, {t.company}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="bewertungen"
      ref={sectionRef}
      className="relative py-20 md:py-32 px-5 md:px-6 overflow-hidden"
    >
      {/* Parallax ambient glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-center max-w-2xl mx-auto"
        >
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5">
            <div className="relative h-1.5 w-1.5">
              <div className="absolute inset-0 rounded-full bg-[#8b5cf6]" />
              <div className="absolute inset-0 animate-ping rounded-full bg-[#8b5cf6] opacity-75" />
            </div>
            <span className="text-[0.8rem] tracking-wide text-white/40">
              Kundenstimmen
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] text-white mb-4">
            Ergebnisse statt leere{" "}
            <span className="bg-gradient-to-r from-white/90 via-white/60 to-white/40 bg-clip-text text-transparent">
              Versprechen.
            </span>
          </h2>
        </motion.div>

        {/* Animated aggregate rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 12,
                  delay: 0.4 + i * 0.08,
                }}
              >
                <Star size={18} className="fill-[#facc15] text-[#facc15]" />
              </motion.div>
            ))}
          </div>
          <span className="text-lg font-bold text-white">5.0</span>
          <span className="text-sm text-white/30">auf Google</span>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.company} t={t} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
