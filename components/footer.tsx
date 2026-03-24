import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  "Software Entwicklung",
  "App Entwicklung",
  "Webdesign",
  "Online Shops",
  "Branding & Design",
  "SEO & Marketing",
  "KI & Automatisierung",
  "AR / XR",
];

const company = [
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Projekte", href: "#projekte" },
  { label: "Prozess", href: "#prozess" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

const legal = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.05] pt-16 pb-32 lg:pb-16 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="/logo.png"
              alt="PANDADEV"
              width={140}
              height={32}
              className="h-7 w-auto mb-4"
            />
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              Full-Service Digital Partner. Strategie, Design, Automatisierung
              und Entwicklung aus einer Hand. Made in Germany.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/padevde"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#8b5cf6] hover:border-[#8b5cf6]/20 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/p-a-development"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#8b5cf6] hover:border-[#8b5cf6]/20 transition-all"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Leistungen
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#leistungen"
                    className="text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Unternehmen
            </h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Rechtliches
            </h4>
            <ul className="space-y-2.5">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">
                Kontakt
              </h4>
              <div className="space-y-1.5">
                <a
                  href="mailto:info@pandadev.de"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors block"
                >
                  info@pandadev.de
                </a>
                <a
                  href="tel:+4915679297000"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors block"
                >
                  +49 15679 297000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {year} P&A Development GmbH. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-white/20">
            Mit Leidenschaft gestaltet in Heilbronn.
          </p>
        </div>
      </div>
    </footer>
  );
}
