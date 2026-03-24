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
  title: {
    template: "%s | P&A Development",
    default: "P&A Development — Full-Service Digital Partner aus Heilbronn",
  },
  description:
    "Strategie, Design, Automatisierung und Entwicklung aus einer Hand. P&A Development ist dein strategischer Partner für digitales Wachstum in der Region Heilbronn.",
  keywords: [
    "Webdesign Heilbronn",
    "App Entwicklung",
    "Software Entwicklung",
    "Automatisierung",
    "SEO",
    "Branding",
    "Digital Agentur Heilbronn",
    "P&A Development",
    "PANDADEV",
  ],
  openGraph: {
    title: "P&A Development — Full-Service Digital Partner",
    description:
      "Strategie, Design, Automatisierung und Entwicklung aus einer Hand.",
    type: "website",
    locale: "de_DE",
    url: "https://www.pandadev.de",
    siteName: "P&A Development",
  },
  twitter: {
    card: "summary_large_image",
    title: "P&A Development — Full-Service Digital Partner",
    description:
      "Strategie, Design, Automatisierung und Entwicklung aus einer Hand.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.pandadev.de",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "P&A Development GmbH",
  alternateName: "PANDADEV",
  url: "https://www.pandadev.de",
  telephone: "+4915679297000",
  email: "info@pandadev.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Schloßstraße 8",
    addressLocality: "Talheim",
    postalCode: "74388",
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.0833,
    longitude: 9.1833,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 49.14, longitude: 9.22 },
    geoRadius: "50000",
  },
  sameAs: [
    "https://www.instagram.com/padevde",
    "https://www.linkedin.com/company/p-a-development",
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "20",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
