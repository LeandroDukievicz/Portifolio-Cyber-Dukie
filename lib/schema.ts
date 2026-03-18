export function buildPageSchema({
  type,
  name,
  description,
  url,
}: {
  type: string
  name: string
  description: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "name": name,
    "description": description,
    "url": url,
    "author": {
      "@type": "Person",
      "name": "Leandro Dukiévicz",
      "url": "https://devleandro.com.br",
    },
    "inLanguage": "pt-BR",
  }
}
