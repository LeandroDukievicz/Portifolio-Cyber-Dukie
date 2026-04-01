/**
 * Testes Unitários — app/faq/page.tsx
 *
 * Cobrem o comportamento do componente FAQ isolado do browser:
 * - Renderização das 13 perguntas em PT e EN
 * - Accordion: abre ao clicar, fecha ao clicar novamente
 * - Apenas um item aberto por vez
 * - Botão CTA está presente e aponta para /contato
 * - Texto do cabeçalho muda conforme o idioma
 */

import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/app/context/LanguageContext";
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";

// ── Mocks ──────────────────────────────────────────────────────────────────

jest.mock("@/app/components/CyberpunkBackground", () => ({
  __esModule: true,
  default: () => <div data-testid="cyberpunk-bg" aria-hidden="true" />,
}));

jest.mock("react-icons/io5", () => ({
  IoChevronDownOutline: () => <span data-testid="icon-down" />,
  IoChevronUpOutline: () => <span data-testid="icon-up" />,
}));


// ── Helpers ────────────────────────────────────────────────────────────────

import FaqPage from "@/app/faq/page";

function renderWithLang(lang: "pt" | "en" = "pt") {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <LanguageProvider>{children}</LanguageProvider>;
  }

  const utils = render(
    <Wrapper>
      <FaqPage />
    </Wrapper>
  );

  if (lang === "en") {
    // Buscar o botão de toggle e clicar para mudar para EN
    const toggleBtn = utils.container.querySelector("[title]") as HTMLElement | null;
    // Usar o hook diretamente não é possível aqui, então vamos usar um componente intermediário
  }

  return utils;
}

function renderFaqWithToggle() {
  let toggleFn: (() => void) | null = null;

  function ToggleWrapper({ children }: { children: React.ReactNode }) {
    return <LanguageProvider>{children}</LanguageProvider>;
  }

  function ToggleCapture() {
    const { toggle } = useLanguage();
    toggleFn = toggle;
    return null;
  }

  const utils = render(
    <ToggleWrapper>
      <ToggleCapture />
      <FaqPage />
    </ToggleWrapper>
  );

  return { ...utils, toggle: () => toggleFn && act(() => toggleFn!()) };
}

// ── Perguntas esperadas ───────────────────────────────────────────────────

const PERGUNTAS_PT = [
  "Quem é Leandro?",
  "Você é Freelancer ou trabalha em projetos de longo prazo?",
  "Você trabalha com CLT ou PJ?",
  "Qual sua disponibilidade atual?",
  "Como você garante que prazos serão cumpridos?",
  "Como você toma decisões técnicas?",
  "Você segue padrões de código?",
  "Como você lida com performance?",
  "Como é a sua comunicação durante o projeto?",
  "Você usa IA no seu processo?",
  "Onde posso ver seus projetos?",
  "Por que você deveria me escolher para trabalhar?",
  "Podemos conversar antes de fechar algo?",
];

const PERGUNTAS_EN = [
  "Who is Leandro?",
  "Are you a Freelancer or do you work on long-term projects?",
  "Do you work as an employee (CLT) or contractor (PJ)?",
  "What is your current availability?",
  "How do you ensure deadlines are met?",
  "How do you make technical decisions?",
  "Do you follow coding standards?",
  "How do you handle performance?",
  "How do you communicate during a project?",
  "Do you use AI in your process?",
  "Where can I see your projects?",
  "Why should you choose me to work with?",
  "Can we talk before closing anything?",
];

// ── Testes de renderização ─────────────────────────────────────────────────

describe("FaqPage — renderização em PT", () => {
  it("renderiza sem crash", () => {
    expect(() => renderWithLang("pt")).not.toThrow();
  });

  it("exibe heading 'Perguntas Frequentes'", () => {
    renderWithLang("pt");
    expect(screen.getByText("Perguntas Frequentes")).toBeInTheDocument();
  });

  it("exibe o título correto na barra", () => {
    renderWithLang("pt");
    expect(screen.getByText(/FAQ\.md — Trabalhando com Leandro/i)).toBeInTheDocument();
  });

  it("exibe exatamente 13 perguntas", () => {
    renderWithLang("pt");
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(13);
  });

  it.each(PERGUNTAS_PT)("exibe a pergunta '%s'", (pergunta) => {
    renderWithLang("pt");
    expect(screen.getByText(pergunta)).toBeInTheDocument();
  });
});

