import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PANDADEV — Full-Service Digital Partner",
  description:
    "Strategie, Design, Automatisierung und Entwicklung aus einer Hand. PANDADEV ist dein strategischer Internet-Partner für digitales Wachstum.",
  keywords: [
    "Webdesign",
    "Automatisierung",
    "App Entwicklung",
    "Software Entwicklung",
    "SEO",
    "Branding",
    "Digital Agentur",
  ],
  openGraph: {
    title: "PANDADEV — Full-Service Digital Partner",
    description:
      "Strategie, Design, Automatisierung und Entwicklung aus einer Hand.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
