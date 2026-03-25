# Portfólio — Leandro Dukievicz

> Portfólio pessoal desenvolvido com estética cyberpunk, interatividade avançada e animações fluidas.

---

## Visão Geral

Opa blz ?  eu construí isso aqui para apresentar projetos, habilidades e informações profissionais de forma imersiva. A interface combina elementos visuais cyberpunk com componentes interativos inspirados no macOS com dock animada, terminal funcional e parallax na foto de perfil.

---

### Validação de Email (Frontend + Backend)

**Frontend (`LiquidGlassBlog.tsx`):**
- Regex RFC 5322 simplificada via `isValidEmailFormat()` de `lib/emailValidation.ts`
- Erro inline exibido abaixo do input em tempo real
- Limpa o erro automaticamente ao começar a redigitar

**Backend (`app/api/subscribe/route.ts`) — camadas em ordem:**

| Camada | Biblioteca/Técnica | O que rejeita |
|---|---|---|
| Rate limiting | `Map` em memória | Máx 5 req/min por IP — retorna `429` |
| Honeypot | Campo `website` | Bots que preenchem campos ocultos |
| Formato básico | Regex RFC 5322 | Emails malformados |
| Validação RFC | `validator.js` `isEmail()` | Emails que passam no regex mas violam a RFC |
| Domínio descartável | Lista em `lib/emailValidation.ts` | 40+ domínios temporários (mailinator, guerrilla, yopmail…) |
| MX Record | `dns/promises.resolveMx()` | Domínios sem servidor de email real; rejeita null MX (RFC 7505) |
| Duplicata | Notion `databases.query` | Email já cadastrado — retorna `409 Conflict` |

### Sistema de Toasts

Três tipos de toast, todos posicionados `top: 100px, right: 50px`:

| Situação | Tipo | Cor de borda | Mensagem |
|---|---|---|---|
| Email inválido/incompleto | `error` | `#FF2D78` (pink) | "Que Pena :-( Preencha Novamente!" |
| Email já cadastrado | `warning` | `rgba(255,200,0,0.5)` (gold) | "Este e-mail já está registrado!" |
| Cadastro bem-sucedido | `success` | `#00EAFF` (cyan) | "Obrigado pela inscrição! 🚀 Aguarde novidades em breve." |

### Integração com Notion — API Route `/api/subscribe`

API route server-side que persiste o email no database **"assinantes do blog"** no Notion:

- adiciona uma nova linha  com as propriedades:
  - **`Email`** (Title) — endereço informado
  - **`Data de cadastro`** (Date) — timestamp ISO da requisição
- Verifica duplicata antes de inserir (`databases.query`) — retorna `409` se já existir
- Credenciais via variáveis de ambiente (nunca expostas ao cliente)

### Notificação por Email — Resend

Após cada cadastro bem-sucedido, envia um email de notificação via **Resend** (implementado com `fetch` nativo — sem SDK):

- **De**: `Blog Dukie <onboarding@resend.dev>`
- **Para**: `leandrodukievicz1718@gmail.com`
- **Assunto**: "🔔 Novo assinante no blog!"
- Falhas no envio são logadas mas **não bloqueiam** o fluxo — o cadastro no Notion já foi salvo

### Variáveis de Ambiente

NOTION_TOKEN=...
NOTION_BLOG_SUBSCRIBERS_DB=...
RESEND_API_KEY=...

### Terminal macOS

- **Boot sequence animada** com auto-typing ao abrir (re-executa ao trocar de idioma)
- **Drag & drop** — arrastar pela title bar
- **Resize livre** — handles em todos os 8 lados e cantos (N, S, E, W, NE, NW, SE, SW) com cursor direcional e glow ciano no hover
- **Minimizar / Maximizar** via botões amarelo e verde da title bar
- **Botão vermelho** fecha o terminal
- **Posicionamento automático**: centralizado no gap entre o bloco de texto e a foto hexagonal usando `data-home-left` e `data-home-right` como marcadores — recalculado ao abrir
- **Auto-abre** sempre que o usuário navega para `/` (home)
- **Auto-fecha** com animação macOS (shrink + fade, `scale(0.05)` em 280ms) ao navegar para outras rotas
- Em outras páginas, o terminal só abre ao clicar no ícone do dock
- **Invisível em mobile** (`useIsMobile` — retorna `null` se `< 768px`)
- Tamanho padrão: 557px × 340px; maximizado: 860px × 620px; resize livre sobrepõe o tamanho fixo

