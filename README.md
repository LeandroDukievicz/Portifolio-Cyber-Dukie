# Portfólio Cyberpunk — Leandro Dukievicz

> Portfólio pessoal desenvolvido com estética cyberpunk, interatividade avançada e animações fluidas.

---

## Visão Geral

Portfólio construído para apresentar projetos, habilidades e informações profissionais de forma imersiva. A interface combina elementos visuais cyberpunk com componentes interativos inspirados no macOS — dock animada, terminal funcional e parallax na foto de perfil.

---

## Features

- **Terminal macOS interativo** — boot sequence animada com auto-typing, comandos navegáveis, drag & drop, minimizar e maximizar
- **Dock estilo macOS** — efeito de zoom com GSAP ao passar o mouse, responsiva em mobile (grid 4 colunas)
- **Foto hexagonal com parallax** — clip-path hexagonal, efeito RGB glitch animado e cursor customizado no hover
- **MenuBar** — barra superior com relógio em tempo real e adaptação de tema por rota
- **Saudação ao visitante** — toast personalizado com cidade do visitante via geolocalização IP (ipapi.co)
- **Background cyberpunk** — gradiente animado via `requestAnimationFrame`
- **Glassmorphism** — `backdrop-filter` em todos os componentes principais
- **Responsivo** — mobile, tablet e desktop

---

## Comandos do Terminal

| Comando | Ação |
|---|---|
| `home` | Página inicial |
| `sobre` | Página sobre mim |
| `skills` | Minhas habilidades |
| `projetos` | Meus projetos |
| `contato` | Entrar em contato |
| `blog` | Meu blog |
| `cv` | Baixar currículo |
| `sudo hire-me` | 🎉 Surpresa |
| `hacker` | Tema hacker *(em breve)* |
| `clear` | Limpar terminal |
| `exit` / `sair` | Fechar terminal |
| `help` | Listar todos os comandos |

---

## Stack

| Tecnologia | Uso |
|---|---|
| [Next.js 14](https://nextjs.org/) | Framework React com App Router |
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
│   ├── CyberpunkBackground.tsx  # Background animado
│   ├── Dock.tsx                 # Dock estilo macOS
│   ├── HeroPhoto.tsx            # Foto hexagonal com parallax e glitch
│   ├── MenuBar.tsx              # Barra superior com relógio
│   ├── MarqueeTitle.tsx         # Marquee animado
│   ├── TerminalWindow.tsx       # Terminal interativo
│   └── VisitorGreeting.tsx      # Toast de boas-vindas
├── context/
│   └── TerminalContext.tsx      # Estado global do terminal
├── blog/                        # Página do blog
├── sobre/                       # Página sobre
├── skills/                      # Página de habilidades
├── projetos/                    # Página de projetos
├── contato/                     # Página de contato
├── layout.tsx                   # Layout global
└── page.tsx                     # Home
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
| `v1.0.0` | 2026-03-11 | Primeira versão estável |

---

## Autor

**Leandro Dukievicz** — Desenvolvedor Front-End

---

## Licença

Este projeto é de uso pessoal. Todos os direitos reservados.
