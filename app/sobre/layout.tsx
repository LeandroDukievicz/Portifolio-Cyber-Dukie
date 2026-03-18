import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça Leandro Dukiévicz: desenvolvedor Front-End em Maringá-PR, especializado em React e Next.js, com experiência em interfaces escaláveis e APIs robustas.",
  alternates: { canonical: "https://leandrodukievicz.com/sobre" },
  openGraph: {
    title: "Sobre | Leandro Dukiévicz",
    description: "Conheça Leandro Dukiévicz: desenvolvedor Front-End em Maringá-PR, especializado em React e Next.js.",
    url: "https://leandrodukievicz.com/sobre",
  },
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
