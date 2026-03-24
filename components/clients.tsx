"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  { name: "Rockstroh GmbH", logo: "/clients/rockstroh.png" },
  { name: "SevenD", logo: "/clients/sevend.png" },
  { name: "Kaufmann Heizungsbau", logo: "/clients/kaufmann.png" },
  { name: "Dynaamiq", logo: "/clients/dynaamiq.png" },
  { name: "Tinka GmbH", logo: "/clients/tinka.png" },
  { name: "TD Design", logo: "/clients/td.png" },
  { name: "Zum Lobmüller", logo: "/clients/lobmueller.webp" },
];

export default function Clients() {
  // Duplicate for seamless infinite scroll
  const allLogos = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="relative py-12 md:py-16">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-xs sm:text-sm text-white/25 mb-8 md:mb-10 px-5"
      >
        Vertrauen von 20+ Unternehmen aus Handwerk, Gastro, Tech & Dienstleistung
      </motion.p>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos */}
        <div
          className="flex items-center gap-12 sm:gap-16 md:gap-20 whitespace-nowrap"
          style={{
            animation: "marquee 40s linear infinite",
            width: "max-content",
          }}
        >
          {allLogos.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="shrink-0 flex items-center justify-center h-8 md:h-10 opacity-30 hover:opacity-60 transition-opacity duration-500 grayscale hover:grayscale-0"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={40}
                className="h-full w-auto object-contain max-w-[100px] sm:max-w-[120px] md:max-w-[140px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
