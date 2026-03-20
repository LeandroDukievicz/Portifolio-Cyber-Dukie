import type { Metadata } from "next";

export const revalidate = 3600; // 1 hora (blog muda mais frequentemente)

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog de Leandro Dukiévicz sobre desenvolvimento web, React, Next.js, TypeScript, performance e boas práticas de engenharia de software.",
  alternates: { canonical: "https://devleandro.com.br/blog" },
  openGraph: {
    title: "Blog | Leandro Dukiévicz",
    description: "Artigos sobre desenvolvimento web, React, Next.js, TypeScript, performance e boas práticas de engenharia.",
    url: "https://devleandro.com.br/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
