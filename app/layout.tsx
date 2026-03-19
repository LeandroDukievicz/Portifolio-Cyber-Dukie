import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Dock from "./components/Dock";
import MarqueeTitle from "./components/MarqueeTitle";
import MenuBar from "./components/MenuBar";
import TerminalWindow from "./components/TerminalWindow";
import LoadingScreen from "./components/LoadingScreen";
import { TerminalProvider } from "./context/TerminalContext";
import { LanguageProvider } from "./context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const BASE_URL = "https://devleandro.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Leandro Dukiévicz — Desenvolvedor Front-End",
    template: "%s | Leandro Dukiévicz",
  },
  description: "Portfólio de Leandro Dukiévicz, desenvolvedor Front-End especializado em React, Next.js e TypeScript. Interfaces modernas, performáticas e acessíveis.",
  keywords: ["desenvolvedor front-end", "React", "Next.js", "TypeScript", "portfólio", "Maringá", "Paraná", "Brasil"],
  authors: [{ name: "Leandro Dukiévicz", url: BASE_URL }],
  creator: "Leandro Dukiévicz",
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Leandro Dukiévicz — Desenvolvedor Front-End",
    description: "Portfólio de Leandro Dukiévicz, desenvolvedor Front-End especializado em React, Next.js e TypeScript.",
    siteName: "Portfólio Leandro Dukiévicz",
    images: [{ url: "/images/foto-1.webp", width: 476, height: 476, alt: "Leandro Dukiévicz — Desenvolvedor Front-End" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leandro Dukiévicz — Desenvolvedor Front-End",
    description: "Portfólio de Leandro Dukiévicz, desenvolvedor Front-End especializado em React, Next.js e TypeScript.",
    images: ["/images/foto-1.webp"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Leandro Dukiévicz",
  url: BASE_URL,
  logo: `${BASE_URL}/images/foto-1.webp`,
  sameAs: [
    "https://github.com/LeandroDukievicz",
    "https://linkedin.com/in/leandrodukievicz",
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leandro Dukiévicz",
  url: BASE_URL,
  image: `${BASE_URL}/images/foto-1.webp`,
  jobTitle: "Desenvolvedor Full Stack",
  description: "Desenvolvedor Full Stack especializado em React, Next.js e TypeScript, com foco em interfaces modernas, performáticas e acessíveis.",
  sameAs: [
    "https://github.com/LeandroDukievicz",
    "https://linkedin.com/in/leandrodukievicz",
  ],
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Maringá",
    addressRegion: "PR",
    addressCountry: "BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        {/* Script bloqueante: esconde o body antes de qualquer pintura se for primeira visita */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(!localStorage.getItem('portfolio-loaded')){document.documentElement.classList.add('fl')}}catch(e){}` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body
        className={`${roboto.variable} antialiased bg-[#03111F] w-full h-full pl-[54px] md:pl-0`}
        style={{ fontFamily: "var(--font-roboto), sans-serif" }}
        suppressHydrationWarning
      >
        <LanguageProvider>
        <TerminalProvider>
          <LoadingScreen />
          <MenuBar />
{children}
          <TerminalWindow />
          <Dock />
          <MarqueeTitle />
          <Analytics />
          <SpeedInsights />
        </TerminalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
