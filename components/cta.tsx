"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AnimatedShaderBackground = dynamic(
  () => import("@/components/ui/animated-shader-background"),
  { ssr: false }
);

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+49 15679 297000",
    href: "tel:+4915679297000",
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: "info@pandadev.de",
    href: "mailto:info@pandadev.de",
  },
  {
    icon: MapPin,
    label: "Standort",
    value: "Schloßstraße 8, 74388 Talheim",
    href: null,
  },
  {
    icon: Clock,
    label: "Antwortzeit",
    value: "Innerhalb von 2 Stunden",
    href: null,
  },
];

const serviceOptions = [
  "Website / Webdesign",
  "App Entwicklung",
  "Software / Web-App",
  "Online Shop",
  "Automatisierung",
  "SEO / Online Marketing",
  "Branding / Design",
  "AR / XR",
  "Beratung / Strategie",
];

export default function Cta() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="relative py-20 md:py-32 px-5 md:px-6 overflow-hidden">
      {/* Aurora shader background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <AnimatedShaderBackground className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#050505]/50" />
      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-widest text-[#8b5cf6] mb-4 block">
              Kontakt
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] text-white mb-4">
              Lass uns dein{" "}
              <span className="gradient-text">nächstes Projekt</span> starten.
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-0.5 bg-gradient-to-r from-[#8b5cf6] to-transparent mb-6"
            />
            <p className="text-lg text-white/50 leading-relaxed mb-10">
              In 30 Minuten analysieren wir dein Projekt und zeigen dir konkret,
              wie wir dein Wachstum beschleunigen. Kostenlos und unverbindlich.
            </p>

            <div className="space-y-5">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href ? "a" : "div";
                return (
                  <Wrapper
                    key={item.label}
                    {...(item.href ? { href: item.href } : {})}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-[#8b5cf6]" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40 mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-8 flex flex-col items-center justify-center text-center min-h-[300px] md:min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                  <Check size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Anfrage erhalten!
                </h3>
                <p className="text-white/50 max-w-sm">
                  Wir melden uns innerhalb von 24 Stunden bei dir. Freue dich
                  auf ein produktives Gespräch.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 space-y-5"
              >
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/40 mb-2 block">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dein Name"
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/20 focus:border-[#8b5cf6]/50 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-2 block">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="deine@email.de"
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/20 focus:border-[#8b5cf6]/50 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="text-xs text-white/40 mb-2 block">
                    Unternehmen
                  </label>
                  <input
                    type="text"
                    placeholder="Dein Unternehmen (optional)"
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/20 focus:border-[#8b5cf6]/50 focus:outline-none transition-colors text-sm"
                  />
                </div>

                {/* Services */}
                <div>
                  <label className="text-xs text-white/40 mb-3 block">
                    Leistung
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          selectedServices.includes(service)
                            ? "bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30"
                            : "bg-white/[0.05] text-white/40 border border-white/[0.08] hover:text-white/60"
                        )}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs text-white/40 mb-2 block">
                    Nachricht *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Erzähl uns von deinem Projekt..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/20 focus:border-[#8b5cf6]/50 focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full h-14 flex items-center justify-center gap-2 rounded-xl bg-[#8b5cf6] text-white font-semibold hover:bg-[#7c3aed] transition-colors text-sm"
                >
                  Nachricht senden
                  <ArrowRight size={18} />
                </button>

                <p className="text-xs text-white/30 text-center">
                  Wir melden uns innerhalb von 24 Stunden bei dir.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
