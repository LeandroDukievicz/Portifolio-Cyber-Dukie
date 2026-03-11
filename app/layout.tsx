import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Dock from "./components/Dock";
import MarqueeTitle from "./components/MarqueeTitle";
import MenuBar from "./components/MenuBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#03111F] w-full h-full`}
        suppressHydrationWarning
      >
        <MenuBar />
        {children}
        <Dock />
        <MarqueeTitle />
      </body>
    </html>
  );
}
