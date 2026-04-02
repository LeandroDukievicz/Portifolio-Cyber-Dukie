# Portfólio — Leandro Dukievicz

Portfólio pessoal com estética cyberpunk, animações fluidas e interatividade avançada. Desenvolvido com Next.js 15, TypeScript e Tailwind CSS v4.

Acesse em: [devleandro.com.br](https://devleandro.com.br)

---

## Rotas / Páginas do Projeto

**Home** — Hero com foto hexagonal (parallax + glitch), terminal macOS interativo, animações de entrada em stagger e CTAs para contato/currículo.

**Sobre** — Janela macOS com bio, timeline de trajetória e foto holográfica.

**Skills** — Hard skills em grid com animação stagger, soft skills com flip cards 3D e modal de princípios.

**Projetos** — Carousel CoverFlow 3D com screenshots, links e cards "Em Breve". Suporta scroll, swipe e drag.

**Contato** — Janela macOS com links e formulário integrado ao Formspree + confetti no envio.

**Blog** — ScrambleText animado, formulário de inscrição integrado ao Notion via API route com validação robusta (rate limiting, honeypot, MX record, domínios descartáveis) e notificação por email via Resend.

**FAQ** — Accordion interativo com perguntas e respostas sobre o desenvolvedor.

**404** — Página customizada com o visual cyberpunk do restante do site.

---

## Funcionalidades globais

- **i18n PT/EN** — todo o conteúdo do site é traduzível via `LanguageContext`
- **Terminal macOS** — drag, resize livre (8 handles), minimizar/maximizar, comandos de navegação (`home`, `sobre`, `skills`, `projetos`, `contato`, `blog`, `cv`, `sudo hire-me`, `help`, `clear`...)
- **Loading Screen** — exibida apenas na primeira visita (espiral girassol + typewriter + barra de progresso)
- **SEO completo** — metadata, OpenGraph, Twitter Card, JSON-LD (Person, Organization, FAQPage, ProfilePage, WebPage por rota), canonical
- **Segurança** — headers HSTS, CSP, X-Frame-Options, X-Content-Type-Options via `next.config.ts`
- **Acessibilidade (WCAG 2.1 AA)** — skip link, focus-visible, prefers-reduced-motion, ARIA landmarks, aria-live, navegação por teclado
- **Analytics** — Vercel Analytics + Speed Insights
- **Responsivo** — 320px a 1920px+, dock vertical em mobile, terminal oculto em telas pequenas

---

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP** — magnification da dock
- **Framer Motion** — ScrambleText, AnimatePresence
- **@notionhq/client** — integração com Notion (assinantes do blog)
- **Resend** — email de notificação por novo assinante
- **Formspree** — backend do formulário de contato
- **validator.js** — validação de email RFC-compliant
- **canvas-confetti** — efeitos de confetti
- **react-icons** — ícones da UI
- **Vercel Analytics + Speed Insights**

---

## Como rodar localmente

**Pré-requisitos:** Node.js 18+ e npm

```bash
git clone https://github.com/LeandroDukievicz/Portifolio-Cyber-Dukie.git
cd Portifolio-Cyber-Dukie
npm install
cp .env.example .env.local
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).


## Autor

**Leandro Dukievicz** — Desenvolvedor Front-End

## Licença

Uso pessoal. Todos os direitos reservados.