**Comandos disponíveis:**

| Comando | Ação |
|---|---|
| `home` | Página inicial |
| `sobre` / `about` | Página sobre mim |
| `skills` | Minhas habilidades |
| `projetos` / `projects` | Meus projetos |
| `contato` / `contact` | Entrar em contato |
| `blog` | Meu blog |
| `cv` | Baixar currículo |
| `arquitetura` | Exibe a stack do portfólio |
| `sudo hire-me` | 🎉 Confetti + download + modal |
| `hacker` | Tema hacker *(em breve)* |
| `clear` | Limpar terminal |
| `exit` / `sair` / `quit` | Fechar terminal |
| `help` | Listar todos os comandos |

### Internacionalização (i18n) PT / EN

Ao clicar no ícone de idioma no MenuBar, **todo o site muda de idioma**:

| Elemento | Traduzido |
|---|---|
| Hero (subtítulo, bio, CTAs) | ✅ |
| Terminal (boot, help, outputs, modal, toast) | ✅ |
| Dock (labels dos ícones) | ✅ |
| MenuBar (título do portfólio via `portfolioTitle`) | ✅ |
| Página Sobre (bio, timeline, badges, scroll, windowTitle) | ✅ |
| Página Skills (hard skills, soft skills, princípios, windowTitle) | ✅ |
| Página Projetos (títulos, descrições, CTAs, Em Breve) | ✅ |
| Página Contato (heading, subheading, contactsLabel, windowTitle) | ✅ |
| Toast mobile da home (inline via `lang`) | ✅ |

> Nota: a tagline da home ("Desenvolvedor focado em performance...") está **hardcoded em PT** e não é traduzida.

### Favicon e Título da Aba

- **Título estático**: "Leandro Dukiévicz" — definido client-side pelo `MarqueeTitle` via `document.title` (sobrepõe o metadata do servidor)
- **Favicon rotativo**: 3 ícones SVG ciclando a cada 800ms via `setInterval` (VscCode, CgCoffee, VscCoffee, TfiInfinite) — injetados dinamicamente no `<link rel="icon">`

### SEO / AEO

Configurado via Next.js `Metadata` API — sem tags manuais no HTML:

| Campo | Valor |
|---|---|
| `title` | "Leandro Dukiévicz — Desenvolvedor Front-End" |
| `description` | Descrição otimizada para buscadores |
| `keywords` | React, Next.js, TypeScript, Maringá, Paraná... |
| `canonical` | `https://devleandro.com.br` |
| `robots` | `index: true, follow: true` |
| `openGraph` | title, description, image (`foto-1.webp`), type, siteName |
| `twitter:card` | `summary_large_image` |

**Metadata por página** — cada rota tem seu próprio `layout.tsx` (server component) exportando `metadata`:

| Rota | `title` | `description` |
|---|---|---|
| `/` (home) | Leandro Dukiévicz — Desenvolvedor Front-End | Bio geral |
| `/sobre` | Sobre Mim | Sobre, trajetória, tecnologias |
| `/skills` | Skills | Hard skills e soft skills |
| `/projetos` | Projetos | Portfolio de projetos |
| `/blog` | Blog | Blog em desenvolvimento |
| `/contato` | Contato | Disponibilidade e formas de contato |
| `/faq` | FAQ | Perguntas frequentes sobre o desenvolvedor |

**JSON-LD Schemas:**

| Schema | Localização | Conteúdo |
|---|---|---|
| `Organization` | `layout.tsx` (global) | nome, URL, logo (`foto-1.webp`), sameAs |
| `Person` | `layout.tsx` (global) | nome, URL, jobTitle, sameAs, knowsAbout, endereço |
| `ProfilePage` | `page.tsx` (home) | tipo, nome, URL via `buildPageSchema` |
| `FAQPage` | `page.tsx` (home) | 5 perguntas frequentes sobre o desenvolvedor |
| `WebPage` | cada `layout.tsx` por rota | título e descrição da página |

### Segurança e Cache (`next.config.ts`)

**Headers de segurança** aplicados globalmente via `withAeo()`:

| Header | Valor |
|---|---|
| `X-DNS-Prefetch-Control` | `on` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation desabilitados |
| `Content-Security-Policy` | policy restritiva com allowlist de domínios confiáveis |

