"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "Abgeschlossene Projekte" },
  { value: 5.0, suffix: "", label: "Google Bewertung", decimals: 1 },
  { value: 100, suffix: "%", label: "Kundentreue" },
  { value: 99.98, suffix: "%", label: "Uptime Garantie", decimals: 2 },
];

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
  animate,
}: {
  value: number;
  suffix: string;
  decimals?: number;
  animate: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const duration = 2500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [animate, value]);

  return (
    <span className="tabular-nums">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Top Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/20 to-transparent mb-16 origin-center"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-3">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  animate={inView}
                />
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: 40 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="h-0.5 bg-[#8b5cf6]/30 mx-auto mb-3"
              />
              <span className="text-sm text-white/40">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/20 to-transparent mt-16 origin-center"
        />
      </div>
    </section>
  );
}
