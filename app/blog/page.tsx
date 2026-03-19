import LiquidGlassBlog from "./LiquidGlassBlog";
import { buildPageSchema } from "@/lib/schema";

export const revalidate = 3600; // 1 hora (blog muda mais frequentemente)

export default function BlogPage() {
  const schema = buildPageSchema({
    type: "WebPage",
    name: "Blog — Leandro Dukiévicz",
    description: "Blog de Leandro Dukiévicz com artigos sobre desenvolvimento web, React, Next.js, TypeScript, performance e boas práticas de engenharia de software.",
    url: "https://devleandro.com.br/blog",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LiquidGlassBlog />
    </>
  );
}
