# Portfólio Cyberpunk — Leandro Dukievicz

> Portfólio pessoal desenvolvido com estética cyberpunk, interatividade avançada e animações fluidas.

---

## Visão Geral

Portfólio construído para apresentar projetos, habilidades e informações profissionais de forma imersiva. A interface combina elementos visuais cyberpunk com componentes interativos inspirados no macOS — dock animada, terminal funcional e parallax na foto de perfil.

---

## ✅ Home — Concluída

### Hero Layout

- **Nome** em gradiente branco/cinza com drop-shadow, tamanho responsivo (`6.3rem` desktop)
- **Traço degradê** abaixo do nome com gradiente `#00EAFF → #BD00FF → #FF2D78` e leve glow
- **Subtítulo** ("Desenvolvedor Front-End") centralizado abaixo do traço
- **Parágrafo de bio** com mesmo gradiente e estilo do nome, fonte `1.1rem`
- Layout da coluna esquerda posicionado com `ml-[200px]` e `-mt-[100px]`

### Foto Hexagonal

- Clip-path hexagonal com `path()` SVG
- **Parallax** suave com `requestAnimationFrame` e interpolação lerp ao mover o mouse
- **Efeito RGB Glitch** — canais R, G, B separados via SVGFilter e deslocados dinamicamente no hover
- **Cursor customizado** (mira ciano) que aparece apenas ao entrar na foto, sincronizado com o glitch
- **Bordas hexagonais duplas** que oscilam de cor (`#00EAFF → #BD00FF → #FF2D78`) a cada 4s sem sombra
- Ao fazer hover, as bordas **tremem junto** com o glitch via `url(#rgb-glitch)` filter
- Foto avançada `mr-[100px]` e alinhada verticalmente com o nome (`items-start`, `-mt-[100px]`)

### Botões CTA

| Botão | Ação |
|---|---|
| **Contrate-me** | Navega para `/contato` |
| **Baixar CV** | Download do CV + confetti + toast + modal de agradecimento |

**Efeitos visuais dos botões (glassmorphism):**
- Shimmer animado no hover via `span::after` com `mix-blend-mode: screen`
- Borda conica animada com `conic-gradient` girando entre `#00EAFF`, `#BD00FF` e `#FF2D78`
- Sombra blur neon abaixo de cada botão intensificando no hover
- Scale `0.975` + 3D tilt `rotate3d(1,0,0,25deg)` no clique (active)
- Botão primário: gradiente `#00EAFF → #BD00FF`
- Botão secundário: outline ciano com ícone de disquete (FaFloppyDisk)

### Fluxo "Hire Me" (Baixar CV)

Tanto o botão **Baixar CV** quanto o comando `sudo hire-me` do terminal disparam:
1. Download automático do arquivo `/cv.pdf`
2. Explosão de confetti colorido neon (canvas-confetti)
3. Toast "Permissão Autorizada !!" no topo da tela
4. Modal de agradecimento com gradiente animado

---

## ✅ Sobre — Concluída

### Janela estilo macOS

A página `/sobre` é renderizada como uma janela flutuante sobre o background animado. Os três botões macOS (vermelho, amarelo, verde) são **decorativos** — sem função ativa, mantidos apenas como elemento estético consistente com o design system do portfólio.

- Entrada animada: `opacity 0 → 1` + `scale(0.96) → scale(1)` + `translateY(16px) → 0`
- Glassmorphism: `background: rgba(3,17,31,0.65)` + `backdrop-filter: blur(12px)`
- Layout responsivo: coluna (mobile) ou linha lado-a-lado (desktop ≥ 768px)
- Largura: `96vw` mobile / `80vw` desktop

### Painel Esquerdo — Foto Holográfica + Info

**Componente `HoloPhoto`** com três sistemas de animação independentes via `useEffect`:

