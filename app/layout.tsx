import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Dock from "./components/Dock";
import MarqueeTitle from "./components/MarqueeTitle";
import MenuBar from "./components/MenuBar";
import VisitorGreeting from "./components/VisitorGreeting";
import TerminalWindow from "./components/TerminalWindow";
import { TerminalProvider } from "./context/TerminalContext";
import { LanguageProvider } from "./context/LanguageContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Portfólio - Leandro Dukiévicz",
  description: "Portifólio de projetos pessoais e profissionais - Leandro Dukiévicz - Desenvolvedor Front-end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${roboto.variable} antialiased bg-[#03111F] w-full h-full`}
        style={{ fontFamily: "var(--font-roboto), sans-serif" }}
        suppressHydrationWarning
      >
        <LanguageProvider>
        <TerminalProvider>
          <MenuBar />
          <VisitorGreeting />
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
