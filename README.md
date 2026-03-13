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

A página `/sobre` é renderizada como uma janela flutuante sobre o background animado, com todos os controles macOS funcionais:

- **Botão vermelho** — fecha e navega para `/`
- **Botão amarelo** — minimiza a janela (height colapsa para 42px com transição suave)
- **Botão verde** — alterna fullscreen (cobre todo o viewport)
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

Mesma estrutura de janela glassmorphism das demais páginas: title bar com traffic lights (vermelho fecha e navega para `/`, amarelo e verde decorativos), `backdrop-filter: blur(12px)`, entrada animada via classe `window-rise`, responsiva (96vw mobile / 80vw desktop).

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
- Clique alterna o estado `flippedCard` — rotaciona 180° em Y via CSS `transform-style: preserve-3d` + `rotateY(180deg)` com transição de 0.45s
- Apenas um card vira por vez (clicar outro reseta o anterior)
- `backface-visibility: hidden` para esconder a face oposta

**12 soft skills:**
Resolução de problemas, Pensamento analítico, Comunicação clara, Trabalho em equipe, Aprendizado contínuo, Adaptabilidade, Organização, Atenção aos detalhes, Proatividade, Pensamento crítico, Gestão do tempo, Inteligência emocional.

Cores alternadas entre `#00EAFF`, `#BD00FF` e `#FF2D78`.

### Card especial — Princípios de Engenharia

O último item do grid de soft skills (`TbCode` — "Princípios de Engenharia") tem comportamento diferente dos outros:
- Ocupa **2 colunas centrais** (`gridColumn: "2 / 4"`) para destaque visual
- Exibe "ver →" abaixo do label
- Ao clicar **não vira** — em vez disso abre um painel sobreposto deslizando da direita (`translateX(28px) → 0` + opacity 0→1 em 0.38s)

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

---

## Stack

| Tecnologia | Uso |
|---|---|
| [Next.js 15](https://nextjs.org/) | Framework React com App Router |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização utilitária |
| [GSAP](https://gsap.com/) | Animação da Dock |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Efeito de confete |
| [react-icons](https://react-icons.github.io/react-icons/) | Ícones |

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
│   ├── TerminalWindow.tsx       # Terminal interativo com resize e auto-close
│   └── VisitorGreeting.tsx      # Toast de boas-vindas com geolocalização
├── context/
│   ├── TerminalContext.tsx      # Estado global do terminal e hire flow
│   └── LanguageContext.tsx      # Estado global de idioma e traduções (PT/EN)
├── blog/                        # Página do blog
├── sobre/                       # Página sobre (janela estilo macOS)
├── skills/                      # Página de habilidades
├── projetos/                    # Página de projetos
├── contato/                     # Página de contato
├── layout.tsx                   # Layout global
└── page.tsx                     # Home ✅ Concluída
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
| `v1.2.0` | 2026-03-13 | Página Skills — hard skills com stagger, flip cards, princípios de engenharia |

---

## Autor

**Leandro Dukievicz** — Desenvolvedor Front-End

---

## Licença

Este projeto é de uso pessoal. Todos os direitos reservados.
