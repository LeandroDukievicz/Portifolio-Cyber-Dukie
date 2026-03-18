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

| Botão (PT) | Botão (EN) | Ação |
|---|---|---|
| **Entrar em Contato** | **Get in Touch** | Navega para `/contato` |
| **Baixar Currículo** | **Download CV** | Download do CV + confetti + toast + modal de agradecimento |

**Tagline** — parágrafo em ciano (`#00EAFF`, JetBrains Mono) abaixo do subtítulo, descrevendo foco técnico.

**Efeitos visuais dos botões (glassmorphism):**
- `white-space: nowrap` nos spans dos botões — evita quebra de linha em qualquer tamanho de tela
- Coluna esquerda com `min-w-[416px] xl:min-w-[448px]` para garantir espaço mínimo aos CTAs
- Shimmer animado no hover via `span::after` com `mix-blend-mode: screen`
- Borda conica animada com `conic-gradient` girando entre `#00EAFF`, `#BD00FF` e `#FF2D78`
- Sombra blur neon abaixo de cada botão intensificando no hover
- Scale `0.975` + 3D tilt `rotate3d(1,0,0,25deg)` no clique (active)
- Botão primário: gradiente `#00EAFF → #BD00FF`
- Botão secundário: outline ciano com ícone de disquete (FaFloppyDisk)

### Fluxo "Hire Me" (Baixar Currículo)

Tanto o botão **Baixar Currículo** quanto o comando `sudo hire-me` do terminal disparam:
1. Download automático do arquivo `/cv.pdf`
2. Explosão de confetti colorido neon (canvas-confetti)
3. Toast "Permissão Autorizada !!" no topo da tela
4. Modal de agradecimento com gradiente animado

---

## ✅ Sobre — Concluída

### Janela estilo macOS

A página `/sobre` é renderizada como uma janela flutuante sobre o background animado. Os três botões macOS (vermelho, amarelo, verde) são **decorativos** — sem função ativa, mantidos apenas como elemento estético consistente com o design system do portfólio.

**Título da janela (PT):** `O que eu faço.txt — leandro-dukievicz`
**Título da janela (EN):** `what-i-do.txt — leandro-dukievicz`

- Entrada animada: `opacity 0 → 1` + `scale(0.96) → scale(1)` + `translateY(16px) → 0`
- Glassmorphism: `background: rgba(3,17,31,0.65)` + `backdrop-filter: blur(12px)`
- Layout responsivo: coluna (mobile) ou linha lado-a-lado (desktop ≥ 768px)
- **Mobile**: `left: 62px` (após dock de 54px), `width: calc(100vw - 70px)`, `top: 36px`, `bottom: 8px`
- **Desktop**: `left: 10vw`, `width: 80vw`, `bottom: 186px`

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

Mesma estrutura de janela glassmorphism das demais páginas: title bar com traffic lights **decorativos** (vermelho, amarelo, verde sem função ativa), `backdrop-filter: blur(12px)`, entrada animada via classe `window-rise`. Responsiva: `left: 62px / width: calc(100vw - 70px)` mobile; `left: 10vw / width: 80vw` desktop.

**Título da janela (PT):** `Tecnologias que utilizo.txt — leandro-dukievicz`
**Título da janela (EN):** `technologies-i-use.txt — leandro-dukievicz`

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
- **Grid preenchimento total**: `gridAutoRows: "1fr"` + `alignContent: "stretch"` — linhas dividem o espaço disponível igualmente sem sobra
- `minHeight: 0` no container flex para compatibilidade Firefox/Chrome com `flex: 1` + grid

**12 soft skills:**
Resolução de problemas, Pensamento analítico, Comunicação clara, Trabalho em equipe, Aprendizado contínuo, Adaptabilidade, Organização, Atenção aos detalhes, Proatividade, Pensamento crítico, Gestão do tempo, Inteligência emocional.

Cores alternadas entre `#00EAFF`, `#BD00FF` e `#FF2D78`.

### Card especial — Princípios de Engenharia

O último item do grid de soft skills (`TbCode` — "Princípios de Engenharia") tem comportamento diferente dos outros:
- Ocupa **toda a largura** (`gridColumn: "1 / -1"`) para fechar o grid sem células vazias
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
- **Card central**: fundo `rgba(2,10,22,0.92)` — quase opaco para evitar sangramento dos cards adjacentes
- Demais cards com fundo `rgba(3,17,31,0.55)` e `backdrop-filter: blur(6px)`
- `border-radius: 20px` em todos os cards
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
- **Imagem** do projeto cobrindo a parte superior do card (185px desktop, 35% da altura do card em mobile) com gradiente de fade para o fundo na base
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
- **Título da janela (PT):** `como posso ajudar.txt — leandro-dukievicz`
- **Título da janela (EN):** `how-can-i-help.txt — leandro-dukievicz`
- **Mobile**: `left: 62px`, `width: calc(100vw - 70px)`, `top: 36px`, `bottom: 8px`
- **Desktop**: `left: 11vw`, `width: 78vw`, `top: calc(11vh - 65px)`, `bottom: calc(11vh + 65px)` — janela ampliada (~30% maior)
- Entrada animada via classe `window-rise`
- Glassmorphism: `background: rgba(3,17,31,0.65)` + `backdrop-filter: blur(12px)` + borda magenta sutil

