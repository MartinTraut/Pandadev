import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

const services = [
  "Automatisierungen",
  "Webdesign",
  "Logo & Branding",
  "SEO & GEO",
  "App Entwicklung",
  "Software Entwicklung",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0b0b0f] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo.png"
              alt="PANDADEV"
              width={160}
              height={36}
              className="h-8 w-auto"
            />
            <p className="card-body mt-4 max-w-sm">
              Full-Service Digital Partner. Strategie, Design, Automatisierung
              und Entwicklung aus einer Hand. Zukunftssichere Lösungen,
              benutzerzentriert und Made in Germany.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.instagram.com/pandadevelopment"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-[#94a3b8] transition-colors hover:bg-white/[0.08] hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/p-a-development"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-[#94a3b8] transition-colors hover:bg-white/[0.08] hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-[#94a3b8] transition-colors hover:text-white"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Kontakt</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:info@pandadev.de"
                  className="flex items-center gap-2 text-sm text-[#94a3b8] transition-colors hover:text-white"
                >
                  <Mail size={14} />
                  info@pandadev.de
                </a>
              </li>
              <li>
                <a
                  href="tel:+4915679297000"
                  className="flex items-center gap-2 text-sm text-[#94a3b8] transition-colors hover:text-white"
                >
                  <Phone size={14} />
                  +49 15679 297000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-[#64748b] md:flex-row">
          <span>
            &copy; {new Date().getFullYear()} P&A Development Hermann und Stapf
            GbR
          </span>
          <div className="flex gap-6">
            <a href="/impressum" className="transition-colors hover:text-white">
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="transition-colors hover:text-white"
            >
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
