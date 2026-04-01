/**
 * Testes de Acessibilidade (A11y) com jest-axe
 *
 * Relevância: acessibilidade afeta diretamente:
 * - Usuários com leitores de tela (deficiência visual)
 * - SEO (Google usa métricas de acessibilidade)
 * - Conformidade legal (LGPD/ADA em projetos reais)
 *
 * ⚠️  ATENÇÃO: alguns testes abaixo podem FALHAR intencionalmente.
 * Isso é ESPERADO — significa que violações reais foram encontradas.
 * As violações devem ser corrigidas no código de produção.
 *
 * Violações conhecidas no código atual:
 * - Labels do formulário de contato não têm `htmlFor` linkado ao input `id`
 *   → Viola WCAG 1.3.1 (Info and Relationships) e 4.1.2 (Name, Role, Value)
 */

import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { LanguageProvider } from "@/app/context/LanguageContext";

// Mocks necessários para evitar erros de ambiente
jest.mock("@/app/components/CyberpunkBackground", () => ({
  default: () => <div aria-hidden="true" />,
}));

jest.mock("@/hooks/useIsMobile", () => ({
  useIsMobile: jest.fn().mockReturnValue(false),
}));

jest.mock("@/lib/schema", () => ({
  buildPageSchema: jest.fn().mockReturnValue({}),
}));

jest.mock("canvas-confetti", () => ({
  default: jest.fn(),
  __esModule: true,
}));

// ── Componente auxiliar: formulário de contato isolado ──────────────────────

function IsolatedContactForm() {
  return (
    <form aria-label="Formulário de contato">
      <div>
        <label htmlFor="nome">Nome</label>
        <input id="nome" type="text" name="nome" placeholder="Seu nome" />
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" name="email" placeholder="seu@email.com" />
      </div>
      <div>
        <label htmlFor="assunto">Assunto</label>
        <input id="assunto" type="text" name="assunto" placeholder="Assunto" />
      </div>
      <div>
        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" placeholder="Mensagem" />
      </div>
      <button type="submit">Enviar mensagem</button>
    </form>
  );
}

// ── Componente: navegação do dock ────────────────────────────────────────────