### Coluna Esquerda — Header de Texto + Ícones de Contato (40% da janela)

No topo da coluna esquerda, antes dos ícones, há um bloco de texto de apresentação traduzível:

| Campo i18n | PT | EN |
|---|---|---|
| `contactHeading` | "Vamos trabalhar juntos?" | "Let's work together?" |
| `contactSubheading` | "Estou disponível para projetos freelance, oportunidades presenciais e remotas." | "I'm available for freelance projects, on-site and remote opportunities." |
| `contactsLabel` | "Formas de contato" | "Ways to contact me" |

Todos em ciano (`#00EAFF`), fonte JetBrains Mono.

### Grid de Ícones de Contato

**3×2 em mobile** (36×36px) / **2×3 em desktop** (50×50px), todos no formato `.webp`:

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

A página `/blog` exibe conteúdo "Em Breve" com formulário de inscrição e integração com Notion + Resend.

### Textos com ScrambleText (Framer Motion)

Três textos animados com efeito de caracteres scramble usando `framer-motion` + `useInView`:

| Texto | Delay | Estilo |
|---|---|---|
| `"Em breve"` | 0ms | uppercase, **negrito**, tamanho `clamp(1.7rem, 4vw, 2rem)` |
| `"Um novo Blog"` | 300ms | bold, `clamp(1.6rem, 5vw, 2.8rem)`, com **text-shadow** na paleta do SVG |
| `"Assine :"` | 600ms | uppercase, opacidade 0.6 |

**Componente `ScrambleText`:**
- Cicla por caracteres aleatórios (`A-Z a-z 0-9 @#$%&`) antes de resolver para o texto final
- 22 frames a 45ms — revelação progressiva da esquerda para a direita
- Entrada suave via `motion.span` com `opacity 0 → 1` + `translateY 10px → 0`
- Dispara ao entrar na viewport (`useInView`, `once: true`)
- Cor fixa `#ffffff` (apenas temas dark e dim disponíveis)
- Todos os elementos da página centralizam o texto e usam espaçamento uniforme entre si

**Text-shadow em "Um novo Blog"** seguindo a paleta do astronauta SVG:
- ciano `rgba(0,234,255,0.6)` + roxo `#BD00FF` + magenta `#FF00FF` (espelha a animação `astronaut-color`)

### Formulário de Inscrição

Input de email + botão "Cadastrar" com validação multicamadas e estados visuais:

- **Input**: fundo semitransparente, borda sutil, focus acende a borda — estilo dark/dim
- **Botão**: glassmorphism, hover clareia o fundo, `Enter` também envia
- **Estado loading**: botão mostra `...` e fica desabilitado
- **Estado success**: input e botão substituídos por mensagem de confirmação
- **Erro inline**: borda do input fica vermelha + mensagem `⚠ {erro}` abaixo do campo ao digitar email inválido
- **Honeypot anti-bot**: campo invisível `name="website"` — se preenchido (por bot), o servidor retorna `200` sem salvar

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

- `AnimatePresence` para entrada/saída suave (translateY + opacity)
- Auto-dismiss após 4s ou clique/toque para fechar
- Confetti (`canvas-confetti`) disparado nas cores da paleta ao cadastrar com sucesso

### Integração com Notion — API Route `/api/subscribe`

API route server-side que persiste o email no database **"assinantes do blog"** no Notion:

- Cria uma nova página com as propriedades:
  - **`Email`** (Title) — endereço informado
  - **`Data de cadastro`** (Date) — timestamp ISO da requisição
- Verifica duplicata antes de inserir (`databases.query`) — retorna `409` se já existir
- Credenciais via variáveis de ambiente (nunca expostas ao cliente)

### Notificação por Email — Resend

Após cada cadastro bem-sucedido, envia um email de notificação via **Resend**:

- **De**: `Blog Dukie <onboarding@resend.dev>`
- **Para**: `leandrodukievicz1718@gmail.com`
- **Assunto**: "🔔 Novo assinante no blog!"
- Falhas no envio são logadas mas **não bloqueiam** o fluxo — o cadastro no Notion já foi salvo

