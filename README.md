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

---

## Autor

**Leandro Dukievicz** — Desenvolvedor Front-End

---

## Licença

Este projeto é de uso pessoal. Todos os direitos reservados.
