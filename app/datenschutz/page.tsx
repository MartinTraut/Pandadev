import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function Datenschutz() {
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
          Datenschutzerklärung
        </h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/60">
          <section>
            <h2 className="text-lg font-semibold text-white">
              1. Datenschutz auf einen Blick
            </h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit deinen personenbezogenen Daten passiert, wenn du diese
              Website besuchst. Personenbezogene Daten sind alle Daten, mit
              denen du persönlich identifiziert werden kannst.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              2. Verantwortliche Stelle
            </h2>
            <p>
              P&A Development GmbH
              <br />
              Schloßstraße 8
              <br />
              74388 Talheim
              <br />
              E-Mail: info@pandadev.de
              <br />
              Telefon: +49 15679 297000
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              3. Datenerfassung auf dieser Website
            </h2>
            <h3 className="text-base font-medium text-white/80">
              Kontaktformular
            </h3>
            <p>
              Wenn du uns per Kontaktformular Anfragen zukommen lässt, werden
              deine Angaben aus dem Formular inklusive der von dir dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
              geben wir nicht ohne deine Einwilligung weiter.
            </p>

            <h3 className="text-base font-medium text-white/80">
              Server-Log-Dateien
            </h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in Server-Log-Dateien, die dein Browser automatisch
              an uns übermittelt. Dies sind: Browsertyp und -version,
              verwendetes Betriebssystem, Referrer URL, Hostname des
              zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              4. Hosting
            </h2>
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet
              (Vercel Inc.). Die personenbezogenen Daten, die auf dieser
              Website erfasst werden, werden auf den Servern des Hosters
              gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              5. Deine Rechte
            </h2>
            <p>
              Du hast jederzeit das Recht, unentgeltlich Auskunft über
              Herkunft, Empfänger und Zweck deiner gespeicherten
              personenbezogenen Daten zu erhalten. Du hast außerdem das Recht,
              die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu
              sowie zu weiteren Fragen zum Thema Datenschutz kannst du dich
              jederzeit an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">
              6. Analyse-Tools und Werbung
            </h2>
            <p>
              Diese Website verwendet derzeit keine Analyse-Tools oder
              Tracking-Cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