### Variáveis de Ambiente

```
NOTION_TOKEN=...
NOTION_BLOG_SUBSCRIBERS_DB=...
RESEND_API_KEY=...
```

### Astronauta SVG animado

- Animação `astronaut-float`: flutuação vertical suave (translateY ±22px em 4s ease-in-out infinite)
- Animação `astronaut-color`: gradiente ciano → purple → magenta com `filter` CSS (ativa em ambos os temas)

---

## Features Globais

### Loading Screen (Primeira Visita)

Tela de carregamento exibida **somente na primeira visita** do usuário:

- **Script bloqueante** no `<head>` verifica `localStorage` antes de qualquer pintura — adiciona classe `html.fl` se for primeira visita
- `html.fl body { visibility: hidden }` — conteúdo oculto até o loading terminar (sem flash)
- **Espiral girassol** com 200 círculos SVG posicionados via ângulo dourado (`GOLDEN_ANGLE = π(3 - √5)`)
- Cores por fração radial: ciano `#00EAFF` (< 40%), roxo `#BD00FF` (< 75%), rosa `#FF2D78` (restante)
- Cada ponto anima `r` e `opacity` em `ANIM_DURATION` (3s) com `begin` escalonado por `frac`
- **Efeito typewriter** — "Iniciando Portfolio" digitado caractere a caractere (55ms/char)
- **Barra de progresso** animada via `requestAnimationFrame` (2400ms) com gradiente `#00EAFF → #BD00FF → #FF2D78` e glow
- Saída: remove classe `fl` → body fica visível → fade out 650ms → grava `localStorage` → desmonta
- Coordenação entre SSR e client via `useState<boolean | null>(null)` — evita hydration mismatch
- Precisão de float: `Math.round(n * 1000) / 1000` — resultados idênticos entre Node.js e browser

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
| Página Sobre (bio, timeline, badges, scroll) | ✅ |
| Página Skills (hard skills, soft skills, princípios) | ✅ |
| Página Projetos (títulos, descrições, CTAs, Em Breve) | ✅ |

### Favicon e Título da Aba

- **Título estático**: "Leandro Dukiévicz" — definido no metadata do `layout.tsx` e reforçado pelo `MarqueeTitle` client-side
- **Favicon rotativo**: 4 ícones SVG ciclando a cada 800ms via `setInterval` (código, café, xícara, infinito) — injetados dinamicamente no `<link rel="icon">`

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

**JSON-LD Schemas:**

| Schema | Localização | Conteúdo |
|---|---|---|
| `Person` | `layout.tsx` (global) | nome, URL, jobTitle, sameAs, knowsAbout, endereço |
| `ProfilePage` | `page.tsx` (home) | tipo, nome, URL via `buildPageSchema` |
| `FAQPage` | `page.tsx` (home) | 5 perguntas frequentes sobre o desenvolvedor |
| `WebPage` | cada `layout.tsx` por rota | título e descrição da página |

### Segurança e Cache (`next.config.ts`)

**Headers de segurança** aplicados globalmente via `withAeo()`:

| Header | Valor |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
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

### Página 404 Customizada

`app/not-found.tsx` — exibida automaticamente pelo Next.js em qualquer rota inexistente:
- Fundo `CyberpunkBackground` — consistência visual com o restante do site
- "404" em gradiente neon `#00EAFF → #BD00FF → #FF2D78`
- Link de retorno para a home

### Analytics

- **Vercel Analytics** — rastreamento de pageviews e eventos via `<Analytics />`
- **Vercel Speed Insights** — monitoramento de performance (Core Web Vitals) via `<SpeedInsights />`
- Ambos injetados no `layout.tsx` sem impacto no bundle do cliente

### MenuBar

- Título traduzível via i18n
- Relógio em tempo real com formato `Dia Mês HH:MM AM/PM` (oculto em telas `< sm`)
- Ícone de idioma — alterna PT ↔ EN com indicador textual
- Oculta automaticamente em `/blog`
- **Mobile**: posicionada em `left: 54px` (após a dock vertical) até `right: 0`, garantindo visibilidade total — `z-index: 200` acima de todos os elementos
- **Desktop**: posicionada `left: 0 right: 0` cobrindo a largura total

### Dock

- 7 ícones: Home, Sobre, Skills, Projetos, Contato, Terminal, Blog
- **Desktop (≥ 768px)**: dock horizontal fixa no rodapé centralizada com **efeito de zoom GSAP** (magnification)
- **Mobile (< 768px)**: dock vertical fixa no lado esquerdo, ocupa 100% da altura, itens distribuídos com `flex-1`; ícone Terminal oculto em mobile
- Labels traduzíveis via i18n
- `body` recebe `pl-[54px] md:pl-0` para compensar a largura da dock no mobile

