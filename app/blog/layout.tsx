import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog de Leandro Dukiévicz sobre desenvolvimento web, React, Next.js, TypeScript, performance e boas práticas de engenharia de software.",
  alternates: { canonical: "https://leandrodukievicz.com/blog" },
  openGraph: {
    title: "Blog | Leandro Dukiévicz",
    description: "Artigos sobre desenvolvimento web, React, Next.js, TypeScript, performance e boas práticas de engenharia.",
    url: "https://leandrodukievicz.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
