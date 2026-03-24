"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "Was kostet ein Projekt bei P&A Development?",
    answer:
      "Jedes Projekt ist individuell — genau wie deine Anforderungen. Nach einem kostenlosen Erstgespräch erstellen wir dir ein transparentes Angebot ohne versteckte Kosten. Kleine Websites starten im niedrigen vierstelligen Bereich, individuelle Software-Projekte werden nach Aufwand kalkuliert.",
  },
  {
    question: "Wie lange dauert ein Projekt?",
    answer:
      "Das hängt vom Umfang ab. Eine moderne Website realisieren wir in 2–4 Wochen. Komplexere Projekte wie individuelle Software oder Apps dauern je nach Anforderungen mehrere Monate. Im Erstgespräch geben wir dir eine realistische Timeline.",
  },
  {
    question: "Welche Leistungen bietet ihr an?",
    answer:
      "Wir sind ein Full-Service Digital Partner: Software Entwicklung, App Entwicklung, Webdesign, Online Shops, Branding & Grafik-Design, Online Marketing (SEO, GEO, Ads), KI-Automatisierung und AR/XR Entwicklung — alles aus einer Hand.",
  },
  {
    question: "Bietet ihr Support nach dem Launch?",
    answer:
      "Selbstverständlich. Wir bieten langfristige Wartung, regelmäßige Updates und kontinuierlichen Support. Dein Projekt ist nach dem Launch nicht vergessen — wir optimieren und entwickeln weiter.",
  },
  {
    question: "Könnt ihr bestehende Projekte übernehmen oder erweitern?",
    answer:
      "Ja, wir übernehmen und modernisieren bestehende Anwendungen. Ob neue Features, Performance-Optimierung oder die Integration von KI — wir analysieren den Ist-Zustand und entwickeln einen klaren Plan.",
  },
  {
    question: "Wie starte ich ein Projekt mit euch?",
    answer:
      "Ganz einfach: Nutze unser Kontaktformular oder ruf uns direkt an. In einem kostenlosen 30-minütigen Erstgespräch besprechen wir deine Ideen, Ziele und Anforderungen — unverbindlich und ehrlich.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof faqItems)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div variants={itemVariants}>
      <motion.div
        layout
        className={cn(
          "relative rounded-2xl border-[0.75px] transition-colors duration-500 overflow-hidden",
          isOpen
            ? "bg-white/[0.03] border-[#8b5cf6]/15"
            : "bg-white/[0.015] border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.025]"
        )}
      >
        {/* Open glow */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 0%, rgba(139,92,246,0.04), transparent 60%)",
              }}
            />
          )}
        </AnimatePresence>

        <button
          onClick={onToggle}
          className="relative z-10 w-full flex items-center gap-5 px-6 md:px-7 py-5 md:py-6 text-left"
        >
          {/* Number */}
          <span
            className={cn(
              "text-xs font-mono tabular-nums transition-colors duration-300 shrink-0",
              isOpen ? "text-[#8b5cf6]" : "text-white/20"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Question */}
          <span
            className={cn(
              "flex-1 text-[15px] md:text-base font-medium transition-colors duration-300 pr-4",
              isOpen ? "text-white" : "text-white/60"
            )}
          >
            {item.question}
          </span>

          {/* Animated plus/cross icon */}
          <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className={cn(
                "transition-colors duration-300",
                isOpen ? "text-[#8b5cf6]" : "text-white/30"
              )}
            >
              <Plus size={18} strokeWidth={1.5} />
            </motion.div>
          </div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: {
                  duration: 0.3,
                  delay: 0.1,
                },
              }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-7 pb-6 pl-[4.25rem] md:pl-[4.75rem]">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-px bg-gradient-to-r from-[#8b5cf6]/15 to-transparent mb-4 origin-left"
                />
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-sm text-white/40 leading-[1.75]"
                >
                  {item.answer}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-20 md:py-32 px-5 md:px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5">
            <div className="relative h-1.5 w-1.5">
              <div className="absolute inset-0 rounded-full bg-[#8b5cf6]" />
              <div className="absolute inset-0 animate-ping rounded-full bg-[#8b5cf6] opacity-75" />
            </div>
            <span className="text-[0.8rem] tracking-wide text-white/40">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] text-white mb-4">
            Du fragst.{" "}
            <span className="bg-gradient-to-r from-white/90 via-white/60 to-white/40 bg-clip-text text-transparent">
              Wir antworten.
            </span>
          </h2>
          <p className="text-base text-white/30 mt-4 max-w-lg mx-auto">
            Die wichtigsten Fragen auf einen Blick — transparent und ehrlich.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
