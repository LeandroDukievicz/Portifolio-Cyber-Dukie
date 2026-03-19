import type { Metadata } from "next";

export const revalidate = 604800; // 7 dias

export const metadata: Metadata = {
  title: "Skills",
  description: "Hard skills e soft skills de Leandro Dukiévicz: React, Next.js, TypeScript, Node.js, PostgreSQL, Tailwind CSS, Git e muito mais. Veja os princípios de engenharia que guiam meu trabalho.",
  alternates: { canonical: "https://leandrodukievicz.com/skills" },
  openGraph: {
    title: "Skills | Leandro Dukiévicz",
    description: "Hard skills e soft skills: React, Next.js, TypeScript, Node.js, PostgreSQL, Tailwind CSS e mais.",
    url: "https://leandrodukievicz.com/skills",
  },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