**Headers de cache:**

| Rota | Cache | Revalidação |
|---|---|---|
| `/_next/static/*` | 1 ano immutable | — |
| `/images/*` | 1 dia | stale-while-revalidate 7 dias |
| `/*.pdf` | 1 dia | — |

### Página FAQ

`app/faq/page.tsx` — perguntas e respostas frequentes sobre o desenvolvedor:
- Accordion interativo com `IoChevronDownOutline` / `IoChevronUpOutline`
- Suporte a i18n PT/EN via `useLanguage` (perguntas e respostas traduzidas)
- Fundo `CyberpunkBackground` — consistência visual com o restante do site
- Perguntas disponíveis:
  - Quem é Leandro e o que ele faz?
  - Qual é o stack deste portfólio?
  - Leandro está disponível para novos projetos?
  - Como posso entrar em contato?
  - Como baixar o currículo?
  - Você trabalha sozinho ou em equipe?

### Página 404 Customizada

`app/not-found.tsx` — exibida automaticamente pelo Next.js em qualquer rota inexistente:
- Fundo `CyberpunkBackground` — consistência visual com o restante do site
- "404" em gradiente neon `#00EAFF → #BD00FF → #FF2D78`
- Link de retorno para a home

### Analytics

- **Vercel Analytics** — rastreamento de pageviews e eventos via `<Analytics />`
- **Vercel Speed Insights** — monitoramento de performance (Core Web Vitals) via `<SpeedInsights />`
- Ambos injetados no `layout.tsx` sem impacto no bundle do cliente

### Otimização de Imagens

Todas as imagens do projeto estão no formato `.webp` para melhor performance de carregamento:
- Conversão realizada com a lib **sharp** (Node.js) — qualidade 90
- Imagens em `/public/images/` (ícones de contato, fotos de perfil)
- Imagens em `/public/images/projetos/` (screenshots dos projetos)
- Componente `next/image` com `fill` e `objectFit: cover` para carregamento otimizado

### Responsividade

O site é totalmente responsivo de **320px a 1920px+**, seguindo a abordagem mobile-first:

| Elemento | Mobile (< 768px) | Desktop (≥ 768px) |
|---|---|---|
| Dock | Vertical, lado esquerdo, 54px largura | Horizontal, rodapé `bottom: 30px` centralizado |
| MenuBar | `left: 54px → right: 0` | `left: 0 → right: 0` |
| Janelas (Sobre, Skills) | `left: 62px`, `width: calc(100vw - 70px)` | `left: 10vw`, `width: 80vw` |
| Janela Contato | `left: 62px`, `width: calc(100vw - 70px)` | `left: 11vw`, `width: 78vw` |
| Cards Projetos | Altura `(innerHeight - 100) / 1.1`, imagem 35% | Altura fixa 460–580px |
| Grids Skills | `minmax(80px)` / `minmax(72px)` | `minmax(107px)` / `minmax(88px)` |
| Foto hexagonal (home) | Oculta | Visível |
| Terminal | Oculto (`useIsMobile`) | Visível |
| `<main>` | `w-full` (100% da área sem a dock) | `w-full` |
| Body padding | `pl-[54px]` | `pl-0` |

---

## Acessibilidade (A11Y)

O portfólio implementa acessibilidade completa.

### Skip Link

- Link invisível `"Pular para o conteúdo principal"` no topo do `layout.tsx`
- Torna-se visível ao receber foco via teclado (posição `left: 8px, top: 8px`)
- Leva o foco diretamente ao `<main id="main-content">` de cada página

### Focus Visible

- Todas as páginas têm `:focus-visible` com `outline: 2px solid #00EAFF` e `outline-offset: 2px`
- Garante indicador de foco visível para usuários que navegam por teclado
- Não interfere no visual para usuários de mouse (`:focus-visible` só ativa com teclado/seleção)

### Prefers Reduced Motion

- `@media (prefers-reduced-motion: reduce)` aplicado globalmente em `globals.css`
- Desativa **todas** as animações e transições para usuários que configuram essa preferência no sistema operacional
- Cobre `animation`, `animation-iteration-count` e `scroll-behavior`

### ARIA — Landmarks e Roles

