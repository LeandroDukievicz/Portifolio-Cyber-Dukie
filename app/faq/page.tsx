"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CyberpunkBackground from "../components/CyberpunkBackground";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";

const FAQ_PT = [
  {
    q: "Quem é Leandro?",
    a: "Sou um Desenvolvedor Full Stack focado em construir produtos digitais que podem escalar, com performance e com uma excelente experiência de uso. Atuo de ponta a ponta no projeto, desde arquitetura até o lançamento e o pós, assim consigo garantir que o sistema não só vai funcionar mas que também pode evoluir com consistência, se o projeto evoluir a base tem que acompanhar e é nisso que eu trabalho.",
  },
  {
    q: "Você é Freelancer ou trabalha em projetos de longo prazo?",
    a: "Ambos. Além de atuar como freelancer em projetos que são bem definidos, também gosto de parcerias contínuas, assim eu consigo acompanhar a evolução do projeto com métricas e decisões bem estratégicas ao longo do tempo.",
  },
  {
    q: "Você trabalha com CLT ou PJ?",
    a: "O modelo de contratação é apenas detalhe, tanto PJ como CLT são possibilidades, desde que tenhamos alinhamento real com o projeto, com o time e o nível de desafio, aí a conversa flui e evolui.",
  },
  {
    q: "Qual sua disponibilidade atual?",
    a: "Trabalho com alocações flexíveis: full-time, part-time ou por hora. Minha agenda varia, então o melhor caminho é entrar em contato. Respondo rápido — normalmente em até 24h úteis.",
  },
  {
    q: "Como você garante que prazos serão cumpridos?",
    a: "Eu não tenho costume de tratar prazo como apenas uma promessa vaga, entendo e trato com a responsabilidade necessária. Eu quebro o projeto em partes menores, estimo com base na minha experiência e considero possíveis variáveis e incertezas desde o início, assim temos menos ou nenhuma surpresa. Comunico diretamente caso haja imprevistos, mas aviso e mantenho a comunicação pra evitar qualquer desculpa de última hora.",
  },
  {
    q: "Como você toma decisões técnicas?",
    a: "Sem achismos. Ao tomar uma decisão eu sempre avalio qual a escala esperada, a complexidade, maturidade do produto. A partir disso eu escolho a abordagem que mais se encaixa, a mais eficiente, seja um monolito bem estruturado ou algo mais distribuído, com único foco em deixar que o produto se sustente a longo prazo.",
  },
  {
    q: "Você segue padrões de código?",
    a: "Sim, costumo fazer isso de forma prática, aplicando SOLID, clean code, separando responsabilidades no dia a dia. Procuro padronizar com ESLint e Prettier e mantenho a estrutura já pensando em futuras manutenções e atualizações.",
  },
  {
    q: "Como você lida com performance?",
    a: "Não encaro performance como apenas um ajuste no projeto, acho que faz parte pensar nisso desde o início. Procuro fazer isso em todas as camadas: no frontend verifico para que o carregamento seja rápido e feito de forma inteligente, otimizando bundle e com render eficiente. No backend procuro manter queries otimizadas, cache e uma boa estrutura de dados adequada ao projeto. Já com infra verifico e aplico CDN, compressão e cache HTTP, com métricas reais, Web Vitals além de logs e monitoramento contínuo.",
  },
  {
    q: "Como é a sua comunicação durante o projeto?",
    a: "Procuro ser o mais direto possível, de forma clara e objetiva. Prefiro que seja assíncrona no dia a dia, assim tenho menos interrupções e consigo focar mais na entrega. Reuniões quando necessário e decisões sendo todas documentadas.",
  },
  {
    q: "Você usa IA no seu processo?",
    a: "Com certeza, baita ferramenta. Eu uso pra acelerar tarefas operacionais e também pra ampliar e explorar melhor as possibilidades, mas tudo que vai adiante em produção passa pela minha revisão, conferindo tudo com olhar crítico.",
  },
  {
    q: "Onde posso ver seus projetos?",
    a: "Vou adicionar os projetos aqui neste portfólio, mas pode conferir também no meu GitHub.",
  },
  {
    q: "Por que você deveria me escolher para trabalhar?",
    a: "Simplesmente porque você não está apenas contratando alguém para escrever código. Você estará contratando alguém que pensa no produto, não somente em entregar tasks, alguém que antecipa problemas antes de virarem incêndio, que procura tomar decisões com base no contexto, que vai se comunicar de forma franca e clara, além da responsabilidade é claro!",
  },
  {
    q: "Podemos conversar antes de fechar algo?",
    a: "Sim, com certeza, aliás recomendo muito que seja feito assim! Uma call de meia hora já nos ajuda a entender e alinhar os pensamentos. Se fizer sentido pra ambos, a gente dá continuidade!",
  },
];