| Efeito | Técnica |
|---|---|
| **3D Tilt** | `requestAnimationFrame` com lerp (t=0.06) acompanhando o cursor; `perspective: 900px`, `rotateX/rotateY` até ±14° |
| **Glitch Cromático** | Dois overlays coloridos (cyan `rgba(0,234,255,0.22)` e pink `rgba(255,0,255,0.18)`) deslocados aleatoriamente, com double-flicker opcional, disparados a cada 2,8–7,8s |
| **Scan Sweep** | Faixa de luz ciano deslizando de `-6%` a `106%` em 1,8s linear, repetida a cada 4–8s |

Outros detalhes da foto:
- Máscara radial `ellipse 88%` dissolvendo as bordas
- Overlay de scanlines via classe CSS `.holo-scanlines`
- Shimmer animado com `linear-gradient` a 135° (animação `holo-shimmer 4s`)

Abaixo da foto:
- **Nome** "Leandro Dukievicz" em gradiente cyan → purple
- **Localização** com ícone `MdLocationOn` roxo — "Maringá — PR"
- **Status de disponibilidade** — pill verde com bolinha pulsante (animação `available-pulse 1.8s`)

### Painel Direito — Conteúdo

**Barra de progresso de leitura** no topo: faixa de 2px com gradiente `#00EAFF → #BD00FF → #FF2D78` que cresce conforme o scroll do conteúdo (calculado com `scrollTop / (scrollHeight - clientHeight) * 100`).

**Conteúdo scrollável** com scrollbar fino personalizado:

- Título com efeito de cursor piscando (`animation: cursor-blink 1s step-end infinite`)
- Dividers com gradiente transparente → cyan/purple → transparente
- 3 parágrafos de bio — o segundo destaca "Full Stack" em cyan via `React.Fragment` split
- **Seção Stack** com ícones badge para cada tecnologia (React+Next.js, Node.js+Express, PostgreSQL+MySQL), cada badge com cor individual, borda e fundo semi-transparente

**Seção de links de contato** com três botões:

| Link | Cor | Destino |
|---|---|---|
| Email | `#FF2D78` | `mailto:...` |
| GitHub | `#BD00FF` | github.com/LeandroDukievicz |
| LinkedIn | `#00EAFF` | linkedin.com/in/leandrodukievicz |

Cada botão tem hover com intensificação do fundo via `onMouseEnter/Leave`.

**Timeline** com 4 itens e marcadores coloridos:

| Cor do ponto | Estado | Badge |
|---|---|---|
| `#00EAFF` sólido | Início | `badgeStart` |
| `#BD00FF` sólido | Concluído | `badgeCompleted` |
| `#FF2D78` vazio + pulsante | Em andamento | `badgeInProgress` |
| `#00ff88` sólido | Idiomas | — |

Linha vertical conectando os itens com gradiente `#00EAFF44 → #BD00FF44 → #00EAFF22`.

**Botão de scroll** fixo no rodapé do painel:
- Mostra seta para baixo com animação `scroll-bounce 1.8s` enquanto há conteúdo abaixo
- Ao atingir o fim, inverte para seta para cima (retorna ao topo com scroll suave)
- Transição de opacidade no hover

### i18n na Página Sobre

Todos os textos da página (bio, títulos, labels da timeline, badges, status, botões de scroll) vêm de `t.sobre` via `useLanguage()` — suporte completo PT/EN.

| Campo traduzido |
|---|
| `windowTitle`, `heading`, `available` |
| `bio1`, `bio2`, `bio3`, `bio4`, `bio5`, `bio5Highlight` |
| `stackIntro`, `stack[].label`, `stack[].desc` |
| `timelineTitle`, `timeline[].date/title/sub/detail` |
| `badgeStart`, `badgeCompleted`, `badgeInProgress` |
| `scrollDown`, `scrollUp` |

---

## ✅ Skills — Concluída

### Janela estilo macOS

Mesma estrutura de janela glassmorphism das demais páginas: title bar com traffic lights **decorativos** (vermelho, amarelo, verde sem função ativa), `backdrop-filter: blur(12px)`, entrada animada via classe `window-rise`, responsiva (96vw mobile / 80vw desktop).

