import type { Metadata } from "next";

export const revalidate = 604800; // 7 dias

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça Leandro Dukiévicz: desenvolvedor Front-End em Maringá-PR, especializado em React e Next.js, com experiência em interfaces escaláveis e APIs robustas.",
  alternates: { canonical: "https://devleandro.com.br/sobre" },
  openGraph: {
    title: "Sobre | Leandro Dukiévicz",
    description: "Conheça Leandro Dukiévicz: desenvolvedor Front-End em Maringá-PR, especializado em React e Next.js.",
    url: "https://devleandro.com.br/sobre",
  },
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
