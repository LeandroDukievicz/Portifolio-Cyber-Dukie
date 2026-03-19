import type { Metadata } from "next";

export const revalidate = 604800; // 7 dias

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com Leandro Dukiévicz para propostas de projeto, contratação PJ ou freelance. Disponível via WhatsApp, Telegram, LinkedIn, GitHub e e-mail.",
  alternates: { canonical: "https://leandrodukievicz.com/contato" },
  openGraph: {
    title: "Contato | Leandro Dukiévicz",
    description: "Entre em contato para propostas de projeto, contratação PJ ou freelance. Disponível via WhatsApp, LinkedIn e e-mail.",
    url: "https://leandrodukievicz.com/contato",
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
