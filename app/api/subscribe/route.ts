import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import nodemailer from "nodemailer";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_BLOG_SUBSCRIBERS_DB!;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  try {
    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Email: {
          title: [{ text: { content: email } }],
        },
        "Data de cadastro": {
          date: { start: new Date().toISOString() },
        },
      },
    });
  } catch (err) {
    console.error("[subscribe] Notion error:", err);
    return NextResponse.json({ error: "Erro ao salvar. Tente novamente." }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from: `"Blog Dukie" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "🔔 Novo assinante no blog!",
      html: `
        <div style="font-family:monospace;padding:24px;background:#03111F;color:#fff;border-radius:8px">
          <h2 style="color:#00EAFF;margin:0 0 16px">Novo assinante 🚀</h2>
          <p style="margin:0;font-size:16px">Email: <strong>${email}</strong></p>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.5);font-size:12px">
            ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[subscribe] Email error:", err);
    // não bloqueia a resposta — Notion já salvou
  }

  return NextResponse.json({ ok: true });
}
