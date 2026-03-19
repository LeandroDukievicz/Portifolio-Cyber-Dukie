import type { Metadata } from "next";

export const revalidate = 604800; // 7 dias

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos de desenvolvimento web de Leandro Dukiévicz: e-commerce front-end, landing pages institucionais e aplicações React/Next.js. Veja o código no GitHub.",
  alternates: { canonical: "https://leandrodukievicz.com/projetos" },
  openGraph: {
    title: "Projetos | Leandro Dukiévicz",
    description: "Projetos de desenvolvimento web: e-commerce, landing pages institucionais e aplicações React/Next.js.",
    url: "https://leandrodukievicz.com/projetos",
  },
};

export default function ProjetosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
