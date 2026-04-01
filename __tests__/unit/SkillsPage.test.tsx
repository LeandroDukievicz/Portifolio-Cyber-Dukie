/**
 * Testes Unitários — Skills Page
 *
 * Valida a renderização e estrutura do conteúdo da página /skills
 * após a refatoração para o novo layout com glassmorphism.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/app/context/LanguageContext";
import SkillsPage from "@/app/skills/page";

jest.mock("@/app/components/CyberpunkBackground", () => ({
  default: () => <div aria-hidden="true" />,
}));

jest.mock("@/lib/schema", () => ({
  buildPageSchema: jest.fn().mockReturnValue({}),
}));

function renderSkills() {
  return render(
    <LanguageProvider>
      <SkillsPage />
    </LanguageProvider>
  );
}

// ── Título da janela ─────────────────────────────────────────────────────────

describe("Skills — Título da janela", () => {
  it("exibe o título experiencia.txt na barra de título", () => {
    renderSkills();
    expect(screen.getByText("experiencia.txt")).toBeInTheDocument();
  });
});

// ── Cards de especialização ──────────────────────────────────────────────────

describe("Skills — Cards de especialização", () => {
  it("renderiza os 4 títulos de especialização", () => {
    renderSkills();
    expect(screen.getByText("Frontend & UI Performance")).toBeInTheDocument();
    expect(screen.getByText("Backend & APIs")).toBeInTheDocument();
    expect(screen.getByText("Banco de Dados")).toBeInTheDocument();
    expect(screen.getByText("DevOps & Tooling")).toBeInTheDocument();
  });

  it("renderiza as descrições dos cards", () => {
    renderSkills();
    expect(screen.getByText(/SPAs, SSR\/SSG/i)).toBeInTheDocument();
    expect(screen.getByText(/APIs REST/i)).toBeInTheDocument();
    expect(screen.getByText(/Modelagem relacional/i)).toBeInTheDocument();
    expect(screen.getByText(/Containerização/i)).toBeInTheDocument();
  });

  it("renderiza as tags de tecnologia dos cards", () => {
    renderSkills();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Laravel")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
  });
});

// ── Princípios de engenharia ─────────────────────────────────────────────────

describe("Skills — Princípios de engenharia", () => {
  it("exibe o título da seção", () => {
    renderSkills();
    expect(screen.getByText(/princípios de engenharia/i)).toBeInTheDocument();
  });

  it("renderiza todos os 6 princípios", () => {
    renderSkills();
    expect(screen.getByText(/Componentes com responsabilidade única/i)).toBeInTheDocument();
    expect(screen.getByText(/Performance como requisito/i)).toBeInTheDocument();
    expect(screen.getByText(/Nomear pelo que faz/i)).toBeInTheDocument();
    expect(screen.getByText(/Code review como transferência/i)).toBeInTheDocument();
    expect(screen.getByText(/Abstrações só quando o padrão/i)).toBeInTheDocument();
    expect(screen.getByText(/Documentar decisões de arquitetura/i)).toBeInTheDocument();
  });
});

// ── Stack completa ───────────────────────────────────────────────────────────

describe("Skills — Stack completa", () => {
  it("exibe o label da seção", () => {
    renderSkills();
    expect(screen.getByText(/stack completa/i)).toBeInTheDocument();
  });

  it("renderiza os itens principais da stack", () => {
    renderSkills();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("MySQL")).toBeInTheDocument();
    expect(screen.getByText("Git")).toBeInTheDocument();
  });
});

// ── Soft Skills ──────────────────────────────────────────────────────────────

describe("Skills — Soft Skills", () => {
  it("exibe o label da seção", () => {
    renderSkills();
    expect(screen.getByText(/soft skills/i)).toBeInTheDocument();
  });

  it("renderiza os termos em destaque do parágrafo", () => {
    renderSkills();
    expect(screen.getByText(/Resolução de problemas/i)).toBeInTheDocument();
    expect(screen.getByText(/comunicação clara/i)).toBeInTheDocument();
    expect(screen.getByText(/aprendizado contínuo/i)).toBeInTheDocument();
    expect(screen.getByText(/atenção a detalhes/i)).toBeInTheDocument();
    expect(screen.getByText(/adaptabilidade/i)).toBeInTheDocument();
  });
});

// ── Estrutura da janela ──────────────────────────────────────────────────────

describe("Skills — Estrutura da janela", () => {
  it("renderiza o elemento main com id main-content", () => {
    const { container } = renderSkills();
    expect(container.querySelector("#main-content")).toBeInTheDocument();
  });

  it("renderiza a janela com classe window-rise", () => {
    const { container } = renderSkills();
    expect(container.querySelector(".window-rise")).toBeInTheDocument();
  });

  it("barra de título contém os três pontos decorativos", () => {
    const { container } = renderSkills();
    const dots = container.querySelectorAll("span[aria-hidden='true']");
    expect(dots.length).toBeGreaterThanOrEqual(3);
  });
});
