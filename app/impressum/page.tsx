import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-[#050505] px-5 md:px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm text-[#8b5cf6] hover:text-[#a78bfa] transition-colors mb-8 inline-block"
        >
          &larr; Zurück zur Startseite
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Impressum
        </h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/60">
          <section>
            <h2 className="text-lg font-semibold text-white">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              P&A Development GmbH
              <br />
              Schloßstraße 8
              <br />
              74388 Talheim
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Vertreten durch
            </h2>
            <p>
              Geschäftsführer: Aaron Hermann, Philipp Stapf
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Kontakt</h2>
            <p>
              Telefon: +49 15679 297000
              <br />
              E-Mail: info@pandadev.de
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Handelsregister
            </h2>
            <p>
              HRB 802054 · Amtsgericht Stuttgart
              <br />
              USt-IdNr.: DE457959329
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Aaron Hermann
              <br />
              Schloßstraße 8
              <br />
              74388 Talheim
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit oder
              verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
