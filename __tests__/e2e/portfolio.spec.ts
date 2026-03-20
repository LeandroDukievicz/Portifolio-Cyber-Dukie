/**
 * Testes End-to-End com Playwright
 *
 * Esses testes simulam o comportamento real do usuário no browser.
 * Validam o que nenhum teste unitário pode garantir:
 * - A página realmente carrega sem erros JavaScript
 * - Navegação entre rotas funciona
 * - Formulário funciona ponta a ponta
 * - Responsividade mobile vs desktop
 * - Animações não bloqueiam a UI
 */

import { test, expect, Page } from "@playwright/test";

// Aguardar que a página não tenha mais o loading screen
async function waitForLoad(page: Page) {
  // Aguardar que o loading screen suma (se existir)
  await page.waitForLoadState("networkidle");
  // Dar tempo para animações de entrada
  await page.waitForTimeout(1000);
}

// ── Home Page ───────────────────────────────────────────────────────────────

test.describe("Home Page (/)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForLoad(page);
  });

  test("carrega sem erros de JavaScript", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await waitForLoad(page);
    expect(errors).toHaveLength(0);
  });

  test("exibe o nome do desenvolvedor", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Leandro/i })).toBeVisible({
      timeout: 10000,
    });
  });

  test("exibe os botões de CTA principais", async ({ page }) => {
    // Aguardar animação de entrada
    await expect(
      page.getByRole("link", { name: /Entrar em Contato/i })
    ).toBeVisible({ timeout: 10000 });
  });

  test("título da página está correto", async ({ page }) => {
    await expect(page).toHaveTitle(/Portfólio|Portfolio|Leandro/i);
  });

  test("não tem erros de console críticos (404s em recursos)", async ({ page }) => {
    const failedRequests: string[] = [];
    page.on("requestfailed", (req) => {
      // Ignorar alguns recursos que podem falhar em dev
      if (!req.url().includes("hot-update")) {
        failedRequests.push(req.url());
      }
    });

    await page.goto("/");
    await waitForLoad(page);
    // Não deve ter recursos falhando (CSS, JS, imagens)
    expect(failedRequests).toHaveLength(0);
  });
});

// ── Navegação entre páginas ─────────────────────────────────────────────────

test.describe("Navegação", () => {
  test("navega para página de contato via CTA", async ({ page }) => {
    await page.goto("/");
    await waitForLoad(page);

    const ctaLink = page.getByRole("link", { name: /Entrar em Contato/i });
    await expect(ctaLink).toBeVisible({ timeout: 10000 });
    await ctaLink.click();

    await expect(page).toHaveURL(/\/contato/);
  });

  test("página /contato carrega sem erros", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/contato");
    await waitForLoad(page);

    expect(errors).toHaveLength(0);
  });

  test("página /sobre carrega sem erros", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/sobre");
    await waitForLoad(page);

    expect(errors).toHaveLength(0);
  });

  test("página /projetos carrega sem erros", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/projetos");
    await waitForLoad(page);

    expect(errors).toHaveLength(0);
  });

  test("página /skills carrega sem erros", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/skills");
    await waitForLoad(page);

    expect(errors).toHaveLength(0);
  });

  test("rota inexistente retorna 404 sem crash", async ({ page }) => {
    const response = await page.goto("/pagina-que-nao-existe");
    // Deve retornar 404 ou redirecionar para not-found
    expect(response?.status()).toBe(404);
  });
});

// ── Formulário de Contato ───────────────────────────────────────────────────

test.describe("Formulário de Contato", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contato");
    await waitForLoad(page);
  });

  test("formulário está visível na página", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Enviar mensagem/i })).toBeVisible({
      timeout: 10000,
    });
  });

  test("campo de nome aceita entrada de texto", async ({ page }) => {
    const nameInput = page.getByPlaceholder(/Seu nome/i);
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    await nameInput.fill("João da Silva");
    await expect(nameInput).toHaveValue("João da Silva");
  });

  test("campo de email aceita entrada válida", async ({ page }) => {
    const emailInput = page.getByPlaceholder(/seu-Melhor-Email/i);
    await expect(emailInput).toBeVisible({ timeout: 10000 });
    await emailInput.fill("joao@empresa.com");
    await expect(emailInput).toHaveValue("joao@empresa.com");
  });

  test("links de contato social estão presentes e clicáveis", async ({ page }) => {
    // Verificar que links externos estão presentes
    const whatsappLink = page.locator('a[title="WhatsApp"]');
    await expect(whatsappLink).toBeVisible({ timeout: 10000 });
    await expect(whatsappLink).toHaveAttribute("href", /wa\.me/);
  });

  test("LinkedIn link está presente", async ({ page }) => {
    const linkedinLink = page.locator('a[title="LinkedIn"]');
    await expect(linkedinLink).toBeVisible({ timeout: 10000 });
    await expect(linkedinLink).toHaveAttribute("href", /linkedin\.com/);
  });
});

// ── Troca de idioma ─────────────────────────────────────────────────────────

test.describe("Internacionalização (PT/EN)", () => {
  test("toggle de idioma muda os textos da página", async ({ page }) => {
    await page.goto("/");
    await waitForLoad(page);

    // Verificar que está em PT por padrão
    // Aguardar o subtitle aparecer (tem delay de animação)
    await expect(
      page.getByText(/Desenvolvedor Front-End/i)
    ).toBeVisible({ timeout: 15000 });

    // Clicar no botão de toggle de idioma
    const langButton = page.getByTitle(/Switch to English/i);
    await expect(langButton).toBeVisible({ timeout: 5000 });
    await langButton.click();

    // Aguardar mudança para EN
    await expect(
      page.getByText(/Front-End Developer/i)
    ).toBeVisible({ timeout: 10000 });
  });
});

// ── Responsividade ──────────────────────────────────────────────────────────

test.describe("Responsividade Mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14

  test("home carrega corretamente em mobile", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await waitForLoad(page);

    expect(errors).toHaveLength(0);
  });

  test("contato carrega corretamente em mobile", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/contato");
    await waitForLoad(page);

    expect(errors).toHaveLength(0);
  });

  test("não tem scroll horizontal indesejado em mobile", async ({ page }) => {
    await page.goto("/");
    await waitForLoad(page);

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    // scrollWidth não deve ser maior que a viewport (sem overflow horizontal)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // tolerância de 5px
  });
});

// ── Performance básica ──────────────────────────────────────────────────────

test.describe("Performance", () => {
  test("home page carrega em menos de 5 segundos", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(5000);
  });

  test("não tem requisições bloqueantes óbvias", async ({ page }) => {
    const slowRequests: string[] = [];

    // Registrar requisições que demoram mais de 3s
    page.on("requestfinished", async (req) => {
      const timing = req.timing();
      if (timing.responseEnd - timing.requestStart > 3000) {
        slowRequests.push(req.url());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Nenhum recurso deve demorar mais de 3s em ambiente local
    expect(slowRequests).toHaveLength(0);
  });
});
