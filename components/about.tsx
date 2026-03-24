"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const values = [
  "Strategie vor Design",
  "Persönlich statt anonym",
  "Qualität ohne Kompromisse",
  "Langfristige Partnerschaften",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ueber-uns" className="relative py-20 md:py-32 px-5 md:px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/2] lg:aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/team.png"
                alt="Aaron Hermann und Philipp Stapf, Gründer von P&A Development"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent" />

              {/* Badge */}
              <div className="absolute bottom-4 right-4 glass-strong rounded-xl px-4 py-3">
                <span className="text-sm font-semibold text-white">
                  Gegründet 2024
                </span>
              </div>
            </div>

            {/* Corner decoration (desktop only) */}
            <div className="hidden lg:block absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-dashed border-[#8b5cf6]/20 rounded-tl-xl" />
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="text-xs uppercase tracking-widest text-[#8b5cf6] mb-4 block">
                Über uns
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] text-white mb-6">
                Jung, ambitioniert und <span className="gradient-text">Made in Germany.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                Wir sind Aaron und Philipp, zwei Entwickler und Designer aus
                der Region Heilbronn, die sich nicht damit zufriedengeben, nur
                hübsche Websites zu bauen. Wir wollen Ergebnisse sehen.
              </p>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                Als Full-Service Digital Partner begleiten wir Unternehmen von
                der Strategie über Design und Entwicklung bis zur
                Automatisierung. Ein Ansprechpartner, kein Stille-Post-Effekt
                zwischen fünf Dienstleistern.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {values.map((value, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={18}
                    className="text-[#8b5cf6] shrink-0"
                  />
                  <span className="text-sm font-medium text-white/70">
                    {value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