### Background

- 7 blobs coloridos (`#BD00FF`, `#FF00FF`, `#FF2D78`, `#0052F5`, `#00EAFF`, `#7B00FF`, `#FF6600`)
- Animados via `requestAnimationFrame` com bounce nas bordas e nudge aleatório
- **Delta time normalizado** — velocidade constante independentemente do tempo na página (sem aceleração progressiva)
- `SPEED = 0.12`, `CLAMP = 0.18` — velocidade suave e consistente em todas as telas
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

### Responsividade

O site é totalmente responsivo de **320px a 1920px+**, seguindo a abordagem mobile-first:

| Elemento | Mobile (< 768px) | Desktop (≥ 768px) |
|---|---|---|
| Dock | Vertical, lado esquerdo, 54px largura | Horizontal, rodapé centralizado |
| MenuBar | `left: 54px → right: 0` | `left: 0 → right: 0` |
| Janelas (Sobre, Skills) | `left: 62px`, `width: calc(100vw - 70px)` | `left: 10vw`, `width: 80vw` |
| Janela Contato | `left: 62px`, `width: calc(100vw - 70px)` | `left: 20vw`, `width: 60vw` |
| Cards Projetos | Altura `(innerHeight - 100) / 1.1`, imagem 35% | Altura fixa 460–580px |
| Grids Skills | `minmax(80px)` / `minmax(72px)` | `minmax(107px)` / `minmax(88px)` |
| `<main>` | `w-full` (100% da área sem a dock) | `w-full` |
| Body padding | `pl-[54px]` | `pl-0` |

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
| [Resend](https://resend.com/) | Envio de email de notificação por novo assinante |
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
│   ├── Dock.tsx                 # Dock horizontal (desktop, 30px bottom) / vertical (mobile)
│   ├── HeroPhoto.tsx            # Foto hexagonal com parallax, glitch e bordas animadas
│   ├── MenuBar.tsx              # Barra superior com relógio e seletor de idioma
│   ├── MarqueeTitle.tsx         # Título estático "Leandro Dukiévicz" + favicon rotativo (4 ícones SVG)
│   ├── TerminalWindow.tsx       # Terminal interativo com resize e drag
│   ├── LoadingScreen.tsx        # Loading screen primeira visita (espiral girassol)
│   └── VisitorGreeting.tsx      # Toast de boas-vindas com geolocalização
├── context/
│   ├── TerminalContext.tsx      # Estado global do terminal e hire flow
│   └── LanguageContext.tsx      # Estado global de idioma e traduções (PT/EN)
├── blog/
│   └── LiquidGlassBlog.tsx      # ScrambleText + formulário de inscrição + integração Notion
├── sobre/                       # Janela macOS — foto holográfica + timeline
├── skills/                      # Janela macOS — hard skills + flip cards preenchidos + princípios
├── projetos/                    # CoverFlow 3D carousel com cards de projeto
├── contato/                     # Janela macOS — ícones de contato + formulário
├── layout.tsx                   # Layout global — metadata SEO, JSON-LD, Analytics, Providers
└── page.tsx                     # Home — hero, foto hexagonal, CTAs
public/
├── images/
│   ├── projetos/                # Screenshots dos projetos (.webp)
│   ├── astronautas.svg          # SVG do astronauta (blog)
│   ├── foto-1.webp              # Foto da home (hexagonal)
│   ├── foto-sobre.webp          # Foto holográfica (sobre)
│   └── *.webp                   # Ícones de contato (GitHub, LinkedIn, etc.)
└── cv.pdf                       # Currículo para download
lib/
└── emailValidation.ts           # Regex, lista de domínios descartáveis, helpers de validação
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
| `v2.2.0` | 2026-03-16 | Skills: flip cards preenchem o espaço (gridAutoRows 1fr, alignContent stretch, último card 1/-1); Dock 30px do bottom |
| `v2.3.0` | 2026-03-16 | Blog: remove tema claro — apenas dark e dim disponíveis; astronaut-color ativa em ambos os temas |
| `v2.4.0` | 2026-03-17 | SEO completo — metadata, OpenGraph, Twitter Card, JSON-LD Person, canonical (`devleandro.com.br`) |
| `v2.5.0` | 2026-03-17 | Título estático "Leandro Dukiévicz" na aba; favicon rotativo com 4 ícones SVG; Vercel Analytics + Speed Insights |

---

## Autor

**Leandro Dukievicz** — Desenvolvedor Front-End

---

## Licença

Este projeto é de uso pessoal. Todos os direitos reservados.
