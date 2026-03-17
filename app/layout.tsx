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

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Leandro Dukiévicz",
  description: "Portifólio de projetos pessoais e profissionais - Leandro Dukiévicz - Desenvolvedor Front-end",
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
        </TerminalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
