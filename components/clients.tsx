"use client";

import Image from "next/image";
import { FadeIn } from "./fade-in";

const clients = [
  { name: "Rockstroh", logo: "/clients/rockstroh.png" },
  { name: "SevenD", logo: "/clients/sevend.png" },
  { name: "Kaufmann", logo: "/clients/kaufmann.png" },
  { name: "Dynaamiq", logo: "/clients/dynaamiq.png" },
  { name: "Tinka", logo: "/clients/tinka.png" },
  { name: "TD", logo: "/clients/td.png" },
  { name: "Lobmüller", logo: "/clients/lobmueller.webp" },
];

export default function Clients() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="section-label mb-12 text-center">
            Vertrauen von 20+ Unternehmen aus Handwerk, Gastro, Tech &amp; Dienstleistung
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
            {clients.map((client) => (
              <div
                key={client.name}
                className="relative h-8 w-24 opacity-40 grayscale transition-all duration-500 hover:opacity-80 hover:grayscale-0 sm:w-28"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain brightness-0 invert"
                  sizes="112px"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
