"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "pt" | "en";

export const translations = {
  pt: {
    portfolioTitle: "Portfólio v1.0.0",
    subtitle: "Desenvolvedor Front-End",
    bio: "Sou aficcionado em Tecnologia no geral, Em constante estudo e avanço para um aperfeiçoamento contínuo em desenvolver interfaces que sejam elegantes e ao mesmo tempo fáceis, intuitivas e bem modernas, Buscando sempre entregar melhor performance, detalhes e fluidez, porque acredito que as melhores interfaces são aquelas que desaparecem para o usuário final, deixando apenas a experiência.",
    ctaHire: "Contrate-me",
    ctaCV: "Baixar CV",
    dock: {
      home: "Home",
      about: "Sobre",
      skills: "Skills",
      projects: "Projetos",
      contact: "Contato",
      terminal: "Terminal",
      blog: "Blog",
    },
    terminal: {
      boot: [
        { kind: "input",  text: "whoami" },
        { kind: "output", text: "Leandro Dukievicz" },
        { kind: "input",  text: "cat sobre.txt" },
        { kind: "output", text: "Front End - Transformando cafeína em interfaces desde 2021" },
        { kind: "input",  text: "ls skills/" },
        { kind: "output", text: "React  Next.js  TypeScript  Figma  Node  ..." },
        { kind: "input",  text: "./status.sh" },
        { kind: "output", text: "● Disponível para projetos" },
      ],
      help: [
        "Comandos disponíveis:",
        "  home         → página inicial",
        "  cv           → baixar currículo",
        "  sobre        → página sobre mim",
        "  skills       → minhas habilidades",
        "  projetos     → meus projetos",
        "  contato      → entrar em contato",
        "  blog         → meu blog",
        "  hacker       → ativar tema hacker [em breve]",
        "  sudo hire-me → 👀",
        "  clear        → limpar terminal",
        "  exit / sair  → fechar terminal",
        "  help         → mostrar esta ajuda",
      ],
      cmdDownloading: "Baixando currículo...",
      cmdOpening: (page: string) => `Abrindo ${page}...`,
      cmdVerifying: "Verificando credenciais...",
      cmdAccessGranted: "✔ Acesso concedido. Baixando currículo...",
      cmdNotFound: (cmd: string) => `comando não encontrado: ${cmd}. Digite 'help'.`,
      cmdHackerSoon: "⚠ Tema hacker em desenvolvimento...",
      cmdHackerWait: "Aguarde a próxima versão.",
      cmdGoodbye: "Até logo!",
      inputHint: "— digite",
      inputHintCmd: "help",
      inputHintSuffix: "para ver todos os comandos",
      header: "guest@portfolio ~ zsh",
      toast: "Permissão Autorizada !!",
      modalTitle: "Obrigado pelo download!",
      modalMessage: "Fico muito feliz com seu interesse.\nEstou à inteira disposição para conversarmos\npessoalmente — será um prazer!",
      modalClose: "Fechar",
    },
    greeting: {
      default: "Olá! Seja bem-vindo ao meu portfólio.",
      withLocation: (loc: string) => `Olá, visitante de ${loc}! Seja bem-vindo.`,
      clickToClose: "clique para fechar",
    },
    marquee: "Bem vindo ao meu portifólio | Leandro Dukievicz | Dev Front End \u00a0\u00a0\u00a0",
  },
  en: {
    portfolioTitle: "Portfolio v1.0.0",
    subtitle: "Front-End Developer",
    bio: "I am passionate about Technology in general, constantly studying and advancing for continuous improvement in developing interfaces that are elegant, easy to use, intuitive, and highly modern. Always striving to deliver better performance, details, and fluidity — because I believe the best interfaces are those that disappear for the end user, leaving only the experience.",
    ctaHire: "Hire me",
    ctaCV: "Download CV",
    dock: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      terminal: "Terminal",
      blog: "Blog",
    },
    terminal: {
      boot: [
        { kind: "input",  text: "whoami" },
        { kind: "output", text: "Leandro Dukievicz" },
        { kind: "input",  text: "cat about.txt" },
        { kind: "output", text: "Front End - Turning caffeine into interfaces since 2021" },
        { kind: "input",  text: "ls skills/" },
        { kind: "output", text: "React  Next.js  TypeScript  Figma  Node  ..." },
        { kind: "input",  text: "./status.sh" },
        { kind: "output", text: "● Available for projects" },
      ],
      help: [
        "Available commands:",
        "  home         → home page",
        "  cv           → download resume",
        "  about        → about me page",
        "  skills       → my skills",
        "  projects     → my projects",
        "  contact      → get in touch",
        "  blog         → my blog",
        "  hacker       → enable hacker theme [coming soon]",
        "  sudo hire-me → 👀",
        "  clear        → clear terminal",
        "  exit / quit  → close terminal",
        "  help         → show this help",
      ],
      cmdDownloading: "Downloading resume...",
      cmdOpening: (page: string) => `Opening ${page}...`,
      cmdVerifying: "Verifying credentials...",
      cmdAccessGranted: "✔ Access granted. Downloading resume...",
      cmdNotFound: (cmd: string) => `command not found: ${cmd}. Type 'help'.`,
      cmdHackerSoon: "⚠ Hacker theme in development...",
      cmdHackerWait: "Wait for the next version.",
      cmdGoodbye: "Goodbye!",
      inputHint: "— type",
      inputHintCmd: "help",
      inputHintSuffix: "to see all commands",
      header: "guest@portfolio ~ zsh",
      toast: "Access Granted !!",
      modalTitle: "Thanks for the download!",
      modalMessage: "I'm very glad for your interest.\nI'm fully available to chat\nin person — it will be a pleasure!",
      modalClose: "Close",
    },
    greeting: {
      default: "Hello! Welcome to my portfolio.",
      withLocation: (loc: string) => `Hello, visitor from ${loc}! Welcome.`,
      clickToClose: "click to close",
    },
    marquee: "Welcome to my portfolio | Leandro Dukievicz | Front End Dev \u00a0\u00a0\u00a0",
  },
} as const;

interface LanguageCtx {
  lang: Lang;
  t: typeof translations["pt"];
  toggle: () => void;
}

const Ctx = createContext<LanguageCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  const toggle = () => setLang(l => (l === "pt" ? "en" : "pt"));

  return (
    <Ctx.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