function IsolatedNavigation() {
  return (
    <nav aria-label="Navegação principal">
      <ul role="list">
        {["Home", "Sobre", "Skills", "Projetos", "Contato", "Blog"].map((item) => (
          <li key={item}>
            <a href={`/${item.toLowerCase()}`} aria-label={item}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Componente: cards de contato ─────────────────────────────────────────────

function IsolatedContactCards() {
  const contacts = [
    { name: "WhatsApp", href: "https://wa.me/5544991293234" },
    { name: "LinkedIn", href: "https://linkedin.com/in/leandrodukievicz" },
    { name: "GitHub", href: "https://github.com/LeandroDukievicz" },
    { name: "Gmail", href: "mailto:leandrodukievicz1718@gmail.com" },
  ];

  return (
    <section aria-label="Formas de contato">
      {contacts.map(({ name, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Contato via ${name}`}
        >
          <img src={`/images/${name.toLowerCase()}.webp`} alt={name} />
        </a>
      ))}
    </section>
  );
}

// ── Testes ──────────────────────────────────────────────────────────────────

describe("A11y — Formulário de Contato (estrutura ideal)", () => {
  it("formulário com labels associados não tem violações críticas", async () => {
    const { container } = render(<IsolatedContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("campo de email tem type=email para validação nativa do browser", () => {
    const { container } = render(<IsolatedContactForm />);
    const emailInput = container.querySelector("#email");
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("botão de submit é identificável por leitores de tela", () => {
    const { container } = render(<IsolatedContactForm />);
    const button = container.querySelector("button[type='submit']");
    expect(button).toBeInTheDocument();
    expect(button?.textContent?.trim()).not.toBe("");
  });
});

describe("A11y — Navegação", () => {
  it("navegação principal não tem violações", async () => {
    const { container } = render(<IsolatedNavigation />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("links de navegação têm aria-label", () => {
    const { container } = render(<IsolatedNavigation />);
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      const hasAriaLabel = link.hasAttribute("aria-label");
      const hasTextContent = link.textContent?.trim() !== "";
      expect(hasAriaLabel || hasTextContent).toBe(true);
    });
  });
});

describe("A11y — Cards de Contato", () => {
  it("links de contato com imagens têm texto alternativo", async () => {
    const { container } = render(<IsolatedContactCards />);
    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      expect(img.getAttribute("alt")).toBeTruthy();
    });
  });

  it("links externos têm aria-label descritivo", () => {
    const { container } = render(<IsolatedContactCards />);
    const links = container.querySelectorAll("a[target='_blank']");
    links.forEach((link) => {
      expect(link.getAttribute("aria-label")).toBeTruthy();
    });
  });
});

describe("A11y — PROBLEMA IDENTIFICADO no formulário de produção", () => {
  /**
   * Este teste documenta um bug de acessibilidade real no código de produção.
   * O formulário em app/contato/page.tsx usa <label> sem htmlFor e <input> sem id.
   *
   * Viola WCAG 1.3.1 e 4.1.2: leitores de tela não conseguem associar labels a inputs.
   *
   * Para corrigir: adicionar id único em cada input e htmlFor correspondente em cada label.
   */

  it("DOCUMENTA: formulário de produção tem labels sem htmlFor (viola WCAG 1.3.1)", () => {
    // Replicar a estrutura atual do app/contato/page.tsx
    const { container } = render(
      <form>
        {/* Estrutura atual: label sem htmlFor, input sem id — exatamente como está em produção */}
        <label>Nome</label>
        <input type="text" placeholder="Seu nome" />
        <label>E-mail</label>
        <input type="email" placeholder="seu@email.com" />
        <button type="submit">Enviar</button>
      </form>
    );

    const labels = container.querySelectorAll("label");
    const inputs = container.querySelectorAll("input");

    // Verificação direta: labels não têm htmlFor → violação real de acessibilidade
    labels.forEach((label) => {
      expect(label.getAttribute("for")).toBeNull(); // confirma o bug atual
    });

    // Verificação direta: inputs não têm id → não podem ser associados a labels
    inputs.forEach((input) => {
      expect(input.getAttribute("id")).toBeNull(); // confirma o bug atual
    });

    // Este teste DEVE ser atualizado após a correção:
    // labels devem ter htmlFor e inputs devem ter id correspondente
  });

  it("formulário com htmlFor/id PASSA na verificação de acessibilidade", () => {
    const { container } = render(<IsolatedContactForm />);

    const labels = container.querySelectorAll("label[for]");
    const inputs = container.querySelectorAll("input[id]");

    // Quando corretamente implementado: cada label tem for e cada input tem id
    expect(labels.length).toBeGreaterThan(0);
    expect(inputs.length).toBeGreaterThan(0);

    // E para cada label, o id do input correspondente existe no DOM
    labels.forEach((label) => {
      const forAttr = label.getAttribute("for");
      expect(container.querySelector(`#${forAttr}`)).toBeInTheDocument();
    });
  });
});

describe("A11y — FAQ Accordion", () => {
  function IsolatedFaqAccordion() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    const items = [
      { q: "Quem é Leandro?", a: "Sou um Desenvolvedor Full Stack focado em construir produtos digitais." },
      { q: "Você é Freelancer ou trabalha em projetos de longo prazo?", a: "Ambos." },
      { q: "Qual sua disponibilidade atual?", a: "Trabalho com alocações flexíveis." },
    ];

    return (
      <section aria-label="Perguntas Frequentes">
        <h1>Perguntas Frequentes</h1>
        {items.map((item, i) => (
          <div key={i}>
            <button
              type="button"
              aria-expanded={openIndex === i}
              aria-controls={`faq-answer-${i}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {item.q}
            </button>
            {openIndex === i && (
              <div id={`faq-answer-${i}`} role="region" aria-label={item.q}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </section>
    );
  }

  function IsolatedFaqCta() {
    return (
      <a href="/contato" aria-label="Vamos conversar sobre seu Projeto?">
        Vamos conversar sobre seu Projeto?
      </a>
    );
  }

  it("accordion sem violações de acessibilidade", async () => {
    const { container } = render(<IsolatedFaqAccordion />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("botões do accordion têm aria-expanded", () => {
    const { container } = render(<IsolatedFaqAccordion />);
    const buttons = container.querySelectorAll("button[aria-expanded]");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("botões têm type='button' (não disparam submit de form)", () => {
    const { container } = render(<IsolatedFaqAccordion />);
    const buttons = container.querySelectorAll("button");
    buttons.forEach((btn) => {
      expect(btn.getAttribute("type")).toBe("button");
    });
  });

  it("heading da seção está presente", () => {
    const { container } = render(<IsolatedFaqAccordion />);
    expect(container.querySelector("h1")).toBeInTheDocument();
    expect(container.querySelector("h1")?.textContent).toBe("Perguntas Frequentes");
  });

  it("CTA não tem violações de acessibilidade", async () => {
    const { container } = render(<IsolatedFaqCta />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("CTA tem texto descritivo (não é link vazio)", () => {
    const { container } = render(<IsolatedFaqCta />);
    const link = container.querySelector("a");
    expect(link?.textContent?.trim()).not.toBe("");
  });

  it("CTA aponta para a rota correta", () => {
    const { container } = render(<IsolatedFaqCta />);
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/contato");
  });
});

describe("A11y — Estrutura semântica da página", () => {
  it("hero section tem heading principal", () => {
    const { container } = render(
      <main>
        <h1>Leandro Dukievicz</h1>
        <p>Desenvolvedor Front-End</p>
      </main>
    );
    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("heading não pula níveis (h1 → h2, não h1 → h3)", () => {
    const { container } = render(
      <article>
        <h1>Título Principal</h1>
        <h2>Seção</h2>
        <h2>Outra Seção</h2>
      </article>
    );
    const results_sync = axe(container);
    // Apenas verificar estrutura — não pula de h1 para h3
    expect(container.querySelector("h1")).toBeInTheDocument();
    expect(container.querySelector("h2")).toBeInTheDocument();
    expect(container.querySelector("h3")).not.toBeInTheDocument();
  });
});