| Elemento | ARIA aplicado |
|---|---|
| `<main>` em todas as páginas | `id="main-content"` para skip link |
| Dock (desktop e mobile) | `<nav aria-label="Navegação principal">` |
| Toast mobile da home | `role="alert" aria-live="assertive"` |
| Toast do terminal | `role="status" aria-live="polite"` |
| Toasts da página de contato | `role="status" aria-live="polite"` |
| Modal "Hire Me" | `role="dialog" aria-modal="true" aria-labelledby="hire-modal-title"` |
| Modal Princípios (Skills) | `role="dialog" aria-modal="true" aria-label="Princípios"` |
| Flip cards (Skills) | `role="button" tabIndex={0}` |
| Cards do carousel (Projetos) | `role="button" tabIndex={0}` (0 para o central, -1 para os demais) |
| Dots de navegação (Projetos) | `role="button" aria-label="Ir para projeto N" aria-current` |
| Input do terminal | `aria-label="Terminal input"` |

### ARIA — Labels Descritivos

| Elemento | `aria-label` |
|---|---|
| Botões de controle do terminal (vermelho/amarelo/verde) | "Fechar terminal", "Minimizar terminal", "Expandir/Restaurar tamanho normal do terminal" |
| Botão do terminal no Dock | Label traduzível via `t.dock[item.labelKey]` |
| Botão de troca de idioma (MenuBar) | "Mudar idioma para Inglês" / "Mudar idioma para Português" |
| Botão de scroll (Sobre) | "Rolar para baixo" / "Voltar ao topo" — dinâmico conforme estado |
| Links de contato (Sobre, Contato) | `"{nome} (abre em nova aba)"` |
| Links de contato externos (Contato) | `aria-label="{name} (abre em nova aba)"` |
| Modal "Hire Me" | `<h2 id="hire-modal-title">` referenciado via `aria-labelledby` |

### Formulário Acessível (Contato)

- Todos os `<label>` têm `htmlFor` associado ao `id` do input correspondente
- IDs dos campos: `contact-name`, `contact-email`, `contact-subject`, `contact-message`
- Botão de envio com `type="submit"` explícito
- Toasts de erro/sucesso com `role="status" aria-live="polite"`

### Elementos Decorativos

Todos os elementos puramente visuais têm `aria-hidden="true"` para não poluir a árvore de acessibilidade:

- Emojis decorativos (`🖥️`, `🤝`, `⚠`, `✓`) em toasts e modais
- Bolinhas coloridas estilo macOS (vermelho/amarelo/verde) nas janelas Sobre, Skills e Contato
- Question marks animados nos cards "Em Breve" (Projetos)
- SVGs inline de ícones dentro de links que já têm texto (GitHub, link externo)

### Navegação por Teclado

- **Flip cards** (Skills): ativados com `Enter` e `Space` via `onKeyDown`
- **Cards do carousel** (Projetos): ativados com `Enter` e `Space`
- **Dots de navegação** (Projetos): ativados com `Enter` e `Space`
- **Botões do terminal** (fechar/minimizar/expandir): ativados com `Enter` e `Space`
- **Modal "Hire Me"**: fechado com `Escape` via `onKeyDown`
- Todos os `<button>` têm `type="button"` ou `type="submit"` explícito

### Semântica HTML

- `<html lang="pt-br">` definido globalmente
- `<main>` presente em todas as páginas (`/`, `/sobre`, `/skills`, `/projetos`, `/contato`)
- `<nav aria-label="Navegação principal">` envolvendo o Dock
- `<h1>` único por página, hierarquia de headings respeitada

---

## Stack

