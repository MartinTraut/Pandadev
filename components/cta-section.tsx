"use client";

import { FadeIn } from "./fade-in";
import { ArrowRight, Send } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, type FormEvent } from "react";

const AnimatedShaderBackground = dynamic(
  () => import("@/components/ui/animated-shader-background"),
  { ssr: false }
);

const budgetOptions = [
  "Unter 3.000 €",
  "3.000 – 5.000 €",
  "5.000 – 10.000 €",
  "10.000 – 25.000 €",
  "Über 25.000 €",
  "Noch unklar",
];

const serviceOptions = [
  "Website / Webdesign",
  "App Entwicklung",
  "Software / Web-App",
  "Automatisierung",
  "SEO / GEO",
  "Branding",
  "Beratung / Strategie",
];

const inputClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#8b5cf6]/40 focus:bg-white/[0.05]";
const labelClass = "mb-2 block text-sm font-medium text-white/60";

export default function CtaSection() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      services: selectedServices,
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      message: formData.get("message"),
    };
    console.log("Form submission:", data);
    setSubmitted(true);
  }

  return (
    <section id="kontakt" className="relative overflow-hidden py-28 md:py-36">
      {/* Aurora shader background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AnimatedShaderBackground className="h-full w-full" />
      </div>

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0b0b0f]/50" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <h2 className="section-heading text-4xl tracking-[-0.03em] md:text-5xl lg:text-6xl">
              Kostenloses Strategiegespräch
            </h2>
            <p className="section-body md:text-xl">
              In 30 Minuten analysieren wir dein Projekt und zeigen dir konkret,
              wie wir dein Wachstum beschleunigen. Kostenlos und unverbindlich.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          {submitted ? (
            <div className="mx-auto max-w-lg rounded-2xl border border-[#8b5cf6]/20 bg-[#13131d]/80 p-10 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#8b5cf6]/10">
                <Send size={24} className="text-[#8b5cf6]" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">
                Anfrage erhalten!
              </h3>
              <p className="text-[#94a3b8]">
                Wir melden uns innerhalb von 24 Stunden bei dir. Bis gleich!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-2xl rounded-2xl border border-white/[0.06] bg-[#13131d]/80 p-8 md:p-10"
            >
              {/* Name + Email */}
              <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Max Mustermann"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    E-Mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="max@beispiel.de"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Company */}
              <div className="mb-5">
                <label htmlFor="company" className={labelClass}>
                  Unternehmen
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Firmenname (optional)"
                  className={inputClass}
                />
              </div>

              {/* Services */}
              <div className="mb-5">
                <label className={labelClass}>
                  Welche Services interessieren dich? *
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          isSelected
                            ? "border-[#8b5cf6]/40 bg-[#8b5cf6]/15 text-[#a78bfa]"
                            : "border-white/[0.06] bg-white/[0.03] text-white/40 hover:border-white/[0.12] hover:text-white/60"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget + Timeline */}
              <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="budget" className={labelClass}>
                    Budget-Rahmen
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-[#13131d]">
                      Bitte wählen
                    </option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#13131d]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className={labelClass}>
                    Gewünschter Zeitrahmen
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-[#13131d]">
                      Bitte wählen
                    </option>
                    <option value="Sofort / ASAP" className="bg-[#13131d]">
                      Sofort / ASAP
                    </option>
                    <option value="In 1-2 Wochen" className="bg-[#13131d]">
                      In 1–2 Wochen
                    </option>
                    <option value="In 1-3 Monaten" className="bg-[#13131d]">
                      In 1–3 Monaten
                    </option>
                    <option value="Kein Zeitdruck" className="bg-[#13131d]">
                      Kein Zeitdruck
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label htmlFor="message" className={labelClass}>
                  Erzähl uns kurz von deinem Projekt *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Was ist dein Ziel? Welche Herausforderungen hast du aktuell?"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#8b5cf6] px-8 py-4 font-medium text-white transition-all hover:bg-[#7c3aed] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              >
                Strategiegespräch anfragen
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <p className="mt-4 text-center text-xs text-white/20">
                100% kostenlos & unverbindlich — Antwort innerhalb von 24h
              </p>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
