"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { tokens } from "@/theme/tokens";

const CARDS = [
  {
    id: "capacity",
    stackLabel: "PROFESSIONAL TRAINING",
    heading: "Capacity Building",
    description:
      "Sector-calibrated learning programs for government, academic, and private-sector institutions, accompanied by a persona-driven governance simulator.",
    features: [
      { title: "Academy", desc: "Sector-calibrated learning" },
      { title: "Studio", desc: "Persona-driven governance simulator" },
    ],
  },
  {
    id: "compliance",
    stackLabel: "ADVOCACY & AUDITING",
    heading: "Compliance & Assurance",
    description:
      "An always-on governance environment supported by in-line compliance and audit services delivered by our certified AI auditor team.",
    features: [
      { title: "Comply Platform", desc: "Always-on governance" },
      { title: "Audit Services", desc: "Certified AI auditor team" },
    ],
  },
];

const BULLET_COLORS = ["#f16a24", "#1a2230"];

function DomainCard({ card, idx }) {
  return (
    <motion.article
      className="ds-card"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="ds-card-inner">
        <span className="ds-stack-label">{card.stackLabel}</span>
        <h3 className="ds-card-heading">{card.heading}</h3>
        <p className="ds-card-desc">{card.description}</p>
        <div className="ds-features">
          {card.features.map((f, i) => (
            <div key={i} className="ds-feature-row">
              <span
                className="ds-feature-bullet"
                style={{ background: BULLET_COLORS[i % BULLET_COLORS.length] }}
              />
              <div className="ds-feature-text">
                <span className="ds-feature-title">{f.title}</span>
                <span className="ds-feature-sep"> &mdash; </span>
                <span className="ds-feature-desc">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
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
              <div className="ds-eyebrow">
                <span className="ds-eyebrow-bar" />
                <span className="ds-eyebrow-text">What We Do</span>
                <span className="ds-eyebrow-bar" />
              </div>
              <h2 id="ds-title" className="ds-title">
                Our <span className="ds-title-accent">Domains</span>
              </h2>
              <p className="ds-lead">
                From building AI literacy to ensuring regulatory compliance,
                GovernAI delivers enterprise-grade governance across every layer
                of your AI operations.
              </p>
            </motion.div>

            <div className="ds-grid">
              {CARDS.map((card, idx) => (
                <DomainCard key={card.id} card={card} idx={idx} />
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

  .ds-header {
    text-align: center;
    margin-bottom: clamp(2.5rem, 4vw, 4rem);
  }

  .ds-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.875rem;
    margin-bottom: 1.1rem;
  }

  .ds-eyebrow-bar {
    flex: 1;
    max-width: 44px;
    height: 2px;
    border-radius: 1px;
    background: ${tokens.primary};
    flex-shrink: 0;
  }

  .ds-eyebrow-text {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${tokens.primary};
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

  .ds-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(1.25rem, 2vw, 2rem);
    align-items: stretch;
  }

  .ds-card {
    position: relative;
    border-radius: 20px;
    border: 1px solid rgba(241,106,36,0.08);
    background: linear-gradient(165deg, #fffdfb 0%, #fffaf6 100%);
    box-shadow:
      0 1px 2px rgba(241,106,36,0.04),
      0 10px 28px rgba(241,106,36,0.05),
      0 24px 56px rgba(16,24,40,0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
    overflow: hidden;
    isolation: isolate;
  }

  .ds-card:hover {
    transform: translateY(-6px);
    box-shadow:
      0 4px 8px rgba(241,106,36,0.05),
      0 22px 50px rgba(241,106,36,0.12),
      0 40px 80px rgba(241,106,36,0.09);
  }

  .ds-card-inner {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: clamp(40px, 3.5vw, 64px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .ds-stack-label {
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${tokens.primary};
    margin-bottom: 0.25rem;
  }

  .ds-card-heading {
    font-family: ${tokens.fonts.display};
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.03em;
    color: ${tokens.onSurface};
    margin: 0;
  }

  .ds-card-desc {
    font-size: clamp(0.9rem, 1.1vw, 1rem);
    line-height: 1.65;
    color: ${tokens.secondary};
    margin: 0 0 0.5rem;
    max-width: 90%;
  }

  .ds-features {
    margin-top: auto;
    display: flex;
    flex-direction: column;
  }

  .ds-feature-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }

  .ds-feature-row:last-child {
    border-bottom: none;
  }

  .ds-feature-bullet {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ds-feature-text {
    font-size: clamp(0.85rem, 1vw, 0.9375rem);
    line-height: 1.5;
    color: ${tokens.onSurface};
  }

  .ds-feature-title {
    font-weight: 600;
    color: ${tokens.onSurface};
  }

  .ds-feature-sep {
    color: ${tokens.textMuted};
  }

  .ds-feature-desc {
    color: ${tokens.secondary};
  }

  @media (max-width: 860px) {
    .ds-grid { grid-template-columns: 1fr; }
    .ds-card-inner { padding: clamp(32px, 4vw, 48px); }
  }

  @media (max-width: 480px) {
    .ds-card-desc { max-width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ds-card { transition: none; }
  }
`;