### Layout — dois painéis lado a lado

O conteúdo é dividido em dois painéis separados por uma divisória vertical com gradiente:

- **Esquerdo** — Hard Skills
- **Direito** — Soft Skills

Em mobile os painéis empilham verticalmente.

### Hard Skills

**Componente `SkillCard`** — cada tecnologia é um card com:
- Ícone colorido com a cor oficial da tecnologia
- Label abaixo do ícone
- Borda e fundo semi-transparentes na cor da tech (`color + "28"` / `color + "0d"`)
- Hover: borda intensifica para `color + "66"`, fundo para `color + "1a"`, glow `box-shadow 0 0 16px`, `translateY(-2px)`
- Entrada animada com `card-in` (opacity 0→1 + translateY 10px→0 + scale 0.95→1), com **stagger de 55ms por card** sincronizado globalmente entre grupos

**Categorias e tecnologias:**

| Categoria | Tecnologias |
|---|---|
| Linguagens | JavaScript, TypeScript, HTML5, CSS3 |
| Boas Práticas | Web Performance, Responsive Design, SEO Web |
| Frameworks & Libs | React, Next.js, Node.js, Express, Tailwind CSS |
| Banco de Dados | PostgreSQL, MySQL |
| Ferramentas | Git, GitHub, Docker, npm, yarn, pnpm, REST APIs |

**Layout em grid por categoria:**
- Linha 1: Linguagens + Boas Práticas lado a lado (flex row), grid `auto-fill minmax(82px)`
- Divisória horizontal
- Demais grupos (Frameworks, BD, Ferramentas) em linhas próprias, grid `auto-fill minmax(68px)`

**Componente `TypeLabel`** — cada label de categoria é digitado caractere a caractere com efeito typewriter:
- Delay de início sincronizado com o `cardIndex` do primeiro card da categoria × 55ms
- Cursor piscante `_` enquanto digita (animação `cursor-blink 0.7s step-end`)

### Soft Skills

Grid fixo 4 colunas com **flip cards 3D** — cada card tem frente e verso:

- **Frente**: ícone + label da soft skill
- **Verso**: descrição da competência
- **Desktop**: hover (`onMouseEnter/onMouseLeave`) vira o card automaticamente ao passar o mouse — sem clique necessário
- **Mobile**: clique (`onClick`) alterna o estado do card — fallback tátil
- Rotação de 180° em Y via CSS `transform-style: preserve-3d` + `rotateY(180deg)` com transição de 0.45s
- Apenas um card vira por vez (hover em outro reseta o anterior)
- `backface-visibility: hidden` para esconder a face oposta

**12 soft skills:**
Resolução de problemas, Pensamento analítico, Comunicação clara, Trabalho em equipe, Aprendizado contínuo, Adaptabilidade, Organização, Atenção aos detalhes, Proatividade, Pensamento crítico, Gestão do tempo, Inteligência emocional.

Cores alternadas entre `#00EAFF`, `#BD00FF` e `#FF2D78`.

### Card especial — Princípios de Engenharia

O último item do grid de soft skills (`TbCode` — "Princípios de Engenharia") tem comportamento diferente dos outros:
- Ocupa **2 colunas centrais** (`gridColumn: "2 / 4"`) para destaque visual
- Exibe "ver →" abaixo do label
- **Funciona apenas com clique** (tanto desktop quanto mobile) — não vira com hover
- Ao clicar abre um painel sobreposto deslizando da direita (`translateX(28px) → 0` + opacity 0→1 em 0.38s)

**Painel de Princípios de Engenharia:**
- Cobre todo o content area com `position: absolute, inset: 0, zIndex: 20`
- Fundo `rgba(3,17,31,0.97)` + blur
- Botão "← Voltar" fecha o painel
- 7 princípios listados com stagger de entrada `principles-in` (translateX(24px) → 0, 55ms entre itens):

