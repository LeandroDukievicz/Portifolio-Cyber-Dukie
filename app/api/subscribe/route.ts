import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

// Força análise dinâmica — impede o Turbopack de avaliar este módulo no build
export const dynamic = "force-dynamic";
import { isDisposableDomain, isValidEmailFormat } from "@/lib/emailValidation";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

async function hasValidMx(domain: string): Promise<boolean> {
  try {
    const records = await dns.resolveMx(domain);
    return records.length > 0 && records.some(r => r.exchange.trim() !== "");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  // ── Guard: env vars obrigatórias ──────────────────────────────────────────
  const { RESEND_API_KEY, NOTION_TOKEN, NOTION_BLOG_SUBSCRIBERS_DB } = process.env;
  if (!RESEND_API_KEY || !NOTION_TOKEN || !NOTION_BLOG_SUBSCRIBERS_DB) {
    console.error("[subscribe] Missing required env vars");
    return NextResponse.json({ error: "Serviço indisponível." }, { status: 503 });
  }

  // ── Instanciação em runtime via dynamic import (evita avaliação no build) ─
  const { Client } = await import("@notionhq/client");
  const { Resend } = await import("resend");
  const { default: isEmail } = await import("validator/lib/isEmail");
  const { isDisposableDomain, isValidEmailFormat } = await import("@/lib/emailValidation");
  const notion = new Client({ auth: NOTION_TOKEN });
  const resend = new Resend(RESEND_API_KEY);

  // ── Rate limiting ─────────────────────────────────────────────────────────
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde 1 minuto." }, { status: 429 });
  }

  // ── Parse do body ─────────────────────────────────────────────────────────
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // ── Honeypot ──────────────────────────────────────────────────────────────
  if (body.website) return NextResponse.json({ ok: true });

  // ── Validação de email ────────────────────────────────────────────────────
  const email = (body.email ?? "").trim().toLowerCase();

  if (!isValidEmailFormat(email) || !isEmail(email, { allow_utf8_local_part: false, require_tld: true })) {
    return NextResponse.json({ error: "Formato de e-mail inválido." }, { status: 400 });
  }
  if (isDisposableDomain(email)) {
    return NextResponse.json({ error: "E-mails temporários não são aceitos." }, { status: 400 });
  }
  if (!(await hasValidMx(email.split("@")[1]))) {
    return NextResponse.json({ error: "Domínio de e-mail inexistente." }, { status: 400 });
  }

  // ── Duplicata ─────────────────────────────────────────────────────────────
  try {
    const existing = await notion.databases.query({
      database_id: NOTION_BLOG_SUBSCRIBERS_DB,
      filter: { property: "Email", title: { equals: email } },
      page_size: 1,
    });
    if (existing.results.length > 0) {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
  } catch (err) {
    console.error(JSON.stringify({ event: "notion_query_error", error: String(err) }));
  }

  // ── Salva no Notion ───────────────────────────────────────────────────────
  try {
    await notion.pages.create({
      parent: { database_id: NOTION_BLOG_SUBSCRIBERS_DB },
      properties: {
        Email: { title: [{ text: { content: email } }] },
        "Data de cadastro": { date: { start: new Date().toISOString() } },
      },
    });
  } catch (err) {
    console.error(JSON.stringify({ event: "notion_save_error", error: String(err) }));
    return NextResponse.json({ error: "Erro ao salvar. Tente novamente." }, { status: 500 });
  }

  // ── Notificação (não bloqueia o fluxo) ────────────────────────────────────
  resend.emails.send({
    from: "Blog Dukie <onboarding@resend.dev>",
    to: "leandrodukievicz1718@gmail.com",
    subject: "🔔 Novo assinante no blog!",
    html: `<div style="font-family:monospace;padding:24px;background:#03111F;color:#fff;border-radius:8px">
      <h2 style="color:#00EAFF;margin:0 0 16px">Novo assinante 🚀</h2>
      <p style="margin:0;font-size:16px">Email: <strong>${email}</strong></p>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.5);font-size:12px">
        ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
      </p>
    </div>`,
  }).catch(err => console.error(JSON.stringify({ event: "resend_error", error: String(err) })));

  return NextResponse.json({ ok: true });
}
