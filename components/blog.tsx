"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const posts = [
  {
    title: "Warum maßgeschneiderte Software Ihr Unternehmen transformiert",
    description:
      "In einer zunehmend digitalisierten Welt ist individuelle Software kein Luxus, sondern ein entscheidender Faktor für nachhaltigen Unternehmenserfolg.",
    date: "17. März 2026",
    image: "/blog/software.png",
    slug: "warum-massgeschneiderte-software-ihr-unternehmen-transformiert",
    tag: "Software",
  },
  {
    title: "5 Fehler bei der Digitalisierung von KMU vermeiden",
    description:
      "Die häufigsten Stolperfallen bei der digitalen Transformation kleiner und mittelständischer Unternehmen, und wie du sie umgehst.",
    date: "17. März 2026",
    image: "/blog/digitalisierung.png",
    slug: "5-fehler-bei-der-digitalisierung-von-kmu-vermeiden",
    tag: "Digitalisierung",
  },
  {
    title: "App-Entwicklung 2026: Trends & Technologien",
    description:
      "Welche Trends und Technologien die mobile App-Entwicklung 2026 prägen und wie dein Unternehmen davon profitieren kann.",
    date: "17. März 2026",
    image: "/blog/app-entwicklung.png",
    slug: "app-entwicklung-2026-trends-technologien-fuer-ihr-unternehmen",
    tag: "App Development",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Blog() {
  return (
    <section id="blog" className="relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5">
            <div className="relative h-1.5 w-1.5">
              <div className="absolute inset-0 rounded-full bg-[#8b5cf6]" />
              <div className="absolute inset-0 animate-ping rounded-full bg-[#8b5cf6] opacity-75" />
            </div>
            <span className="text-[0.8rem] tracking-wide text-white/40">
              Blog
            </span>
          </div>
          <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.1] tracking-[-0.03em]">
            Insights &{" "}
            <span className="bg-gradient-to-r from-white/90 via-white/60 to-white/40 bg-clip-text text-transparent">
              Wissen
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/40">
            Aktuelle Artikel rund um Digitalisierung, Entwicklung und
            Technologie.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 gap-3 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {posts.map((post, i) => (
            <motion.article key={post.slug} variants={cardVariants} className="relative min-h-[280px] md:min-h-0">
              <div className="relative h-full rounded-2xl border-[0.75px] border-white/[0.04] p-2 md:rounded-3xl md:p-2.5">
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="group relative h-full flex flex-col overflow-hidden rounded-xl border-[0.75px] border-white/[0.04] bg-[#12121e] shadow-sm md:rounded-2xl">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121e] via-transparent to-transparent" />

                    {/* Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full bg-white/[0.08] text-white/60 backdrop-blur-sm border border-white/[0.06]">
                        {post.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={12} className="text-white/25" />
                      <span className="text-[11px] text-white/25">
                        {post.date}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-semibold text-white leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-white/35 leading-relaxed line-clamp-2 mb-5 flex-1">
                      {post.description}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-[0.8rem] text-white/25 transition-all duration-500 group-hover:gap-3 group-hover:text-white/50">
                      <span>Weiterlesen</span>
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-500 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
