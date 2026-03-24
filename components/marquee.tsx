"use client";

const keywords = [
  "SOFTWARE",
  "WEBDESIGN",
  "APP ENTWICKLUNG",
  "AUTOMATISIERUNG",
  "SEO & GEO",
  "BRANDING",
  "AR / XR",
  "ONLINE SHOPS",
  "KI-AGENTEN",
  "STRATEGIE",
];

export default function Marquee() {
  return (
    <section className="relative py-8 border-y border-white/[0.05] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...keywords, ...keywords].map((word, i) => (
          <span key={i} className="flex items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/[0.06] mx-4 sm:mx-6 md:mx-8 lg:mx-10 select-none">
              {word}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6]/25 shrink-0" />
          </span>
        ))}
      </div>
    </section>
  );
}
