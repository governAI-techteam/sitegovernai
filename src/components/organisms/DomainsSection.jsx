"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { tokens } from "@/theme/tokens";

const DOMAINS = [
  {
    id: "academy",
    title: "GovernAI Academy",
    subtitle: "Capacity Building & Training",
    blurb:
      "Build organisation-wide AI fluency — from boardroom literacy to hands-on practitioner skill, delivered through structured, certifiable programs.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    points: [
      "Executive sensitisation sessions",
      "Immersive 3–5 day workshops",
      "Hands-on GenAI tools training",
      "Academic courses (NSQF-aligned)",
      "AI policy & compliance sessions",
    ],
    credentials: {
      label: "Program Highlights",
      items: [
        "Certified AI Governance Professional",
        "ISO 42001 Awareness Training",
        "Executive Leadership Briefings",
        "Custom Enterprise Curriculum",
      ],
    },
  },
  {
    id: "compliance",
    title: "AI Compliance",
    subtitle: "Auditing & Regulatory Assurance",
    blurb:
      "Independent, end-to-end assurance that your AI systems meet global standards — from initial gap analysis through to full conformity assessment.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    points: [
      "Compliance gap analysis",
      "Pre-assessment & readiness reviews",
      "Independent AI auditing",
      "Conformity assessments",
      "AI procurement advisory",
    ],
    credentials: {
      label: "Auditing Team Credentials",
      items: [
        "ISO 42001 Lead Implementer",
        "Certified AI Auditor",
        "Certified DPO",
        "Cloud Security Specialist",
      ],
    },
  },
];

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#fff" stroke="rgba(241,106,36,0.25)" strokeWidth="1" />
    <path d="m8 12 2.5 2.5L16 9" stroke="#f16a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function DomainCard({ domain, idx }) {
  return (
    <motion.article
      className="ds-card"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="ds-card-inner">
        {/* Top row */}
        <header className="ds-top">
          <div className="ds-icon-wrap">
            {domain.icon}
          </div>
        </header>

        <div className="ds-titles">
          <span className="ds-subtitle">{domain.subtitle}</span>
          <h3 className="ds-card-title">{domain.title}</h3>
          <p className="ds-blurb">{domain.blurb}</p>
        </div>

        <div className="ds-divider" />

        {/* Points */}
        <ul className="ds-points">
          {domain.points.map((point, i) => (
            <li key={i} className="ds-point">
              <CheckIcon />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Credentials */}
        {domain.credentials && (
          <div className="ds-credentials">
            <span className="ds-credentials-label">
              {domain.credentials.label}
            </span>
            <div className="ds-chips">
              {domain.credentials.items.map((cred, i) => (
                <span key={i} className="ds-chip">
                  {cred}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          className="ds-cta"
          type="button"
          onClick={() => {
            const el = document.getElementById('team');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>Learn more</span>
          <ArrowIcon />
        </button>
      </div>
    </motion.article>
  );
}

export function DomainsSection() {
  return (
    <>
      <style>{INJECTED_CSS}</style>

      <section className="domains-section" aria-labelledby="ds-title">
        <div className="domains-grid-bg" aria-hidden="true" />

        <div className="domains-inner">
          <Container>
            <motion.div
              className="ds-header"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="ds-eyebrow">
                <span className="ds-eyebrow-dot" />
                What We Do
              </span>
              <h2 id="ds-title" className="ds-title">
                Our <span className="ds-title-accent">Domains</span>
              </h2>
              <p className="ds-lead">
                From building AI literacy to ensuring regulatory compliance —
                GovernAI delivers enterprise-grade governance across every layer
                of your AI operations.
              </p>
            </motion.div>

            <div className="ds-grid">
              {DOMAINS.map((domain, idx) => (
                <DomainCard key={domain.id} domain={domain} idx={idx} />
              ))}
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}

const INJECTED_CSS = `
  .domains-section {
    position: relative;
    overflow: hidden;
    padding: clamp(72px, 8vw, 120px) 0;
    background: ${tokens.surface};
  }

  .domains-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(241,106,36,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(241,106,36,0.035) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 75%);
    pointer-events: none;
    z-index: 0;
  }

  .domains-inner {
    position: relative;
    z-index: 1;
  }

  /* ── Header ── */
  .ds-header {
    text-align: center;
    margin-bottom: clamp(2.5rem, 4vw, 4rem);
  }

  .ds-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    background: rgba(241,106,36,0.07);
    color: ${tokens.primary};
    margin-bottom: 1.1rem;
    border: 1px solid rgba(241,106,36,0.18);
  }

  .ds-eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${tokens.primary};
    box-shadow: 0 0 0 4px rgba(241,106,36,0.15);
    flex-shrink: 0;
  }

  .ds-title {
    font-family: ${tokens.fonts.display};
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.04em;
    margin: 0 0 1rem;
    color: ${tokens.onSurface};
  }

  .ds-title-accent {
    background: linear-gradient(135deg, #f16a24 0%, #f16a24 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .ds-lead {
    font-size: clamp(0.95rem, 1.2vw, 1.0625rem);
    line-height: 1.7;
    color: ${tokens.secondary};
    max-width: 34rem;
    margin: 0 auto;
  }

  /* ── Grid ── */
  .ds-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(1.25rem, 2vw, 2rem);
    align-items: stretch;
  }

  /* ── Card ── */
  .ds-card {
    position: relative;
    border-radius: 24px;
    border: 1px solid rgba(241,106,36,0.08);
    background: linear-gradient(165deg, #fffdfb 0%, #fffaf6 100%);
    box-shadow:
      0 1px 2px rgba(241,106,36,0.04),
      0 10px 28px rgba(241,106,36,0.05),
      0 24px 56px rgba(16,24,40,0.04);
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.5s cubic-bezier(0.22,1,0.36,1),
                border-color 0.5s ease;
    will-change: transform;
    overflow: hidden;
    isolation: isolate;
  }

  .ds-card:hover {
    transform: translateY(-10px);
    border-color: rgba(241,106,36,0.22);
    box-shadow:
      0 4px 8px rgba(241,106,36,0.05),
      0 22px 50px rgba(241,106,36,0.12),
      0 40px 80px rgba(241,106,36,0.09);
  }

  .ds-card-inner {
    position: relative;
    z-index: 1;
    height: 100%;
    border-radius: 23px;
    padding: clamp(1.6rem, 2.4vw, 2.5rem);
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  /* top row */
  .ds-top {
    display: flex;
    align-items: flex-start;
  }

  .ds-icon-wrap {
    position: relative;
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 16px;
    background: linear-gradient(135deg, #f16a24 0%, #f16a24 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(241,106,36,0.32);
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .ds-card:hover .ds-icon-wrap {
    transform: scale(1.06) rotate(-3deg);
  }

  .ds-titles {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .ds-subtitle {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${tokens.primary};
  }

  .ds-card-title {
    font-family: ${tokens.fonts.display};
    font-size: clamp(1.375rem, 2vw, 1.75rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.03em;
    color: ${tokens.onSurface};
    margin: 0;
  }

  .ds-blurb {
    font-size: 0.875rem;
    line-height: 1.65;
    color: ${tokens.secondary};
    margin: 0.15rem 0 0;
  }

  .ds-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(241,106,36,0.22), rgba(241,106,36,0.02));
    margin: 0.2rem 0;
  }

  /* points */
  .ds-points {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.7rem 1rem;
  }

  .ds-point {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    font-size: 0.8125rem;
    line-height: 1.4;
    color: #4a3f38;
    font-weight: 500;
  }
  .ds-point svg { flex-shrink: 0; margin-top: 1px; }

  /* credentials */
  .ds-credentials {
    margin-top: auto;
    padding-top: 1.1rem;
    border-top: 1px solid rgba(241,106,36,0.14);
  }

  .ds-credentials-label {
    display: block;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${tokens.secondary};
    opacity: 0.7;
    margin-bottom: 0.7rem;
  }

  .ds-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .ds-chip {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b4a38;
    padding: 0.4rem 0.7rem;
    border-radius: 9px;
    background: rgba(241,106,36,0.06);
    border: 1px solid rgba(241,106,36,0.14);
    transition: all 0.25s ease;
  }
  .ds-chip:hover {
    color: #fff;
    background: linear-gradient(135deg, #f16a24 0%, #f16a24 100%);
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(241,106,36,0.28);
  }

  /* CTA */
  .ds-cta {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.4rem;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font-family: ${tokens.fonts.display};
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: ${tokens.onSurface};
    transition: color 0.25s ease, gap 0.25s ease;
  }
  .ds-cta svg { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); }
  .ds-card:hover .ds-cta { color: ${tokens.primary}; gap: 0.75rem; }
  .ds-card:hover .ds-cta svg { transform: translateX(3px); }

  @media (max-width: 860px) {
    .ds-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 480px) {
    .ds-points { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ds-card, .ds-icon-wrap { transition: none; }
  }
`;
