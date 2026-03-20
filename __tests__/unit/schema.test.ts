/**
 * Testes para lib/schema.ts
 *
 * Relevância: o schema.org é usado em todas as páginas para SEO/AEO.
 * Campos incorretos afetam diretamente o rankeamento e rich results
 * no Google. Qualquer mudança acidental nos valores quebra o schema.
 */

import { buildPageSchema } from "@/lib/schema";

describe("buildPageSchema", () => {
  const baseInput = {
    type: "ProfilePage",
    name: "Leandro Dukiévicz — Dev",
    description: "Portfólio pessoal",
    url: "https://devleandro.com.br",
  };

  it("retorna @context correto (schema.org)", () => {
    const schema = buildPageSchema(baseInput);
    expect(schema["@context"]).toBe("https://schema.org");
  });

  it("retorna @type passado como parâmetro", () => {
    const schema = buildPageSchema(baseInput);
    expect(schema["@type"]).toBe("ProfilePage");
  });

  it("retorna name correto", () => {
    const schema = buildPageSchema(baseInput);
    expect(schema.name).toBe(baseInput.name);
  });

  it("retorna description correta", () => {
    const schema = buildPageSchema(baseInput);
    expect(schema.description).toBe(baseInput.description);
  });

  it("retorna url correta", () => {
    const schema = buildPageSchema(baseInput);
    expect(schema.url).toBe(baseInput.url);
  });

  it("sempre inclui o autor Leandro Dukiévicz", () => {
    const schema = buildPageSchema(baseInput);
    expect(schema.author).toEqual({
      "@type": "Person",
      name: "Leandro Dukiévicz",
      url: "https://devleandro.com.br",
    });
  });

  it("sempre define inLanguage como pt-BR", () => {
    const schema = buildPageSchema(baseInput);
    expect(schema.inLanguage).toBe("pt-BR");
  });

  it("funciona com diferentes tipos de página", () => {
    const types = ["ContactPage", "WebPage", "AboutPage"];
    types.forEach((type) => {
      const schema = buildPageSchema({ ...baseInput, type });
      expect(schema["@type"]).toBe(type);
    });
  });

  it("o objeto gerado é serializável para JSON sem erros", () => {
    const schema = buildPageSchema(baseInput);
    expect(() => JSON.stringify(schema)).not.toThrow();
  });

  it("o JSON gerado é um schema.org válido (campos obrigatórios presentes)", () => {
    const schema = buildPageSchema(baseInput);
    const json = JSON.parse(JSON.stringify(schema));
    expect(json).toHaveProperty("@context");
    expect(json).toHaveProperty("@type");
    expect(json).toHaveProperty("name");
    expect(json).toHaveProperty("description");
    expect(json).toHaveProperty("url");
    expect(json).toHaveProperty("author");
  });
});