| # | Princípio |
|---|---|
| 1 | Performance primeiro |
| 2 | Simplicidade vence complexidade |
| 3 | Código é comunicação |
| 4 | Experiência do usuário em primeiro lugar |
| 5 | Escalabilidade desde o início |
| 6 | Consistência visual e técnica |
| 7 | Automação sempre que possível |

### i18n na Página Skills

Todos os textos da página vêm de `t.skills` via `useLanguage()`:

| Campo traduzido |
|---|
| `windowTitle`, `hardSkills`, `softSkills` |
| `back`, `principlesTitle`, `principlesHint` |
| `categories[]` — nomes das 5 categorias |
| `softSkillsData[].label`, `softSkillsData[].desc` — 13 itens |
| `principles[].title`, `principles[].desc` — 7 princípios |

---

## ✅ Projetos — Concluída

### CoverFlow 3D Carousel

A página `/projetos` apresenta os projetos em um carrossel estilo **Apple CoverFlow** com perspectiva 3D real:

- **Card central**: `scale(1.1)`, `translateZ(0)`, borda ciano e fundo levemente ciano
- **Adjacentes (±1)**: `scale(0.9)`, `translateZ(-100px)`, `opacity: 0.85`
- **Adjacentes (±2)**: `scale(0.8)`, `translateZ(-300px)`, `opacity: 0.6`
- **Demais**: `opacity: 0`, invisíveis
- Todos os cards com `backdrop-filter: blur(8px)` e `border-radius: 20px`
- `perspective: 1000px` no container do track
- Transição suave: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**Formas de navegação:**

| Método | Comportamento |
|---|---|
| **Clique** no card lateral | Avança/retrocede para aquele card |
| **Setas do teclado** ← → | Navega entre cards |
| **Swipe** (touch) | Arrasta horizontalmente (threshold: 50px) |
| **Drag com mouse** | Clica e arrasta (threshold: 50px) |
| **Scroll do mouse** | Rola para baixo = próximo, para cima = anterior (debounce 600ms) |
| **Auto-rotate** | Avança automaticamente a cada 3s, pausa ao hover |

**Indicadores de progresso (dots):**
- Dot ativo se expande de `10px → 36px` com transição suave
- Barra de progresso ciano preenchendo o dot ativo via animação `dot-progress` sincronizada com o `AUTO_INTERVAL` (3000ms)
- Pausa a animação quando o carousel está pausado (hover)

### Cards de Projeto

Cada card com conteúdo exibe:
- **Imagem** do projeto cobrindo a parte superior do card (185px desktop) com gradiente de fade para o fundo na base
- **Subtitle** em ciano pequeno (categoria, ex: "Front-end")
- **Título** do projeto em destaque
- **Descrição** com `textAlign: justify`
- **Tags** de stack em badges ciano com borda semi-transparente
- **Dois CTAs** (Ver Detalhes + Ver Projeto) posicionados nos cantos opostos do card, com ícones SVG embutidos (GitHub / link externo), glassmorphism e hover com glow ciano + `translateY(-1px)`

Os CTAs têm `e.stopPropagation()` para não acionar a navegação do carousel ao clicar.

**Projetos no carousel:**

| # | Projeto | Stack |
|---|---|---|
| 1 | Electrum — E-commerce Front-end | HTML5, Sass, Vercel |
| 2 | Artes Urbanas | HTML5, CSS3, Bootstrap, CDN, Vercel |
| 3 | iMovi Construtora — Site Institucional | HTML5, CSS3, Bootstrap 5, Vercel |
| 4 | Barber Shop — Institucional | HTML5, CSS3, Forms, Vercel |
| 5 | Dashboard de Controle *(Em Breve)* | — |
| 6 | Blog *(Em Breve)* | — |
| 7–9 | Cards vazios *(Em Breve)* | — |

### Cards "Em Breve"

Cards com imagem de fundo (dashboard, helmet) exibem:
- Overlay escuro `rgba(3,17,31,0.85)` + `backdrop-filter: blur(2px)`
- Texto "Em Breve" / "Coming Soon" em branco
- Três pontos animados em sequência (`blink1/2/3` com `ease-in-out infinite`)
- Label do projeto abaixo dos pontos