const FAQ_EN = [
  {
    q: "Who is Leandro?",
    a: "I'm a Full Stack Developer focused on building digital products that can scale, with performance and an excellent user experience. I work end-to-end on the project, from architecture to launch and beyond, ensuring the system not only works but can evolve consistently. If the project grows, the foundation has to keep up — and that's what I work on.",
  },
  {
    q: "Are you a Freelancer or do you work on long-term projects?",
    a: "Both. Besides working as a freelancer on well-defined projects, I also enjoy ongoing partnerships where I can follow the project's evolution with metrics and strategic decisions over time.",
  },
  {
    q: "Do you work as an employee (CLT) or contractor (PJ)?",
    a: "The hiring model is just a detail — both PJ and CLT are possibilities. As long as we have real alignment on the project, the team, and the level of challenge, the conversation flows naturally.",
  },
  {
    q: "What is your current availability?",
    a: "I work with flexible allocations: full-time, part-time, or hourly. My schedule varies, so the best path is to get in touch. I respond quickly — usually within 24 business hours.",
  },
  {
    q: "How do you ensure deadlines are met?",
    a: "I don't treat deadlines as vague promises — I take them seriously. I break the project into smaller parts, estimate based on my experience, and factor in possible variables and uncertainties from the start, so there are fewer or no surprises. I communicate directly if something unexpected comes up, but I stay proactive to avoid last-minute excuses.",
  },
  {
    q: "How do you make technical decisions?",
    a: "No guesswork. When making a decision I always evaluate the expected scale, complexity, and product maturity. From there I choose the most fitting and efficient approach — whether a well-structured monolith or something more distributed — with a single focus: letting the product sustain itself long-term.",
  },
  {
    q: "Do you follow coding standards?",
    a: "Yes, and I do it in a practical way — applying SOLID, clean code, and separating responsibilities day-to-day. I standardize with ESLint and Prettier and keep the structure already thinking about future maintenance and updates.",
  },
  {
    q: "How do you handle performance?",
    a: "I don't see performance as just a project adjustment — I think it should be considered from the start, across all layers. On the frontend I ensure fast and intelligent loading, optimizing bundles and rendering efficiently. On the backend I keep queries optimized, use caching, and maintain good data structures suited to the project. On the infra side I apply CDN, compression, and HTTP cache, using real metrics, Web Vitals, logs, and continuous monitoring.",
  },
  {
    q: "How do you communicate during a project?",
    a: "As direct as possible — clear and objective. I prefer async communication day-to-day so I have fewer interruptions and can focus on delivery. Meetings when necessary and all decisions documented.",
  },
  {
    q: "Do you use AI in your process?",
    a: "Absolutely — it's a great tool. I use it to speed up operational tasks and to explore possibilities more broadly, but everything that goes to production passes through my review with a critical eye.",
  },
  {
    q: "Where can I see your projects?",
    a: "I'll be adding projects here in this portfolio, but you can also check my GitHub.",
  },
  {
    q: "Why should you choose me to work with?",
    a: "Simply because you're not just hiring someone to write code. You'll be hiring someone who thinks about the product, not just delivering tasks — someone who anticipates problems before they become fires, makes context-driven decisions, and communicates openly and clearly. Plus the accountability, of course!",
  },
  {
    q: "Can we talk before closing anything?",
    a: "Yes, absolutely — I actually strongly recommend it! A half-hour call already helps us understand each other and align thoughts. If it makes sense for both sides, we take it from there!",
  },
];

