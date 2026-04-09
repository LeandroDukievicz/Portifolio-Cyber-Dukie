import { withAeo } from "aeo.js/next";

const securityHeaders = [
  // Ativa prefetch de DNS para links externos
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Força HTTPS por 2 anos (HSTS)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Bloqueia o site de ser embutido em iframes de outros domínios (anti-clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Impede o browser de "adivinhar" o tipo de conteúdo (MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Envia apenas origem no Referer (sem path/query)
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desativa câmera, microfone e geolocalização
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // 'unsafe-inline' necessário para scripts inline do Next.js e dangerouslySetInnerHTML
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      // 'unsafe-inline' necessário para estilos inline do Next.js/Tailwind
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://formspree.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io",
    ].join("; "),
  },
];

export default withAeo({
  turbopack: {
    root: __dirname,
  },
  aeo: {
    title: "Portfólio - Leandro Dukiévicz",
    description: "Portifólio de projetos pessoais e profissionais - Leandro Dukiévicz - Desenvolvedor Full Stack",
    url: "https://devleandro.com.br",
  },
  async headers() {
    return [
      // Security headers em todas as rotas
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Assets do Next.js: cache de 1 ano imutável (hash no nome do arquivo)
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Imagens públicas: cache de 1 dia, revalidação silenciosa em 7 dias
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      // PDF do currículo: cache de 1 dia
      {
        source: "/(.*).pdf",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
      // Cache para páginas HTML — 5 min browser, 1h CDN
      { source: "/", headers: [{ key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" }] },
      { source: "/sobre", headers: [{ key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" }] },
      { source: "/skills", headers: [{ key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" }] },
      { source: "/projetos", headers: [{ key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" }] },
      { source: "/contato", headers: [{ key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" }] },
    ];
  },
});