Cards `null` (sem conteúdo) exibem automaticamente:
- **12 pontos de interrogação** `?` espalhados pelo card em posições, tamanhos e rotações pré-definidas
- Cada `?` tem sua própria animação de flutuação (`qfloat1–6`) com duração entre 3,7s e 6,8s, criando movimento orgânico assíncrono
- Cor ciano com `textShadow: 0 0 8px rgba(0,234,255,0.4)` e opacidade entre 0.18–0.42
- Texto "Em Breve" + pontos animados centralizados sobre os `?`
- **Regra automática**: qualquer `null` no array `STATIC` renderiza este card sem configuração adicional

### Imagens dos Projetos

Todas as imagens em `/public/images/projetos/` estão no formato `.webp` para melhor performance:

| Arquivo | Projeto |
|---|---|
| `projeto-electrum.webp` | Electrum E-commerce |
| `artes-urbanas.webp` | Artes Urbanas |
| `imovi.webp` | iMovi Construtora |
| `barbershop.webp` | Barber Shop |
| `dashboard.webp` | Dashboard de Controle (Em Breve) |
| `helmet.webp` | Blog (Em Breve) |

### i18n na Página Projetos

Ao trocar de idioma, os seguintes elementos são traduzidos via `t.projects`:

| Campo traduzido |
|---|
| `comingSoon` — "Em Breve" / "Coming Soon" |
| `ctaDetails` — "Ver Detalhes" / "View Details" |
| `ctaProject` — "Ver Projeto" / "View Project" |
| `items[].title` — título de cada projeto |
| `items[].subtitle` — categoria do projeto |
| `items[].description` — descrição do projeto |
| `items[].soonLabel` — label dos cards Em Breve |

Tags, URLs dos CTAs e caminhos de imagem permanecem estáticos.

---

## ✅ Contato — Concluída

### Janela estilo macOS

A página `/contato` renderiza uma janela glassmorphism com:
- Botões macOS (vermelho, amarelo, verde) **decorativos** — sem função ativa
- Dimensões: `60vw` largura desktop / `90vw` mobile
- Posição: `top: calc(20vh - 100px)`, centralizada horizontalmente em `left: 20vw`
- Entrada animada via classe `window-rise`
- Glassmorphism: `background: rgba(3,17,31,0.65)` + `backdrop-filter: blur(12px)` + borda magenta sutil

### Coluna de Ícones de Contato (40% da janela)

Grid 2×3 com 6 ícones de contato, todos no formato `.webp` (50×50px):

| Ícone | Link | Cor de glow |
|---|---|---|
| WhatsApp | `wa.me/5544991293234` com mensagem pré-preenchida | `#25D366` |
| Telegram | `t.me/+5544991293234` | `#2AABEE` |
| LinkedIn | `linkedin.com/in/leandrodukievicz` | `#0A66C2` |
| GitHub | `github.com/LeandroDukievicz` | `#ffffff` |
| Gmail | `mailto:leandrodukievicz1718@gmail.com` | `#EA4335` |
| Apple Mail | `mailto:ldukie@icloud.com` | `#1a8cff` |

Efeito de hover em cada ícone: `scale(1.1)` + `drop-shadow(0 0 10px {cor}99)` — transição de 0.25s.

Entrada animada com `contact-in` (opacity 0→1 + translateY 14px→0) com stagger de 60ms por ícone.

### Formulário de Contato (60% da janela)

Campos com borda `1px solid #ffffff` e fundo semi-transparente:

| Campo | Tipo | Placeholder |
|---|---|---|
| Nome | `text` | "Seu nome" |
| E-mail | `email` | "seu-Melhor-Email@mail.com" |
| Assunto | `text` | "Ex: Proposta de projeto, Contratação PJ..." |
| Mensagem | `textarea` | "Descreva como posso te ajudar..." |