describe("FaqPage — renderização em EN", () => {
  it("exibe heading 'Frequently Asked Questions' após toggle", () => {
    const { toggle } = renderFaqWithToggle();
    toggle();
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("exibe título correto na barra em EN", () => {
    const { toggle } = renderFaqWithToggle();
    toggle();
    expect(screen.getByText(/FAQ\.md — Working with Leandro/i)).toBeInTheDocument();
  });

  it("exibe exatamente 13 perguntas em EN", () => {
    const { toggle } = renderFaqWithToggle();
    toggle();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(13);
  });

  it.each(PERGUNTAS_EN)("exibe a pergunta '%s' em EN", (pergunta) => {
    const { toggle } = renderFaqWithToggle();
    toggle();
    expect(screen.getByText(pergunta)).toBeInTheDocument();
  });
});

// ── Testes do Accordion ────────────────────────────────────────────────────

describe("FaqPage — comportamento do accordion", () => {
  it("nenhuma resposta está visível inicialmente", () => {
    renderWithLang("pt");
    // Resposta da primeira pergunta não deve estar no DOM antes de clicar
    expect(
      screen.queryByText(/Sou um Desenvolvedor Full Stack focado/i)
    ).not.toBeInTheDocument();
  });

  it("clicar em uma pergunta exibe a resposta", () => {
    renderWithLang("pt");
    const btn = screen.getByText("Quem é Leandro?").closest("button")!;
    fireEvent.click(btn);
    expect(
      screen.getByText(/Sou um Desenvolvedor Full Stack focado/i)
    ).toBeInTheDocument();
  });

  it("clicar novamente na pergunta fechada esconde a resposta", () => {
    renderWithLang("pt");
    const btn = screen.getByText("Quem é Leandro?").closest("button")!;
    fireEvent.click(btn);
    expect(screen.getByText(/Sou um Desenvolvedor Full Stack focado/i)).toBeInTheDocument();
    fireEvent.click(btn);
    expect(
      screen.queryByText(/Sou um Desenvolvedor Full Stack focado/i)
    ).not.toBeInTheDocument();
  });

  it("abre outro item e fecha o anterior (apenas um aberto por vez)", () => {
    renderWithLang("pt");

    const btn1 = screen.getByText("Quem é Leandro?").closest("button")!;
    const btn2 = screen.getByText("Você é Freelancer ou trabalha em projetos de longo prazo?").closest("button")!;

    fireEvent.click(btn1);
    expect(screen.getByText(/Sou um Desenvolvedor Full Stack/i)).toBeInTheDocument();

    fireEvent.click(btn2);
    // Resposta 1 some, resposta 2 aparece
    expect(
      screen.queryByText(/Sou um Desenvolvedor Full Stack/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Além de atuar como freelancer/i)).toBeInTheDocument();
  });

  it("ícone de seta muda ao abrir e fechar", () => {
    renderWithLang("pt");
    const btn = screen.getByText("Quem é Leandro?").closest("button")!;

    // Fechado: ícone down presente
    expect(within(btn).getByTestId("icon-down")).toBeInTheDocument();

    fireEvent.click(btn);

    // Aberto: ícone up presente
    expect(within(btn).getByTestId("icon-up")).toBeInTheDocument();
  });

  it("resposta da pergunta 5 (prazos) exibe texto correto", () => {
    renderWithLang("pt");
    const btn = screen.getByText("Como você garante que prazos serão cumpridos?").closest("button")!;
    fireEvent.click(btn);
    expect(screen.getByText(/Eu não tenho costume de tratar prazo/i)).toBeInTheDocument();
  });

  it("resposta da pergunta 10 (IA) exibe texto correto", () => {
    renderWithLang("pt");
    const btn = screen.getByText("Você usa IA no seu processo?").closest("button")!;
    fireEvent.click(btn);
    expect(screen.getByText(/Com certeza, baita ferramenta/i)).toBeInTheDocument();
  });

  it("resposta da última pergunta (conversar) exibe texto correto", () => {
    renderWithLang("pt");
    const btn = screen.getByText("Podemos conversar antes de fechar algo?").closest("button")!;
    fireEvent.click(btn);
    expect(screen.getByText(/Uma call de meia hora/i)).toBeInTheDocument();
  });
});

// ── Testes do CTA ──────────────────────────────────────────────────────────

describe("FaqPage — botão CTA", () => {
  it("CTA em PT está presente", () => {
    renderWithLang("pt");
    expect(
      screen.getByText(/Vamos conversar sobre seu Projeto\?/i)
    ).toBeInTheDocument();
  });

  it("CTA em EN aparece após toggle de idioma", () => {
    const { toggle } = renderFaqWithToggle();
    toggle();
    expect(
      screen.getByText(/Let's talk about your Project\?/i)
    ).toBeInTheDocument();
  });

  it("CTA é um link apontando para /contato", () => {
    renderWithLang("pt");
    const link = screen.getByText(/Vamos conversar sobre seu Projeto\?/i).closest("a");
    expect(link).toHaveAttribute("href", "/contato");
  });

  it("CTA em EN também aponta para /contato", () => {
    const { toggle } = renderFaqWithToggle();
    toggle();
    const link = screen.getByText(/Let's talk about your Project\?/i).closest("a");
    expect(link).toHaveAttribute("href", "/contato");
  });
});

// ── Testes de estrutura DOM ─────────────────────────────────────────────────

describe("FaqPage — estrutura DOM", () => {
  it("tem main com id 'main-content' para acessibilidade", () => {
    renderWithLang("pt");
    expect(document.getElementById("main-content")).toBeInTheDocument();
  });

  it("botões do accordion têm type='button' (não submete formulário)", () => {
    renderWithLang("pt");
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("type", "button");
    });
  });

  it("prefixo '>' está presente nos botões e no CTA", () => {
    renderWithLang("pt");
    // 13 perguntas + 1 botão CTA
    const arrows = screen.getAllByText(">");
    expect(arrows.length).toBe(14);
  });
});