| Tecnologia | Uso |
|---|---|
| [Next.js 15](https://nextjs.org/) | Framework React com App Router |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização utilitária |
| [GSAP](https://gsap.com/) | Animação da Dock (magnification) |
| [Framer Motion](https://www.framer.com/motion/) | ScrambleText, AnimatePresence e toasts no Blog |
| [@notionhq/client](https://github.com/makenotion/notion-sdk-js) | Integração com Notion API (assinantes do blog) |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Efeito de confete (CV download, formulário de contato e inscrição no blog) |
| [validator.js](https://github.com/validatorjs/validator.js) | Validação de email RFC-compliant no backend |
| [Resend](https://resend.com/) | Envio de email de notificação por novo assinante (via `fetch` nativo) |
| [react-icons](https://react-icons.github.io/react-icons/) | Ícones (skills, sobre, UI) |
| [sharp](https://sharp.pixelplumbing.com/) | Conversão de imagens PNG/JPG → WebP |
| [Formspree](https://formspree.io/) | Backend de formulário de contato (sem servidor) |
| [@vercel/analytics](https://vercel.com/analytics) | Rastreamento de pageviews e eventos |
| [@vercel/speed-insights](https://vercel.com/docs/speed-insights) | Monitoramento de Core Web Vitals |
| `requestAnimationFrame` | Parallax, blobs, glitch, scan sweep |
| CSS `backdrop-filter` | Glassmorphism em janelas, botões e cards |
| CSS `transform-style: preserve-3d` | Flip cards 3D nas soft skills |
| CSS `perspective` | CoverFlow 3D do carousel de projetos |
| SVG Filters | RGB Glitch na foto hexagonal da home |

---

## Estrutura de Pastas

```
app/
├── api/
│   └── subscribe/
│       └── route.ts             # POST /api/subscribe — salva email no Notion
├── components/
│   ├── CyberpunkBackground.tsx  # Background animado com blobs neon (delta time)
│   ├── Dock.tsx                 # Dock horizontal (desktop, bottom 30px) / vertical (mobile)
│   ├── HeroPhoto.tsx            # Foto hexagonal com parallax, glitch e bordas animadas
│   ├── MenuBar.tsx              # Barra superior com relógio e seletor de idioma
│   ├── MarqueeTitle.tsx         # Título estático "Leandro Dukiévicz" + favicon rotativo (4 ícones SVG)
│   ├── TerminalWindow.tsx       # Terminal interativo com resize, drag e auto-posicionamento
│   └── LoadingScreen.tsx        # Loading screen primeira visita (espiral girassol)
├── context/
│   ├── TerminalContext.tsx      # Estado global do terminal e hire flow
│   └── LanguageContext.tsx      # Estado global de idioma e traduções (PT/EN)
├── blog/
│   ├── layout.tsx               # Metadata SEO da rota /blog
│   └── LiquidGlassBlog.tsx      # ScrambleText + formulário de inscrição + integração Notion
├── sobre/
│   └── layout.tsx               # Metadata SEO da rota /sobre
├── skills/
│   └── layout.tsx               # Metadata SEO da rota /skills
├── projetos/
│   └── layout.tsx               # Metadata SEO da rota /projetos
├── contato/
│   └── layout.tsx               # Metadata SEO da rota /contato
├── faq/
│   └── page.tsx                 # Página FAQ — accordion PT/EN com CyberpunkBackground
├── not-found.tsx                # Página 404 customizada com CyberpunkBackground
├── layout.tsx                   # Layout global — metadata SEO, JSON-LD Person, Analytics, Providers, security headers
└── page.tsx                     # Home — hero, foto hexagonal, CTAs, toast mobile, JSON-LD ProfilePage + FAQPage
hooks/
├── useIsMobile.ts               # Detecta mobile (< 768px) para ocultar terminal
├── useTypewriter.ts             # Efeito typewriter caractere a caractere com delay configurável
└── useStaggerVisible.ts         # Array de booleanos para animações de entrada em stagger
public/
├── images/
│   ├── projetos/                # Screenshots dos projetos (.webp)
│   ├── astronautas.svg          # SVG do astronauta (blog)
│   ├── foto-1.webp              # Foto da home (hexagonal)
│   ├── foto-sobre.webp          # Foto holográfica (sobre)
│   └── *.webp                   # Ícones de contato (GitHub, LinkedIn, etc.)
└── Leandro Dukievicz - Desenvolvedor Web.pdf  # Currículo para download
lib/
├── download.ts                  # downloadCV() — cria link temporário e dispara o download
├── emailValidation.ts           # Regex, lista de domínios descartáveis, helpers de validação
├── schema.ts                    # buildPageSchema() — gera JSON-LD WebPage/ProfilePage por rota
└── version.ts                   # Constante VERSION (usada internamente)
```

---

## Como Rodar Localmente

**Pré-requisitos:** Node.js 18+ e npm

```bash
# Clone o repositório
git clone https://github.com/LeandroDukievicz/Portifolio-Cyber-Dukie.git

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Notion

# Rode em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NOTION_TOKEN=seu_token_de_integracao_notion
NOTION_BLOG_SUBSCRIBERS_DB=id_do_database_notion
RESEND_API_KEY=sua_api_key_resend
```

> O `NOTION_TOKEN` é gerado em [notion.so/my-integrations](https://www.notion.so/my-integrations). O banco de dados deve ter as colunas `Email` (Title) e `Data de cadastro` (Date). O `RESEND_API_KEY` é obtido em [resend.com](https://resend.com/).

---

## Versionamento

| Versão | Data | Descrição |
|---|---|---|
| `v1.0.0` | 2026-03-11 | Home concluída — hero, terminal, i18n, CTAs, dock, glitch |
| `v1.1.0` | 2026-03-13 | Página Sobre — janela macOS, foto holográfica, timeline, i18n |
| `v1.2.0` | 2026-03-13 | Página Skills — hard skills com stagger, flip cards hover, princípios, i18n |
| `v1.3.0` | 2026-03-13 | Página Contato — janela macOS, ícones, formulário, Formspree, confetti, liquid glass |
| `v1.4.0` | 2026-03-13 | Blog — Particle Assemble, astronauta SVG animado, tema-aware |
| `v1.5.0` | 2026-03-13 | Projetos — CoverFlow 3D, cards completos, Em Breve, i18n, scroll/swipe/drag |
| `v1.6.0` | 2026-03-16 | Loading Screen primeira visita (espiral girassol, typewriter, barra de progresso) |
| `v1.7.0` | 2026-03-16 | Background com delta time normalizado — velocidade constante sem aceleração |
| `v1.8.0` | 2026-03-16 | Dock vertical mobile (sidebar esquerda), Terminal oculto em mobile |
| `v1.9.0` | 2026-03-16 | Responsividade completa — w-full, janelas corrigidas, grids, MenuBar, cards projetos |
| `v2.0.0` | 2026-03-16 | Blog — ScrambleText (Framer Motion), formulário de inscrição, integração Notion, toasts, confetti |
| `v2.1.0` | 2026-03-16 | Blog backend — API route `/api/subscribe`, Notion database, Resend notification; validação robusta (rate limiting, honeypot, validator.js, MX record, disposable domains) |
| `v2.2.0` | 2026-03-16 | Skills: flip cards preenchem o espaço (gridAutoRows 1fr, alignContent stretch, último card 1/-1); Dock bottom 30px |
| `v2.3.0` | 2026-03-16 | Blog: remove tema claro — apenas dark e dim disponíveis; astronaut-color ativa em ambos os temas |
| `v2.4.0` | 2026-03-17 | SEO completo — metadata, OpenGraph, Twitter Card, JSON-LD Person, canonical (`devleandro.com.br`) |
| `v2.5.0` | 2026-03-17 | Título estático "Leandro Dukiévicz" na aba; favicon rotativo com 4 ícones SVG; Vercel Analytics + Speed Insights |
| `v2.6.0` | 2026-03-18 | CTAs renomeados (Entrar em Contato / Baixar Currículo / Get in Touch); tagline na home; `white-space: nowrap` nos botões; `min-w` na coluna esquerda |
| `v2.7.0` | 2026-03-18 | Títulos das janelas renomeados (O que eu faço / Tecnologias que utilizo / como posso ajudar) com suporte PT/EN completo |
| `v2.8.0` | 2026-03-18 | Janela de contato ampliada ~30%; header de texto acima dos ícones (Vamos trabalhar juntos?) com i18n PT/EN |
| `v2.9.0` | 2026-03-18 | Metadata SEO por rota via `layout.tsx` server components; JSON-LD ProfilePage e FAQPage na home; `lib/schema.ts` |
| `v3.0.0` | 2026-03-18 | Headers de segurança (HSTS, CSP, X-Frame-Options) e cache headers (`next.config.ts`); página 404 customizada com CyberpunkBackground |
| `v3.1.0` | 2026-03-19 | Animação de entrada stagger na home (useStaggerVisible + useTypewriter); terminal centralizado no gap hero; toast mobile desktop-hint; hooks `useIsMobile`, `useStaggerVisible`, `useTypewriter`; `lib/download.ts` |
| `v3.2.0` | 2026-03-19 | Acessibilidade completa (WCAG 2.1 AA): skip link, focus-visible, prefers-reduced-motion, ARIA landmarks, labels, modais, aria-live, teclado, aria-hidden em decorativos, formulário com htmlFor/id |

---

## Autor

**Leandro Dukievicz** — Desenvolvedor Front-End

---

## Licença

Este projeto é de uso pessoal. Todos os direitos reservados.