**Validação:**
- Todos os campos obrigatórios (`trim() !== ""`)
- Email validado com regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Botão com `opacity: 0.4` quando formulário inválido
- Toast de erro quadrado (160×160px) aparece à direita da janela com animação `toast-in` quando o envio é tentado com campos inválidos

**Botão de envio — Liquid Glass:**
- Estilo `.btn-liquid-glass` com `backdrop-filter: blur(16px)`, borda branca, `inset box-shadow` com highlight no topo
- Estados: hover com `scale(0.975)` + glow ciano; active com `scale(0.96)`
- Mostra "Enviando..." durante o fetch e "✓ Mensagem enviada!" após sucesso

**Integração com Formspree:**
- `POST https://formspree.io/f/maqpbbor` com `Content-Type: application/json`
- Formulário resetado automaticamente após envio bem-sucedido

**Confetti pós-envio:**
- Explosão tripla com `canvas-confetti`: burst central + dois laterais (esquerda e direita) com 150ms de atraso
- Cores: `#00EAFF`, `#FF00FF`, `#FF2D78`, `#ffffff`, `#00ff88`

---

## ✅ Blog — Em Desenvolvimento

### Estrutura Atual

A página `/blog` exibe um card central com mensagem "Em Breve" utilizando:

**Efeito Particle Assemble** no texto "Em Breve":
- Cada caractere é composto por partículas que voam de posições aleatórias da tela e se montam na posição final
- Implementado com DOM puro via `useEffect` + `requestAnimationFrame` — sem canvas
- Interpolação `ease-out-cubic` para desaceleração suave na chegada
- Efeito de scramble durante o voo: caracteres aleatórios substituem a letra real até pousar
- Cleanup completo na desmontagem: `cancelAnimationFrame` + remoção dos elementos DOM
- **Sensível ao tema**: partículas em voo são `#000000` (tema claro) ou `#00EAFF` (dark/dim); cor final é `#000000` (claro) ou `#ffffff` (dark/dim)

**Astronauta SVG animado** abaixo do texto:
- Animação `astronaut-float`: flutuação vertical suave (translateY ±18px em 3.5s ease-in-out infinite)
- Animação `astronaut-color`: gradiente de cores ciano → purple → magenta com `filter: hue-rotate` em 4s

---

## Features Globais

### Terminal macOS

- **Boot sequence animada** com auto-typing ao abrir
- **Drag & drop** — arrastar pela title bar
- **Resize livre** — handles em todos os 8 lados e cantos (N, S, E, W, NE, NW, SE, SW) com cursor direcional e glow ciano no hover
- **Minimizar / Maximizar** via botões amarelo e verde
- **Largura** alinhada com o dock (557px) e posição vertical alinhada com o hero
- **Auto-abre** sempre que o usuário retorna para a home (`/`)
- **Auto-fecha** com animação macOS (shrink + fade) ao navegar para outras rotas
- Em outras páginas, o terminal só abre ao clicar no ícone do dock

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
| MenuBar (título do portfólio) | ✅ |
| Greeting de boas-vindas | ✅ |
| Marquee da aba do browser | ✅ |
| Página Sobre (bio, timeline, badges, scroll) | ✅ |
| Página Skills (hard skills, soft skills, princípios) | ✅ |
| Página Projetos (títulos, descrições, CTAs, Em Breve) | ✅ |

### MenuBar

- Título `Portfólio v1.0.0` (traduzível)
- Relógio em tempo real com formato `Dia Mês HH:MM AM/PM`
- Ícone de idioma centralizado — alterna PT ↔ EN com indicador textual
- Oculta automaticamente em `/blog`

### Dock

- 7 ícones: Home, Sobre, Skills, Projetos, Contato, Terminal, Blog
- **Efeito de zoom** com GSAP ao passar o mouse (magnification)
- Labels traduzíveis via i18n
- Responsiva — grid 4 colunas em mobile

### Background

- 7 blobs coloridos (`#BD00FF`, `#FF00FF`, `#FF2D78`, `#0052F5`, `#00EAFF`, `#7B00FF`, `#FF6600`)
- Animados via `requestAnimationFrame` com bounce nas bordas e nudge aleatório
- Base `#03111F`