export default function FaqPage() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = lang === "pt" ? FAQ_PT : FAQ_EN;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const windowStyle: React.CSSProperties = {
    position: "fixed",
    top: isMobile ? 36 : 48,
    left: isMobile ? 62 : "7.5vw",
    width: isMobile ? "calc(100vw - 70px)" : "85vw",
    bottom: isMobile ? 8 : 186,
    borderRadius: 12,
    overflow: "hidden",
    background: "rgba(3,17,31,0.65)",
    backdropFilter: "blur(12px) saturate(120%)",
    WebkitBackdropFilter: "blur(12px) saturate(120%)",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,0,255,0.2)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    zIndex: 100,
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(16px)",
    transition: "opacity 0.35s ease, transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
  };

  return (
    <main id="main-content" className="w-full h-screen overflow-hidden relative">
      <CyberpunkBackground />

      <div style={windowStyle}>

        {/* Title bar */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 8,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0, userSelect: "none",
        }}>
          <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", flexShrink: 0 }} />
          <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", flexShrink: 0 }} />
          <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            {lang === "pt" ? "FAQ.md — Trabalhando com Leandro" : "FAQ.md — Working with Leandro"}
          </span>
        </div>

        {/* Content */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: isMobile ? "16px 20px" : "32px 48px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}>

          {/* Heading */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
            <h1 style={{
              margin: 0, fontSize: isMobile ? 16 : 20, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              background: "linear-gradient(90deg, #00EAFF 0%, #BD00FF 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {lang === "pt" ? "Perguntas Frequentes" : "Frequently Asked Questions"}
            </h1>
            <span style={{
              marginLeft: 3, fontSize: isMobile ? 16 : 20, fontWeight: 300,
              color: "#00EAFF",
              animation: "cursor-blink 1s step-end infinite",
            }}>|</span>
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #00EAFF55, #BD00FF55, transparent)", marginBottom: 28 }} />

          {/* FAQ accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "85%", margin: "0 auto" }}>
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  style={{
                    borderRadius: 8,
                    border: `1px solid ${isOpen ? "rgba(0,234,255,0.35)" : "rgba(255,255,255,0.08)"}`,
                    background: isOpen ? "rgba(0,234,255,0.04)" : "rgba(255,255,255,0.02)",
                    transition: "border-color 0.2s, background 0.2s",
                    overflow: "hidden",
                  }}
                >
                  {/* Question */}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                      padding: isMobile ? "14px 16px" : "16px 20px",
                      background: "transparent", border: "none", cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      color: isOpen ? "#00EAFF" : "rgba(255,255,255,0.85)",
                      transition: "color 0.2s",
                      lineHeight: 1.5,
                    }}>
                      <span style={{ color: "#FF00FF", marginRight: 8 }}>{`>`}</span>
                      {item.q}
                    </span>
                    <span style={{ color: "#00EAFF", flexShrink: 0 }}>
                      {isOpen
                        ? <IoChevronUpOutline size={16} />
                        : <IoChevronDownOutline size={16} />
                      }
                    </span>
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <div style={{
                      padding: isMobile ? "0 16px 16px 16px" : "0 20px 18px 44px",
                      fontSize: isMobile ? "0.82rem" : "0.9rem",
                      color: "#00EAFF",
                      lineHeight: 1.8,
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      paddingTop: 14,
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
            <Link href="/contato" style={{
              display: "inline-block",
              padding: isMobile ? "12px 24px" : "14px 36px",
              background: "linear-gradient(90deg, #00EAFF22 0%, #BD00FF22 100%)",
              border: "1px solid rgba(0,234,255,0.5)",
              borderRadius: 8,
              color: "#00EAFF",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? "0.82rem" : "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
              boxShadow: "0 0 20px rgba(0,234,255,0.1)",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(90deg, #00EAFF33 0%, #BD00FF33 100%)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,234,255,0.9)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 28px rgba(0,234,255,0.3)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(90deg, #00EAFF22 0%, #BD00FF22 100%)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,234,255,0.5)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(0,234,255,0.1)";
              }}
            >
              <span style={{ color: "#FF00FF", marginRight: 8 }}>{`>`}</span>
              {lang === "pt" ? "Vamos conversar sobre seu Projeto?" : "Let's talk about your Project?"}
            </Link>
          </div>

          <div style={{ height: 32 }} />
        </div>
      </div>
    </main>
  );
}