### Saudação ao Visitante

- Toast personalizado com cidade do visitante via geolocalização IP (ipapi.co)
- Aparece apenas uma vez por sessão (sessionStorage)
- Textos traduzíveis via i18n

### Otimização de Imagens

Todas as imagens do projeto estão no formato `.webp` para melhor performance de carregamento:
- Conversão realizada com a lib **sharp** (Node.js) — qualidade 90
- Imagens em `/public/images/` (ícones de contato, fotos de perfil)
- Imagens em `/public/images/projetos/` (screenshots dos projetos)
- Componente `next/image` com `fill` e `objectFit: cover` para carregamento otimizado

---

## Stack

| Tecnologia | Uso |
|---|---|
| [Next.js 15](https://nextjs.org/) | Framework React com App Router |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização utilitária |
| [GSAP](https://gsap.com/) | Animação da Dock (magnification) |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Efeito de confete (CV download e envio de formulário) |
| [react-icons](https://react-icons.github.io/react-icons/) | Ícones (skills, sobre, UI) |
| [sharp](https://sharp.pixelplumbing.com/) | Conversão de imagens PNG/JPG → WebP |
| [Formspree](https://formspree.io/) | Backend de formulário de contato (sem servidor) |
| `requestAnimationFrame` | Parallax, blobs, particle assemble, glitch, scan sweep |
| CSS `backdrop-filter` | Glassmorphism em janelas, botões e cards |
| CSS `transform-style: preserve-3d` | Flip cards 3D nas soft skills |
| CSS `perspective` | CoverFlow 3D do carousel de projetos |
| SVG Filters | RGB Glitch na foto hexagonal da home |

---

## Estrutura de Pastas

```
app/
├── components/
│   ├── CyberpunkBackground.tsx  # Background animado com blobs neon
│   ├── Dock.tsx                 # Dock estilo macOS com GSAP
│   ├── HeroPhoto.tsx            # Foto hexagonal com parallax, glitch e bordas animadas
│   ├── MenuBar.tsx              # Barra superior com relógio e seletor de idioma
│   ├── MarqueeTitle.tsx         # Marquee animado + favicon rotativo
│   ├── TerminalWindow.tsx       # Terminal interativo com resize e drag
│   └── VisitorGreeting.tsx      # Toast de boas-vindas com geolocalização
├── context/
│   ├── TerminalContext.tsx      # Estado global do terminal e hire flow
│   └── LanguageContext.tsx      # Estado global de idioma e traduções (PT/EN)
├── blog/
│   └── LiquidGlassBlog.tsx      # Particle Assemble + astronauta SVG animado
├── sobre/                       # Janela macOS — foto holográfica + timeline
├── skills/                      # Janela macOS — hard skills + flip cards + princípios
├── projetos/                    # CoverFlow 3D carousel com cards de projeto
├── contato/                     # Janela macOS — ícones de contato + formulário
├── layout.tsx                   # Layout global (MenuBar, Dock, Terminal, Providers)
└── page.tsx                     # Home — hero, foto hexagonal, CTAs
public/
├── images/
│   ├── projetos/                # Screenshots dos projetos (.webp)
│   ├── astronautas.svg          # SVG do astronauta (blog)
│   ├── foto-1.webp              # Foto da home (hexagonal)
│   ├── foto-sobre.webp          # Foto holográfica (sobre)
│   └── *.webp                   # Ícones de contato (GitHub, LinkedIn, etc.)
└── cv.pdf                       # Currículo para download
```

---

## Como Rodar Localmente

**Pré-requisitos:** Node.js 18+ e npm

```bash
# Clone o repositório
git clone https://github.com/LeandroDukievicz/Portifolio-Cyber-Dukie.git

# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

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

---

## Autor

**Leandro Dukievicz** — Desenvolvedor Front-End

---

## Licença

Este projeto é de uso pessoal. Todos os direitos reservados.
